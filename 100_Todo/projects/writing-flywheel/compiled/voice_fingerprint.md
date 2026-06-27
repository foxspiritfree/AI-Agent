# Voice Fingerprint

> Deterministic runtime cache for `/voice` and `/draft`. Tracker remains the source of truth.

```yaml
generated_at: 2026-06-20T16:20:53.911258Z
source_tracker_hash: 76aebc1d738e5509f108d3e2e0723598913bc26ebcc679ecdbaffb18646539de
posts_count: 178
posts_with_text: 178
posts_with_engagement: 178
```

## Engagement-Weighted Corpus
- Formula: `views + likes*5 + replies*30 + shares/reposts*50`
- Top corpus rule: top 20 percent by score, min 3 and max 25 posts
- Top post IDs: `18138554839338145`, `18090487226049721`, `17937015629906814`, `18318280480283741`, `17894730366332460`, `17980759676726983`, `17853869487691373`, `18060146057405149`, `18095076380276247`, `17956560767681998`, `18071668148310190`, `18063737366437044`, `17887133961512944`, `18032366507112527`, `17902594506262119`, `17962453977074238`, `18034507085060136`, `18021996542522735`, `18012603341258941`, `18062158870955973`, `17959830090086789`, `17891629152081106`, `17987862590690421`, `18070368661690853`, `18106108027709579`

## Rhythm Baseline
| Scope | Avg words | P50 words | Avg paragraphs | Avg first sentence words | Single-line paragraph ratio |
|---|---:|---:|---:|---:|---:|
| All posts | 11.21 | 8.00 | 2.65 | 1.80 | 0.58 |
| High-engagement | 10.56 | 9.00 | 2.76 | 2.08 | 0.71 |

## Opening Inventory
| Pattern | Count | High-engagement count | Top evidence |
|---|---:|---:|---|
| `direct_statement_opening` | 110 | 11 | `18138554839338145`: 文組平衡報導 24歲當保全45k 培養運動習慣，不思進取幾年 29歲開始學別的興趣，看書（最便宜）增廣見聞 30歲指數化投資為老年準備 31歲還在當保全75k，太舒服了... 希望各位文組不要太焦慮😂 |
| `personal_experience_opening` | 36 | 5 | `18090487226049721`: 我現在最重視的事，幾年前的我可能毫不在乎，隨著閱歷的增長，人難免會改變。 ▉ 我曾經覺得當個不沾鍋最好 小時候非常喜歡道家，那時候的觀念覺得什麼事都不要太過介入最好，就是無為。 於是我在人際上建立了一個信念： 如果對方沒有主動透露，就不要... |
| `number_or_result_opening` | 13 | 4 | `18021996542522735`: 8zz又發功啦 連房市都不放過 |
| `question_opening` | 13 | 3 | `18060146057405149`: 有一次教育訓練，一個同事跟我說：「你不是都坐在最前面嗎？所以我以為你今天沒來。」 我愣了一下，我從來沒有主動坐過前面。 這偶然的一句話，讓我又是得意，又是好奇背後的機制。 |
| `judgment_or_contrast_opening` | 5 | 2 | `18032366507112527`: 學習不是只有狂K猛K 讀書中間的休息不只是休息，而是在以另一種方式在學習。《大腦喜歡這樣學》提出大腦有兩種不同的學習模式：集中跟發散。 集中就是我們一般認真看書的樣子，我們集中注意力在理解書上的內容，這個對擴展我們的知識很有幫助。 發散模... |
| `how_to_opening` | 1 | 0 | `18101502527109575`: 任何現在做不到的事，可能都對現在的自己太難，無論其他人怎麼說。 我覺得不只考量技能，連動機也應該一併考慮進去，這下要顧及的東西就又更多了。 說到底環境、人際、生活是否能夠給你餘裕，是否符合人生目標，都會與動機強弱有關。 然而盤點一下對現在... |

