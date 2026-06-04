# Skills Index

這是 skill 路由索引，用來降低每次重新掃描整個 `skills/` 目錄的成本。

完整 SOP 仍以各 skill 的 `SKILL.md` 或指定入口為準。

能力命名策略見：`000_Agent/skills/CAPABILITY_MAP.md`

## 路由原則與目錄分工

- **`000_Agent/skills/`**：這是大本營，存放 AI 核心方法論與巨型工作流（例如 PM、Fullstack、UIUX）。
- **`.agents/skills/`**：這是外部套件擴充庫。當實作特定框架或工具（如 GSAP）時，AI **必須自動**掛載並讀取此處的 SOP。
- 先看使用者任務，不先套職位。
- 新 skill 優先能力導向命名。
- 舊 skill 短期保留原名，先用 mapping 收斂。

## Superpowers 整合路由

`superpowers` 是工程方法論套件，不取代本專案領域 skills。

| 任務進入階段 | 先用本地 skill | 再接 Superpowers 或外部套件 |
| --- | --- | --- |
| 開發新專案、End-to-End 功能實作 | `fullstack` (System-build 巨型 Skill) | 自動涵蓋 Phase 1~6。遇前端套件時，主動讀取 `.agents/skills/*` |
| 專案日常維護、PRD撰寫、新功能規劃、商業/UX診斷 | `project-memory` (Product Brain 巨型 Skill) | 自帶完整執行迴圈 (Task Execution Engine)，不再跳轉 |
| UI/UX 審查、畫面方向、體驗設計 (單一任務) | `uiux` | 設計已定稿且要落地前端時，接 `writing-plans` 或 `executing-plans` |
| 前端動畫、scroll-driven animation、互動動效 | `uiux` / `fullstack` | 需要實作 GSAP、ScrollTrigger、React 動畫或效能調校時，強制接 `.agents/skills/gsap-*` 官方 skills |
| JS/TS、Firebase、GCP、GAS 實作 (單一任務) | `fullstack` / `gas` | 實作、TDD、除錯、驗證、code review、交付流程接對應 Superpowers skill |
| SOC / SecOps 工具或流程自動化 | `soc` | 需要改程式、測試或交付時，才接 Superpowers；事件分析本身不接 |
| 建立或改善本專案 skill | `skill-creator` | 需要參考通用 skill 寫作方法時，讀 `superpowers/writing-skills` 作補充 |
| code review & 優化專案 workflow | `code-review.md` | 已改寫為 End-to-End 單一優化劇本，包含分析、重構與驗證 |

不需要接 Superpowers 的常見 skills：`journal`、`precision-writing`、`self-brain`、`listening-communication`、`zettelkasten`、`finance-admin-review`、`notion-task-triage`。除非任務明確變成軟體開發，否則保持原 skill 流程。

## Active Skills

