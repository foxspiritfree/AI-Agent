# Agent Memory

這裡只放 AI 執行層記憶，不放使用者長期人格、決策或日常流水。

## Single Source

主要檔案：

- `000_Agent/memory/MEMORY.md`

## 放這裡

- AI 工具偏好。
- 本機環境速查。
- Codex / Claude / Gemini / Cursor 的執行踩坑。
- 使用者對 AI 工作方式的 feedback。
- 只影響 AI 執行方式的決策。

## 不放這裡

- 使用者長期偏好、價值觀、人物、專案脈絡：放 `400_Knowledge/self_brain/`。
- 使用者重要選擇與取捨：放 `400_Knowledge/self_brain/decisions/`。
- 每日流水、工作復盤、session log：放 `300_Journal/YYYY-MM/YYYY-MM-DD.md`。
- 外部原始素材：放 `200_Reference/imported/`。

## 子資料夾狀態

| 路徑 | 狀態 | 用途 |
| --- | --- | --- |
| `MEMORY.md` | active | AI 執行層記憶 single source |
| `daily/` | legacy | 舊日誌入口；新日誌改寫入 `300_Journal/` |
| `decisions/` | reserved | 只放 AI 執行層決策，不放使用者長期決策 |
| `feedback/` | reserved | 未來可拆 AI feedback；目前先寫入 `MEMORY.md` |

## 判斷規則

如果這件事會改變「AI 之後怎麼工作」，放這裡。

如果這件事描述「使用者是誰、重視什麼、做了什麼決策」，放 `400_Knowledge/self_brain/`。
