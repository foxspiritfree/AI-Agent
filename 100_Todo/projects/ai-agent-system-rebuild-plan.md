# AI-Agent System Rebuild Plan

## 專案定位

把目前已匯入的個人工作流、AI 協作規則、外部方法論、知識庫與日常流程，整理成一套可長期維護的本地 AI 工作系統。

這不是一次性大整理，而是一個由上而下的收斂專案：先壓縮、標準化、模組化，再釐清資料路由，最後逐步整理 skills、workflows 與 knowledge。

## 已確認事實

- 專案根目錄是 `C:\Users\join6\AI-Agent`。
- 主規則入口是 `000_Agent/CORE_RULES.md`，其他工具入口只做 shim。
- `000_Agent/DATA_ROUTING.md` 已定義資料寫入路由。
- `000_Agent/skills/` 已有多個正式 skills。
- `000_Agent/workflows/` 已有多個快捷 workflow。
- `400_Knowledge/self_brain/` 已建立 identity、decisions、projects、people、organizations、concepts、writing_voice 等長期知識層。
- `200_Reference/imported/` 放外部導入與 legacy 素材，不應直接當成執行規則。
- Git working tree 目前有大量既有新增與修改，整理時要小步切分。

## 核心問題

目前系統已經有足夠素材，但還需要回答三件事：

1. 哪些內容是現在正式規則？
2. 哪些內容只是參考素材？
3. 每一類任務應該由哪個 skill、workflow 或 knowledge layer 承接？
4. 目前架構是否讓 AI 每次都重新讀太多 context？
5. 臨時檔案、討論草稿、外部建議應該先落在哪裡，才不會污染正式規則？

## 目標

1. 形成一張清楚的系統地圖，讓新對話可以快速接續。
2. 收斂重複或互相重疊的 rules、skills、workflows。
3. 把外部資訊轉成可執行的本地規則，而不是堆資料。
4. 建立每次整理的驗收方式，避免越整理越亂。
5. 保留日後擴充空間，例如 Notion、Threads、GAS、SOC、知識庫與個人決策系統。

## 非目標

- 不一次重寫全部文件。
- 不先搬動大量知識庫檔案。
- 不把 `200_Reference/imported/` 的外部素材直接升級成正式規則。
- 不先追求完美分類。
- 不在沒有明確價值時新增複雜 automation、database 或 dashboard。

## 推薦專案切法

### Phase 0：建立專案控制面

目標：先有一份可追蹤的總控文件。

交付物：

- 本文件作為 project plan。
- 補一份 `current-system-map.md`，列出目前 rules、skills、workflows、knowledge layers 的責任。
- 補一份 `open-questions.md`，專門放待釐清問題。

驗收：

- 任一新 AI 對話讀完三份文件後，能知道該從哪裡開始。

### Phase 0.5：架構校準

目標：先確認這套 AI Operating System 的核心架構是否有效率，不急著繼續整理既有資料。

校準原則：

| 類型 | 用途 | 本專案暫定位置 |
| --- | --- | --- |
| rules | 永久原則、跨工具行為約束 | `000_Agent/CORE_RULES.md` 與未來 `000_Agent/rules/` |
| skills | 可重複能力 | `000_Agent/skills/<capability>/SKILL.md` |
| templates | 固定輸出格式 | `200_Reference/templates/`，必要時再升級到 `000_Agent/templates/` |
| playbooks | 多步驟執行流程 | `000_Agent/workflows/` 或未來 `000_Agent/playbooks/` |
| memory | AI 執行層踩坑與環境差異 | `000_Agent/memory/MEMORY.md` |
| decisions | 長期設計決策與取捨 | `400_Knowledge/self_brain/decisions/` |
| temporary | 尚未分類的臨時討論、待判斷素材 | `100_Todo/inbox/` |

本階段要討論：

1. 是否建立 `AI_README.md` 作為 30 秒讀取入口。
2. 是否把 skills 從職位導向改成能力導向。
3. 是否保留 `workflows` 名稱，或改採 `playbooks` 概念。
4. 是否建立 `100_Todo/inbox/` 作為臨時檔案入口。
5. 是否新增 skill index，讓 AI 不必每次掃完整 skills 目錄。

驗收：

- 能用一頁入口說明 workspace 地圖、context routing、repo boundary、命名規則。
- 能明確判斷新資料應放 rules、skills、templates、playbooks、memory、decisions 或 temporary。
- 不再把所有東西都塞進 skill。

### Phase 1：釐清系統層級

目標：把「規則、SOP、入口、知識、素材」分清楚。

建議處理順序：

1. `README.md`
2. `000_Agent/CORE_RULES.md`
3. `000_Agent/DATA_ROUTING.md`
4. `000_Agent/skills/README.md`
5. `000_Agent/workflows/README.md`
6. `400_Knowledge/self_brain/README.md`

驗收：

- 每個檔案只回答自己的問題。
- 沒有同一條長期規則在多處重複維護。
- workflow 只當入口，不複製 skill 內容。

