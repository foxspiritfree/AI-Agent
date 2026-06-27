import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const configPath = path.join(projectRoot, "config", "threads-topics.json");
const rawDir = path.join(projectRoot, "data", "raw");
const reportsDir = path.join(projectRoot, "data", "reports");

const GRAPH_BASE_URL = process.env.THREADS_GRAPH_BASE_URL || "https://graph.threads.net/v1.0";
const ACCESS_TOKEN = process.env.THREADS_ACCESS_TOKEN;
const DRY_RUN = process.argv.includes("--dry-run");
const PROBE = process.argv.includes("--probe");
const FROM_RAW = process.argv.includes("--from-raw");
const SOURCE = getArgValue("--source") || "auto";
const OWN_ONLY_UNIQUE_USERNAME_THRESHOLD = 1;

const chromeCandidates = [
  process.env.THREADS_BROWSER_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
].filter(Boolean);

function getArgValue(name) {
  return process.argv.find((arg) => arg.startsWith(`${name}=`))?.slice(name.length + 1);
}

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

async function latestRawPath() {
  const { readdir } = await import("node:fs/promises");
  const files = await readdir(rawDir).catch(() => []);
  const rawFiles = files
    .filter((file) => /^threads-top-posts-\d{4}-\d{2}-\d{2}\.json$/.test(file))
    .sort();
  const latest = rawFiles.at(-1);
  if (!latest) throw new Error("No raw report found. Run fetch first.");
  return path.join(rawDir, latest);
}

function sinceUnixSeconds(windowDays) {
  const ms = Date.now() - windowDays * 24 * 60 * 60 * 1000;
  return Math.floor(ms / 1000);
}

function maybeSince(config) {
  return config.useTimeWindow === false ? undefined : sinceUnixSeconds(config.windowDays);
}

