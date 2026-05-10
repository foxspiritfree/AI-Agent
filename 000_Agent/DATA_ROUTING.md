# DATA_ROUTING.md

本檔決定資料該放哪裡。AI、Claude、Gemini、Cursor 或使用者自己整理資料時，都先依這份規則判斷。

## 一句話原則

原始素材放 `200_Reference`，每日紀錄放 `300_Journal`，長期人格/決策/寫作聲音放 `400_Knowledge/self_brain`，AI 工具執行經驗放 `000_Agent/memory`，可重複操作方法放 `000_Agent/skills`。

## 決策表

| 你手上的內容 | 放置位置 | 理由 |
| --- | --- | --- |
| AI 工具偏好、踩坑、環境速查 | `000_Agent/memory/MEMORY.md` | 這是 AI 執行層會用到的操作記憶。 |
| 每日流水、工作復盤、session log | `300_Journal/YYYY-MM/YYYY-MM-DD.md` | 這是時間序列紀錄，不當長期真相來源。 |
| 使用者長期偏好、工作方式、禁忌、價值觀 | `400_Knowledge/self_brain/identity/` | 這是自我分身的穩定身份層。 |
| 重要選擇、取捨、方向定案 | `400_Knowledge/self_brain/decisions/` | 這是之後需要追溯的決策。 |
| 專案背景、進度、架構、待追蹤事項 | `400_Knowledge/self_brain/projects/` | 這是長期專案脈絡。 |
| 人物與關係脈絡 | `400_Knowledge/self_brain/people/` | 這是人物資料。 |
| 組織、公司、社群、團隊脈絡 | `400_Knowledge/self_brain/organizations/` | 這是組織資料。 |
| 可重複使用的觀念、模型、方法論 | `400_Knowledge/self_brain/concepts/` | 這是可跨情境引用的概念。 |
| 寫作聲音、內容定位、語氣分析 | `400_Knowledge/self_brain/writing_voice/` | 這是分析後的寫作人格。 |
| 貼文、文章、作品原始樣本 | `200_Reference/writing-samples/` | 這是原始素材，不是分析結論。 |
| 文章增補後的加工版、舊 articles / Published 工作區 | `200_Reference/imported/legacy-article-enrichment/` | 這是舊流程產物，保留供追溯，不當乾淨寫作樣本。 |
| 範本、固定格式、可套用樣板 | `200_Reference/templates/` | 這是被拿來複用的素材。 |
| 尚未分類的臨時討論、外部建議、待判斷素材 | `100_Todo/inbox/` | 這還不是正式規則、reference 或長期知識，先進 inbox 等待路由。 |
| 已判斷屬於 self_brain，但暫時無法歸類的長期個人脈絡 | `400_Knowledge/self_brain/inbox/` | 這已經是長期自我脈絡，只是還沒決定 identity、decisions、projects 等子層。 |
| 仍在寫、還沒定稿的草稿 | `100_Todo/drafts/` | 這是進行中資料。 |
| 可重複執行的任務 SOP | `000_Agent/skills/<skill>/SKILL.md` | 這是 AI 遇到某類任務時的正式方法。 |
| 固定 slash 指令或儀式入口 | `000_Agent/workflows/` | 這只是快捷入口，正式步驟要指回 skill。 |
| Notion 匯出、外部 skill、pro-kit、上游 mirror | `200_Reference/imported/` | 這是外部來源，不直接當成當前規則。 |
| study/body 卡片盒資料 | `400_Knowledge/study/` 或 `400_Knowledge/body/` | 這是知識庫 pipeline 的 profile 資料。 |
| 舊 `400_Knowledge/知識庫` 卡片盒鏡像 | `200_Reference/imported/legacy-knowledge-base/` | 這是歷史來源；正式卡片來源改用 `400_Knowledge/study` / `400_Knowledge/body`。 |

## 常見判斷

- 「幫我寫日記」：寫入 `300_Journal/YYYY-MM/YYYY-MM-DD.md`。
- 「記住我的偏好」：寫入 `400_Knowledge/self_brain/identity/`。
- 「這是我的貼文樣本」：原文放 `200_Reference/writing-samples/`。
- 「用卡片盒補強這篇文章」：由 `000_Agent/skills/article-enrichment/SKILL.md` 執行；加工版放 `200_Reference/imported/legacy-article-enrichment/` 或新草稿放 `100_Todo/drafts/`。
- 「分析我的寫作聲音」：分析結果放 `400_Knowledge/self_brain/writing_voice/`。
- 「這個專案之後要接續」：寫入 `400_Knowledge/self_brain/projects/`。
- 「這個工具以後不要這樣用」：寫入 `000_Agent/memory/MEMORY.md`。
- 「把這套流程做成 skill」：寫入 `000_Agent/skills/<skill>/SKILL.md`。
- 「做一個一鍵流程」：在 `000_Agent/workflows/` 建快捷入口，正式步驟仍放 skill。
- 「這份資料我還不知道該放哪」：先放 `100_Todo/inbox/`，等釐清後再路由。
- 「這是關於我的長期脈絡，但不知道放 self_brain 哪個子資料夾」：放 `400_Knowledge/self_brain/inbox/`，並標記待分類原因。

## 邊界規則

- `000_Agent/memory/daily/` 不再作為新 session log 入口；新日誌統一寫入 `300_Journal/`。
- `100_Todo/inbox/` 是暫存入口，不是長期保存位置；每輪整理後要採用、轉 reference 或歸檔。
- `400_Knowledge/self_brain/inbox/` 只放已確認屬於長期個人脈絡但暫時無法歸類的內容，不放一般 repo 臨時檔。
- `400_Knowledge/self_brain` 是長期真相來源；`300_Journal` 可以提供素材，但不要取代 self brain。
- `ak-threads-booster` 是 Threads 實戰 skill 包；tracker、brand voice、compiled memory 屬於任務狀態，不取代 `self_brain/writing_voice/`。
- `200_Reference/imported/` 只放外部導入原始素材；除非使用者明確要求，不當成當前執行規則。
- 舊 `400_Knowledge/知識庫` 不再作為正式寫入目標；文章創作使用 `article-enrichment` skill，卡片來源使用 `study/body` profile。
- workflow 不重複 SOP；workflow 只說何時用、指向哪個 skill。

## 驗證案例

2026-05-08 已用以下三個案例檢查路由：

| 使用者說法 | 預期路由 | 狀態 |
| --- | --- | --- |
| 幫我寫日記 | `300_Journal/YYYY-MM/YYYY-MM-DD.md`，由 `000_Agent/skills/journal/SKILL.md` 執行 | 通過 |
| 記住我的偏好 | `400_Knowledge/self_brain/identity/`，由 `000_Agent/skills/self-brain/SKILL.md` 與 `RESOLVER.md` 執行 | 通過 |
| 這是我的貼文樣本 | 原文放 `200_Reference/writing-samples/`；分析結果才進 `400_Knowledge/self_brain/writing_voice/` | 通過 |
