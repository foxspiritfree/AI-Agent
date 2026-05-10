# M1 Boundary Audit

## 目標

盤點 `AI-Agent` 目前各層責任邊界，找出重複、衝突與空缺，避免後續整理只是把既有混亂重新排版。

## 結論

目前架構方向正確，但需要再做一輪收斂。

推薦維持現有資料夾名稱，不急著 rename；先把 single source of truth、路由規則與 workflow / skill 邊界寫清楚。

## 建議責任邊界

| 層級 | Single Source | 責任 | 不應承擔 |
| --- | --- | --- | --- |
| 快速入口 | `AI_README.md` | 30 秒 workspace map、context routing、active project | 長篇 SOP、完整規則 |
| 工具入口 | `AGENTS.md`、`CLAUDE.md`、`GEMINI.md`、`.cursorrules` | 指向快速入口與工具補充 | 跨工具長期規則 |
| 永久規則 | `000_Agent/CORE_RULES.md` | 互動偏好、安全、Git、任務分級、全域行為 | 任務 SOP、資料庫細節、外部素材 |
| 資料路由 | `000_Agent/DATA_ROUTING.md` | 判斷資料放哪裡 | 任務執行步驟 |
| 能力索引 | `000_Agent/skills/INDEX.md` | skill routing、能力 mapping | 完整 skill 教學 |
| 任務能力 | `000_Agent/skills/<skill>/SKILL.md` | 可重複 SOP、任務安全邊界 | 固定 slash 入口 |
| 流程入口 | `000_Agent/workflows/*.md` | playbook shortcut、常用口令、指向 skill | 完整 SOP、長期知識 |
| AI 執行記憶 | `000_Agent/memory/MEMORY.md` | AI 工具踩坑、環境速查、執行 feedback | 使用者人格、長期決策、日誌 |
| Notion 來源地圖 | `000_Agent/NOTION_SOURCE_MAP.md` | Notion URL / data source 對應 | Notion 內容本體、任務 SOP |
| 臨時工作入口 | `100_Todo/inbox/` | 尚未分類的 repo 臨時討論與待判斷素材 | 長期記憶、正式 reference |
| 長期自我脈絡 | `400_Knowledge/self_brain/` | 使用者長期偏好、決策、人物、專案、概念 | 每日流水、AI 工具踩坑 |
| 原始與外部素材 | `200_Reference/` | imported、templates、writing samples、past work | 正式規則、長期 compiled truth |

## 主要發現

### 1. `CORE_RULES.md` 與 `DATA_ROUTING.md` 有刻意重疊

狀態：可接受，但需控制長度。

判斷：

- `CORE_RULES.md` 可以保留最常用資料路由摘要。
- `DATA_ROUTING.md` 應是完整資料路由 single source。

推薦：

- 之後若新增路由，先更新 `DATA_ROUTING.md`。
- `CORE_RULES.md` 只保留高頻摘要與「不知道放哪先讀 DATA_ROUTING」。

### 2. 部分 workflow 已開始承擔 SOP

狀態：需要收斂。

較明顯檔案：

- `000_Agent/workflows/finance-review.md`
- `000_Agent/workflows/learning-ingest.md`
- `000_Agent/workflows/inspiration-ingest.md`
- `000_Agent/workflows/project-todo-capture.md`

判斷：

- workflow 可以保留常用口令與指向 skill。
- 詳細判斷流程、寫入規則、Notion 來源細節，應移到 skill 或 source map。

推薦：

- 先新增 `finance-admin-review` skill，讓 `finance-review.md` 只當 shortcut。
- `learning-ingest.md`、`inspiration-ingest.md` 的流程細節逐步收斂到 `zettelkasten` skill 或新增對應能力段落。

### 3. Notion URL / data source 有重複

狀態：需要指定 single source。

判斷：

- `000_Agent/NOTION_SOURCE_MAP.md` 已存在，應成為 Notion 入口 single source。
- workflow 不應重複維護完整 Notion URL 與 collection id。

推薦：

- workflow 只寫「Notion 來源見 `000_Agent/NOTION_SOURCE_MAP.md`」。
- 反向寫入規則以 `NOTION_SOURCE_MAP.md` 為準，skill 可引用。

### 4. `100_Todo/inbox` 與 `self_brain/inbox` 需要切清楚

狀態：語意接近，但用途不同。

判斷：

- `100_Todo/inbox/`：repo 臨時檔、外部建議、還不知道是否採用的整理素材。
- `400_Knowledge/self_brain/inbox/`：已判斷屬於 self_brain，但暫時無法歸類的長期個人脈絡。

