# Writing Flywheel Workflow

## Goal

Produce a weekly packet that starts from `Inspiration.md`, checks the user's own knowledge layer for lived experience, then uses external freshness as a validation layer.

This workflow does not treat scraped public posts as the source of truth. Public Threads search is too limited and noisy for that.

## Weekly Packet Flow

### 1. Build the topic pool from Inspiration first

Read these in order:

1. `../../inbox/Inspiration.md`
2. `../../../400_Knowledge/self_brain/`
3. `threads_daily_tracker.json`
4. `posts_by_date.md`
5. `brand_voice.md`
6. `../../../400_Knowledge/study/config/classification_map.md`
7. `../../../400_Knowledge/body/config/classification_map.md`
8. `../../../400_Knowledge/study/01_processed/`
9. `../../../400_Knowledge/body/01_processed/`
10. Recent `../../../300_Journal/YYYY-MM/*.md`

Pull candidate themes from `Inspiration.md`, then test each one against:

- personal stories and decisions in `self_brain`
- prior posts and writing voice
- repeated judgments or unfinished ideas
- themes that already perform for this account
- existing study/body cards that clearly connect to the user's real life; use the classification maps first, then open the actual cards

### 2. Decide whether the topic is draftable

For each candidate, judge:

- does the user have real experience here
- does the user have a sharp judgment here
- is there enough support from prior posts, self-brain notes, or existing study/body cards
- does it fit the account's historical voice and topic graph
- does it feel worth writing now even without a viral trigger

If the user's experience exists:

- produce a first draft
- cite matched study/body cards when they actually exist
- use map entries only as lookup hints, not as final citations
- if useful, produce a separate new-note seed labeled as generated from this packet
- cite the matched user material

If the user's experience is missing:

- do not force a draft
- tell the user exactly what to add
- cite matched study/body cards when they actually exist
- if no study/body card matches, say so plainly

### 3. Run external freshness as a required gate, not a mine

External reports under `data/reports/` are useful for:

- checking whether a topic is live, warm, or cold
- spotting obvious saturation
- catching a current object, event, or angle worth mentioning
- reframing a topic with better timing language

External reports are not the primary source for:

- deciding what the user should care about
- proving a topic is good just because it is popular
- forcing weak-fit topics into A

If scraping fails or the result quality is low:

- continue the packet
- mark freshness as weak or unverified
- do not invent "hotness"

Weekly packet rule:

- every candidate needs a freshness state: `green`, `yellow`, `weak`, `red`, or `unverified`
- use `data/reports/` when recent enough; otherwise run a web check for the topic cluster
- do not send the email if the packet still says freshness was not checked
- evergreen evidence should be marked `yellow` or `weak`, not promoted to `green`

### 4. Classify into A / B / C

Use the rules in `references/scoring-rules.md`.

Practical bias:

- A should include several defensible draft-ready topics when the week's Inspiration pool supports it
- B should preserve good-fit topics that only need one concrete experience
- C should preserve interesting external triggers that may become usable later

### 5. Produce the packet

Use `templates/weekly-packet.md`.

Every packet should include:

- a weekly writing queue at the top, with one first-priority topic plus other draft-ready topics
- why it is the best next move
- A / B / C sections
- evidence from user material
- evidence from self-brain, study/body, or journal notes
- external freshness status
- first drafts for draftable topics
- missing-experience prompts for non-draftable topics
- existing study/body card references when found
- optional new-note seeds, labeled separately from existing card-box references
- a low-friction reply format

## Query Design Rule

When external search is used, prefer narrow, trigger-based queries over broad category words.

Good query styles:

- named tools, books, products, events, memes, controversies
- concrete behaviors or pain points
- phrases the user would naturally mention in a post

Avoid relying on broad buckets like:

- `職場`
- `成長`
- `體驗`
- `內容創作`

Those are better used as internal clusters, not public search queries.
