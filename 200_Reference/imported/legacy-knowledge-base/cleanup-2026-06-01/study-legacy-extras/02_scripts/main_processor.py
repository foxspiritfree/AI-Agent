import os
import subprocess
import json
import re
import datetime

# --- 1. 設定區 ---
# 所有的路徑都是相對於您執行此腳本的根目錄
INBOX_PATH = '00_inbox'
PROCESSED_PATH = '01_processed'
CONFIG_PATH = 'config/classification_map.md'
LOG_FILE_PATH = 'logs/activity.log'

# --- 2. 核心功能函式 ---

def log_activity(message):
    """將活動記錄到日誌檔案中"""
    timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    # 確保日誌目錄存在
    os.makedirs(os.path.dirname(LOG_FILE_PATH), exist_ok=True)
    with open(LOG_FILE_PATH, 'a', encoding='utf-8') as f:
        f.write(f"{timestamp} - {message}\n")

def parse_note_file(filepath):
    """
    解析卡片筆記檔案，提取 敘述, ID, 內容, 和來源。
    """
    filename = os.path.basename(filepath)
    match = re.match(r'^(.*)\s+([a-zA-Z0-9]{10,})\.md$', filename)
    
    if not match:
        return None

    description = match.group(1).strip()
    unique_id = match.group(2)
    
    with open(filepath, 'r', encoding='utf-8') as f:
        full_content = f.read()

    # 從內容中提取並移除"來源"行，以避免重複
    source_text = ""
    content_lines = full_content.splitlines()
    cleaned_content_lines = []
    for line in content_lines:
        # 尋找 "來源" 或 "Source" 開頭的行
        source_match = re.match(r'^(來源|Source)\s*[:：\s]*(.*)', line, re.IGNORECASE)
        if source_match:
            source_text = source_match.group(2).strip()
        else:
            cleaned_content_lines.append(line)
    
    content = "\n".join(cleaned_content_lines).strip()
    
    # 如果清理後內容為空，使用檔名敘述
    if not content:
        content = description

    return {
        "description": description,
        "unique_id": unique_id,
        "content": content,
        "source": source_text,
        "original_filename": filename
    }

def get_parent_id(note_id):
    """計算給定筆記 ID 的父層級 ID。"""
    if len(note_id) > 1:
        return note_id[:-1]
    return None

def build_prompt(note_data, classification_map_content):
    """動態建立要發送給 Gemini 的提示。"""
    prompt_template = f"""
你是一位專業的 Zettelkasten 知識管理專家。你的任務是分析給定的筆記內容和現有的分類體系，為這則筆記建議一個最適合的分類。

請嚴格遵循以下指令：

1.  **分析上下文**: 仔細閱讀下方提供的「目前的分類地圖」和「筆記內容」。
2.  **建議分類**:
    * 根據筆記內容，在現有分類地圖中找到最適合的位置。
    * **如果分類地圖是空的或找不到適合的分類**，請為它**創建一個全新的頂層分類**（例如 A, B, C...）。
    * 命名規則為「單數層英文，雙數層數字」（例如 A, A1, A1B, A1B1）。
3.  **格式化輸出**: 你的回答**必須**是一個格式完整的 JSON 物件，絕對不要包含 JSON 以外的任何文字或解釋。JSON 結構如下：

    ```json
    {{
      "suggested_id": "B1C2",
      "new_classification_entry": "B1C2: 心理帳戶 (Mental Accounting)",
      "reason": "此筆記的核心概念是心理帳戶，這屬於行為經濟學中的一種認知偏誤，因此建議歸類於此。"
    }}
    ```
    * `new_classification_entry`: 如果你建議了一個**新的**分類，請在此處填寫「編號: 名稱」。如果使用現有分類，此欄位應為 `null`。

---

### CONTEXT: 目前的分類地圖

{classification_map_content}

---

### NOTE TO ANALYZE: 筆記內容

**原始檔名:** {note_data['original_filename']}
**筆記內文:**
{note_data['content']}
"""
    return prompt_template.strip()

def call_gemini_cli(prompt):
    """使用 subprocess 呼叫 Gemini CLI。"""
    try:
        process = subprocess.run(
            ['gemini', 'g'], # 使用 'g' command 來處理通用提示
            input=prompt,
            capture_output=True,
            text=True,
            check=True,
            encoding='utf-8'
        )
        # 清理輸出，只取 JSON 部分
        json_match = re.search(r'\{.*\}', process.stdout, re.DOTALL)
        if json_match:
            return json_match.group(0)
        # 如果找不到JSON，返回原始輸出以供除錯
        print("警告：Gemini 的回覆中未找到有效的 JSON 結構。")
        return process.stdout
    except FileNotFoundError:
        print("\n錯誤：找不到 'gemini' 命令。請確保 Gemini CLI 已安裝並在您的系統 PATH 中。")
        return None
    except subprocess.CalledProcessError as e:
        print(f"\nGemini CLI 執行錯誤:\n{e.stderr}")
        return None

