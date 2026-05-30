# Self Brain Schema

每個頁面都採用「Compiled Truth + Timeline」。

上半部是目前最可用的理解，可以被更新。下半部是事件與來源紀錄，只追加，不改寫舊條目。

## Page Template

```markdown
# Title

## Summary

一句到三句說明這頁目前最重要的結論。（只寫 high/medium 的現況，不寫 aspirational。）

## Current Understanding

- 目前可信的理解。confidence: high
- 可以包含偏好、判斷、背景、限制。
- 不確定的內容標示 `confidence: low`。
- 正在發展中但尚未穩定的理解標示 `confidence: medium`。

## Aspirational Direction

（選填。若此頁有「我想成為的方向」才加這個區塊。）

- 希望能穩定做到的狀態。confidence: aspirational | source: study 卡片 / 書名 / 對話
- 認同但尚未內化的原則。confidence: aspirational | source: ...

## Open Threads

- 尚未確認、之後要追蹤、需要使用者補充的事項。

## See Also

- `../path/example.md`

---

## Timeline

- YYYY-MM-DD | source: conversation | confidence: high | 記錄發生了什麼、使用者說了什麼、或決策如何形成。
```

## Source Types

- `conversation`：使用者在對話中明確說明。
- `user correction`：使用者修正 AI，優先級最高。
- `file`：來自本專案檔案。
- `external`：來自外部網頁、文件或 repo。
- `inference`：AI 根據上下文推論，必須標 `confidence: low` 或 `medium`。

## Confidence

- `high`：使用者明確說過，或檔案中明確記載。目前確認的現況。
- `medium`：多個訊號支持，但使用者未直接定義。正在發展中、已有理論理解但尚未穩定內化。
- `low`：暫時推論，等待確認。
- `aspirational`：使用者明確希望成為的樣子，或從卡片盒、書籍中認同並想內化的方向。**不代表現況**，但 AI 可在決策輔助時以此框架引導使用者往此方向思考。

## Confidence 與輸出場景的對應

| 輸出場景 | 可引用的 confidence 層 |
| --- | --- |
| 日常決策輔助、習慣設計、行動建議 | `high` / `medium` / `aspirational` |
| 自我理解、復盤、日記討論 | `high` / `medium` / `low` |
| 履歷、Bio、對外自我介紹、推薦信素材 | **僅 `high`** |
| 寫作聲音與文章風格判斷 | `high` / `medium` |
| 學習計畫、能力訓練方向 | `high` / `medium` / `aspirational` |

> **規則**：任何對外產出（履歷、Bio、LinkedIn、簡介文）只能引用 `confidence: high` 的內容。AI 在輸出此類文件前，必須主動過濾 `aspirational` 與 `low` 的條目。

## Writing Rules

- 先更新 Summary，再補 Current Understanding。
- Timeline 使用絕對日期。
- 使用者偏好和決策不要寫成泛用建議。
- 不把一次性情緒或狀態寫成長期人格判斷。
- 不保存 secrets、credential、token。
- 可用中文內容，但標題和檔名盡量穩定、易搜尋。
- `aspirational` 條目要寫清楚**來源**（例如：「來自 study 卡片」「讀完 X 書後認同」），不要讓 AI 誤以為是事實。
- 同一頁面中，`aspirational` 條目建議集中在獨立子區塊（例如 `## Aspirational Direction`），不要混入 Current Understanding。

## Minimal Page

如果時間很少，至少保留：

```markdown
# Title

## Summary

待整理。

## Current Understanding

- 待整理。

## Open Threads

- 待補。

## See Also

- None.

---

## Timeline

- YYYY-MM-DD | source: conversation | confidence: medium | 初次建立此頁。
```
