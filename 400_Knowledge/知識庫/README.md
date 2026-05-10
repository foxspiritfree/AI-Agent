# Legacy Knowledge Base Backup

此資料夾是舊卡片盒與文章創作工作區的備存，不再作為正式寫入目標。

## Current Status

- 狀態：legacy / backup / reference only
- 整合日期：2026-05-08
- 整合報告：`../_reports/legacy-knowledge-base-integration-2026-05-08.md`
- 完整副本：`../../200_Reference/imported/legacy-knowledge-base/知識庫/`

## Do Not Use As

- 不要把新卡片寫進這裡。
- 不要把新文章草稿放進這裡。
- 不要直接用這裡的 `study/` 或 `body/` 當正式卡片來源。
- 不要把 `Gemini.md` 當現行 SOP；正式 SOP 已移到 `../../000_Agent/skills/article-enrichment/SKILL.md`。

## Formal Routes

| 舊內容 | 現在正式位置 |
| --- | --- |
| `study/` | `../study/01_processed/` |
| `body/` | `../body/01_processed/` |
| `study_classification_map.md` | `../study/config/classification_map.md` |
| `body_classification_map.md` | `../body/config/classification_map.md` |
| `articles/` 加工版文章 | `../../200_Reference/imported/legacy-article-enrichment/articles/` |
| `Published/` 加工版文章 | `../../200_Reference/imported/legacy-article-enrichment/published/` |
| `Published/` 乾淨寫作樣本 | `../../200_Reference/writing-samples/social/legacy-published/` |
| 文章增補 SOP | `../../000_Agent/skills/article-enrichment/SKILL.md` |

## Folder Notes

- `study/`：已確認與 `../study/01_processed/` 檔名數量完全一致，不需要重新搬入。
- `body/`：分類圖與正式 `body` 相同，但檔名與內容狀態不同；未來若要使用，先做 ID / title / content diff，不要覆蓋正式資料。
- `articles/`：舊文章增補流程產物，檔名多為 `[PROCESSED]_*`。
- `Published/`：混合已發表文章與已增補文章；乾淨樣本已另存到 `200_Reference/writing-samples/social/legacy-published/`。
- `Gemini.md`：舊文章自動關聯 SOP，已轉寫成 `article-enrichment` skill。
- `A2A5.md`、`A2A5A.md`、`A2A5A1.md`：空檔，保留作為舊狀態痕跡。

## Future Review Checklist

重新檢視此資料夾時，依序做：

1. 先讀 `../_reports/legacy-knowledge-base-integration-2026-05-08.md`。
2. 確認正式來源是否已有同等資料。
3. 若要處理 `study/`，先比對檔名與 hash；目前預期不需要動。
4. 若要處理 `body/`，先產出差異報告，不要直接搬移或覆蓋。
5. 若要分析文章風格，使用 `../../200_Reference/writing-samples/social/legacy-published/`。
6. 若要用卡片補文章，使用 `../../000_Agent/skills/article-enrichment/SKILL.md`。

## Recommended Decision

保留此資料夾作為歷史備存。正式知識與文章流程已收斂到 `400_Knowledge/study`、`400_Knowledge/body`、`200_Reference`、`000_Agent/skills/article-enrichment`。
