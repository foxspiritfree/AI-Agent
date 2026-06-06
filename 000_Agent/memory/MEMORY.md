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

### Git Working Tree 變更丟失風險
- **情境**：在多人/多 Agent 跨 Session 協作且有多個分支時，如果 working tree 存在上個 Session 累積的 uncommitted 變更，在當前 Session 輕易執行 `git checkout -- <file>` 來恢復單一檔案的語法錯誤，會直接抹除 working tree 的未提交變更。
- **解法**：執行任何丟棄變更的操作前，務必先用 `git status` 核對工作區。如有未 commit 的重要變更，應優先使用 `git stash` 備份，切勿盲目直接 checkout 覆蓋。

## 環境速查表

| 項目 | 值 |
| :--- | :--- |
| AI 分身母資料夾 | `C:\Users\join6\AI-Agent` |
| 建立日期 | `2026-05-06` |
| Skills link | `C:\Users\join6\.claude\skills` -> `C:\Users\join6\AI-Agent\000_Agent\skills` |
| 記憶系統啟用 | 是 |
