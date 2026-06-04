# Body Profile

`body` 是身體、生理、動作、疼痛、訓練、復健與解剖相關知識的正式 knowledge profile。

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
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile body --dry-run
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile body
```

## Do Not Add Back

- `article/`
- 舊 `process_notesv3try.py` 原始版本
- 從 `400_Knowledge/知識庫/body` 回灌的舊 ID 檔案

Legacy 資料已移到 `200_Reference/imported/legacy-knowledge-base/cleanup-2026-06-01/`；body 舊 ID 對照先看 `400_Knowledge/_reports/body-legacy-diff-2026-06-01.md`。
