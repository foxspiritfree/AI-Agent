import { existsSync, readFileSync } from "node:fs";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const reportsDir = path.join(projectRoot, "data", "reports");
const envPath = path.join(projectRoot, ".env");
const configPath = path.join(projectRoot, "config", "ai-preprocess.json");

loadDotEnv(envPath);

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

function loadDotEnv(filePath) {
  if (!existsSync(filePath)) return;
  const raw = requireText(filePath);
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;
    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (key && !(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function requireText(filePath) {
  return readFileSync(filePath, "utf8");
}

async function latestReportPath(prefix) {
  const files = await readdir(reportsDir);
  const matched = files
    .filter((file) => new RegExp(`^${prefix}-\\d{4}-\\d{2}-\\d{2}\\.md$`).test(file))
    .sort();
  const latest = matched.at(-1);
  if (!latest) throw new Error(`No ${prefix} report found.`);
  return path.join(reportsDir, latest);
}

function stampFromPath(filePath) {
  return path.basename(filePath).match(/(\d{4}-\d{2}-\d{2})/)?.[1];
}

function truncate(text, maxLength) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}\n...[truncated]`;
}

function extractTopicSections(markdown) {
  const blocks = markdown.split(/^## /m).slice(1);
  return blocks.map((block) => {
    const [headingLine, ...rest] = block.split(/\r?\n/);
    return {
      topic: headingLine.trim(),
      content: rest.join("\n").trim()
    };
  });
}

function buildPrompt({ stamp, topicCandidates, rawReport, inspiration, brandVoice }) {
  const topicSections = extractTopicSections(topicCandidates)
    .map(({ topic, content }) => `## ${topic}\n${truncate(content, 5000)}`)
    .join("\n\n");

  return `你是 writing-flywheel 的前處理分析器，不是最終決策者。

任務：
1. 檢查這批候選是否混入明顯噪音、促銷、徵才、語境不符內容。
2. 從候選中挑出最多 6 個「仍值得人工複核」的題目。
3. 對每個題目標記：
   - signal_strength: strong | medium | weak
   - noise_risk: low | medium | high
   - why
   - matched_user_signal
4. 給一段 overall_assessment，說明這週外部資料能不能當主要依據。

限制：
- 不要直接幫我做最後 A/B/C 定案。
- 不要捏造素材。
- 若候選明顯不對題，要直接說。
- 優先考慮是否符合這個使用者的寫作聲音：從個人經驗轉出公共判斷，不喜歡空泛教學和純工具炫耀。

請只輸出 JSON，格式如下：
{
  "stamp": "${stamp}",
  "overall_assessment": "",
  "use_as_primary_source": false,
  "review_candidates": [
    {
      "title": "",
      "topic": "",
      "signal_strength": "strong",
      "noise_risk": "low",
      "why": "",
      "matched_user_signal": ""
    }
  ],
  "discard_notes": [
    ""
  ]
}

=== Brand Voice 摘要 ===
${truncate(brandVoice, 4000)}

=== Inspiration 摘要 ===
${truncate(inspiration, 4000)}

=== Topic Candidates Report ===
${topicSections}

=== Raw Reading Report 摘要 ===
${truncate(rawReport, 5000)}
`;
}

async function callGemini({ apiKey, model, prompt }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json"
      },
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    })
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload?.error?.message || `Gemini request failed with ${response.status}`);
  }

  const text = payload?.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("")?.trim();
  if (!text) {
    throw new Error("Gemini returned no text.");
  }

  return {
    raw: payload,
    text,
    parsed: JSON.parse(text)
  };
}

function renderMarkdown(summary) {
  const lines = [
    `# AI Topic Preprocess - ${summary.stamp}`,
    "",
    `- model: gemini-flash-latest`,
    `- use_as_primary_source: ${summary.use_as_primary_source ? "true" : "false"}`,
    "",
    "## Overall Assessment",
    "",
    summary.overall_assessment || "",
    "",
    "## Review Candidates",
    ""
  ];

  for (const item of summary.review_candidates || []) {
    lines.push(`### ${item.title}`);
    lines.push("");
    lines.push(`- topic: ${item.topic}`);
    lines.push(`- signal_strength: ${item.signal_strength}`);
    lines.push(`- noise_risk: ${item.noise_risk}`);
    lines.push(`- why: ${item.why}`);
    lines.push(`- matched_user_signal: ${item.matched_user_signal}`);
    lines.push("");
  }

  lines.push("## Discard Notes", "");
  for (const note of summary.discard_notes || []) {
    lines.push(`- ${note}`);
  }
  lines.push("");

  return lines.join("\n");
}

async function main() {
  if (!GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY or GOOGLE_API_KEY.");
  }

  const config = JSON.parse(await readFile(configPath, "utf8"));
  const topicCandidatesPath = await latestReportPath("topic-candidates");
  const rawReportPath = await latestReportPath("threads-top-posts");
  const stamp = stampFromPath(topicCandidatesPath);
  if (!stamp) throw new Error("Failed to infer report date stamp.");

  const [topicCandidates, rawReport, inspiration, brandVoice] = await Promise.all([
    readFile(topicCandidatesPath, "utf8"),
    readFile(rawReportPath, "utf8"),
    readFile(path.resolve(projectRoot, config.input.inspiration), "utf8"),
    readFile(path.resolve(projectRoot, config.input.brand_voice), "utf8")
  ]);

  const prompt = buildPrompt({ stamp, topicCandidates, rawReport, inspiration, brandVoice });
  const result = await callGemini({
    apiKey: GEMINI_API_KEY,
    model: config.model,
    prompt
  });

  const jsonPath = path.join(reportsDir, `topic-candidates-ai-${stamp}.json`);
  const mdPath = path.join(reportsDir, `topic-candidates-ai-${stamp}.md`);

  await mkdir(reportsDir, { recursive: true });
  await writeFile(jsonPath, JSON.stringify(result.parsed, null, 2), "utf8");
  await writeFile(mdPath, renderMarkdown(result.parsed), "utf8");

  console.log(`Saved AI analysis JSON: ${jsonPath}`);
  console.log(`Saved AI analysis MD: ${mdPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
