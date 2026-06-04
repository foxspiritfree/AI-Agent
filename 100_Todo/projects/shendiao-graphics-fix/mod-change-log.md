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

## 2026-05-30 23:54:49

- Restored encounter-rate patch from `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-encounter-rate-patch.bak`.
- SHA256 before restore: `19de94d3e83cbb6e5cc2d4af2ea53d5594f9acb4404149bd752f8dc1bbd31f98`.
- SHA256 after restore: `eecb203048bb0ae121423fc26168d4f7353559ef9b3847087e72f44c702d87fb`.

## 2026-05-30 23:55:17

- Applied encounter-rate patch (preset: `extreme`, factor: `0.05`) to `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe`.
- Re-routed `9` movement instruction address operands to VA `0x52fbcc`.
- Backup: `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-encounter-rate-patch.bak`.
- SHA256 before: `eecb203048bb0ae121423fc26168d4f7353559ef9b3847087e72f44c702d87fb`.
- SHA256 after: `8e8f26debc4a29872d1b0616bb311beb83444f419071186aa07b7cba24c6a541`.
- Restore command: `python shendiao-graphics-fix\analysis-tools\encounter_rate_patch.py restore`.

## 2026-05-31 00:41:50

- Applied growth-curve patch to `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe`.
- Patched `882` level requirement values across `8` growth tables.
- Requirement factor: `0.2`.
- Backup: `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-growth-curve-patch.bak`.
- SHA256 before: `3a2b843317bc9bfd1c72399b9020eef46128357607d48ff2c13155dd6672c4ed`.
- SHA256 after: `2036236a945be2396ae049107d65b9d583d1697d01a04888ca80ed565c317485`.
- Restore command: `python shendiao-graphics-fix\analysis-tools\growth_curve_patch.py restore`.

## 2026-06-01 01:30:11

