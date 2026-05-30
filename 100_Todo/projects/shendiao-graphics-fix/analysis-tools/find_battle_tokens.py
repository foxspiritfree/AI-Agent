from __future__ import annotations

import csv
from collections import defaultdict
from pathlib import Path


PROJECT = Path(r"C:\Users\join6\AI-Agent\100_Todo\projects\shendiao-graphics-fix")
ANALYSIS = PROJECT / "analysis"


def main() -> None:
    with (ANALYSIS / "auto_ato_record_candidates.csv").open("r", newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))

    tokens = []
    for row in rows:
        token = row["payload_token"]
        if len(token) == 4 and token[0] in {"B", "M"} and token[1:].isdigit():
            tokens.append(row)

    groups: dict[tuple[str, int], list[dict[str, str]]] = defaultdict(list)
    for row in tokens:
        # Group nearby references; 512 bytes is enough to keep compact battle/object blocks together.
        key = (row["file"], int(row["offset"]) // 512)
        groups[key].append(row)

    out_rows = []
    for (file, block), items in sorted(groups.items()):
        token_list = [item["payload_token"] for item in sorted(items, key=lambda r: int(r["offset"]))]
        b_count = sum(t.startswith("B") for t in token_list)
        m_count = sum(t.startswith("M") for t in token_list)
        if b_count == 0:
            continue
        out_rows.append(
            {
                "file": file,
                "block_start": block * 512,
                "block_end": block * 512 + 511,
                "b_count": b_count,
                "m_count": m_count,
                "tokens": " ".join(token_list),
                "offsets": " ".join(item["offset"] for item in sorted(items, key=lambda r: int(r["offset"]))),
            }
        )

    with (ANALYSIS / "battle_token_candidates.csv").open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=["file", "block_start", "block_end", "b_count", "m_count", "tokens", "offsets"],
        )
        writer.writeheader()
        writer.writerows(out_rows)

    print(f"wrote {len(out_rows)} battle token candidate blocks")


if __name__ == "__main__":
    main()
