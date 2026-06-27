function D(t){try{const e=new URL(t);return(e.hostname==="www.youtube.com"||e.hostname==="youtube.com")&&e.pathname==="/watch"&&!!e.searchParams.get("v")}catch{return!1}}function W(t){try{return new URL(t).searchParams.get("v")}catch{return null}}function q(){var e,r;return(((e=document.querySelector('meta[property="og:title"]'))==null?void 0:e.content)||((r=document.querySelector("h1 yt-formatted-string"))==null?void 0:r.textContent)||document.title).replace(/\s+-\s+YouTube$/,"").trim()||"Untitled YouTube Video"}function x(){const t=W(location.href);if(!t)throw new Error("目前分頁不是可支援的 YouTube watch 頁。");return{videoId:t,title:q(),url:location.href,capturedAt:new Date().toISOString()}}const H="TRANSCRIBE_EXTRACT_PAGE_DATA",V="TRANSCRIBE_FETCH_CAPTION_TRACK",J="TRANSCRIBE_FETCH_TRANSCRIPT_PANEL",X="TRANSCRIBE_FETCH_INNERTUBE_CAPTION",Z="TRANSCRIBE_TRIGGER_CAPTION_PLAYBACK",Q="TRANSCRIBE_TOGGLE_PANEL",h="geminiApiKey",w="openaiApiKey",k="sttProvider";let i=null,b=null,M=null,S="";window.addEventListener("message",t=>{if(t.source===window&&t.data&&t.data.source==="yt-caption-interceptor"){const{url:e,raw:r}=t.data;chrome.runtime.sendMessage({type:"CAPTION_RECORD_CAPTURED_CONTENT",url:e,raw:r})}});chrome.runtime.onMessage.addListener((t,e,r)=>{if(!tt(t))return et(t)?(U(),r({ok:!0,data:!0}),!1):nt(t)?(Y(t.track).then(n=>{r({ok:!0,data:n})}).catch(n=>{r({ok:!1,error:n instanceof Error?n.message:String(n)})}),!0):rt(t)?(xt().then(n=>{r({ok:!0,data:n})}).catch(n=>{r({ok:!1,error:n instanceof Error?n.message:String(n)})}),!0):ot(t)?(Nt(t).then(n=>{r({ok:!0,data:n})}).catch(n=>{r({ok:!1,error:n instanceof Error?n.message:String(n)})}),!0):(at(t)&&(L(t),r({ok:!0,data:!0})),!1);try{if(!D(location.href))throw new Error("請先打開 YouTube 影片頁。");const n={video:x(),playerResponse:K()};r({ok:!0,data:n})}catch(n){r({ok:!1,error:n instanceof Error?n.message:String(n)})}return!1});function tt(t){return typeof t=="object"&&t!==null&&t.type===H}function et(t){return typeof t=="object"&&t!==null&&t.type===Q}function nt(t){var e;return typeof t=="object"&&t!==null&&t.type===V&&typeof((e=t.track)==null?void 0:e.baseUrl)=="string"}function rt(t){return typeof t=="object"&&t!==null&&t.type===J}function ot(t){return typeof t=="object"&&t!==null&&t.type===X&&typeof t.videoId=="string"}function at(t){return typeof t=="object"&&t!==null&&t.type===Z}function L(t){var n,o,a,c;const e=document.querySelector("#movie_player");(n=e==null?void 0:e.loadModule)==null||n.call(e,"captions"),(o=e==null?void 0:e.setOption)==null||o.call(e,"captions","track",t.languageCode?{languageCode:t.languageCode}:{}),(a=e==null?void 0:e.setOption)==null||a.call(e,"captions","reload",!0),(c=e==null?void 0:e.setOptionForSubtitles)==null||c.call(e,"track",t.languageCode?{languageCode:t.languageCode}:{});const r=new KeyboardEvent("keydown",{key:"c",code:"KeyC",keyCode:67,which:67,bubbles:!0});document.dispatchEvent(r)}async function U(){if(i){i.remove(),i=null,F();return}i=document.createElement("div"),i.id="yt-caption-md-panel",i.innerHTML=`
    <div class="ytcmd-panel">
      <div class="ytcmd-header">
        <strong>YouTube Caption to MD</strong>
        <button type="button" data-action="close">×</button>
      </div>
      <div class="ytcmd-status" data-role="status">Ready</div>
      <dl class="ytcmd-stats">
        <div>
          <dt>Segments</dt>
          <dd data-role="segments">0</dd>
        </div>
        <div>
          <dt>Words</dt>
          <dd data-role="words">0</dd>
        </div>
      </dl>
      <label>
        <span>Markdown Format</span>
        <select data-role="format">
          <option value="ai-prompt">AI Prompt</option>
          <option value="timestamp-list">Timestamp List</option>
          <option value="plain-text">Plain Text</option>
        </select>
      </label>
      <div class="ytcmd-actions">
        <button type="button" data-action="fetch-captions">抓取字幕 Markdown</button>
      </div>
      <label>
        <span>STT Provider</span>
        <select data-role="provider">
          <option value="gemini">Gemini</option>
          <option value="openai">OpenAI</option>
        </select>
      </label>
      <label>
        <span>API key</span>
        <input data-role="apiKey" type="password" placeholder="Gemini or OpenAI API key" />
      </label>
      <div class="ytcmd-actions">
        <button type="button" data-action="start">開始語音轉文字</button>
        <button type="button" data-action="stop" disabled>停止並轉錄</button>
      </div>
      <div class="ytcmd-actions">
        <button type="button" data-action="copy" disabled>複製</button>
        <button type="button" data-action="download" disabled>下載 .md</button>
      </div>
    </div>
  `,document.documentElement.append(i),it(),await $(),ct(),mt()}function it(){if(document.getElementById("yt-caption-md-panel-style"))return;const t=document.createElement("style");t.id="yt-caption-md-panel-style",t.textContent=`
    #yt-caption-md-panel {
      position: fixed;
      top: 72px;
      right: 18px;
      z-index: 2147483647;
      width: 360px;
      color: #202124;
      font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    #yt-caption-md-panel * { box-sizing: border-box; }
    #yt-caption-md-panel .ytcmd-panel {
      display: grid;
      gap: 12px;
      padding: 14px;
      border: 1px solid #dadce0;
      border-radius: 8px;
      background: #fff;
      box-shadow: 0 8px 28px rgba(60, 64, 67, 0.25);
    }
    #yt-caption-md-panel .ytcmd-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      font-size: 15px;
    }
    #yt-caption-md-panel .ytcmd-status {
      min-height: 22px;
      color: #5f6368;
      font-size: 12px;
      white-space: pre-wrap;
    }
    #yt-caption-md-panel label {
      display: grid;
      gap: 6px;
      color: #5f6368;
      font-size: 12px;
    }
    #yt-caption-md-panel input,
    #yt-caption-md-panel select {
      width: 100%;
      border: 1px solid #c7c9cc;
      border-radius: 6px;
      padding: 7px 8px;
      color: #202124;
      background: #fff;
      font: inherit;
      font-size: 13px;
    }
    #yt-caption-md-panel .ytcmd-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    #yt-caption-md-panel .ytcmd-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin: 0;
      border: 1px solid #dadce0;
      border-radius: 8px;
      overflow: hidden;
    }
    #yt-caption-md-panel .ytcmd-stats div {
      padding: 8px 10px;
    }
    #yt-caption-md-panel .ytcmd-stats div + div {
      border-left: 1px solid #dadce0;
    }
    #yt-caption-md-panel .ytcmd-stats dt,
    #yt-caption-md-panel .ytcmd-stats dd {
      margin: 0;
    }
    #yt-caption-md-panel .ytcmd-stats dt {
      color: #5f6368;
      font-size: 12px;
    }
    #yt-caption-md-panel .ytcmd-stats dd {
      margin-top: 2px;
      font-weight: 700;
      font-size: 14px;
    }
    #yt-caption-md-panel button {
      min-height: 34px;
      border: 0;
      border-radius: 6px;
      background: #1a73e8;
      color: #fff;
      cursor: pointer;
      font: inherit;
      font-weight: 600;
    }
    #yt-caption-md-panel button:disabled {
      background: #d7dce2;
      color: #7b8188;
      cursor: default;
    }
    #yt-caption-md-panel [data-action="close"] {
      width: 30px;
      min-height: 30px;
      background: #eef3fb;
      color: #185abc;
    }
  `,document.head.append(t)}async function $(){if(!i)return;const t=u("provider"),e=u("apiKey"),r=await chrome.storage.local.get([k,h,w]),n=r[k]==="openai"?"openai":"gemini";t.value=n,e.value=typeof r[n==="gemini"?h:w]=="string"?r[n==="gemini"?h:w]:"",await B()}function ct(){var t,e,r,n,o,a;i&&((t=i.querySelector('[data-action="close"]'))==null||t.addEventListener("click",()=>{U()}),(e=i.querySelector('[data-action="start"]'))==null||e.addEventListener("click",()=>{st()}),(r=i.querySelector('[data-action="fetch-captions"]'))==null||r.addEventListener("click",()=>{ut()}),(n=i.querySelector('[data-action="stop"]'))==null||n.addEventListener("click",()=>{lt()}),(o=i.querySelector('[data-action="copy"]'))==null||o.addEventListener("click",()=>{gt()}),(a=i.querySelector('[data-action="download"]'))==null||a.addEventListener("click",()=>{yt()}),u("provider").addEventListener("change",()=>{$()}),u("apiKey").addEventListener("change",()=>{N()}))}async function st(){try{l("STT 啟動中"),p("transcribing"),await N();const t=await chrome.runtime.sendMessage({type:"STT_START_RECORDING"});if(!y(t)||!t.ok)throw new Error(y(t)&&!t.ok?t.error:"STT 背景程序沒有回應。");p("recording"),l("STT 錄音中")}catch(t){p("idle"),l(t instanceof Error?t.message:String(t))}}async function lt(){try{l("STT 轉錄中"),p("transcribing"),await N();const t=await chrome.runtime.sendMessage({type:"STT_STOP_AND_TRANSCRIBE",apiKey:u("apiKey").value.trim(),provider:u("provider").value});if(!y(t)||!t.ok)throw new Error(y(t)&&!t.ok?t.error:"STT 背景程序沒有回應。");const e=G(t.data.text,t.data.recordedAt);v(e,[{startSec:0,durationSec:null,text:t.data.text,source:"speech-to-text"}]),p("idle"),l("STT 完成")}catch(t){p("idle"),l(t instanceof Error?t.message:String(t))}}async function B(){try{const t=await chrome.runtime.sendMessage({type:"STT_GET_STATUS"});y(t)&&t.ok&&(p(t.data.status),t.data.status==="recording"&&l("STT 錄音中"),t.data.status==="transcribing"&&l("STT 轉錄中"),t.data.lastResult&&t.data.lastResult.id!==M&&(M=t.data.lastResult.id,v(G(t.data.lastResult.text,t.data.lastResult.recordedAt),[{startSec:0,durationSec:null,text:t.data.lastResult.text,source:"speech-to-text"}]),p("idle"),l("STT 完成")))}catch{p("idle")}}async function ut(){try{l("抓取字幕中");const t=K(),e=At(t),r=kt(e);if(!r)throw new Error("找不到可用字幕軌。");await L({languageCode:r.languageCode}),await St(1800);const n=await dt(r),o=Pt(n,r.languageCode);if(!o.length)throw new Error("字幕解析後沒有內容。");const c={video:x(),selectedTrack:r,segments:o};v(vt(c,Tt()),o),l(`完成：${o.length} segments`)}catch(t){l(t instanceof Error?t.message:String(t))}}async function dt(t){try{return await Y(t)}catch{return await pt(t)}}async function pt(t){const e=await chrome.runtime.sendMessage({type:"CAPTION_GET_CAPTURED_CONTENTS"});if(!y(e)||!e.ok)throw new Error("沒有 captured timedtext 內容。");const r=e.data.contents.filter(n=>bt(n.url,t.languageCode));if(r.length>0){const n=r[0];return{raw:n.raw,format:z(n.raw)}}throw new Error("captured timedtext fallback 失敗。")}function v(t,e){S=t;const r=i==null?void 0:i.querySelector('[data-action="copy"]'),n=i==null?void 0:i.querySelector('[data-action="download"]'),o=!!t.trim();r&&(r.disabled=!o),n&&(n.disabled=!o),ft(e)}function ft(t){u("segments").textContent=String(t.length),u("words").textContent=String(ht(t.map(e=>e.text).join(" ")))}function mt(){F(),b=window.setInterval(()=>{B()},1e3)}function F(){b!==null&&(window.clearInterval(b),b=null)}async function N(){const t=u("provider").value==="openai"?"openai":"gemini",e=t==="gemini"?h:w;await chrome.storage.local.set({[k]:t,[e]:u("apiKey").value.trim()})}async function gt(){await navigator.clipboard.writeText(S),l("已複製")}function yt(){if(!S.trim())return;const t=x(),e=new Blob([S],{type:"text/markdown;charset=utf-8"}),r=URL.createObjectURL(e),n=document.createElement("a");n.href=r,n.download=`${wt(t.title)}.md`,n.click(),URL.revokeObjectURL(r),l("已下載")}function G(t,e){const r=x();return["# YouTube Transcript","",`Title: ${r.title}`,`URL: ${r.url}`,"Source: speech-to-text",`Captured at: ${e}`,"","---","",t.trim()].join(`
`)}function Tt(){const t=u("format").value;return t==="timestamp-list"||t==="plain-text"?t:"ai-prompt"}function ht(t){var n,o;const e=((n=t.match(/[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)*/g))==null?void 0:n.length)??0,r=((o=t.match(/[\u3400-\u9fff]/g))==null?void 0:o.length)??0;return e+r}function wt(t){return t.replace(/[\\/:*?"<>|]/g,"").replace(/\s+/g," ").trim().slice(0,120)||"youtube-transcript"}function bt(t,e){try{const r=new URL(t),n=r.searchParams.get("lang")||r.searchParams.get("tlang")||"";return!n||n===e||n.split("-")[0]===e.split("-")[0]}catch{return!1}}function p(t){const e=i==null?void 0:i.querySelector('[data-action="start"]'),r=i==null?void 0:i.querySelector('[data-action="stop"]');e&&(e.disabled=t!=="idle"),r&&(r.disabled=t!=="recording")}function l(t){const e=i==null?void 0:i.querySelector('[data-role="status"]');e&&(e.textContent=t)}function u(t){const e=i==null?void 0:i.querySelector(`[data-role="${t}"]`);if(!e)throw new Error(`Missing panel element: ${t}`);return e}function St(t){return new Promise(e=>{window.setTimeout(e,t)})}function y(t){return typeof t=="object"&&t!==null&&"ok"in t&&typeof t.ok=="boolean"}async function Y(t){const e=[{format:"json3",fmt:"json3"},{format:"unknown",fmt:null},{format:"srv3",fmt:"srv3"},{format:"vtt",fmt:"vtt"}],r=[];for(const n of e){const o=new URL(t.baseUrl);n.fmt&&o.searchParams.set("fmt",n.fmt);const a=await fetch(o.toString(),{credentials:"include",cache:"no-store"});if(!a.ok){r.push(`${n.format}: HTTP ${a.status}`);continue}const c=await a.text();if(!c.trim()){r.push(`${n.format}: empty response`);continue}return{raw:c,format:n.format==="unknown"?z(c):n.format}}throw new Error(`頁面端字幕抓取失敗：${r.join("; ")}`)}function z(t){const e=t.trimStart();return e.startsWith("{")?"json3":e.startsWith("WEBVTT")?"vtt":e.startsWith("<")?"xml":"unknown"}async function xt(){var s,d,m;const t=Array.from(document.querySelectorAll("script")).map(g=>g.textContent||"").join(`
`),e=(s=t.match(/"getTranscriptEndpoint":\{"params":"([^"]+)"/))==null?void 0:s[1],r=(d=t.match(/"INNERTUBE_API_KEY":"([^"]+)"/))==null?void 0:d[1],n=(m=t.match(/"INNERTUBE_CLIENT_VERSION":"([^"]+)"/))==null?void 0:m[1];if(!e||!r||!n)throw new Error("找不到 YouTube transcript endpoint。");const o=await fetch(`https://www.youtube.com/youtubei/v1/get_transcript?key=${r}`,{method:"POST",credentials:"include",cache:"no-store",headers:{"content-type":"application/json","x-youtube-client-name":"1","x-youtube-client-version":n},body:JSON.stringify({context:{client:{clientName:"WEB",clientVersion:n,hl:document.documentElement.lang||"zh-TW",gl:"TW",utcOffsetMinutes:-new Date().getTimezoneOffset()}},params:e})}),a=await o.text();if(!o.ok)throw new Error(`transcript endpoint HTTP ${o.status}: ${a.slice(0,120)}`);const c=JSON.parse(a),f=Et(c);if(!f.length)throw new Error("transcript endpoint 沒有回傳可解析逐字稿。");return{segments:f}}function Et(t){const e=[];return P(t,r=>{const n=r.transcriptSegmentRenderer??r.transcriptCueRenderer;if(!n||typeof n!="object")return;const o=Ct(n.snippet??n.cue),a=Number(n.startMs??n.startOffsetMs??n.startTimeMs??0),c=n.durationMs===void 0?null:Number(n.durationMs);o&&e.push({startSec:a/1e3,durationSec:c===null||Number.isNaN(c)?null:c/1e3,text:o,source:"transcript-panel",languageCode:"zh-TW"})}),e}function P(t,e){if(!t||typeof t!="object")return;if(Array.isArray(t)){for(const n of t)P(n,e);return}const r=t;e(r);for(const n of Object.values(r))P(n,e)}function Ct(t){return t?typeof t.simpleText=="string"?t.simpleText.trim():Array.isArray(t.runs)?t.runs.map(e=>e.text??"").join("").trim():"":""}function At(t){var n,o;const e=t,r=(o=(n=e==null?void 0:e.captions)==null?void 0:n.playerCaptionsTracklistRenderer)==null?void 0:o.captionTracks;return Array.isArray(r)?r.map(a=>{var c,f,s,d;return!a.baseUrl||!a.languageCode?null:{baseUrl:a.baseUrl,name:((c=a.name)==null?void 0:c.simpleText)||((s=(f=a.name)==null?void 0:f.runs)==null?void 0:s.map(m=>m.text??"").join(""))||a.languageCode,languageCode:a.languageCode,kind:a.kind,isAutoGenerated:a.kind==="asr"||((d=a.vssId)==null?void 0:d.startsWith("a."))===!0}}).filter(a=>!!a):[]}function kt(t){const e=["zh-TW","zh-Hant","zh","en","ja"],r=[...t.filter(n=>!n.isAutoGenerated),...t.filter(n=>n.isAutoGenerated)];for(const n of e){const o=r.find(c=>c.languageCode===n);if(o)return o;const a=r.find(c=>c.languageCode.split("-")[0]===n.split("-")[0]);if(a)return a}return r[0]??null}function Pt(t,e){if(t.format==="json3")return(JSON.parse(t.raw).events??[]).filter(o=>{var a;return(a=o.segs)==null?void 0:a.length}).map(o=>({startSec:(o.tStartMs??0)/1e3,durationSec:typeof o.dDurationMs=="number"?o.dDurationMs/1e3:null,text:(o.segs??[]).map(a=>a.utf8??"").join("").trim(),source:"caption-track",languageCode:e})).filter(o=>o.text);const r=new DOMParser().parseFromString(t.raw,"text/xml");return Array.from(r.querySelectorAll("text")).map(n=>({startSec:Number(n.getAttribute("start")||0),durationSec:n.hasAttribute("dur")?Number(n.getAttribute("dur")):null,text:(n.textContent||"").trim(),source:"caption-track",languageCode:e})).filter(n=>n.text)}function vt(t,e){var r,n;return e==="plain-text"?[`# ${t.video.title}`,"",`Source: ${t.video.url}`,"","## Transcript","",...t.segments.map(o=>o.text)].join(`

`):e==="timestamp-list"?[`# ${t.video.title}`,"",`Source: ${t.video.url}`,"","## Transcript","",...t.segments.map(o=>`- [${j(o.startSec)}] ${o.text}`)].join(`
`):["# YouTube Transcript","",`Title: ${t.video.title}`,`URL: ${t.video.url}`,`Language: ${((r=t.selectedTrack)==null?void 0:r.languageCode)??"unknown"}`,`Caption type: ${(n=t.selectedTrack)!=null&&n.isAutoGenerated?"auto-generated":"manual"}`,`Captured at: ${t.video.capturedAt}`,"","Please summarize the following transcript:","","---","",...t.segments.map(o=>`[${j(o.startSec)}] ${o.text}`)].join(`
`)}function j(t){const e=Math.max(0,Math.floor(t)),r=Math.floor(e/3600),n=Math.floor(e%3600/60),o=e%60;return[r,n,o].map(a=>String(a).padStart(2,"0")).join(":")}async function Nt(t){var a,c,f;const r=(a=Array.from(document.querySelectorAll("script")).map(s=>s.textContent||"").join(`
`).match(/"INNERTUBE_API_KEY":"([^"]+)"/))==null?void 0:a[1];if(!r)throw new Error("找不到 YouTube Innertube API key。");const n=[{clientName:"ANDROID",clientVersion:"20.10.38",userAgent:"com.google.android.youtube/20.10.38 (Linux; U; Android 14) gzip",clientScreen:"WATCH"},{clientName:"IOS",clientVersion:"20.10.4",userAgent:"com.google.ios.youtube/20.10.4 (iPhone16,2; U; CPU iOS 18_4 like Mac OS X)",clientScreen:"WATCH"}],o=[];for(const s of n){const d=await fetch(`https://www.youtube.com/youtubei/v1/player?key=${r}`,{method:"POST",credentials:"include",cache:"no-store",headers:{"content-type":"application/json","x-youtube-client-name":s.clientName==="ANDROID"?"3":"5","x-youtube-client-version":s.clientVersion},body:JSON.stringify({context:{client:{clientName:s.clientName,clientVersion:s.clientVersion,userAgent:s.userAgent,clientScreen:s.clientScreen,hl:document.documentElement.lang||"zh-TW",gl:"TW"}},videoId:t.videoId})}),m=await d.text();if(!d.ok){o.push(`${s.clientName}: player HTTP ${d.status}`);continue}const g=JSON.parse(m),E=((f=(c=g==null?void 0:g.captions)==null?void 0:c.playerCaptionsTracklistRenderer)==null?void 0:f.captionTracks)instanceof Array?g.captions.playerCaptionsTracklistRenderer.captionTracks:[],T=E.find(A=>A.languageCode===t.preferredLanguageCode)??E.find(A=>{var _,O;return((_=A.languageCode)==null?void 0:_.split("-")[0])===((O=t.preferredLanguageCode)==null?void 0:O.split("-")[0])})??E[0];if(!(T!=null&&T.baseUrl)){o.push(`${s.clientName}: no caption track`);continue}const I=new URL(T.baseUrl);I.searchParams.set("fmt","json3");const C=await fetch(I.toString(),{credentials:"include",cache:"no-store"}),R=await C.text();if(!C.ok){o.push(`${s.clientName}: caption HTTP ${C.status}`);continue}if(!R.trim()){o.push(`${s.clientName}: empty caption`);continue}return{raw:R,format:"json3"}}throw new Error(`Innertube caption fallback 失敗：${o.join("; ")}`)}function K(){const t=Array.from(document.querySelectorAll("script"));for(const e of t){const r=It(e.textContent||"");if(r)return r}return null}function It(t){const r=t.indexOf("ytInitialPlayerResponse");if(r===-1)return null;const n=t.indexOf("{",r);if(n===-1)return null;const o=Rt(t,n);if(!o)return null;try{return JSON.parse(o)}catch{return null}}function Rt(t,e){let r=0,n=!1,o=!1;for(let a=e;a<t.length;a+=1){const c=t[a];if(n){o?o=!1:c==="\\"?o=!0:c==='"'&&(n=!1);continue}if(c==='"'){n=!0;continue}if(c==="{")r+=1;else if(c==="}"&&(r-=1,r===0))return t.slice(e,a+1)}return null}