- Applied TKB dialogue patch.
- Patched `5830` dialogue entries across `113` TKB database files.
- Backup directory: `C:\Users\join6\Games\ShenDiao-dgVoodoo\Data\tlk\backup`.
- Patched `Maze01.tkb`: `28` auto-advance entries updated to wait-for-click.
- Patched `Maze03.tkb`: `42` auto-advance entries updated to wait-for-click.
- Patched `Maze05.tkb`: `31` auto-advance entries updated to wait-for-click.
- Patched `Maze06.tkb`: `2` auto-advance entries updated to wait-for-click.
- Patched `Maze07.tkb`: `9` auto-advance entries updated to wait-for-click.
- Patched `Maze09.tkb`: `168` auto-advance entries updated to wait-for-click.
- Patched `Maze12.tkb`: `158` auto-advance entries updated to wait-for-click.
- Patched `Maze13.tkb`: `143` auto-advance entries updated to wait-for-click.
- Patched `Maze14.tkb`: `187` auto-advance entries updated to wait-for-click.
- Patched `Maze15.tkb`: `50` auto-advance entries updated to wait-for-click.
- Patched `Maze17.tkb`: `7` auto-advance entries updated to wait-for-click.
- Patched `Maze18.tkb`: `7` auto-advance entries updated to wait-for-click.
- Patched `Maze20.tkb`: `82` auto-advance entries updated to wait-for-click.
- Patched `Maze21.tkb`: `42` auto-advance entries updated to wait-for-click.
- Patched `Maze22.tkb`: `61` auto-advance entries updated to wait-for-click.
- Patched `SA01.tkb`: `63` auto-advance entries updated to wait-for-click.
- Patched `SA02.tkb`: `66` auto-advance entries updated to wait-for-click.
- Patched `SA03.tkb`: `64` auto-advance entries updated to wait-for-click.
- Patched `SA04.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SA05.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SA06.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SA07.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SA08.tkb`: `9` auto-advance entries updated to wait-for-click.
- Patched `SA09.tkb`: `34` auto-advance entries updated to wait-for-click.
- Patched `SA12.tkb`: `21` auto-advance entries updated to wait-for-click.
- Patched `SA13.tkb`: `2` auto-advance entries updated to wait-for-click.
- Patched `SA14.tkb`: `4` auto-advance entries updated to wait-for-click.
- Patched `SA15.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SA16.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SA20.tkb`: `20` auto-advance entries updated to wait-for-click.
- Patched `SB01.tkb`: `2` auto-advance entries updated to wait-for-click.
- Patched `SB02.tkb`: `3` auto-advance entries updated to wait-for-click.
- Patched `SB03.tkb`: `28` auto-advance entries updated to wait-for-click.
- Patched `SB04.tkb`: `29` auto-advance entries updated to wait-for-click.
- Patched `SB06.tkb`: `11` auto-advance entries updated to wait-for-click.
- Patched `SB10.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SB11.tkb`: `46` auto-advance entries updated to wait-for-click.
- Patched `SB12.tkb`: `40` auto-advance entries updated to wait-for-click.
- Patched `SC01.tkb`: `43` auto-advance entries updated to wait-for-click.
- Patched `SD01.tkb`: `88` auto-advance entries updated to wait-for-click.
- Patched `SD02.tkb`: `101` auto-advance entries updated to wait-for-click.
- Patched `SD03.tkb`: `86` auto-advance entries updated to wait-for-click.
- Patched `SD04.tkb`: `4` auto-advance entries updated to wait-for-click.
- Patched `SD05.tkb`: `46` auto-advance entries updated to wait-for-click.
- Patched `SD12.tkb`: `30` auto-advance entries updated to wait-for-click.
- Patched `SD13.tkb`: `18` auto-advance entries updated to wait-for-click.
- Patched `SD14.tkb`: `37` auto-advance entries updated to wait-for-click.
- Patched `SE01.tkb`: `89` auto-advance entries updated to wait-for-click.
- Patched `SE02.tkb`: `61` auto-advance entries updated to wait-for-click.
- Patched `SE03.tkb`: `35` auto-advance entries updated to wait-for-click.
- Patched `SE04.tkb`: `98` auto-advance entries updated to wait-for-click.
- Patched `SE05.tkb`: `24` auto-advance entries updated to wait-for-click.
- Patched `SE06.tkb`: `182` auto-advance entries updated to wait-for-click.
- Patched `SE07.tkb`: `257` auto-advance entries updated to wait-for-click.
- Patched `SE08.tkb`: `66` auto-advance entries updated to wait-for-click.
- Patched `SE10.tkb`: `42` auto-advance entries updated to wait-for-click.
- Patched `SE11.tkb`: `11` auto-advance entries updated to wait-for-click.
- Patched `SE15.tkb`: `34` auto-advance entries updated to wait-for-click.
- Patched `SE16.tkb`: `52` auto-advance entries updated to wait-for-click.
- Patched `SE17.tkb`: `36` auto-advance entries updated to wait-for-click.
- Patched `SE18.tkb`: `149` auto-advance entries updated to wait-for-click.
- Patched `SF01.tkb`: `83` auto-advance entries updated to wait-for-click.
- Patched `SF02.tkb`: `42` auto-advance entries updated to wait-for-click.
- Patched `SF03.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SF04.tkb`: `39` auto-advance entries updated to wait-for-click.
- Patched `SF05.tkb`: `2` auto-advance entries updated to wait-for-click.
- Patched `SF06.tkb`: `4` auto-advance entries updated to wait-for-click.
- Patched `SF07.tkb`: `11` auto-advance entries updated to wait-for-click.
- Patched `SF08.tkb`: `41` auto-advance entries updated to wait-for-click.
- Patched `SF09.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SF10.tkb`: `54` auto-advance entries updated to wait-for-click.
- Patched `SF11.tkb`: `24` auto-advance entries updated to wait-for-click.
- Patched `SI01.tkb`: `28` auto-advance entries updated to wait-for-click.
- Patched `SI02.tkb`: `112` auto-advance entries updated to wait-for-click.
- Patched `SI03.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SI04.tkb`: `2` auto-advance entries updated to wait-for-click.
- Patched `SI06.tkb`: `63` auto-advance entries updated to wait-for-click.
- Patched `SI07.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SI08.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SI09.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SI10.tkb`: `191` auto-advance entries updated to wait-for-click.
- Patched `SI11.tkb`: `13` auto-advance entries updated to wait-for-click.
- Patched `SI12.tkb`: `33` auto-advance entries updated to wait-for-click.
- Patched `SI13.tkb`: `83` auto-advance entries updated to wait-for-click.
- Patched `SJ01.tkb`: `196` auto-advance entries updated to wait-for-click.
- Patched `SJ02.tkb`: `71` auto-advance entries updated to wait-for-click.
- Patched `SJ03.tkb`: `158` auto-advance entries updated to wait-for-click.
- Patched `SJ04.tkb`: `43` auto-advance entries updated to wait-for-click.
- Patched `SJ06.tkb`: `2` auto-advance entries updated to wait-for-click.
- Patched `SK01.tkb`: `43` auto-advance entries updated to wait-for-click.
- Patched `SK02.tkb`: `70` auto-advance entries updated to wait-for-click.
- Patched `SK03.tkb`: `29` auto-advance entries updated to wait-for-click.
- Patched `SK04.tkb`: `2` auto-advance entries updated to wait-for-click.
- Patched `SK06.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SK07.tkb`: `5` auto-advance entries updated to wait-for-click.
- Patched `SL01.tkb`: `202` auto-advance entries updated to wait-for-click.
- Patched `SL03.tkb`: `53` auto-advance entries updated to wait-for-click.
- Patched `SL04.tkb`: `375` auto-advance entries updated to wait-for-click.
- Patched `SL05.tkb`: `5` auto-advance entries updated to wait-for-click.
- Patched `SL07.tkb`: `37` auto-advance entries updated to wait-for-click.
- Patched `SL08.tkb`: `32` auto-advance entries updated to wait-for-click.
- Patched `SL09.tkb`: `11` auto-advance entries updated to wait-for-click.
- Patched `SL10.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SL11.tkb`: `2` auto-advance entries updated to wait-for-click.
- Patched `SL12.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SL13.tkb`: `37` auto-advance entries updated to wait-for-click.
- Patched `SL14.tkb`: `16` auto-advance entries updated to wait-for-click.
- Patched `SM01.tkb`: `101` auto-advance entries updated to wait-for-click.
- Patched `SM02.tkb`: `17` auto-advance entries updated to wait-for-click.
- Patched `SM03.tkb`: `10` auto-advance entries updated to wait-for-click.
- Patched `SM04.tkb`: `109` auto-advance entries updated to wait-for-click.
- Patched `SM05.tkb`: `240` auto-advance entries updated to wait-for-click.
- Patched `SM06.tkb`: `75` auto-advance entries updated to wait-for-click.
- Restore command: `python shendiao-graphics-fix\analysis-tools\patch_tkb_dialogue.py restore`.