def update_note_file(note_data, suggested_id, gemini_response_text_for_map):
    """根據批准的建議，生成新的檔案內容、檔名，並執行檔案操作。"""
    # 1. 計算父層級ID和新檔名
    parent_id = get_parent_id(suggested_id)
    new_filename = f"{suggested_id}.md"
    new_filepath = os.path.join(PROCESSED_PATH, new_filename)

    # 2. 建立新的檔案內容
    new_content_parts = [note_data['content']]
    if note_data['source']:
        new_content_parts.append(f"**來源**: {note_data['source']}")
    if parent_id:
        new_content_parts.append(f"**連結**: [[{parent_id}]]")
    final_content = "\n\n".join(new_content_parts)

    # 3. 寫入新檔案
    with open(new_filepath, 'w', encoding='utf-8') as f:
        f.write(final_content)
    
    # 4. 更新分類地圖
    try:
        # 解析傳入的 gemini response
        suggestion = json.loads(gemini_response_text_for_map)
        if suggestion.get('new_classification_entry'):
            # 確保 config 目錄存在
            os.makedirs(os.path.dirname(CONFIG_PATH), exist_ok=True)
            with open(CONFIG_PATH, 'a', encoding='utf-8') as f:
                # 確保新條目前面有空格且以換行符結尾
                f.write(f"  - {suggestion['new_classification_entry']}\n")
    except (json.JSONDecodeError, KeyError) as e:
        print(f"更新分類地圖時出錯，可能是因為 Gemini 回傳的 JSON 格式不符或缺少鍵值: {e}")

    # 5. 移動舊檔案 (或您可以選擇刪除)
    original_filepath = os.path.join(INBOX_PATH, note_data['original_filename'])
    # os.remove(original_filepath) # 這是刪除
    # 為安全起見，建議手動歸檔
    print(f"檔案已處理，請手動從收件匣歸檔: {original_filepath}")
    
    log_activity(f"PROCESSED: \"{note_data['original_filename']}\" -> \"{new_filename}\"")
    print(f"成功建立新檔案: {new_filepath}")

# --- 3. 主執行流程 ---

def main():
    # 確保必要的目錄存在
    os.makedirs(INBOX_PATH, exist_ok=True)
    os.makedirs(PROCESSED_PATH, exist_ok=True)

    files_to_process = [f for f in os.listdir(INBOX_PATH) if f.endswith('.md')]
    
    if not files_to_process:
        print(f"在 '{INBOX_PATH}' 資料夾中沒有找到任何 .md 檔案。")
        return

    for filename in files_to_process:
        print(f"\n{'='*20}\n正在處理檔案: {filename}\n{'='*20}")
        filepath = os.path.join(INBOX_PATH, filename)

        note_data = parse_note_file(filepath)
        if not note_data:
            log_activity(f"SKIPPED (format error): {filename}")
            print(f"跳過檔案：'{filename}'，因檔名格式不符 (檔名需為 '敘述 [ID].md')。")
            continue

        try:
            # 確保 config 目錄存在
            os.makedirs(os.path.dirname(CONFIG_PATH), exist_ok=True)
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                classification_map = f.read()
        except FileNotFoundError:
            classification_map = "# 分類總表 (自動生成中...)\n"
            # 如果檔案不存在，則創建一個
            with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
                f.write(classification_map)


        prompt = build_prompt(note_data, classification_map)
        gemini_response_text = call_gemini_cli(prompt)

        if not gemini_response_text:
            log_activity(f"SKIPPED (Gemini error): {filename}")
            continue
        
        try:
            suggestion = json.loads(gemini_response_text)
            print("--- Gemini 建議 ---")
            print(json.dumps(suggestion, indent=2, ensure_ascii=False))
        except json.JSONDecodeError:
            print("--- Gemini 回傳了無效的 JSON ---")
            print(gemini_response_text)
            log_activity(f"SKIPPED (Invalid JSON): {filename}")
            continue

        # 人類決策環節
        while True:
            choice = input("\n接受此建議嗎？ ([Y]es / [N]o / [E]dit): ").lower()
            if choice in ['y', 'n', 'e']:
                break
        
        if choice == 'y':
            # 使用 Gemini 的建議執行操作
            update_note_file(note_data, suggestion['suggested_id'], gemini_response_text)
        elif choice == 'e':
            # 手動編輯 ID
            custom_id = input("請輸入新的檔案 ID (例如 B1C3): ")
            # 當手動編輯時，我們無法自動更新分類地圖，因為缺少新分類的描述
            # 建立一個模擬的 gemini response，讓 update_note_file 可以處理
            manual_gemini_response = json.dumps({
                "suggested_id": custom_id,
                "new_classification_entry": None, # 手動輸入無法得知新條目
                "reason": "手動輸入"
            })
            update_note_file(note_data, custom_id, manual_gemini_response)
            print("提醒：使用手動編輯 ID 時，如有新分類，需請您手動更新 classification_map.md。")
        else: # 'n'
            print("已跳過此檔案。")
            log_activity(f"SKIPPED (User rejected): {filename}")

    print("\n所有檔案處理完畢！")


if __name__ == '__main__':
    main()