# Skills Index

這是 skill 路由索引，用來降低每次重新掃描整個 `skills/` 目錄的成本。

完整 SOP 仍以各 skill 的 `SKILL.md` 或指定入口為準。

能力命名策略見：`000_Agent/skills/CAPABILITY_MAP.md`

## 路由原則

- 先看使用者任務，不先套職位。
- 新 skill 優先能力導向命名。
- 舊 skill 短期保留原名，先用 mapping 收斂。
- 不確定時先用較窄的 skill；不要一次套多個重疊 skill。

## Active Skills

| 任務情境 | 使用 skill | 入口 |
| --- | --- | --- |
| 能力增長、練習設計、逆向工程高手、專注與習慣設計 | `ability-growth-planner` | `000_Agent/skills/ability-growth-planner/SKILL.md` |
| 調整 AI 協作規則、外部方法論本地化、檢查規則衝突 | `ai-agent-collaboration` | `000_Agent/skills/ai-agent-collaboration/SKILL.md` |
| Threads 選題、起草、分析、預測、復盤 | `ak-threads-booster` | `000_Agent/skills/ak-threads-booster/SKILL.md` |
| 用 study/body 卡片盒補強文章 | `article-enrichment` | `000_Agent/skills/article-enrichment/SKILL.md` |
| JS/TS、Firebase、GCP、API、前後端實作 | `fullstack` | `000_Agent/skills/fullstack/SKILL.md` |
| 帳務行政待辦檢查、訂閱取消、付款追蹤、卡片管理任務化 | `finance-admin-review` | `000_Agent/skills/finance-admin-review/SKILL.md` |
| Google Apps Script 協作與除錯 | `gas` | `000_Agent/skills/gas/SKILL.md` |
| 日記、工作復盤、session log | `journal` | `000_Agent/skills/journal/SKILL.md` |
| 從 study/body 卡片、讀書筆記、方法論萃取可發展的 skill/workflow | `knowledge-to-skill` | `000_Agent/skills/knowledge-to-skill/SKILL.md` |
| 從 Notion 整理今日任務 | `notion-task-triage` | `000_Agent/skills/notion-task-triage/SKILL.md` |
| 把 Open Threads 打包成 Notion 待安排項目 | `open-threads-to-notion` | `000_Agent/skills/open-threads-to-notion/SKILL.md` |
| PRD、需求拆解、範圍定義 | `pm` | `000_Agent/skills/pm/SKILL.md` |
| 模糊問題釐清、根因分析、決策前整理、下一步判斷 | `problem-framing` | `000_Agent/skills/problem-framing/SKILL.md` |
| 技術專案跨對話接續與 memory-bank | `project-memory` | `000_Agent/skills/project-memory/SKILL.md` |
| 掃描本機專案待辦並打包到 Notion | `project-todo-capture` | `000_Agent/skills/project-todo-capture/SKILL.md` |
| 長期偏好、決策、人物、專案脈絡沉澱 | `self-brain` | `000_Agent/skills/self-brain/SKILL.md` |
| 建立或改善 skill | `skill-creator` | `000_Agent/skills/skill-creator/SKILL.md` |
| 提問設計、訪談、請教、對話釐清、降低防衛的問句 | `strategic-questioning` | `000_Agent/skills/strategic-questioning/SKILL.md` |
| UI/UX 檢查與設計建議 | `uiux` | `000_Agent/skills/uiux/SKILL.md` |
| Notion 匯出、study/body、卡片盒 pipeline | `zettelkasten` | `000_Agent/skills/zettelkasten/SKILL.md` |

## Special Skill Packages

| 套件 | 狀態 | 入口 |
| --- | --- | --- |
| `superpowers` | active package，沒有頂層 `SKILL.md` | `000_Agent/skills/superpowers/using-superpowers/SKILL.md` |
| `soc` | active，能力名稱為 `incident-triage` | `000_Agent/skills/soc/SKILL.md` |

## Capability Mapping Summary

完整策略見 `000_Agent/skills/CAPABILITY_MAP.md`。下表只保留常用摘要，不代表現在已 rename。

| 目前名稱 | 未來能力名稱候選 | 原因 |
| --- | --- | --- |
| `pm` | `requirement-analysis` | 任務核心是需求釐清與範圍控制 |
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
