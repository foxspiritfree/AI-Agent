---
name: project-todo-capture
description: Use this skill to sync local project TODOs and Open Threads to Notion. Trigger on project TODO capture, 建立待辦, 打包待辦, 專案行動進度, 掌握專案進度, 待整合, 待釐清, Open Threads, TODO, FIXME, next steps, backlog, or reverse-write tasks to Notion.
---

# Project Todo Capture (Sync Todos) Skill

## Goal

Scan the local `AI-Agent` project for unresolved work (both general TODOs and `Open Threads`) and convert them into schedulable Notion tasks in the `待安排項目` view.

## What Counts as Pending Work

Capture actionable items from:
- **Open Threads:** Any bullet point under a `## Open Threads` heading. Convert each bullet into a task titled `釐清：<short topic>`.
- **General TODOs:** Markdown bullets containing `TODO`, `待辦`, `待釐清`, `待追蹤`, `待整合`, `未來可`, `下一步`, `Next`.
- **Planning Docs:** `INTEGRATION_PLAN.md`, `FUTURE_IMPROVEMENTS.md`, `memory-bank/implementation-plan.md`, `progress.md`.

**Do not capture:**
- Completed checklist items (`[x]`).
- Placeholders like `None`, `待補`, `...`.
- Generic advice with no concrete action.

## Scanning Scope & Workflow

1. **Scope:** 
   - Start with explicit paths provided by the user.
   - Default: `000_Agent/**/*.md`, `400_Knowledge/self_brain/**/*.md`, and Project-level docs (`README.md`, `AGENTS.md`).
2. **Preview (Important):** If the scan finds more than 10 candidates, output a preview list grouped by source file and ask for confirmation before writing to Notion.
3. **Notion Target:** Use the Notion data source from `000_Agent/NOTION_SOURCE_MAP.md` (任務 database).
4. **Task Properties:**
   - Write unfinished tasks (no `截止日`).
   - `急迫性` = `anytime`
   - `重要度` = `major` or `minor`
   - `認知指數` = `1`, `2`, or `3`
5. **Deduping:** Search existing Notion tasks. Skip creation if the same source path and pending item already exist.

## Notion Page Template

When creating the Notion task, format the page body like this:

```markdown
## 行動筆記

來源：`<local path>`

待辦/問題來源：
- <original line or bullet, lightly cleaned>

建議處理：
- 確認此待辦是否仍有效
- 若有效，決定要更新文件、建立 workflow/skill，或交由 project-memory 實作
- 完成後回到來源檔移除、改寫，或標記已處理
```

## Safety Boundaries
- Do not write secrets, credentials, or private details to Notion.
- Do not delete or modify source todos in the markdown files unless the user explicitly asks.
- Never set deadlines for these backlog items.
