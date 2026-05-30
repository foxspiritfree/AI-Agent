from __future__ import annotations

import csv
import math
import statistics
from collections import Counter
from pathlib import Path


GAME_DATA = Path(r"C:\Users\join6\Games\ShenDiao-dgVoodoo\Data")
PROJECT = Path(r"C:\Users\join6\AI-Agent\100_Todo\projects\shendiao-graphics-fix")
OUT = PROJECT / "analysis"


def entropy(data: bytes) -> float:
    if not data:
        return 0.0
    counts = Counter(data)
    total = len(data)
    return -sum((count / total) * math.log2(count / total) for count in counts.values())


def u16_values(data: bytes, limit: int = 512) -> list[int]:
    end = min(len(data) - 1, limit)
    return [int.from_bytes(data[i : i + 2], "little") for i in range(0, end, 2)]


def summarize_file(path: Path) -> dict[str, object]:
    data = path.read_bytes()
    values = u16_values(data)
    small = [v for v in values if 0 <= v <= 300]
    return {
        "relative_path": str(path.relative_to(GAME_DATA)),
        "name": path.name,
        "extension": path.suffix,
        "size": len(data),
        "first16_hex": data[:16].hex(" "),
        "ascii_ratio": round(sum(32 <= b < 127 or b in (9, 10, 13) for b in data) / max(1, len(data)), 4),
        "entropy": round(entropy(data), 4),
        "u16_small_count_first512": len(small),
        "u16_small_mode_first512": Counter(small).most_common(1)[0][0] if small else "",
        "u16_first32": " ".join(str(v) for v in values[:32]),
    }


def write_index() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    targets = []
    for pattern in ("scenes/*", "Creature/*", "tlk/*", "auto/*", "automuc.txt"):
        targets.extend(path for path in GAME_DATA.glob(pattern) if path.is_file())

    rows = [summarize_file(path) for path in sorted(targets)]
    with (OUT / "data-file-index.csv").open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)


def repeated_offsets(paths: list[Path], stride: int = 2, max_offset: int = 256) -> list[dict[str, object]]:
    rows = []
    for offset in range(0, max_offset, stride):
        values = []
        for path in paths:
            data = path.read_bytes()
            if len(data) >= offset + 2:
                values.append(int.from_bytes(data[offset : offset + 2], "little"))
        if len(values) < 4:
            continue
        small_values = [v for v in values if 0 <= v <= 1000]
        if not small_values:
            continue
        unique = sorted(set(small_values))
        if 2 <= len(unique) <= 20:
            rows.append(
                {
                    "offset": offset,
                    "file_count": len(values),
                    "small_count": len(small_values),
                    "unique_count": len(unique),
                    "min": min(small_values),
                    "max": max(small_values),
                    "median": statistics.median(small_values),
                    "values": " ".join(str(v) for v in unique[:40]),
                }
            )
    return rows


def write_offset_reports() -> None:
    groups = {
        "scene_scn_offsets.csv": sorted((GAME_DATA / "scenes").glob("*.scn")),
        "scene_joe_offsets.csv": sorted((GAME_DATA / "scenes").glob("*.joe")),
        "creature_lbc_offsets.csv": sorted((GAME_DATA / "Creature").glob("*.lbc")),
        "creature_lss_offsets.csv": sorted((GAME_DATA / "Creature").glob("*.lss")),
        "tlk_tkb_offsets.csv": sorted((GAME_DATA / "tlk").glob("*.tkb")),
        "auto_ato_offsets.csv": sorted((GAME_DATA / "auto").glob("*.ato")),
    }
    for filename, paths in groups.items():
        rows = repeated_offsets(paths)
        if not rows:
            continue
        with (OUT / filename).open("w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
            writer.writeheader()
            writer.writerows(rows)


def main() -> None:
    write_index()
    write_offset_reports()
    print(f"wrote analysis to {OUT}")


if __name__ == "__main__":
    main()
