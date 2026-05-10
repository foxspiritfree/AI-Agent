# Notion Source Map

本檔記錄 Notion 常用入口和本機 AI-Agent 功能的對應關係。它是入口地圖，不保存 Notion 內容本體。

## 常用入口

| Notion 入口 | Notion URL | 本機對應 | 狀態 |
| --- | --- | --- | --- |
| 今日可做事項 | https://www.notion.so/2ace550a746f80c0a43bc46ea39fd06e | `000_Agent/workflows/today.md` / `000_Agent/skills/notion-task-triage/SKILL.md` | 已整合 |
| 目標儀表板 | https://www.notion.so/24e073704fa44cdf96d68c4c4ea94e0c | Notion 中樞索引；本機只記入口，不搬內容 | 已標定 |
| 學習 | https://www.notion.so/26be550a746f8027b8b0d31249f61488 | `000_Agent/workflows/learning-ingest.md` / `zettelkasten` 的 `study` profile | 已整合入口 |
| 靈感蒐集 | https://www.notion.so/ef65f5ec485c4039bbe27399268117d3 | `000_Agent/workflows/inspiration-ingest.md` / `zettelkasten` / `article-enrichment` | 已整合 |
| 靈感列表 | https://www.notion.so/a5d4acdb7f3e47419e6e627022f67221 | `000_Agent/workflows/inspiration-ingest.md` / `zettelkasten` / `article-enrichment` | 已整合入口 |
| 任務蒐集 | https://www.notion.so/c74b1c03cc9c4702af55ea07faa2a63b | `000_Agent/skills/notion-task-triage/SKILL.md` | 已整合 |
| 專案 | https://www.notion.so/8f3d4b399ce94e09a7a694286392242a | `000_Agent/skills/project-memory/SKILL.md` | 已整合 |
| 帳務管理 | https://www.notion.so/264e550a746f80f897c4f51edb50dc70 | `000_Agent/workflows/finance-review.md` / `000_Agent/skills/finance-admin-review/SKILL.md` | 已整合入口 |

## Notion 資料庫

| 資料庫 | Data source | 用途 |
| --- | --- | --- |
| 任務 | `collection://96789b11-256c-4401-a57b-4355fdf0e616` | 今日可做事項、任務蒐集、待安排項目、反向寫入任務 |
| 專案 | `collection://b41cd77e-8da6-4e7f-9318-1e61c5a0f3e7` | 專案與任務關聯，技術專案可接 `memory-bank` |
| 帳務概況 | `collection://34ce550a-746f-80df-814d-000b82f8a2a7` | 帳務檢查來源，只做摘要與待辦，不搬金額 |
| 帳戶與卡片 | `collection://34ce550a-746f-80d2-b5ff-000bd6182f07` | 帳務檢查來源，只做處置提醒，不搬敏感欄位 |

## 反向寫入規則

- 寫入待安排項目時，目標是任務 data source。
- 設定 `Done = false`，不設定 `截止日`。
- 預設 `急迫性 = anytime`。
- 不寫入 secrets、credential、帳號細節、金額明細。
- 超過 10 筆候選項目時，先列預覽清單再寫入。
- 本機專案待辦打包流程使用 `000_Agent/skills/project-todo-capture/SKILL.md`。
