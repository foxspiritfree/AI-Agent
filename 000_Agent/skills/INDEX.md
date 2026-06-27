# Skills Index

這是 skill 路由索引，用來降低每次重新掃描整個 `skills/` 目錄的成本。

完整 SOP 仍以各 skill 的 `SKILL.md` 或指定入口為準。能力命名策略見：`000_Agent/skills/CAPABILITY_MAP.md`。

## 路由原則與目錄分工

- `000_Agent/skills/` 是正式 skill 的 Single Source of Truth。
- `INDEX.md` 只維護路由摘要；完整流程寫在各 skill 的 `SKILL.md`。
- 先看使用者任務，不先套職位。
- 新 skill 優先能力導向命名；舊 skill 短期保留原名，先用 mapping 收斂。
- 前端、動畫、視覺生成任務若有對應 taste / GSAP / imagegen skill，必須先讀對應 skill 再執行。

## Core Operating Skills

| 任務情境 | 使用 skill | 入口 |
| --- | --- | --- |
| 調整 AI 協作規則、外部方法論本地化、檢查規則衝突 | `ai-agent-collaboration` | `000_Agent/skills/ai-agent-collaboration/SKILL.md` |
| 建立或改善 skill、測試 skill、優化觸發描述 | `skill-creator` | `000_Agent/skills/skill-creator/SKILL.md` |
| 定期盤點踩坑筆記，整合為全域規則或更新現有 skill | `lesson-integration` | `000_Agent/skills/lesson-integration/SKILL.md` |
| 要求完整不省略輸出、禁止 placeholder、處理長輸出分段 | `full-output-enforcement` | `000_Agent/skills/full-output-enforcement/SKILL.md` |

## Product, Engineering, And Ops

| 任務情境 | 使用 skill | 入口 |
| --- | --- | --- |
| 開發新專案、System-build 端到端實作、複雜功能落地 | `fullstack` | `000_Agent/skills/fullstack/SKILL.md` |
| Google Apps Script 協作、除錯、Workspace automation | `gas` | `000_Agent/skills/gas/SKILL.md` |
| 產品大腦、商業診斷、PRD、專案脈絡沉澱與日常任務執行 | `project-memory` | `000_Agent/skills/project-memory/SKILL.md` |
| 單一入口掃描本機專案待辦與 Open Threads 並打包到 Notion | `project-todo-capture` | `000_Agent/skills/project-todo-capture/SKILL.md` |
| SOC / SecOps alert 分析、事件分流、交接、稽核 timeline | `soc` / `incident-triage` | `000_Agent/skills/soc/SKILL.md` |
| 下載第三方工具、處理防毒攔截、套用二進位 wrapper / patch / mod | `safe-download-handling` | `000_Agent/skills/safe-download-handling/SKILL.md` |

## Design, Frontend Taste, And Motion

| 任務情境 | 使用 skill | 入口 |
| --- | --- | --- |
| UI/UX、視覺版面、表格風格、體驗策略檢查與設計建議 | `uiux` | `000_Agent/skills/uiux/SKILL.md` |
| 產品、服務、onboarding、MOT、情緒記憶、成長感與回訪體驗設計 | `experience-design-strategist` | `000_Agent/skills/experience-design-strategist/SKILL.md` |
| Landing page、portfolio、redesign 的 anti-slop 前端美學 | `design-taste-frontend` | `000_Agent/skills/design-taste-frontend/SKILL.md` |
| 需要 v1 taste-skill 舊行為相容 | `design-taste-frontend-v1` | `000_Agent/skills/design-taste-frontend-v1/SKILL.md` |
| 既有網站或 app 升級到高質感、不破壞功能 | `redesign-existing-projects` | `000_Agent/skills/redesign-existing-projects/SKILL.md` |
| 高端 agency 感網站：字體、間距、陰影、卡片、動畫質感 | `high-end-visual-design` | `000_Agent/skills/high-end-visual-design/SKILL.md` |
| 極簡 editorial / workspace 類介面 | `minimalist-ui` | `000_Agent/skills/minimalist-ui/SKILL.md` |
| 工業風、brutalist、資料密集、軍規終端感 UI | `industrial-brutalist-ui` | `000_Agent/skills/industrial-brutalist-ui/SKILL.md` |
| Google Stitch 用 DESIGN.md、語意化設計系統約束 | `stitch-design-taste` | `000_Agent/skills/stitch-design-taste/SKILL.md` |
| AIDA、GSAP 動效、強視覺 landing page 生成約束 | `gpt-taste` | `000_Agent/skills/gpt-taste/SKILL.md` |

## Image Generation And Visual References

| 任務情境 | 使用 skill | 入口 |
| --- | --- | --- |
| 高端品牌指南、logo system、identity deck、visual world 圖像生成 | `brandkit` | `000_Agent/skills/brandkit/SKILL.md` |
| 先生成設計圖，再依圖精準實作網站 | `image-to-code` | `000_Agent/skills/image-to-code/SKILL.md` |
| 產生高質感網站 section reference image | `imagegen-frontend-web` | `000_Agent/skills/imagegen-frontend-web/SKILL.md` |
| 產生高質感 mobile app screen / flow reference image | `imagegen-frontend-mobile` | `000_Agent/skills/imagegen-frontend-mobile/SKILL.md` |

## GSAP Skills

