# Writing Flywheel Weekly Email

Subject: 本週寫作飛輪 - YYYY-MM-DD

## 寄送規則

- 使用 Gmail 外掛直接寄到 `join6110@gmail.com`。
- 信件本文放完整 weekly packet，不只放摘要。
- 開頭可保留一段「本週建議先寫」，但後面必須貼上 A/B/C 完整內容。
- 附上本機 weekly packet 路徑，方便回查。
- Email 版不要直接貼 Markdown 模板空欄位。
- Email 版不要使用巢狀 code block；卡片盒內容改用短標籤清單。
- 所有欄位都必須填入實際內容；沒有內容就刪掉該欄，不保留 `題目：`、`我的經驗：` 這類空白提示。
- 需要使用者補料時，只列 1-3 個具體問題，不放整份空白回覆表。
- `既有卡片盒引用` 只能列 `400_Knowledge/study/01_processed/` 或 `400_Knowledge/body/01_processed/` 中實際命中的卡片。
- 找卡時先讀 `400_Knowledge/study/config/classification_map.md` 與 `400_Knowledge/body/config/classification_map.md`，再打開命中的實際卡片。
- map 只當索引，不當作卡片引用來源。
- 若沒有實際命中的 study/body 卡片，寫 `無既有卡片命中`。
- AI 本次整理出的內容要標為 `可沉澱成新卡的筆記草案`，不要稱為卡片盒內容。
- 一週可以有多篇 A 題；email 開頭列「本週可寫清單」，不要做成 A/B/C 各一篇。
- 每個 A/B/C 題目都必須附 `外部新鮮度`：`green / yellow / weak / red / unverified`。
- 不可寄出仍寫著「未查外部新鮮度」的 weekly email；若沒有強時事訊號，要明確標成 `yellow` 或 `weak`。

## 信件本文

{{full_weekly_packet}}

## Email 版建議結構

```text
本週可寫清單
第一優先：...
其他可直接寫：...
需要補料後可寫：...
外部新鮮度總結：...

A. 可直接寫
題目：...
外部新鮮度：...
為什麼可寫：...
既有卡片盒引用：...
可沉澱成新卡的筆記草案：...

初稿：
...

B. 補一段就能寫
題目：...
卡在哪：...
你只要補：
1. ...
2. ...

C. 先觀察
題目：...
保留原因：...
```

## 本機檔案

請見：

```text
data/weekly-packets/YYYY-MM-DD.md
```