## Ending Inventory
| Pattern | Count | High-engagement count | Top evidence |
|---|---:|---:|---|
| `soft_landing_ending` | 132 | 17 | `18318280480283741`: 我發現打造出互助的職場氛圍，能夠讓自己做得既偷懶又安心。 過去我的邏輯很簡單：把自己的事做好，其他人如何是個人造化，反正我已經做得比其他人輕鬆，我就是標準打工仔的想法，以為這就是極限了。 但是思維卡在這邊有點可惜，因為團結的環境，比我想像... |
| `clean_cut_ending` | 21 | 4 | `18090487226049721`: 我現在最重視的事，幾年前的我可能毫不在乎，隨著閱歷的增長，人難免會改變。 ▉ 我曾經覺得當個不沾鍋最好 小時候非常喜歡道家，那時候的觀念覺得什麼事都不要太過介入最好，就是無為。 於是我在人際上建立了一個信念： 如果對方沒有主動透露，就不要... |
| `action_advice_ending` | 13 | 2 | `18138554839338145`: 文組平衡報導 24歲當保全45k 培養運動習慣，不思進取幾年 29歲開始學別的興趣，看書（最便宜）增廣見聞 30歲指數化投資為老年準備 31歲還在當保全75k，太舒服了... 希望各位文組不要太焦慮😂 |
| `question_ending` | 10 | 2 | `17937015629906814`: 臥推壓到脖子的影片，我沒看完。因為一開始的來源有警告，所以就縮了，從關注度看來應該是蠻嚴重的。 後來館長拍的影片也引起很大的爭議，退一萬步想，我在新手的時候還真不懂護槓怎麼用，只是很好運的在學會之前沒有出事。 假設很多剛開始健身的新手也是... |
| `explicit_cta_ending` | 2 | 0 | `17976315995857465`: 這影片直接幫金魚腦的我複習這一年的荒腔走板 https://youtu.be/nHJIFu_m0vY?si=a99wlEQEkrOY5WAM 如果你老是覺得台灣政治在銃三小 也許可以透過這個影片快速瀏覽今年的事件 確認看看這些講法合不合理... |

## High-Engagement Opening Inventory
| Pattern | Count | High-engagement count | Top evidence |
|---|---:|---:|---|
| `direct_statement_opening` | 11 | 2 | `18138554839338145`: 文組平衡報導 24歲當保全45k 培養運動習慣，不思進取幾年 29歲開始學別的興趣，看書（最便宜）增廣見聞 30歲指數化投資為老年準備 31歲還在當保全75k，太舒服了... 希望各位文組不要太焦慮😂 |
| `personal_experience_opening` | 5 | 3 | `18090487226049721`: 我現在最重視的事，幾年前的我可能毫不在乎，隨著閱歷的增長，人難免會改變。 ▉ 我曾經覺得當個不沾鍋最好 小時候非常喜歡道家，那時候的觀念覺得什麼事都不要太過介入最好，就是無為。 於是我在人際上建立了一個信念： 如果對方沒有主動透露，就不要... |
| `number_or_result_opening` | 4 | 0 | `18021996542522735`: 8zz又發功啦 連房市都不放過 |
| `question_opening` | 3 | 0 | `18060146057405149`: 有一次教育訓練，一個同事跟我說：「你不是都坐在最前面嗎？所以我以為你今天沒來。」 我愣了一下，我從來沒有主動坐過前面。 這偶然的一句話，讓我又是得意，又是好奇背後的機制。 |
| `judgment_or_contrast_opening` | 2 | 0 | `18032366507112527`: 學習不是只有狂K猛K 讀書中間的休息不只是休息，而是在以另一種方式在學習。《大腦喜歡這樣學》提出大腦有兩種不同的學習模式：集中跟發散。 集中就是我們一般認真看書的樣子，我們集中注意力在理解書上的內容，這個對擴展我們的知識很有幫助。 發散模... |

## Cognitive Layer Seed
| Post | Score | Markers | Candidate sentence |
|---|---:|---|---|
| `18138554839338145` | 97867 | 不要 | 希望各位文組不要太焦慮😂 |
| `18090487226049721` | 17808 | 最好 | ▉ 我曾經覺得當個不沾鍋最好 |
| `18090487226049721` | 17808 | 不要, 最好 | 小時候非常喜歡道家，那時候的觀念覺得什麼事都不要太過介入最好，就是無為。 |
| `18090487226049721` | 17808 | 不要 | 於是我在人際上建立了一個信念： 如果對方沒有主動透露，就不要打聽。 |
| `18090487226049721` | 17808 | 真正 | 表面上沒有摩擦，但回頭看，也沒有真正靠近過誰。 |
| `17937015629906814` | 11827 | 應該 | 因為一開始的來源有警告，所以就縮了，從關注度看來應該是蠻嚴重的。 |
| `18318280480283741` | 5611 | 不是, 而是 | 這一年，我的個人實踐意外讓想法轉了個方向，在職場上，更有價值的事， 不是讓自己變強， 而是創造一個讓大家都願意參與變好的環境。 |
| `17853869487691373` | 2534 | 其實 | 這讓我開始想，我還有多少行為，其實是自動導航的？ |
| `18060146057405149` | 1830 | 不是 | 有一次教育訓練，一個同事跟我說：「你不是都坐在最前面嗎？ |
| `18032366507112527` | 1100 | 不是 | 學習不是只有狂K猛K |
| `18032366507112527` | 1100 | 而是, 不只是 | 讀書中間的休息不只是休息，而是在以另一種方式在學習。 |
| `18032366507112527` | 1100 | 不要 | 所以讀到不通就做別的事，但也不要整天只會空想，沒有連結理解就慢一些，沒有學習就沒有知識做連結。 |
| `17891629152081106` | 768 | 不是 | 古代一些大覺者是不是真的有神通偷看世界的一些答案. |
| `17987862590690421` | 711 | 不要 | 不要花時間在其他你很努力 |