## 2026-06-01 01:40:08

- Restored TKB dialogue files from backup.
- Restored `113` database files from `C:\Users\join6\Games\ShenDiao-dgVoodoo\Data\tlk\backup`.

## 2026-06-01 17:45:54

- Restored dialogue_patch_v3 (which broke combat by changing a shared 10.0 constant to -1.0).
- Applied dialogue_patch_v4 (only speeds up text printing to 0.00022).

## 2026-06-01 17:59:18

- Applied encounter-rate patch (preset: `extreme`, high:1%, low:0%) to `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe`.
- Modifed offsets: `0xf7a6e` (high rate) and `0xf7a77` (low rate).
- Backup: `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-encounter-rate-patch.bak`.
- SHA256 before: `d3338af42b3facd4d23024793a5e5de02fc5701e795ef0bba3fb85f63176127c`.
- SHA256 after: `0cc39c53e57c1e967f49d03352c1a2360d492e8ee6530d0ea4358a467cae7f66`.
- Restore command: `python shendiao-graphics-fix\analysis-tools\encounter_rate_patch.py restore`.

## 2026-06-01 18:23:00

- Applied encounter-rate patch (preset: `none`, high:0%, low:0%) to `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe`.
- Modifed offsets: `0xf7a6e` (high rate) and `0xf7a77` (low rate).
- Backup: `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-encounter-rate-patch.bak`.
- SHA256 before: `0cc39c53e57c1e967f49d03352c1a2360d492e8ee6530d0ea4358a467cae7f66`.
- SHA256 after: `068a40513cd23f56db16fa2ccba731975b8ca120b8b45c39d53ae0f658bba77b`.
- Restore command: `python shendiao-graphics-fix\analysis-tools\encounter_rate_patch.py restore`.

## 2026-06-01 18:40:01

- Restored encounter-rate patch to original from `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-encounter-rate-patch.bak`.
- SHA256 before restore: `068a40513cd23f56db16fa2ccba731975b8ca120b8b45c39d53ae0f658bba77b`.
- SHA256 after restore: `eecb203048bb0ae121423fc26168d4f7353559ef9b3847087e72f44c702d87fb`.

## 2026-06-01 18:44:51

- Applied encounter-rate patch (preset: `extreme`, high:1%, low:0%) to `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe`.
- Modifed offsets: `0xf7a6e` (high rate) and `0xf7a77` (low rate).
- Backup: `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-encounter-rate-patch.bak`.
- SHA256 before: `28fc29f278e5eb20eccdb88a84ac5ce7f47d01bb95f6a13a8d605812162ca9be`.
- SHA256 after: `f34c0de95d797fcd8ee7a522d3913de8da2d270a09a7457027418bd72858bbad`.
- Restore command: `python shendiao-graphics-fix\analysis-tools\encounter_rate_patch.py restore`.

## 2026-06-01 20:29:26

- Applied encounter-rate patch (preset: `extreme`, high:1%, low:0%) to `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe`.
- Modifed offsets: `0xf7a6e` (high rate) and `0xf7a77` (low rate).
- Backup: `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-encounter-rate-patch.bak`.
- SHA256 before: `9933bbfa6b37cdfc8493fd0e6696b7e6f88bcf96a8de859b820ce429b09f9566`.
- SHA256 after: `0cc39c53e57c1e967f49d03352c1a2360d492e8ee6530d0ea4358a467cae7f66`.
- Restore command: `python shendiao-graphics-fix\analysis-tools\encounter_rate_patch.py restore`.

