---
name: ziwei-line-flow-review
description: Use when reviewing the Ziwei LINE bot user flow step by step, especially onboarding, Rich Menu actions, LIFF birth-chart setup, star-guide question flow, error handling, existing-user restrictions, or when the user says to continue the LINE flow discussion/review. Always inspect the actual code and local docs before describing behavior or proposing fixes.
---

# Ziwei LINE Flow Review

## Purpose

Review the LINE user flow from real implementation evidence, then turn mismatches into concrete requirements. This skill exists because the user expects the agent to verify the system first, not make idealized assumptions.

## Required Sources

Start from the project root, usually:

`C:\Users\join6\Desktop\紫微斗數`

Read project instructions first:

- `AGENTS.md`
- `C:\Users\join6\AI-Agent\AGENTS.md`

Use these project files as the main evidence surface:

- `memory-bank/line-user-flow-discussion-map.md`
- `app/server.ts`
- `app/src/App.tsx`
- `app/scripts/create-line-rich-menu.mjs`
- `app/scripts/line-flow-v2_4-regression.ts`
- `app/docs/current-mechanism-analysis.md`
- `memory-bank/PRD.md`
- `memory-bank/progress.md`

Use targeted `Select-String` searches before broad reads.

## Review Rule

Never answer "what the user should see" from product intuition alone. First verify what the code and docs actually do.

For every flow segment, separate:

```text
實際程式行為：
文件/既有規則：
缺口：
推薦修正：
驗收標準：
```

When implementation and docs disagree, say so directly and name both sources.

## Segment Map

Use this order unless the user jumps to a specific step:

1. A. 進入 LINE
2. B. 初次引導
3. C. 命盤資料收集
4. D. 問題收集
5. E. 問題整理
6. F. 命盤與解讀準備
7. G. LINE 回覆輸出
8. H. LIFF 完整報告
9. I. 後續互動
10. J. 例外狀態

If the user says "下一個" or "進行下一個討論", move to the next segment and first provide verified actual behavior.

## Evidence Checklist

Before making a claim, inspect the relevant files:

- Rich Menu action: `app/scripts/create-line-rich-menu.mjs`
- LINE webhook routing: `app/server.ts`, search `line-webhook`, `follow`, `postback`, `messageText`
- LINE command fallback: `app/server.ts`, search `/api/line-command`
- Birth chart LIFF UI: `app/src/App.tsx`, search `LiffBirthChartForm`
- Star Guide LIFF/UI: `app/src/App.tsx`, search `LiffQuestion`
- API behavior: `app/server.ts`, search endpoint path such as `/api/liff/birth-chart`
- Existing rules: `app/docs/current-mechanism-analysis.md`, `memory-bank/PRD.md`, `memory-bank/implementation-plan.md`
- Regression expectations: `app/scripts/line-flow-v2_4-regression.ts`

When discussing a restriction or rule the user says was already written, search docs and memory-bank before concluding.

## User Expectations Captured

Preserve these expectations unless the user explicitly changes them:

- Rich Menu "建立命盤" should directly open LIFF.
- If an unbound user taps "星星指引", guide them to tap Rich Menu "建立命盤"; do not make the bot message the primary LIFF entry.
- Building a chart is not one-step: fill data, generate A/B/C, select the closest version, confirm binding.
- A/B/C is current flow, not legacy, unless code/docs later prove otherwise.
- Existing bound users must not be allowed to freely create/modify charts; enforce the written monthly modification rule at the backend API layer, not only at LINE entry points.
- Do not ask the user to identify gaps that code inspection can find.

## Flow Review Output

For a discussion step, keep the answer short but evidence-based:

```text
目前實際狀況：
- ...

已寫規則：
- ...

缺口：
- ...

推薦修正：
...

驗收標準：
- ...
```

If the user asks only for status or actual behavior, do not include a fix unless one issue is obvious and directly relevant.

## Recording Decisions

When a requirement or decision is confirmed, update:

`memory-bank/line-user-flow-discussion-map.md`

Use the existing table style:

- ID
- 流程段落
- 需求
- 推薦做法
- 驗收標準
- 狀態

Also add a short current discussion block when it helps future sessions.

If implementation is completed, update:

`memory-bank/progress.md`

## Implementation Handoff

If the user says to fix it:

1. Use the `fullstack` skill.
2. State affected files before editing.
3. Preserve the reviewed product decision.
4. Add or update regression checks.
5. Run focused verification, usually:
   - `npm run lint`
   - `npm run test:line-flow-v2_4`

Do not deploy unless the user explicitly asks.
