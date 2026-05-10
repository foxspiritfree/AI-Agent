---
name: gas
description: Google Apps Script tool development and maintenance workflow for Codex. Use when building, reviewing, debugging, or extending Apps Script projects, especially scripts for Google Sheets, Drive, Gmail, Calendar, Workspace automation, clasp deployments, triggers, permissions, quotas, logging, or handoff-ready GAS utilities.
---

# Google Apps Script

Use this skill to handle Google Apps Script work with a bias toward small, auditable changes.

## Workflow Boundary

本 skill 只定義 Google Apps Script 領域偏好與安全邊界。實作、除錯、TDD、驗證、code review、交付流程優先使用 `superpowers` 對應 skills。

## GAS Checklist

1. Inspect the project shape first: `appsscript.json`, `.clasp.json`, `package.json`, `src/`, `.gs`, `.js`, `.ts`, and README files.
2. Identify the execution context: container-bound script, standalone script, web app, add-on, trigger, or clasp-managed local project.
3. Check scopes and services before editing. Treat `appsscript.json`, advanced services, OAuth scopes, triggers, and deployment settings as behavior-affecting.
4. Keep the first patch narrow. Prefer one focused utility, handler, or fix over broad rewrites.
5. Preserve Apps Script runtime constraints: execution time, quotas, batch operations, trigger auth mode, and V8 compatibility.
6. Make logs useful for handoff. Use structured, minimal `console.log` or `Logger.log` messages around external calls, state transitions, and error paths.
7. Verify locally where possible with lint, typecheck, or unit tests. For live GAS behavior, provide the exact clasp or Apps Script verification command and note any manual console step.

## Implementation Preferences

- Prefer batched Spreadsheet operations: read ranges once, transform in memory, write ranges once.
- Prefer explicit config objects for IDs, sheet names, label names, calendar IDs, and property keys.
- Use `PropertiesService` for durable script/user settings instead of hard-coded state.
- Use `LockService` when triggers or webhooks can run concurrently.
- Use `CacheService` only for safe-to-expire data.
- Wrap external API calls with clear status handling and bounded retry only when the API is known to be transient.
- Avoid silent catch blocks. Return or throw actionable errors.
- Avoid changing OAuth scopes unless the task requires it.

## Review Checklist

Read [references/gas-checklist.md](references/gas-checklist.md) when the task touches triggers, OAuth scopes, quotas, deployment, or shared spreadsheet workflows.

## Output

When finished, include:

- Files changed.
- Verification performed.
- Any Apps Script console or clasp command the user should run next.
