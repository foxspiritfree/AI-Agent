# Knowledge Ingest Workflow

## 目標

把 Notion 匯出的靈感 / 筆記資料，經由 `400_Knowledge` 共用 pipeline 整理成卡片盒筆記，並檢查結果是否能放入 `D:\Feng` 知識庫。

## 使用時機

使用者說：

- 匯入 Notion 筆記
- 跑卡片盒
- 處理 study / body inbox
- 整理讀書心得
- 整理身體知識
- 放進知識庫

## 執行方式

本 workflow 只是快捷入口；正式 SOP 只維護在：

- `000_Agent/skills/zettelkasten/SKILL.md`

觸發此 workflow 時，先讀取並遵守 `zettelkasten` skill，再依使用者明確指令執行。
