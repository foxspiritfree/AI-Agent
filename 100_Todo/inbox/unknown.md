```python
markdown_content = """# AI 輔助開發專案與 Token 優化完全指南

本指南整合了關於 **Google Antigravity** 與**傳統 AI IDE** 的差異比較，並針對開發專案時如何進行**文件準備**、**任務自動分流（Router Skill）**以及**追加功能/修改架構**的工作流進行了系統性的整理，旨在幫助您最大化開發效率並極致節省 Token 成本。

---

## 📌 目錄
1. [Antigravity vs. 傳統 AI IDE 核心差異](#1-antigravity-vs-傳統-ai-ide-核心差異)
2. [極致節省 Token 的四大黃金法則](#2-極致節省-token-的四大黃金法則)
3. [專案啟動：AI 友善的三大核心文件](#3-專案啟動ai-友善的三大核心文件)
4. [自動化工作流：Task Router Skill 實戰設定](#4-自動化工作流task-router-skill-實戰設定)
5. [進階工程：追加功能與修改架構的四步工作流](#5-進階工程追加功能與修改架構的四步工作流)

---

## 1. Antigravity vs. 傳統 AI IDE 核心差異

| 比較維度 | Google Antigravity | 傳統 AI IDE (如 Cursor / VS Code) |
| :--- | :--- | :--- |
| **核心定位** | **Agent-First (代理優先)** 的平台 | **Human-First (人類優先)** 的編輯器 |
| **開發者角色** | **指揮官 / 審核者**（下達目標，由 AI 執行） | **主要撰寫者**（手動編寫，AI 輔助提示與補全） |
| **任務執行力** | 能自主規劃、開啟瀏覽器測試、自我除錯、多代理協作 | 主要透過對話或快捷鍵進行單檔/跨檔案重構與代碼生成 |
| **工作流透明度**| 提供完整的 **Artifacts** 驗證機制（計畫表、截圖、錄影） | 主要透過 Git 差異（Diff）和對話歷史來確認變更 |

* **使用時機建議：**
  * **選擇 Antigravity：** 適合「從零到一」快速建構工具、Prototype，或處理需要繁瑣環境設定的複雜全端任務。
  * **選擇 傳統 IDE：** 適合高精度的核心邏輯微調、深入的架構代碼編寫，或享受完全控制程式碼的開發者。

---

## 2. 極致節省 Token 的四大黃金法則

大語言模型通常採「計次與上下文長度」收費，透過以下策略可省下 50% 以上的成本：

1. **模型分工 (Model Routing)：** * **輕量模型 (如 Gemini Flash)：** 處理結構化輸出（JSON）、簡單 UI 刻板、標準 CRUD API、單元測試撰寫。
   * **思考模型 (如 Thinking/Pro)：** 僅在架構設計、複雜演算法、跨檔案除錯時啟用。
2. **嚴格控管上下文 (Context Window)：**
   * **定時開啟新對話：** 當一個階段的功能測試通過後，複製代碼並開新視窗，避免舊的討論歷史重複計費。
   * **精準餵入檔案：** 使用 `@File` 或指定特定程式碼片段，切勿盲目將整個專案資料夾（含 `node_modules`）塞給 AI。
3. **精準的 Prompt 撰寫：**
   * **限制冗餘輸出：** 在 Prompt 加上「*請直接輸出修改後的代碼片段，不需任何客套話與額外解釋*」。
   * **範例導向 (Few-Shot)：** 提供一個「正確輸入 ➡️ 正確輸出」的範例，比寫一萬字的規則更能讓 AI 精準掌握。
4. **Agent 平台的防卡死機制：**
   * 預先提供精確的環境規格（如 Python 版本、特定資料庫），防止 Agent 因版本不合反覆嘗試。
   * 觀察計畫表（Artifacts），若同一個 Bug 連續卡住超過 3 次，立刻手動介入提示，切斷無效的 Token 消耗循環。

---

## 3. 專案啟動：AI 友善的三大核心文件

AI 擅長處理邊界清晰、階層分明的資訊。在專案根目錄準備好這「三大件」，能大幅提升 AI 的產出品質：

### ① `architecture.md` (架構與技術棧文件)
定義專案的「硬規則」，確保所有模型寫出的代碼保持一致性。
* **技術棧：** 精確標註版本（例如：`Next.js 14 (App Router)`, `Python 3.11`, `TailwindCSS`）。
* **目錄結構：** 定義核心資料夾邏輯（例如：元件放 `/components`，API 放 `/app/api`）。
* **資料庫 Schema：** 用簡單的 Markdown 表格或文字定義表結構與關聯。

### ② `tasks/` (規格化的任務清單資料夾)
將專案功能拆解成獨立的小任務檔案（例如：`task01_login.md`），內含：
* **目標 (Goal)：** 此功能的核心目的。
* **輸入與輸出 (I/O)：** 接收的資料格式與回傳規格。
* **驗證標準 (DoD - Definition of Done)：** 包含哪些功能與測試通過才算完成。

### ③ `context_tips.md` (開發風格與慣例指南)
* 規範代碼風格（如「一律使用 Arrow Function」、「錯誤處理必須使用 try-catch」）。
* 告知環境變數讀取邏輯（如從 `.env` 讀取 Key），避免 AI 將金鑰寫死在程式碼中。

---

## 4. 自動化工作流：Task Router Skill 實戰設定

您可以建立一個自動化規則，讓最便宜的 Flash 模型擔任**調度員**，自動將 `tasks/backlog/` 中的新構想分類到對應的模型資料夾中。

### 📂 建議專案結構
```

