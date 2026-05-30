# Capability Map

本檔定義 skill 的能力導向命名策略。

目前不 rename 現有資料夾；先用 mapping 建立下一輪拆分與新增 skill 的方向。

## 命名原則

- 以可重複能力命名，不以人類職位命名。
- 名稱應描述 AI 要執行的能力，例如 `requirement-analysis`、`incident-triage`、`finance-admin-review`。
- 舊入口短期保留，避免破壞既有 workflow 與使用習慣。
- 新 skill 優先能力導向命名。
- 只有在舊 skill 過大、觸發混亂或維護成本變高時才拆分。

## Current Routing

| 現有入口 | 能力定位 | 狀態 | 下一步 |
| --- | --- | --- | --- |
| `ai-agent-collaboration` | AI 協作規則校準、外部方法論本地化 | keep | 保留，屬於能力導向 |
| `ak-threads-booster` | Threads growth operating system | package | 保留 package，不拆 |
| `article-enrichment` | article knowledge enrichment | keep | 保留，屬於能力導向 |
| `finance-admin-review` | finance admin triage | keep | 新增能力導向 skill |
| `fullstack` | app implementation / stack-specific engineering | candidate split | 未來依常用 stack 拆成 `react-firebase-stack` 或 `app-implementation` |
| `gas` | apps-script-automation | alias | 短期保留 `gas`，未來可新增能力別名 |
| `journal` | daily-review-capture | alias | 短期保留 `journal`，語意已清楚 |
| `listening-communication` | listening-communication | keep | 保留，屬於能力導向 |
| `notion-task-triage` | daily task triage | keep | 保留，屬於能力導向 |
| `open-threads-to-notion` | backlog capture from open threads | keep | 保留，屬於能力導向 |
| `persuasion-design` | persuasion-design | keep | 保留，屬於能力導向 |
| `pm` | requirement-analysis | alias | 短期保留 `pm`，未來可新增或 rename 為 `requirement-analysis` |
| `precision-writing` | precision-writing | keep | 保留，屬於能力導向 |
| `project-memory` | project context persistence | keep | 保留，屬於能力導向 |
| `project-todo-capture` | project backlog capture | keep | 保留，屬於能力導向 |
| `self-brain` | personal context persistence | keep | 保留，屬於能力導向 |
| `skill-creator` | skill creation and evaluation | keep | 保留，屬於能力導向 |
| `soc` | incident-triage | alias | 資料夾名保留 `soc`，正式能力名為 `incident-triage` |
| `superpowers` | software engineering methodology package | package | 保留 package，不拆 |
| `uiux` | ui-system-review | alias | 短期保留 `uiux`，未來可 rename 或新增能力別名 |
| `zettelkasten` | knowledge-ingest | alias | 短期保留 `zettelkasten`，未來可拆 `knowledge-ingest` |

## Split Candidates

### `fullstack`

目前範圍包含 implementation、debugging、review、Firebase、GCP、GAS、API、auth、database、deployment。

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

### `pm`

目前是產品規劃與需求拆解入口。

推薦暫不 rename。

候選能力名：

- `requirement-analysis`
- `scope-definition`
- `prd-writing`

### `uiux`

目前是 UI/UX review 入口。

推薦暫不 rename。

候選能力名：

- `ui-system-review`
- `interaction-flow-review`
- `dashboard-usability-review`

### `gas`

目前是 Google Apps Script 專案協作入口。

推薦短期保留 `gas`，因為使用者常用領域名比抽象能力更快。

候選能力名：

- `apps-script-automation`
- `workspace-automation-review`

## New Skill Naming Rule

新增 skill 時，先問：

1. 這是否是一個可重複能力？
2. 能不能用動作或能力命名？
3. 是否已有更窄的 skill 能承接？
4. 是否只是 workflow shortcut，而不是 skill？

若答案不清楚，先放 `100_Todo/inbox/` 或寫在專案 plan，暫不新增 skill。

