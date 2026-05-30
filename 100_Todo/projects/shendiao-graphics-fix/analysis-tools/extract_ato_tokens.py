from __future__ import annotations

import csv
import re
from pathlib import Path


GAME_DATA = Path(r"C:\Users\join6\Games\ShenDiao-dgVoodoo\Data")
PROJECT = Path(r"C:\Users\join6\AI-Agent\100_Todo\projects\shendiao-graphics-fix")
OUT = PROJECT / "analysis"

TOKEN_RE = re.compile(rb"[A-Za-z0-9_\-.]{3,24}")


def context_ints(data: bytes, offset: int) -> str:
    start = max(0, offset - 32)
    chunk = data[start:offset]
    values = []
    for i in range(0, len(chunk) - 3, 4):
        value = int.from_bytes(chunk[i : i + 4], "little", signed=False)
        if value <= 10000:
            values.append(value)
    return " ".join(str(v) for v in values[-8:])


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    rows = []
    for path in sorted((GAME_DATA / "auto").glob("*.ato")):
        data = path.read_bytes()
        for match in TOKEN_RE.finditer(data):
            token = match.group().decode("ascii", errors="ignore")
            rows.append(
                {
                    "file": path.name,
                    "offset": match.start(),
                    "token": token,
                    "prev_small_u32": context_ints(data, match.start()),
                }
            )

    with (OUT / "auto_ato_tokens.csv").open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["file", "offset", "token", "prev_small_u32"])
        writer.writeheader()
        writer.writerows(rows)

    print(f"wrote {len(rows)} tokens")


if __name__ == "__main__":
    main()
