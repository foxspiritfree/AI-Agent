# Self Brain

這裡放跨 AI 共用的自我分身知識層。

它不是 gbrain runtime，也不需要 PGLite、Postgres 或 MCP。這裡只吸收 gbrain 適合本專案的結構原則：

- resolver-first：先判斷知識應該放哪裡。
- one primary home：一個知識點只放一個主要位置。
- compiled truth + timeline：上半部保留目前理解，下半部保留證據軌跡。
- correction-first：使用者修正 AI 時，優先更新。
- source-aware：重要判斷要保留來源與日期。

## 核心檔案

- `RESOLVER.md`：決定內容放哪裡。
- `schema.md`：頁面格式與寫入規則。

## 目錄

- `identity`：使用者偏好、原則、價值觀、工作方式。
- `decisions`：重要決策與取捨。
- `projects`：專案背景、進度、上下文。
- `people`：人物與關係脈絡。
- `organizations`：公司、社群、團隊、機構。
- `concepts`：可重複使用的觀念、模型、方法論。
- `writing_voice`：寫作聲音、內容定位、語氣樣本。
- `sources`：原始資料、匯入紀錄、來源摘要。
- `inbox`：暫時無法歸類但值得保留的內容。

## Agent 入口

- Skill：`000_Agent/skills/self-brain/SKILL.md`
- Workflow：`000_Agent/workflows/self-brain-capture.md`
