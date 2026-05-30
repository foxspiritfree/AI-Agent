# 新神鵰俠侶資料檔改造計畫

## 目標

降低練功時間，讓遊玩重心回到劇情、探索與事件體驗。

本輪只處理：

- 降低隨機遇敵帶來的中斷感。
- 降低前期與一般戰鬥的練功需求。
- 儘量保留 Boss 戰、劇情戰與原始遊戲節奏。

## 推薦方向

先做「遇敵率降低 + 成長效率提升」。

理由：比直接大幅削弱敵人更不容易破壞劇情戰，也比較符合「少練功」而不是「無腦秒殺」。

## 非目標

- 不再製作攻略、迷宮圖、系統說明或小遊戲筆記。
- 本輪不處理對話誤點。
- 本輪不處理戰鬥音樂循環。
- 不做修改器、常駐外掛、AutoHotkey、記憶體注入。
- 不直接改原始 `C:\Program Files (x86)\ShenDiao` 安裝目錄。

## 工作目錄

測試副本：

`C:\Users\join6\Games\ShenDiao-dgVoodoo`

追蹤目錄：

`C:\Users\join6\AI-Agent\100_Todo\projects\shendiao-graphics-fix`

## 可能可改的資料區

| 類型 | 候選位置 | 目的 |
| --- | --- | --- |
| 場景 / 遇敵 | `Data\scenes\*.scn`, `Data\scenes\*.joe`, `Data\tlk\*.tkb` | 找出隨機遇敵率、敵人組合、場景事件 |
| 戰鬥 / 敵人 | `Data\Creature\*.lbc`, `Data\Creature\*.lss` | 找出敵人數值、戰鬥單位、掉落或動作資料 |
| 音樂表 | `Data\automuc.txt`, `Data\audio\Battle*.wav` | 先記錄，不列入本輪 |
| 存檔 | `Data\save\*.sav` | 只作分析，不作為主要改法 |

## 實作階段

### Phase 1：格式偵測

目的：找出遇敵率與戰鬥數值到底在哪些檔案。

動作：

- 建立資料檔索引。
- 比較 `scn / joe / tkb / lbc / lss` 的檔案大小與二進位結構。
- 搜尋可能的數值表、敵人 ID、場景 ID、音樂 ID。
- 先做只讀分析，不改遊戲。

完成條件：

- 至少提出 1 個遇敵率候選檔。
- 至少提出 1 個戰鬥平衡候選檔。
- 建立可回滾備份流程。

### Phase 2：低風險遇敵率測試

目的：先減少路上被打斷的頻率。

目前方案：

1. 已定位 `ShenDiao.exe` 的走路遇敵累積常數。
2. 只修改測試副本：`C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe`。
3. 將 file offset `0x13060c` 的 float 從 `1.5` 改成 `0.5`。
4. 預期效果是遇敵累積速度約降為原本三分之一。

完成條件：

- 同一段路線來回測試，遇敵明顯下降。
- 劇情觸發、場景切換、Boss 戰不受影響。

回滾：

`python analysis-tools\encounter_rate_patch.py restore`

### Phase 3：降低練功需求

目的：讓玩家不必花大量時間刷怪。

目前方案：

1. 已定位 `ShenDiao.exe` 內的角色成長表。
2. 每級資料為 7 個整數，第一欄是升級需求。
3. 已將 7 組成長表的升級需求減半。
4. HP / MP / 攻防等成長值不變，避免直接破壞戰鬥平衡。

建議幅度：

| 項目 | 第一版測試值 |
| --- | --- |
| 遇敵率 | 累積速度從 `1.5` 降到 `0.5` |
| 升級需求 | 原本的 50% |
| HP / MP / 攻防成長 | 不改 |
| 一般敵人 HP / 攻擊 | 不改 |

完成條件：

- 前期不需要刻意刷怪也能推進。
- 一般戰鬥時間縮短。
- Boss 戰仍需要正常操作，不變成無腦通過。

回滾：

`python analysis-tools\growth_curve_patch.py restore`

### Phase 4：封裝與回滾

目的：把修改變成可套用、可撤回的方案。

交付：

- `mods\reduced-grind\`：修改後檔案。
- `mods\reduced-grind\backup\`：原始檔備份。
- `APPLY_REDUCED_GRIND.cmd`：套用。
- `RESTORE_REDUCED_GRIND.cmd`：還原。
- `mod-change-log.md`：紀錄改了哪些檔案與數值。

## 驗收標準

- 使用目前存檔可正常讀取。
- 圖形修復仍使用 `START_1280x960_PERFORMANCE.cmd`。
- 連續遊玩 30 分鐘不閃退。
- 一般路線遇敵頻率明顯降低。
- 不刻意練功也能順推前期。
- 可一鍵還原到修改前狀態。

## 暫停項目

| 項目 | 原因 |
| --- | --- |
| 對話誤點 | 可能需要輸入判定或 exe 層修正，與降低練功目標無關 |
| 戰鬥音樂循環 | 可能可從 `automuc.txt` 或音訊播放邏輯處理，但本輪先不做 |
| 攻略 / 迷宮 / 小遊戲筆記 | 使用者已決定不做 |
