#include <windows.h>
#include <dinput.h>
#include <stdio.h>

// 定義全域變數與載入的真實 DInput DLL 句柄
HMODULE hRealDInput = NULL;

// 真實的導出函數指針
typedef HRESULT(WINAPI* LPFN_DIRECTINPUTCREATEA)(HINSTANCE, DWORD, LPDIRECTINPUTA*, LPUNKNOWN);
typedef HRESULT(WINAPI* LPFN_DIRECTINPUTCREATEW)(HINSTANCE, DWORD, LPDIRECTINPUTW*, LPUNKNOWN);
typedef HRESULT(WINAPI* LPFN_DIRECTINPUTCREATEEX)(HINSTANCE, DWORD, REFIID, LPVOID*, LPUNKNOWN);
typedef HRESULT(WINAPI* LPFN_DLLCANUNLOADNOW)(void);
typedef HRESULT(WINAPI* LPFN_DLLGETCLASSOBJECT)(REFCLSID, REFIID, LPVOID*);
typedef HRESULT(WINAPI* LPFN_DLLREGISTERSERVER)(void);
typedef HRESULT(WINAPI* LPFN_DLLUNREGISTERSERVER)(void);

LPFN_DIRECTINPUTCREATEA pfnRealCreateA = NULL;
LPFN_DIRECTINPUTCREATEW pfnRealCreateW = NULL;
LPFN_DIRECTINPUTCREATEEX pfnRealCreateEx = NULL;
LPFN_DLLCANUNLOADNOW pfnRealDllCanUnloadNow = NULL;
LPFN_DLLGETCLASSOBJECT pfnRealDllGetClassObject = NULL;
LPFN_DLLREGISTERSERVER pfnRealDllRegisterServer = NULL;
LPFN_DLLUNREGISTERSERVER pfnRealDllUnregisterServer = NULL;

// 去抖參數 (毫秒)
#define DEBOUNCE_TIME_MS 150
static DWORD last_click_time = 0;
static bool block_state = false;

// --- Inline Hook 核心工具實現 (x86 32-bit) ---
void* HookInline(void* targetFunc, void* newFunc, int len) {
    if (len < 5) return NULL;
    
    // 分配 Trampoline (原始指令 + jmp 回去)
    BYTE* trampoline = (BYTE*)VirtualAlloc(NULL, len + 5, MEM_COMMIT | MEM_RESERVE, PAGE_EXECUTE_READWRITE);
    if (!trampoline) return NULL;
    
    memcpy(trampoline, targetFunc, len);
    
    trampoline[len] = 0xE9; // JMP Opcode
    ULONG_PTR jmpBackAddress = (ULONG_PTR)targetFunc + len;
    ULONG_PTR trampolineJmpAddress = (ULONG_PTR)&trampoline[len];
    DWORD relativeAddress = (DWORD)(jmpBackAddress - trampolineJmpAddress - 5);
    *(DWORD*)&trampoline[len + 1] = relativeAddress;
    
    DWORD oldProtect;
    if (VirtualProtect(targetFunc, len, PAGE_EXECUTE_READWRITE, &oldProtect)) {
        BYTE* target = (BYTE*)targetFunc;
        target[0] = 0xE9; // JMP
        DWORD relativeNewFuncAddress = (DWORD)((ULONG_PTR)newFunc - (ULONG_PTR)targetFunc - 5);
        *(DWORD*)&target[1] = relativeNewFuncAddress;
        
        for (int i = 5; i < len; i++) {
            target[i] = 0x90; // NOP
        }
        VirtualProtect(targetFunc, len, oldProtect, &oldProtect);
        return trampoline;
    }
    
    VirtualFree(trampoline, 0, MEM_RELEASE);
    return NULL;
}

// --- PeekMessageA 訊息隊列攔截與 CPU 降速限流 ---
typedef BOOL(WINAPI* LPFN_PEEKMESSAGEA)(LPMSG, HWND, UINT, UINT, UINT);
LPFN_PEEKMESSAGEA TruePeekMessageA = NULL;

