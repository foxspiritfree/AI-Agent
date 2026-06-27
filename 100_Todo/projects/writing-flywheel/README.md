# Writing Flywheel Prototype

每週產出寫作 packet。主流程先從 `100_Todo/inbox/Inspiration.md` 找題目，再掃個人知識層判斷能不能直接寫；既有卡片盒引用只從 `400_Knowledge/study/01_processed/` 與 `400_Knowledge/body/01_processed/` 取得，外部訊號是必要的新鮮度檢查層，用來判斷題目是 `green / yellow / weak / red / unverified`。

## Current MVP

- Source: `Inspiration.md` + `400_Knowledge/self_brain/` + `brand_voice.md` Identity Calibration + existing study/body cards
- Cadence: weekly
- Scope: 8 writing topic categories
- Output:
  - `data/weekly-packets/YYYY-MM-DD.md`
  - multiple draft-ready topics when enough material exists
  - experience-light topics with exact replenishment prompts
  - existing study/body card references, or `無既有卡片命中`
  - optional new-note seeds clearly labeled as generated from this run
  - freshness status for every A/B/C candidate

External search is no longer the first step, but freshness status is required before sending the weekly email.

## Own History For Voice Analysis

Import your own historical Threads posts as the voice baseline:

```powershell
cd C:\Users\join6\AI-Agent\100_Todo\projects\writing-flywheel
$env:THREADS_ACCESS_TOKEN='your-token'
npm run fetch:own
```

Output:

- `threads_daily_tracker.json` — AK-Threads-Booster compatible tracker for setup / voice / draft analysis
- `posts_by_date.md` — readable archive of your own historical posts
- `data/raw/threads-own-posts-YYYY-MM-DD.json` — raw API payload archive

The first version imports post text and post-level insights (`views`, `likes`, `replies`, `reposts`, `quotes`, `shares`). Comments are not imported yet, so voice analysis is strongest for post style and weaker for reply tone.

Preview the run without a token:

```powershell
npm run fetch:own:dry-run
```

## Planned Writing Flywheel

Recommended flow:

1. Generate a weekly packet from `Inspiration.md` first.
2. Scan `400_Knowledge/self_brain/`, historical Threads, `brand_voice.md`, `study`, `body`, and `300_Journal` for personal experience, identity fit, and support.
3. Use `study/config/classification_map.md` and `body/config/classification_map.md` to find likely card branches, then search existing card-box support only in `400_Knowledge/study/01_processed/` and `400_Knowledge/body/01_processed/`.
4. If the topic has enough personal material and identity fit, produce a first draft. A weekly packet can contain several A topics and several first drafts.
5. If the topic lacks personal material, do not force a draft; ask for the missing experience.
6. If no existing study/body card matches, write `無既有卡片命中`. Any AI-generated note text must be labeled as a new-note seed, not an existing card.
7. Use external signals only as freshness validation, but assign a freshness state to every candidate before emailing.
8. Sort topic candidates into:
   - A: enough personal experience and knowledge support, ready for a master draft.
   - B: promising angle, waiting for the user's personal experience.
   - C: externally timely or interesting but not yet clearly "you"; can be revived if the user adds a real experience or stance.
9. Let the user revise the selected master draft.
10. Adapt the revised master draft across platforms with `one_draft_multi_platform_template.md`.

Do not generate every platform version before the user edits the master draft. The platform layer should adapt a settled core message, not decide the message.

## Multi-Platform Template

Template:

```text
one_draft_multi_platform_template.md
```

Target platforms:

- Threads
- X
- Facebook
- Instagram
- LinkedIn

Use this template only after the master draft has passed user revision or AK analysis. It preserves one core message while changing structure, tone, length, CTA, and information density per platform.

## Agent Workflow Files

Formal skill:

```text
../../../000_Agent/skills/writing-flywheel/SKILL.md
```

Project-side routing:

- `config/source-map.json` - source and output path map for agents.
- `config/email-template.md` - weekly Gmail template. Future sends should include the complete weekly packet body.
- `data/weekly-packets/` - scheduled weekly packet output.
- `data/user-replies/` - user-provided experience, stance, and turns.
- `drafts/threads/` - master drafts before platform adaptation.
- `drafts/longform/` - optional longform expansions.
- `drafts/platform-adapted/` - Threads / X / Facebook / Instagram / LinkedIn versions.
- `review/pending/` - drafts waiting for user or AK review.
- `review/approved/` - approved drafts.
- `review/published/` - published records and metrics notes.
- `state/flywheel-state.json` - run state and used-topic memory.
- `state/decisions.md` - durable workflow decisions.

## Run

Optional freshness check while the Meta app is still under review:

```powershell
cd C:\Users\join6\AI-Agent\100_Todo\projects\writing-flywheel
npm run fetch:scraper
```

External reading output:

```text
data/reports/topic-candidates-YYYY-MM-DD.md
```

This is a secondary input, not the source of truth. It helps validate freshness, momentum, and reframe risk after the Inspiration-first topic pool is built.

Auto mode uses the official API when it has useful public search access, and falls back to the browser scraper when API results appear limited to one username:

```powershell
npm run fetch
```

Official API only:

```powershell
$env:THREADS_ACCESS_TOKEN='your-token'
node .\scripts\fetch-threads-top-posts.mjs --source=api
```

Preview planned queries without a token:

```powershell
npm run dry-run
```

Run Gemini-based preprocessing for the latest topic reports:

```powershell
npm run ai:preprocess
```

This step uses `gemini-flash-latest` through the local `writing-flywheel/.env` key and produces:

- `data/reports/topic-candidates-ai-YYYY-MM-DD.json`
- `data/reports/topic-candidates-ai-YYYY-MM-DD.md`

Use it as a weak-signal cleanup and review layer, not as the final A/B/C judge.

