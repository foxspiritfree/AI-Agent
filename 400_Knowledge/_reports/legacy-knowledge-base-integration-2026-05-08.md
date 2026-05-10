# Legacy Knowledge Base Integration 2026-05-08

## Summary

`400_Knowledge/知識庫` 已定位為 legacy source，不再作為正式寫入目標。正式卡片來源維持 `400_Knowledge/study/01_processed` 與 `400_Knowledge/body/01_processed`；文章創作流程改由 `article-enrichment` skill 管理。

## Actions Taken

- 完整舊知識庫副本已保存到 `200_Reference/imported/legacy-knowledge-base/知識庫/`。
- 舊文章加工資料已保存到 `200_Reference/imported/legacy-article-enrichment/articles/` 與 `200_Reference/imported/legacy-article-enrichment/published/`。
- `Published` 內文章已產生乾淨寫作樣本到 `200_Reference/writing-samples/social/legacy-published/`，移除 `## 延伸知識補充` 後段。
- 舊 `Gemini.md` 的文章增補 SOP 已轉成 `000_Agent/skills/article-enrichment/SKILL.md`。
- 新增快捷入口 `000_Agent/workflows/article-enrichment.md`。

## Audit Results

### Study

- Legacy source: `400_Knowledge/知識庫/study`
- Formal source: `400_Knowledge/study/01_processed`
- Legacy Markdown files: 1883
- Formal Markdown files: 1883
- Same filenames: 1883
- Only legacy filenames: 0
- Only formal filenames: 0
- `study_classification_map.md` hash matches `study/config/classification_map.md`: yes

Conclusion: `study` 已完全對上新系統，不需要從 legacy 重新搬入。

### Body

- Legacy source: `400_Knowledge/知識庫/body`
- Formal source: `400_Knowledge/body/01_processed`
- Legacy Markdown files: 1155
- Formal Markdown files: 1155
- Same filenames: 0
- Only legacy filenames: 1155
- Only formal filenames: 1155
- Same content hashes: 25
- Only legacy content hashes: 1130
- Only formal content hashes: 1130
- `body_classification_map.md` hash matches `body/config/classification_map.md`: yes

Conclusion: `body` 分類樹相同，但 legacy 與 formal 檔名/內容狀態不同。不要覆蓋正式 `body/01_processed`；若要合併，應先做 ID 對齊與內容差異檢查。

### Articles

- Legacy `articles`: 9 files, all already `[PROCESSED]`.
- Legacy `Published`: 14 files, mixed `[Published]` and `[PROCESSED]`.
- Clean writing samples generated: 14 files.

Conclusion: `articles` 與 `Published` 是文章加工與寫作樣本資料，不應混入 `study/body` profile。乾淨原文樣本進 `200_Reference/writing-samples/social/legacy-published/`；加工版保留在 imported。

## New Routing

| Content | Formal Location |
| --- | --- |
| Study cards | `400_Knowledge/study/01_processed/` |
| Body cards | `400_Knowledge/body/01_processed/` |
| Legacy full knowledge base | `200_Reference/imported/legacy-knowledge-base/知識庫/` |
| Legacy enriched articles | `200_Reference/imported/legacy-article-enrichment/` |
| Clean published writing samples | `200_Reference/writing-samples/social/legacy-published/` |
| Article enrichment SOP | `000_Agent/skills/article-enrichment/SKILL.md` |
| Article enrichment shortcut | `000_Agent/workflows/article-enrichment.md` |

## Follow-up

- If `body` legacy content matters, run a targeted diff by ID prefix and title, not a bulk overwrite.
- If writing voice analysis is needed, analyze `200_Reference/writing-samples/social/legacy-published/` and write conclusions to `400_Knowledge/self_brain/writing_voice/`.
