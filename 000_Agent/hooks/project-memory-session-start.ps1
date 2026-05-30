param()

$ErrorActionPreference = "SilentlyContinue"

$repoRoot = git rev-parse --show-toplevel 2>$null
if (-not $repoRoot) {
    exit 0
}

Set-Location $repoRoot

$memoryBank = Join-Path $repoRoot "memory-bank"
if (-not (Test-Path -LiteralPath $memoryBank -PathType Container)) {
    exit 0
}

$expectedFiles = @(
    "PRD.md",
    "tech-stack.md",
    "implementation-plan.md",
    "progress.md",
    "architecture.md"
)

$existingFiles = @()
foreach ($file in $expectedFiles) {
    $fullPath = Join-Path $memoryBank $file
    if (Test-Path -LiteralPath $fullPath -PathType Leaf) {
        $existingFiles += "memory-bank/$file"
    }
}

if (-not $existingFiles) {
    exit 0
}

Write-Output ""
Write-Output "[project-memory hook]"
Write-Output "- memory-bank found: read it before continuing project work."
Write-Output "- Default flow: read memory-bank, do only the next unchecked implementation-plan step, verify, update progress.md and architecture.md, then stop."
Write-Output "- Available files: $($existingFiles -join ', ')"

exit 0