extern "C" BOOL WINAPI MyPeekMessageA(LPMSG lpMsg, HWND hWnd, UINT wMsgFilterMin, UINT wMsgFilterMax, UINT wRemoveMsg) {
    if (!TruePeekMessageA) return ::PeekMessageA(lpMsg, hWnd, wMsgFilterMin, wMsgFilterMax, wRemoveMsg);

    // 1. 高精度主迴圈降速限流 (防止現代 CPU 極速空轉導致自動對話閃過)
    static LARGE_INTEGER last_qpc = {0};
    static double qpc_freq = 0.0;
    
    if (qpc_freq == 0.0) {
        LARGE_INTEGER freq;
        QueryPerformanceFrequency(&freq);
        qpc_freq = (double)freq.QuadPart;
    }
    
    LARGE_INTEGER current_qpc;
    QueryPerformanceCounter(&current_qpc);
    
    if (last_qpc.QuadPart != 0) {
        double elapsed_ms = (double)(current_qpc.QuadPart - last_qpc.QuadPart) * 1000.0 / qpc_freq;
        // 如果 PeekMessageA 呼叫間隔小於 2.0 毫秒（代表空轉速度超過 500 FPS），強制 Sleep(1) 釋放 CPU
        if (elapsed_ms < 2.0) {
            Sleep(1);
            QueryPerformanceCounter(&current_qpc); // 重新校準時間
        }
    }
    last_qpc = current_qpc;

    // 2. 正常獲取訊息並實施 150ms 的滑鼠去抖
    BOOL ret = TruePeekMessageA(lpMsg, hWnd, wMsgFilterMin, wMsgFilterMax, wRemoveMsg);
    if (ret && lpMsg) {
        if (lpMsg->message == WM_LBUTTONDOWN) {
            DWORD current_time = GetTickCount();
            if (current_time - last_click_time < DEBOUNCE_TIME_MS) {
                // 在 150ms 內判定為重複穿透連點，直接吞掉
                if (wRemoveMsg & PM_REMOVE) {
                    lpMsg->message = WM_NULL;
                } else {
                    return FALSE;
                }
            } else {
                // 允許通過並記錄點擊時間
                last_click_time = current_time;
            }
        }
    }
    return ret;
}

// --- GetKeyState / GetAsyncKeyState 全域 Hook 實現 ---
typedef SHORT(WINAPI* LPFN_GETKEYSTATE)(int);
LPFN_GETKEYSTATE TrueGetKeyState = NULL;

typedef SHORT(WINAPI* LPFN_GETASYNCKEYSTATE)(int);
LPFN_GETASYNCKEYSTATE TrueGetAsyncKeyState = NULL;

extern "C" SHORT WINAPI MyGetKeyState(int nVirtKey) {
    if (nVirtKey == VK_LBUTTON) {
        DWORD current_time = GetTickCount();
        if (current_time - last_click_time < DEBOUNCE_TIME_MS) {
            return 0;
        }
        SHORT state = TrueGetKeyState ? TrueGetKeyState(nVirtKey) : ::GetKeyState(nVirtKey);
        if (state < 0) {
            if (block_state) {
                if (current_time - last_click_time < DEBOUNCE_TIME_MS) {
                    return 0;
                } else {
                    last_click_time = current_time;
                }
            } else {
                last_click_time = current_time;
                block_state = true;
            }
            return state;
        } else {
            if (current_time - last_click_time >= DEBOUNCE_TIME_MS) {
                block_state = false;
            }
        }
        return state;
    }
    return TrueGetKeyState ? TrueGetKeyState(nVirtKey) : ::GetKeyState(nVirtKey);
}

