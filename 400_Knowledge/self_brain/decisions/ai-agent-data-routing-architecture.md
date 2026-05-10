# AI Agent Data Routing Architecture

## Summary

2026-05-08 已定案：`AI-Agent` 採用「入口索引 + 單一真相來源 + workflow shortcut + skill SOP + self_brain compiled truth」的資料路由架構。理由是降低 context entropy，讓不同 AI 工具進入同一個 repo 時能快速判斷該讀什麼、寫哪裡、何時沉澱成長期記憶。

## Current Understanding

- 決策內容：保留現有 `000_Agent/`、`100_Todo/`、`200_Reference/`、`300_Journal/`、`400_Knowledge/` 五層結構，不新增整套 `rules/skills/templates/playbooks` 大搬家。
- 一行理由：先用索引、路由表與邊界文件降低混亂，比搬動大量資料更穩。
- 主規則 single source：`000_Agent/CORE_RULES.md`。
- AI 快速入口：`AI_README.md`。
- 人類 / repo 首頁入口：root `README.md`。
- 資料放置 single source：`000_Agent/DATA_ROUTING.md`。
- Notion URL / data source single source：`000_Agent/NOTION_SOURCE_MAP.md`。
- Skill 路由摘要：`000_Agent/skills/INDEX.md`。
- Skill 命名策略：`000_Agent/skills/CAPABILITY_MAP.md`。
- Workflow 定位：`000_Agent/workflows/` 保留現名，但語意上視為 playbook shortcut，不重複完整 SOP。
- 任務 SOP：`000_Agent/skills/<skill>/SKILL.md`。
- AI 執行層記憶：`000_Agent/memory/MEMORY.md`。
- 使用者長期偏好、決策、人物、專案脈絡：`400_Knowledge/self_brain/`。
- 每日流水與 session log：`300_Journal/YYYY-MM/YYYY-MM-DD.md`。
- 外部導入與 legacy 素材：`200_Reference/imported/`，不直接當正式規則。
- 被排除方案：不把所有東西塞進 skill；不把 `workflows` 立即 rename 成 `playbooks`；不先清理大量 imported / legacy；不把 root README 當完整規則文件。

## Open Threads

- `ak-threads-booster` 的 tracker、brand voice、compiled memory runtime data 位置仍待獨立決定。
- `self_brain/inbox/about me*.md` 可做第二輪吸收。

## See Also

- `../projects/ai-agent-system.md`
- `decision-patterns.md`
- `../../../100_Todo/projects/ai-agent-system-rebuild-plan.md`
- `../../../100_Todo/projects/m5-daily-loop-validation.md`

---

## Timeline

- 2026-05-08 | source: file | confidence: high | M0-M5 第一輪整理完成後，將 AI-Agent 資料路由架構定案寫入 decisions：以索引與 single source 收斂，不做大搬家。
