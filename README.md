# AI-Agent

跨 AI 共用的本地工作助理設定庫。

AI 快速入口：`AI_README.md`。

## 正式入口

不同工具會讀不同入口檔，但正式規則只維護在核心文件：

| 用途 | 入口 |
| --- | --- |
| 30 秒快速定位 | `AI_README.md` |
| 跨工具長期規則 | `000_Agent/CORE_RULES.md` |
| 資料寫入路由 | `000_Agent/DATA_ROUTING.md` |
| Skill 路由 | `000_Agent/skills/INDEX.md` |
| Workflow / playbook shortcut | `000_Agent/workflows/README.md` |

`AGENTS.md`、`CLAUDE.md`、`GEMINI.md`、`.cursorrules` 只作為工具 shim；新增通用規則時更新 `000_Agent/CORE_RULES.md`。

## Workspace Map

| 路徑 | 用途 |
| --- | --- |
| `000_Agent/` | AI 規則、skills、workflows、執行記憶 |
| `100_Todo/` | 進行中草稿、專案、臨時 inbox |
| `200_Reference/` | 外部導入、原始素材、模板、寫作樣本 |
| `300_Journal/` | 每日紀錄、工作復盤、session log |
| `400_Knowledge/` | 長期知識、卡片盒、自我分身脈絡 |

## 維護原則

- 不知道資料該放哪裡時，先看 `000_Agent/DATA_ROUTING.md`。
- 不知道任務該用哪個 skill 時，先看 `000_Agent/skills/INDEX.md`。
- 固定 slash / 儀式流程只放入口，完整 SOP 放 skill。
- 外部導入與 legacy 素材只作參考，不直接升級成正式規則。