## Temporal Shift
| Phase | Posts | Top opening | Top ending | Median score |
|---|---:|---|---|---:|
| early | 60 | direct_statement_opening | soft_landing_ending | 28.50 |
| middle | 59 | direct_statement_opening | soft_landing_ending | 199.00 |
| recent | 59 | direct_statement_opening | soft_landing_ending | 196.00 |

Stable signals:
- `top_opening` stayed `direct_statement_opening` across phases.
- `top_ending` stayed `soft_landing_ending` across phases.

## Anti-Voice Seed
- `總結來說` observed 0 times. Treat as possible not-me phrasing; verify in Manual Refinements before making it a hard rule.
- `总结来说` observed 0 times. Treat as possible not-me phrasing; verify in Manual Refinements before making it a hard rule.
- `綜上所述` observed 0 times. Treat as possible not-me phrasing; verify in Manual Refinements before making it a hard rule.
- `综上所述` observed 0 times. Treat as possible not-me phrasing; verify in Manual Refinements before making it a hard rule.
- `在這個快速變化的時代` observed 0 times. Treat as possible not-me phrasing; verify in Manual Refinements before making it a hard rule.
- `在这个快速变化的时代` observed 0 times. Treat as possible not-me phrasing; verify in Manual Refinements before making it a hard rule.
- `不僅如此` observed 0 times. Treat as possible not-me phrasing; verify in Manual Refinements before making it a hard rule.
- `不仅如此` observed 0 times. Treat as possible not-me phrasing; verify in Manual Refinements before making it a hard rule.
- `更重要的是` observed 0 times. Treat as possible not-me phrasing; verify in Manual Refinements before making it a hard rule.
- `moreover` observed 0 times. Treat as possible not-me phrasing; verify in Manual Refinements before making it a hard rule.
- `furthermore` observed 0 times. Treat as possible not-me phrasing; verify in Manual Refinements before making it a hard rule.
- `in today's world` observed 0 times. Treat as possible not-me phrasing; verify in Manual Refinements before making it a hard rule.

## /draft Quick-Reference Seed
### Calibration Anchor `18138554839338145`
- score: 97867
- good-version anchor: 文組平衡報導 24歲當保全45k 培養運動習慣，不思進取幾年 29歲開始學別的興趣，看書（最便宜）增廣見聞 30歲指數化投資為老年準備 31歲還在當保全75k，太舒服了... 希望各位文組不要太焦慮😂
- bad-version task: Generate a deliberately generic AI-ish version of this same idea, then explain why the original sounds closer to the user. Do not use the bad version for drafting.

### Calibration Anchor `18090487226049721`
- score: 17808
- good-version anchor: 我現在最重視的事，幾年前的我可能毫不在乎，隨著閱歷的增長，人難免會改變。 ▉ 我曾經覺得當個不沾鍋最好 小時候非常喜歡道家，那時候的觀念覺得什麼事都不要太過介入最好，就是無為。 於是我在人際上建立了一個信念： 如果對方沒有主動透露，就不要打聽。 保持距離，是一種尊重。 帶著這個信念，我和很多人維持著一種客客氣氣、不深不淺的關係。 表面上沒有摩擦，但回頭看，也沒有真正靠近過誰。
- bad-version task: Generate a deliberately generic AI-ish version of this same idea, then explain why the original sounds closer to the user. Do not use the bad version for drafting.

### Calibration Anchor `17937015629906814`
- score: 11827
- good-version anchor: 臥推壓到脖子的影片，我沒看完。因為一開始的來源有警告，所以就縮了，從關注度看來應該是蠻嚴重的。 後來館長拍的影片也引起很大的爭議，退一萬步想，我在新手的時候還真不懂護槓怎麼用，只是很好運的在學會之前沒有出事。 假設很多剛開始健身的新手也是這樣，看到這種狀況恐怕也是會擔心，如果這時候有業者能夠出來告知顧客，在他們那邊有多注重安全，教練多和藹會告知顧客安全措施，而且巡場的頻率也是妥妥的，大概能因為消除顧客疑慮，取得不少信任度吧？
- bad-version task: Generate a deliberately generic AI-ish version of this same idea, then explain why the original sounds closer to the user. Do not use the bad version for drafting.

## Runtime Notes
- `/voice` should use this file as the first pass, then verify important claims against `threads_daily_tracker.json`.
- High-engagement patterns are evidence anchors, not rules. If recent posts contradict them, mark the conflict.
- Manual Refinements in `brand_voice.md` outrank every generated or compiled signal.
