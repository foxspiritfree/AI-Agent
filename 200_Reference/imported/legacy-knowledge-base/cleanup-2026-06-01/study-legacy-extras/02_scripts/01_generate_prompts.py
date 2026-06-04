import os
import re
import json

# --- 1. 設定區 ---
INBOX_PATH = '00_inbox'
CONFIG_PATH = 'config/classification_map.md'
PROMPT_OUTPUT_FILE = 'prompts.json'

# --- 2. 核心功能函式 (從 main_processor.py 複製而來) ---

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

# --- 3. 主執行流程 ---
def main():
    print(f"正在從 {INBOX_PATH} 讀取筆記並生成提示...")
    
    try:
        with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
            classification_map = f.read()
    except FileNotFoundError:
        classification_map = "# 分類總表 (自動生成中...)\n"

    files_to_process = [f for f in os.listdir(INBOX_PATH) if f.endswith('.md')]
    all_prompts_data = []
    
    for filename in files_to_process:
        filepath = os.path.join(INBOX_PATH, filename)
        note_data = parse_note_file(filepath)
        
        if not note_data:
            print(f"SKIPPED (format error): {filename}")
            continue

        prompt = build_prompt(note_data, classification_map)
        all_prompts_data.append({
            "original_filename": filename,
            "prompt": prompt
        })

    with open(PROMPT_OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(all_prompts_data, f, indent=2, ensure_ascii=False)

    print(f"成功！已將 {len(all_prompts_data)} 個提示儲存到 {PROMPT_OUTPUT_FILE}")

if __name__ == '__main__':
    main()