# Body Legacy Diff 2026-06-01

## 結論

`400_Knowledge/知識庫/body` 的內容已被 `400_Knowledge/body/01_processed` 吸收；不需要把 legacy body 搬回正式區，也不應 bulk overwrite。

推薦處理：保留 legacy copy 作追溯來源，正式卡片只使用 `400_Knowledge/body/01_processed`。

## 比對範圍

| 項目 | Legacy | Formal |
| --- | --- | --- |
| 路徑 | `400_Knowledge/知識庫/body` | `400_Knowledge/body/01_processed` |
| Markdown 檔案數 | 1155 | 1155 |
| 同名檔案 | 0 | 0 |
| legacy 標題可在 formal 找到 | 1155 | 1155 |
| 完全相同內容 hash | 25 | 25 |
| normalized content 不同 | 1130 | 1130 |

## 主要差異型態

### 1. 檔名策略不同

Legacy 多為純 ID：

```text
A.md
A10.md
A10A.md
```

Formal 多為 ID + 標題：

```text
A - 運動員站姿：所有運動的核心穩定與移動基礎.md
A1 - 口輪匝肌對於表情啟動與神經平衡的重要性.md
A1A - 口輪匝肌內外輪動作區分與訓練技巧.md
```

### 2. ID 已重新整理

同一張卡片在 formal 可能使用不同 ID。例如：

| Legacy | Formal | 標題 |
| --- | --- | --- |
| `A.md` | `A - 運動員站姿：所有運動的核心穩定與移動基礎.md` | `# 所有運動都有運動員站姿` |
| `A10.md` | `A1 - 口輪匝肌對於表情啟動與神經平衡的重要性.md` | `# 口輪匝肌的重要性` |
| `A10A.md` | `A1A - 口輪匝肌內外輪動作區分與訓練技巧.md` | `# 口輪匝肌的內外輪動作` |
| `A11.md` | `A2 - 胸小肌過緊導致舉手時出現肋骨上翻的代償.md` | `# 胸小肌過度緊繃的表現` |

### 3. Formal 多數內容較長

抽樣顯示 formal 常見差異是多了 backlinks 或重複連結資訊。例如：

```text
legacy A.md: 127 normalized chars
formal A - 運動員站姿...md: 176 normalized chars
```

formal 版本保留原文內容，並新增 `[[A1]]`、`[[A2]]` 等子卡連結。

## 判斷

- 沒有發現 legacy body 有標題層級的孤兒內容。
- `body/config/classification_map.md` 與 `知識庫/body_classification_map.md` 相同。
- formal body 是較適合作為現行 Obsidian / pipeline 來源的版本。
- legacy body 只適合追溯舊 ID，不適合回灌。

## 後續規則

- 新增或處理 body 卡片時，只寫入 `400_Knowledge/body` profile。
- 文章補強時，只讀 `400_Knowledge/body/01_processed`。
- 若看到舊 ID，例如 `A10.md`，先用標題對應到 formal 檔，不直接復原 legacy 檔。
