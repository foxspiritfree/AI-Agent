# Current System Map

## 系統總覽

`AI-Agent` 是跨 AI 工具共用的本地工作助理設定庫。

目前可以分成五層：

| 層級 | 路徑 | 責任 |
| --- | --- | --- |
| Agent Core | `000_Agent/` | AI 工具規則、skills、workflows、執行記憶 |
| Todo | `100_Todo/` | 進行中的草稿、專案與待處理事項 |
| Reference | `200_Reference/` | 原始素材、外部導入、寫作樣本、模板 |
| Journal | `300_Journal/` | 每日紀錄、session log、工作復盤 |
| Knowledge | `400_Knowledge/` | 卡片盒、自我分身知識層、長期脈絡 |

## 入口規則

| 檔案 | 狀態 | 責任 |
| --- | --- | --- |
| `AGENTS.md` | active | Codex / OpenAI Agents 入口，指向 `AI_README.md`、核心規則與索引 |
| `AI_README.md` | active | AI 30 秒快速入口，提供 workspace map 與 context routing |
| `README.md` | active | repo 首頁與人類入口，指向正式核心文件，不重複完整路由規則 |
| `CLAUDE.md` | active | Claude Code 入口 shim，指向 `AI_README.md`、核心規則與索引 |
| `GEMINI.md` | active | Gemini 入口 shim，指向 `AI_README.md`、核心規則與索引 |
| `.cursorrules` | active | Cursor 入口 shim，指向 `AI_README.md`、核心規則與索引 |
| `000_Agent/CORE_RULES.md` | active | 跨工具長期規則的單一真相來源 |
| `000_Agent/DATA_ROUTING.md` | active | 資料放置決策表 |
| `000_Agent/skills/INDEX.md` | active | skill 路由索引 |
| `000_Agent/skills/CAPABILITY_MAP.md` | active | skill 能力導向命名策略 |

## Agent Core

### Rules

| 檔案 | 狀態 | 說明 |
| --- | --- | --- |
| `000_Agent/CORE_RULES.md` | active | 互動偏好、任務分級、安全、Git、專案規則 |
| `000_Agent/DATA_ROUTING.md` | active | 決定資料寫入位置 |
| `000_Agent/NOTION_SOURCE_MAP.md` | needs review | Notion 來源對應，尚未納入本輪檢查 |

### Memory

| 路徑 | 狀態 | 說明 |
| --- | --- | --- |
| `000_Agent/memory/MEMORY.md` | active | AI 執行層偏好、踩坑、環境速查 |
| `000_Agent/memory/daily/` | legacy | 新 session log 應改寫到 `300_Journal/` |
| `000_Agent/memory/decisions/` | needs review | 需確認是否與 `self_brain/decisions` 重疊 |
| `000_Agent/memory/feedback/` | needs review | 需確認是否仍作為 AI 執行 feedback 入口 |

### Temporary Inbox

| 路徑 | 狀態 | 說明 |
| --- | --- | --- |
| `100_Todo/inbox/` | active | 尚未分類的臨時討論、外部建議、待判斷素材 |

## Skills

| Skill | 狀態 | 責任 |
| --- | --- | --- |
| `ai-agent-collaboration` | active | 調整 AI 協作規則、skills、workflows、memory 分工 |
| `ak-threads-booster` | active | Threads 選題、起草、分析、預測、復盤 |
| `article-enrichment` | active | 用卡片盒補強文章 |
| `finance-admin-review` | active | 帳務行政待辦檢查與任務化，不做投資/稅務/法律建議 |
| `fullstack` | active | JS/TS、Firebase、GCP、API、前後端實作 |
| `gas` | active | Google Apps Script 協作與除錯 |
| `journal` | active | 日記、工作復盤、session log |
| `notion-task-triage` | active | Notion 今日任務整理 |
| `open-threads-to-notion` | active | 本機 open threads 打包到 Notion |
| `pm` | active | 產品規劃、需求拆解、PRD |
| `project-memory` | active | app / 技術專案 memory-bank |
| `project-todo-capture` | active | 掃描本機專案待辦 |
| `self-brain` | active | 長期偏好、決策、人物、專案脈絡沉澱 |
| `skill-creator` | active | 建立或改善 skills |
| `soc` | active | SOC / SecOps 事件分流、交接、稽核；能力名稱為 `incident-triage` |
| `superpowers` | active | 軟體開發方法論與工作流 |
| `uiux` | active | UI/UX 檢查與建議 |
| `zettelkasten` | active | study/body 卡片盒 pipeline |

