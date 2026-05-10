# README_LOCAL

## 原本用途

`social-cards` 原本是 Claude Code 的社群圖卡產生 skill，將文章、筆記或網址內容拆成 IG / Threads / X 圖卡，使用 HTML 模板預覽並可用 Playwright 匯出 PNG。

## 我可以怎麼用

- 用於把技術筆記、課程重點、專案更新轉成社群圖卡。
- 目前先保留在 `skills_imported`，可作為 HTML 模板與拆卡流程參考。
- 若要正式啟用，建議先確認 Node.js / Playwright 安裝位置，避免把依賴裝到不想共用的環境。

## 是否適合改成 SOC / GAS / fullstack 工作流

適合改成 SOC / GAS / fullstack 的知識卡片產出流程。SOC 可做 incident recap cards，GAS 可做教學步驟卡，fullstack 可做 release note / feature explainer cards。核心可保留「內容拆解、版型選擇、預覽確認、匯出」。

## 本地注意

此匯入沒有執行 Playwright 安裝、沒有寫入 `.claude`、沒有設定 hooks / MCP / 憑證 / Email / Calendar，也未修改 `CORE_RULES.md`。
