from __future__ import annotations

import argparse
import hashlib
import shutil
import struct
from datetime import datetime
from pathlib import Path


GAME_DIR = Path(r"C:\Users\join6\Games\ShenDiao-dgVoodoo")
EXE_PATH = GAME_DIR / "ShenDiao.exe"
BACKUP_PATH = GAME_DIR / "ShenDiao.exe.before-growth-curve-patch.bak"
CHANGE_LOG = Path(r"C:\Users\join6\AI-Agent\100_Todo\projects\shendiao-graphics-fix\mod-change-log.md")

TABLE_OFFSET = 0x17A218
CHAR_STRIDE = 0xAD4
LEVEL_STRIDE = 0x1C
LEVEL_COUNT = 99
PATCH_FACTOR = 0.5
EXTRA_TABLE_OFFSETS = [0x1455CC]
REQ_ONLY_TABLE_OFFSET = 0x14541C


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def append_log(message: str) -> None:
    stamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with CHANGE_LOG.open("a", encoding="utf-8") as f:
        f.write(f"\n## {stamp}\n\n{message.strip()}\n")


def table_offsets(data: bytes) -> list[int]:
    size = len(data)
    offsets = []
    char_index = 0
    while True:
        base = TABLE_OFFSET + char_index * CHAR_STRIDE
        end = base + LEVEL_COUNT * LEVEL_STRIDE
        if end + 4 > size:
            break
        first = struct.unpack_from("<I", data, base)[0]
        lvl1 = struct.unpack_from("<I", data, base + LEVEL_STRIDE)[0]
        if first != 0 or lvl1 == 0 or lvl1 > 1000000:
            break
        offsets.append(base)
        char_index += 1
    for base in EXTRA_TABLE_OFFSETS:
        if base not in offsets and base + LEVEL_COUNT * LEVEL_STRIDE + 4 <= size:
            offsets.append(base)
    return offsets


def read_all(path: Path) -> bytearray:
    return bytearray(path.read_bytes())


def status() -> None:
    data = EXE_PATH.read_bytes()
    bases = table_offsets(data)
    print(f"exe={EXE_PATH}")
    print(f"tables={len(bases)}")
    print(f"backup_exists={BACKUP_PATH.exists()}")
    print(f"sha256={sha256(EXE_PATH)}")
    if bases:
        for index, base in enumerate(bases):
            sample = []
            for level in range(1, 11):
                sample.append(struct.unpack_from("<I", data, base + level * LEVEL_STRIDE)[0])
            print(f"table_{index}_offset=0x{base:x} level_1_to_10=" + ",".join(map(str, sample)))
    req_only = [struct.unpack_from("<I", data, REQ_ONLY_TABLE_OFFSET + i * 4)[0] for i in range(10)]
    print("req_only_table_level_1_to_10=" + ",".join(map(str, req_only)))


def apply_patch() -> None:
    if not BACKUP_PATH.exists():
        shutil.copy2(EXE_PATH, BACKUP_PATH)

    source = BACKUP_PATH.read_bytes()
    data = read_all(EXE_PATH)
    bases = table_offsets(source)
    if not bases:
        raise SystemExit("growth table not found")

    changed = 0
    for base in bases:
        prev = 0
        for level in range(1, LEVEL_COUNT):
            off = base + level * LEVEL_STRIDE
            value = struct.unpack_from("<I", source, off)[0]
            if value == 0:
                continue
            patched = max(prev + 1, int(round(value * PATCH_FACTOR)))
            current = struct.unpack_from("<I", data, off)[0]
            if patched != current:
                struct.pack_into("<I", data, off, patched)
                changed += 1

    prev = 0
    for index in range(LEVEL_COUNT - 1):
        off = REQ_ONLY_TABLE_OFFSET + index * 4
        value = struct.unpack_from("<I", source, off)[0]
        if value == 0:
            continue
        patched = max(prev + 1, int(round(value * PATCH_FACTOR)))
        current = struct.unpack_from("<I", data, off)[0]
        if patched != current:
            struct.pack_into("<I", data, off, patched)
            changed += 1
        prev = patched

    before_hash = sha256(EXE_PATH)
    EXE_PATH.write_bytes(data)
    after_hash = sha256(EXE_PATH)
    append_log(
        f"- Applied growth-curve patch to `{EXE_PATH}`.\n"
        f"- Patched `{changed}` level requirement values across `{len(bases)}` growth tables.\n"
        f"- Requirement factor: `{PATCH_FACTOR}`.\n"
        f"- Backup: `{BACKUP_PATH}`.\n"
        f"- SHA256 before: `{before_hash}`.\n"
        f"- SHA256 after: `{after_hash}`.\n"
        f"- Restore command: `python analysis-tools\\growth_curve_patch.py restore`."
    )
    status()


def restore() -> None:
    if not BACKUP_PATH.exists():
        raise SystemExit("backup not found")
    before_hash = sha256(EXE_PATH)
    shutil.copy2(BACKUP_PATH, EXE_PATH)
    after_hash = sha256(EXE_PATH)
    append_log(
        f"- Restored growth-curve patch from `{BACKUP_PATH}`.\n"
        f"- SHA256 before restore: `{before_hash}`.\n"
        f"- SHA256 after restore: `{after_hash}`."
    )
    status()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("command", choices=["status", "apply", "restore"])
    args = parser.parse_args()

    if args.command == "status":
        status()
    elif args.command == "apply":
        apply_patch()
    else:
        restore()


if __name__ == "__main__":
    main()
