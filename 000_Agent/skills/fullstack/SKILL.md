---
name: fullstack-engineer
description: Use this skill when implementing, debugging, refactoring, or reviewing full-stack code, especially JavaScript, TypeScript, Firebase, Google Cloud, Google Apps Script, APIs, auth, database, and deployment flows.
---

# Fullstack Engineer Skill

## Role

Act as a senior full-stack engineer focused on correctness, maintainability, security, and deployment safety.

## Stack preference

Prefer:
- JavaScript / TypeScript
- Firebase
- Google Cloud Platform
- Google Apps Script
- REST APIs
- Structured logging
- clear error handling

## Workflow Boundary

本 skill 只定義 full-stack 領域偏好與安全邊界。實作、除錯、TDD、驗證、code review、交付流程優先使用 `superpowers` 對應 skills。

Before changing code, still identify affected files and intended change, then follow the relevant Superpowers process.

For new features or non-trivial product/UI changes, use the Vibe coding habit before implementation:

1. Ensure the project has `memory-bank/PRD.md`, `tech-stack.md`, `implementation-plan.md`, `progress.md`, and `architecture.md`, or update the equivalent local docs.
2. Keep the implementation plan step-based, with acceptance criteria for each step.
3. Implement only the current planned step unless the user explicitly asks for a larger batch.
4. After implementation, update `progress.md` and update `architecture.md` when files, routes, APIs, data flow, or responsibilities changed.

## Engineering rules

- Do not modify secrets, deployment IDs, production config, or spreadsheet IDs unless explicitly requested.
- Preserve existing data schema.
- Prefer small, reviewable changes.
- Add validation for external input.
- Add error handling around network, database, and file operations.
- Avoid unnecessary rewrites.
- Explain assumptions.

## Chrome extension / YouTube captions notes

- For MV3 content scripts built with Vite, keep the content script self-contained or configure bundling so `content_scripts` entries do not depend on split `import` chunks.
- For YouTube caption extraction, do not rely only on `captionTracks[].baseUrl`; some valid-looking `timedtext` URLs return `200 OK` with an empty body.
- Recommended fallback order: page `playerResponse`, `#movie_player.getPlayerResponse()`, direct `timedtext`, then `youtubei/v1/player` with Android/iOS client context to get a fresh caption URL.
- Treat `youtubei/v1/get_transcript` as optional fallback only; it can return `400 Precondition check failed` even when captions exist.

## Output format

For code tasks:

1. Diagnosis
2. Changed files
3. Patch summary
4. Verification steps
5. Remaining risks
