# Writing Flywheel Scoring Rules

## Core Rule

Score candidates in this order:

1. Inspiration signal
2. account fit
3. lived experience
4. support from self-brain / prior posts / existing study-body cards
5. freshness and momentum

Do not reverse this order.

## Five Judgments

For each candidate, judge five dimensions:

### 0. Inspiration Signal

High when:

- the idea appears in `Inspiration.md` as a concrete situation, question, complaint, or realization
- the note already contains a tension, before/after turn, or memorable sentence
- the topic feels like something the user would naturally say

Low when:

- it is only a borrowed trend
- it has no personal angle yet

### 1. Account Fit

High when:

- the user has written adjacent topics before
- the topic matches `brand_voice.md`
- the account can say something specific here

Low when:

- the topic is only generically popular
- it sounds like someone else could write the same thing

### 2. Lived Experience

High when:

- there is a recent concrete story
- there is matching material in `400_Knowledge/self_brain/`
- there is a strong before/after turn
- the user has a clear stance from direct experience

Low when:

- only abstract agreement exists
- the idea is borrowed but not yet lived

### 3. Support Strength

High when:

- there are matching prior posts
- there are self-brain notes with personal context
- there are good existing cards in `400_Knowledge/study/01_processed/` or `400_Knowledge/body/01_processed/`
- there are journal notes that provide lived context
- the topic can be supported without padding

Low when:

- the topic needs too much invention
- evidence is thin or disconnected

### 4. Freshness

Use external reports only here.

Possible states:

- `green`: active enough to use directly
- `yellow`: usable with a sharper angle or narrower framing
- `weak`: noisy evidence, but not a reason to kill the topic
- `red`: clearly saturated or too noisy right now
- `unverified`: scrape failed or evidence unavailable

## A / B / C Rules

### A

Put a topic in A when:

- account fit is high
- lived experience is high or medium-high
- support strength is high enough to draft
- freshness is `green`, `yellow`, `weak`, or `unverified`
- there is no obvious reason it would sound fake

Important:

- `weak` or `unverified` freshness does not block A if internal signal is strong

### B

Put a topic in B when:

- account fit is high
- support exists
- one missing piece prevents drafting

Typical missing piece:

- one concrete story
- one sharper judgment
- one sentence about what changed for the user

### C

Put a topic in C when:

- external momentum exists
- internal fit is still weak
- the topic may become usable if tied to the user's real experience later

Do not let C dominate the packet.

## Packet Bias

Target shape:

- A: 3-5 strong topics when enough Inspiration items are available
- B: 3-6 recoverable topics
- C: 2-4 watchlist topics

The workflow should support a week with multiple publishable drafts, not only one recommended post.
