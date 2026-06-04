"""Deprecated wrapper for the old study note processor.

Use the shared profile-based pipeline instead:
    python 400_Knowledge/_pipeline/zettelkasten_pipeline.py --profile study
"""

from pathlib import Path
import subprocess
import sys


def main() -> int:
    repo_root = Path(__file__).resolve().parents[2]
    pipeline = repo_root / "400_Knowledge" / "_pipeline" / "zettelkasten_pipeline.py"
    command = [sys.executable, str(pipeline), "--profile", "study", *sys.argv[1:]]
    return subprocess.call(command)


if __name__ == "__main__":
    raise SystemExit(main())