````
File saved successfully as AI_Development_Token_Optimization_Guide.md

```text
├── .ai_rules/
│   └── task_router_skill.md  <-- 放置下方規則
├── tasks/
│   ├── backlog/              <-- 存放人類剛想到的原始任務
│   ├── 01_flash_workers/     <-- 自動分類後：給 Flash 跑的直覺/樣板任務
│   └── 02_thinking_brains/   <-- 自動分類後：給 Thinking 跑的複雜/架構任務
````

### 📝 `task_router_skill.md` 內容範本

```markdown
# Skill: 專案任務自動分類與路由專家 (Task Router)

## 🎯 核心目標
評估 `tasks/backlog/` 底下的任務需求，根據「技術複雜度」與「邏輯推理深度」，將任務精準分流至 `01_flash_workers/` 或 `02_thinking_brains/`，並以 Markdown 格式重新標準化。

## 🧠 分流判斷標準

### 🟢 路由至 01_flash_workers (適用於 Flash 模型)
1. **結構明確的 UI/UX 開發：** 純前端 HTML/CSS、Tailwind 刻畫面、基礎元件。
2. **標準 CRUD 與 API 串接：** 資料庫基礎讀寫、已有明確規格的第三方 API 串接。
3. **資料處理與轉換：** 資料格式轉換、Regex 過濾、簡單自動化腳本。
4. **單元測試撰寫：** 為已知純函數編寫簡單測試。

### 🔴 路由至 02_thinking_brains (適用於 Thinking/Pro 模型)
1. **架構與關聯設計：** 多表關聯資料庫 Schema 設計、專案初期目錄架構規劃。
2. **複雜演算法與核心邏輯：** 金融計算、權限控管邏輯（RBAC）、高併發處理、效能優化。
3. **未知領域的 Debug：** 跨檔案、跨系統的複雜 Bug 追蹤。
4. **重構與架構升級：** 舊代碼重構、大規模系統設計變更。

