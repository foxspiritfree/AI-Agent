from __future__ import annotations

import csv
from pathlib import Path


GAME_DATA = Path(r"C:\Users\join6\Games\ShenDiao-dgVoodoo\Data")
PROJECT = Path(r"C:\Users\join6\AI-Agent\100_Todo\projects\shendiao-graphics-fix")
OUT = PROJECT / "analysis"

PLAUSIBLE_SIZES = {0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52}


def ascii_payload(payload: bytes) -> str:
    clean = payload.split(b"\0", 1)[0].replace(b"\xcd", b"")
    if len(clean) >= 3 and all(32 <= b < 127 for b in clean):
        return clean.decode("ascii", errors="ignore")
    return ""


def u32(data: bytes, offset: int) -> int:
    return int.from_bytes(data[offset : offset + 4], "little")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    rows = []
    for path in sorted((GAME_DATA / "auto").glob("*.ato")):
        data = path.read_bytes()
        for offset in range(0, len(data) - 8, 4):
            opcode = u32(data, offset)
            size = u32(data, offset + 4)
            if not (0 <= opcode <= 80 and size in PLAUSIBLE_SIZES):
                continue
            payload = data[offset + 8 : offset + 8 + size]
            rows.append(
                {
                    "file": path.name,
                    "offset": offset,
                    "opcode": opcode,
                    "size": size,
                    "payload_u32_0": u32(payload, 0) if len(payload) >= 4 else "",
                    "payload_token": ascii_payload(payload[4:] if len(payload) >= 8 else payload),
                    "payload_hex": payload[:24].hex(" "),
                }
            )

    with (OUT / "auto_ato_record_candidates.csv").open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=[
                "file",
                "offset",
                "opcode",
                "size",
                "payload_u32_0",
                "payload_token",
                "payload_hex",
            ],
        )
        writer.writeheader()
        writer.writerows(rows)

    print(f"wrote {len(rows)} record candidates")


if __name__ == "__main__":
    main()
