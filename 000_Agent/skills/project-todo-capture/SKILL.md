---
name: project-todo-capture
description: Use this skill when the user wants to collect pending actions from the local AI-Agent project and turn them into Notion 待安排項目 tasks. Trigger on project TODO capture, 建立待辦, 打包待辦, 專案行動進度, 掌握專案進度, 待整合, 待釐清, Open Threads, TODO, FIXME, next steps, future work, backlog, or reverse-write tasks to Notion.
---

# Project Todo Capture Skill

## Goal

Turn unresolved work inside the local `AI-Agent` project into schedulable Notion tasks, so the user can arrange work from Notion while keeping source context traceable in the repo.

This is the general rule. `open-threads-to-notion` is a narrower special case for `Open Threads`.

## What Counts as a Todo

Capture actionable items from:

- `Open Threads` sections.
- Markdown bullets containing `TODO`, `待辦`, `待釐清`, `待追蹤`, `待整合`, `未來可`, `下一步`, `Next`.
- Workflow or skill docs that say a feature is not yet built.
- Planning docs such as `INTEGRATION_PLAN.md`, `FUTURE_IMPROVEMENTS.md`, `M0_AUDIT.md`, `memory-bank/implementation-plan.md`, `progress.md`.
- Notion integration notes in `000_Agent/NOTION_SOURCE_MAP.md`.

Do not capture:

- Completed checklist items.
- Examples inside templates unless they are clearly real pending work.
- Placeholder text such as `None`, `待補`, `...`.
- Generic advice with no action.

## Default Source Scope

Scan in this order:

1. Explicit file or folder named by the user.
2. `000_Agent/**/*.md`
3. `400_Knowledge/self_brain/**/*.md`
4. `400_Knowledge/*.md`
5. Project-level docs: `README.md`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `CHEATSHEET.md`

For large scans, first produce a preview list. Create Notion tasks only after confirmation if there are more than 10 candidates.

## Notion Target

Notion data source IDs are maintained only in:

- `000_Agent/NOTION_SOURCE_MAP.md`

Use the `任務` data source. To appear in `待安排項目`, write unfinished tasks with no `截止日`.

Default properties:

- `急迫性 = "anytime"`
- `重要度 = "major"` for system/workflow/project-control items; `"minor"` for cleanup
- `認知指數 = "3"` for design decisions; `"2"` for normal clarification/implementation; `"1"` for filing/checklist work
- `預計時間hr`: `0.5`, `0.75`, or `1` unless the source gives a better estimate

## Candidate Format

Before writing, normalize each candidate:

```text
title: <short action title>
source: <local path>
source_detail: <heading or nearby line>
reason: <why this should become a task>
importance: major|minor
cognitive_load: 1|2|3
estimate_hr: 0.5|0.75|1
```

Title prefixes:

- `釐清：` for unresolved questions.
- `建立：` for new workflow/skill/docs.
- `整合：` for moving Notion/local material into the project.
- `檢查：` for audits or reviews.
- `修正：` for known defects.

## Deduping

Before creating a task, search Notion task titles and highlights with key title terms.

Skip creation if:

- a likely task already exists, or
- the same source path and same pending item are already in a Notion task.

When unsure, prefer previewing instead of writing duplicates.

## Notion Page Body

Use:

```markdown
## 行動筆記

來源：`<local path>`

待辦來源：
- <original line or bullet, lightly cleaned>

建議處理：
- 確認這個待辦是否仍有效
- 若有效，決定要更新文件、建立 workflow/skill、寫入 self_brain，或排入專案實作
- 完成後回到來源檔移除、改寫，或標記已處理
```

## Workflow

1. Run `git status --short`.
2. Read `000_Agent/NOTION_SOURCE_MAP.md` for target rules if it exists.
3. Scan the selected source scope.
4. Produce candidates.
5. If candidates are 10 or fewer, create Notion tasks unless the user asked for preview only.
6. If candidates are more than 10, show a preview grouped by source and wait for confirmation.
7. Report created and skipped task links.

## Safety

- Do not write secrets, credentials, account numbers, financial amounts, or private personal details into Notion.
- Do not delete or modify source todos unless explicitly asked.
- Do not set deadlines; these tasks belong in `待安排項目`.
- Do not create tasks from private raw journal content unless the user explicitly names that source.
