# workflows/ - 你每天主動喊的固定儀式

這個資料夾放「你手動打一次，AI 就跑一整套流程」的多步驟工作流，例如 `/morning`、`/journal`、`/newsletter`。

語意上，這裡的 workflow 等同 playbook shortcut：它是固定入口與執行順序，不是完整 SOP 的主要維護位置。

## 跟 skills/ 差在哪？

- `skills/` 是方法論與 SOP，會被不同任務引用。
- `workflows/` 是固定儀式、slash 指令 shim 或 playbook shortcut，通常只指向一個或多個正式 skill。
- `superpowers` 是工程流程方法論套件；只有任務進入規劃、實作、TDD、除錯、驗證、code review、worktree 或交付時才接入。

正式步驟不要同時寫在 workflow 和 skill；若兩者重疊，以 `skills/` 為單一真相來源。

## 現有 workflows

- `clarify.md`：把模糊或卡住的事情釐清成問題、假設、下一步；正式流程指向 `problem-framing`，必要時接 `strategic-questioning`。
- `growth.md`：把能力增長目標轉成練習、回饋、習慣與起步計畫；正式流程指向 `ability-growth-planner`。
- `journal.md`：把每日流水、工作復盤、SOC / AI 協作紀錄整理到 `300_Journal`。
- `knowledge-ingest.md`：處理 `400_Knowledge` 的 Notion 匯出與卡片盒 pipeline。
- `learning-ingest.md`：把 Notion「學習」與課程筆記分流到 `study` 卡片盒。
- `inspiration-ingest.md`：處理 Notion「靈感蒐集」到 study/body 卡片盒或文章素材的分流。
- `article-enrichment.md`：把文章草稿接上 `study` / `body` 卡片盒資料，產生延伸知識補充。
- `today.md`：從 Notion 今日可做事項與任務資料庫整理今日執行順序，正式流程指向 `notion-task-triage` skill。
- `sync-todos.md`：掃描本機專案待辦、待釐清與 Open Threads，打包成 Notion 待安排項目。正式流程指向 `project-todo-capture` skill。
- `self-brain-capture.md`：把對話、偏好、決策、人物/專案脈絡沉澱進 `400_Knowledge/self_brain`。
- `project-memory.md`：專案大腦入口。為專案建立或接續 `memory-bank/`，包含 PRD、功能分析與日常任務執行，指向 `project-memory` 巨型 skill。
- `finance-review.md`：檢查 Notion「帳務管理」待處理事項，正式流程指向 `finance-admin-review` skill。
- `gas-debug.md`：Google Apps Script 除錯快捷入口，正式流程指向 `gas` skill。
- `code-review.md`：本專案的專案優化與 Code Review 完整工作流，自帶分析、修改與驗證劇本。
- `agent-setup-review.md`：檢查 AI Agent 設定是否過長、衝突或需要改寫，正式流程指向 `ai-agent-collaboration` skill。
- `system-build.md`：新系統開發完整工作流。從問題討論到夜間交付到後期清單的端到端捷徑，指向 `fullstack` 巨型 skill。
