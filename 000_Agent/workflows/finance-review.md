# Finance Review Workflow

## 目標

協助檢查 Notion「帳務管理」中的待處理事項，但不把敏感帳務資料搬進 repo。

## 執行方式

本 workflow 是 playbook shortcut；正式 SOP 只維護在：

- `000_Agent/skills/finance-admin-review/SKILL.md`

Notion URL / data source 以 `000_Agent/NOTION_SOURCE_MAP.md` 為 single source。

觸發此 workflow 時，先讀取並遵守 `finance-admin-review` skill。

## 使用時機

- 檢查訂閱取消事項。
- 檢查金錢來往待追蹤項。
- 檢查每月定期支出提醒。
- 檢查卡片或帳戶管理後續處置。
- 把帳務行政待辦寫成 Notion「待安排項目」。

常用口令：

```text
掃 Notion 帳務管理，列出需要我安排處理的項目，不要輸出金額明細。
```

## 安全邊界

- 不複製帳號、卡號、付款方式細節、金額明細到 repo 或一般回覆。
- 不做投資、保險、稅務或法律建議。
- 不主動更新 Notion 帳務資料；除非使用者明確要求，只能建立待安排任務。
