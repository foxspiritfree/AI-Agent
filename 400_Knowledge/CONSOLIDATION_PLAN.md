# 400_Knowledge Consolidation Plan

更新日期：2026-06-01

## 推薦結論

以 `400_Knowledge/study` 與 `400_Knowledge/body` 作為唯一正式卡片來源；`400_Knowledge/知識庫` 只保留為 legacy reference，下一步應從工作區移出或收斂成指向 `200_Reference/imported/legacy-knowledge-base/知識庫` 的說明入口。

理由：正式 pipeline、profile、workflow 已經完成，且 `study/body` 比 legacy 更新；繼續保留 `知識庫` 會讓 AI 與人都誤判資料來源。

## 本次盤點

### 資料量

| 路徑 | 檔案數 | 大小 | 判斷 |
| --- | ---: | ---: | --- |
| `400_Knowledge/知識庫` | 3084 | 8.15 MB | legacy mirror / reference only |
| `400_Knowledge/知識庫/study` | 1894 | 7.56 MB | 舊 study 卡片與圖片 |
| `400_Knowledge/study/01_processed` | 1987 | 0.40 MB | 正式 study 卡片 |
| `400_Knowledge/知識庫/body` | 1155 | 0.28 MB | 舊 body 卡片 |
| `400_Knowledge/body/01_processed` | 1155 | 0.31 MB | 正式 body 卡片 |
| `400_Knowledge/知識庫/articles` | 9 | 0.02 MB | 舊文章加工產物 |
| `400_Knowledge/知識庫/Published` | 19 | 0.07 MB | 舊發表/加工文章混合 |

### Study

- `知識庫/study` 有 1883 個 Markdown 與 11 個 PNG。
- `study/01_processed` 有 1987 個 Markdown。
- 兩邊同名檔案 1883 個；正式區比 legacy 多 104 個 Markdown。
- `study/config/classification_map.md` 已比 `知識庫/study_classification_map.md` 更新。

判斷：`study/01_processed` 是較新的正式來源；`知識庫/study` 不需要再合併回來。

### Body

- `知識庫/body` 與 `body/01_processed` 都是 1155 個 Markdown。
- `body/config/classification_map.md` 與 `知識庫/body_classification_map.md` 內容相同。
- 檔名已分歧：legacy 多為 `A10.md`，正式區多為 `A1 - 口輪匝肌...md` 這類 ID + 標題格式。
- 抽樣顯示部分內容相同但 ID/檔名已重新整理；不適合用 bulk overwrite 合併。

判斷：正式 `body/01_processed` 可繼續當主來源；legacy body 只在需要追溯舊 ID 時做 targeted diff。

### Articles / Published

- `articles` 與 `Published` 是舊文章增補流程產物，不應混入卡片盒 profile。
- 已有正式路由：
  - 加工版：`200_Reference/imported/legacy-article-enrichment/`
  - 乾淨寫作樣本：`200_Reference/writing-samples/social/legacy-published/`
  - 文章增補 SOP：`000_Agent/skills/article-enrichment/SKILL.md`

判斷：`400_Knowledge/知識庫/articles` 與 `Published` 不需要留在 `400_Knowledge` 的 active 區。

## 整合目標狀態

```text
400_Knowledge/
  _pipeline/
  profiles/
  study/
    00_inbox/
    01_processed/        # study 正式卡片
    02_quarantine/
    03_archive/
    config/
    logs/
  body/
    00_inbox/
    01_processed/        # body 正式卡片
    02_quarantine/
    03_archive/
    config/
    logs/
  self_brain/
  README.md
  LEGACY_KNOWLEDGE_BASE.md
  CONSOLIDATION_PLAN.md
```

Legacy 保存在：

```text
200_Reference/imported/legacy-knowledge-base/知識庫/
200_Reference/imported/legacy-article-enrichment/
200_Reference/writing-samples/social/legacy-published/
```

## 執行規劃

### Phase 1：確認正式來源

狀態：本次已完成盤點，可視為完成。

