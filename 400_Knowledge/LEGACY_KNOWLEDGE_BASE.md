# Legacy Knowledge Base

`400_Knowledge/知識庫` 不再是正式知識來源。

## 正式來源

| 內容 | 現在使用 |
| --- | --- |
| study 卡片 | `400_Knowledge/study/01_processed/` |
| body 卡片 | `400_Knowledge/body/01_processed/` |
| study 分類圖 | `400_Knowledge/study/config/classification_map.md` |
| body 分類圖 | `400_Knowledge/body/config/classification_map.md` |
| 文章增補 SOP | `000_Agent/skills/article-enrichment/SKILL.md` |
| 知識匯入 SOP | `000_Agent/skills/zettelkasten/SKILL.md` |

## Legacy 保存位置

完整 legacy copy：

```text
200_Reference/imported/legacy-knowledge-base/知識庫/
```

本次從 active 區移出的副本：

```text
200_Reference/imported/legacy-knowledge-base/active-copy-2026-06-01/知識庫/
```

本次收斂出的舊入口、舊備份與 profile 雜項：

```text
200_Reference/imported/legacy-knowledge-base/cleanup-2026-06-01/
```

舊文章加工資料：

```text
200_Reference/imported/legacy-article-enrichment/
```

乾淨寫作樣本：

```text
200_Reference/writing-samples/social/legacy-published/
```

## 差異報告

- `400_Knowledge/_reports/legacy-knowledge-base-integration-2026-05-08.md`
- `400_Knowledge/_reports/body-legacy-diff-2026-06-01.md`

## 使用規則

- 不把新卡片寫入 legacy copy。
- 不從 legacy copy bulk overwrite `study/body`。
- 若需要追溯 `body` 舊 ID，先看 `body-legacy-diff-2026-06-01.md`。
