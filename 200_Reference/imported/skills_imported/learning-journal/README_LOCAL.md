# README_LOCAL

## 原本用途

`learning-journal` 原本是 Claude Code 的學習日記 skill，透過 5 個逐題問題引導每日回顧，最後產生 `journals/YYYY-MM-DD.md`。

## 我可以怎麼用

- 已整理成本地可用版本：`000_Agent/skills/journal/SKILL.md`。
- 本地版本用來建立每日學習紀錄、專案復盤、工作日誌、SOC 交接日誌。
- 輸出路徑改為 `300_Journal/YYYY-MM/YYYY-MM-DD.md`，符合目前 AI-Agent 資料層規則。

## 是否適合改成 SOC / GAS / fullstack 工作流

已採用這個方向：保留 5 題骨架，改成「今日事項、阻塞/交接、學到/確認、明日待辦、待追蹤」，可用於 SOC 值班紀錄、Google Apps Script 開發日誌、fullstack sprint log。

## 本地注意

原始匯入檔仍保留在此資料夾當參考；正式使用請讀 `000_Agent/skills/journal/SKILL.md`。未修改 `CORE_RULES.md`。
