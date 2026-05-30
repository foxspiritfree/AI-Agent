# Project Memory Workflow

## 目標

讓 AI 在新專案、長任務、跨工具交接時，有一組可重讀的專案脈絡文件與三級任務架構。

## 執行方式

本 workflow 只是快捷入口；正式流程只維護在：

- `000_Agent/skills/project-memory/SKILL.md`

常用口令：

**情境 1：專案啟動 (Start a Project)**
```text
我想要做一個 [新專案點子]，請幫我用 project-memory 進行需求釐清，並建立架構大腦。
```

**情境 2：中途追加 (Add a Feature)**
```text
我想到一個新功能：[需求描述]，請幫我進行衝擊分析，並將拆解的任務放進 tasks/ 結構中。
```

**情境 3：日常推進 (Continue a Project)**
```text
請讀取 memory-bank, architecture.md 與 tasks/ 裡的下一個任務，開始實作。完成單一任務後提醒我 commit。
```

適用於 app、工具、自動化、技術研究實作；不適用於日記、個人偏好或外部原始素材整理。
