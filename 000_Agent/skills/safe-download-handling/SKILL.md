---
name: safe-download-handling
description: Safely handle third-party binary downloads and setup work. Use this skill whenever a task involves downloading, unpacking, installing, or applying exe, zip, dll, portable tools, wrappers, patches, mods, GitHub releases, old-game compatibility tools such as dgVoodoo or DxWnd, AutoHotkey/input hook tools, or when antivirus blocks or flags something as IDP.Generic, PUA, heuristic detection, quarantine, false positive, or download blocked.
---

# Safe Download Handling

Use this skill to keep third-party binary work deliberate, traceable, and reversible. The goal is not to avoid all downloads; it is to avoid surprise execution, unclear provenance, direct writes into sensitive targets, and casual antivirus bypasses.

## Workflow

### 1. Decide Whether Downloading Is Necessary

- Prefer built-in OS tools, files already present on disk, package managers, or official documentation before downloading new binaries.
- Download third-party binaries only when they are necessary for the user's requested outcome.
- If the task can be completed by planning, static inspection, or a safer built-in tool, do that first.

### 2. Classify The Source

- Prefer official websites, official GitHub releases, or established package managers.
- Treat known mirrors as secondary sources and clearly label them as non-official.
- Do not use forum attachments, unknown cloud drives, repacked installers, crack packages, suspicious mirrors, or binaries whose origin cannot be traced.
- If multiple plausible sources exist, choose the official one and record why.

### 3. Isolate The Download

- Download into the current project's `downloads/` or `tools/` folder, not directly into a game, system, production, or application install directory.
- Extract archives into a dedicated subfolder.
- Record the source URL, version, retrieval date, and SHA256 hash in the current project's `change-log.md` or equivalent tracking file.
- For game or app patching, create or use a writable test copy before placing dlls, wrappers, or patches next to the executable.

### 4. Inspect Before Execution

- For zip files, list contents before copying or running anything.
- For dll files, place them only in the test copy first; do not place them in the original install directory as the first action.
- For exe files, do not run them automatically unless execution is necessary and the user has enough context about what the executable does.
- For input hooks, automation tools, memory patchers, trainers, cheat tools, or macro tools, default to not using them. Prefer a native purpose-built helper, a manual workflow, or a non-hook approach.

### 5. Handle Antivirus Warnings

- If antivirus reports `IDP.Generic`, PUA, heuristic detection, quarantine, or a similar warning, stop that route.
- Do not recommend adding a whitelist/exclusion as the default fix.
- Report the source, file, action that triggered the warning, likely reason, and safer alternatives.
- Prefer one of these alternatives: official replacement, package-manager version, native purpose-built tool, manual workflow, browser-based verification, or dropping the feature.

### 6. Track And Roll Back

- Log downloaded files, copied files, config changes, and test results in the project change log.
- Provide a rollback path for any test setup, such as a removal script, a list of files to remove, or a clean test-copy recreation step.
- Keep original installations and production folders untouched unless the user explicitly asks to apply a proven test setup there.

## Reference

Read `references/windows-binary-safety.md` when:

- antivirus warnings appear,
- the requested tool is AutoHotkey, an input hook, memory patcher, trainer, wrapper, or dll,
- a source is not clearly official,
- the user asks whether a warning is a false positive,
- deciding whether to continue, stop, or propose an alternative.

## Output Pattern

When using this skill, summarize:

- Recommended route: one sentence.
- Source: URL and why it is trusted.
- Isolation path: where downloads and extracted files will live.
- Hash/tracking: where SHA256 and changes are recorded.
- Execution decision: what will or will not be run automatically.
- Rollback: how to undo the test setup.

If antivirus blocks the file, give the stop decision first, then the safer fallback.