extern "C" SHORT WINAPI MyGetAsyncKeyState(int vKey) {
    if (vKey == VK_LBUTTON) {
        DWORD current_time = GetTickCount();
        if (current_time - last_click_time < DEBOUNCE_TIME_MS) {
            return 0;
        }
        SHORT state = TrueGetAsyncKeyState ? TrueGetAsyncKeyState(vKey) : ::GetAsyncKeyState(vKey);
        if (state & 0x8000) {
            if (block_state) {
                if (current_time - last_click_time < DEBOUNCE_TIME_MS) {
                    return 0;
                } else {
                    last_click_time = current_time;
                }
            } else {
                last_click_time = current_time;
                block_state = true;
            }
            return state;
        } else {
            if (current_time - last_click_time >= DEBOUNCE_TIME_MS) {
                block_state = false;
            }
        }
        return state;
    }
    return TrueGetAsyncKeyState ? TrueGetAsyncKeyState(vKey) : ::GetAsyncKeyState(vKey);
}

// --- 原有 DirectInput VTable Hook 實現 ---
void HookVTable(void* instance, int index, void* newFunc, void** oldFunc) {
    if (!instance) return;
    void** vtable = *(void***)instance;
    DWORD oldProtect;
    if (VirtualProtect(&vtable[index], sizeof(void*), PAGE_EXECUTE_READWRITE, &oldProtect)) {
        if (oldFunc) *oldFunc = vtable[index];
        vtable[index] = newFunc;
        VirtualProtect(&vtable[index], sizeof(void*), oldProtect, &oldProtect);
    }
}

typedef HRESULT(WINAPI* LPFN_CREATEDEVICE)(IDirectInputA*, REFGUID, LPDIRECTINPUTDEVICEA*, LPUNKNOWN);
typedef HRESULT(WINAPI* LPFN_GETDEVICESTATE)(IDirectInputDeviceA*, DWORD, LPVOID);

LPFN_CREATEDEVICE TrueCreateDevice = NULL;
LPFN_GETDEVICESTATE TrueGetDeviceState = NULL;

HRESULT WINAPI MyGetDeviceState(IDirectInputDeviceA* This, DWORD cbData, LPVOID lpvData) {
    HRESULT hr = TrueGetDeviceState(This, cbData, lpvData);
    if (SUCCEEDED(hr) && lpvData) {
        if (cbData == sizeof(DIMOUSESTATE) || cbData == sizeof(DIMOUSESTATE2)) {
            DIMOUSESTATE* pMouseState = (DIMOUSESTATE*)lpvData;
            DWORD current_time = GetTickCount();

            if (pMouseState->rgbButtons[0] & 0x80) {
                if (block_state) {
                    if (current_time - last_click_time < DEBOUNCE_TIME_MS) {
                        pMouseState->rgbButtons[0] = 0;
                    } else {
                        last_click_time = current_time;
                    }
                } else {
                    last_click_time = current_time;
                    block_state = true;
                }
            } else {
                if (current_time - last_click_time >= DEBOUNCE_TIME_MS) {
                    block_state = false;
                }
            }
        }
    }
    return hr;
}

HRESULT WINAPI MyCreateDevice(IDirectInputA* This, REFGUID rguid, LPDIRECTINPUTDEVICEA* lplpDirectInputDevice, LPUNKNOWN pUnkOuter) {
    FILE* fLog = NULL;
    fopen_s(&fLog, "dinput_hook.log", "a");
    if (fLog) {
        fprintf(fLog, "MyCreateDevice called! GUID: {%08lX-%04X-%04X-%02X%02X-%02X%02X%02X%02X%02X%02X}\n", 
            rguid.Data1, rguid.Data2, rguid.Data3, 
            rguid.Data4[0], rguid.Data4[1], rguid.Data4[2], rguid.Data4[3],
            rguid.Data4[4], rguid.Data4[5], rguid.Data4[6], rguid.Data4[7]);
        fclose(fLog);
    }
    HRESULT hr = TrueCreateDevice(This, rguid, lplpDirectInputDevice, pUnkOuter);
    if (SUCCEEDED(hr) && lplpDirectInputDevice && *lplpDirectInputDevice) {
        if (IsEqualGUID(rguid, GUID_SysMouse)) {
            fopen_s(&fLog, "dinput_hook.log", "a");
            if (fLog) {
                fprintf(fLog, "GUID_SysMouse detected! Hooking IDirectInputDeviceA VTable Index 9 (GetDeviceState)...\n");
                fclose(fLog);
            }
            if (TrueGetDeviceState == NULL) {
                HookVTable(*lplpDirectInputDevice, 9, (void*)MyGetDeviceState, (void**)&TrueGetDeviceState);
            }
        }
    }
    return hr;
}