function buildUrl(endpoint, params) {
  const url = new URL(`${GRAPH_BASE_URL}${endpoint}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }
  return url;
}

async function graphGet(endpoint, params) {
  const url = buildUrl(endpoint, {
    ...params,
    access_token: ACCESS_TOKEN
  });
  const response = await fetch(url);
  const text = await response.text();
  let payload;

  try {
    payload = JSON.parse(text);
  } catch {
    payload = { raw: text };
  }

  if (!response.ok) {
    const message = payload?.error?.message || response.statusText;
    throw new Error(`Threads API ${response.status}: ${message}`);
  }

  return payload;
}

function normalizeSearchItems(payload) {
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload)) return payload;
  return [];
}

function normalizePost(raw, topic, query) {
  const id = raw.id || raw.media_id || raw.pk || raw.code || raw.permalink || `${topic.id}:${query}:${JSON.stringify(raw).slice(0, 80)}`;
  return {
    id,
    topic_id: topic.id,
    topic_name: topic.name,
    query,
    text: raw.text || raw.caption || raw.message || "",
    permalink: raw.permalink || raw.url || null,
    username: raw.username || raw.owner?.username || raw.user?.username || null,
    timestamp: raw.timestamp || raw.taken_at || raw.created_time || null,
    like_count: Number(raw.like_count || raw.likes || raw.like_count_total || 0),
    reply_count: Number(raw.reply_count || raw.replies || raw.comments_count || 0),
    repost_count: Number(raw.repost_count || raw.reposts || raw.share_count || 0),
    raw
  };
}

function scorePost(post) {
  return post.reply_count * 3 + post.repost_count * 2 + post.like_count;
}

function parseVisibleTimestamp(value) {
  if (!value) return null;
  const raw = String(value).trim();
  if (!raw) return null;

  const relativeMatch = raw.match(/^(\d+)\s*(秒|分鐘|分|小時|天|週|周|月|年)$/);
  if (relativeMatch) {
    const amount = Number(relativeMatch[1]);
    const unit = relativeMatch[2];
    const minutes =
      unit === "秒" ? amount / 60 :
      unit === "分鐘" || unit === "分" ? amount :
      unit === "小時" ? amount * 60 :
      unit === "天" ? amount * 24 * 60 :
      unit === "週" || unit === "周" ? amount * 7 * 24 * 60 :
      unit === "月" ? amount * 30 * 24 * 60 :
      amount * 365 * 24 * 60;

    return new Date(Date.now() - minutes * 60 * 1000);
  }

  const absoluteMatch = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (absoluteMatch) {
    const [, year, month, day] = absoluteMatch;
    return new Date(Number(year), Number(month) - 1, Number(day), 12, 0, 0, 0);
  }

  const slashMatch = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (slashMatch) {
    const [, month, day, yearText] = slashMatch;
    const year = yearText.length === 2 ? 2000 + Number(yearText) : Number(yearText);
    return new Date(year, Number(month) - 1, Number(day), 12, 0, 0, 0);
  }

  return null;
}

function isWithinWindow(value, windowDays) {
  const parsed = parseVisibleTimestamp(value);
  if (!parsed || Number.isNaN(parsed.getTime())) return false;
  const windowStart = Date.now() - windowDays * 24 * 60 * 60 * 1000;
  return parsed.getTime() >= windowStart;
}

function minutesSinceTimestamp(value) {
  const parsed = parseVisibleTimestamp(value);
  if (!parsed || Number.isNaN(parsed.getTime())) return null;
  return Math.max(0, Math.round((Date.now() - parsed.getTime()) / (60 * 1000)));
}

function truncateText(text, maxLength) {
  const normalized = (text || "").replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 1)}...`;
}

function postReadingText(post, maxLength = 600) {
  return truncateText(post.text || "(no text)", maxLength);
}

async function fetchTopPostsForQuery(topic, query, config) {
  const payload = await graphGet("/keyword_search", {
    q: query,
    search_type: "TOP",
    search_mode: "KEYWORD",
    fields: config.fields,
    limit: config.limitPerQuery,
    since: maybeSince(config)
  });

  return normalizeSearchItems(payload).map((item) => normalizePost(item, topic, query));
}

function resolveBrowserPath() {
  const browserPath = chromeCandidates.find((candidate) => existsSync(candidate));
  if (!browserPath) {
    throw new Error("No Chrome or Edge executable found. Set THREADS_BROWSER_PATH to your browser .exe path.");
  }
  return browserPath;
}

function looksOwnOnly(posts) {
  if (posts.length < 3) return false;
  const usernames = new Set(posts.map((post) => post.username).filter(Boolean));
  return usernames.size <= OWN_ONLY_UNIQUE_USERNAME_THRESHOLD;
}

async function scrapePublicPostsForQuery(page, topic, query, config) {
  const url = new URL("https://www.threads.com/search");
  url.searchParams.set("q", query);

  await page.goto(url.toString(), { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(config.scraperWaitMs || 5000);

  const items = await page.locator('a[href*="/post/"]:not([href$="/media"])').evaluateAll((anchors, args) => {
    const { topic, query, limit } = args;
    const seen = new Set();

    function parseMetric(value) {
      const normalized = value.trim().replace(/[\s,\u00a0]/g, "");
      const match = normalized.match(/^(\d+(?:\.\d+)?)([KMB萬千]?)$/i);
      if (!match) return null;
      const number = Number(match[1]);
      const suffix = match[2].toUpperCase();
      const multiplier = suffix === "K" || suffix === "千" ? 1000 : suffix === "M" || suffix === "百萬" ? 1000000 : suffix === "B" ? 1000000000 : suffix === "萬" ? 10000 : 1;
      return Math.round(number * multiplier);
    }

    function isDateLine(value) {
      return /^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(value.trim())
        || /^\d{4}-\d{1,2}-\d{1,2}$/.test(value.trim())
        || /^\d+\s*(秒|分鐘|分|小時|天|週|周|月|年)$/.test(value.trim());
    }

    function isBoilerplate(value) {
      return [
        "Translate",
        "翻譯",
        "Post not available",
        "Log in",
        "Log in for more threads about this topic.",
        "Log in or sign up for Threads",
        "Continue with Instagram",
        "Log in with username instead"
      ].includes(value.trim());
    }

    return anchors.flatMap((anchor) => {
      const href = anchor.href;
      const match = href.match(/threads\.com\/@([^/]+)\/post\/([^/?#]+)/);
      if (!match || seen.has(match[2])) return [];
      seen.add(match[2]);

      let container = anchor;
      for (let index = 0; index < 7 && container?.parentElement; index += 1) {
        container = container.parentElement;
      }

      const lines = (container?.innerText || "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const username = decodeURIComponent(match[1]);
      const dateIndex = lines.findIndex(isDateLine);
      const metricStartIndex = lines.findIndex((line, index) => index > dateIndex && parseMetric(line) !== null);
      const textEndIndex = metricStartIndex === -1 ? lines.length : metricStartIndex;
      const text = lines
        .slice(dateIndex + 1, textEndIndex)
        .filter((line) => line !== username && !isBoilerplate(line))
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();

      const metrics = lines.slice(metricStartIndex === -1 ? lines.length : metricStartIndex).map(parseMetric).filter((value) => value !== null);

      return [{
        id: match[2],
        topic_id: topic.id,
        topic_name: topic.name,
        query,
        text,
        permalink: href,
        username,
        timestamp: dateIndex === -1 ? null : lines[dateIndex],
        like_count: metrics[0] || 0,
        reply_count: metrics[1] || 0,
        repost_count: metrics[2] || 0,
        raw: {
          source: "threads_public_search",
          lines: lines.slice(0, 20)
        }
      }];
    }).slice(0, limit);
  }, { topic, query, limit: config.limitPerQuery });

  return items.filter((item) => isWithinWindow(item.timestamp, config.windowDays));
}

async function scrapePublicPosts(config) {
  const browser = await chromium.launch({
    headless: true,
    executablePath: resolveBrowserPath()
  });
  const page = await browser.newPage({ locale: "zh-TW" });
  const fetched = [];
  const errors = [];

  try {
    for (const topic of config.topics) {
      for (const query of topic.queries) {
        try {
          const posts = await scrapePublicPostsForQuery(page, topic, query, config);
          fetched.push(...posts);
          console.log(`[scraper ok] ${topic.id} / ${query}: ${posts.length}`);
        } catch (error) {
          errors.push({ topic_id: topic.id, query, source: "scraper", message: error.message });
          console.warn(`[scraper warn] ${topic.id} / ${query}: ${error.message}`);
        }
      }
    }
  } finally {
    await browser.close();
  }

  return { fetched, errors };
}

async function fetchApiPosts(config) {
  const fetched = [];
  const errors = [];

  for (const topic of config.topics) {
    for (const query of topic.queries) {
      try {
        const posts = await fetchTopPostsForQuery(topic, query, config);
        fetched.push(...posts);
        console.log(`[api ok] ${topic.id} / ${query}: ${posts.length}`);
      } catch (error) {
        errors.push({
          topic_id: topic.id,
          query,
          source: "api",
          message: error.message
        });
        console.warn(`[api warn] ${topic.id} / ${query}: ${error.message}`);
      }
    }
  }

  return { fetched, errors };
}

function dedupePosts(posts) {
  const seen = new Map();
  for (const post of posts) {
    const key = post.id || post.permalink;
    const current = seen.get(key);
    const withScore = { ...post, score: scorePost(post) };

    if (!current || withScore.score > current.score) {
      seen.set(key, withScore);
    }
  }
  return [...seen.values()].sort((a, b) => b.score - a.score);
}

function postSignals(post, config) {
  const text = (post.text || "").trim();
  const normalized = text.toLowerCase();
  const minTextLength = config.candidateSettings?.minTextLength || 24;
  const domainKeywords = topicDomainKeywords(post.topic_id);
  let quality = 0;
  let personalFit = 0;
  let noisePenalty = 0;
  const minutesSince = minutesSinceTimestamp(post.timestamp);

  if (text.length >= minTextLength) quality += 18;
  if (text.length >= 80) quality += 14;
  if (text.length >= 180) quality += 10;
  if (text.length >= minTextLength) personalFit += 10;
  if (text.length >= 80) personalFit += 8;
  if (text.length >= 180) personalFit += 6;

  const ideaSignals = [
    "為什麼",
    "不是",
    "其實",
    "真正",
    "方法",
    "流程",
    "系統",
    "習慣",
    "問題",
    "原因",
    "研究",
    "學會",
    "不要",
    "如何",
    "because",
    "why",
    "how to",
    "framework",
    "system",
    "method",
    "workflow"
  ];

  for (const signal of ideaSignals) {
    if (normalized.includes(signal.toLowerCase())) {
      quality += 5;
      personalFit += 4;
    }
  }

  if (domainKeywords.some((keyword) => normalized.includes(keyword.toLowerCase()))) {
    quality += 14;
    personalFit += 14;
  } else {
    quality -= 12;
    personalFit -= 6;
  }

  const lowUseSignals = [
    "徵才",
    "徵人",
    "招募",
    "加入我們",
    "加入官方",
    "限量",
    "開賣",
    "報名",
    "免費領取",
    "體驗組",
    "優惠",
    "折扣",
    "私我",
    "私訊我",
    "想提問的",
    "有沒有什麼想提問",
    "徵求實際心得",
    "聊天來",
    "收 現貨",
    "求推薦",
    "抽獎",
    "留言",
    "私訊",
    "追蹤",
    "轉發",
    " giveaway",
    " comment ",
    " dm ",
    " free ",
    "誰要",
    "拿走",
    "看誰要",
    "笑話",
    "冷知識",
    "聽不懂人話",
    "白痴",
    "幹你娘",
    "星座",
    "金牛座",
    "摩羯座",
    "巨蟹座",
    "雙魚座",
    "啦啦隊",
    "追星",
    "異世界",
    "動漫",
    "月嫂",
    "月子",
    "戀愛",
    "感情發展"
  ];

  for (const signal of lowUseSignals) {
    if (normalized.includes(signal.trim().toLowerCase())) noisePenalty += 18;
  }

  if (text.length < 40 && /[?？]$/.test(text)) noisePenalty += 12;
  if (text.length < 20) noisePenalty += 10;

  if (text.length < minTextLength) noisePenalty += 20;
  if (/^[\p{Emoji_Presentation}\p{Punctuation}\s\d]+$/u.test(text)) noisePenalty += 30;
  if ((text.match(/[。！？.!?]/g) || []).length === 0 && text.length < 50) noisePenalty += 8;

  let momentum = 0;
  if (minutesSince !== null) {
    if (minutesSince <= 24 * 60) momentum += 26;
    else if (minutesSince <= 3 * 24 * 60) momentum += 20;
    else if (minutesSince <= 7 * 24 * 60) momentum += 14;
  }
  if (post.score >= 100) momentum += 6;
  if (post.score >= 500) momentum += 8;
  if (post.score >= 1000) momentum += 10;
  if (post.score >= 3000) momentum += 10;

  quality = quality + Math.round(momentum * 0.5) - noisePenalty;

  const normalizedNoisePenalty = Math.max(0, noisePenalty);
  const noiseRisk = normalizedNoisePenalty >= 30 ? "high" : normalizedNoisePenalty >= 12 ? "medium" : "low";
  const momentumLabel = momentum >= 30 ? "live" : momentum >= 18 ? "warm" : "cold";

  return {
    qualityScore: Math.max(0, quality),
    personalFitScore: Math.max(0, personalFit),
    momentumScore: Math.max(0, momentum),
    noisePenalty: normalizedNoisePenalty,
    noiseRisk,
    momentumLabel,
    minutesSince
  };
}

function topicDomainKeywords(topicId) {
  const keywordMap = {
    "ai-workflow": ["ai", "agent", "automation", "自動化", "工作流", "流程", "工具", "claude", "code", "n8n", "cursor", "系統"],
    "workplace-collaboration": ["職場", "工作", "公司", "主管", "同事", "團隊", "協作", "組織", "信任", "會議", "溝通", "管理", "心理安全"],
    "communication-persuasion": ["溝通", "提問", "傾聽", "說服", "衝突", "情緒", "對話", "理解", "關係", "表達", "回應"],
    "behavior-design": ["習慣", "專注", "拖延", "自律", "多巴胺", "行為", "意志力", "環境", "時間", "練習", "啟動"],
    "growth-resilience": ["成長", "壓力", "反脆弱", "韌性", "平台期", "挫折", "焦慮", "學習", "轉折", "復原", "面對"],
    "writing-knowledge": ["寫作", "閱讀", "筆記", "卡片", "內容", "創作", "知識", "輸出", "素材", "靈感", "文章"],
    "body-health": ["跑步", "睡眠", "疼痛", "肌力", "營養", "運動", "訓練", "身體", "健康", "恢復", "飲食"],
    "product-growth": ["產品", "品牌", "留存", "用戶", "使用者", "體驗", "商業", "成長", "轉換", "市場", "服務"]
  };

  return keywordMap[topicId] || [];
}

function topicAngle(topicId, query) {
  const angles = {
    "ai-workflow": [
      `${query} 的重點不是工具，而是人能不能把工作流說清楚。`,
      "可以寫工具熱潮背後真正缺的是判斷、流程與可委派的任務設計。"
    ],
    "workplace-collaboration": [
      `${query} 不是口號，而是每天決策與資訊流動的結果。`,
      "可以寫團隊裡看不見的摩擦，如何被一個具體互動放大或修復。"
    ],
    "communication-persuasion": [
      `${query} 的關鍵不是講得漂亮，而是讓對方願意繼續交換資訊。`,
      "可以寫溝通技巧失效的原因，以及如何把技巧落回真實情境。"
    ],
    "behavior-design": [
      `${query} 不是意志力問題，而是環境、預先承諾與回饋設計問題。`,
      "可以寫人為什麼明知道該做卻做不到，以及怎麼降低啟動成本。"
    ],
    "growth-resilience": [
      `${query} 不是勵志標語，而是面對現實後重新調整策略。`,
      "可以寫成長敘事裡被忽略的不舒服、代價與轉折點。"
    ],
    "writing-knowledge": [
      `${query} 不是產量問題，而是素材如何被消化、連結與再表達。`,
      "可以寫輸入到輸出的中間層，也就是筆記、卡片與觀點生成。"
    ],
    "body-health": [
      `${query} 不是單一技巧，而是生活節奏、身體感受與長期回饋。`,
      "可以寫身體知識如何從資訊變成可執行的日常判斷。"
    ],
    "product-growth": [
      `${query} 不是表面數字，而是使用者為什麼留下、相信或離開。`,
      "可以寫產品成長背後的體驗、信任與行為設計。"
    ]
  };

  return angles[topicId] || [`${query} 有可延伸的討論空間。`, "可以從熱門素材抽出一個更具體的個人觀點。"];
}

function buildCandidateTitle(query, evidence) {
  const topicId = evidence[0]?.topic_id;
  const titles = {
    "ai-workflow": `${query}：工具熱潮背後，真正缺的是可委派的工作流`,
    "workplace-collaboration": `${query}：把抽象的團隊信念寫成具體互動`,
    "communication-persuasion": `${query}：不是技巧問題，而是資訊交換能不能繼續`,
    "behavior-design": `${query}：不要再怪意志力，先看環境怎麼設計`,
    "growth-resilience": `${query}：把勵志口號拆成真實轉折與代價`,
    "writing-knowledge": `${query}：從輸入到輸出，中間缺的是觀點生成`,
    "body-health": `${query}：資訊很多，真正難的是日常判斷`,
    "product-growth": `${query}：別只看表面數字，要看人為什麼留下`
  };

  return titles[topicId] || `${query}：可延伸的寫作題材`;
}

function buildTopicCandidates(posts, config) {
  const settings = config.candidateSettings || {};
  const minQualityScore = settings.minQualityScore || 35;
  const reviewMinScore = settings.reviewMinScore || Math.max(20, minQualityScore - 12);
  const minEvidencePerCandidate = settings.minEvidencePerCandidate || 1;
  const maxCandidatesPerTopic = settings.maxCandidatesPerTopic || 3;
  const maxReviewPoolPerTopic = settings.maxReviewPoolPerTopic || 5;
  const maxEvidencePerCandidate = settings.maxEvidencePerCandidate || 4;
  const byTopicAndQuery = new Map();
  const reviewPoolByTopic = new Map();

  for (const post of posts) {
    const signals = postSignals(post, config);
    if (signals.qualityScore < reviewMinScore) continue;
    const key = `${post.topic_id}::${post.query}`;
    if (!byTopicAndQuery.has(key)) byTopicAndQuery.set(key, []);
    byTopicAndQuery.get(key).push({ ...post, ...signals });
  }

  const candidatesByTopic = new Map();
  for (const [key, groupedPosts] of byTopicAndQuery.entries()) {
    const [topicId, query] = key.split("::");
    const eligible = groupedPosts.filter((post) => post.qualityScore >= minQualityScore);
    const candidateSource = eligible.length >= minEvidencePerCandidate ? eligible : groupedPosts;
    const evidence = groupedPosts
      .sort((a, b) => (b.personalFitScore + b.momentumScore + b.qualityScore / 2) - (a.personalFitScore + a.momentumScore + a.qualityScore / 2))
      .slice(0, maxEvidencePerCandidate);
    const topic = config.topics.find((item) => item.id === topicId);
    const candidate = {
      topic_id: topicId,
      topic_name: topic?.name || topicId,
      query,
      title: buildCandidateTitle(query, candidateSource),
      score: Math.round(candidateSource.reduce((sum, post) => sum + post.qualityScore, 0) / candidateSource.length),
      personal_fit: Math.round(candidateSource.reduce((sum, post) => sum + post.personalFitScore, 0) / candidateSource.length),
      momentum_fit: Math.round(candidateSource.reduce((sum, post) => sum + post.momentumScore, 0) / candidateSource.length),
      momentum_label: candidateSource.some((post) => post.momentumLabel === "live")
        ? "live"
        : candidateSource.some((post) => post.momentumLabel === "warm")
          ? "warm"
          : "cold",
      noise_risk: candidateSource.some((post) => post.noiseRisk === "high")
        ? "high"
        : candidateSource.some((post) => post.noiseRisk === "medium")
          ? "medium"
          : "low",
      angles: topicAngle(topicId, query),
      reason: `抓到 ${groupedPosts.length} 則可延伸素材，最高互動分 ${Math.max(...groupedPosts.map((post) => post.score))}；目前判定 personal fit ${Math.round(candidateSource.reduce((sum, post) => sum + post.personalFitScore, 0) / candidateSource.length)}、momentum fit ${Math.round(candidateSource.reduce((sum, post) => sum + post.momentumScore, 0) / candidateSource.length)}。`,
      evidence
    };

    if (eligible.length >= minEvidencePerCandidate) {
      if (!candidatesByTopic.has(topicId)) candidatesByTopic.set(topicId, []);
      candidatesByTopic.get(topicId).push(candidate);
    } else {
      if (!reviewPoolByTopic.has(topicId)) reviewPoolByTopic.set(topicId, []);
      reviewPoolByTopic.get(topicId).push(candidate);
    }
  }

  for (const [topicId, candidates] of candidatesByTopic.entries()) {
    candidatesByTopic.set(
      topicId,
      candidates
        .sort((a, b) => (b.personal_fit * 1.2 + b.momentum_fit + b.score) - (a.personal_fit * 1.2 + a.momentum_fit + a.score))
        .slice(0, maxCandidatesPerTopic)
    );
  }

  for (const [topicId, candidates] of reviewPoolByTopic.entries()) {
    reviewPoolByTopic.set(
      topicId,
      candidates
        .sort((a, b) => (b.momentum_fit + b.personal_fit + b.score) - (a.momentum_fit + a.personal_fit + a.score))
        .slice(0, maxReviewPoolPerTopic)
    );
  }

  return { candidatesByTopic, reviewPoolByTopic };
}

function makeReport(posts, config) {
  const lines = [
    "# Threads Weekly Reading Report",
    "",
    `Generated: ${new Date().toISOString()}`,
    `Window: last ${config.windowDays} days`,
    "",
    "## Summary",
    ""
  ];

  const byTopic = new Map();
  for (const post of posts) {
    if (!byTopic.has(post.topic_id)) byTopic.set(post.topic_id, []);
    byTopic.get(post.topic_id).push(post);
  }

  for (const topic of config.topics) {
    const topicPosts = byTopic.get(topic.id) || [];
    lines.push(`- ${topic.name}: ${topicPosts.length}`);
  }

  lines.push("", "## Readable Posts", "");

  for (const topic of config.topics) {
    const topicPosts = (byTopic.get(topic.id) || []).slice(0, 10);
    lines.push(`### ${topic.name}`, "");

    if (topicPosts.length === 0) {
      lines.push("- No posts found.", "");
      continue;
    }

    for (const post of topicPosts) {
      lines.push(`- score=${post.score} query=${post.query}`);
      lines.push(`  - author=@${post.username || "unknown"} date=${post.timestamp || "unknown"}`);
      lines.push(`  - ${postReadingText(post)}`);
      if (post.permalink) lines.push(`  - ${post.permalink}`);
    }

    lines.push("");
  }

  return lines.join("\n");
}

function makeCandidateReport(posts, config) {
  const { candidatesByTopic, reviewPoolByTopic } = buildTopicCandidates(posts, config);
  const lines = [
    "# Threads Topic Candidates",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "這份報告不是熱門貼文清單，而是從熱門素材中篩出的可寫題材。篩選會偏好有觀點、有方法感、可延伸的內容，降低純迷因、短句、抽獎與無脈絡爆文權重。",
    ""
  ];

  for (const topic of config.topics) {
    const candidates = candidatesByTopic.get(topic.id) || [];
    const reviewPool = reviewPoolByTopic.get(topic.id) || [];
    lines.push(`## ${topic.name}`, "");

    if (candidates.length === 0) {
      lines.push("- No direct candidates found.", "");
    } else {
      for (const candidate of candidates) {
        lines.push(`### ${candidate.title}`, "");
        lines.push(`- query: ${candidate.query}`);
        lines.push(`- candidate_score: ${candidate.score}`);
        lines.push(`- personal_fit: ${candidate.personal_fit}`);
        lines.push(`- momentum_fit: ${candidate.momentum_fit}`);
        lines.push(`- momentum_label: ${candidate.momentum_label}`);
        lines.push(`- noise_risk: ${candidate.noise_risk}`);
        lines.push(`- why: ${candidate.reason}`);
        lines.push("- 可寫角度:");
        for (const angle of candidate.angles) {
          lines.push(`  - ${angle}`);
        }
        lines.push("- 可引用素材:");
        for (const post of candidate.evidence) {
          lines.push(`  - @${post.username || "unknown"} score=${post.score} quality=${post.qualityScore} personal=${post.personalFitScore} momentum=${post.momentumScore} risk=${post.noiseRisk}`);
          lines.push(`    - ${postReadingText(post, 260)}`);
          if (post.permalink) lines.push(`    - ${post.permalink}`);
        }
        lines.push("");
      }
    }

    lines.push("### Review Pool", "");
    if (reviewPool.length === 0) {
      lines.push("- No review-pool topics.", "");
      continue;
    }

    for (const candidate of reviewPool) {
      lines.push(`- ${candidate.title}`);
      lines.push(`  - query: ${candidate.query}`);
      lines.push(`  - candidate_score: ${candidate.score}`);
      lines.push(`  - personal_fit: ${candidate.personal_fit}`);
      lines.push(`  - momentum_fit: ${candidate.momentum_fit}`);
      lines.push(`  - momentum_label: ${candidate.momentum_label}`);
      lines.push(`  - noise_risk: ${candidate.noise_risk}`);
      lines.push(`  - why: ${candidate.reason}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

async function main() {
  const config = JSON.parse(await readFile(configPath, "utf8"));

  if (FROM_RAW) {
    await mkdir(reportsDir, { recursive: true });
    const rawPath = getArgValue("--raw") || await latestRawPath();
    const raw = JSON.parse(await readFile(rawPath, "utf8"));
    const posts = dedupePosts(raw.posts || []);
    const stamp = path.basename(rawPath).match(/(\d{4}-\d{2}-\d{2})/)?.[1] || todayStamp();
    const reportPath = path.join(reportsDir, `threads-top-posts-${stamp}.md`);
    const candidatesPath = path.join(reportsDir, `topic-candidates-${stamp}.md`);

    await writeFile(reportPath, makeReport(posts, config), "utf8");
    await writeFile(candidatesPath, makeCandidateReport(posts, config), "utf8");

    console.log(`Loaded raw data: ${rawPath}`);
    console.log(`Saved report: ${reportPath}`);
    console.log(`Saved topic candidates: ${candidatesPath}`);
    return;
  }

  if (PROBE) {
    if (!ACCESS_TOKEN) {
      console.error("Missing THREADS_ACCESS_TOKEN. Set it before running probe.");
      process.exitCode = 1;
      return;
    }

    const query = process.argv.find((arg) => arg.startsWith("--q="))?.slice(4) || "AI";
    const payload = await graphGet("/keyword_search", {
      q: query,
      search_type: "TOP",
      search_mode: "KEYWORD",
      fields: config.fields,
      limit: 5
    });

    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  if (DRY_RUN) {
    const windowLabel = config.useTimeWindow === false ? "no time window" : `last ${config.windowDays} days`;
    console.log(`Dry run: ${config.topics.length} topics, ${windowLabel}, limit ${config.limitPerQuery} per query, source ${SOURCE}.`);
    for (const topic of config.topics) {
      console.log(`\n[${topic.id}] ${topic.name}`);
      for (const query of topic.queries) {
        const url = buildUrl("/keyword_search", {
          q: query,
          search_type: "TOP",
          search_mode: "KEYWORD",
          fields: config.fields,
          limit: config.limitPerQuery,
          since: maybeSince(config)
        });
        console.log(`- ${query}: ${url.toString()}`);
      }
    }
    return;
  }

  if (!["auto", "api", "scraper"].includes(SOURCE)) {
    console.error("Invalid --source. Use --source=auto, --source=api, or --source=scraper.");
    process.exitCode = 1;
    return;
  }

  if (SOURCE === "api" && !ACCESS_TOKEN) {
    console.error("Missing THREADS_ACCESS_TOKEN. Set it before running the fetcher.");
    console.error("PowerShell example: $env:THREADS_ACCESS_TOKEN='your-token'; node .\\scripts\\fetch-threads-top-posts.mjs");
    process.exitCode = 1;
    return;
  }

  await mkdir(rawDir, { recursive: true });
  await mkdir(reportsDir, { recursive: true });

  let result;

  if (SOURCE === "scraper" || (SOURCE === "auto" && !ACCESS_TOKEN)) {
    result = await scrapePublicPosts(config);
  } else {
    result = await fetchApiPosts(config);

    if (SOURCE === "auto" && looksOwnOnly(result.fetched)) {
      console.warn("[auto] API results appear limited to one username. Falling back to public scraper.");
      const scraperResult = await scrapePublicPosts(config);
      result = {
        fetched: scraperResult.fetched,
        errors: [...result.errors, ...scraperResult.errors]
      };
    }
  }

  const posts = dedupePosts(result.fetched);
  const stamp = todayStamp();
  const rawPath = path.join(rawDir, `threads-top-posts-${stamp}.json`);
  const reportPath = path.join(reportsDir, `threads-top-posts-${stamp}.md`);
  const candidatesPath = path.join(reportsDir, `topic-candidates-${stamp}.md`);

  await writeFile(rawPath, JSON.stringify({ generated_at: new Date().toISOString(), source: SOURCE, errors: result.errors, posts }, null, 2), "utf8");
  await writeFile(reportPath, makeReport(posts, config), "utf8");
  await writeFile(candidatesPath, makeCandidateReport(posts, config), "utf8");

  console.log(`Saved raw data: ${rawPath}`);
  console.log(`Saved report: ${reportPath}`);
  console.log(`Saved topic candidates: ${candidatesPath}`);
  if (result.errors.length > 0) console.log(`Completed with ${result.errors.length} query errors.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
