// Background service worker (Manifest V3)

chrome.runtime.onInstalled.addListener(() => {
  // Rebuild menus from scratch so updates never hit "duplicate id" errors.
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "translate-selection",
      title: "Translate with BaanRight",
      contexts: ["selection"]
    });
    chrome.contextMenus.create({
      id: "save-image",
      title: "Save image to BaanRight",
      contexts: ["image"]
    });
  });
});

chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId === "translate-selection" && info.selectionText) {
    await chrome.storage.local.set({ pendingText: info.selectionText });
    openPopupSafely();
  }
  if (info.menuItemId === "save-image" && info.srcUrl) {
    // Park the image URL; the popup picks it up into its photo tray.
    await chrome.storage.local.set({ pendingImage: info.srcUrl });
    openPopupSafely();
  }
});

// Relay from content.js's floating "Translate" button
chrome.runtime.onMessage.addListener((message) => {
  if (message?.type === "TRANSLATE_SELECTION" && message.text) {
    chrome.storage.local.set({ pendingText: message.text }).then(openPopupSafely);
  }
});

function openPopupSafely() {
  // openPopup requires a recent user gesture and is only supported on some
  // Chrome versions; fall back silently if it's unavailable. The popup also
  // checks storage for pendingText on its own open, as a backup path.
  if (chrome.action && chrome.action.openPopup) {
    chrome.action.openPopup().catch(() => {});
  }
}

// ---------- Post text from a Source link ----------
// Fallback for when the post isn't open in a tab: the request carries the
// user's own Facebook cookies, and the HTML is parsed here (a service worker
// has no DOM, so meta tags and JSON-LD are read with regexes).
const FACEBOOK_HOST = /(?:^|\.)(?:facebook\.com|fb\.com)$/i;
const POST_TEXT_MIN = 20;
const POST_BOILERPLATE = /log ?in to facebook|see posts, photos and more on facebook|this content isn.t available|isn.t available right now|content not found/i;

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "FETCH_POST_TEXT" || !message.url) return;
  fetchPostText(message.url)
    .then((text) => sendResponse({ text }))
    .catch((err) => sendResponse({ error: err.message }));
  return true; // keep the message channel open for the async reply
});

async function fetchPostText(url) {
  let host;
  try { host = new URL(url).hostname; } catch { throw new Error("That Source link isn't a valid URL"); }
  if (!FACEBOOK_HOST.test(host)) throw new Error("Source link must be a Facebook post");

  let res;
  try {
    res = await fetch(url, { credentials: "include", redirect: "follow" });
  } catch {
    throw new Error("Couldn't reach that post \u2014 check your connection");
  }
  if (!res.ok) {
    if (res.status === 404) throw new Error("That post was deleted or is private");
    if (res.status === 401 || res.status === 403) throw new Error("Facebook refused the request \u2014 open the post in a tab instead");
    throw new Error(`Post fetch failed (${res.status})`);
  }

  const html = await res.text();
  const text = pickPostText([
    [metaContent(html, "og:description"), metaContent(html, "description"), metaContent(html, "twitter:description")],
    jsonLdText(html)
  ]);
  if (!text) throw new Error("Couldn't find the post's text \u2014 open the post in a tab, or paste it");
  return text;
}

function metaContent(html, key) {
  const name = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const forward = new RegExp(`<meta[^>]+(?:property|name)\\s*=\\s*["']${name}["'][^>]*?content\\s*=\\s*["']([^"']*)["']`, "i");
  const reversed = new RegExp(`<meta[^>]+content\\s*=\\s*["']([^"']*)["'][^>]*?(?:property|name)\\s*=\\s*["']${name}["']`, "i");
  const match = html.match(forward) || html.match(reversed);
  return match ? decodeHtml(match[1]) : "";
}

function decodeHtml(str) {
  return String(str)
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

function jsonLdText(html) {
  const out = [];
  const blocks = html.match(/<script[^>]+type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
  for (const block of blocks) {
    const body = block.replace(/^[\s\S]*?>/, "").replace(/<\/script>$/i, "");
    try { collectJsonLdText(JSON.parse(decodeHtml(body)), out); }
    catch { /* ignore malformed blocks */ }
  }
  return out;
}

function collectJsonLdText(node, out) {
  if (Array.isArray(node)) {
    node.forEach((child) => collectJsonLdText(child, out));
    return;
  }
  if (!node || typeof node !== "object") return;
  for (const key of ["articleBody", "text", "description"]) {
    if (typeof node[key] === "string") out.push(node[key]);
  }
  for (const [key, value] of Object.entries(node)) {
    if (key !== "articleBody" && value && typeof value === "object") collectJsonLdText(value, out);
  }
}

function pickPostText(groups) {
  for (const candidates of groups) {
    const usable = candidates
      .map((t) => String(t || "").replace(/\r/g, "").trim())
      .filter((t) => t.length >= POST_TEXT_MIN && !POST_BOILERPLATE.test(t));
    if (usable.length) return usable.sort((a, b) => b.length - a.length)[0];
  }
  return "";
}
