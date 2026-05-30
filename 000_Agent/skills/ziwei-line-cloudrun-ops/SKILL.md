---
name: ziwei-line-cloudrun-ops
description: Use when working on the Ziwei LINE bot project at C:\Users\join6\Desktop\紫微斗數, especially Vite build failures, Cloud Run deploys, LINE webhook smoke tests, LIFF question form wiring, rich menu updates, admin LINE ID envs, or production verification after code changes.
---

# Ziwei LINE Cloud Run Ops

## Scope

Use this project skill for the Ziwei LINE bot only. Keep it focused on operational reliability: build, deploy, LINE/LIFF entry wiring, and smoke verification.

## First Checks

1. Work from `C:\Users\join6\Desktop\紫微斗數\app`.
2. Read `PROJECT_LOG.md` before changing deploy or LINE behavior.
3. Do not update Secret Manager unless explicitly requested. `scripts/deploy-cloud-run.ps1` skips secrets by default.
4. Preserve the production URL:

```text
https://ziwei-line-bot-844284615574.asia-east1.run.app
```

## Build Failure Playbook

If `npm run build` stops after:

```text
2072 modules transformed
```

and exits without a Rollup or TypeScript error, suspect Windows access violation around Vite/Rollup output writing.

Run:

```powershell
@'
import { build } from 'vite';
try {
  await build({ logLevel: 'info', build: { write: false } });
  console.log('BUILD_OK_WRITE_FALSE');
} catch (error) {
  console.error(error && (error.stack || error.message || error));
  process.exitCode = 1;
}
'@ | node --input-type=module
```

Interpretation:

- `write:false` succeeds but normal build fails: output directory/write problem.
- A fresh `outDir` succeeds: old `dist` is likely the trigger.
- Keep `npm run build` using `node scripts/clean-dist.mjs && vite build`.
- Keep `package-lock.json` using `rollup@npm:@rollup/wasm-node@4.59.0` unless there is a clear reason to revert.

Verify:

```powershell
npm run lint
npm run build
npm run build
```

## Deploy

Deploy with:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\deploy-cloud-run.ps1
```

Expected:

- It prints `Skipping Secret Manager updates`.
- It deploys a new `ziwei-line-bot-xxxxx` revision.
- It routes 100 percent traffic to:

```text
https://ziwei-line-bot-844284615574.asia-east1.run.app
```

The deploy script can pass optional envs from `.env`:

```text
ADMIN_LINE_USER_IDS
PUBLIC_BASE_URL
LINE_LIFF_ID
LIFF_QUESTION_URL
READING_SLOW_STEP_MS
READING_SLOW_TOTAL_MS
```

Use comma-separated `ADMIN_LINE_USER_IDS`; the script uses a custom gcloud delimiter so commas are allowed.

## Production Smoke

Run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-test-production.ps1
```

Required checks:

- Root returns 200.
- Unsigned `/api/line-webhook` returns 401.
- `/api/line-command` returns `mode=llm` or `fallback`.
- `/api/chat-reading` returns `session_sheet_synced=true`.
- While subscription ledger is disabled, `credits_consumed=0`.

For LIFF:

```powershell
Invoke-RestMethod https://ziwei-line-bot-844284615574.asia-east1.run.app/api/liff-config
Invoke-WebRequest https://ziwei-line-bot-844284615574.asia-east1.run.app/liff/question
```

Check the deployed JS bundle contains:

```powershell
$html = (Invoke-WebRequest https://ziwei-line-bot-844284615574.asia-east1.run.app/liff/question).Content
$js = [regex]::Match($html, 'src="([^"]+\.js)"').Groups[1].Value
$content = (Invoke-WebRequest ('https://ziwei-line-bot-844284615574.asia-east1.run.app' + $js)).Content
$content.Contains('/api/liff-config')
$content.Contains('送回 LINE')
$content.Contains('複製指令')
```

## LIFF And Rich Menu Wiring

Current form URL:

```text
https://ziwei-line-bot-844284615574.asia-east1.run.app/liff/question
```

Behavior:

- With `LINE_LIFF_ID`: form loads LIFF SDK and sends `/解盤 ...` back to LINE with `liff.sendMessages()`.
- Without `LINE_LIFF_ID`: form uses copy-command fallback.

Rich menu script:

```powershell
$env:LINE_RICH_MENU_IMAGE_PATH="C:\path\to\rich-menu.png"
$env:PUBLIC_BASE_URL="https://ziwei-line-bot-844284615574.asia-east1.run.app"
$env:LINE_LIFF_ID="your-liff-id" # optional
npm run line:create-rich-menu
```

If `LINE_LIFF_ID` is missing, the rich menu `解盤` button opens the public web form URL instead of `line://app/...`.

Before claiming rich menu is updated, confirm:

- A valid PNG/JPG path was used.
- The script returned a new `richMenuId`.
- The script set it as the default rich menu.
- The phone client was opened or refreshed and the button was tapped.

## Project Log

After deployment or operational fixes, update `PROJECT_LOG.md` with:

- Revision id.
- Commands run.
- Smoke test session ids.
- LIFF/rich menu state.
- Anything still requiring user-provided values, especially `LINE_LIFF_ID` or image path.
