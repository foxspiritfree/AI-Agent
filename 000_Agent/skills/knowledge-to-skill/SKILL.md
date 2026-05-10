---
name: knowledge-to-skill
description: 從 study/body 卡片、讀書筆記、課程筆記、外部方法論或新學到的東西中，判斷哪些值得發展成 skill、workflow、既有 skill 擴充或 reference 時使用。當使用者說「這些卡片能不能變成 skill」「我學到的東西能不能流程化」「研究一下能發展哪些能力」「避免跟現有 skill 重疊」「把方法論落地成 AI OS 能力」時觸發。
---

# Knowledge to Skill

把新學到的方法論轉成本專案可維護的 AI 能力。這個 skill 的核心任務是判斷落地型態，不是把所有好想法都做成新 skill。

## 核心原則

- 先看是否是可重複能力，再決定是否 skill 化。
- 先對照既有 `skills/`、`workflows/`，避免重複新增。
- skill 放完整 SOP；workflow 只做快捷入口與執行順序。
- 舊資料、案例、原始卡片不要直接升級成規則。
- 已分析完 trade-off 時，直接推薦一個最優先落地項目。

## 必讀入口

開始前先讀：

- `AI_README.md`
- `000_Agent/CORE_RULES.md`
- `000_Agent/skills/INDEX.md`
- `000_Agent/skills/CAPABILITY_MAP.md`
- `000_Agent/workflows/README.md`

如果任務來源是知識卡片，也讀：

- `400_Knowledge/README.md`
- `000_Agent/skills/zettelkasten/SKILL.md`

## 判斷流程

1. 掃描素材範圍：
   - 使用者指定的卡片、資料夾、筆記或來源。
   - 若未指定，先抽樣，不整包讀完。
2. 萃取候選能力：
   - 這組內容能讓 AI 重複做什麼？
   - 使用者會在什麼情境喊它？
   - 輸出是否有固定形狀？
   - 是否需要查資料、讀檔、改檔或跨工具執行？
3. 對照現有系統：
   - `skills/INDEX.md` 找是否已有相近能力。
   - `workflows/README.md` 找是否已有快捷入口。
   - `CAPABILITY_MAP.md` 檢查命名與拆分方向。
4. 決定落地型態：
   - 新 skill：可重複、有清楚 SOP、跨任務會用到。
   - 擴充既有 skill：能力相近，只是補方法或邊界。
   - 新 workflow：只是固定入口或串接多個 skill。
   - reference：內容有價值，但不該變成執行規則。
   - 暫不落地：只有概念、案例或還不夠穩定。
5. 排優先順序：
   - 使用頻率。
   - 與使用者目前目標的貼合度。
   - 是否能減少之後重複討論。
   - 是否與既有 skill 邊界清楚。

## 預設輸出

```markdown
**推薦先做**：[一個項目]
理由：[一行理由]

| 候選 | 型態 | 與既有重疊 | 建議 |
| --- | --- | --- | --- |
| [名稱] | [new skill / extend skill / workflow / reference / skip] | [重疊對象] | [處理方式] |

**落地順序**
1. [第一步]
2. [第二步]
3. [第三步]
```

## 落地規則

使用者明確說「執行」「落地」「開始改」後再修改檔案。

可修改：

- `000_Agent/skills/<skill-name>/SKILL.md`
- `000_Agent/skills/INDEX.md`
- `000_Agent/skills/CAPABILITY_MAP.md`
- `000_Agent/workflows/<workflow-name>.md`
- `000_Agent/workflows/README.md`

不主動修改：

- 原始卡片。
- `CORE_RULES.md`，除非是跨工具長期規則。
- `self_brain`，除非使用者要沉澱個人偏好或決策。

## Skill 草稿要求

新增 skill 時至少包含：

- frontmatter：`name`、`description`
- 使用情境。
- 核心原則。
- 執行流程。
- 預設輸出格式。
- 與其他 skill 的邊界。

description 要包含常見觸發語，避免 under-trigger。

## 命名規則

- 優先能力導向命名，例如 `problem-framing`、`ability-growth-planner`。
- 避免職位導向命名，例如 `coach`、`consultant`。
- 如果只是固定口令，建立 workflow，不建立 skill。

## 與其他 skill 的邊界

- `skill-creator`：已決定要建立或測試 skill 時使用；本 skill 負責從知識中判斷要不要 skill 化。
- `zettelkasten`：負責卡片盒匯入、分類、pipeline；本 skill 負責從卡片萃取可執行能力。
- `ai-agent-collaboration`：負責 AI 協作規則與系統設定；本 skill 只處理知識到能力的轉換。
