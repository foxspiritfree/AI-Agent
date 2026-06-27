# AI_README

這是 AI 進入 `C:\Users\join6\AI-Agent` 時的 30 秒入口。

完整規則仍以各正式檔案為準；本檔只負責快速定位，不放長篇 SOP。

## 專案定位

本 repo 是個人 AI Operating System：管理跨 AI 工具共用的規則、能力、流程、記憶、知識與參考素材。

## 先讀順序

若已經從 `AGENTS.md`、`CLAUDE.md`、`GEMINI.md` 或 `.cursorrules` 進入，從本檔開始即可。

1. `000_Agent/CORE_RULES.md`：跨工具長期規則。
2. `000_Agent/DATA_ROUTING.md`：資料該放哪裡。
3. `000_Agent/skills/INDEX.md`：任務要用哪個 skill。
4. `000_Agent/workflows/README.md`：固定流程入口。

## Workspace Map

| 路徑 | 用途 |
| --- | --- |
| `000_Agent/` | AI 規則、skills、workflows、執行記憶 |
| `100_Todo/` | 進行中草稿、專案、臨時 inbox |
| `200_Reference/` | 外部導入、原始素材、模板、寫作樣本 |
| `300_Journal/` | 每日紀錄、工作復盤、session log |
| `400_Knowledge/` | 長期知識、卡片盒、自我分身脈絡 |

## Context Routing

| 內容 | 先看 |
| --- | --- |
| 不知道資料該放哪 | `000_Agent/DATA_ROUTING.md` |
| repo 臨時討論、外部建議、待判斷素材 | `100_Todo/inbox/` |
| 已屬於 self_brain 但暫時無法歸類的長期個人脈絡 | `400_Knowledge/self_brain/inbox/` |
| AI 長期行為規則 | `000_Agent/CORE_RULES.md` |
| 可重複任務能力 | `000_Agent/skills/INDEX.md` |
| skill 能力命名策略 | `000_Agent/skills/CAPABILITY_MAP.md` |
| 固定 slash / 儀式流程 | `000_Agent/workflows/README.md` |
| Notion URL / data source | `000_Agent/NOTION_SOURCE_MAP.md` |
| 使用者長期偏好與決策 | `400_Knowledge/self_brain/` |
| 知識卡片處理 | `400_Knowledge/README.md` |

## Repo Boundary

- 不把 `200_Reference/imported/` 直接當正式規則。
- 不把 workflow 寫成完整 SOP；完整步驟放 skill。
- 不把 daily log 當長期真相；長期理解寫入 `self_brain`。
- 不混用 `100_Todo/inbox/` 與 `self_brain/inbox/`；前者是 repo 臨時素材，後者是長期個人脈絡待分類。
- 不把所有東西塞進 skill；先判斷是 rules、skills、templates、playbooks、memory、decisions 或 temporary。

## Naming Direction

- 現有 skill 短期保留原名，避免破壞入口。
- 新 skill 優先用能力導向命名，例如 `requirement-analysis`、`incident-triage`、`api-contract-design`。
- 現有 `workflows` 僅保留無法由單一 skill 涵蓋的獨立 playbook；純轉發 skill 的 shortcut 不再保留。

## Active Project

目前正在整理本 repo 自身：

- 計畫：`100_Todo/projects/ai-agent-system-rebuild-plan.md`
- 系統地圖：`100_Todo/projects/current-system-map.md`
- 待討論問題：`100_Todo/projects/open-questions.md`