### Phase 2：盤點 skills 與 workflows

目標：確認哪些能力已正式啟用，哪些只是半成品。

輸出格式：

| 名稱 | 類型 | 狀態 | 觸發時機 | 單一真相來源 | 下一步 |
| --- | --- | --- | --- | --- | --- |

推薦狀態：

- active：可以直接使用。
- draft：方向合理，但還需要整理。
- imported：外部來源，尚未本地化。
- deprecated：保留追溯，不再新增使用。

驗收：

- 每個 workflow 都能指到一個或多個正式 skill。
- 每個 skill 都有清楚觸發條件與不可做事項。

### Phase 3：整理 Self Brain

目標：讓長期個人脈絡可以被 AI 穩定讀取。

處理順序：

1. identity：偏好、工作方式、禁忌。
2. decisions：重要選擇與取捨。
3. projects：正在推進的長期專案。
4. writing_voice：寫作聲音與內容定位。
5. people / organizations：人物與組織脈絡。
6. concepts：可跨情境使用的模型。

驗收：

- 每個頁面都有「目前理解」與「來源/更新紀錄」。
- 不把流水日記直接當成長期真相。
- 不把未確認外部資訊寫成使用者偏好。

### Phase 4：整理 Knowledge Pipeline

目標：讓 `study` / `body` / article enrichment 的關係清楚。

推薦先做文件收斂，不先改 pipeline 程式。

驗收：

- `400_Knowledge/README.md` 能說清楚 study、body、self_brain 的差異。
- legacy 知識庫只作追溯，不是新寫入入口。
- 文章創作知道要讀哪些 processed cards 與 writing samples。

### Phase 5：建立日常操作閉環

目標：讓系統能真的每天使用，而不是只整理文件。

核心閉環：

- capture：把新資訊放到正確 inbox。
- clarify：判斷是任務、知識、偏好、決策或素材。
- execute：由 workflow / skill 執行。
- review：把結果沉澱到 journal、memory 或 self_brain。
- prune：定期移除重複、過時與未採用內容。

驗收：

- 有一個「今天要做什麼」入口。
- 有一個「把對話沉澱成長期記憶」入口。
- 有一個「掃描待辦與 open threads」入口。

## 第一輪建議 Milestones

### M0：總控文件

狀態：完成

交付：

- `100_Todo/projects/ai-agent-system-rebuild-plan.md`
- `100_Todo/projects/current-system-map.md`
- `100_Todo/projects/open-questions.md`

### M0.5：架構校準

狀態：進行中，第一輪壓縮入口已完成

交付：

- 根據 `Question.md` 校準核心規範層。
- 決定臨時檔案入口。
- 決定是否新增 `AI_README.md` 與 skill index。
- 決定 skills 是否改成能力導向命名。

已完成：

- 已新增 `AI_README.md` 作為 30 秒入口。
- 已新增 `000_Agent/skills/INDEX.md` 作為 skill 路由索引。
- 已新增 `100_Todo/inbox/` 作為臨時檔案入口。
- 已把 `Question.md` 路由到 `100_Todo/inbox/Question.md`。
- 已在 `000_Agent/DATA_ROUTING.md` 補上臨時檔案路由。
- 已讓 `AGENTS.md`、`CLAUDE.md`、`GEMINI.md`、`.cursorrules` 指向 `AI_README.md` 與 skill index。
- 已在 `000_Agent/workflows/README.md` 明確定義 workflow = playbook shortcut。
- 已補 `000_Agent/skills/soc/SKILL.md`，能力名稱為 `incident-triage`。

下一步：

- 檢查 entrypoint 與 `AI_README.md` 是否仍有重複內容。
- 開始 M1：盤點 rules / skills / workflows / knowledge 的責任邊界。
- 標出需要拆分或改名的職位導向 skill，但暫不 rename。

### M1：系統地圖

狀態：進行中，已完成第一份邊界盤點

交付：

- 盤點 rules / skills / workflows / knowledge 的責任邊界。
- 標出重複、衝突、空缺。

已完成：

- 已新增 `100_Todo/projects/m1-boundary-audit.md`。
- 已確認 `AI_README.md`、`CORE_RULES.md`、`DATA_ROUTING.md`、`skills/INDEX.md`、`workflows/README.md`、`self_brain/README.md` 的責任邊界。
- 已標出 workflow SOP 過重、Notion source 重複、memory 子資料夾語意不清、兩種 inbox 容易混淆等問題。

下一步：

- M1-A：補 inbox 與 memory 邊界。
- M1-B：讓 Notion URL / data source 回到 `NOTION_SOURCE_MAP.md` 作為 single source。

M1-A 已完成：

- 已更新 `AI_README.md`，區分 `100_Todo/inbox/` 與 `400_Knowledge/self_brain/inbox/`。
- 已更新 `000_Agent/DATA_ROUTING.md`，補上 self_brain inbox 路由。
- 已新增 `000_Agent/memory/README.md`，標明 memory 子資料夾狀態。

