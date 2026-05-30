# NKT 身體評估助理 使用說明 (Usage Guide)

這套身體評估 AI 系統結合了你卡片盒中 **1155 張** 卡片的核心知識，並將其濃縮為 8 個結構化知識文件與一個專屬的 System Prompt。

以下是如何在 **Claude Projects** 或 **OpenAI Custom GPTs** 中完成設定並開始使用的指南。

---

## 🛠️ 設定步驟

### 推薦方式 1：使用 Claude Projects (適合與 Claude 對話)

1. **建立專案**：在 Claude 網頁端點擊 **Projects** -> **Create Project**。
2. **上傳知識庫文件**：將以下路徑的 8 個 Markdown 檔案上傳到專案的 **Project Knowledge** 中：
   - `C:\Users\join6\AI-Agent\400_Knowledge\body-assessment\00-assessment-flow.md`
   - `C:\Users\join6\AI-Agent\400_Knowledge\body-assessment\01-history-intake.md`
   - `C:\Users\join6\AI-Agent\400_Knowledge\body-assessment\02-movement-screening.md`
   - `C:\Users\join6\AI-Agent\400_Knowledge\body-assessment\03-nkt-strategy.md`
   - `C:\Users\join6\AI-Agent\400_Knowledge\body-assessment\04-nkt-blacklist.md`
   - `C:\Users\join6\AI-Agent\400_Knowledge\body-assessment\05-nkt-special-cases.md`
   - `C:\Users\join6\AI-Agent\400_Knowledge\body-assessment\06-body-region-links.md`
   - `C:\Users\join6\AI-Agent\400_Knowledge\body-assessment\07-exercise-prescription.md`
3. **設定 Custom Instructions**：
   - 打開 `C:\Users\join6\AI-Agent\400_Knowledge\body-assessment\AI-assessor-prompt.md`
   - 複製 `# 角色設定：資深 NKT 身體評估助理...` 開始的整段 Markdown 內容。
   - 貼入專案的 **Set Custom Instructions** 中，保存即可。

### 推薦方式 2：使用 Gemini Gems (適合與 Gemini Advanced 對話)

1. **建立 Gem**：在 Gemini 網頁端（Gemini Advanced）點擊左下角的 **Gems管理器** (Gems Manager) -> **New Gem**。
2. **設定指令 (Instructions)**：
   - 打開 `C:\Users\join6\AI-Agent\400_Knowledge\body-assessment\AI-assessor-prompt.md`
   - 複製裡面的 Prompt 貼到 Gem 的「指示」(Instructions) 框中。
3. **上傳檔案**：
   - 在 Gem 設定介面中，直接點擊 **+ 檔案** 或 **Upload** 按鈕。
   - 將這 8 個 Markdown 檔案上傳到該 Gem 中（Gemini 能完美理解這 8 個檔案的結構，且處理多語意跟大 context 速度極快）。
4. **命名與儲存**：將 Gem 命名為「**NKT 身體評估助理**」，儲存後即可隨時在左側選單點擊使用。

### 推薦方式 3：使用 Google AI Studio (最專業、最無限制的開發者測試方式)

1. 打開 [Google AI Studio](https://aistudio.google.com/)。
2. 選擇 **Chat Prompt**。
3. 在右側的 **System Instructions** 中，貼入 `AI-assessor-prompt.md` 的內容。
4. 在左下角或對話框上方的 **Files** 點擊 **Upload**，一次將 8 個 Markdown 檔案全部丟進 Chat 內容（Gemini 的超大 Context Window 能完美吃下並記住所有細節，甚至可以用來分析更長的客戶影片或圖片）。

---

## 💬 如何與 AI 展開對話 (臨床案例討論示範)

這套系統設定為「治療師對治療師」的專業討論。你可以用以下方式開頭：

### 示範開頭 1 (有具體疼痛個案)
> 「我今天來了一個客戶，男，35歲，主訴是做深蹲到底部起身時，右側下背會有尖銳的撕裂感。站立時沒有明顯不舒服。主動做前彎 ROM 受限，但躺姿下做雙腳抱胸（被動前彎）沒有痛感。請依據評估程序幫我推理。」

### 示範開頭 2 (高階同側問題)
> 「客戶主訴右側偏頭痛，且同側頸部、胸椎、腰椎肌肉測試全部都是 weak。這符合我們高階問題的原則嗎？我們應該先看疤痕、顳顎還是呼吸？」

---

## 🧠 AI 的臨床推理運作邏輯
當你與它對話時，它會自動後台檢索你上傳的 8 個檔案：
1. 當你說「深蹲底部痛」，它會去 `01-history-intake.md` 找肌肉 vs 韌帶痛的特徵，並去 `03-nkt-strategy.md` 找功能性切入點。
2. 當你說「測試臀大肌時腰快抽筋」，它會去 `04-nkt-blacklist.md` 找出對應的 AB 判讀。
3. 它會嚴格控制進度，先引導你做完問診與動作篩檢，才會建議你做哪些 NKT 配對測試，最後才給出 Release & Activate 的精準運動處方。
