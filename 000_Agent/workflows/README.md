# workflows/ - 獨立的複雜工作流劇本

這個資料夾放「AI 需要遵循的複雜工作流劇本」，專指無法由單一 skill 簡單涵蓋，或需要跨多個步驟與規範的獨立 playbook（例如：`code-review.md`）。

> [!NOTE]
> 原先僅指向特定單一 skill 的快捷入口已全部移除。請直接在對話中觸發對應的 skill，不需額外建立 workflows 檔案。

## 跟 skills/ 差在哪？

- `skills/` 是方法論與可重複使用的 SOP，可以直接在對話中呼叫執行。
- `workflows/` 是獨立且複雜的 playbook 劇本，自帶特定的執行步驟、診斷與輸出格式。

## 現有 workflows

- [code-review.md](file:///c:/Users/join6/AI-Agent/000_Agent/workflows/code-review.md)：本專案的專案優化與 Code Review 完整工作流，自帶分析、修改與驗證劇本。

