# Mod 變更紀錄

尚未修改遊戲資料檔。

本檔之後只記錄 `C:\Users\join6\Games\ShenDiao-dgVoodoo` 內與降低練功需求相關的實際 mod 變更。

## 只讀分析

| 日期 | 內容 |
| --- | --- |
| 2026-05-28 | 建立資料檔索引與 `.ato` record 掃描；未修改遊戲資料 |

## 2026-05-28 09:41:25

- Applied encounter-rate patch to `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe`.
- Offset `0x13060c` changed from `1.5` to `0.5`.
- Backup: `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-encounter-rate-patch.bak`.
- SHA256 before: `eecb203048bb0ae121423fc26168d4f7353559ef9b3847087e72f44c702d87fb`.
- SHA256 after: `d6fbdee53dde9dddd8ab9f064d4649c893f9e764242b067df92d128aeab395ec`.
- Restore command: `python analysis-tools\encounter_rate_patch.py restore`.

## 2026-05-28 10:47:29

- Applied growth-curve patch to `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe`.
- Patched `686` level requirement values across `7` growth tables.
- Requirement factor: `0.5`.
- Backup: `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-growth-curve-patch.bak`.
- SHA256 before: `d6fbdee53dde9dddd8ab9f064d4649c893f9e764242b067df92d128aeab395ec`.
- SHA256 after: `d10ea2ec7d5444968c9cb442d5b00fe391d702f85f336cf37a5b164fcad64f9a`.
- Restore command: `python analysis-tools\growth_curve_patch.py restore`.

## 2026-05-28 11:06:51

- Applied growth-curve patch to `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe`.
- Patched `98` level requirement values across `8` growth tables.
- Requirement factor: `0.5`.
- Backup: `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-growth-curve-patch.bak`.
- SHA256 before: `d10ea2ec7d5444968c9cb442d5b00fe391d702f85f336cf37a5b164fcad64f9a`.
- SHA256 after: `474303f8a7b825485604943f572d573b5045eb10ab85fac76f224d92233f0eef`.
- Restore command: `python analysis-tools\growth_curve_patch.py restore`.

## 2026-05-28 11:10:20

- Applied growth-curve patch to `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe`.
- Patched `122` level requirement values across `8` growth tables.
- Requirement factor: `0.5`.
- Backup: `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-growth-curve-patch.bak`.
- SHA256 before: `474303f8a7b825485604943f572d573b5045eb10ab85fac76f224d92233f0eef`.
- SHA256 after: `4806f19c4ed1e6115ce316344a36faa445c5a0717397fa317b541391f17108d2`.
- Restore command: `python analysis-tools\growth_curve_patch.py restore`.

## 2026-05-30 23:41:39

- Applied encounter-rate patch to `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe`.
- Offset `0x13060c` changed from `1.5` to `0.05`.
- Backup: `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-encounter-rate-patch.bak`.
- SHA256 before: `eecb203048bb0ae121423fc26168d4f7353559ef9b3847087e72f44c702d87fb`.
- SHA256 after: `19de94d3e83cbb6e5cc2d4af2ea53d5594f9acb4404149bd752f8dc1bbd31f98`.
- Restore command: `python shendiao-graphics-fix\analysis-tools\encounter_rate_patch.py restore`.
