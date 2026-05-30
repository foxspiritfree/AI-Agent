---
name: zettelkasten
description: 處理 400_Knowledge 的卡片盒筆記流程時使用；當使用者提到 Notion 匯出、Google Sheet/快速筆記、靈感表格、卡片盒、Zettelkasten、study、body、讀書心得、身體生理知識、knowledge pipeline、分類圖、01_processed、03_archive 或要把內容放進知識庫時觸發。
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

## Google Sheets Intake

用於 Google Sheet「快速筆記」或其他表格筆記接入卡片盒。

流程：

1. 用 Google Drive connector 讀 spreadsheet metadata，確認分頁與欄位。
2. 若分頁欄位是 `筆記`、`來源`，直接把未處理列轉成 `400_Knowledge/<profile>/00_inbox/*.md`。
3. Markdown 只保留必要內容：

```markdown
# 短標題

## 原始筆記
...

## 來源
...
```

4. 檔名建議使用穩定 row 序號與短標題，例如 `sheet-0012-填補空格帶來成長感.md`。
5. 匯入後先跑：

```powershell
$env:PYTHONIOENCODING='utf-8'
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile study --dry-run
```

6. 正式處理用現有 pipeline；pipeline 會自動用兩階段分類圖處理混雜 inbox：
   - 第一階段：用淺層分類圖替每筆筆記找大分支。
   - 第二階段：只抽相關分支給 AI 做精準 parent 判斷與摘要。
7. 處理完成後回報使用者可刪除 Sheet 的列範圍；若 connector 無寫入 scope，不要反覆嘗試回寫。

範例：

```powershell
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile study --limit 3
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile study
```

刪除 / 標記：

- Google Drive connector 可能只有讀取 scope，無法寫入 `狀態` 欄。
- 若要用 GAS 控制標記或刪除，可參考 `400_Knowledge/_pipeline/google_sheet_note_status.gs`。
- 若使用者選擇手動刪除，明確回報「已處理到第幾列」或「可刪除第 X 到第 Y 列」，提醒第 1 列標題不要刪。

Profile 判斷：

- 讀書、創意、商業、心理、方法論筆記走 `study`。
- 身體、生理、訓練、復健、動作類筆記走 `body`。

邊界：

- 不把 Google Sheet URL 或 row metadata 塞進正式 Markdown，除非使用者要求保留來源追蹤。
- 不在 connector 缺寫入 scope 時卡住流程；先完成 inbox 與 pipeline，再把可刪除列告知使用者。
- 刪除 Sheet row 是不可逆操作，通常只回報列範圍，讓使用者或 GAS 執行。

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

Notion 到 inbox 的作法：

1. 先 fetch `000_Agent/NOTION_SOURCE_MAP.md` 指定的 Notion 入口，確認 database / data source schema。
2. 優先用 Notion data source query 取得完整列；若 query 工具不可用或回報 tool not found，改用 database search。
3. 使用 search fallback 時，以來源書名、主題詞、近期時間與代表性關鍵詞分批搜尋，再用 Notion page id 去重。
4. 將候選卡片先轉成 `400_Knowledge/<profile>/00_inbox/*.md`，檔名保留卡片標題與 Notion id，內容至少包含卡片文字、出處與 Notion id。
5. 轉入後先跑 `--dry-run`，確認批次數量與 profile 正確，再正式處理。

範例：

```powershell
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile study --dry-run
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile study
```

處理完成後檢查：

```powershell
Get-ChildItem .\400_Knowledge\study\00_inbox -Filter *.md | Measure-Object
Get-ChildItem .\400_Knowledge\study\01_processed | Sort-Object LastWriteTime -Descending | Select-Object -First 20
Get-ChildItem .\400_Knowledge\study\03_archive | Sort-Object LastWriteTime -Descending | Select-Object -First 20
Get-Content .\400_Knowledge\study\logs\activity.log -Tail 80
```

邊界：

- 不整包搬 Notion 頁面。
- 不把未分類靈感直接當成長期真相。
- 正式跑 zettelkasten pipeline 前先 dry-run。

### Pipeline fallback

如果正式 pipeline 失敗，先看 `logs/activity.log`，不要重複盲跑。

常見處理：

- Windows PowerShell 若出現 `UnicodeEncodeError: cp950`，先加 `$env:PYTHONIOENCODING='utf-8'` 再跑。
- Gemini free-tier token/request quota 若在大批處理時爆掉，優先確認 pipeline 是否使用兩階段分類圖；不要退回完整分類圖。必要時先用 `--limit 3` 小批處理，再等 quota window 後跑剩餘批次。
- Gemini gRPC 若出現 `CERTIFICATE_VERIFY_FAILED` 或 SSL handshake failed，將 pipeline 的 `genai.configure(api_key=GOOGLE_API_KEY)` 改成 `genai.configure(api_key=GOOGLE_API_KEY, transport="rest")`，再用 `--limit 1 --no-archive` 測試。
- REST 仍遇到憑證問題時，設定 `REQUESTS_CA_BUNDLE` 與 `SSL_CERT_FILE` 指向 `certifi.where()` 後再測。
- 如果外部 AI API 仍不可用，允許改用既有 `config/classification_map.md` 規則式歸卡：選最貼近的既有父節點，呼叫 pipeline 內的 `finalize_note_processing` 或等價流程產生正式卡片、更新分類圖、補父卡 backlink、歸檔原始 inbox。

規則式歸卡只適合已經很明確的卡片；不確定父節點時，先保留在 `00_inbox` 或放入 `02_quarantine`，不要硬塞。

## 跨對話接續

新對話接續時先讀：

```powershell
Get-Content .\400_Knowledge\INTEGRATION_PLAN.md
git status --short
```

照計畫中的下一個 milestone 做；不要重開架構討論。
