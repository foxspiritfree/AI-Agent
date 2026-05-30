---
name: ziwei-reading-discussion
description: Use when discussing Zi Wei Dou Shu reading practice, narrator output design, knowledge-base interpretation rules, or the star-guide reading workflow. Before proposing opinions or decisions, inspect the project's knowledge_base and cite which files or rules informed the recommendation.
---

# Ziwei Reading Discussion

## Workflow

1. Locate the Zi Wei project root.
   - Default path: `C:\Users\join6\Desktop\紫微斗數`
   - If the user provides another project path, use that path.

2. Read the local project instructions first when available.
   - Project `AGENTS.md`
   - `C:\Users\join6\AI-Agent\AGENTS.md`

3. Before giving an opinion, inspect relevant knowledge-base files.
   - Start with `knowledge_base/READING_PRACTICE_DECISIONS.md` for current decisions.
   - Re-query the relevant local knowledge for the current step; do not reuse a previous discussion table as if it were complete.
   - For timing, technique, palace lines, and boundaries, read matching files under:
     - `knowledge_base/knowledge_units_v2/`
     - `knowledge_base/knowledge_units/`
     - `knowledge_base/topic_units/`
     - `knowledge_base/combination_units/`
     - `knowledge_base/technique_examples/`
   - Use targeted `Select-String` searches for terms such as `流年`, `大限`, `流月`, `本命`, `疊宮`, `引動`, `四化`, `飛化`, `三方四正`, `source palace`, and `target palace`.
   - When discussing main palace selection, also inspect `knowledge_base/knowledge_units/core_palaces_v0.tsv`, relevant `topic_units`, and relevant `technique_examples`; rebuild `primary palace + issue line` from evidence instead of hard-mapping one topic to one palace.

4. Propose one recommendation.
   - State the recommended decision first.
   - Add one short reason.
   - Mention the knowledge-base evidence used, by filename and rule/topic id when available.

5. If the user accepts a decision, update `knowledge_base/READING_PRACTICE_DECISIONS.md`.
   - Keep the table status current.
   - Record the decision in the relevant step section.
   - Do not rewrite unrelated steps.

## Decision Style

- Treat the knowledge base as the current local source of truth.
- Do not rely on generic Zi Wei assumptions when local rules exist.
- Prefer `primary palace + issue line` over single-palace conclusions.
- Do not ask the user to decide after trade-off analysis; recommend one option.
- Keep discussion iterative: one step or one disputed point at a time.
- When knowledge is draft, say it is draft and use it as a discussion aid, not production truth.

## Current Discussion Frame

The active artifact is:

`knowledge_base/READING_PRACTICE_DECISIONS.md`

The current ten-step reading practice frame is:

1. 先確認問題
2. 定時間層
3. 抓主線宮位
4. 看本宮狀態
5. 看對宮與三方四正
6. 看四化與飛化
7. 看時間觸發
8. 排除過度解讀
9. 翻成白話結論
10. 給行動建議