extern "C" HRESULT WINAPI MyDirectInputCreateA(HINSTANCE hinst, DWORD dwVersion, LPDIRECTINPUTA* lplpDirectInput, LPUNKNOWN punkOuter) {
    FILE* fLog = NULL;
    fopen_s(&fLog, "dinput_hook.log", "a");
    if (fLog) {
        fprintf(fLog, "MyDirectInputCreateA called! Version: 0x%08lX\n", dwVersion);
        fclose(fLog);
    }
    if (!pfnRealCreateA) return E_FAIL;
    HRESULT hr = pfnRealCreateA(hinst, dwVersion, lplpDirectInput, punkOuter);
    if (SUCCEEDED(hr) && lplpDirectInput && *lplpDirectInput) {
        if (TrueCreateDevice == NULL) {
            fopen_s(&fLog, "dinput_hook.log", "a");
            if (fLog) {
                fprintf(fLog, "Hooking IDirectInputA VTable Index 3 (CreateDevice)...\n");
                fclose(fLog);
            }
            HookVTable(*lplpDirectInput, 3, (void*)MyCreateDevice, (void**)&TrueCreateDevice);
        }
    }
    return hr;
}

extern "C" HRESULT WINAPI MyDirectInputCreateW(HINSTANCE hinst, DWORD dwVersion, LPDIRECTINPUTW* lplpDirectInput, LPUNKNOWN punkOuter) {
    if (!pfnRealCreateW) return E_FAIL;
    return pfnRealCreateW(hinst, dwVersion, lplpDirectInput, punkOuter);
}

extern "C" HRESULT WINAPI MyDirectInputCreateEx(HINSTANCE hinst, DWORD dwVersion, REFIID riid, LPVOID* lplpDI, LPUNKNOWN punkOuter) {
    if (!pfnRealCreateEx) return E_FAIL;
    return pfnRealCreateEx(hinst, dwVersion, riid, lplpDI, punkOuter);
}

extern "C" HRESULT WINAPI MyDllCanUnloadNow(void) {
    if (!pfnRealDllCanUnloadNow) return S_FALSE;
    return pfnRealDllCanUnloadNow();
}

extern "C" HRESULT WINAPI MyDllGetClassObject(REFCLSID rclsid, REFIID riid, LPVOID* ppv) {
    if (!pfnRealDllGetClassObject) return E_FAIL;
    return pfnRealDllGetClassObject(rclsid, riid, ppv);
}

extern "C" HRESULT WINAPI MyDllRegisterServer(void) {
    if (!pfnRealDllRegisterServer) return E_FAIL;
    return pfnRealDllRegisterServer();
}

extern "C" HRESULT WINAPI MyDllUnregisterServer(void) {
    if (!pfnRealDllUnregisterServer) return E_FAIL;
    return pfnRealDllUnregisterServer();
}

