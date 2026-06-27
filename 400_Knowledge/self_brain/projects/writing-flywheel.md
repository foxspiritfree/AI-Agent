# Writing Flywheel

## Summary

建立一個寫作飛輪：每週抓取 Threads 熱門文章，依照使用者關注主題分類，整理成可供選題、卡片盒補強與文章起草的素材池；同時先匯入自己的歷史 Threads 文章，作為風格、語氣與選題邊界的分析基準。

## Current Understanding

- 初版來源先使用官方 Threads API，而非登入式瀏覽器爬蟲。理由：每週低頻抓取、以熱門搜尋為主，官方 API 比非官方 scraper 穩定且風險低。
- 初版分類採 8 個主類別：
  1. AI 工作流與個人系統
  2. 職場協作、信任與團隊流動
  3. 溝通、提問、傾聽與說服
  4. 習慣、專注、行為設計
  5. 成長、壓力、韌性與反脆弱
  6. 寫作、閱讀與卡片盒知識生產
  7. 身體科學、運動訓練、疼痛與睡眠
  8. 商業、產品、品牌與成長實驗
- Prototype 工作區：`100_Todo/projects/writing-flywheel/`
- 2026-06-18 token setup completed. Official Threads API calls can return data, but current results appear limited to the authenticated user's own posts, not public popular posts.
- 2026-06-20 補上 own-history 匯入路徑：用官方 Threads API 抓自己的歷史貼文，輸出 `threads_daily_tracker.json` 與 `posts_by_date.md`，供 AK-Threads-Booster 的 setup / voice / draft 使用。

## Data Tracks

1. 自己的歷史文章：聲音基準、常用句型、題材邊界、觀點密度與高互動模式。
2. 外部熱門文章：每週素材發現、可延伸選題、卡片盒補強與市場語感。
3. 一稿多平台模板：在使用者修改完主稿後，依平台轉換成 Threads、X、Facebook、Instagram、LinkedIn 版本。

推薦順序：先跑自己的歷史文章，再看外部熱門素材。理由：起草時先保住自己的語氣與判斷框架，再用外部素材補新鮮度。

## Workflow Planning

目前推薦把寫作飛輪拆成四段：

1. Weekly Packet：每週抓取外部熱門素材，結合 `Inspiration.md`、`study`、`300_Journal`、歷史 Threads，整理出 A/B/C 題目。
2. Human Soul Injection：A 題可直接產初稿；B/C 若使用者補上個人經驗、立場或轉念，重新評分後也可進入初稿。
3. Master Draft：先產一份以 Threads/AK 聲音基準為主的主稿，讓使用者修改。此階段不讓多平台格式干擾文章核心。
4. Multi-Platform Adaptation：使用 `100_Todo/projects/writing-flywheel/one_draft_multi_platform_template.md`，把使用者修改後的主稿轉成 Threads、X、Facebook、Instagram、LinkedIn。

一稿多平台模板應放在「使用者修改完主稿之後」執行。理由：先保住核心觀點與個人語氣，再依平台調整 hook、長度、資訊密度與 CTA。

## Own History Import

工作區：

```text
100_Todo/projects/writing-flywheel/
```

指令：

```powershell
$env:THREADS_ACCESS_TOKEN='your-token'
npm run fetch:own
```

輸出：

- `threads_daily_tracker.json`：AK-Threads-Booster 相容 tracker。
- `posts_by_date.md`：自己的歷史貼文可讀版。
- `data/raw/threads-own-posts-YYYY-MM-DD.json`：原始 API 回傳封存。

目前 own-history MVP 匯入貼文文字與 post-level insights：`views`, `likes`, `replies`, `reposts`, `quotes`, `shares`。留言尚未匯入，所以風格分析先以主貼文語氣為主，回覆語氣先標成資料不足。

## Next Steps

- 判斷下一步路線：確認 `threads_keyword_search` 是否需要 App Review / Advanced Access，或先做 browser scraper fallback。
- 目前推薦先做 browser scraper fallback，理由是寫作飛輪要先驗證「公開熱門素材發現」價值，不應卡在 Meta 權限審核。
- 先用 `npm run fetch:own` 建立自己的歷史文章 tracker，再跑 voice / style analysis。
- 將 `one_draft_multi_platform_template.md` 納入後段轉換流程：weekly packet 不直接輸出五平台版本，只在主稿被使用者修改後才執行平台適配。
- 後續再回頭處理每週自動化、AI 摘要、時間窗、留言匯入與互動數據欄位。

## Timeline

- 2026-06-18 | source: conversation | 建立 Threads 熱門文章每週抓取 prototype 與 8 類主題框架。
- 2026-06-18 | source: conversation | 完成 Threads token / Postman / webhook 設定；API 可回資料，但目前只抓到使用者自己的文章，下一步偏向 scraper fallback。
- 2026-06-20 | source: conversation | 補上自己的歷史 Threads 文章匯入功能，避免只看外部熱門素材而缺少個人風格基準。
- 2026-06-21 | source: conversation | 納入一稿多平台模板，決定在使用者修改完主稿後，再轉成 Threads、X、Facebook、Instagram、LinkedIn。
