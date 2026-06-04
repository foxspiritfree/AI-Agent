# Study Profile

`study` 是讀書心得、商業、心理、學習、方法論與一般觀念整理的正式 knowledge profile。

## Folder Contract

- `00_inbox/`：等待 pipeline 處理的新 Markdown 筆記。
- `01_processed/`：正式卡片來源；文章補強與知識查找優先讀這裡。
- `02_quarantine/`：問題資料或暫時無法處理的筆記。
- `03_archive/`：已處理的原始筆記。
- `config/classification_map.md`：分類圖。
- `logs/activity.log`：pipeline 執行紀錄。
- `process_notesv3try.py`：deprecated wrapper，只轉呼叫共用 pipeline。

## Commands

```powershell
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile study --dry-run
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile study
```

## Do Not Add Back

- `article/`
- `sample/`
- `02_scripts/`
- `config - 複製/`
- 舊 `process_notesv3try.py` 原始版本或 `.bak`

Legacy 資料已移到 `200_Reference/imported/legacy-knowledge-base/cleanup-2026-06-01/`。
