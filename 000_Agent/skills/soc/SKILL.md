---
name: incident-triage
description: Use this skill for SOC, SecOps, alert analysis, incident triage, shift handoff, audit-ready timelines, evidence tracking, and SOC SOP improvement. Trigger when the user mentions SOC, SecOps, alerts, incident review, handoff, timeline, evidence, containment, detection, or post-incident review.
---

# Incident Triage

Use this skill for SOC / SecOps work where the output must be clear, traceable, and handoff-ready.

## Workflow Boundary

本 skill 負責事件分流、證據整理、交接摘要與 SOC SOP 改善，不把事件分析本身交給 Superpowers。

只有當任務變成 SOC 工具開發、偵測規則程式修改、自動化腳本、測試、驗證或交付時，才接對應 Superpowers 工程流程。

## Core Principles

- Separate facts, assumptions, and open questions.
- Preserve timeline order.
- Mark evidence sources.
- Prefer auditable handoff notes over broad commentary.
- Avoid exposing secrets, customer personal data, or sensitive alert details unless the user explicitly provides and requests local analysis.

## Default Workflow

1. Identify the incident or alert scope.
2. Extract known facts, timestamps, affected assets, involved accounts, and detection source.
3. Separate confirmed evidence from hypotheses.
4. Build a concise timeline.
5. List containment, escalation, and follow-up actions.
6. Produce a handoff-ready summary.

## Output Shape

Use this structure unless the user asks for another format:

```md
## Summary

## Timeline

## Evidence

## Assessment

## Actions Taken

## Open Questions

## Next Steps
```

## Routing

- Daily work journal goes to `300_Journal/YYYY-MM/YYYY-MM-DD.md`.
- Long-term SOC process learnings go to `400_Knowledge/self_brain/concepts/` or project notes.
- AI execution feedback and local tool issues go to `000_Agent/memory/MEMORY.md`.
- Reusable SOC SOP improvements stay in this skill.

## Safety

Only give risk warnings when the action may be irreversible, high-cost, or expose sensitive data. Prefer the safe executable step.
