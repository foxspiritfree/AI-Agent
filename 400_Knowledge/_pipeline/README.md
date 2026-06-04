# Zettelkasten Pipeline

共用卡片盒筆記處理入口。

目前支援兩個 profile：

- `study`
- `body`

Profile 設定放在：

- `400_Knowledge/profiles/study.yaml`
- `400_Knowledge/profiles/body.yaml`

## 指令

顯示設定：

```powershell
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile study --show-config
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile body --show-config
```

dry-run：

```powershell
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile study --dry-run
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile body --dry-run
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile study --dry-run --limit 3
```

正式執行：

```powershell
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile study
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile body
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile study --limit 3 --no-archive
```

## 安全選項

- `--dry-run`：只顯示設定、分類 ID 數量、待處理檔案與批次，不呼叫 API、不寫入。
- `--limit N`：最多處理 N 個 inbox Markdown 檔。
- `--no-archive`：正式處理後保留原始 inbox 檔，不搬到 `03_archive`。

## 現階段限制

- Profile YAML 目前支援簡單 `key: value` 格式。
- 舊入口 `study/process_notesv3try.py` 與 `body/process_notesv3try.py` 已改成 deprecated wrapper，會轉呼叫本共用 pipeline。
