# Knowledge Pipeline Integration Plan

## 目標

把 `study` 與 `body` 兩套相同邏輯的卡片盒筆記流程，整合成一套可重複使用的知識處理系統。

最終狀態：

- 共用一套 Zettelkasten pipeline 程式。
- `study`、`body` 只作為不同 knowledge profile。
- 建立對應 skill，讓 AI 知道如何協助處理 Notion 匯出、分類、檢查、搬移知識庫。
- 建立 workflow，讓每次處理知識匯入時有固定 SOP。
- 保留既有資料，不破壞 `01_processed`、`03_archive`、`classification_map.md`。

## 已知現況

- `400_Knowledge/study/process_notesv3try.py` 與 `400_Knowledge/body/process_notesv3try.py` 幾乎相同。
- 主要差異：
  - `study` 的 `BATCH_SIZE = 10`
  - `body` 的 `BATCH_SIZE = 15`
  - 兩者各自有不同的 `config/classification_map.md`
- 共同流程：
  - `00_inbox`：Notion 匯出後等待處理的 Markdown 筆記
  - `01_processed`：AI 分類後產生的正式卡片
  - `02_quarantine`：問題資料或無法處理資料
  - `03_archive`：已處理原始筆記
  - `config/classification_map.md`：分類樹
  - `logs/activity.log`：處理紀錄
- `400_Knowledge/知識庫.lnk` 指向 `D:\Feng`，最後完整內容會搬到該知識庫中相對應資料夾。

## 推薦架構

```text
400_Knowledge/
  _pipeline/
    zettelkasten_pipeline.py
    README.md
  profiles/
    study.yaml
    body.yaml
  study/
    00_inbox/
    01_processed/
    02_quarantine/
    03_archive/
    config/classification_map.md
  body/
    00_inbox/
    01_processed/
    02_quarantine/
    03_archive/
    config/classification_map.md

000_Agent/
  skills/
    zettelkasten/
      SKILL.md
  workflows/
    knowledge-ingest.md
```

推薦先做 profile 化，不急著搬動既有資料夾；理由是風險低，而且可以保留你原本的操作習慣。

## Milestones

### M0：盤點與保護

狀態：完成

目標：確認現有流程、資料量、差異點，避免整合時破壞既有知識庫。

交付物：

- 已補齊 `study` / `body` 現況清單：見 `400_Knowledge/M0_AUDIT.md`。
- 已記錄兩支腳本差異：只有 `BATCH_SIZE` 不同。
- 已確認 `.env`、logs 需要保留在 profile 內且不得提交。
- 已定義 M1 前的小範圍備份方式。

驗證：

```powershell
git status --short
Compare-Object (Get-Content .\400_Knowledge\study\process_notesv3try.py) (Get-Content .\400_Knowledge\body\process_notesv3try.py)
```

### M1：抽出共用 pipeline

狀態：完成

目標：建立 `400_Knowledge/_pipeline/zettelkasten_pipeline.py`，把兩支重複腳本整合成可由 profile 控制的版本。

交付物：

- 已建立共用 pipeline 程式：`400_Knowledge/_pipeline/zettelkasten_pipeline.py`。
- 已建立內建 profile 讀取邏輯，支援 `study` 與 `body`。
- 已保留既有 `study` / `body` 資料夾作為資料根目錄。
- 已保留原腳本，不刪除、不改成 wrapper。
- 已新增 `.gitignore`，避免 `.env`、logs、zip、pycache 被誤提交。

驗證：

```powershell
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile study --dry-run
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile body --dry-run
```

### M2：建立 profiles

狀態：完成

目標：讓 `study`、`body` 的差異只存在設定檔，不存在重複程式碼。

交付物：

- 已建立 `400_Knowledge/profiles/study.yaml`
- 已建立 `400_Knowledge/profiles/body.yaml`
- 設定項包含：
  - `root_path`
  - `inbox_path`
  - `processed_path`
  - `quarantine_path`
  - `archive_path`
  - `classification_map_path`
  - `log_file_path`
  - `batch_size`
  - `target_knowledge_base_path`
- 已讓共用 pipeline 從 profile YAML 載入設定，不再把 `study` / `body` 設定寫死在程式內。

驗證：

```powershell
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile study --show-config
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile body --show-config
```

### M3：安全處理與 dry-run

狀態：完成

目標：在真正寫入前，可以先看 AI 會如何分類，降低污染分類圖的風險。

交付物：

- 已有 `--dry-run`：顯示設定、分類 ID 數量、待處理檔案、批次規劃，不呼叫 API、不寫入。
- 已新增 `--limit N`：限制處理筆數。
- 已新增 `--no-archive`：正式處理後保留原始 inbox 檔，不搬到 `03_archive`。
- dry-run 與正式流程共用同一套 inbox 掃描、limit、batch 規則。

驗證：

```powershell
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile study --dry-run --limit 3
```

### M4：建立 skill

狀態：完成

目標：讓 AI 在你提到 Notion 匯出、卡片盒、study/body/body knowledge 時，知道該怎麼協助，不用每次重新說明。

交付物：

- 已建立 `000_Agent/skills/zettelkasten/SKILL.md`
- 內容包含：
  - 觸發條件
  - 資料夾語意
  - 執行前檢查
  - 不可破壞規則
  - 常用指令
  - 檢查 processed / quarantine / logs 的方式

驗證：

```powershell
Get-Content .\000_Agent\skills\zettelkasten\SKILL.md
```

### M5：建立 workflow

狀態：完成

目標：把「下載 Notion 表格 -> 放 inbox -> 跑 pipeline -> 檢查結果 -> 放到 D:\Feng」變成固定 SOP。

交付物：

- 已建立 `000_Agent/workflows/knowledge-ingest.md`
- workflow 包含：
  - Step 1：確認 profile
  - Step 2：檢查 inbox
  - Step 3：dry-run
  - Step 4：正式處理
  - Step 5：檢查 logs / quarantine
  - Step 6：整理到知識庫目標資料夾

驗證：

```powershell
Get-Content .\000_Agent\workflows\knowledge-ingest.md
```

### M6：遷移與收斂

狀態：完成

目標：在共用 pipeline 穩定後，清理舊腳本與重複文件。

交付物：

- 舊 `process_notesv3try.py` 已標記 deprecated，保留作為備援，不改執行邏輯。
- 已補 `400_Knowledge/README.md`。
- 已明確說明新入口指令。

驗證：

```powershell
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile study --help
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile body --help
```

## 跨對話接續方式

每次新對話先讀：

```powershell
Get-Content .\400_Knowledge\INTEGRATION_PLAN.md
git status --short
```

接著只做目前 milestone 的最小可行修改。

## 下一步

整合計畫 M0-M6 已完成。下一階段可開始用 `000_Agent/workflows/knowledge-ingest.md` 跑一次實際匯入，或再新增其他 profile。
