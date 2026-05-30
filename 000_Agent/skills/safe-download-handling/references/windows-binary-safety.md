# Windows Binary Safety Reference

## Common Warning Types

- `IDP.Generic`: behavior-based detection, often triggered by automation, input hooks, injectors, packers, or unusual process behavior. Treat as a stop signal until a safer route is chosen.
- PUA/PUP: potentially unwanted application, often installers, bundled tools, macro utilities, downloaders, or system modifiers.
- Heuristic detection: pattern or behavior looks suspicious even if no exact malware signature matched.
- Quarantine/download blocked: the file is not available for normal inspection or use; do not fight the security tool by default.

## High-Friction Tool Categories

- AutoHotkey and macro tools can be flagged because they intercept input, synthesize keystrokes or clicks, and are often reused by malware or game automation.
- Input hooks and overlays can resemble keyloggers, cheats, or accessibility abuse if distributed as unsigned binaries.
- Memory patchers, trainers, injectors, and DLL loaders are high risk and should not be used as casual workflow tools.
- Old-game wrappers are usually lower risk when downloaded from official sources, but still require isolation and hash tracking because they add dlls next to executables.

## Official Source Checklist

Proceed only when most of these are true:

- The source is the vendor's official domain, official GitHub organization, or established package manager.
- The release page has version history, dates, and consistent naming.
- The downloaded asset name matches the release notes.
- The download is not a repack, crack, unknown mirror, or forum attachment.
- The file hash can be recorded locally after download.

Stop or ask for a safer source when:

- The file is from an unknown cloud drive or forum post.
- The source asks users to disable antivirus.
- The package contains unexpected executables, scripts, or packed binaries.
- The user wants to whitelist a detection without a strong reason.

## Safe Handling Checklist

- Download to `downloads/` or `tools/`.
- Extract into a dedicated folder.
- List archive contents before copying.
- Record SHA256 with PowerShell `Get-FileHash -Algorithm SHA256`.
- Copy dlls/wrappers into a test copy first.
- Avoid running installers or helper exes automatically.
- Provide rollback instructions or scripts for copied files.

## Continue / Stop Rules

Continue when:

- The source is official.
- The binary is needed for the task.
- The package contents match expectations.
- The setup happens in an isolated test copy.
- Hash and change log are recorded.

Stop when:

- Antivirus flags the file during download, extraction, or launch.
- The source is unverifiable.
- The task requires broad whitelisting or disabling security tools.
- The tool category is an input hook, memory patcher, trainer, or injector and a safer native/manual route exists.

When stopping, recommend the safest next route: official alternative, native purpose-built helper, manual process, or postponing that feature.
