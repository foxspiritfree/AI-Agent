---
name: ai-agent-collaboration
description: 客製化 AI Agent 協作設定、把外部 AI 方法論轉成本專案可執行規則、調整 CORE_RULES / skills / workflows / memory 分工時使用。觸發情境包含：討論 AI 工作方式、建立或調整代理協作流程、把 Notion 或文章原則內化成本機規則、檢查 AI 設定是否過度複雜或互相衝突。
---

# AI Agent Collaboration

## Overview

把通用 AI Agent 原則改寫成使用者自己的工作系統。先討論、再落地；不要直接照抄來源文章。

## 核心原則

- 來源文章只當參考，不自動升級成執行規則。
- 每條設定都要能回答：放哪裡、何時觸發、怎麼驗證。
- 預設給一個推薦；已判斷完 trade-off 就直接選。
- 小事不流程化，大事才制度化。
- 同一規則只維護一份，避免 `CORE_RULES.md`、skill、workflow 互相複製。

## 討論流程

1. 先抓來源原則：摘要成可採用的行為規則與可重複流程。
2. 逐條推薦：每次給一個設定與一行理由。
3. 使用者說「很好 / 沒錯 / OK」時視為同意，繼續下一項。
4. 使用者說「改一下」時，只調整當前設定。
5. 使用者說「落地 / 開始改」時，才修改檔案。

## 落地位置

- `000_Agent/CORE_RULES.md`：跨工具長期偏好、互動模式、安全規則、任務分級。
- `000_Agent/skills/<skill>/SKILL.md`：可重複執行的完整 SOP。
- `000_Agent/workflows/*.md`：手動呼叫的快捷入口，只指向 skill，不重複完整步驟。
- `000_Agent/memory/MEMORY.md`：踩坑、環境差異、已驗證決策。
- `300_Journal/YYYY-MM/YYYY-MM-DD.md`：每日流水、session log、工作復盤。
- `400_Knowledge/self_brain/`：使用者長期偏好、決策、人物與專案脈絡。
- Notion / `200_Reference/imported/`：外部來源與未正式採用素材。

## 任務分級

- 小任務：直接做，不寫 plan；完成後回「改了什麼 + 驗證指令」。
- 中任務：先列 3-5 步短 plan；完成後回「影響檔案 + 測試結果」。
- 大任務：先產出 `plan.md` 或等價計畫，再實作、review、report。
- 大任務包含：改 3 個以上檔案、牽涉資料庫/權限/部署、跨 session 接續、多 Agent / worktree。

## 多 Agent 規則

- 預設不用多 Agent。
- 只在大型開發、資料整理、研究比對、code review 時啟用。
- 每個 Agent 必須有明確任務、輸入、輸出、檔案邊界。
- 不同 Agent 不要改同一批檔案；主 Agent 負責整合與最後判斷。

## Review / Report

- 小任務：不用報告文件。
- 中任務：列影響檔案與驗證結果。
- 大任務：輸出 `report.md`，包含目標、完成項、未完成項、驗證結果、Git diff 摘要。
- Code review 一律先列問題，不先稱讚、不先總結。

## 長對話管理

- 對話變長時，主動整理「目前決策、待辦、檔案變更」。
- 跨 session 任務落地到 `plan.md` 或 `memory-bank/`。
- 只在大型任務啟用，不干擾日常問答。

## 更新檢查

- 檢查規則是否過長、重複、互相衝突。
- 檢查外部來源是否已被誤當成最高優先規則。
- 檢查 workflow 是否只做入口，沒有複製 skill 內容。
- 若 AI 變囉嗦，優先改 `CORE_RULES.md`；若某類任務做不好，再改對應 skill。
