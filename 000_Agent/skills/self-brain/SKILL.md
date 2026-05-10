---
name: self-brain
description: 打造使用者自我分身與長期脈絡時使用；當使用者提到自我分身、個人腦、長期記憶、決策紀錄、偏好、人物脈絡、專案脈絡、世界觀、價值觀、寫作聲音、可交接知識或要把對話沉澱成可維護知識時觸發。
---

# Self Brain

協助使用者把零散對話、想法、決策與人物/專案脈絡，整理進 `400_Knowledge/self_brain`。目標是建立可被不同 AI 讀取的「自我分身」知識層，不依賴單一 AI 平台或外部 runtime。

## 核心路徑

- Schema：`400_Knowledge/self_brain/schema.md`
- Resolver：`400_Knowledge/self_brain/RESOLVER.md`
- Capture inbox：`400_Knowledge/self_brain/inbox`
- 主要知識層：`400_Knowledge/self_brain`
- Workflow：`000_Agent/workflows/self-brain-capture.md`

## 使用原則

1. 先讀 `RESOLVER.md`，再決定內容放哪裡。
2. 每個知識點只放一個主要位置；其他關聯用連結或 `See Also`。
3. 頁面上半部是目前版本的「Compiled Truth」，可以更新。
4. `Timeline` 是證據軌跡，只追加，不改寫舊事件。
5. 使用者明確修正 AI 時，優先寫入，標示為 user correction。
6. 不把未確認推測寫成事實；不確定就標 `confidence: low`。

## 可沉澱內容

- 使用者偏好、禁忌、工作方式。
- 穩定觀點、價值判斷、世界觀。
- 反覆出現的決策模式。
- 專案背景、方向、取捨、里程碑。
- 人物、組織、關係脈絡。
- 寫作聲音、表達習慣、內容定位。
- 重要對話中的結論、承諾、待追蹤事項。

## 不要沉澱

- 單次聊天寒暄。
- 沒有後續價值的執行細節。
- 密碼、API key、token、credential。
- 未經使用者確認的敏感個資。
- 醫療、法律、金融判斷的最終結論；只能記錄來源與脈絡。

## 基本流程

```powershell
git status --short
Get-Content .\400_Knowledge\self_brain\RESOLVER.md
Get-Content .\400_Knowledge\self_brain\schema.md
```

接著：

1. 判斷內容類型。
2. 搜尋是否已有相同主題頁。
3. 更新既有頁，或建立新頁。
4. 新增 timeline entry，保留來源與日期。
5. 回報改了哪些檔案。

## 搜尋方式

PowerShell 優先：

```powershell
Get-ChildItem .\400_Knowledge\self_brain -Recurse -File -Filter *.md |
  Select-String -Pattern "<keyword>" -CaseSensitive:$false
```

如果 `rg` 可用，也可用：

```powershell
rg "<keyword>" .\400_Knowledge\self_brain
```

## 頁面格式

使用 `schema.md` 的樣板。最小頁面也要包含：

- 標題
- Summary
- Current Understanding
- Open Threads
- See Also
- Timeline

## 安全規則

- 不讀取或輸出 `.env`、credential、token。
- 不刪除既有 self_brain 頁面。
- 合併重複頁前先列出 survivor / duplicate。
- 大量移動或改名頁面前先回報影響範圍。
- 使用者明確說「記住、沉澱、寫入、整理成自我分身」時，先執行寫入，再補充假設。
