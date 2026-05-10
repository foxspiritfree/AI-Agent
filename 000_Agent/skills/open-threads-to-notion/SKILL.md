---
name: open-threads-to-notion
description: Use this skill when the user wants to turn Open Threads, unresolved questions, TODOs, future clarifications, or pending decisions from local Markdown files into Notion tasks. Trigger when they mention Open Threads, 待釐清, 待追蹤, 未來要釐清, 打包成任務, 反向寫入 Notion, 待安排項目, or backlog capture.
---

# Open Threads to Notion Skill

## Goal

Scan local knowledge files for unresolved `Open Threads`, package them into actionable Notion tasks, and write them to the Notion `待安排項目` view by creating undated unfinished tasks in the user's task database.

This skill is for turning unclear future work into a schedulable backlog. It does not resolve the thread itself.

## Source Scope

Default source:

- `400_Knowledge/self_brain/**/*.md`

Also allow explicit paths from the user, such as:

- `400_Knowledge/self_brain/identity/ai-collaboration-preferences.md`
- `400_Knowledge/self_brain/projects/*.md`
- `000_Agent/**/*.md`

Before scanning many files, start with a small scoped path if the user provided one.

## Notion Target

Write tasks to the Notion task data source:

- `collection://96789b11-256c-4401-a57b-4355fdf0e616`

To make a task appear in `待安排項目`, create it with:

- `Done = "__NO__"`
- no `截止日`

Recommended defaults:

- `急迫性 = "anytime"`
- `重要度 = "major"` for cross-system/process work, otherwise `"minor"`
- `認知指數 = "2"` for ordinary clarification, `"3"` for hard design decisions, `"1"` for simple filing
- `預計時間hr = 0.5` to `1`

## Extraction Rules

1. Find `## Open Threads` sections.
2. Extract bullet items until the next heading of the same or higher level.
3. Ignore placeholders like `None`, `待補`, empty bullets, or already resolved notes.
4. Convert each item into one Notion task unless several bullets clearly belong together.
5. Include the source file path in the task content so the user can trace it later.

Task title format:

```text
釐清：<short thread topic>
```

Use short natural titles. Do not include full file paths in the title.

## Deduping

Before writing, search Notion tasks for a few key terms from the proposed title.

If a likely duplicate exists:

- do not create another task
- report the existing task URL

If unsure, create the task only when the source file path and thread content are not already present in an existing task.

## Notion Content Template

Use this page body:

```markdown
## 行動筆記

來源：`<local file path>`

Open thread:
- <original bullet, lightly cleaned>

建議處理：
- 釐清這個 open thread 是否仍有效
- 若有效，決定要更新原檔、拆成 workflow/skill，或寫入 self_brain
- 處理後回到來源檔移除或改寫 Open Threads
```

## Output

After writing, report:

- created task count
- skipped duplicate count
- task links

Keep the answer short.

## Boundaries

- Do not write secrets, credentials, account numbers, or private financial details to Notion.
- Do not delete or rewrite source `Open Threads` unless the user explicitly asks.
- Do not create dozens of tasks in one run without summarizing first; for more than 10 candidates, create a preview list and ask for confirmation.
- Do not schedule dates. These belong in `待安排項目`, so leave `截止日` empty.

