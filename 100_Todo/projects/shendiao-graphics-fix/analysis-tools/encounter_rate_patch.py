from __future__ import annotations

import argparse
import hashlib
import shutil
import struct
from datetime import datetime
from pathlib import Path


GAME_DIR = Path(r"C:\Users\join6\Games\ShenDiao-dgVoodoo")
EXE_PATH = GAME_DIR / "ShenDiao.exe"
BACKUP_PATH = GAME_DIR / "ShenDiao.exe.before-encounter-rate-patch.bak"
CHANGE_LOG = Path(r"C:\Users\join6\AI-Agent\100_Todo\projects\shendiao-graphics-fix\mod-change-log.md")

# VA 0x53060c maps to file offset 0x13060c in this PE.
# The original float is 1.5. It is used in the walking encounter accumulator.
PATCH_OFFSET = 0x13060C
ORIGINAL_VALUE = 1.5
PATCHED_VALUE = 0.5


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def read_float(path: Path) -> float:
    with path.open("rb") as f:
        f.seek(PATCH_OFFSET)
        return struct.unpack("<f", f.read(4))[0]


def write_float(path: Path, value: float) -> None:
    with path.open("r+b") as f:
        f.seek(PATCH_OFFSET)
        f.write(struct.pack("<f", value))


def append_log(message: str) -> None:
    stamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with CHANGE_LOG.open("a", encoding="utf-8") as f:
        f.write(f"\n## {stamp}\n\n{message.strip()}\n")


def status() -> None:
    value = read_float(EXE_PATH)
    print(f"exe={EXE_PATH}")
    print(f"offset=0x{PATCH_OFFSET:x}")
    print(f"value={value:.6g}")
    print(f"sha256={sha256(EXE_PATH)}")
    print(f"backup_exists={BACKUP_PATH.exists()}")


def apply_patch() -> None:
    current = read_float(EXE_PATH)
    if not BACKUP_PATH.exists():
        shutil.copy2(EXE_PATH, BACKUP_PATH)

    if abs(current - PATCHED_VALUE) < 0.0001:
        print("already patched")
        status()
        return

    if abs(current - ORIGINAL_VALUE) > 0.0001:
        raise SystemExit(f"unexpected current value {current:.6g}; refusing to patch")

    before_hash = sha256(EXE_PATH)
    write_float(EXE_PATH, PATCHED_VALUE)
    after_hash = sha256(EXE_PATH)
    append_log(
        f"- Applied encounter-rate patch to `{EXE_PATH}`.\n"
        f"- Offset `0x{PATCH_OFFSET:x}` changed from `{ORIGINAL_VALUE}` to `{PATCHED_VALUE}`.\n"
        f"- Backup: `{BACKUP_PATH}`.\n"
        f"- SHA256 before: `{before_hash}`.\n"
        f"- SHA256 after: `{after_hash}`.\n"
        f"- Restore command: `python analysis-tools\\encounter_rate_patch.py restore`."
    )
    status()


def restore() -> None:
    if not BACKUP_PATH.exists():
        raise SystemExit("backup not found")
    before_hash = sha256(EXE_PATH)
    shutil.copy2(BACKUP_PATH, EXE_PATH)
    after_hash = sha256(EXE_PATH)
    append_log(
        f"- Restored encounter-rate patch from `{BACKUP_PATH}`.\n"
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
