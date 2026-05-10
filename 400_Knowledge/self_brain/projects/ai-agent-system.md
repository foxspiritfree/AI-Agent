# AI Agent System

## Summary

`AI-Agent` 是使用者跨 AI 共用的本地工作助理設定庫，負責集中管理核心規則、skills、workflows、記憶、日記、參考素材與知識庫入口。2026-05-08 已完成 M0 到 M5 第一輪：總控文件、架構校準、系統邊界、正式入口收斂、skills / workflows 分級、Self Brain 第一輪整理與日常閉環驗證；後續只剩專項整理。

## Current Understanding

- 專案根目錄是 `C:\Users\join6\AI-Agent`。
- 跨工具主規則以 `000_Agent/CORE_RULES.md` 為準，`AGENTS.md`、`CLAUDE.md`、`GEMINI.md`、`.cursorrules` 只作入口或工具專屬補充。
- `000_Agent/DATA_ROUTING.md` 是資料放置的決策入口。
- `000_Agent/memory/MEMORY.md` 只放 AI 執行層記憶，例如工具踩坑、Feedback、環境速查。
- `300_Journal/` 是每日流水、工作復盤與 session log 的主入口。
- `400_Knowledge/self_brain/` 是長期自我分身知識層，包含偏好、決策、人物、專案脈絡與寫作聲音。
- `200_Reference/writing-samples/` 保存原始寫作樣本；分析後的寫作聲音放入 `400_Knowledge/self_brain/writing_voice/`。
- `000_Agent/skills/` 放正式 SOP；`000_Agent/workflows/` 只放快捷入口，不重複完整步驟。
- `200_Reference/imported/` 放外部導入但未正式採用的素材，不當成當前執行規則。
- 目前 active project plan 是 `100_Todo/projects/ai-agent-system-rebuild-plan.md`。
- `AI_README.md` 是 AI 30 秒快速入口；root `README.md` 是 repo 首頁與人類入口。
- `100_Todo/projects/current-system-map.md` 是目前系統地圖。
- `100_Todo/projects/m1-boundary-audit.md` 記錄 rules / skills / workflows / knowledge 的責任邊界。
- `100_Todo/projects/m3-skills-workflows-inventory.md` 是 skills / workflows 分級盤點。
- M3 盤點結論：18 個 skill / package 都可使用；`ak-threads-booster` 與 `superpowers` 是 active package；14 個 active workflow 都能指回正式 skill 或 package；`soc-shift-handover.md` 已 deprecated。
- M4 交付結論：使用者偏好、AI 協作偏好與本專案脈絡已寫回 self_brain compiled truth；交付摘要是 `100_Todo/projects/m4-self-brain-compiled-truth.md`。
- M5 交付結論：日常閉環第一輪驗證通過，並已把資料路由架構定案寫入 `../decisions/ai-agent-data-routing-architecture.md`。

## Open Threads

- 規劃 `ak-threads-booster` 的 tracker / brand voice / compiled memory 實際資料應放在哪個任務工作區，避免混進 skill package 本體。
- 需要檢查 Self Brain inbox 的 `about me*.md` 是否還有未吸收但值得保留的長期脈絡。

## See Also

- `../../../README.md`
- `../../../000_Agent/DATA_ROUTING.md`
- `../../../000_Agent/CORE_RULES.md`
- `../writing_voice/social-voice.md`

---

## Timeline

- 2026-05-07 | source: conversation | confidence: high | 使用者指出專案中自我紀錄、寫作與相關資料夾有重疊，要求整體檢視。
- 2026-05-07 | source: file | confidence: high | 建立 `000_Agent/DATA_ROUTING.md`，並在 `README.md` 與 `000_Agent/CORE_RULES.md` 加入資料路由規則。
- 2026-05-08 | source: file | confidence: high | 補充 `000_Agent/memory/MEMORY.md` 邊界，明確指出新 session log 統一寫入 `300_Journal/`。
- 2026-05-08 | source: file | confidence: high | 收斂 workflow 邊界：新增 `journal.md` workflow shim，並把 `gas-debug.md` 改成指向 `gas` skill 的快捷入口。
- 2026-05-08 | source: file | confidence: high | 完成資料路由 Phase 5 驗證：日記、偏好記憶、貼文樣本三個案例都能導向正確資料層，並補強 `RESOLVER.md` 對原始寫作樣本與寫作聲音分析的區分。
- 2026-05-08 | source: file | confidence: high | M2 正式入口收斂完成：root `README.md` 改成入口索引，不重複完整資料路由；工具入口維持 shim。
- 2026-05-08 | source: file | confidence: high | M3 skills / workflows 分級完成：新增 inventory，確認 active / active package / deprecated 狀態，並讓 `notion-task-triage` 改引用 `NOTION_SOURCE_MAP.md`。
- 2026-05-08 | source: file | confidence: high | M4 Self Brain 第一輪整理完成：更新 AI 協作偏好、使用者長期輪廓與本專案脈絡，並新增 M4 compiled truth 摘要。
- 2026-05-08 | source: file | confidence: high | M5 日常閉環第一輪驗證完成：Notion 讀取型驗證通過、journal / self-brain / project-todo-capture 路由可用，並新增資料路由架構決策頁。
