# AI-Agent 常用指令速查

## 1. 進入 AI-Agent 資料夾

    cd $HOME\AI-Agent

## 2. 查看共用規則

    notepad $HOME\AI-Agent\000_Agent\CORE_RULES.md

或：

    cat $HOME\AI-Agent\000_Agent\CORE_RULES.md

## 3. 修改完 CORE_RULES 後同步到各 AI 入口檔

    powershell -ExecutionPolicy Bypass -File "$HOME\AI-Agent\sync-agent.ps1"

會同步到：

    CLAUDE.md
    AGENTS.md
    GEMINI.md
    .cursorrules

## 4. 啟動各 AI CLI

啟動 Claude Code：

    cc

啟動 Codex：

    cx

啟動 Gemini：

    gm

## 5. 安全刪除檔案或資料夾

    safe-remove .\some-file.txt

或：

    trash .\some-folder

會移到垃圾桶，不是永久刪除。

## 6. 查看目前 Git 狀態

    git status

## 7. 第一次把 AI-Agent 備份到 GitHub

先在 GitHub 建好 Private repo，名稱建議：

    AI-Agent

然後執行：

    cd $HOME\AI-Agent
    git init
    git add .
    git commit -m "Initial AI-Agent setup"
    git branch -M main
    git remote add origin https://github.com/foxspiritfree/AI-Agent.git
    git push -u origin main

## 8. 平常更新備份

    cd $HOME\AI-Agent
    git status
    git add .
    git commit -m "Update AI-Agent rules"
    git push

## 9. 在新電腦下載設定

    cd $HOME
    git clone https://github.com/foxspiritfree/AI-Agent.git

下載後執行：

    powershell -ExecutionPolicy Bypass -File "$HOME\AI-Agent\sync-agent.ps1"

## 10. 讓 AI 先讀你的設定

Claude：

    請先讀取：
    C:\Users\join6\AI-Agent\CLAUDE.md

Codex：

    請先讀取：
    C:\Users\join6\AI-Agent\AGENTS.md

Gemini：

    請先讀取：
    C:\Users\join6\AI-Agent\GEMINI.md

通用：

    請先讀取我的共用 AI 設定：
    C:\Users\join6\AI-Agent\000_Agent\CORE_RULES.md

## 11. 建議加入 .gitignore

    .env
    *.key
    *.pem
    *.p12
    *.pfx
    secrets/
    private/
    credentials/
    tokens/
    *.log
    .DS_Store
    Thumbs.db

## 12. 備份原則

- 使用 GitHub Private repo。
- 小改 CORE_RULES / skill / workflow 後可以 commit。
- 一週至少 push 一次。
- 換電腦前一定 push。
- 不要把 API key、token、公司機密、客戶個資、真實告警細節放進 repo。
