from __future__ import annotations

import csv
import re
from pathlib import Path


GAME_ROOT = Path(r"C:\Users\join6\Games\ShenDiao-dgVoodoo")
PROJECT = Path(r"C:\Users\join6\AI-Agent\100_Todo\projects\shendiao-graphics-fix")
OUT = PROJECT / "analysis"

STRING_RE = re.compile(rb"[A-Za-z0-9_\-./]{4,48}")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    rows = []
    for path in sorted((GAME_ROOT / "Data").rglob("*")) + [GAME_ROOT / "ShenDiao.exe"]:
        if not path.is_file():
            continue
        try:
            data = path.read_bytes()
        except OSError:
            continue
        for match in STRING_RE.finditer(data):
            text = match.group().decode("ascii", errors="ignore")
            if any(key in text.lower() for key in ("exp", "money", "gold", "level", "fight", "battle", "enemy", "rand", "encount")):
                rows.append(
                    {
                        "relative_path": str(path.relative_to(GAME_ROOT)),
                        "offset": match.start(),
                        "text": text,
                    }
                )

    with (OUT / "keyword_strings.csv").open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["relative_path", "offset", "text"])
        writer.writeheader()
        writer.writerows(rows)

    print(f"wrote {len(rows)} keyword strings")


if __name__ == "__main__":
    main()