Regenerate reports from the latest raw JSON without scraping again:

```powershell
npm run report
```

Probe one broad query and print the raw API response:

```powershell
node .\scripts\fetch-threads-top-posts.mjs --probe --q=AI
```

Optional:

```powershell
$env:THREADS_GRAPH_BASE_URL='https://graph.threads.net/v1.0'
$env:THREADS_BROWSER_PATH='C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
```

## Public Scraper Fallback

The scraper opens public Threads search pages with local Chrome or Edge and extracts the visible public results. It does not log in.

Current limits:

- Public Threads search may show only a small result set before the login wall.
- Some Chinese long-tail queries may return 0 public results, even when broad queries such as `AI` return posts.
- Engagement counts are parsed from visible page text, so they are best-effort.

## Topic Candidates

`topic-candidates-YYYY-MM-DD.md` is an external signal report, not the main editorial decision file.

It keeps posts that are more likely to become article topics:

- clear viewpoint
- method or workflow angle
- enough context to read inside the Markdown file
- relevance to one of the 8 writing categories

It downranks:

- pure memes
- short reactions
- giveaways
- generic viral jokes
- high-engagement posts that do not create a useful writing angle

Candidate scoring should be treated as a public-signal filter. Final topic judgment belongs to the weekly packet, where Inspiration signal, account fit, and personal material outrank public search quality.

## Topic Config

Edit:

```text
config/threads-topics.json
```

The categories below are better treated as internal clusters than broad public-search truth. Over time, external queries should move toward narrower objects, events, tools, and controversies instead of generic nouns.

1. AI 工作流與個人系統
2. 職場協作、信任與團隊流動
3. 溝通、提問、傾聽與說服
4. 習慣、專注、行為設計
5. 成長、壓力、韌性與反脆弱
6. 寫作、閱讀與卡片盒知識生產
7. 身體科學、運動訓練、疼痛與睡眠
8. 商業、產品、品牌與成長實驗

## Process Direction

Current recommended weekly flow:

1. Mine topics from `100_Todo/inbox/Inspiration.md`.
2. Scan `400_Knowledge/self_brain/`, `threads_daily_tracker.json`, `posts_by_date.md`, `brand_voice.md` Identity Calibration, study/body notes, and recent journal entries.
3. Use the study/body classification maps first, then match existing card-box references only from `study/01_processed` and `body/01_processed`.
4. For topics with enough personal material and identity fit, produce first drafts. A weekly packet can include multiple A topics.
5. For topics missing personal material, ask exactly what experience to add.
6. If no existing study/body card matches, write `無既有卡片命中`; optional generated note text must be labeled as a new-note seed.
7. Use `topic-candidates-YYYY-MM-DD.md` or a current web check to validate freshness, spot saturation, or sharpen the angle.
8. Keep A useful for weekly throughput, preserve B for good-fit topics that only need one personal example, and use C as a watchlist.

## Next Checks

- Submit App Review for public `threads_keyword_search` access while using the browser scraper fallback.
- Tune candidate scoring after reading the first few `topic-candidates` reports.
- Confirm exact fields returned by the current Threads API app permission.
- Re-enable `useTimeWindow` after confirming which timestamp window format works reliably.
- Decide whether `TOP` results alone are enough, or add custom scoring if engagement fields are available.
- If official API coverage is too narrow, add a browser scraper fallback later.
- If `--probe --q=AI` returns an empty `data` array, verify the token includes `threads_keyword_search`; without it, public keyword search may be limited to the authenticated user's own posts.

## Handoff Status 2026-06-18

- Token setup succeeded.
- `--probe --q=AI` returns data.
- Full fetch previously returned 0 with the 7-day time window, so `useTimeWindow` is currently `false`.
- After disabling the time window, results were generated but appear to be the user's own posts only.
- Likely cause: app/token does not have effective public keyword search access yet, or Meta limits keyword search to the authenticated user's own posts while in development/testing.
- Next session should test one of two paths:
  - Verify token scopes and App Review / Advanced Access state for `threads_keyword_search`.
  - Build a browser scraper fallback to collect public Threads freshness signals without waiting on Meta permission review.

## Token Setup Lessons

Threads API token setup has three moving parts:

1. Meta app settings
2. OAuth redirect receiver
3. Token exchange client

Recommended setup:

```text
Threads display name:
threads-hot-posts

Redirect callback URL:
https://oauth.pstmn.io/v1/browser-callback

Deauthorize callback URL:
https://webhook.site/<uuid>/deauthorize

Data deletion callback URL:
https://webhook.site/<uuid>/delete
```

Common pitfalls:

- `授權失敗: 要求未傳送應用程式編號` means the OAuth authorize URL did not include a valid numeric `client_id`.
- `網址已遭封鎖` means the exact `redirect_uri` is not allowlisted in Meta app settings.
- Meta may refuse to save the Threads settings form if deauthorize and data deletion callback URLs are blank or invalid.
- In Meta's URL fields, paste the URL and press Enter or select the dropdown suggestion so it becomes a removable chip.
- Postman Web uses `https://oauth.pstmn.io/v1/browser-callback`; Postman Desktop often uses `https://oauth.pstmn.io/v1/callback`. The OAuth URL and Meta allowlist must match exactly.

Why Postman:

- Postman acts as the OAuth client.
- It opens the Threads authorization page, receives the authorization code at its callback URL, and exchanges the code for an access token.
- This avoids writing a local OAuth callback server during early testing.

Why webhook.site:

- Meta asks for callback URLs for app deauthorization and data deletion events.
- The MVP does not need to process those events yet, but Meta still needs valid HTTPS URLs before saving the form.
- webhook.site provides disposable HTTPS endpoints, so Meta can save the settings and any future callback can be inspected.
