# Self Brain Resolver

新增或更新任何 self_brain 頁面前，先走這份 decision tree。

## Decision Tree

從「這段內容的主要主體是什麼？」開始：

1. 使用者穩定偏好、工作方式、禁忌、價值觀、身份設定 -> `identity/`
2. 已做出的重要選擇、取捨、方向定案 -> `decisions/`
3. 正在推進或需要長期追蹤的工作 -> `projects/`
4. 一個具名的人，以及使用者與此人的關係脈絡 -> `people/`
5. 一個具名組織、公司、社群、團隊 -> `organizations/`
6. 可重複使用的觀念、方法論、判斷框架 -> `concepts/`
7. 使用者的寫作語氣、內容定位、分析後的表達特徵 -> `writing_voice/`
8. 原始資料、匯入紀錄、外部來源摘要 -> `sources/`
9. 暫時不知道放哪裡，但之後可能有用 -> `inbox/`

## Disambiguation

- `identity` vs `decisions`：如果是長期偏好，放 `identity`；如果是某次具體選擇，放 `decisions`。
- `projects` vs `concepts`：有實際推進對象、檔案、任務或里程碑，放 `projects`；可重複教給別人的模型，放 `concepts`。
- `people` vs `organizations`：重點是人本身，放 `people`；重點是團隊或公司，放 `organizations`。
- `writing_voice` vs `concepts`：重點是怎麼說、怎麼寫，放 `writing_voice`；重點是想法本身，放 `concepts`。
- `writing_voice` vs raw writing samples：貼文、文章、作品原文放 `200_Reference/writing-samples/`；萃取後的語氣、結構、內容定位才放 `writing_voice/`。
- `sources` vs 其他資料夾：原始材料放 `sources`；整理後的可用理解放對應主資料夾。
- 找不到位置時，先放 `inbox`，並在頁面加 `Open Threads` 說明待分類原因。

## Duplicate Check

建立新頁前先查：

```powershell
Get-ChildItem .\400_Knowledge\self_brain -Recurse -File -Filter *.md |
  Select-String -Pattern "<keyword>" -CaseSensitive:$false
```

如果已有相同主題，更新既有頁，不新增重複頁。

## Naming

- 檔名使用小寫英文 slug，例如 `ai-agent-project.md`。
- 人物使用 `first-last.md` 或常用識別名。
- 中文概念可用簡短英文意義，例如 `decision-first-style.md`。
- 不在檔名放 secrets、email、電話、token。