| 任務情境 | 使用 skill | 入口 |
| --- | --- | --- |
| 能力增長、練習設計、逆向工程高手、專注與習慣設計 | `ability-growth-planner` | `000_Agent/skills/ability-growth-planner/SKILL.md` |
| 調整 AI 協作規則、外部方法論本地化、檢查規則衝突 | `ai-agent-collaboration` | `000_Agent/skills/ai-agent-collaboration/SKILL.md` |
| Threads 選題、起草、分析、預測、復盤 | `ak-threads-booster` | `000_Agent/skills/ak-threads-booster/SKILL.md` |
| 用 study/body 卡片盒補強文章 | `article-enrichment` | `000_Agent/skills/article-enrichment/SKILL.md` |
| 下載第三方工具、處理防毒攔截、套用二進位 wrapper / patch / mod | `safe-download-handling` | `000_Agent/skills/safe-download-handling/SKILL.md` |
| 開發新專案、System-build 端到端實作 | `fullstack` | `000_Agent/skills/fullstack/SKILL.md` |
| 帳務行政待辦檢查、訂閱取消、付款追蹤、卡片管理任務化 | `finance-admin-review` | `000_Agent/skills/finance-admin-review/SKILL.md` |
| 產品、服務、onboarding、MOT、情緒記憶、成長感與回訪體驗設計 | `experience-design-strategist` | `000_Agent/skills/experience-design-strategist/SKILL.md` |
| Google Apps Script 協作與除錯 | `gas` | `000_Agent/skills/gas/SKILL.md` |
| 日記、工作復盤、session log | `journal` | `000_Agent/skills/journal/SKILL.md` |
| 日常溝通、高共情傾聽、情緒認可、低防衛對話設計 | `listening-communication` | `000_Agent/skills/listening-communication/SKILL.md` |
| 從 study/body 卡片、讀書筆記、方法論萃取可發展的 skill/workflow | `knowledge-to-skill` | `000_Agent/skills/knowledge-to-skill/SKILL.md` |
| 從 Notion 整理今日任務 | `notion-task-triage` | `000_Agent/skills/notion-task-triage/SKILL.md` |
| 說服策略設計、談判協商、推動方案、打破對話僵局 | `persuasion-design` | `000_Agent/skills/persuasion-design/SKILL.md` |
| 文字修改、精煉表達、改寫標題、降低認知負荷 | `precision-writing` | `000_Agent/skills/precision-writing/SKILL.md` |
| 模糊問題釐清、根因分析、決策前整理、下一步判斷 | `problem-framing` | `000_Agent/skills/problem-framing/SKILL.md` |
| 產品大腦、商業診斷、PRD、專案脈絡沉澱與日常任務執行 | `project-memory` | `000_Agent/skills/project-memory/SKILL.md` |
| 單一入口掃描本機專案待辦與 Open Threads 並打包到 Notion | `project-todo-capture` (sync-todos) | `000_Agent/skills/project-todo-capture/SKILL.md` |
| 長期偏好、決策、人物、專案脈絡沉澱 | `self-brain` | `000_Agent/skills/self-brain/SKILL.md` |
| 建立或改善 skill | `skill-creator` | `000_Agent/skills/skill-creator/SKILL.md` |
| 提問設計、訪談、請教、對話釐清、降低防衛的問句 | `strategic-questioning` | `000_Agent/skills/strategic-questioning/SKILL.md` |
| UI/UX、視覺版面、表格風格、體驗策略檢查與設計建議 | `uiux` | `000_Agent/skills/uiux/SKILL.md` |
| Notion 匯出、study/body、卡片盒 pipeline | `zettelkasten` | `000_Agent/skills/zettelkasten/SKILL.md` |
| 紫微 LINE 使用流程逐段 review、Rich Menu / LIFF / webhook 實際行為核對、流程修正需求整理 | `ziwei-line-flow-review` | `000_Agent/skills/ziwei-line-flow-review/SKILL.md` |
| 紫微斗數解盤流程、星星指引 narrator、knowledge_base 規則討論 | `ziwei-reading-discussion` | `000_Agent/skills/ziwei-reading-discussion/SKILL.md` |

## Special Skill Packages

| 套件 | 狀態 | 入口 |
| --- | --- | --- |
| `superpowers` | active package，沒有頂層 `SKILL.md` | `000_Agent/skills/superpowers/using-superpowers/SKILL.md` |
| `gsap-skills` | active package，專案層級 Agent Skills；用於 GSAP core、timeline、ScrollTrigger、plugins、React、performance | `.agents/skills/gsap-core/SKILL.md` 等 `.agents/skills/gsap-*` |
| `soc` | active，能力名稱為 `incident-triage` | `000_Agent/skills/soc/SKILL.md` |

## Capability Mapping Summary

完整策略見 `000_Agent/skills/CAPABILITY_MAP.md`。下表只保留常用摘要，不代表現在已 rename。

| 目前名稱 | 未來能力名稱候選 | 原因 |
| --- | --- | --- |
| `uiux` | `ui-system-review` | 任務核心是介面系統與可用性檢查 |
| `fullstack` | `react-firebase-stack` 或 `app-implementation` | 需依實際常用 stack 再拆 |
| `finance-review` workflow | `finance-admin-review` | 任務核心是帳務行政待辦分流，不是財務建議 |
| `gas` | `apps-script-automation` | 任務核心是 Workspace 自動化 |
| `soc` | `incident-triage` | 任務核心是事件分流、交接與稽核 |
| `journal` | `daily-review-capture` | 任務核心是每日紀錄與復盤 |
| `zettelkasten` | `knowledge-ingest` | 任務核心是知識匯入與卡片化 |

## Review Notes

- `soc` 已補 `SKILL.md`，短期保留資料夾名稱，能力名稱使用 `incident-triage`。
- `superpowers` 是方法論套件，不應硬塞成單一 skill。
- `workflows` 目前維持名稱；語意上視為 playbook shortcut。
- 新增 skill 優先使用能力導向命名，避免新增職位導向入口。
