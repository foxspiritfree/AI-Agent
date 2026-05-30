from __future__ import annotations

import csv
import struct
from pathlib import Path


EXE = Path(r"C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe")
OUT = Path(r"C:\Users\join6\AI-Agent\100_Todo\projects\shendiao-graphics-fix\analysis\level_exp_context.csv")
IMAGE_BASE = 0x400000


def find_all(data: bytes, needle: bytes) -> list[int]:
    hits = []
    start = 0
    while True:
        i = data.find(needle, start)
        if i < 0:
            return hits
        hits.append(i)
        start = i + 1


def main() -> None:
    data = EXE.read_bytes()
    rows = []
    terms = [b"LEVELUP", b"levelup", b"Level", b"HPFull", b"MPFull", b"APFull", b"HP", b"MP"]

    for term in terms:
        for off in find_all(data, term):
            va = IMAGE_BASE + off
            ptr = struct.pack("<I", va)
            refs = find_all(data, ptr)
            rows.append({
                "kind": "string",
                "term": term.decode("ascii", errors="replace"),
                "offset": f"0x{off:x}",
                "va": f"0x{va:x}",
                "ref_count": len(refs),
                "refs": " ".join(f"0x{IMAGE_BASE + r:x}" for r in refs[:20]),
            })

    # Candidate immediate constants used in RPG math.
    for value in [10, 20, 50, 100, 150, 200, 500, 1000, 10000]:
        needle = struct.pack("<I", value)
        refs = find_all(data, needle)
        rows.append({
            "kind": "imm32",
            "term": str(value),
            "offset": "",
            "va": "",
            "ref_count": len(refs),
            "refs": " ".join(f"0x{IMAGE_BASE + r:x}" for r in refs[:40]),
        })

    OUT.parent.mkdir(parents=True, exist_ok=True)
    with OUT.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["kind", "term", "offset", "va", "ref_count", "refs"])
        writer.writeheader()
        writer.writerows(rows)
    print(f"wrote {OUT}")


if __name__ == "__main__":
    main()
