# MEMORY.md

## 用途

本檔只放 AI 執行層記憶：協作偏好、工具踩坑、Feedback、環境速查。

使用者長期輪廓、價值觀、角色、專案/人物脈絡，請寫入：

- `400_Knowledge/self_brain/identity/`
- `400_Knowledge/self_brain/projects/`
- `400_Knowledge/self_brain/people/`

每日流水、工作復盤、session log 請寫入 `300_Journal/YYYY-MM/YYYY-MM-DD.md`；`000_Agent/memory/daily/` 不再作為新日誌入口。

## AI 執行偏好

- 使用繁體中文。
- 技術回答偏向直接可執行。
- 預設使用 Windows / PowerShell。
- 優先考慮時間效率與可維護性。
- 長期跨工具規則優先寫入 `000_Agent/CORE_RULES.md`，不要只寫進 `CLAUDE.md`。

## 長期技術背景

- JavaScript / TypeScript
- Firebase
- Google Cloud Platform
- Google Apps Script
- SOC / SecOps 流程分析

## Feedback

（尚無）

## 踩坑筆記

### Writing Flywheel email packet 不能漏掉 freshness / 不可混淆卡片盒來源
- **情境**：調整 `writing-flywheel` 後，第一版 email 直接從 `Inspiration.md` 產出主題與草稿，但漏掉外部新鮮度檢查；同時把 AI 本次整理出的「卡片盒可用內容」寫得像既有卡片，且 email 中還保留空白回覆欄位，導致使用者看到格式跑掉、內容像沒填完、來源邊界不清。
- **解法**：
  1. Weekly packet 採 `Inspiration.md` first，但寄信前每個 A/B/C 題目都必須有 freshness state：`green / yellow / weak / red / unverified`。
  2. 外部訊號只做 freshness / saturation / angle validation，不回到爆文優先；常青題標 `yellow` 或 `weak`，不要硬說熱門。
  3. 找卡片先讀 `400_Knowledge/study/config/classification_map.md` 與 `400_Knowledge/body/config/classification_map.md`，但引用只能列 `study/01_processed` 或 `body/01_processed` 的實際卡片；map 只當索引。
  4. AI 本次整理出的內容要標為 `可沉澱成新卡的筆記草案`，不能稱為既有卡片盒引用。
  5. Gmail 版用 HTML / 短標籤清單，不貼 Markdown 空白模板或巢狀 code block；補料只問 1-3 個具體問題。
  6. 一週可產多篇 A 題與多篇初稿；A/B/C 是 queue，不是各一篇。

### LLM 生成內容中的結構化日期不可直接信任 [已整合]
- **情境**：紫微 LINE/LIFF 報告中，LLM 可能在「農曆X月」後自行補上「約西曆 YYYY/MM/DD-YYYY/MM/DD」。若後處理邏輯看到括號內已有「西曆」就跳過補註，會保留模型猜出的錯誤日期，造成同一個農曆月份在同一份報告內出現不同西曆區間。
- **解法**：農曆月對應西曆區間屬於結構化事實，必須由程式以 `lunar-typescript` 等日曆函式統一計算並覆蓋。後處理遇到 `農曆X月（...西曆...）` 時，不應信任既有備註，應改寫成系統計算值；只有非西曆備註才保留並附加正確日期。

### Git Working Tree 變更丟失風險 [已整合]
- **情境**：在多人/多 Agent 跨 Session 協作且有多個分支時，如果 working tree 存在上個 Session 累積的 uncommitted 變更，在當前 Session 輕易執行 `git checkout -- <file>` 來恢復單一檔案的語法錯誤，會直接抹除 working tree 的未提交變更。
- **解法**：執行任何丟棄變更的操作前，務必先用 `git status` 核對工作區。如有未 commit 的重要變更，應優先使用 `git stash` 備份，切勿盲目直接 checkout 覆蓋。

### 二進位資料檔中文字指標失效時的逆向定位法 (Reverse Locating by Stat Footprint) [已整合]
- **情境**：在修改舊遊戲或非官方 Mod（如鹿鼎記2的 `THING.SET`）時，裝備的「名稱」或「描述」指標（Pointer/ID）常因外部模組更動而錯置、空白或呈現亂碼。這會導致依賴「解析文字檔以對照物品 ID」的傳統方法完全失效。
- **解法**：
  1. 放棄依賴字串與指標。改從遊戲內實際觀察目標物品的「面板屬性組合特徵」（例如：重量、攻擊力、防禦力、最大生命、敏捷等具體數字）。
  2. 將這組數值視為獨特的「指紋 (Signature)」。
  3. 撰寫腳本，按照二進位檔案的結構（例如 100 bytes / record），遍歷比對每個 Record 中對應 offset 的數值組合，即可精準且 100% 可靠地反向定位出目標物品的 Item ID 與檔案偏移量。

### 老舊遊戲 DirectDraw 與 MCI 影片播放閃退修復 (cnc-ddraw Wrapper & Video Bypass) [已整合]
- **情境**：在 Windows 10/11 上執行老舊遊戲（如《鹿鼎記2》）時，遇到劇情影片（如 MCI 播放的 MPEG-1 格式影片）播放即黑屏閃退。
- **解法**：
  1. **Wrapper 設定調校**：如果使用了 `cnc-ddraw` 相容性補丁，可修改 `ddraw.ini` 的 `[main]` 及遊戲 executable 對應區段，設定 `renderer=gdi` 及 `nonexclusive=true` 以防止獨佔全螢幕或特定渲染器導致 MCI 播放器卡死。
  2. **影片格式複製與備份**：若遊戲影片格式實為標準 MPEG-1 編碼（例如 `.ank` 或 `.anm`，特徵字節為 `\x00\x00\x01\xba`），可將其複製並更名為 `.mpg`，以便在遊戲崩潰時透過現代外部播放器（如 Windows Media Player）直接觀看。
  3. **暫時繞過法**：將崩潰影片檔改名為 `.bak`，迫使遊戲引擎因找不到影片而自動跳過，直接進入下一個事件場景。

## 環境速查表

| 項目 | 值 |
| :--- | :--- |
| AI 分身母資料夾 | `C:\Users\join6\AI-Agent` |
| 建立日期 | `2026-05-06` |
| Skills link | `C:\Users\join6\.claude\skills` -> `C:\Users\join6\AI-Agent\000_Agent\skills` |
| 記憶系統啟用 | 是 |
