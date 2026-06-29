---
name: writing-flywheel
description: Build and run the user's weekly writing flywheel. Use this whenever the user mentions writing flywheel, weekly writing report, Threads topic packet, turning inspiration/study/journal notes into drafts, reviewing A/B/C topic candidates, or adapting one master draft across Threads, X, Facebook, Instagram, and LinkedIn.
---

# Writing Flywheel

Use this skill to help the user run a low-friction writing system with their own voice at the center.

The flywheel is not a generic content machine. Its job is to turn the user's own inspirations, experiences, and existing card-box notes into drafts that still feel like the user wrote them. External attention is only a freshness check, not the starting point.

## Project Paths

Primary workspace:

```text
C:\Users\join6\AI-Agent\100_Todo\projects\writing-flywheel
```

Core files:

- `README.md` - project status and run commands.
- `config/threads-topics.json` - topic categories and search queries.
- `config/source-map.json` - local source routing.
- `one_draft_multi_platform_template.md` - target platform adaptation template.
- `threads_daily_tracker.json` - AK-compatible Threads history.
- `brand_voice.md` - AK voice baseline.
- `data/reports/topic-candidates-YYYY-MM-DD.md` - external topic candidates.
- `data/weekly-packets/YYYY-MM-DD.md` - main weekly output.
- `data/user-replies/YYYY-MM-DD.md` - user's experience/stance replies.
- `drafts/threads/` - master/Threads drafts.
- `drafts/platform-adapted/` - final multi-platform outputs.
- `state/flywheel-state.json` - run state and topic memory.
- `state/decisions.md` - long-term workflow decisions.

## Operating Rule

Default to one recommended next action. Do not ask the user to choose between obvious options.

If the user asks for a weekly report, create or update the weekly packet.

If the user gives extra experience for a B/C topic, re-score it and move it into the master-draft pipeline only when it now has enough personal signal and identity fit.

If the user gives a revised master draft, adapt it across platforms using `one_draft_multi_platform_template.md`.

When the user signals privacy concern, coworker visibility, or low-identification preference, split outputs into:

- `internal-source-rich`: internal weekly packet can keep fuller source detail for the user's own working memory
- `external-low-identification`: email and sendable drafts should default to medium-strength de-identification

Default low-identification strength:

- keep first-person voice, emotion, mechanism, and judgment
- remove or generalize job title, shift, tenure, team, department, nationality, age band, and location
- rewrite direct quotes into paraphrased intent
- avoid rare event bundles such as exact time + role + incident + person trait
- merge multiple similar experiences when one exact event would be too identifying
- if a scene still feels traceable after light edits, prefer role generalization plus scene abstraction over fidelity

When sending any weekly packet email or shareable draft bundle, also create one user-editable companion file under:

```text
review/pending/
```

This companion file is for the user's own revision and replenishment, so they do not need to create a second copy manually.
Use `templates/review-pending-companion.md` as the default shape for this file.
Do not mirror the full weekly-packet template with blank fields.
The companion should act like a working review doc:

- summarize which topics are already ready, almost ready, or parked
- recommend one next topic to push
- keep only filled user material
- rewrite empty intake prompts into short status notes or 1-2 concrete missing pieces
- show current usable draft text directly instead of leaving placeholder sections

## Source Priority

Read only what the current step needs.

For weekly packet creation, use:

1. `100_Todo/inbox/Inspiration.md`.
2. `400_Knowledge/self_brain/`, especially project, decision, identity, writing voice, and lived-experience notes.
3. `brand_voice.md`, starting with `Identity Calibration`, then `threads_daily_tracker.json` and `posts_by_date.md`.
4. `400_Knowledge/study/config/classification_map.md` and `400_Knowledge/body/config/classification_map.md` to find likely card branches.
5. `400_Knowledge/study/01_processed/` and `400_Knowledge/body/01_processed/` only after the maps identify likely matches.
6. Recent `300_Journal/YYYY-MM/*.md`.
7. Latest external topic report under `data/reports/` or a current web check as the mandatory freshness layer, not the primary topic source.

For master drafting, use:

1. The selected weekly packet item.
2. User reply under `data/user-replies/` or pasted in chat.
3. `brand_voice.md`, applying `Identity Calibration` before the voice fingerprint sections.
4. Closest study cards and prior Threads examples.

For platform adaptation, use:

1. User-revised master draft.
2. `one_draft_multi_platform_template.md`.
3. `templates/platform-adaptation.md`.

## Candidate Classes

Use these classes in weekly packets:

- A: strong personal signal, natural identity fit, prior writing or knowledge support, plus no major freshness warning. Ready for a master draft.
- B: strong account and identity fit, but missing one concrete experience, stance, or sharper turn. Ask for one short reply and promote if supplied.
- C: externally active or interesting, but weak identity fit or weak account fit right now. Do not draft yet, but let the user revive it by adding a real experience or clear judgment.

B and C are not dead ends. If the user adds experience, stance, or a personal turn, re-score the item and move it to draft when it has enough personal signal and identity fit.

## Workflow

### 1. Weekly Packet

Use `templates/weekly-packet.md`.

Create:

```text
data/weekly-packets/YYYY-MM-DD.md
```

The packet should include:

- a weekly writing queue with one first-priority topic plus other draft-ready topics
- A/B/C candidate sections
- source evidence
- matched user material
- matched self-brain, study, body, or journal notes
- identity fit for every A/B/C item
- existing card-box references only from `400_Knowledge/study/01_processed/` and `400_Knowledge/body/01_processed/`
- optional new-note seed content, clearly labeled as generated from this run rather than an existing card
- freshness status for every candidate: `green`, `yellow`, `weak`, `red`, or `unverified`
- draft-ready output for topics with enough user experience
- missing-experience prompts for topics that are promising but not yet draftable
- exact prompts for the user to reply with minimal effort

