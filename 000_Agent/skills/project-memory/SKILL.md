---
name: project-memory
description: 專案啟動引擎與全局記憶。Use this skill when starting a new project, continuing an existing one, or adding new features mid-project. Trigger when the user mentions memory-bank, PRD, tech stack, implementation plan, architecture, project handoff, or wants to bootstrap/start a new project.
---

# Project Memory Skill

## Goal

自動化專案啟動流程並維護持久的 AI 移交上下文 (durable AI handoff context)。
本技能涵蓋三個核心情境：**專案啟動 (Start a Project)**、**中途追加功能 (Add a Feature)**、**日常推進 (Continue a Project)**，並嚴格導入 Token 優化與三級任務分派機制。

## When to Use

- **Start a Project**：需要從零建置新專案、工具、自動化腳本時。
- **Add a Feature**：專案進行到一半，臨時有新想法或需大幅修改架構時。
- **Continue a Project**：接續開發，需讀取專案狀態與 `tasks/` 任務推進進度時。

## Folder Structure

建立或維護以下完整的大腦結構於專案根目錄：

```text
memory-bank/
├── PRD.md
├── implementation-plan.md
└── progress.md
architecture.md           # 專案架構、技術棧 (tech-stack)、資料流與核心藍圖
context_tips.md           # 代碼風格慣例與 Token 優化提醒 (例如：Git 煞車規則)
tasks/
├── backlog/              # 臨時想到的點子、未分類的任務草稿
├── simple/               # [改 1~3 檔] 已知做法、單點修改、低風險 (推薦 Codex/Flash)
├── feature/              # [改 3~10 檔] 完整新功能 (推薦 Codex/Sonnet)
└── architecture/         # [需理解系統] 架構、重構、跨模組 (推薦 Sonnet/Opus 產方案 -> Codex 執行)
```

## Scenario 1: Start a Project (專案啟動)

1. **需求訪談**：向使用者詢問 1~2 個關鍵問題，釐清技術棧偏好、核心功能邊界。
2. **藍圖勾勒**：草擬 `architecture.md` (架構與資料庫 Schema) 與 `context_tips.md`，讓使用者確認。
3. **實體建檔**：取得同意後，自動在根目錄建立上述的 `memory-bank/`, `tasks/` 三級目錄，以及對應的核心檔案。

## Scenario 2: Add a Feature (追加功能 / Top-Down 四步施工法)

當使用者提出新想法或需求時，嚴格禁止直接改寫代碼，應遵循四步法：
1. **衝擊分析 (Thinking)**：讀取 `architecture.md`，評估新需求會影響哪些核心邏輯與資料表，並**僅更新藍圖**。
2. **任務拆解與分類**：將新功能拆解成獨立子任務 (具備目標、輸入/輸出、DoD)。依據附圖規則判斷複雜度，直接將檔案產出至對應的 `tasks/simple/`, `tasks/feature/` 或 `tasks/architecture/`。
3. **漸進式施工**：依「底層結構 ➡️ 後端 API ➡️ 前端 UI」順序執行任務。
4. **全局驗收**：檢查關鍵進入點與 Integration Test，更新 `progress.md`。

## Scenario 3: Continue a Project (接續開發)

1. 閱讀 `memory-bank/` 內所有檔案。
2. 閱讀 `architecture.md` 與 `context_tips.md`。
3. 尋找 `tasks/` 中對應級別 (`simple`, `feature`, `architecture`) 正在進行的任務檔案。
4. **Git 煞車機制**：執行完**單一任務步驟**後，必須暫停並要求使用者進行 Git Commit 存檔。若後續遇到連續卡關 (3次以上)，主動建議使用者 `git reset --hard` 並微調 Prompt，切斷無效 Token 消耗。
5. 實作後更新 `memory-bank/progress.md`，若牽涉模組變更，同步更新 `architecture.md`。

## 任務分派判斷規則 (Task Routing Rules)

建立任務檔案至 `tasks/` 時，必須遵守以下判斷：
- **`tasks/simple/`**：只改 1~3 個檔案，且目標明確。適合交給輕量模型 (Flash / Codex)。
- **`tasks/feature/`**：需要完成一個使用者看得到的功能，可能動 3~10 個檔案。適合中大型模型 (Codex / Sonnet)。
- **`tasks/architecture/`**：需要先分析架構、資料流、權限、成本、重構、長期維護。必須先由大型推理模型 (Sonnet / Opus / Thinking) 產方案，再交由寫碼模型執行。

## Boundaries

- Do not turn memory-bank into a session transcript.
- Do not store secrets, credentials, API keys in any generated file.
- 確實執行 Git 煞車機制，切勿無休止地除錯盲猜。
