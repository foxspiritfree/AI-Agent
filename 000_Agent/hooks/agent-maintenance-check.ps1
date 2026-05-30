param()

$ErrorActionPreference = "SilentlyContinue"

function Normalize-RepoPath {
    param([string]$Path)

    if ([string]::IsNullOrWhiteSpace($Path)) {
        return $null
    }

    $normalized = ($Path -replace "\\", "/").Trim('"')
    $repoRootForward = ($repoRoot -replace "\\", "/").TrimEnd("/")

    if ($normalized.StartsWith($repoRootForward)) {
        $normalized = $normalized.Substring($repoRootForward.Length).TrimStart("/")
    }

    return $normalized.TrimStart("./")
}

function Normalize-PathFromGitStatus {
    param([string]$Line)

    if ([string]::IsNullOrWhiteSpace($Line) -or $Line.Length -lt 4) {
        return $null
    }

    $path = $Line.Substring(3).Trim()
    if ($path -match " -> ") {
        $path = ($path -split " -> ")[-1].Trim()
    }

    $path = $path.Trim('"')
    return Normalize-RepoPath -Path $path
}

$repoRoot = git rev-parse --show-toplevel 2>$null
if (-not $repoRoot) {
    exit 0
}

Set-Location $repoRoot

$stdinText = [Console]::In.ReadToEnd()
$paths = @()

if (-not [string]::IsNullOrWhiteSpace($stdinText)) {
    $hookInput = $stdinText | ConvertFrom-Json
    $toolPath = $hookInput.tool_input.file_path
    if ($toolPath) {
        $path = Normalize-RepoPath -Path $toolPath
        if ($path) {
            $paths += $path
        }
    }
}

if (-not $paths) {
    $statusLines = git status --short -- 000_Agent 2>$null
    if (-not $statusLines) {
        exit 0
    }

    foreach ($line in $statusLines) {
        $path = Normalize-PathFromGitStatus -Line $line
        if ($path) {
            $paths += $path
        }
    }
}

if (-not ($paths | Where-Object { $_ -match "^000_Agent/" })) {
    exit 0
}

$messages = New-Object System.Collections.Generic.List[string]

$skillFiles = $paths | Where-Object { $_ -match "^000_Agent/skills/.+/SKILL\.md$" }
if ($skillFiles) {
    $messages.Add("- Skill files changed: check 000_Agent/skills/INDEX.md routing.")
    $messages.Add("- If capability naming or split changed: check 000_Agent/skills/CAPABILITY_MAP.md.")
}

$workflowFiles = $paths | Where-Object { $_ -match "^000_Agent/workflows/.+\.md$" -and $_ -ne "000_Agent/workflows/README.md" }
if ($workflowFiles) {
    $messages.Add("- Workflow files changed: keep workflows as shortcuts, not full SOP copies.")
    $messages.Add("- If a workflow was added or removed: check 000_Agent/workflows/README.md.")
}

$indexFiles = $paths | Where-Object { $_ -in @("000_Agent/skills/INDEX.md", "000_Agent/skills/CAPABILITY_MAP.md", "000_Agent/workflows/README.md") }
if ($indexFiles) {
    $messages.Add("- Routing/index files changed: confirm skill, workflow, and capability map stay consistent.")
}

$coreFiles = $paths | Where-Object { $_ -in @("000_Agent/CORE_RULES.md", "000_Agent/DATA_ROUTING.md") }
if ($coreFiles) {
    $messages.Add("- Core rules changed: keep AGENTS.md, CLAUDE.md, and GEMINI.md as entrypoints only.")
}

$notionFiles = $paths | Where-Object { $_ -eq "000_Agent/NOTION_SOURCE_MAP.md" }
if ($notionFiles) {
    $messages.Add("- Notion source map changed: keep related skills/workflows referencing this file only.")
}

if ($messages.Count -eq 0) {
    exit 0
}

Write-Output ""
Write-Output "[000_Agent maintenance hook]"
$messages | Select-Object -Unique | ForEach-Object { Write-Output $_ }

exit 0
