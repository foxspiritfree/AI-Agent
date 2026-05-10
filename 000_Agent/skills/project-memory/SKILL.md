---
name: project-memory
description: Use this skill when starting or continuing a coding/product project that needs durable AI handoff context across Codex, Claude, Gemini, Cursor, or new chat sessions. Trigger when the user mentions memory-bank, PRD, tech stack, implementation plan, progress, architecture, project handoff, continuing a previous build, or asks AI to integrate/maintain project context.
---

# Project Memory Skill

## Goal

Maintain a small `memory-bank/` for each active app or technical project so any AI tool can reload the project state after context loss, model switching, or a new session.

Use this for project-specific context. Do not use it for global AI rules, personal identity, daily journaling, or raw imported reference material.

## When to Use

Use this skill when:

- Starting a new app, tool, automation, or technical build.
- Continuing an implementation after a long gap or a new conversation.
- The user asks for a PRD, technical stack, implementation plan, progress log, or architecture note.
- A project has enough moving parts that future AI sessions may need handoff context.
- The user says to read or update `memory-bank`.

## Folder

Create or maintain this folder at the project root:

```text
memory-bank/
├── PRD.md
├── tech-stack.md
├── implementation-plan.md
├── progress.md
└── architecture.md
```

If the repo already uses another equivalent folder, follow the existing local convention and do not duplicate it.

## File Roles

- `PRD.md`: product goal, users, core flows, scope, non-goals, constraints, acceptance criteria.
- `tech-stack.md`: framework, language, libraries, hosting, integrations, environment assumptions, reasons for major choices.
- `implementation-plan.md`: ordered steps, each with a small scope and clear acceptance criteria.
- `progress.md`: chronological implementation log; update after each completed step with actual result, test result, and next start point.
- `architecture.md`: current folder/file map, module responsibilities, important data flow, key design decisions, known limitations.

## Start a Project

1. Read existing README, package/config files, and any current project docs before creating `memory-bank`.
2. If no `memory-bank/` exists, create the five files with short, useful content. Leave unknowns explicit instead of inventing details.
3. Keep `implementation-plan.md` split into small steps that can be implemented and verified independently.
4. Put source links or imported notes in `200_Reference/imported/` when they are external material; only distilled project decisions go into `memory-bank`.

## Continue a Project

When asked to continue:

1. Read all files in `memory-bank/`.
2. Read the local files referenced by `architecture.md` or the next step in `implementation-plan.md`.
3. State the next planned step and affected files before editing.
4. Implement only the current step unless the user explicitly asks for a larger batch.
5. Verify the step with the smallest meaningful command or manual check.
6. Update `progress.md` and, when structure or responsibilities changed, update `architecture.md`.

## Step Discipline

Default execution prompt:

```text
Read memory-bank, implement only the next unchecked step in implementation-plan, verify it, update progress.md and architecture.md, then stop.
```

Use this discipline as a default, not a hard blocker. If the user gives a clear instruction, execute it first and write assumptions afterward.

## Progress Entry Format

Append entries like this:

```markdown
## YYYY-MM-DD - Step N: [short title]

- Done: [what changed]
- Files: [important files touched]
- Verification: [command/manual check and result]
- Notes: [bugs, decisions, or follow-up]
- Next: [next recommended step]
```

## Architecture Update Rules

Update `architecture.md` when:

- New modules, components, routes, APIs, data stores, or scripts are added.
- Responsibilities move between files.
- A key dependency or hosting assumption changes.
- A bug fix teaches a reusable constraint.

Keep it concise. Prefer a current map and important decisions over a full historical diary.

## Boundaries

- Do not turn `memory-bank` into a session transcript.
- Do not copy large Notion pages or external articles into it.
- Do not store secrets, credentials, API keys, deployment IDs, or private account data.
- Do not force manual approval after every tiny edit unless the user asked for that gate.
- Do not commit automatically; follow the repository git rules.