| 任務情境 | 使用 skill | 入口 |
| --- | --- | --- |
| GSAP core tween、easing、stagger、matchMedia | `gsap-core` | `000_Agent/skills/gsap-core/SKILL.md` |
| React / Next.js 中使用 GSAP | `gsap-react` | `000_Agent/skills/gsap-react/SKILL.md` |
| Vue、Nuxt、Svelte、SvelteKit 等非 React framework 動畫 | `gsap-frameworks` | `000_Agent/skills/gsap-frameworks/SKILL.md` |
| ScrollTrigger、scroll-linked、pin、scrub、parallax | `gsap-scrolltrigger` | `000_Agent/skills/gsap-scrolltrigger/SKILL.md` |
| timeline、動畫排序、position parameter、巢狀編排 | `gsap-timeline` | `000_Agent/skills/gsap-timeline/SKILL.md` |
| GSAP plugins、Flip、Draggable、Observer、SplitText 等 | `gsap-plugins` | `000_Agent/skills/gsap-plugins/SKILL.md` |
| GSAP 效能、60fps、layout thrashing、will-change、batching | `gsap-performance` | `000_Agent/skills/gsap-performance/SKILL.md` |
| `gsap.utils`、clamp、mapRange、random、snap、toArray | `gsap-utils` | `000_Agent/skills/gsap-utils/SKILL.md` |

## Writing, Thinking, And Communication

| 任務情境 | 使用 skill | 入口 |
| --- | --- | --- |
| 文字修改、精煉表達、改寫標題、降低認知負荷 | `precision-writing` | `000_Agent/skills/precision-writing/SKILL.md` |
| 模糊問題釐清、根因分析、決策前整理、下一步判斷 | `problem-framing` | `000_Agent/skills/problem-framing/SKILL.md` |
| 提問設計、訪談、請教、需求釐清、降低防衛的問句 | `strategic-questioning` | `000_Agent/skills/strategic-questioning/SKILL.md` |
| 日常溝通、高共情傾聽、情緒認可、低防衛對話設計 | `listening-communication` | `000_Agent/skills/listening-communication/SKILL.md` |
| 說服策略設計、談判協商、推動方案、打破對話僵局 | `persuasion-design` | `000_Agent/skills/persuasion-design/SKILL.md` |
| 能力增長、練習設計、逆向工程高手、專注與習慣設計 | `ability-growth-planner` | `000_Agent/skills/ability-growth-planner/SKILL.md` |

## Knowledge, Memory, And Content

| 任務情境 | 使用 skill | 入口 |
| --- | --- | --- |
| 日記、工作復盤、session log | `journal` | `000_Agent/skills/journal/SKILL.md` |
| 長期偏好、決策、人物、專案脈絡沉澱 | `self-brain` | `000_Agent/skills/self-brain/SKILL.md` |
| Notion 匯出、study/body、卡片盒 pipeline | `zettelkasten` | `000_Agent/skills/zettelkasten/SKILL.md` |
| 用 study/body 卡片盒補強文章 | `article-enrichment` | `000_Agent/skills/article-enrichment/SKILL.md` |
| 從 study/body 卡片、讀書筆記、方法論萃取可發展的 skill/workflow | `knowledge-to-skill` | `000_Agent/skills/knowledge-to-skill/SKILL.md` |
| Threads 選題、起草、分析、預測、復盤 | `ak-threads-booster` | `000_Agent/skills/ak-threads-booster/SKILL.md` |
| 寫作飛輪週報、A/B/C 選題、補個人經驗後產主稿、一稿多平台轉換 | `writing-flywheel` | `000_Agent/skills/writing-flywheel/SKILL.md` |
| 從 Notion 整理今日任務 | `notion-task-triage` | `000_Agent/skills/notion-task-triage/SKILL.md` |
| 帳務行政待辦檢查、訂閱取消、付款追蹤、卡片管理任務化 | `finance-admin-review` | `000_Agent/skills/finance-admin-review/SKILL.md` |

## Ziwei Product Skills

| 任務情境 | 使用 skill | 入口 |
| --- | --- | --- |
| 紫微 LINE 使用流程逐段 review、Rich Menu / LIFF / webhook 實際行為核對 | `ziwei-line-flow-review` | `000_Agent/skills/ziwei-line-flow-review/SKILL.md` |
| 紫微 LINE bot Vite build、Cloud Run deploy、webhook smoke test、LIFF wiring、rich menu、prod verification | `ziwei-line-cloudrun-ops` | `000_Agent/skills/ziwei-line-cloudrun-ops/SKILL.md` |
| 紫微斗數解盤流程、星星指引 narrator、knowledge_base 規則討論 | `ziwei-reading-discussion` | `000_Agent/skills/ziwei-reading-discussion/SKILL.md` |

## Special Skill Packages

| 套件 | 狀態 | 入口 |
| --- | --- | --- |
| `superpowers` | active package，沒有頂層 `SKILL.md` | `000_Agent/skills/superpowers/using-superpowers/SKILL.md` |
| `gsap-*` | active official GSAP skills | `000_Agent/skills/gsap-core/SKILL.md` 等 |
| `design-taste-*` / visual taste skills | active frontend aesthetic constraints | `000_Agent/skills/design-taste-frontend/SKILL.md` 等 |

## Review Notes

- `superpowers` 是工程方法論套件，不取代本地領域 skills。
- `workflows/` 僅保留非單一 skill 能涵蓋之獨立 playbook，如 `code-review.md`。
- 若新增、刪除或 rename skill，必須同步更新本檔與 `000_Agent/skills/README.md` 的現況說明。
