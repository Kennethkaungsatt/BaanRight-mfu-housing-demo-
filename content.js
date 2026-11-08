// Shows a small floating button near selected text so a student can select
// a Thai post (e.g. inside a Facebook group they're already a member of)
// and send just that selected text to the extension. Nothing here runs on its
// own: the button acts on text the user has explicitly highlighted, and the
// post text below is only read when the popup asks for it.

let floatBtn = null;

function removeButton() {
  if (floatBtn) {
    floatBtn.remove();
    floatBtn = null;
  }
}

document.addEventListener("mouseup", () => {
  removeButton();
  const selection = window.getSelection();
  const text = selection ? selection.toString().trim() : "";
  if (text.length < 10 || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  floatBtn = document.createElement("button");
  floatBtn.textContent = "\uD83C\uDF10 Translate with BaanRight";
  Object.assign(floatBtn.style, {
    position: "fixed",
    top: `${Math.max(rect.top - 38, 4)}px`,
    left: `${Math.max(4, Math.min(rect.left, window.innerWidth - 210))}px`,
    zIndex: 2147483647,
    background: "linear-gradient(135deg, #0f6e56, #1d9e75)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: "999px",
    padding: "7px 14px",
    fontSize: "12.5px",
    fontWeight: "600",
    fontFamily: "Segoe UI, -apple-system, sans-serif",
    cursor: "pointer",
    boxShadow: "0 6px 16px rgba(15,110,86,0.4)",
    transform: "translateY(0)",
    transition: "transform 0.15s ease, box-shadow 0.15s ease"
  });

  floatBtn.addEventListener("mouseenter", () => {
    floatBtn.style.transform = "translateY(-1px)";
    floatBtn.style.boxShadow = "0 9px 22px rgba(15,110,86,0.5)";
  });
  floatBtn.addEventListener("mouseleave", () => {
    floatBtn.style.transform = "translateY(0)";
    floatBtn.style.boxShadow = "0 6px 16px rgba(15,110,86,0.4)";
  });

  floatBtn.addEventListener("mousedown", (e) => e.preventDefault()); // keep selection
  floatBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "TRANSLATE_SELECTION", text });
    removeButton();
  });

  document.body.appendChild(floatBtn);
});

document.addEventListener("mousedown", (e) => {
  if (floatBtn && e.target !== floatBtn) removeButton();
});

// ---------- Post text for the popup's Source link ----------
// The popup only asks when the user pressed Translate with an empty text box
// and a Source link, so this runs on demand, in the tab they are already
// looking at, with their own Facebook session.
const POST_TEXT_MIN = 20;
const POST_BOILERPLATE = /log ?in to facebook|see posts, photos and more on facebook|this content isn.t available|isn.t available right now|content not found/i;

function metaContent(name) {
  const el = document.querySelector(`meta[property="${name}"], meta[name="${name}"]`);
  return el ? el.getAttribute("content") || "" : "";
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

function postTextGroups() {
  const group = (list) => (Array.isArray(list) ? list : [list]);
  const rendered = [...document.querySelectorAll('[data-ad-preview="message"], [data-testid="post_message"]')]
    .map((el) => el.innerText || "");
  const structured = [];
  for (const el of document.querySelectorAll('script[type="application/ld+json"]')) {
    try { collectJsonLdText(JSON.parse(el.textContent || "null"), structured); }
    catch { /* ignore malformed blocks */ }
  }

  return [
    group(rendered),
    // og:description carries the post's own message on a single-post page.
    group([metaContent("og:description"), metaContent("description")]),
    group(structured),
    // Whole articles last: they drag in comment and like text.
    group([...document.querySelectorAll('div[role="article"]')].map((el) => el.innerText || ""))
  ];
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

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "GET_POST_TEXT") return;
  sendResponse({ text: pickPostText(postTextGroups()), url: location.href });
});
