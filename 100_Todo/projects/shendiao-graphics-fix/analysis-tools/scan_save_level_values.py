from __future__ import annotations

import csv
import struct
from pathlib import Path


SAVE_DIR = Path(r"C:\Users\join6\Games\ShenDiao-dgVoodoo\Data\save")
OUT = Path(r"C:\Users\join6\AI-Agent\100_Todo\projects\shendiao-graphics-fix\analysis\save_level_value_hits.csv")

VALUES = [1, 2, 3, 4, 5, 6, 7, 10, 13, 30, 60, 110, 170, 270, 450, 630, 855, 1080, 1480, 1880, 2380, 3280]


def main() -> None:
    rows = []
    for path in sorted(SAVE_DIR.glob("*.sav")):
        data = path.read_bytes()
        for value in VALUES:
            needles = [
                ("u8", bytes([value]) if 0 <= value <= 255 else None),
                ("u16", struct.pack("<H", value) if 0 <= value <= 0xFFFF else None),
                ("u32", struct.pack("<I", value)),
            ]
            for kind, needle in needles:
                if needle is None:
                    continue
                start = 0
                while True:
                    index = data.find(needle, start)
                    if index < 0:
                        break
                    lo = max(0, index - 24)
                    hi = min(len(data), index + 40)
                    rows.append({
                        "file": path.name,
                        "offset": f"0x{index:x}",
                        "kind": kind,
                        "value": value,
                        "context_hex": data[lo:hi].hex(" "),
                    })
                    start = index + 1

    OUT.parent.mkdir(parents=True, exist_ok=True)
    with OUT.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["file", "offset", "kind", "value", "context_hex"])
        writer.writeheader()
        writer.writerows(rows)
    print(f"wrote {len(rows)} rows to {OUT}")


if __name__ == "__main__":
    main()
