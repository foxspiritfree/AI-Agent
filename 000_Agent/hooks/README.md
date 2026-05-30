# 000_Agent Hooks

這裡放 AI-Agent repo 的本地 hook。

## agent-maintenance-check.ps1

用途：在 `000_Agent` 相關檔案被修改後，只輸出維護提醒，不自動改檔。

檢查重點：

- 改 `skills/*/SKILL.md` 後，提醒同步 `skills/INDEX.md` 與 `skills/CAPABILITY_MAP.md`。
- 改 `workflows/*.md` 後，提醒 workflow 只做 shortcut，不複製完整 SOP。
- 改 `CORE_RULES.md` 或 `DATA_ROUTING.md` 後，提醒工具入口檔不要分叉規則。
- 改 `NOTION_SOURCE_MAP.md` 後，提醒相關 skill / workflow 只引用此檔。

手動測試：

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\000_Agent\hooks\agent-maintenance-check.ps1
```

## project-memory-session-start.ps1

用途：SessionStart 時偵測目前 repo 是否有 `memory-bank/`，有就提醒先讀取專案接續脈絡。

它只輸出提醒，不建立或修改 `memory-bank`。

手動測試：

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\000_Agent\hooks\project-memory-session-start.ps1
```