## 2026-06-01 20:29:34

- Applied growth-curve patch to `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe`.
- Patched `882` level requirement values across `8` growth tables.
- Requirement factor: `0.2`.
- Backup: `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-growth-curve-patch.bak`.
- SHA256 before: `0cc39c53e57c1e967f49d03352c1a2360d492e8ee6530d0ea4358a467cae7f66`.
- SHA256 after: `3168b539b6875aba10058cb6b27943463993b9cb12ed0dfc67a1fa60d0db68ee`.
- Restore command: `python shendiao-graphics-fix\analysis-tools\growth_curve_patch.py restore`.

## 2026-06-01 20:29:35

- Disabled Opening.avi to prevent unskippable intro during compatibility mode.
- Re-applied dialogue_patch_v4 (text speed: 0.00022).
- Re-applied encounter_rate_patch (preset: extreme).
- Re-applied growth_curve_patch (factor: 0.2).

## 2026-06-02 02:30:26

- Applied growth-curve patch to `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe`.
- Patched `882` level requirement values across `8` growth tables.
- Requirement factor: `0.2`.
- Backup: `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-growth-curve-patch.bak`.
- SHA256 before: `591c211eaac18c14e24d77a6dbe2cdb6f2670d6dc0fa760f019be63a12a7cfdd`.
- SHA256 after: `301f66766924e15e9c09b3a7069dad580ed87f8a545a1ce33e14162d395afe22`.
- Restore command: `python shendiao-graphics-fix\analysis-tools\growth_curve_patch.py restore`.

## 2026-06-02 02:30:28

- Applied encounter-rate patch (preset: `extreme`, high:1%, low:0%) to `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe`.
- Modifed offsets: `0xf7a6e` (high rate) and `0xf7a77` (low rate).
- Backup: `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-encounter-rate-patch.bak`.
- SHA256 before: `301f66766924e15e9c09b3a7069dad580ed87f8a545a1ce33e14162d395afe22`.
- SHA256 after: `6c8613cec0eba9bcce05da557298ff780b79078424e1431af9d64b02a7a97f59`.
- Restore command: `python shendiao-graphics-fix\analysis-tools\encounter_rate_patch.py restore`.

## 2026-06-02 11:32:58