// DLL 入口點，負責動態載入系統真實 dinput.dll 與執行 Inline Hook
BOOL WINAPI DllMain(HINSTANCE hinstDLL, DWORD fdwReason, LPVOID lpvReserved) {
    if (fdwReason == DLL_PROCESS_ATTACH) {
        DisableThreadLibraryCalls(hinstDLL);

        FILE* fLog = NULL;
        fopen_s(&fLog, "dinput_hook.log", "w");
        if (fLog) {
            fprintf(fLog, "dinput.dll proxy loaded successfully!\n");
            fclose(fLog);
        }

        char sysPath[MAX_PATH];
        GetSystemDirectoryA(sysPath, MAX_PATH);
        strcat_s(sysPath, "\\dinput.dll");

        hRealDInput = LoadLibraryA(sysPath);
        if (hRealDInput) {
            fopen_s(&fLog, "dinput_hook.log", "a");
            if (fLog) {
                fprintf(fLog, "Real system dinput.dll loaded successfully from %s\n", sysPath);
                fclose(fLog);
            }
            pfnRealCreateA = (LPFN_DIRECTINPUTCREATEA)GetProcAddress(hRealDInput, "DirectInputCreateA");
            pfnRealCreateW = (LPFN_DIRECTINPUTCREATEW)GetProcAddress(hRealDInput, "DirectInputCreateW");
            pfnRealCreateEx = (LPFN_DIRECTINPUTCREATEEX)GetProcAddress(hRealDInput, "DirectInputCreateEx");
            pfnRealDllCanUnloadNow = (LPFN_DLLCANUNLOADNOW)GetProcAddress(hRealDInput, "DllCanUnloadNow");
            pfnRealDllGetClassObject = (LPFN_DLLGETCLASSOBJECT)GetProcAddress(hRealDInput, "DllGetClassObject");
            pfnRealDllRegisterServer = (LPFN_DLLREGISTERSERVER)GetProcAddress(hRealDInput, "DllRegisterServer");
            pfnRealDllUnregisterServer = (LPFN_DLLUNREGISTERSERVER)GetProcAddress(hRealDInput, "DllUnregisterServer");
        } else {
            MessageBoxA(NULL, "無法載入系統 dinput.dll！", "DInput Proxy 錯誤", MB_OK | MB_ICONERROR);
            return FALSE;
        }

        // 執行 Inline Hook：對 user32.dll 的 GetKeyState、GetAsyncKeyState 與 PeekMessageA 進行全域劫持
        HMODULE hUser32 = GetModuleHandleA("user32.dll");
        if (hUser32) {
            void* pGetKeyState = (void*)GetProcAddress(hUser32, "GetKeyState");
            void* pGetAsyncKeyState = (void*)GetProcAddress(hUser32, "GetAsyncKeyState");
            void* pPeekMessageA = (void*)GetProcAddress(hUser32, "PeekMessageA");
            
            fopen_s(&fLog, "dinput_hook.log", "a");
            if (fLog) {
                fprintf(fLog, "Executing global user32.dll Inline Hooks...\n");
                fclose(fLog);
            }
            
            if (pGetKeyState) {
                TrueGetKeyState = (LPFN_GETKEYSTATE)HookInline(pGetKeyState, (void*)MyGetKeyState, 5);
                fopen_s(&fLog, "dinput_hook.log", "a");
                if (fLog) {
                    fprintf(fLog, "Inline Hook GetKeyState %s (Original: 0x%p -> Trampoline: 0x%p)\n", 
                        TrueGetKeyState ? "SUCCESS" : "FAILED", pGetKeyState, TrueGetKeyState);
                    fclose(fLog);
                }
            }
            
            if (pGetAsyncKeyState) {
                TrueGetAsyncKeyState = (LPFN_GETASYNCKEYSTATE)HookInline(pGetAsyncKeyState, (void*)MyGetAsyncKeyState, 5);
                fopen_s(&fLog, "dinput_hook.log", "a");
                if (fLog) {
                    fprintf(fLog, "Inline Hook GetAsyncKeyState %s (Original: 0x%p -> Trampoline: 0x%p)\n", 
                        TrueGetAsyncKeyState ? "SUCCESS" : "FAILED", pGetAsyncKeyState, TrueGetAsyncKeyState);
                    fclose(fLog);
                }
            }

            if (pPeekMessageA) {
                TruePeekMessageA = (LPFN_PEEKMESSAGEA)HookInline(pPeekMessageA, (void*)MyPeekMessageA, 5);
                fopen_s(&fLog, "dinput_hook.log", "a");
                if (fLog) {
                    fprintf(fLog, "Inline Hook PeekMessageA %s (Original: 0x%p -> Trampoline: 0x%p)\n", 
                        TruePeekMessageA ? "SUCCESS" : "FAILED", pPeekMessageA, TruePeekMessageA);
                    fclose(fLog);
                }
            }
        }
    }
    else if (fdwReason == DLL_PROCESS_DETACH) {
        if (hRealDInput) {
            FreeLibrary(hRealDInput);
        }
    }
    return TRUE;
}
