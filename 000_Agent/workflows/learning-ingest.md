# Learning Ingest Workflow

## 目標

把 Notion「學習」與課程筆記中已整理、可複用的內容，分流到 `400_Knowledge/study` 卡片盒。

## Notion 來源

Notion URL / data source 以 `000_Agent/NOTION_SOURCE_MAP.md` 為 single source。

使用入口：

- 學習 / 線上課程管理模版

## 執行方式

本 workflow 是 playbook shortcut；正式 SOP 只維護在：

- `000_Agent/skills/zettelkasten/SKILL.md`

觸發此 workflow 時，先讀取並遵守 `zettelkasten` skill 的 `Learning Ingest` 段落。

常用口令：

```text
掃 Notion 學習入口，把可整理的筆記分流到 study，先列清單不要搬。
```

## 邊界摘要

- 不整包搬課程頁。
- 正式處理前先 dry-run。
- 身體、訓練、復健、動作類筆記走 `body` profile。