- Applied TKB dialogue patch.
- Patched `5830` dialogue entries across `113` TKB database files.
- Backup directory: `C:\Users\join6\Games\ShenDiao-dgVoodoo\Data\tlk\backup`.
- Patched `Maze01.tkb`: `28` auto-advance entries updated to wait-for-click.
- Patched `Maze03.tkb`: `42` auto-advance entries updated to wait-for-click.
- Patched `Maze05.tkb`: `31` auto-advance entries updated to wait-for-click.
- Patched `Maze06.tkb`: `2` auto-advance entries updated to wait-for-click.
- Patched `Maze07.tkb`: `9` auto-advance entries updated to wait-for-click.
- Patched `Maze09.tkb`: `168` auto-advance entries updated to wait-for-click.
- Patched `Maze12.tkb`: `158` auto-advance entries updated to wait-for-click.
- Patched `Maze13.tkb`: `143` auto-advance entries updated to wait-for-click.
- Patched `Maze14.tkb`: `187` auto-advance entries updated to wait-for-click.
- Patched `Maze15.tkb`: `50` auto-advance entries updated to wait-for-click.
- Patched `Maze17.tkb`: `7` auto-advance entries updated to wait-for-click.
- Patched `Maze18.tkb`: `7` auto-advance entries updated to wait-for-click.
- Patched `Maze20.tkb`: `82` auto-advance entries updated to wait-for-click.
- Patched `Maze21.tkb`: `42` auto-advance entries updated to wait-for-click.
- Patched `Maze22.tkb`: `61` auto-advance entries updated to wait-for-click.
- Patched `SA01.tkb`: `63` auto-advance entries updated to wait-for-click.
- Patched `SA02.tkb`: `66` auto-advance entries updated to wait-for-click.
- Patched `SA03.tkb`: `64` auto-advance entries updated to wait-for-click.
- Patched `SA04.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SA05.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SA06.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SA07.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SA08.tkb`: `9` auto-advance entries updated to wait-for-click.
- Patched `SA09.tkb`: `34` auto-advance entries updated to wait-for-click.
- Patched `SA12.tkb`: `21` auto-advance entries updated to wait-for-click.
- Patched `SA13.tkb`: `2` auto-advance entries updated to wait-for-click.
- Patched `SA14.tkb`: `4` auto-advance entries updated to wait-for-click.
- Patched `SA15.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SA16.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SA20.tkb`: `20` auto-advance entries updated to wait-for-click.
- Patched `SB01.tkb`: `2` auto-advance entries updated to wait-for-click.
- Patched `SB02.tkb`: `3` auto-advance entries updated to wait-for-click.
- Patched `SB03.tkb`: `28` auto-advance entries updated to wait-for-click.
- Patched `SB04.tkb`: `29` auto-advance entries updated to wait-for-click.
- Patched `SB06.tkb`: `11` auto-advance entries updated to wait-for-click.
- Patched `SB10.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SB11.tkb`: `46` auto-advance entries updated to wait-for-click.
- Patched `SB12.tkb`: `40` auto-advance entries updated to wait-for-click.
- Patched `SC01.tkb`: `43` auto-advance entries updated to wait-for-click.
- Patched `SD01.tkb`: `88` auto-advance entries updated to wait-for-click.
- Patched `SD02.tkb`: `101` auto-advance entries updated to wait-for-click.
- Patched `SD03.tkb`: `86` auto-advance entries updated to wait-for-click.
- Patched `SD04.tkb`: `4` auto-advance entries updated to wait-for-click.
- Patched `SD05.tkb`: `46` auto-advance entries updated to wait-for-click.
- Patched `SD12.tkb`: `30` auto-advance entries updated to wait-for-click.
- Patched `SD13.tkb`: `18` auto-advance entries updated to wait-for-click.
- Patched `SD14.tkb`: `37` auto-advance entries updated to wait-for-click.
- Patched `SE01.tkb`: `89` auto-advance entries updated to wait-for-click.
- Patched `SE02.tkb`: `61` auto-advance entries updated to wait-for-click.
- Patched `SE03.tkb`: `35` auto-advance entries updated to wait-for-click.
- Patched `SE04.tkb`: `98` auto-advance entries updated to wait-for-click.
- Patched `SE05.tkb`: `24` auto-advance entries updated to wait-for-click.
- Patched `SE06.tkb`: `182` auto-advance entries updated to wait-for-click.
- Patched `SE07.tkb`: `257` auto-advance entries updated to wait-for-click.
- Patched `SE08.tkb`: `66` auto-advance entries updated to wait-for-click.
- Patched `SE10.tkb`: `42` auto-advance entries updated to wait-for-click.
- Patched `SE11.tkb`: `11` auto-advance entries updated to wait-for-click.
- Patched `SE15.tkb`: `34` auto-advance entries updated to wait-for-click.
- Patched `SE16.tkb`: `52` auto-advance entries updated to wait-for-click.
- Patched `SE17.tkb`: `36` auto-advance entries updated to wait-for-click.
- Patched `SE18.tkb`: `149` auto-advance entries updated to wait-for-click.
- Patched `SF01.tkb`: `83` auto-advance entries updated to wait-for-click.
- Patched `SF02.tkb`: `42` auto-advance entries updated to wait-for-click.
- Patched `SF03.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SF04.tkb`: `39` auto-advance entries updated to wait-for-click.
- Patched `SF05.tkb`: `2` auto-advance entries updated to wait-for-click.
- Patched `SF06.tkb`: `4` auto-advance entries updated to wait-for-click.
- Patched `SF07.tkb`: `11` auto-advance entries updated to wait-for-click.
- Patched `SF08.tkb`: `41` auto-advance entries updated to wait-for-click.
- Patched `SF09.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SF10.tkb`: `54` auto-advance entries updated to wait-for-click.
- Patched `SF11.tkb`: `24` auto-advance entries updated to wait-for-click.
- Patched `SI01.tkb`: `28` auto-advance entries updated to wait-for-click.
- Patched `SI02.tkb`: `112` auto-advance entries updated to wait-for-click.
- Patched `SI03.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SI04.tkb`: `2` auto-advance entries updated to wait-for-click.
- Patched `SI06.tkb`: `63` auto-advance entries updated to wait-for-click.
- Patched `SI07.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SI08.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SI09.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SI10.tkb`: `191` auto-advance entries updated to wait-for-click.
- Patched `SI11.tkb`: `13` auto-advance entries updated to wait-for-click.
- Patched `SI12.tkb`: `33` auto-advance entries updated to wait-for-click.
- Patched `SI13.tkb`: `83` auto-advance entries updated to wait-for-click.
- Patched `SJ01.tkb`: `196` auto-advance entries updated to wait-for-click.
- Patched `SJ02.tkb`: `71` auto-advance entries updated to wait-for-click.
- Patched `SJ03.tkb`: `158` auto-advance entries updated to wait-for-click.
- Patched `SJ04.tkb`: `43` auto-advance entries updated to wait-for-click.
- Patched `SJ06.tkb`: `2` auto-advance entries updated to wait-for-click.
- Patched `SK01.tkb`: `43` auto-advance entries updated to wait-for-click.
- Patched `SK02.tkb`: `70` auto-advance entries updated to wait-for-click.
- Patched `SK03.tkb`: `29` auto-advance entries updated to wait-for-click.
- Patched `SK04.tkb`: `2` auto-advance entries updated to wait-for-click.
- Patched `SK06.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SK07.tkb`: `5` auto-advance entries updated to wait-for-click.
- Patched `SL01.tkb`: `202` auto-advance entries updated to wait-for-click.
- Patched `SL03.tkb`: `53` auto-advance entries updated to wait-for-click.
- Patched `SL04.tkb`: `375` auto-advance entries updated to wait-for-click.
- Patched `SL05.tkb`: `5` auto-advance entries updated to wait-for-click.
- Patched `SL07.tkb`: `37` auto-advance entries updated to wait-for-click.
- Patched `SL08.tkb`: `32` auto-advance entries updated to wait-for-click.
- Patched `SL09.tkb`: `11` auto-advance entries updated to wait-for-click.
- Patched `SL10.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SL11.tkb`: `2` auto-advance entries updated to wait-for-click.
- Patched `SL12.tkb`: `1` auto-advance entries updated to wait-for-click.
- Patched `SL13.tkb`: `37` auto-advance entries updated to wait-for-click.
- Patched `SL14.tkb`: `16` auto-advance entries updated to wait-for-click.
- Patched `SM01.tkb`: `101` auto-advance entries updated to wait-for-click.
- Patched `SM02.tkb`: `17` auto-advance entries updated to wait-for-click.
- Patched `SM03.tkb`: `10` auto-advance entries updated to wait-for-click.
- Patched `SM04.tkb`: `109` auto-advance entries updated to wait-for-click.
- Patched `SM05.tkb`: `240` auto-advance entries updated to wait-for-click.
- Patched `SM06.tkb`: `75` auto-advance entries updated to wait-for-click.
- Restore command: `python shendiao-graphics-fix\analysis-tools\patch_tkb_dialogue.py restore`.

