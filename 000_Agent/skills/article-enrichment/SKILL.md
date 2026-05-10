---
name: article-enrichment
description: 用卡片盒知識補強文章時使用；當使用者提到文章增補、延伸知識補充、從 study/body 卡片找相關資料、把卡片盒用於寫作、處理 articles/Published、文章創作 pipeline、把文章接上知識庫時觸發。
---

# Article Enrichment

協助使用者把草稿文章與 `400_Knowledge/study`、`400_Knowledge/body` 的卡片盒資料連結，挑出高語意相關的卡片，補到文章末尾作為延伸知識、理論支撐或後續改寫材料。

## 核心路徑

- 草稿：`100_Todo/drafts/`
- 原始寫作樣本：`200_Reference/writing-samples/`
- 舊文章增補素材：`200_Reference/imported/legacy-article-enrichment/`
- Study 卡片：`400_Knowledge/study/01_processed/`
- Body 卡片：`400_Knowledge/body/01_processed/`
- Study 分類圖：`400_Knowledge/study/config/classification_map.md`
- Body 分類圖：`400_Knowledge/body/config/classification_map.md`
- 舊 SOP 來源：`200_Reference/imported/legacy-knowledge-base/知識庫/Gemini.md`

## 使用原則

1. 先判斷文章狀態：
   - 還在寫：放 `100_Todo/drafts/`。
   - 已發表原文：放 `200_Reference/writing-samples/`。
   - 舊流程加工版或含延伸補充：放 `200_Reference/imported/legacy-article-enrichment/`。
2. 只用正式卡片來源：`study/01_processed` 與 `body/01_processed`。
3. 不直接修改已發表原文；若要增補，建立加工副本。
4. 不把原始文章整篇寫進 `self_brain`；只有語氣、選題、結構分析結果才進 `400_Knowledge/self_brain/writing_voice/`。
5. 不用舊 `400_Knowledge/知識庫` 當正式來源；它只是 legacy source。

## 基本流程

```powershell
git status --short
Get-Content .\400_Knowledge\README.md
Get-Content .\400_Knowledge\study\config\classification_map.md -TotalCount 80
Get-Content .\400_Knowledge\body\config\classification_map.md -TotalCount 80
```

接著：

1. 掃描待處理文章。
2. 讀文章，提取核心論點、主題、可補強缺口。
3. 判斷使用 `study`、`body`，或兩者都用。
4. 從分類圖找候選卡片 ID，再到 `01_processed` 讀卡片。
5. 只選能補充論點、提供理論支撐或延伸案例的卡片。
6. 在加工副本末尾加入延伸知識補充。
7. 若文章可作寫作樣本，另存乾淨原文，不帶延伸補充。

## 延伸補充格式

```markdown
---

## 延伸知識補充

### [卡片檔名或標題]

**核心資訊**：濃縮卡片中真正支撐文章的內容。

**資料來源**：卡片中的出處、書名、作者、URL 或來源描述。
```

## 命名規則

- 加工副本可使用 `[ENRICHED]_<原檔名>.md`。
- 已發表原文樣本可使用 `legacy-published-<編號>.md`。
- 不再使用 `[PROCESSED]` 作為新流程標記；舊檔保留原名即可。

## 負面約束

- 不刪除原文章內容。
- 不覆寫 `200_Reference/writing-samples/` 的原文樣本。
- 不重複處理已含 `## 延伸知識補充` 的同一檔案；需要重做時建立新副本。
- 找不到高相關卡片時，不硬補。
- 不把卡片全文大量貼入文章；只放能支撐論點的核心資訊與來源。

## 舊流程對應

舊 `Gemini.md` 中的 `articles/`、`study/`、`body/`、`Published/` 對應到新系統：

| 舊路徑 | 新路由 |
| --- | --- |
| `400_Knowledge/知識庫/articles/` | `200_Reference/imported/legacy-article-enrichment/articles/` 或新草稿進 `100_Todo/drafts/` |
| `400_Knowledge/知識庫/Published/` | 原文樣本進 `200_Reference/writing-samples/social/`；加工版進 `200_Reference/imported/legacy-article-enrichment/published/` |
| `400_Knowledge/知識庫/study/` | 正式來源改用 `400_Knowledge/study/01_processed/` |
| `400_Knowledge/知識庫/body/` | 正式來源改用 `400_Knowledge/body/01_processed/` |
