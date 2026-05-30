# 資料檔 Mod 測試矩陣

## 目前穩定基準

啟動方式：

`C:\Users\join6\Games\ShenDiao-dgVoodoo\START_1280x960_PERFORMANCE.cmd`

## 測試規則

- 每次只改一類資料。
- 修改前先備份原檔。
- 測試使用目前舊存檔。
- 若讀檔失敗、劇情卡住、Boss 不觸發，立即還原。

## Phase 1：資料檔定位

| 測試 ID | 目標 | 檔案候選 | 方法 | 結果 |
| --- | --- | --- | --- | --- |
| R-001 | 找遇敵率 | `Data\scenes\*.scn`, `*.joe`, `Data\tlk\*.tkb` | 二進位結構與差異分析 | 待測 |
| R-002 | 找經驗 / 金錢 | `Data\Creature\*.lbc`, `*.lss`, 場景 / 戰鬥資料 | 搜尋數值表與敵人 ID 關聯 | 待測 |
| R-003 | 找一般敵人數值 | `Data\Creature\*.lbc`, `*.lss` | 比較敵人檔案與數值模式 | 待測 |
| R-004 | 找場景事件 / 觸發 | `Data\auto\*.ato` | token 與 offset 掃描 | 高價值候選，需解析 record |
| R-005 | 找 exe 戰鬥硬編碼 | `ShenDiao.exe` | 只讀字串抽取 | 發現 `FIGHT`、`EnemyF01`、`LEVELUP`、`rand` |
| R-006 | 找固定戰鬥配置 | `Data\auto\*.ato` | record token 掃描 | `SL14.ato` 有 `B037/B019/B018/B038` 類敵人 token |
| R-007 | 找經驗加總 | `ShenDiao.exe` | `LEVELUP` / UI 字串引用追蹤 | `LEVELUP` 是 UI 訊息，不是經驗加總 |

## Phase 2：候選修改

| 測試 ID | 修改 | 預期效果 | 驗收 |
| --- | --- | --- | --- |
| M-001 | 遇敵率 50% | 路上戰鬥減半 | 場景切換與劇情正常 |
| M-002 | 升級需求 50% | 少刷怪也能推進 | Boss 不失衡 |
| M-003 | 一般敵人 HP 80% | 一般戰鬥更快 | 不影響劇情戰 |

## 已套用測試補丁

| 補丁 | 檔案 | 修改 | 還原 |
| --- | --- | --- | --- |
| Encounter rate v1 | `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe` | offset `0x13060c` float `1.5 -> 0.5` | `python analysis-tools\encounter_rate_patch.py restore` |
| Growth curve v1 | `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe` | 7 組成長表，升級需求減半 | `python analysis-tools\growth_curve_patch.py restore` |

## 下一個驗證點

測 Encounter rate v1 + Growth curve v1。重點看前期是否不用刻意刷怪也能推進，以及升級後角色數值是否正常增加。

## 回歸測試

| 項目 | 標準 | 結果 |
| --- | --- | --- |
| 讀取舊存檔 | 可正常進入 | 待測 |
| 圖形 wrapper | 人物穩定顯示 | 待測 |
| 一般戰鬥 | 可正常開始與結束 | 待測 |
| 劇情戰 | 可正常觸發 | 待測 |
| 30 分鐘穩定性 | 不閃退 | 待測 |
