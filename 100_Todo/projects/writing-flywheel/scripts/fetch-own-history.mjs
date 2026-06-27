import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const rawDir = path.join(projectRoot, "data", "raw");

const GRAPH_BASE_URL = process.env.THREADS_GRAPH_BASE_URL || "https://graph.threads.net/v1.0";
const ACCESS_TOKEN = process.env.THREADS_ACCESS_TOKEN;
const DRY_RUN = process.argv.includes("--dry-run");
const SKIP_INSIGHTS = process.argv.includes("--skip-insights");
const LIMIT = Number(getArgValue("--limit") || 100);
const MAX_PAGES = Number(getArgValue("--max-pages") || 20);

const THREAD_FIELDS = [
  "id",
  "media_product_type",
  "media_type",
  "media_url",
  "permalink",
  "owner",
  "username",
  "text",
  "timestamp",
  "shortcode",
  "thumbnail_url",
  "is_quote_post"
].join(",");

const INSIGHT_METRICS = ["views", "likes", "replies", "reposts", "quotes", "shares"];

function getArgValue(name) {
  return process.argv.find((arg) => arg.startsWith(`${name}=`))?.slice(name.length + 1);
}

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

function buildUrl(endpoint, params = {}) {
  const url = new URL(`${GRAPH_BASE_URL}${endpoint}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }
  return url;
}

async function graphGet(endpoint, params = {}) {
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

async function graphGetUrl(nextUrl) {
  const response = await fetch(nextUrl);
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

async function fetchAllOwnPosts() {
  const posts = [];
  let page = 0;
  let payload = await graphGet("/me/threads", {
    fields: THREAD_FIELDS,
    limit: LIMIT
  });

  while (payload && page < MAX_PAGES) {
    page += 1;
    const pagePosts = Array.isArray(payload.data) ? payload.data : [];
    posts.push(...pagePosts);
    console.log(`[history ok] page ${page}: ${pagePosts.length} posts`);

    const next = payload.paging?.next;
    if (!next) break;
    payload = await graphGetUrl(next);
  }

  return posts;
}

async function fetchInsights(postId) {
  if (SKIP_INSIGHTS) return {};

  const payload = await graphGet(`/${postId}/insights`, {
    metric: INSIGHT_METRICS.join(",")
  });

  const metrics = {};
  for (const item of payload.data || []) {
    const value = item.values?.[0]?.value;
    metrics[item.name] = Number.isFinite(Number(value)) ? Number(value) : 0;
  }

  return metrics;
}

function countWords(text) {
  const normalized = (text || "").trim();
  if (!normalized) return 0;
  const chineseChars = normalized.match(/[\u4e00-\u9fff]/g)?.length || 0;
  const latinWords = normalized.match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)*/g)?.length || 0;
  return chineseChars + latinWords;
}

function paragraphCount(text) {
  return (text || "")
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean).length || 0;
}

function inferTopics(text, topicsConfig) {
  const normalized = (text || "").toLowerCase();
  const matches = [];

  for (const topic of topicsConfig.topics || []) {
    const hit = (topic.queries || []).some((query) => normalized.includes(String(query).toLowerCase()));
    if (hit) matches.push(topic.name || topic.id);
  }

  return matches;
}

function normalizeTrackerPost(raw, metrics, topicsConfig) {
  const text = raw.text || "";
  const createdAt = raw.timestamp || null;

  return {
    id: raw.id,
    text,
    created_at: createdAt,
    permalink: raw.permalink || "",
    media_type: raw.media_type || "TEXT",
    is_reply_post: false,
    content_type: "unknown",
    topics: inferTopics(text, topicsConfig),
    hook_type: null,
    ending_type: null,
    emotional_arc: null,
    word_count: countWords(text),
    paragraph_count: paragraphCount(text),
    posting_time_slot: createdAt ? createdAt.slice(11, 16) : null,
    algorithm_signals: {
      discovery_surface: {
        threads: null,
        instagram: null,
        facebook: null,
        profile: null,
        topic_feed: null,
        other: null
      },
      topic_graph: {
        topic_tag_used: null,
        topic_tag_count: null,
        topic_match_clarity: null,
        single_topic_clarity: null,
        bio_topic_match: null
      },
      topic_freshness: {
        semantic_cluster: null,
        similar_recent_posts: null,
        recent_cluster_frequency: null,
        days_since_last_similar_post: null,
        freshness_score: null,
        fatigue_risk: null
      },
      originality_risk: {
        caption_content_mismatch: null,
        hashtag_stuffing_risk: null,
        duplicate_cluster_risk: null,
        minor_edit_repost_risk: null,
        low_value_reaction_risk: null,
        fake_engagement_pattern_risk: null
      }
    },
    psychology_signals: {
      hook_payoff: {
        hook_strength: null,
        payoff_strength: null,
        hook_payoff_gap: null
      },
      share_motive_split: {
        dm_forwardability: null,
        public_repostability: null,
        identity_signal_strength: null,
        utility_share_strength: null
      },
      retellability: null
    },
    metrics: {
      views: metrics.views || 0,
      likes: metrics.likes || 0,
      replies: metrics.replies || 0,
      reposts: metrics.reposts || 0,
      quotes: metrics.quotes || 0,
      shares: metrics.shares || 0
    },
    performance_windows: {
      "24h": null,
      "72h": null,
      "7d": null
    },
    snapshots: [{
      captured_at: new Date().toISOString(),
      hours_since_publish: createdAt ? Math.max(0, Math.round((Date.now() - Date.parse(createdAt)) / 36e5)) : null,
      views: metrics.views || 0,
      likes: metrics.likes || 0,
      replies: metrics.replies || 0,
      reposts: metrics.reposts || 0,
      quotes: metrics.quotes || 0,
      shares: metrics.shares || 0
    }],
    prediction_snapshot: null,
    review_state: {
      last_reviewed_at: null,
      actual_checkpoint_hours: null,
      deviation_summary: null,
      calibration_notes: [],
      validated_signals: {
        discovery_surface_notes: null,
        topic_graph_notes: null,
        topic_freshness_notes: null,
        originality_risk_notes: null,
        hook_payoff_gap_notes: null,
        share_motive_split_notes: null,
        retellability_notes: null
      }
    },
    comments: [],
    source: {
      import_path: "threads_api_own_history",
      data_completeness: SKIP_INSIGHTS ? "partial_no_insights" : "partial_no_comments",
      raw_media_product_type: raw.media_product_type || null,
      raw_shortcode: raw.shortcode || null,
      raw_is_quote_post: raw.is_quote_post ?? null
    }
  };
}

function buildTracker(account, rawPosts, insightById, topicsConfig) {
  const posts = rawPosts
    .filter((post) => post.id && post.text)
    .map((post) => normalizeTrackerPost(post, insightById.get(post.id) || {}, topicsConfig))
    .sort((a, b) => String(b.created_at || "").localeCompare(String(a.created_at || "")));

  return {
    schema_version: 1,
    _meta: {
      generated_by: "writing-flywheel/fetch-own-history",
      generated_at: new Date().toISOString(),
      source_note: "Own Threads history via official Threads API. Comments are not imported in this MVP."
    },
    account: {
      handle: account.username ? `@${account.username}` : null,
      id: account.id || null,
      source: "threads_api",
      timezone: "Asia/Taipei"
    },
    posts,
    last_updated: new Date().toISOString()
  };
}

function makePostsByDate(tracker) {
  const lines = [
    "# Threads Own History",
    "",
    `Generated: ${new Date().toISOString()}`,
    `Account: ${tracker.account.handle || tracker.account.id || "unknown"}`,
    `Posts: ${tracker.posts.length}`,
    ""
  ];

  for (const post of tracker.posts) {
    lines.push(`## ${post.created_at || "unknown"} · ${post.id}`, "");
    lines.push(`- metrics: views=${post.metrics.views} likes=${post.metrics.likes} replies=${post.metrics.replies} reposts=${post.metrics.reposts} quotes=${post.metrics.quotes} shares=${post.metrics.shares}`);
    if (post.permalink) lines.push(`- link: ${post.permalink}`);
    if (post.topics.length > 0) lines.push(`- topics: ${post.topics.join(", ")}`);
    lines.push("", post.text.trim(), "");
  }

  return lines.join("\n");
}

