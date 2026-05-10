# M3 Skills / Workflows Inventory

## 目標

盤點 `000_Agent/skills/` 與 `000_Agent/workflows/` 的啟用狀態，確認每個 workflow 是否指回正式 skill，並標出下一輪需要收斂的項目。

## 狀態定義

| 狀態 | 意義 |
| --- | --- |
| active | 可以直接使用，已有清楚觸發條件與正式入口。 |
| draft | 方向合理，但還需要補 SOP、邊界或路由。 |
| imported | 外部來源或上游鏡像，尚未本地化為正式規則。 |
| deprecated | 保留追溯，不再新增使用。 |
| active package | 可以使用，但本質是 skill package，不是單一 skill。 |

## Skills Inventory

| 名稱 | 類型 | 狀態 | 觸發時機 | 單一真相來源 | 下一步 |
| --- | --- | --- | --- | --- | --- |
| `ai-agent-collaboration` | skill | active | 調整 AI 協作規則、外部方法論本地化、檢查規則衝突 | `000_Agent/skills/ai-agent-collaboration/SKILL.md` | 保留 |
| `ak-threads-booster` | package | active package | Threads 選題、起草、分析、預測、復盤、tracker refresh | `000_Agent/skills/ak-threads-booster/SKILL.md` 與其子 skills | 保留 package，不拆 |
| `article-enrichment` | skill | active | 用 study/body 卡片盒補強文章或處理文章增補素材 | `000_Agent/skills/article-enrichment/SKILL.md` | 保留 |
| `finance-admin-review` | skill | active | 帳務行政待辦、訂閱取消、付款追蹤、卡片管理任務化 | `000_Agent/skills/finance-admin-review/SKILL.md` | 保留，不擴成財務建議 |
| `fullstack` | skill | active | JS/TS、Firebase、GCP、API、前後端實作 | `000_Agent/skills/fullstack/SKILL.md` | 暫不拆；拆分條件見 `CAPABILITY_MAP.md` |
| `gas` | skill | active | Google Apps Script、clasp、trigger、scope、quota、Workspace automation | `000_Agent/skills/gas/SKILL.md` | 保留短名，未來可加 `apps-script-automation` alias |
| `journal` | skill | active | 日記、工作復盤、session log、SOC 交接日誌 | `000_Agent/skills/journal/SKILL.md` | 保留 |
| `notion-task-triage` | skill | active | 從 Notion 今日可做事項 / 任務蒐集整理執行順序 | `000_Agent/skills/notion-task-triage/SKILL.md` | 已改為引用 `NOTION_SOURCE_MAP.md` |
| `open-threads-to-notion` | skill | active | 把本機 Open Threads / 待釐清事項打包成 Notion 待安排項目 | `000_Agent/skills/open-threads-to-notion/SKILL.md` | 保留 |
| `pm` | skill | active | PRD、需求拆解、scope definition、acceptance criteria | `000_Agent/skills/pm/SKILL.md` | 暫不 rename；候選能力名見 `CAPABILITY_MAP.md` |
| `project-memory` | skill | active | 技術專案跨工具接續、建立或維護 `memory-bank/` | `000_Agent/skills/project-memory/SKILL.md` | 保留 |
| `project-todo-capture` | skill | active | 掃描本機專案待辦並打包到 Notion 待安排項目 | `000_Agent/skills/project-todo-capture/SKILL.md` | 保留 |
| `self-brain` | skill | active | 長期偏好、決策、人物、專案脈絡、自我分身沉澱 | `000_Agent/skills/self-brain/SKILL.md` | 保留；M4 會用它整理 Self Brain |
| `skill-creator` | skill | active | 建立、修改、測試、優化 skills | `000_Agent/skills/skill-creator/SKILL.md` | 保留為 skill 建立主入口 |
| `soc` | skill | active | SOC / SecOps 事件分流、交接、稽核、incident review | `000_Agent/skills/soc/SKILL.md` | 保留資料夾名；正式能力名 `incident-triage` |
| `superpowers` | package | active package | 軟體開發規劃、TDD、除錯、review、worktree、交付 | `000_Agent/skills/superpowers/using-superpowers/SKILL.md` | 保留 package；不手改 upstream mirror |
| `uiux` | skill | active | UI/UX review、form flow、dashboard layout、accessibility | `000_Agent/skills/uiux/SKILL.md` | 暫不 rename；候選能力名見 `CAPABILITY_MAP.md` |
| `zettelkasten` | skill | active | Notion 匯出、study/body 卡片盒 pipeline、knowledge ingest | `000_Agent/skills/zettelkasten/SKILL.md` | 保留；未來可拆 `knowledge-ingest` |

