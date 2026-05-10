# superpowers

專案內安裝版 Superpowers，來源：

- Repository: https://github.com/obra/superpowers
- Installed commit: f2cbfbefebbfef77321e4c9abc9e949826bea9d7
- Upstream mirror: `200_Reference/imported/superpowers/`

## 使用方式

先讀：

- `using-superpowers/SKILL.md`

再依任務選用：

- `brainstorming`：釐清需求與設計。
- `writing-plans`：把已確認的設計拆成可執行計畫。
- `executing-plans`：依計畫實作。
- `subagent-driven-development`：多代理分工開發。
- `dispatching-parallel-agents`：平行分派代理。
- `test-driven-development`：TDD 流程。
- `systematic-debugging`：系統化除錯。
- `verification-before-completion`：完成前驗證。
- `requesting-code-review`：請求 code review 前自檢。
- `receiving-code-review`：處理 review feedback。
- `using-git-worktrees`：使用 git worktree。
- `finishing-a-development-branch`：完成分支、PR 或交付。
- `writing-skills`：撰寫新 skill 的 Superpowers 方法論參考。

使用者明確指令與本專案 `000_Agent/CORE_RULES.md` 優先於 Superpowers 內文。

## 本專案整合規則

- 軟體開發流程以 Superpowers 為主：規劃、TDD、除錯、驗證、code review、worktree、交付。
- 技術領域規則仍使用本專案 skills，例如 `fullstack`、`gas`、`uiux`、`pm`、`soc`。
- 建立或修改本專案 skills 時，`skill-creator` 是主入口；`writing-skills` 只作為補充參考。
- 不手改 `200_Reference/imported/superpowers/`；那裡保留 upstream 原貌，方便未來更新比對。