推薦：

- 在 `AI_README.md` 與 `DATA_ROUTING.md` 補一句區分。

### 5. `000_Agent/memory/` 子資料夾缺少狀態說明

狀態：需要補 README，不急著刪。

判斷：

- `000_Agent/memory/MEMORY.md` 已定義主要用途。
- `daily/` 已 deprecated。
- `decisions/`、`feedback/` 目前沒有明確 README。

推薦：

- 新增 `000_Agent/memory/README.md`。
- `daily/` 標記 legacy。
- `decisions/` 只放 AI 執行層決策，不放使用者長期決策；使用者決策放 `self_brain/decisions/`。

### 6. Skill 命名仍混合職位導向與能力導向

狀態：可接受，不應一次 rename。

判斷：

- `pm`、`uiux`、`fullstack` 是舊有習慣入口。
- `incident-triage` 已展示能力導向命名方式。

推薦：

- 短期保留舊資料夾名。
- 新 skill 使用能力導向命名。
- 用 `000_Agent/skills/INDEX.md` 維護 mapping。

### 7. Skill package 邊界需要維持

狀態：目前可接受。

判斷：

- `superpowers` 是方法論套件，不應硬塞成單一 skill。
- `ak-threads-booster` 有自己的子 skill 系統，也不應打散。

推薦：

- `skills/INDEX.md` 只列 package 入口。
- 若之後使用頻繁，再為 `superpowers` 與 `ak-threads-booster` 各自補 package index。

## M1 建議下一步

### M1-A：補 inbox 與 memory 邊界

狀態：完成

交付：

- 更新 `AI_README.md`，區分 `100_Todo/inbox` 與 `self_brain/inbox`。
- 新增 `000_Agent/memory/README.md`。

### M1-B：Notion 來源 single source

狀態：完成第一輪

交付：

- 更新 `finance-review.md`、`learning-ingest.md`、`inspiration-ingest.md`，讓 Notion URL 只維護在 `NOTION_SOURCE_MAP.md`。

已完成：

- `finance-review.md` 已改為引用 `000_Agent/NOTION_SOURCE_MAP.md`。
- `learning-ingest.md` 已改為引用 `000_Agent/NOTION_SOURCE_MAP.md`。
- `inspiration-ingest.md` 已改為引用 `000_Agent/NOTION_SOURCE_MAP.md`。

### M1-C：workflow 瘦身

狀態：進行中，已完成 `finance-review`

交付：

- 建立或補強對應 skills。
- workflow 只保留目標、使用時機、常用口令、正式 skill 指向。

已完成：

- 已新增 `000_Agent/skills/finance-admin-review/SKILL.md`。
- 已瘦身 `000_Agent/workflows/finance-review.md`，保留 shortcut 語意與安全邊界。
- 已更新 `skills/INDEX.md`、`skills/README.md`、`workflows/README.md` 與 `NOTION_SOURCE_MAP.md`。
- 已把 `learning-ingest` 與 `inspiration-ingest` 的正式流程收斂到 `zettelkasten` skill。
- 已瘦身 `learning-ingest.md` 與 `inspiration-ingest.md`，只保留 shortcut、常用口令與邊界摘要。

下一步：

- 已檢查 `project-todo-capture.md`，並將寫入規則維持在 `project-todo-capture` skill。
- 已更新 `project-todo-capture` skill，Notion data source 以 `NOTION_SOURCE_MAP.md` 為 single source。

M1-C 第一輪已完成。

### M1-D：能力導向 skill mapping

狀態：完成

交付：

- 在 `skills/INDEX.md` 標示哪些舊 skill 先保留、哪些未來可拆。
- 不做 rename。

已完成：

- 已新增 `000_Agent/skills/CAPABILITY_MAP.md`。
- 已更新 `000_Agent/skills/INDEX.md`，讓它只保留路由摘要與 mapping summary。
- 已更新 `000_Agent/skills/README.md` 與 `AI_README.md`，指向 capability map。
- 已明確標示 `fullstack`、`pm`、`uiux`、`gas`、`journal`、`zettelkasten`、`soc` 的 keep / alias / package / candidate split 狀態。

## 不建議現在做

- 不搬動整個 `workflows/` 到 `playbooks/`。
- 不一次 rename `pm`、`uiux`、`fullstack`。
- 不清理大量 `200_Reference/imported/`。
- 不刪除 `000_Agent/memory/daily/`，先標記 legacy。
