# Capability Map

本檔定義 skill 的能力導向命名策略。

目前不 rename 現有資料夾；先用 mapping 建立下一輪拆分與新增 skill 的方向。

## 命名原則

- 以可重複能力命名，不以人類職位命名。
- 名稱應描述 AI 要執行的能力，例如 `requirement-analysis`、`incident-triage`、`finance-admin-review`。
- 舊入口短期保留，避免破壞既有使用習慣。
- 新 skill 優先能力導向命名。
- 只有在舊 skill 過大、觸發混亂或維護成本變高時才拆分。

## Current Routing

| 現有入口 | 能力定位 | 狀態 | 下一步 |
| --- | --- | --- | --- |
| `ability-growth-planner` | ability growth planning | keep | 保留 |
| `ai-agent-collaboration` | AI 協作規則校準、外部方法論本地化 | keep | 保留 |
| `ak-threads-booster` | Threads growth operating system | package | 保留 package，不拆 |
| `article-enrichment` | article knowledge enrichment | keep | 保留 |
| `brandkit` | brand-kit image generation | keep | 保留 visual generation skill |
| `design-taste-frontend` | frontend taste enforcement | keep | 作為目前 taste 預設入口 |
| `design-taste-frontend-v1` | legacy frontend taste behavior | legacy | 只在需要 v1 相容時使用 |
| `experience-design-strategist` | experience strategy design | keep | 保留 |
| `finance-admin-review` | finance admin triage | keep | 保留 |
| `full-output-enforcement` | complete output enforcement | keep | 保留 |
| `fullstack` | app implementation / system build | candidate split | 未來依常用 stack 拆成更窄工程 skill |
| `gas` | apps-script-automation | alias | 短期保留 `gas` |
| `gpt-taste` | opinionated frontend and GSAP taste | keep | 保留，必要時與 taste skills 合併評估 |
| `gsap-*` | GSAP implementation guidance | package | 保留官方 GSAP skill family |
| `high-end-visual-design` | premium visual design rules | keep | 保留 |
| `image-to-code` | image-first web implementation | keep | 保留 |
| `imagegen-frontend-mobile` | mobile app reference image generation | keep | 保留 |
| `imagegen-frontend-web` | web section reference image generation | keep | 保留 |
| `industrial-brutalist-ui` | industrial brutalist UI direction | keep | 保留 |
| `journal` | daily-review-capture | alias | 短期保留 `journal` |
| `knowledge-to-skill` | knowledge-to-capability conversion | keep | 保留 |
| `lesson-integration` | lesson-to-rule integration | keep | 保留 |
| `listening-communication` | listening and low-defense communication | keep | 保留 |
| `minimalist-ui` | minimalist editorial UI direction | keep | 保留 |
| `notion-task-triage` | daily task triage | keep | 保留 |
| `persuasion-design` | persuasion design | keep | 保留 |
| `precision-writing` | precision writing | keep | 保留 |
| `problem-framing` | problem framing and root-cause thinking | keep | 保留 |
| `project-memory` | project context persistence and PM execution | keep | 保留 |
| `project-todo-capture` | project backlog capture | keep | 保留 |
| `redesign-existing-projects` | existing product redesign | keep | 保留 |
| `safe-download-handling` | binary download and patch safety | keep | 保留 |
| `self-brain` | personal context persistence | keep | 保留 |
| `skill-creator` | skill creation and evaluation | keep | 保留 |
| `soc` | incident-triage | alias | 資料夾名保留 `soc`，正式能力名為 `incident-triage` |
| `stitch-design-taste` | Stitch design-system generation | keep | 保留 |
| `strategic-questioning` | strategic questioning | keep | 保留 |
| `superpowers` | software engineering methodology package | package | 保留 package，不拆 |
| `uiux` | ui-system-review | alias | 短期保留 `uiux` |
| `writing-flywheel` | writing flywheel orchestration | keep | 週報、選題、個人經驗補強、主稿與多平台轉換總編輯入口 |
| `zettelkasten` | knowledge-ingest | alias | 短期保留 `zettelkasten`，未來可拆 `knowledge-ingest` |
| `ziwei-line-cloudrun-ops` | Ziwei LINE production ops | keep | 保留專案專用 skill |
| `ziwei-line-flow-review` | Ziwei LINE flow review | keep | 保留專案專用 skill |
| `ziwei-reading-discussion` | Ziwei reading discussion | keep | 保留專案專用 skill |

## Split Candidates

### `fullstack`

目前範圍包含 system build、implementation、debugging、review、Firebase、GCP、API、auth、database、deployment。

推薦暫不拆。

拆分條件：

- 同時有多個 app 專案需要不同 stack 規則。
- `fullstack` 變得過長，導致 AI 讀取成本高。
- Firebase / GCP / frontend / API contract 各自有穩定重複 SOP。

候選拆分：

- `react-firebase-stack`
- `api-contract-design`
- `cloud-deployment-review`
- `auth-and-permission-review`

### Visual Taste Skills

目前 `design-taste-frontend`、`gpt-taste`、`high-end-visual-design`、`minimalist-ui`、`industrial-brutalist-ui`、`redesign-existing-projects` 有重疊。

推薦暫不合併，因為它們代表不同觸發情境：

- `design-taste-frontend`：一般 anti-slop 前端預設入口。
- `redesign-existing-projects`：既有產品改版。
- `high-end-visual-design`、`minimalist-ui`、`industrial-brutalist-ui`：明確視覺方向。
- `gpt-taste`：強 GSAP / AIDA / editorial landing page 約束。

合併條件：觸發混亂、輸出互相矛盾，或同一任務經常需要同時讀 3 個以上 taste skills。

### Image Generation Skills

`brandkit`、`image-to-code`、`imagegen-frontend-web`、`imagegen-frontend-mobile` 應保持分工：

- `brandkit`：品牌系統圖像。
- `imagegen-frontend-web`：網站 section reference。
- `imagegen-frontend-mobile`：mobile screen reference。
- `image-to-code`：圖像先行再落地成網站。

## New Skill Naming Rule

新增 skill 時，先問：

1. 這是否是一個可重複能力？
2. 能不能用動作或能力命名？
3. 是否已有更窄的 skill 能承接？
4. 是否只是 workflow shortcut，而不是 skill？

若答案不清楚，先放 `100_Todo/inbox/` 或寫在專案 plan，暫不新增 skill。