- 正式 study：`400_Knowledge/study/01_processed`
- 正式 body：`400_Knowledge/body/01_processed`
- 正式分類圖：各 profile 的 `config/classification_map.md`
- 正式匯入入口：`400_Knowledge/_pipeline/zettelkasten_pipeline.py`

### Phase 2：補一份 body 差異報告

狀態：完成，見 `400_Knowledge/_reports/body-legacy-diff-2026-06-01.md`。

只針對 `body` 做，不碰 `study`。

建議輸出：

```text
400_Knowledge/_reports/body-legacy-diff-YYYY-MM-DD.md
```

比對方式：

- 用標題 `# ...` 與內容前段做對齊，不只靠檔名 ID。
- 找出 legacy 有但正式區沒有的實質內容。
- 找出正式區已重命名或改寫的對應項。
- 結論只標示「需人工看」「可忽略」「已被正式區吸收」，不直接搬檔。

### Phase 3：把 `知識庫` 從 active workspace 收斂掉

狀態：完成。已建立 `400_Knowledge/LEGACY_KNOWLEDGE_BASE.md`，並將 active duplicate 移到 `200_Reference/imported/legacy-knowledge-base/active-copy-2026-06-01/知識庫/`。

推薦做法：保留 `400_Knowledge/LEGACY_KNOWLEDGE_BASE.md`，其餘內容移出 active 區。

建議目標：

```text
400_Knowledge/LEGACY_KNOWLEDGE_BASE.md
200_Reference/imported/legacy-knowledge-base/知識庫/
```

`LEGACY_KNOWLEDGE_BASE.md` 只需要寫：

- 此資料已不再是正式來源。
- 正式 study/body 位置。
- legacy 完整副本位置。
- body 若需追溯，先看 `_reports/body-legacy-diff-YYYY-MM-DD.md`。

### Phase 4：更新路由文件

狀態：部分完成。已同步 `400_Knowledge/README.md` 與 `000_Agent/skills/article-enrichment/SKILL.md`。

需要同步檢查：

- `400_Knowledge/README.md`
- `000_Agent/DATA_ROUTING.md`
- `000_Agent/skills/zettelkasten/SKILL.md`
- `000_Agent/workflows/knowledge-ingest.md`
- `000_Agent/workflows/article-enrichment.md`

重點是讓所有文件都只指向：

- `study/01_processed`
- `body/01_processed`
- `200_Reference/imported/legacy-knowledge-base/知識庫`
- `200_Reference/imported/legacy-article-enrichment`
- `200_Reference/writing-samples/social/legacy-published`

### Phase 5：清理舊入口與視覺噪音

狀態：完成。

已移到 `200_Reference/imported/legacy-knowledge-base/cleanup-2026-06-01/`：

- `400_Knowledge/知識庫`
- `400_Knowledge/study/article`
- `400_Knowledge/body/article`
- `400_Knowledge/study/config - 複製`
- `400_Knowledge/study/02_scripts`
- `400_Knowledge/study/sample`
- `400_Knowledge/_backup`
- 舊 `process_notesv3try.py` 原始版本與 `.bak`

已移到其他正式位置：

- `400_Knowledge/M0_AUDIT.md` -> `400_Knowledge/_reports/m0-audit-2026-05-07.md`
- `400_Knowledge/INTEGRATION_PLAN.md` -> `400_Knowledge/_reports/integration-plan-completed-2026-05-07.md`
- `400_Knowledge/FUTURE_IMPROVEMENTS.md` -> `100_Todo/projects/knowledge-pipeline-future-improvements.md`

已保留為 wrapper：

- `400_Knowledge/study/process_notesv3try.py`
- `400_Knowledge/body/process_notesv3try.py`

不建議清理的項目：

- `01_processed`
- `03_archive`
- `config/classification_map.md`
- `logs/activity.log`
- `.env`

## 推薦下一步

根目錄與 profile 舊入口已收斂。下一步只需在有新資料時使用 `_pipeline/zettelkasten_pipeline.py` 跑 `study/body` profile。
