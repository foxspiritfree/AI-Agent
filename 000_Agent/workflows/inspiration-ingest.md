# Inspiration Ingest Workflow

## 目標

把 Notion「靈感蒐集」中的靈感、筆記、可參考工具，整理成可進入卡片盒或寫作流程的素材。

## Notion 來源

Notion URL / data source 以 `000_Agent/NOTION_SOURCE_MAP.md` 為 single source。

使用入口：

- 靈感蒐集
- 靈感列表

## 執行方式

本 workflow 是 playbook shortcut；正式 SOP 只維護在：

- `000_Agent/skills/zettelkasten/SKILL.md`
- 必要時接續 `000_Agent/skills/article-enrichment/SKILL.md`

觸發此 workflow 時，先讀取並遵守 `zettelkasten` skill 的 `Inspiration Ingest` 段落。

常用口令：

```text
掃 Notion 靈感蒐集，把可整理的素材分流到 study/body/文章素材，先列清單不要搬。
```

## 邊界摘要

- 不整包搬 Notion 頁面。
- 不把未分類靈感直接當成長期真相。
- 正式跑 zettelkasten pipeline 前先 dry-run。
