# M0 Audit - Knowledge Pipeline Integration

日期：2026-05-07

## 結論

`study` 與 `body` 可以進入 M1 抽共用 pipeline。

理由：

- 兩支 `process_notesv3try.py` 內容幾乎完全相同。
- 已確認唯一程式碼差異是 `BATCH_SIZE`。
- 兩邊的資料夾結構一致，適合改成 profile 設定。
- 目前 `00_inbox` 沒有待處理 Markdown，可以先做 dry-run 與 wrapper，不會立刻影響新資料。

## Git 狀態

盤點時工作樹已有既有修改與未追蹤檔。

與本次 M0 相關的新檔案：

- `400_Knowledge/INTEGRATION_PLAN.md`
- `400_Knowledge/M0_AUDIT.md`

注意：

- 目前 repo 根目錄沒有 `.gitignore`。
- `400_Knowledge` 目前整包是 untracked，因此 `.env`、logs、Notion 匯出檔、zip 都有被誤加入 Git 的風險。

## profile 現況

### study

根目錄：`400_Knowledge/study`

| 路徑 | 檔案數 | Markdown | 備註 |
| --- | ---: | ---: | --- |
| `00_inbox` | 14 | 0 | 目前沒有待處理 `.md`，有 png / csv / desktop.ini |
| `01_processed` | 1883 | 1883 | 正式卡片 |
| `02_quarantine` | 1 | 0 | 有一個非 Markdown 檔 |
| `03_archive` | 2409 | 2409 | 已處理原始筆記 |
| `article` | 1 | 0 | 非 Markdown |
| `config` | 2 | 1 | 含 `classification_map.md` |
| `logs` | 1 | 0 | `activity.log` |

其他重點檔案：

- `.env`
- `process_notesv3try.py`
- `process_notesv3try.py.bak`
- `requirements.txt`
- `Process.md`
- `zettelkasten_system_tutorial.md`
- `02_scripts/` 舊版腳本資料夾
- `config - 複製/` 舊設定備份

### body

根目錄：`400_Knowledge/body`

| 路徑 | 檔案數 | Markdown | 備註 |
| --- | ---: | ---: | --- |
| `00_inbox` | 0 | 0 | 空 |
| `01_processed` | 1155 | 1155 | 正式卡片 |
| `02_quarantine` | 0 | 0 | 空 |
| `03_archive` | 1170 | 1170 | 已處理原始筆記 |
| `article` | 0 | 0 | 空 |
| `config` | 1 | 1 | 含 `classification_map.md` |
| `logs` | 1 | 0 | `activity.log` |

其他重點檔案：

- `.env`
- `process_notesv3try.py`

## 腳本差異

比較指令：

```powershell
Compare-Object (Get-Content .\400_Knowledge\study\process_notesv3try.py) (Get-Content .\400_Knowledge\body\process_notesv3try.py)
```

結果：

```text
study: BATCH_SIZE = 10
body : BATCH_SIZE = 15
```

除此之外未發現其他內容差異。

## 敏感與不可搬移檔案

M1 之後仍應保留在各 profile 根目錄，不搬移、不提交內容：

- `400_Knowledge/study/.env`
- `400_Knowledge/body/.env`
- `400_Knowledge/study/logs/activity.log`
- `400_Knowledge/body/logs/activity.log`

建議在進入 M1 前新增 `.gitignore`，至少忽略：

```gitignore
400_Knowledge/**/.env
400_Knowledge/**/logs/
400_Knowledge/**/*.zip
400_Knowledge/**/__pycache__/
400_Knowledge/**/*.pyc
```

## 備份方式

進入 M1 前先做小範圍備份，不需要複製整個知識庫。

建議備份範圍：

- `400_Knowledge/study/process_notesv3try.py`
- `400_Knowledge/body/process_notesv3try.py`
- `400_Knowledge/study/config/classification_map.md`
- `400_Knowledge/body/config/classification_map.md`

建議備份位置：

```text
400_Knowledge/_backup/2026-05-07_M0/
```

## M1 建議切入點

先做最小可行版本：

1. 建立 `400_Knowledge/_pipeline/zettelkasten_pipeline.py`。
2. 先從 `study/process_notesv3try.py` 複製邏輯。
3. 把硬編碼路徑與 `BATCH_SIZE` 抽成設定物件。
4. 暫時用內建 profile dictionary，不急著引入 YAML parser。
5. 先支援：
   - `--profile study`
   - `--profile body`
   - `--show-config`
   - `--dry-run`
6. 不改動原本 `study/process_notesv3try.py` 與 `body/process_notesv3try.py`。

推薦理由：先建立新入口並保持舊入口可用，風險最低。
