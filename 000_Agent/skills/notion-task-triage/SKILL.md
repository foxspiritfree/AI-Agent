---
name: notion-task-triage
description: Use this skill when the user asks what to do today, wants Notion personal tasks sorted, mentions 今日可做事項, 任務蒐集, 目標儀表板, 未分配任務, 常駐任務, 認知指數, 急迫性, 重要度, or asks Codex to plan the day from Notion. This skill turns the user's Notion task system into a short actionable recommendation.
---

# Notion Task Triage Skill

## Goal

Use the user's Notion task system as the source of truth for daily task selection, then return one practical execution order.

The main Notion entry points are:

- `今日可做事項`: today's executable list.
- `任務蒐集`: unassigned task inbox.
- `目標儀表板`: central hub for current tasks, waiting items, projects, and collected references.
- `專案`: project database linked to tasks.

## Notion Sources

Notion URL / data source 以 `000_Agent/NOTION_SOURCE_MAP.md` 為 single source。

Prefer the entries named:

- 今日可做事項
- 任務蒐集
- 目標儀表板
- 任務 data source
- 專案 data source

If Notion tools are unavailable, ask the user to connect Notion and stop.

## Task Fields

Use these task properties:

- `行動`: task title.
- `Done`: completed flag.
- `截止日`: deadline.
- `提醒`: formula status, including `今天` and `執行中`.
- `急迫性`: `urgent` or `anytime`.
- `重要度`: `major` or `minor`.
- `認知指數`: 1, 2, or 3. Treat 3 as high-focus, 1 as low-load.
- `常駐任務`: recurring or always-available work.
- `預計時間hr`: expected hours.
- `專案`: related project.
- `學習點`: lesson or note worth preserving after completion.

## Daily Triage

When the user asks what to do today:

1. Fetch or search `今日可做事項`.
2. Prioritize unfinished tasks whose `提醒` is today or executing.
3. Include unfinished `常駐任務` only after dated or executing tasks.
4. Sort by:
   - urgent before anytime
   - major before minor
   - higher `認知指數` when the user has focus time
   - shorter estimated time when the user only has a small slot
5. Return one recommended order, not multiple plans.

## Inbox Triage

When handling `任務蒐集` or unassigned tasks:

1. Identify tasks without a clear project, deadline, or execution slot.
2. Decide whether each item should become:
   - a dated task in Notion
   - a project task linked to `專案`
   - a knowledge item routed to `400_Knowledge/study` or `400_Knowledge/body`
   - an external reference routed to `200_Reference/imported`
   - a discard/archive candidate
3. Keep output short: title, route, and one-line reason.

## Time and Energy Rules

Use the user's Notion hint:

- Weekday after-work slot: about 0.5 hr.
- Weekend slot: about 8 hr.
- Energy high: requires focused work and causes fatigue.
- Energy normal: should not be multitasked.
- Energy low: can be paired with light activity.

If the user gives available time, obey that. If not, assume a short weekday slot unless the current context says weekend planning.

## Output Format

Default daily answer:

```markdown
推薦：先做「[task]」
理由：[one line]

順序：
1. [task] - [time/energy note]
2. [task] - [time/energy note]
3. [task] - [time/energy note]
```

For a very small request, answer with only the recommendation and reason.

## Boundaries

- Do not copy private task contents into repo files unless the user asks to export them.
- Do not move or edit Notion pages unless the user explicitly asks for mutation.
- Do not create a broad productivity lecture.
- Do not ask the user to choose among options after you have enough signal; pick one recommendation.
