# Future Improvements

這份文件記錄 `400_Knowledge` 卡片盒流程未來可以補強的方向。現在先不做，避免一次把工程變太大。

## 1. Notion 自動抓取

目前狀態：

- 需要手動從 Notion 匯出 Markdown。
- 再把 `.md` 放到 `study/00_inbox` 或 `body/00_inbox`。
- workflow 從本機 inbox 開始處理。

未來補強：

- 使用 Notion API 直接讀指定 database。
- 依資料庫欄位自動判斷 profile，例如 `study` 或 `body`。
- 把 Notion page 轉成 Markdown 後放入對應 inbox。
- 處理完成後回寫 Notion 狀態，例如 `processed`、`archived`、`error`。

需要新增的設定可能包含：

```yaml
notion_database_name: 靈感收集
notion_database_url: ...
notion_filter: 類型 = study
notion_status_field: Status
```

## 2. Notion 來源追蹤

目前狀態：

- pipeline 只知道本機檔案。
- 不知道筆記原本來自 Notion 的哪個 database、page 或欄位。

未來補強：

- 在產生卡片時保留 Notion page id。
- 在卡片 frontmatter 或文末加入來源資訊。
- 讓錯誤排查可以追回原始 Notion 頁面。

可能輸出格式：

```markdown
---
source: notion
notion_page_id: ...
notion_database: 靈感收集
profile: study
---
```

## 3. 自動選 profile

目前狀態：

- 使用者或 AI 依內容選 `study` / `body`。

未來補強：

- 依 Notion 欄位選 profile。
- 依匯出檔名或資料夾選 profile。
- 依內容自動分類，但需要先 dry-run 顯示判斷結果。

推薦順序：

1. Notion 欄位
2. 檔名 / 資料夾規則
3. AI 內容判斷

## 4. 匯入狀態報告

目前狀態：

- 主要靠 terminal output 與 `logs/activity.log` 檢查。

未來補強：

- 每次執行產生一份 Markdown 報告。
- 記錄處理數量、新增卡片、quarantine、錯誤、分類圖變更。

可能路徑：

```text
400_Knowledge/reports/YYYY-MM-DD_HH-mm_<profile>.md
```

## 5. quarantine 處理 workflow

目前狀態：

- quarantine 只是資料夾。
- 還沒有專門流程協助修復。

未來補強：

- 建立 quarantine review workflow。
- 列出失敗原因。
- 提供重新處理指令。
- 成功後移回 inbox 或直接進 processed。

## 6. 知識庫搬移自動化

目前狀態：

- 最後要放入 `D:\Feng`，但 workflow 只要求先列來源、目標、數量。

未來補強：

- profile 設定目標資料夾。
- pipeline 或 workflow 產生待搬移清單。
- 支援安全搬移或複製。
- 搬移前先 dry-run。

安全原則：

- 不直接大量搬移。
- 不覆蓋同名檔案。
- 搬移前列出來源與目標。

## 7. 舊腳本 wrapper 化

目前狀態：

- `study/process_notesv3try.py` 與 `body/process_notesv3try.py` 已標記 deprecated。
- 仍保留備援，不改行為。

未來補強：

- 改成 wrapper，呼叫共用 pipeline。
- 使用舊入口時顯示提醒，然後轉到新入口。

建議等共用 pipeline 實際跑過幾次後再做。