## Workflows Inventory

| 名稱 | 類型 | 狀態 | 觸發時機 | 單一真相來源 | 下一步 |
| --- | --- | --- | --- | --- | --- |
| `agent-setup-review.md` | workflow | active | 檢查 AI Agent 設定是否過長、衝突或需要改寫 | `ai-agent-collaboration` | 已補進 workflows README |
| `article-enrichment.md` | workflow | active | 文章接上 study/body 卡片盒資料 | `article-enrichment` | 保留 shortcut |
| `code-review.md` | workflow | active | 本專案 code review、自檢、處理 review feedback | `superpowers/requesting-code-review` 與 `receiving-code-review` | 保留 shortcut |
| `finance-review.md` | workflow | active | Notion 帳務行政待辦檢查 | `finance-admin-review` | 保留 shortcut |
| `gas-debug.md` | workflow | active | GAS 除錯、review、clasp / trigger / quota 問題 | `gas` | 保留 shortcut |
| `inspiration-ingest.md` | workflow | active | Notion 靈感蒐集分流到 study/body 或文章素材 | `zettelkasten`；必要時接 `article-enrichment` | 保留 shortcut |
| `journal.md` | workflow | active | 寫日記、工作復盤、session log | `journal` | 保留 shortcut |
| `knowledge-ingest.md` | workflow | active | 匯入 Notion 筆記、處理 study/body inbox、跑卡片盒 pipeline | `zettelkasten` | 保留 shortcut |
| `learning-ingest.md` | workflow | active | Notion 學習 / 課程筆記分流到 study/body | `zettelkasten` | 保留 shortcut |
| `open-threads-to-notion.md` | workflow | active | 把 Open Threads / 待釐清事項寫成 Notion 待安排項目 | `open-threads-to-notion` | 保留 shortcut |
| `project-memory.md` | workflow | active | 建立或接續技術專案 `memory-bank/` | `project-memory` | 保留 shortcut |
| `project-todo-capture.md` | workflow | active | 掃描本機專案待辦並打包成 Notion 任務 | `project-todo-capture` | 保留 shortcut |
| `self-brain-capture.md` | workflow | active | 把對話、偏好、決策、人物/專案脈絡沉澱到 self_brain | `self-brain` | 保留 shortcut |
| `today.md` | workflow | active | 從 Notion 今日可做事項整理執行順序 | `notion-task-triage` | 保留 shortcut |

## Deprecated / Removed

| 名稱 | 類型 | 狀態 | 說明 |
| --- | --- | --- | --- |
| `soc-shift-handover.md` | workflow | deprecated | Git 狀態顯示已刪除；SOC 交接由 `soc` / `incident-triage` skill 承接。 |

## 結論

- 目前沒有需要保留為 `draft` 的正式 skill；既有 18 個 skill 資料夾都可使用。
- `ak-threads-booster` 與 `superpowers` 應維持 `active package`，索引只列 package 入口，不打散。
- 14 個 workflow 都能指到正式 skill 或 package；`agent-setup-review.md` 已列為 active 並補進 `workflows/README.md`。
- `soc-shift-handover.md` 已被刪除，後續不再作為 workflow 入口。

## 下一步

M4 開始整理 Self Brain 第一輪，使用 `self-brain` skill，先做使用者偏好、AI 協作偏好與目前專案脈絡的 compiled truth。
