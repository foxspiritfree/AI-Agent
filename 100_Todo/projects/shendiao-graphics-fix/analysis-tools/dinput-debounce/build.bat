@echo off
set COMPILER="C:\Users\join6\AppData\Local\Microsoft\WinGet\Packages\MartinStorsjo.LLVM-MinGW.MSVCRT_Microsoft.Winget.Source_8wekyb3d8bbwe\llvm-mingw-20260519-msvcrt-x86_64\bin\i686-w64-mingw32-g++.exe"

echo 正在編譯 32 位元 dinput.dll 去抖代理...
%COMPILER% -shared -o dinput.dll dinput_proxy.cpp dinput.def -static -s -O3 -luser32 -lgdi32

if %ERRORLEVEL% equ 0 (
    echo 編譯成功！產出的 dinput.dll 位於當前目錄下。
) else (
    echo 編譯失敗，請檢查錯誤訊息。
)
pause
