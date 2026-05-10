# README_LOCAL

## 原本用途

`landing-page` 原本是 Claude Code 的引導式銷售頁產生 skill，透過產品定位、內容填寫、CTA 與倒數設定，產出單頁 HTML landing page。

## 我可以怎麼用

- 用於課程頁、活動頁、產品頁、等待名單頁的初稿生成。
- 建議先在 `skills_imported` 中當參考模板使用，不直接啟用會自動安裝外部工具的流程。
- 需要正式啟用前，先檢查 `SKILL.md` 裡 UUPM / `.claude` 相關步驟，改成本地 AI-Agent 資料夾規則。

## 是否適合改成 SOC / GAS / fullstack 工作流

適合改成 fullstack 需求訪談與頁面生成工作流。也可改成 GAS 工具發布頁、內部工具說明頁、SOC runbook 入口頁。推薦把 17 題拆成「目標使用者、任務場景、輸入資料、輸出格式、部署方式、維護責任」。

## 本地注意

原始 skill 文字提到 UUPM 與 `.claude` 偵測/安裝流程；本次只匯入原始檔案，沒有執行 npm、沒有寫入 `.claude`，也沒有修改 `CORE_RULES.md`。
