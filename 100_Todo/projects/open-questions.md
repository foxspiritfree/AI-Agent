# Open Questions

本檔只保留 `AI-Agent` rebuild 專案仍需要追蹤的問題。已在 M0.5-M4.5 解決的問題移到 `Resolved Questions`，避免後續 milestone 帶著舊問題前進。

## Remaining Questions

### R1：AK Threads 工作資料位置

問題：`ak-threads-booster` 的 tracker、brand voice、compiled memory 實際資料應放在哪個任務工作區，避免混進 skill package 本體？

推薦：M5 之後另開小任務處理。

理由：這是特定 package 的 runtime data 邊界，不阻塞 `AI-Agent` 核心入口、skill / workflow 分級與 self_brain 第一輪整理。

### R2：Self Brain inbox 第二輪吸收

問題：`400_Knowledge/self_brain/inbox/about me*.md` 是否還有未吸收但值得保留的長期脈絡？

推薦：M5 之後做一輪 inbox review。

理由：M4 已先完成高信心 compiled truth；剩餘 inbox 內容可能較細或敏感，適合獨立檢查。

## Resolved Questions

| 問題 | 決議 | 主要證據 |
| --- | --- | --- |
| Q0：是否先進入架構校準 | 已採用，先做 M0.5 | `AI_README.md`、`skills/INDEX.md`、`DATA_ROUTING.md` 已建立或更新 |
| Q1：第一優先主軸 | 已採用，第一輪先穩定 `000_Agent` | M0.5-M3 都先處理入口、rules、skills、workflows |
| Q2：Self Brain 的邊界 | 已採用，先定位為「AI 對使用者的長期理解」 | `400_Knowledge/self_brain/README.md`、`RESOLVER.md`、M4 compiled truth |
| Q3：整理節奏 | 已採用，以 milestone / workflow 可驗證交付推進 | M0-M4 每輪都有交付文件與驗收 |
| Q3.5：臨時檔案放置 | 已採用，放 `100_Todo/inbox/` | `AI_README.md`、`DATA_ROUTING.md` |
| Q3.6：是否建立 `AI_README.md` | 已採用 | `AI_README.md` |
| Q3.7：skills 是否能力導向 | 已採用，逐步 mapping，不一次 rename | `000_Agent/skills/CAPABILITY_MAP.md` |
| Q3.8：workflow 與 playbook 命名 | 已採用，短期保留 `workflows`，語意定義為 playbook shortcut | `000_Agent/workflows/README.md` |
| Q4：`000_Agent/memory/decisions` 是否保留 | 已決議，保留為 AI 執行層決策；使用者長期決策放 self_brain | `000_Agent/memory/README.md` |
| Q5：`agent-setup-review.md` 的角色 | 已決議，active workflow，指向 `ai-agent-collaboration` | `m3-skills-workflows-inventory.md`、`workflows/README.md` |
| Q6：`soc` skill 是否完整 | 已採用，補正式 `SKILL.md`，能力名 `incident-triage` | `000_Agent/skills/soc/SKILL.md` |
| Q7：legacy 與 imported 是否需要清理 | 已決議，短期不清理，只標記邊界 | `DATA_ROUTING.md`、`skills/README.md` |
| Q8：核心規範層是否新增資料夾 | 已決議，先不新增整套資料夾，只用索引與路由收斂 | `AI_README.md`、`CAPABILITY_MAP.md`、`workflows/README.md` |
| R3：資料路由架構決策頁 | 已完成，寫入 self_brain decisions | `400_Knowledge/self_brain/decisions/ai-agent-data-routing-architecture.md` |

## 已採用假設

- 本專案是長期、多輪整理，不是一次性重構。
- 現階段優先建立控制面、架構校準與可驗收文件。
- 不先改動大量既有檔案。
- 不把外部導入素材直接變成正式規則。
- 每輪整理要有可驗收輸出。
