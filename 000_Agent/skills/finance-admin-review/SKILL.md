---
name: finance-admin-review
description: Use this skill when the user wants to review Notion finance administration items, subscriptions to cancel, money-transfer follow-ups, recurring payment reminders, card/account management tasks, or wants finance-related pending items turned into Notion tasks. This skill is for administrative triage only, not investment, tax, insurance, accounting, or legal advice.
---

# Finance Admin Review

Use this skill to inspect finance administration items and turn them into safe, schedulable tasks.

## Scope

Use for:

- Subscriptions that may need cancellation.
- Money-transfer follow-ups.
- Recurring payment reminders.
- Card or account management follow-up tasks.
- Finance admin items that should become Notion `待安排項目`.

Do not use for:

- Investment recommendations.
- Tax, accounting, insurance, or legal advice.
- Storing sensitive financial details in the repo.
- Updating finance records unless the user explicitly asks.

## Sources

Notion entry URLs and data source IDs are maintained only in:

- `000_Agent/NOTION_SOURCE_MAP.md`

Relevant source names:

- 帳務管理
- 帳務概況
- 帳戶與卡片
- 任務

## Default Workflow

1. Read the relevant Notion finance admin views if available.
2. Extract only actionable admin items.
3. Do not copy account numbers, card numbers, payment methods, exact amounts, or sensitive transaction details into the repo.
4. Group items by action type:
   - subscriptions to cancel
   - money-transfer follow-ups
   - recurring payments
   - card/account management
   - unclear items
5. If writing tasks to Notion, use the task data source rules in `000_Agent/NOTION_SOURCE_MAP.md`.
6. For more than 10 candidate tasks, preview first and wait for explicit approval before writing.

## Output

Default output:

```md
## Recommended Next Action

## Candidate Tasks

## Needs Clarification

## Not Written
```

Keep amounts and sensitive details out of the response unless the user explicitly asks and the context is local/private.

## Task Writing Rules

When creating Notion tasks:

- `Done = false`
- no due date by default
- `急迫性 = anytime` by default
- include only enough context for the user to recognize the action
- do not include secrets, credentials, account numbers, card numbers, payment methods, or exact financial details

## Handoff

If the user wants a daily record after review, route the summary to:

- `300_Journal/YYYY-MM/YYYY-MM-DD.md`

If a reusable finance-admin rule emerges, update this skill.
