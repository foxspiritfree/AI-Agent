# Project Todo Capture Workflow

## 目標

把本機 `AI-Agent` 專案裡的待辦、待釐清、待整合、未來工作，打包成 Notion「待安排項目」，讓使用者之後自行排程。

## 執行方式

本 workflow 是 playbook shortcut；正式流程只維護在：

- `000_Agent/skills/project-todo-capture/SKILL.md`

Notion URL / data source 以 `000_Agent/NOTION_SOURCE_MAP.md` 為 single source。

常用口令：

```text
掃專案待辦，打包成 Notion 待安排項目。
```

指定範圍：

```text
掃 400_Knowledge/self_brain 的待辦，先列候選清單。
```

觸發此 workflow 時，先讀取並遵守 `project-todo-capture` skill。