## Workflows

`workflows` 短期保留資料夾名稱；語意上視為 playbook shortcut，不作為完整 SOP 的主要維護位置。

| Workflow | 狀態 | 指向 |
| --- | --- | --- |
| `today.md` | active | `notion-task-triage` |
| `journal.md` | active | `journal` |
| `self-brain-capture.md` | active | `self-brain` |
| `project-memory.md` | active | `project-memory` |
| `project-todo-capture.md` | active | `project-todo-capture` |
| `open-threads-to-notion.md` | active | `open-threads-to-notion` |
| `knowledge-ingest.md` | active | `zettelkasten` |
| `learning-ingest.md` | active | `zettelkasten` 或知識匯入流程 |
| `inspiration-ingest.md` | active | 靈感分流到 study/body 或文章素材 |
| `article-enrichment.md` | active | `article-enrichment` |
| `gas-debug.md` | active | `gas` |
| `code-review.md` | active | `superpowers` code review |
| `finance-review.md` | active | `finance-admin-review` |
| `agent-setup-review.md` | active | `ai-agent-collaboration` |

## Knowledge

| 路徑 | 狀態 | 責任 |
| --- | --- | --- |
| `400_Knowledge/self_brain/` | active | 長期自我分身知識層 |
| `400_Knowledge/study/` | active | 讀書、商業、心理、學習、觀念卡片 |
| `400_Knowledge/body/` | active | 身體、生理、動作、訓練、復健卡片 |
| `400_Knowledge/profiles/` | active | study/body pipeline profiles |
| `400_Knowledge/_pipeline/` | active | 共用 Zettelkasten pipeline |
| `400_Knowledge/知識庫/` | legacy | 舊卡片盒，不應作為新寫入入口 |
| `400_Knowledge/_backup/` | needs review | 備份用途需確認 |
| `400_Knowledge/_reports/` | needs review | 報告用途需確認 |

## Reference

| 路徑 | 狀態 | 責任 |
| --- | --- | --- |
| `200_Reference/imported/` | reference | 外部導入素材，不直接當正式規則 |
| `200_Reference/imported/superpowers/` | upstream mirror | Superpowers 上游參考 |
| `200_Reference/imported/legacy-article-enrichment/` | legacy | 舊文章增補產物 |
| `200_Reference/imported/legacy-knowledge-base/` | legacy | 舊知識庫保存 |
| `200_Reference/writing-samples/` | active | 寫作原始樣本 |
| `200_Reference/templates/` | active | 可複用模板 |
| `200_Reference/past-work/` | needs review | 過往工作資料，需確認路由 |

## 目前主要重疊點

1. `000_Agent/memory/decisions` 可能與 `400_Knowledge/self_brain/decisions` 重疊。
2. `000_Agent/memory/daily` 已被規則標成不再作為新 session log 入口。
3. `workflows` 與 `skills` 要持續檢查，避免 workflow 複製完整 SOP。
4. `200_Reference/imported` 與正式 skills 的邊界要保持清楚。
5. `400_Knowledge/知識庫` 與 `study/body` 的新舊入口要避免混用。
6. `100_Todo/inbox` 與 `400_Knowledge/self_brain/inbox` 都叫 inbox，但前者是 repo 臨時素材，後者是 self_brain 長期脈絡待分類。
7. Notion URL / data source 應以 `000_Agent/NOTION_SOURCE_MAP.md` 為 single source，workflow 不應重複維護。

詳細盤點見：

- `100_Todo/projects/m1-boundary-audit.md`
- `100_Todo/projects/m3-skills-workflows-inventory.md`
- `100_Todo/projects/m4-self-brain-compiled-truth.md`
- `100_Todo/projects/m5-daily-loop-validation.md`

## 推薦整理順序

1. 先檢查 `000_Agent`，因為它決定 AI 怎麼執行。
2. 再檢查 `400_Knowledge/self_brain`，因為它決定長期脈絡。
3. 再檢查 workflows，確認每日使用入口。
4. 最後再處理 imported / legacy，避免一開始陷入大量素材整理。
