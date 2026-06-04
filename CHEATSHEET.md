# AI-Agent 常用指令速查

## 1. 進入 AI-Agent 資料夾

    cd $HOME\AI-Agent

## 2. 查看共用規則

    notepad $HOME\AI-Agent\000_Agent\CORE_RULES.md

或：

    cat $HOME\AI-Agent\000_Agent\CORE_RULES.md

## 3. 修改完 CORE_RULES 後同步到各 AI 入口檔

    powershell -ExecutionPolicy Bypass -File "$HOME\AI-Agent\sync-agent.ps1"

會同步到：

    CLAUDE.md
    AGENTS.md
    GEMINI.md
    .cursorrules

## 4. 啟動各 AI CLI

啟動 Claude Code：

    cc

啟動 Codex：

    cx

啟動 Gemini：

    gm

## 5. 安全刪除檔案或資料夾

    safe-remove .\some-file.txt

或：

    trash .\some-folder

會移到垃圾桶，不是永久刪除。

## 6. 查看目前 Git 狀態

    git status

## 7. 第一次把 AI-Agent 備份到 GitHub

先在 GitHub 建好 Private repo，名稱建議：

    AI-Agent

然後執行：

    cd $HOME\AI-Agent
    git init
    git add .
    git commit -m "Initial AI-Agent setup"
    git branch -M main
    git remote add origin https://github.com/foxspiritfree/AI-Agent.git
    git push -u origin main

## 8. 平常更新備份

    cd $HOME\AI-Agent
    git status
    git add .
    git commit -m "Update AI-Agent rules"
    git push

## 9. 在新電腦下載設定

    cd $HOME
    git clone https://github.com/foxspiritfree/AI-Agent.git

下載後執行：

    powershell -ExecutionPolicy Bypass -File "$HOME\AI-Agent\sync-agent.ps1"

## 10. 讓 AI 先讀你的設定

Claude：

    請先讀取：
    C:\Users\join6\AI-Agent\CLAUDE.md

Codex：

    請先讀取：
    C:\Users\join6\AI-Agent\AGENTS.md

Gemini：

    請先讀取：
    C:\Users\join6\AI-Agent\GEMINI.md

通用：

    請先讀取我的共用 AI 設定：
    C:\Users\join6\AI-Agent\000_Agent\CORE_RULES.md

## 11. 建議加入 .gitignore

    .env
    *.key
    *.pem
    *.p12
    *.pfx
    secrets/
    private/
    credentials/
    tokens/
    *.log
    .DS_Store
    Thumbs.db

## 12. 備份原則

- 使用 GitHub Private repo。
- 小改 CORE_RULES / skill / workflow 後可以 commit。
- 一週至少 push 一次。
- 換電腦前一定 push。
- 不要把 API key、token、公司機密、客戶個資、真實告警細節放進 repo。

## 13. 工作流 (Workflows) 使用場景與捷徑

這份速查表整理了 `000_Agent/workflows/` 下的所有工作流（Playbook Shortcuts），可以手動對 AI 喊對應口令，AI 就會跑完一整套跨 Skill 流程。

### 📊 工作流速查總覽表

| 分類 | 捷徑檔案 | 使用場景 (Usage Scenario) | 常用觸發口令 (Trigger Keywords / Prompts) | 對應背後 Skill |
| :--- | :--- | :--- | :--- | :--- |
| **系統與專案開發** | `system-build.md` | 新系統開發完整 6-Phase 流程：討論、PRD、設計、計畫、夜間交付、後期清單。 | `system-build`、`開始做新系統`、`新系統開發工作流` | `problem-framing` -> `pm` -> `uiux` -> `fullstack` |
| | `project-memory.md` | 新專案、長任務、跨工具交接時建立/重讀專案脈絡及三級任務架構。 | `project-memory`、`專案啟動`、`日常推進`、`中途追加` | `project-memory` |
| | `code-review.md` | 快速找出 Bug、風險、可維護性問題，給出最小修改與驗證方案。 | `code-review`、`幫我 review code` | `superpowers` (review) |
| | `gas-debug.md` | Google Apps Script 除錯、試算表自動化、clasp/quota 問題最小修正。 | `gas-debug`、`GAS 除錯`、`Google Sheets 自動化` | `gas` |
| **知識與寫作整理** | `knowledge-ingest.md` | 把 Notion 匯出的靈感/筆記整理成卡片盒筆記（study/body），送入本機知識庫。 | `knowledge-ingest`、`匯入 Notion 筆記`、`跑卡片盒`、`整理讀書心得` | `zettelkasten` |
| | `learning-ingest.md` | 把 Notion「學習」與課程筆記中已整理內容，分流到 study 卡片盒。 | `掃 Notion 學習入口，把可整理的筆記分流到 study，先列清單不要搬` | `zettelkasten` |
| | `inspiration-ingest.md` | 把 Notion「靈感蒐集」中的靈感、筆記、工具整理成分流素材。 | `掃 Notion 靈感蒐集，把可整理的素材分流到 study/body/文章素材` | `zettelkasten` |
| | `article-enrichment.md` | 把文章草稿接上卡片盒知識，產生可追溯的延伸補充並保留乾淨原文。 | `article-enrichment`、`幫文章補知識卡片`、`用卡片盒增補文章` | `article-enrichment` |
| **任務與個人管理** | `today.md` | 從 Notion「今日可做事項」和任務資料庫，整理出今天執行順序。 | `today`、`讀 Notion 今日可做事項，給我今天的執行順序` | `notion-task-triage` |
| | `open-threads-to-notion.md`| 把本機 Markdown 檔案中的 `Open Threads` 打包成 Notion 待安排任務。 | `掃 self_brain 的 Open Threads，打包成 Notion 待安排項目` | `open-threads-to-notion` |
| | `project-todo-capture.md` | 掃描本機專案中的待辦、待釐清、待整合事項，打包成 Notion 待安排。 | `project-todo`、`掃專案待辦，打包成 Notion 待安排項目` | `project-todo-capture` |
| | `self-brain-capture.md` | 把對話、想法、決策、人物/專案關係沉澱進長期自我分身個人腦。 | `self-brain-capture`、`記住這件事`、`沉澱到自我分身`、`我的偏好` | `self-brain` |
| | `journal.md` | 整理每日流水、工作復盤、SOC/AI 協作紀錄，產出可回查日記。 | `journal`、`寫日記`、`今天結束了`、`工作日誌`、`SOC 交接日誌` | `journal` |
| | `finance-review.md` | 檢查 Notion「帳務管理」待處理行政事項（不搬敏感金額與資料進 repo）。| `finance-review`、`掃 Notion 帳務管理，列出需要我安排處理的項目` | `finance-admin-review` |
| **分析、評估與優化** | `clarify.md` | 把模糊、卡住、待判斷的事情，整理成清楚的問題、阻礙、下一步。 | `clarify`、`幫我釐清`、`我卡住了`、`拆一下這個問題` | `problem-framing` + `strategic-questioning` |
| | `growth.md` | 把想增長的能力，轉成可練習、可回饋的 7-14 天起步計畫與習慣設計。 | `growth`、`我想提升某能力`、`幫我設計練習`、`建立學習計畫` | `ability-growth-planner` |
| | `agent-setup-review.md` | 檢查 AI Agent 的客製化設定（CORE_RULES/skills）是否過長或衝突。 | `agent-setup-review`、`檢查 AI 設定`、`優化代理設定` | `ai-agent-collaboration` |

