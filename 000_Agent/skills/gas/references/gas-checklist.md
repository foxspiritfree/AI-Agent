# GAS Checklist

## Scopes And Permissions

- Check `appsscript.json` for new or removed OAuth scopes.
- Prefer the narrowest scope that supports the requested behavior.
- Mention when a change will require the user to reauthorize the script.

## Triggers

- Confirm whether the function runs manually, from an installable trigger, simple trigger, web app request, or add-on lifecycle event.
- For installable triggers, account for auth mode and concurrent runs.
- Use `LockService` when duplicate trigger execution can corrupt state or send duplicate notifications.

## Quotas

- Batch Spreadsheet reads and writes.
- Avoid per-row calls to Gmail, Drive, Calendar, UrlFetch, or Spreadsheet APIs when a batched pattern exists.
- Keep long jobs resumable when they may exceed Apps Script execution limits.

## Deployment

- Treat `.clasp.json`, `appsscript.json`, web app settings, and deployment IDs as sensitive behavior controls.
- Do not replace deployment settings unless explicitly requested.
- For clasp projects, verify with `clasp status`, `clasp push`, or `clasp deployments` only when appropriate for the task.

## Handoff

- Name the entry function and any required trigger.
- List required script properties.
- List any manual Google Workspace console steps.
