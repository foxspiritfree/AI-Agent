from __future__ import annotations

import csv
from pathlib import Path


GAME_EXE = Path(r"C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe")
PROJECT = Path(r"C:\Users\join6\AI-Agent\100_Todo\projects\shendiao-graphics-fix")
OUT = PROJECT / "analysis"

CALL_RAND = bytes.fromhex("ff1548f35200")


def find_all(data: bytes, needle: bytes) -> list[int]:
    out = []
    start = 0
    while True:
        index = data.find(needle, start)
        if index < 0:
            return out
        out.append(index)
        start = index + 1


def main() -> None:
    data = GAME_EXE.read_bytes()
    rows = []
    for offset in find_all(data, CALL_RAND):
        window = data[offset : offset + 96]
        before = data[max(0, offset - 64) : offset]
        after_hex = window.hex(" ")
        rows.append(
            {
                "file_offset": offset,
                "va": f"0x{0x400000 + offset:x}",
                "has_100_near": int(b"\x64\x00\x00\x00" in window or b"\x64" in window[:32]),
                "has_50_near": int(b"\x32\x00\x00\x00" in window or b"\x32" in window[:32]),
                "has_10_near": int(b"\x0a\x00\x00\x00" in window or b"\x0a" in window[:32]),
                "has_div_near": int(any(op in window for op in (b"\xf7\xf9", b"\xf7\xfb", b"\xf7\xf8", b"\xf7\xff"))),
                "has_cmp_near": int(b"\x83\xf8" in window or b"\x3d" in window or b"\x83\x7d" in window),
                "before_hex": before[-32:].hex(" "),
                "after_hex": after_hex,
            }
        )

    with (OUT / "rand_call_context.csv").open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=[
                "file_offset",
                "va",
                "has_100_near",
                "has_50_near",
                "has_10_near",
                "has_div_near",
                "has_cmp_near",
                "before_hex",
                "after_hex",
            ],
        )
        writer.writeheader()
        writer.writerows(rows)

    print(f"wrote {len(rows)} rand contexts")


if __name__ == "__main__":
    main()