async function loadTopicsConfig() {
  const configPath = path.join(projectRoot, "config", "threads-topics.json");
  return JSON.parse(await readFile(configPath, "utf8"));
}

async function main() {
  if (DRY_RUN) {
    console.log(`Dry run: fetch /me then /me/threads with limit=${LIMIT}, max-pages=${MAX_PAGES}.`);
    console.log(`Insights: ${SKIP_INSIGHTS ? "skipped" : INSIGHT_METRICS.join(",")}`);
    console.log(`Output: threads_daily_tracker.json and posts_by_date.md in ${projectRoot}`);
    return;
  }

  if (!ACCESS_TOKEN) {
    console.error("Missing THREADS_ACCESS_TOKEN. Set it before fetching own history.");
    console.error("PowerShell example: $env:THREADS_ACCESS_TOKEN='your-token'; npm run fetch:own");
    process.exitCode = 1;
    return;
  }

  await mkdir(rawDir, { recursive: true });

  const topicsConfig = await loadTopicsConfig();
  const account = await graphGet("/me", { fields: "id,username,name" });
  const rawPosts = await fetchAllOwnPosts();
  const insightById = new Map();

  for (const [index, post] of rawPosts.entries()) {
    try {
      const metrics = await fetchInsights(post.id);
      insightById.set(post.id, metrics);
      if (!SKIP_INSIGHTS) console.log(`[insights ok] ${index + 1}/${rawPosts.length}: ${post.id}`);
    } catch (error) {
      insightById.set(post.id, {});
      console.warn(`[insights warn] ${post.id}: ${error.message}`);
    }
  }

  const tracker = buildTracker(account, rawPosts, insightById, topicsConfig);
  const stamp = todayStamp();
  const rawPath = path.join(rawDir, `threads-own-posts-${stamp}.json`);
  const trackerPath = path.join(projectRoot, "threads_daily_tracker.json");
  const postsByDatePath = path.join(projectRoot, "posts_by_date.md");

  await writeFile(rawPath, JSON.stringify({ generated_at: new Date().toISOString(), account, posts: rawPosts }, null, 2), "utf8");
  await writeFile(trackerPath, JSON.stringify(tracker, null, 2), "utf8");
  await writeFile(postsByDatePath, makePostsByDate(tracker), "utf8");

  console.log(`Saved raw own posts: ${rawPath}`);
  console.log(`Saved tracker: ${trackerPath}`);
  console.log(`Saved readable archive: ${postsByDatePath}`);
  console.log(`Imported ${tracker.posts.length} posts with text from ${rawPosts.length} raw posts.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
