# skills/ - AI 工作手冊

這個資料夾放「AI 遇到某類任務的完整 How-to」。每個正式 skill 通常是一個子資料夾，入口為 `SKILL.md`。

快速路由索引：`000_Agent/skills/INDEX.md`

能力命名策略：`000_Agent/skills/CAPABILITY_MAP.md`

## 單一真相來源

- 正式 SOP 只寫在 `000_Agent/skills/<skill>/SKILL.md` 或該 skill 的子檔案。
- `INDEX.md` 是目前正式 skill 的路由清單；本 README 只說明目錄規則，不再維護第二份長清單。
- skill 命名策略只維護在 `000_Agent/skills/CAPABILITY_MAP.md`。
- `000_Agent/workflows/` 只保留無法由單一 skill 涵蓋的獨立 playbook，不重複維護完整步驟。
- `200_Reference/imported/` 只放外部導入原始素材，不當成當前執行規則。

## 現況分組

- Core operating：AI 協作、skill 建立、lesson integration、完整輸出約束。
- Product / engineering / ops：fullstack、GAS、project-memory、SOC、安全下載與二進位處理。
- Design / frontend / motion：uiux、experience design、taste skills、GSAP skills。
- Image generation：brandkit、image-to-code、web/mobile imagegen。
- Writing / thinking / communication：precision-writing、problem-framing、strategic-questioning、listening、persuasion、ability growth。
- Knowledge / memory / content：journal、self-brain、zettelkasten、article enrichment、Threads、writing flywheel、Notion tasks、finance admin。
- Ziwei product：LINE flow review、Cloud Run ops、reading discussion。
- Packages：`superpowers` 是 active package，入口為 `000_Agent/skills/superpowers/using-superpowers/SKILL.md`。

完整 skill 名稱與觸發條件請看 `INDEX.md`。

## 建立新 skill

方法 1：使用 `skill-creator`，請 AI 幫你建立一個可重複使用的工作流程。

方法 2：手動建立子資料夾與 `SKILL.md`，frontmatter 至少包含 `name` 和 `description`。

```yaml
---
name: my-first-skill
description: 做某件事時會用到，觸發條件是...
---

把 SOP 寫在這裡。
```

建好後必須同步更新：

- `000_Agent/skills/INDEX.md`
- 必要時更新 `000_Agent/skills/CAPABILITY_MAP.md`

## Superpowers

Superpowers 已安裝為專案內正式 skill package：

- 啟用入口：`000_Agent/skills/superpowers/using-superpowers/SKILL.md`
- 所有工作流：`000_Agent/skills/superpowers/*/SKILL.md`
- Upstream 參考：`200_Reference/imported/superpowers/`

當任務涉及規劃、實作、除錯、TDD、code review、worktree 或交付時，先讀取 `using-superpowers`，再依任務選用對應子 skill。

`superpowers/writing-skills` 可作為方法論參考；真正建立或修改本專案 skills 時，優先使用 `skill-creator`。

## 外部參考素材

外部導入但未正式啟用的 skill 或 pro-kit 素材，統一放在：

- `200_Reference/imported/`

除非使用者明確要求，AI 不應把 `200_Reference/imported/` 的內容當成當前執行規則。
