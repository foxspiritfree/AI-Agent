# 400_Knowledge

本資料夾管理 Notion 匯出資料到卡片盒筆記的知識處理流程。

## Profiles

- `study`：讀書心得、商業、心理、學習、觀念整理。
- `body`：身體、生理、動作、疼痛、訓練、復健、解剖相關知識。
- `self_brain`：跨 AI 共用的自我分身知識層，管理偏好、決策、人物/專案脈絡、觀點與寫作聲音。

## 文章創作

文章創作不再直接使用舊 `400_Knowledge/知識庫` 根目錄。

- 卡片來源：`study/01_processed`、`body/01_processed`
- 文章增補 SOP：`000_Agent/skills/article-enrichment/SKILL.md`
- workflow 快捷入口：`000_Agent/workflows/article-enrichment.md`
- 已發表原文樣本：`200_Reference/writing-samples/`
- 舊加工版文章：`200_Reference/imported/legacy-article-enrichment/`

Profile 設定：

- `profiles/study.yaml`
- `profiles/body.yaml`

## 共用入口

使用共用 pipeline：

```powershell
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile study
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile body
```

先看設定：

```powershell
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile study --show-config
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile body --show-config
```

正式處理前先 dry-run：

```powershell
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile study --dry-run
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile body --dry-run
```

測試新資料時先小批執行：

```powershell
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile study --limit 3 --no-archive
python .\400_Knowledge\_pipeline\zettelkasten_pipeline.py --profile body --limit 3 --no-archive
```

## 資料夾語意

每個 profile 都有相同結構：

- `00_inbox`：Notion 匯出後等待處理的 Markdown 筆記。
- `01_processed`：AI 分類後產生的正式卡片。
- `02_quarantine`：問題資料或無法處理資料。
- `03_archive`：已處理原始筆記。
- `config/classification_map.md`：分類樹。
- `logs/activity.log`：處理紀錄。

## 舊入口狀態

以下腳本保留作為備援，但已標記 deprecated：

- `study/process_notesv3try.py`
- `body/process_notesv3try.py`

新工作請使用共用入口 `_pipeline/zettelkasten_pipeline.py`。

## Legacy 知識庫

`400_Knowledge/知識庫` 是舊卡片盒與文章增補工作區。已整合後的正式位置如下：

- `study` 正式卡片：`400_Knowledge/study/01_processed`
- `body` 正式卡片：`400_Knowledge/body/01_processed`
- 分類圖：各 profile 的 `config/classification_map.md`
- legacy 保存：`200_Reference/imported/legacy-knowledge-base/`

不要把 `400_Knowledge/知識庫` 當作新的寫入目標；需要追溯舊資料時再讀。

## Agent 支援

- Skill：`000_Agent/skills/zettelkasten/SKILL.md`
- Workflow 快捷入口：`000_Agent/workflows/knowledge-ingest.md`
- Article Enrichment Skill：`000_Agent/skills/article-enrichment/SKILL.md`
- Article Enrichment Workflow：`000_Agent/workflows/article-enrichment.md`
- Self Brain Skill：`000_Agent/skills/self-brain/SKILL.md`
- Self Brain Workflow 快捷入口：`000_Agent/workflows/self-brain-capture.md`
- 整合計畫：`400_Knowledge/INTEGRATION_PLAN.md`

## 安全規則

- 不輸出 `.env` 內容。
- 不刪除 `01_processed`、`03_archive`、`classification_map.md`。
- 不清空 logs。
- 搬入 `D:\Feng` 前先列出來源、目標與數量。