M1-B 已完成第一輪：

- 已讓 `finance-review.md`、`learning-ingest.md`、`inspiration-ingest.md` 改引用 `000_Agent/NOTION_SOURCE_MAP.md`，避免重複維護 Notion URL / data source。

M1-C 第一輪已完成：

- 已新增 `finance-admin-review` skill。
- 已將 `finance-review.md` 瘦身為 playbook shortcut。
- 已將 `learning-ingest` 與 `inspiration-ingest` 的流程細節收斂到 `zettelkasten` skill，workflow 只保留 shortcut。
- 已將 `project-todo-capture.md` 瘦身為 playbook shortcut，Notion data source 改以 `NOTION_SOURCE_MAP.md` 為 single source。

M1-D 已完成：

- 已新增 `000_Agent/skills/CAPABILITY_MAP.md`。
- 已建立能力導向 skill mapping，但不 rename 現有資料夾。
- 已把 `INDEX.md` 定位為路由摘要，`CAPABILITY_MAP.md` 定位為命名策略 single source。

### M2：正式入口收斂

狀態：完成

交付：

- 更新 README 與核心入口說明。
- 保持工具入口檔只做 shim。

已完成：

- 已將 root `README.md` 收斂為正式入口索引與 workspace map，不再重複維護完整資料路由表。
- 已確認 `AGENTS.md`、`CLAUDE.md`、`GEMINI.md`、`.cursorrules` 維持工具 shim，長期規則仍指向 `000_Agent/CORE_RULES.md`。
- 已保留 `AI_README.md` 作為 AI 30 秒快速入口，root `README.md` 作為人類與 repo 首頁入口。

### M3：skills / workflows 分級

狀態：完成

交付：

- skill inventory。
- workflow inventory。
- 決定 active / draft / imported / deprecated。

已完成：

- 已新增 `100_Todo/projects/m3-skills-workflows-inventory.md`。
- 已完成 18 個 skill / package 與 14 個 active workflow 的狀態分級。
- 已標記 `ak-threads-booster` 與 `superpowers` 為 `active package`，不拆成單一 skill。
- 已標記已刪除的 `soc-shift-handover.md` 為 deprecated，由 `soc` / `incident-triage` 承接。
- 已把 `agent-setup-review.md` 補進 workflows index，並確認它指向 `ai-agent-collaboration`。

### M4：Self Brain 第一輪整理

狀態：完成

交付：

- 使用者偏好、AI 協作偏好、目前專案脈絡的 compiled truth。

已完成：

- 已新增 `100_Todo/projects/m4-self-brain-compiled-truth.md` 作為本輪交付摘要。
- 已更新 `400_Knowledge/self_brain/identity/ai-collaboration-preferences.md`，補強直接執行、預設一個推薦、風險提醒邊界與任務完成即停等偏好。
- 已更新 `400_Knowledge/self_brain/identity/user-profile.md`，補上使用者正在建立跨 AI 本地工作系統的脈絡。
- 已更新 `400_Knowledge/self_brain/projects/ai-agent-system.md`，補上 M0-M3 完成狀態、核心文件與下一步。

### M4.5：Open Questions 收斂

狀態：完成

交付：

- 把已被 M0.5-M4 解決的待討論問題移到 resolved。
- 只保留真正需要後續追蹤的問題。

已完成：

- 已更新 `100_Todo/projects/open-questions.md`。
- 已關閉 Q0-Q8 的舊問題。
- 剩餘問題當時縮小為：AK Threads 工作資料位置、Self Brain inbox 第二輪吸收、資料路由架構決策頁；其中資料路由架構決策頁已在 M5 收尾完成。

### M5：日常閉環驗證

狀態：完成第一輪

交付：

- 用一個真實工作日測試 `today`、`journal`、`self-brain-capture`、`project-todo-capture`。

已完成：

- 已新增 `100_Todo/projects/m5-daily-loop-validation.md`。
- 已做 Notion 讀取型驗證，確認 `今日可做事項` 與 `任務蒐集` 能被搜尋到，且 ID 與 `NOTION_SOURCE_MAP.md` 一致。
- 已確認 `journal` workflow 可寫入 `300_Journal/YYYY-MM/YYYY-MM-DD.md`；今日檔案尚未建立，需使用者提供當日內容。
- 已確認 `self-brain-capture` 已在 M4 實際寫回 compiled truth。
- 已確認 `project-todo-capture` 可從 `open-questions.md` 產生 2 個候選任務；本輪未寫入 Notion。
- 已新增 `400_Knowledge/self_brain/decisions/ai-agent-data-routing-architecture.md`，記錄本輪資料路由架構定案。

## 目前推薦下一步

第一輪收尾完成；後續只剩專項整理。

理由：M0-M5 已完成入口、邊界、分級、compiled truth 與日常閉環第一輪驗證；剩餘問題已縮小成 AK Threads runtime data 與 Self Brain inbox 第二輪吸收。

## 待討論問題

目前清單見：

- `100_Todo/projects/open-questions.md`
