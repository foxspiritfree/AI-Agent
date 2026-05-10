# Self Brain Schema

每個頁面都採用「Compiled Truth + Timeline」。

上半部是目前最可用的理解，可以被更新。下半部是事件與來源紀錄，只追加，不改寫舊條目。

## Page Template

```markdown
# Title

## Summary

一句到三句說明這頁目前最重要的結論。

## Current Understanding

- 目前可信的理解。
- 可以包含偏好、判斷、背景、限制。
- 不確定的內容標示 `confidence: low`。

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

- `high`：使用者明確說過，或檔案中明確記載。
- `medium`：多個訊號支持，但使用者未直接定義。
- `low`：暫時推論，等待確認。

## Writing Rules

- 先更新 Summary，再補 Current Understanding。
- Timeline 使用絕對日期。
- 使用者偏好和決策不要寫成泛用建議。
- 不把一次性情緒或狀態寫成長期人格判斷。
- 不保存 secrets、credential、token。
- 可用中文內容，但標題和檔名盡量穩定、易搜尋。

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
