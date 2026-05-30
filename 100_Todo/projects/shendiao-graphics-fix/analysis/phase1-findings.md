# Phase 1 只讀分析紀錄

## 目前結論

第一輪只讀掃描已完成，尚未修改遊戲資料。

目前最有價值的候選不是攻略檔，而是：

1. `Data\auto\*.ato`
2. `Data\scenes\*.scn` / `*.joe`
3. `ShenDiao.exe` 內的戰鬥相關字串與硬編碼 ID

## 已產出報表

| 檔案 | 用途 |
| --- | --- |
| `analysis\data-file-index.csv` | Data 目錄候選檔索引 |
| `analysis\auto_ato_offsets.csv` | `.ato` 固定 offset 小整數分析 |
| `analysis\auto_ato_tokens.csv` | `.ato` 內 ASCII token 與前置小整數 |
| `analysis\scene_scn_offsets.csv` | `.scn` 固定 offset 小整數分析 |
| `analysis\creature_lbc_offsets.csv` | `.lbc` 固定 offset 小整數分析 |
| `analysis\keyword_strings.csv` | 全資料與 exe 關鍵字字串抽取 |

## 檔案判斷

### `Data\auto\*.ato`

判斷：高價值候選。

理由：

- 命名與場景 / 迷宮對應，例如 `MAZE01.ato`、`SA01.ato`。
- 內含 `LOCATE`、`CAMERA`、`play`、音效檔名、場景物件 ID。
- 檔案開頭像記錄數量，後續由可變長事件記錄組成。

可能用途：

- 場景觸發點。
- 自動事件。
- 劇情戰 / 場景戰觸發。
- 音效與物件狀態。

目前限制：

- 尚未看到明確的 `fight`、`battle`、經驗、金錢欄位。
- 若隨機遇敵是 exe timer / RNG 控制，`.ato` 可能只管固定事件。

### `Data\scenes\*.joe`

判斷：低風險可讀候選，但不像戰鬥獎勵。

理由：

- 明文格式，例如 `exp015a1 11 102.5`。
- 這裡的 `exp` 比較像場景物件名稱，不是經驗值。
- 數值像物件角度 / 座標 / 場景引用。

### `Data\Creature\*.lbc`

判斷：偏模型 / 骨架 / 動作資料，不像敵人數值表。

理由：

- 檔頭為 `LBC`。
- 內含 `_offset`、`_exp` 等節點名稱。
- `_exp` 位置附近是模型節點與浮點資料，不像經驗值。

### `ShenDiao.exe`

判斷：高價值，但本輪先只讀。

已見字串：

- `rand`
- `srand`
- `FIGHT`
- `A_GameStageSitFight`
- `EnemyF01`
- `LEVELUP`
- `HPFull`
- `MPFull`
- `FullDefence`
- `APFull`
- 敵人 / 模型 ID：`B013`、`B042`、`B046`、`B024` 到 `B032` 等

推論：

- 戰鬥流程與部分敵人組合可能在 exe 裡。
- 經驗 / 金錢 / 遇敵率若找不到資料檔，可能需要 exe 層定位。

## 本輪推薦

下一步先測遇敵率補丁。

理由：`.ato` 偏固定事件；真正的隨機遇敵線索已定位到 `ShenDiao.exe` 的走路遇敵累積邏輯。

## 下一步工作

1. 建立 `.ato` record parser，先解出記錄邊界與 token 所屬 record。
2. 針對有大量 `MAZE*.ato` 的迷宮場景，比對常見 record type。
3. 找出是否存在固定戰鬥 / 隨機事件 record。
4. 若 `.ato` 沒有遇敵，轉向 `ShenDiao.exe` 只讀定位，不急著改 exe。

## `.ato` record 初步解析

新增報表：

| 檔案 | 用途 |
| --- | --- |
| `analysis\auto_ato_record_candidates.csv` | 掃描疑似 `opcode + size + payload` 的 record |

目前可確認的 record 型態：

| opcode | size | 判斷 |
| --- | --- | --- |
| 28 | 16 | 物件 / 角色 / 攝影機 token 引用，例如 `SM001002`、`CAM002`、`B037` |
| 24 | 32 | 音效 token 引用，例如 `WIND06` |
| 25 | 4 | 小型旗標或布林值 |
| 22 | 48 | 可能是座標 / 位置 / 觸發區資料 |

值得注意：

- `SL14.ato` 中出現 `M005`、`M003`、`B037`、`B019`、`B018`、`B038`，這比較像固定戰鬥或劇情角色配置。
- 大量迷宮 `.ato` 內有 `SM`、`SB`、`SE` token，但多數像場景物件，不一定是敵人。

目前判斷：

- `.ato` 很可能可以改固定事件或固定戰鬥角色。
- 隨機遇敵率尚未定位。
- 若目標是「少練功」，比起改 `.ato` 固定事件，下一步更應找 `rand` / `FIGHT` 如何讀取場景或敵人資料。

## 遇敵率定位

`rand()` 呼叫點掃描後，最有價值的是 `0x4d40c9` 到 `0x4d44fa` 附近。

判斷：

- 這段會累積兩個 float 狀態：物件 offset `0x768` 與 `0x76c`。
- 內含上限常數 `100.0` 與 `400.0`。
- 內含 `rand() % 3`、`rand() % 10` 判定。
- 回傳前會寫入戰鬥類型 `1/2/3/4`，很像路上遇敵觸發。
- 常數 `0x53060c = 1.5` 參與走路累積，適合做第一版低風險降頻測試。

已套用測試：

- `C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe`
- file offset `0x13060c`
- float `1.5 -> 0.5`
- 備份：`C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-encounter-rate-patch.bak`

## 經驗 / 金錢定位

目前沒有找到可直接修改的資料表。

已排除：

- `Data\Creature\*.lbc` / `*.lss`：偏模型、骨架、動作資料。
- `Data\scenes\*.joe`：明文 `exp...` 比較像場景物件名稱。
- `Data\auto\*.ato`：高機率是場景事件、音效、物件、固定戰鬥配置，不像一般戰鬥獎勵表。
- `LEVELUP` 字串引用：定位到 UI 訊息佇列，不是經驗加總邏輯。

目前判斷：

- 經驗 / 金錢很可能在 `ShenDiao.exe` 的戰鬥結算或角色資料結構內。
- 這部分不適合在尚未定位加總點前直接補丁，避免造成角色數值、劇情戰或存檔格式異常。

## 成長曲線定位

已定位角色成長表：

- VA：`0x57a218`
- file offset：`0x17a218`
- 每級資料大小：`0x1c`
- 每組成長表大小：`0xad4`
- 已識別成長表數量：8 組

每級資料目前判斷為 7 個整數，第一欄是升級需求，後 6 欄是 HP / MP / 攻防等成長數值。

已套用測試：

- 只修改第一欄升級需求。
- 補丁幅度：`50%`
- 前 10 級需求由 `60,120,220,340,540,900,1260,1710,2160,2960` 變成 `30,60,110,170,270,450,630,855,1080,1480`。
- 2026-05-28 修正：新局 / 初始狀態還會讀 `0x5455cc` 的初始表；已納入補丁。
- 備份：`C:\Users\join6\Games\ShenDiao-dgVoodoo\ShenDiao.exe.before-growth-curve-patch.bak`
