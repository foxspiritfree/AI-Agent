---
name: zettelkasten
description: 處理 400_Knowledge 的卡片盒筆記流程時使用；當使用者提到 Notion 匯出、靈感表格、卡片盒、Zettelkasten、study、body、讀書心得、身體生理知識、knowledge pipeline、分類圖、01_processed、03_archive 或要把內容放進知識庫時觸發。
---

# Zettelkasten

協助使用者處理 `400_Knowledge` 的 Notion 匯出到卡片盒筆記流程。回答使用繁體中文，直接執行明確指令，保持最小修改。

## 核心路徑

- 計畫：`400_Knowledge/INTEGRATION_PLAN.md`
- 共用入口：`400_Knowledge/_pipeline/zettelkasten_pipeline.py`
- Profile：
  - `400_Knowledge/profiles/study.yaml`
  - `400_Knowledge/profiles/body.yaml`
- Profile 資料根：
  - `400_Knowledge/study`
  - `400_Knowledge/body`
- 知識庫捷徑：`400_Knowledge/知識庫.lnk`，目前指向 `D:\Feng`

## 資料夾語意

每個 profile 都有相同結構：

- `00_inbox`：Notion 匯出後等待處理的 Markdown 筆記。
- `01_processed`：AI 分類後產生的正式卡片。
- `02_quarantine`：問題資料或無法處理資料。
- `03_archive`：已處理原始筆記。
- `config/classification_map.md`：分類樹。
- `logs/activity.log`：處理紀錄。

## 開始前檢查

先執行：

```powershell
git status --short
Get-Content .\400_Knowledge\INTEGRATION_PLAN.md
```

如果是處理匯入或 pipeline 行為，接著看：

```powershell
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile study --show-config
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile body --show-config
```

## 常用指令

看設定：

```powershell
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile study --show-config
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile body --show-config
```

安全預覽：

```powershell
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile study --dry-run
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile body --dry-run
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile study --dry-run --limit 3
```

小批正式處理：

```powershell
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile study --limit 3 --no-archive
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile body --limit 3 --no-archive
```

正式處理：

```powershell
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile study
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile body
```

檢查結果：

```powershell
Get-ChildItem .\400_Knowledge\study\01_processed | Select-Object -First 20
Get-ChildItem .\400_Knowledge\study\02_quarantine | Select-Object -First 20
Get-Content .\400_Knowledge\study\logs\activity.log -Tail 80
```

把 `study` 改成 `body` 可檢查 body profile。

## 安全規則

- 不要讀取或輸出 `.env` 內容；只能確認是否存在或 `has_google_api_key`。
- 不要刪除 `01_processed`、`03_archive`、`classification_map.md`。
- 不要清空 logs。
- 不要直接搬移大量卡片到 `D:\Feng`；先列出來源、目標、數量。
- 正式處理前先跑 `--dry-run`。
- 測試新流程時優先使用 `--limit 3 --no-archive`。
- 修改 pipeline 前先確認目前 milestone，只做該 milestone 的最小變更。

## Profile 選擇

- `study`：讀書心得、商業、心理、學習、觀念整理。
- `body`：身體、生理、動作、疼痛、訓練、復健、解剖相關知識。

如果內容明顯屬於兩者之一，直接選對應 profile，不要要求使用者選。

## Notion Intake

Notion URL / data source 以 `000_Agent/NOTION_SOURCE_MAP.md` 為 single source。

### Learning Ingest

用於 Notion「學習」與課程筆記。

流程：

1. 先列出候選學習筆記，不整包搬課程頁。
2. 判斷是否屬於學習、商業、心理、方法論等 `study` profile。
3. 原始課程內容放 `200_Reference/imported/` 或 `400_Knowledge/study/00_inbox`。
4. 跑 pipeline 前先 `--dry-run`。
5. 已可寫作的觀點再接 `article-enrichment`。

邊界：

- 不把課程原文整包複製到正式卡片。
- 不把未理解的摘錄當成 Current Understanding。
- 身體、訓練、復健、動作類筆記走 `body` profile。

### Inspiration Ingest

用於 Notion「靈感蒐集」與「靈感列表」。

流程：

1. 先判斷素材是原始靈感、已整理筆記、工具清單，還是可直接寫作的觀點。
2. 原始資料不直接寫入正式卡片；先放到對應 profile 的 `00_inbox` 或 `200_Reference/imported/`。
3. 學習、商業、心理、方法論走 `400_Knowledge/study`。
4. 身體、生理、訓練、復健、動作相關走 `400_Knowledge/body`。
5. 可寫成文章的素材，再接 `article-enrichment` 補強草稿。

邊界：

- 不整包搬 Notion 頁面。
- 不把未分類靈感直接當成長期真相。
- 正式跑 zettelkasten pipeline 前先 dry-run。

## 跨對話接續

新對話接續時先讀：

```powershell
Get-Content .\400_Knowledge\INTEGRATION_PLAN.md
git status --short
```

照計畫中的下一個 milestone 做；不要重開架構討論。
