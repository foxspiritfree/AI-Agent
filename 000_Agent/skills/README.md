# skills/ - 你的 AI 工作手冊

這個資料夾放「AI 遇到某類任務的完整 How-to」。每個子資料夾是一個 skill，裡面通常會有一個 `SKILL.md`。

快速路由索引：`000_Agent/skills/INDEX.md`

能力命名策略：`000_Agent/skills/CAPABILITY_MAP.md`

## 單一真相來源

- 正式 SOP 只寫在 `000_Agent/skills/<skill>/SKILL.md` 或該 skill 的子檔案。
- skill 命名策略只維護在 `000_Agent/skills/CAPABILITY_MAP.md`；`INDEX.md` 只做路由摘要。
- `000_Agent/workflows/` 只當快捷入口，不重複維護完整步驟。
- `200_Reference/imported/` 只放外部導入原始素材，不當成當前執行規則。
- `200_Reference/imported/superpowers/` 是 upstream mirror；本地調整只寫在 `000_Agent/skills/superpowers/README.md` 或專案自己的 skill。

## 你的第一個 skill 怎麼建？

方法 1：使用 skill-creator，請 AI 幫你建立一個可重複使用的工作流程。

方法 2：手動建立一個子資料夾與 `SKILL.md`，frontmatter 至少包含 `name` 和 `description`。

```yaml
---
name: my-first-skill
description: 做某件事時會用到，觸發條件是...
---

把 SOP 寫在這裡。
```

建好之後，就可以用 `/my-first-skill` 或自然語句觸發。

## 目前正式 skills

- `ak-threads-booster`：Threads 選題、起草、分析、預測、復盤；保持獨立外部 skill 包，方便更新。
- `ai-agent-collaboration`：把 AI Agent 方法論客製化成本機規則、skills、workflows 與記憶分工。
- `article-enrichment`：用 `study` / `body` 卡片盒知識補強文章，產生延伸知識補充與寫作樣本路由。
- `finance-admin-review`：檢查帳務行政待辦、訂閱取消、付款追蹤與卡片管理，只做任務化，不做投資/稅務/法律建議。
- `fullstack`：JavaScript / TypeScript、Firebase、GCP、API、前後端實作。
- `gas`：Google Apps Script 專案協作與除錯。
- `journal`：日記、反思、session log。
- `notion-task-triage`：讀取 Notion 今日可做事項、任務蒐集與任務資料庫，整理今日執行順序。
- `open-threads-to-notion`：把本機 Markdown 的 `Open Threads` / 待釐清事項打包成 Notion 待安排項目。
- `pm`：產品規劃、需求拆解、PRD。
- `project-memory`：為 app / 技術專案建立與維護 `memory-bank/`，支援跨工具與新對話接續。
- `project-todo-capture`：掃描本機專案待辦、待釐清、待整合事項，打包成 Notion 待安排項目。
- `self-brain`：把偏好、決策、人物/專案脈絡沉澱到 `400_Knowledge/self_brain`。
- `skill-creator`：建立或改善新的 skill；這是本專案 skill 建立流程的主入口。
- `soc`：SOC / SecOps 事件分流、交接、稽核、流程分析；正式能力名稱為 `incident-triage`。
- `superpowers`：跨 AI 軟體開發方法論；規劃、TDD、系統化除錯、code review、worktree 與交付流程。
- `uiux`：UI/UX 檢查與設計建議。
- `zettelkasten`：`400_Knowledge` 卡片盒 pipeline。

## Superpowers

Superpowers 已安裝為專案內正式 skill 包：

- 啟用入口：`000_Agent/skills/superpowers/using-superpowers/SKILL.md`
- 所有工作流：`000_Agent/skills/superpowers/*/SKILL.md`
- Upstream 參考：`200_Reference/imported/superpowers/`

當任務涉及規劃、實作、除錯、TDD、code review、worktree 或交付時，先讀取 `using-superpowers`，再依任務選用對應子 skill。

`superpowers/writing-skills` 作為方法論參考；真正建立或修改本專案 skills 時，優先使用 `skill-creator`，必要時再參考 `superpowers/writing-skills`。

## 外部參考素材

外部導入但未正式啟用的 skill 或 pro-kit 素材，統一放在：

- `200_Reference/imported/`

除非使用者明確要求，AI 不應把 `200_Reference/imported/` 的內容當成當前執行規則。