## 2026-06-02 11:37:38

- Restored TKB dialogue files from backup.
- Restored `113` database files from `C:\Users\join6\Games\ShenDiao-dgVoodoo\Data\tlk\backup`.

## 2026-06-02 15:52:00

- Created and compiled 32-bit DirectInput debounce proxy DLL (`dinput.dll`).
- Source directory: `shendiao-graphics-fix\analysis-tools\dinput-debounce\`.
- Targets DirectInput 7 `DirectInputCreateA` and implements a COM VTable Hook on `IDirectInputDeviceA::GetDeviceState` (index 9) for mouse clicks.
- Filter window: `350ms` (completely filters out rapid dialogue skipping caused by `.ato` script engine's high CPU polling rate in cutscenes).
- Deployed proxy DLL to `C:\Users\join6\Games\ShenDiao-dgVoodoo\dinput.dll`.

## 2026-06-02 15:56:00

- Re-compiled and updated `dinput.dll` with an advanced **GetKeyState IAT Hook**.
- **Diagnostic Finding**: Analyzed `dinput_hook.log` and discovered `ShenDiao.exe` does not create a DirectInput mouse device (`GUID_SysMouse`). Instead, `.ato` script engine directly polls **`user32.dll -> GetKeyState`** (which was verified to be imported by the EXE) to detect mouse clicks.
- **Solution**: Implemented an Import Address Table (IAT) Hook on `user32.dll -> GetKeyState` within the proxy DLL. It intercepts all `GetKeyState(VK_LBUTTON)` calls, enforcing a **350ms debounce filter** directly at the Win32 API level.
- Deployed updated DLL to `C:\Users\join6\Games\ShenDiao-dgVoodoo\dinput.dll`.

## 2026-06-02 15:59:00

- Upgraded and re-compiled `dinput.dll` to support **Global Trampoline Inline Hooks** on both `GetKeyState` and `GetAsyncKeyState`.
- **Diagnostic Finding**: IAT Hook on `GetKeyState` inside `ShenDiao.exe` succeeded, but dialogue skipping remained unchanged. This suggests the `.ato` script engine or input check resides in a separate engine DLL (such as `IFC21.dll`) or utilizes `GetAsyncKeyState` dynamically.
- **Solution**: Designed an x86 32-bit API Trampoline Hook (5-byte API prologue override). It hooks `GetKeyState` and `GetAsyncKeyState` inside `user32.dll` globally at the memory entry point. Every thread or DLL within the process querying `VK_LBUTTON` is now intercepted and filtered with a **350ms debounce threshold**.
- Deployed updated DLL to `C:\Users\join6\Games\ShenDiao-dgVoodoo\dinput.dll`.

## 2026-06-02 16:01:00

- Final Major Upgrade: Added **Win32 PeekMessageA Inline Hook with Active Release Pulse Injection** to `dinput.dll`.
- **Diagnostic Finding**: Global Inline Hooks on `GetKeyState`/`GetAsyncKeyState` both succeeded, but dialogue skipping persisted. This proves the game does NOT rely on state polling. Instead, it relies on standard **Win32 Message Loops (`PeekMessageA`)** which was verified to be heavily used by the EXE. When a click occurs, a `WM_LBUTTONDOWN` is caught. On high-frequency modern CPUs, the next dialogue line loads in microseconds, before the physical `WM_LBUTTONUP` (release) is sent by Windows, leading the game's internal WndProc state variable to remain "pressed" and skip all subsequent dialogues instantly.
- **Solution**: Implemented an Inline Hook on `user32.dll -> PeekMessageA`. 
  1. Intercepts all `WM_LBUTTONDOWN` messages and filters them with a **350ms debounce window**.
  2. Actively injects a fabricated **`WM_LBUTTONUP` (release) pulse 15ms after a successful click**. This forces the game's internal window procedure to reset its state, completely resolving state-holding skipping.
- Deployed final DLL to `C:\Users\join6\Games\ShenDiao-dgVoodoo\dinput.dll`.

## 2026-06-02 16:04:00

- Upgraded and re-compiled `dinput.dll` with a **QPC-based CPU Rate Limiter** and a refined **150ms Mouse Debounce**.
- **Diagnostic Finding**: Active release pulse injection in PeekMessageA caused the dialogue UI to become extremely hard to click, but automatic cutscene dialogue still skipped instantly. This indicates that the automatic text skipping is NOT mouse-driven, but rather caused by **excessive CPU loop rate in the .ato script engine**, causing timer-based automatic skip loops to expire in microseconds instead of seconds.
- **Solution**: 
  1. Implemented a high-precision QueryPerformanceCounter (QPC) CPU frame/loop rate limiter inside the `PeekMessageA` Hook. If the game's message loop queries at an interval of less than `2.0ms` (exceeding 500 FPS), a `Sleep(1)` is actively injected to force CPU thread yielding. This naturally slows the script engine's tick rate back to 2001-era levels.
  2. Removed the active release pulse injection (which corrupted the UI message loop) and refined the click debounce threshold from `350ms` down to a highly responsive and fluid `150ms`.
- Deployed updated DLL to `C:\Users\join6\Games\ShenDiao-dgVoodoo\dinput.dll`.

## 2026-06-02 16:05:00

- Restored all proxy DLL changes due to persistent dialogue skipping issue.
- **Action**: Completely removed `dinput.dll` and `dinput_hook.log` from `C:\Users\join6\Games\ShenDiao-dgVoodoo\`.
- **Result**: The game is 100% restored to vanilla. All compiled C++ source codes, .def definitions, and batch scripts are safely archived in `shendiao-graphics-fix\analysis-tools\dinput-debounce\` for future reference.

## 2026-06-02 16:16:07

- Applied spells-limit patch to `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe`.
- Increased max visible spells from 7 to 12.
- Patched 4 locations in total.
- Backup: `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-spells-limit-patch.bak`.
- SHA256 before: `3d5b26a990173c681a5f1535a63a785b84b5784fced032ab508a7a30d713bddc`.
- SHA256 after: `6036b190048a1868830acf01d38c7d195a77f4382728be27c2b9a51b34546055`.
- Restore command: `python shendiao-graphics-fix\analysis-tools\spells_limit_patch.py restore`.

## 2026-06-02 16:20:16

- Applied equipped-items description patch to `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe`.
- Intercepted UI stricmp at `0xf0592` and routed to Cave Code at `0x12e900`.
- Enabled description display for equipped armors/weapons starting with 'C_If'.
- Backup: `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-equip-desc-patch.bak`.
- SHA256 before: `6036b190048a1868830acf01d38c7d195a77f4382728be27c2b9a51b34546055`.
- SHA256 after: `d4c0e50a7bc4a374b57e7226962671e5c812a24be1ab323ca74cfa581d761a38`.
- Restore command: `python shendiao-graphics-fix\analysis-tools\equip_desc_patch.py restore`.

## 2026-06-02 16:20:19

- Restored spells-limit patch from `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-spells-limit-patch.bak`.
- SHA256 before restore: `d4c0e50a7bc4a374b57e7226962671e5c812a24be1ab323ca74cfa581d761a38`.
- SHA256 after restore: `3d5b26a990173c681a5f1535a63a785b84b5784fced032ab508a7a30d713bddc`.

## 2026-06-02 16:20:26

- Applied equipped-items description patch to `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe`.
- Intercepted UI stricmp at `0xf0592` and routed to Cave Code at `0x12e900`.
- Enabled description display for equipped armors/weapons starting with 'C_If'.
- Backup: `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-equip-desc-patch.bak`.
- SHA256 before: `3d5b26a990173c681a5f1535a63a785b84b5784fced032ab508a7a30d713bddc`.
- SHA256 after: `815a0b15102877b8ccb04d14f7602f6ff13e57e4e543df7303584cf302c6faba`.
- Restore command: `python shendiao-graphics-fix\analysis-tools\equip_desc_patch.py restore`.

## 2026-06-02 20:14:31

- Applied growth-curve patch to `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe`.
- Patched `882` level requirement values across `8` growth tables.
- Requirement factor: `0.6`.
- Backup: `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-growth-curve-patch.bak`.
- SHA256 before: `591c211eaac18c14e24d77a6dbe2cdb6f2670d6dc0fa760f019be63a12a7cfdd`.
- SHA256 after: `e9b2a70fb115403753bf594ac614264a25a35b6d9689bd25696a1418989e508a`.
- Restore command: `python analysis-tools\growth_curve_patch.py restore`.

## 2026-06-02 20:18:08

- Applied growth-curve patch to `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe`.
- Patched `882` level requirement values across `8` growth tables.
- Requirement factor: `0.5`.
- Backup: `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-growth-curve-patch.bak`.
- SHA256 before: `e9b2a70fb115403753bf594ac614264a25a35b6d9689bd25696a1418989e508a`.
- SHA256 after: `e26fd49462f09a91bf6139c64430ad343d261c442efc7161cd013be1c37c9708`.
- Restore command: `python analysis-tools\growth_curve_patch.py restore`.

## 2026-06-02 20:30:20

- Applied growth-curve patch to `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe`.
- Patched `882` level requirement values across `8` growth tables.
- Requirement factor: `0.2`.
- Backup: `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-growth-curve-patch.bak`.
- SHA256 before: `e26fd49462f09a91bf6139c64430ad343d261c442efc7161cd013be1c37c9708`.
- SHA256 after: `a4375aa4baf15fe56dc2dd411731225234ea40024e509027decbbdac77cf5bc8`.
- Restore command: `python analysis-tools\growth_curve_patch.py restore`.

## 2026-06-02 20:31:39

- Applied encounter-rate patch to `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe`.
- Offset `0x13060c` changed from `1.5` to `0.5`.
- Backup: `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-encounter-rate-patch.bak`.
- SHA256 before: `a4375aa4baf15fe56dc2dd411731225234ea40024e509027decbbdac77cf5bc8`.
- SHA256 after: `172bfe8263e02945e044779212af44fb6d86365764dd22bae4b5f3ee76d847b7`.
- Restore command: `python analysis-tools\encounter_rate_patch.py restore`.

## 2026-06-02 22:45:58

- Applied growth-curve patch to `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe`.
- Patched `882` level requirement values across `8` growth tables.
- Requirement factor: `0.7`.
- Backup: `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-growth-curve-patch.bak`.
- SHA256 before: `8f792659fadc1f4011db917d294811bb50bd8dc148c7ff98b2fc0385c59e1420`.
- SHA256 after: `6dac7199504abbe3dddc50e684a7f5fd63d37e47f4851f3dd6e85e7bb5314c5d`.
- Restore command: `python analysis-tools\growth_curve_patch.py restore`.

## 2026-06-02 22:58:16

- Applied growth-curve patch to `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe`.
- Patched `882` level requirement values across `8` growth tables.
- Requirement factor: `0.2`.
- Backup: `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-growth-curve-patch.bak`.
- SHA256 before: `6dac7199504abbe3dddc50e684a7f5fd63d37e47f4851f3dd6e85e7bb5314c5d`.
- SHA256 after: `8f792659fadc1f4011db917d294811bb50bd8dc148c7ff98b2fc0385c59e1420`.
- Restore command: `python analysis-tools\growth_curve_patch.py restore`.

## 2026-06-02 23:17:10

- Applied growth-curve patch to `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe`.
- Patched `882` level requirement values across `8` growth tables.
- Requirement factor: `0.6`.
- Backup: `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-growth-curve-patch.bak`.
- SHA256 before: `8f792659fadc1f4011db917d294811bb50bd8dc148c7ff98b2fc0385c59e1420`.
- SHA256 after: `71d5e34e281f06b2f5b146bab2d7778819d0f6f6414f26d5a076d9a832e8c5c6`.
- Restore command: `python analysis-tools\growth_curve_patch.py restore`.

## 2026-06-02 23:26:10

- Applied growth-curve patch to `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe`.
- Patched `882` level requirement values across `8` growth tables.
- Requirement factor: `0.2`.
- Backup: `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-growth-curve-patch.bak`.
- SHA256 before: `71d5e34e281f06b2f5b146bab2d7778819d0f6f6414f26d5a076d9a832e8c5c6`.
- SHA256 after: `8f792659fadc1f4011db917d294811bb50bd8dc148c7ff98b2fc0385c59e1420`.
- Restore command: `python analysis-tools\growth_curve_patch.py restore`.