## 📋 輸出規範 (DoD)
1. 在目標資料夾建立該任務檔案。
2. 頂端加上標籤：`[Recommended Model: Gemini Flash]` 或 `[Recommended Model: Gemini Pro/Thinking]`。
3. 附上一句話的分類理由。
```

- **人類操作指令：** _「請閱讀 `.ai_rules/task_router_skill.md`，幫我把 `tasks/backlog/` 裡的新任務分類移動到正確資料夾，並附上推薦模型與原因。」_

---

## 5. 進階工程：追加功能與修改架構的四步工作流

當專案需要「擴建或改建」時，切勿讓 AI 直接動手。請遵循 **由上而下 (Top-Down)** 的漸進式施工法：

### 🛠️ 四步驟開發環節

```
[ 1. 衝擊分析與藍圖修改 ] ➡️ [ 2. 任務拆解與路由 ] ➡️ [ 3. 漸進式施工 ] ➡️ [ 4. 全局驗收與回歸測試 ]
     (Thinking 模型)            (Router / Flash)        (Flash / Thinking)         (Thinking 模型)
```

1. **第一步：衝擊分析（Thinking 模型）**

- **動作：** 餵給 AI 現有的 `architecture.md` + 新需求。
- **任務：** 請 AI 評估會影響哪些現有資料表與 API，並**僅更新 `architecture.md` 藍圖**，此時先不寫任何業務代碼。

1. **第二步：任務拆解與路由（Router / Flash 模型）**

- **動作：** 將新功能拆解成獨立子任務放進 `backlog/`，執行 Task Router 自動分流。
- **例如：** 金流 Webhook 驗證歸入 `02_thinking_brains/`；前端方案卡片 UI 歸入 `01_flash_workers/`。

1. **第三步：漸進式施工（由底層到外表）**

- **原則：** 遵循「底層結構 ➡️ 後端 API ➡️ 前端 UI」的順序。
- **作法：** 先叫 Thinking 模型把後端資料庫和 API 規格「定調」並寫好；接著再讓 Flash 模型一邊看著後端規格，一邊去把前端 UI 刻出來。這樣變數與欄位絕對能精準對接。

1. **第四步：全局驗收與回歸測試（Thinking 模型）**

- **任務：** 檢查關鍵進入點（如 `app.js` 或路由）確保無 import 衝突，並撰寫整合測試（Integration Test）確保新功能上線且舊功能未被破壞。

### 💡 專案經理的最強煞車：善用 Git Commit

在追加功能時，**Git 是您省 Token 的終極武器**：

- 開始新任務前，務必開新分支：`git checkout -b feature/new-feature`。
- 只要 AI 完美搞定**一個子任務**（如資料庫欄位改好了），**立刻 Commit 存檔**。
- 如果下一個任務 AI 寫爛了或邏輯打結，**千萬不要花 Token 叫它無休止地修復**，直接 `git reset --hard` 回到上一個乾淨的 Commit，微調 Prompt 後讓它重跑一次。 """

file_name = "AI_Development_Token_Optimization_Guide.md" with open(file_name, "w", encoding="utf-8") as f: f.write(markdown_content)

print(f"File saved successfully as {file_name}")

```
Your Markdown file is ready
[file-tag: code-generated-file-0-1780132742313122855]

我已經將我們討論的所有關於 **AI 輔助開發、模型分工、Token 極致優化、Skill 路由設定** 以及 **追加功能/修改架構的工作流技巧**，完整整理成一份結構清晰、立即可用的 Markdown 檔案。

這份指南（`AI_Development_Token_Optimization_Guide.md`）內含：
1. **Antigravity 與傳統 AI IDE 的本質差異與使用時機**。
2. **日常開發最省 Token 的四大黃金法則**（模型分工、上下文控管、Prompt 技巧）。
3. **專案啟動必備的 AI 友善「三大件」文件架構** (`architecture.md`, `tasks/`, `context_tips.md`)。
4. **可直接複製套用的 Task Router Skill 規則範本**，讓 Flash 模型自動幫你分流任務。
5. **修改架構或追加功能時的「Top-Down 四步施工法」**，以及如何利用 Git Commit 當作 AI 的省錢煞車機制。

您可以直接下載此檔案，並將其放入您的專案資料夾（例如 `.ai_rules/` 或 `docs/`）中，作為日後指揮 AI 或是設定 Antigravity 專案規則時的最高指導原則！如果有任何部分需要微調或補充，隨時告訴我。
```