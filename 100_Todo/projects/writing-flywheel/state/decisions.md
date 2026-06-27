# Writing Flywheel Decisions

## 2026-06-21

- `writing-flywheel` is the total editorial workflow; AK-Threads-Booster remains the Threads voice, analysis, prediction, and review layer.
- Weekly packets classify topics as A/B/C, but B/C can enter drafting after the user adds personal experience, stance, or a before/after turn.
- Generate one master draft first. Do not generate all platform versions before the user edits the master draft.
- Use `one_draft_multi_platform_template.md` only after the master draft is revised or explicitly approved for adaptation.
- Default weekly schedule output should be one packet plus an email prompt, so the user only needs to pick a topic and add a short experience.
- Gmail plugin send test succeeded: weekly packet email was sent to `join6110@gmail.com` and the user confirmed receipt.
- Future weekly emails should include the complete weekly packet body, not only a short summary. Keep the short recommendation at the top, then include full A/B/C sections.
- Weekly packets should now follow an AK-style order: internal account-fit topic pool first, external search second.
- External `topic-candidates` reports are a freshness and reframe layer, not the primary source of weekly topic discovery.
- As of 2026-06-21, the default workflow is Inspiration-first: mine `100_Todo/inbox/Inspiration.md` first, then scan `400_Knowledge/self_brain/`, prior posts, voice files, and study/body cards for draftability.
- Existing card-box references can only come from `400_Knowledge/study/01_processed/` and `400_Knowledge/body/01_processed/`; generated notes from the packet must be labeled as new-note seeds, not existing cards.
- Weekly packets should support multiple draft-ready A topics and multiple first drafts when the Inspiration pool has enough personal signal; A/B/C are queues, not one-slot sections.
- The 2026-06-21 v2 email is the tentative accepted version: Inspiration-first topic mining, study/body map-assisted card lookup, actual `01_processed` card citations only, multiple A drafts, HTML Gmail formatting, and required freshness states for every candidate.
- Freshness is a mandatory final layer before email send. Do not send a packet that still says external freshness was not checked; if a topic is evergreen, mark it `yellow` or `weak` rather than pretending it is trending.
- Broad public queries like `職場`, `成長`, `體驗`, and `內容創作` are too noisy to act as strong evidence on their own; treat them as internal clusters and move future public search toward narrower triggers.
- A can still be valid when external evidence is weak or unverified, as long as personal signal and support are strong.
- Query redesign test has been run. Better-performing trigger queries so far include `Claude Code`, `AI 寫作`, `AI coding`, `拖延症`, and `情緒崩潰`.
- Weak or misleading queries in the latest validation include `second screen`, `黑天鵝`, `卡片盒筆記`, `functional patterns`, and most `product-growth` queries.
- Named trend objects like `台灣漫遊錄` should be treated as temporary weekly injections when relevant, not permanent config defaults.
- Next pass should prune ambiguous permanent queries, especially where public Threads search keeps matching unrelated text or promotional noise.