Keep it skimmable. The user should only need to pick a topic and add a few lines of experience.

Build the packet in this order:

1. Mine candidate topics from `Inspiration.md` first.
2. For each candidate, scan the user's own knowledge layer for lived experience and prior stance.
3. Apply `brand_voice.md` Identity Calibration to decide whether the topic fits the user's core themes and which angle is most natural.
4. Use `study/config/classification_map.md` and `body/config/classification_map.md` as the first card-box lookup layer.
5. Open actual files under `study/01_processed/` or `body/01_processed/` only for the map branches that match the topic.
6. Scan card-box support only in `400_Knowledge/study/01_processed/` and `400_Knowledge/body/01_processed/`. Do not invent card-box references.
7. If no existing study/body card matches, say `無既有卡片命中` and optionally provide `可沉澱成新卡的筆記草案`.
8. If the user's experience exists and identity fit is natural, produce a first draft. A weekly packet can include multiple draft-ready topics.
9. If the user's experience is missing or identity fit is weak, do not force a draft; tell the user exactly what to add or why the angle is not yet them.
10. Use the external topic report only to validate freshness, momentum, saturation, or reframe risk.
11. Preserve a broader review pool when external evidence is noisy instead of collapsing everything to a tiny A list.
12. If external scraping fails or is low quality, still create the packet and mark external freshness as weak or unverified.

Freshness is mandatory for weekly packets:

- every A/B/C item needs a freshness state: `green`, `yellow`, `weak`, `red`, or `unverified`
- use existing `data/reports/` if fresh enough; otherwise run a current web check
- do not send a weekly email while all candidates still say freshness was not checked
- when evidence is evergreen rather than timely, mark it `yellow` or `weak` instead of pretending it is trending
- when the user has privacy concerns, the internal weekly packet may stay source-rich, but any email-safe or sendable draft output should use `external-low-identification`

If the user asks to email the weekly packet, use the Gmail plugin when available. Send it to `join6110@gmail.com` unless the user gives a different recipient. The email body should contain the complete weekly packet, not only a short summary. Put the recommended topic at the top, then include the full A/B/C sections and the low-friction reply format.

For the email version:

- do not paste blank Markdown template fields
- do not use nested code blocks for card-box content
- remove any empty field instead of leaving a placeholder
- replace the generic low-friction reply form with 1-3 concrete replenishment questions for the selected B/C topics
- prefer plain headings and short bullet lists so Gmail does not collapse the hierarchy
- never label generated note text as card-box content unless it came from `study/01_processed` or `body/01_processed`
- include freshness status in the email queue summary and inside each A/B/C item
- default to `external-low-identification` when privacy concern is present
- paraphrase direct dialogue instead of keeping memorable original wording
- generalize traceable role markers into broad labels such as `同事`, `前輩`, `某個人`, `一個現場`
- preserve the mechanism and emotional turn even if exact event coordinates are removed
- whenever an email-safe packet or sendable draft is generated, save a matching user-editable version in `review/pending/`
- naming default: `YYYY-MM-DD-<topic-or-packet>-revised.md` for Markdown working files
- if the email includes multiple A topics, create one packet-level companion file plus topic-level draft files when they already exist
- packet-level companion files in `review/pending/` should be status-oriented working docs, not blank intake forms copied from the packet template

### 2. User Reply Intake

Use `templates/user-reply-form.md`.

When the user replies with experience, save or route it to:

```text
data/user-replies/YYYY-MM-DD.md
```

Then re-score the chosen topic:

- If it now has concrete experience, a judgment frame, and identity fit, draft it.
- If it only has a vague preference, ask one precise follow-up.
- If it has experience but still feels unlike the user's core themes, keep it in B or C and name the missing identity bridge.
- If it still feels unlike the user, keep it in C with a short reason.

### 3. Master Draft

Use `templates/draft-brief.md`.

The first draft should optimize for the user's core voice, not all platforms at once.

Draft in this order:

1. Capture the user's real experience or turn.
2. Use `brand_voice.md` Identity Calibration to decide whether the topic is really the user's and which core theme should lead.
3. Add the strongest supporting card-box idea without treating it as personal experience.
4. Shape rhythm, phrasing, humor, and ending using the rest of `brand_voice.md`.
5. Produce a Threads-ready master draft.
6. Ask the user to revise before platform adaptation.

If privacy concern is active, produce the sendable draft in `external-low-identification` mode by default:

- keep the observation, conflict, and turn
- abstract the coordinates of the event
- remove unique identifiers before polishing the voice
- if the topic depends on one highly traceable incident, broaden it into a pattern-level vignette before final drafting
- after generating the sendable version, place the user-editable copy in `review/pending/` so the user can revise that file directly before adaptation

If AK-Threads-Booster is available, use its logic as the review layer:

- use AK voice baseline for draft shaping
- use AK analyze after the user edits
- use AK review after publication metrics exist

### 4. Platform Adaptation

Only run this after the user has revised the master draft or explicitly asks for multi-platform output.

Use:

```text
one_draft_multi_platform_template.md
templates/platform-adaptation.md
```

Output platform-specific versions for:

- Threads
- X
- Facebook
- Instagram
- LinkedIn

Preserve the same core message. Change structure, hook, length, CTA, and information density per platform.

### 5. State Update

When a topic is drafted, adapted, approved, or published, update:

```text
state/flywheel-state.json
state/decisions.md
```

Do not mark a post as published unless the user says it was published or metrics exist.

## References

- `references/workflow.md` - full phase checklist.
- `references/scoring-rules.md` - A/B/C scoring and revival rules.
- `references/source-routing.md` - where to look for source material.
