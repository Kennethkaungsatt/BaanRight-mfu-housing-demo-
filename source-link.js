// Source link feature — URL understanding and post text pulling.
// Self-contained: nothing touches the popup DOM, so the whole feature
// can be changed or removed in one place.
// To remove it: delete this file, its <script> tag in popup.html, the
// readPostTextFromLink branch in popup.js's runExtraction(), and the
// chipHtml line in renderSavedItem().

// Two URLs are the "same post" when their canonical post IDs (or full
// canonical URLs) match, ignoring tracking params.
function samePost(a, b) {
  if (!a || !b) return false;
  if (canonicalPostUrl(a) === canonicalPostUrl(b)) return true;
  if (postHost(a) !== postHost(b)) return false;
  const scopeA = postScope(a);
  const scopeB = postScope(b);
  if (scopeA && scopeB && scopeA !== scopeB) return false;
  const idsA = postIds(a);
  const idsB = postIds(b);
  return idsA.size > 0 && [...idsA].some((id) => idsB.has(id));
}

// Facebook hostname test (facebook.com / fb.com, with or without www/m/).
function isFacebookUrl(raw) {
  try {
    const { hostname } = new URL(raw);
    return /(^|\.)facebook\.com$|(^|\.)fb\.com$/i.test(hostname);
  } catch {
    return false;
  }
}

// Share links like /share/p/<token> carry no post id in the path.
function isShareLink(raw) {
  try {
    return /^\/share\//i.test(new URL(raw).pathname);
  } catch {
    return false;
  }
}

// facebook.com/ or fb.com/ with no path is the home feed; only trust tabs
// that show an actual post (not the home feed).
function isFacebookHome(raw) {
  try {
    const { pathname } = new URL(raw);
    return !pathname || pathname === "/";
  } catch {
    return true;
  }
}

// Produce a URL that ignores tracking params, hash, and www/m/ prefixes:
// used by samePost() for a quick equality check.
function canonicalPostUrl(raw) {
  try {
    const url = new URL(raw);
    url.hostname = url.hostname.toLowerCase().replace(/^(?:www|m|web)\./, "");
    url.hash = "";
    for (const key of [...url.searchParams.keys()]) {
      if (!/^(?:story_fbid|fbid|multi_permalinks|v)$/i.test(key))
        url.searchParams.delete(key);
    }
    url.pathname = url.pathname.replace(/\/+$/, "");
    return url.toString();
  } catch {
    return "";
  }
}

// Extract post‑ids (story_fbid, fbid, multi_permalinks, or path numbers)
function postIds(raw) {
  const ids = new Set();
  let url;
  try { url = new URL(raw); } catch { return ids; }
  for (const key of ["story_fbid", "fbid", "multi_permalinks"]) {
    const v = url.searchParams.get(key);
    if (v && /^\d+$/.test(v)) ids.add(v);
  }
  for (const m of url.pathname.matchAll(/\/(\d+)$/g)) ids.add(m[1]);
  return ids;
}

// The group / page a post lives in, so two different groups that reuse a
// post id never look like the same post.
function postScope(raw) {
  try {
    const path = new URL(raw).pathname.replace(/\/+$/, "");
    const group = path.match(/^\/groups\/([^/]+)/i);
    if (group) return "g:" + group[1];
    const page = path.match(/^\/([^/]+)\/(?:posts|videos)\//i);
    return page ? "p:" + page[1] : "";
  } catch {
    return "";
  }
}

// ----- Presentation -----

// Return the "View original post" chip HTML for a source link.
// The caller (popup.js) is responsible for any HTML attribute escaping.
function chipHtml(link) {
  if (!link) return "";
  return '<a class="chip-btn chip-link" href="' + link +
      '" target="_blank" rel="noopener">View original post</a>';
}

// Shown when the link yielded no text. A Facebook post usually needs a login;
// anything else is a non‑Facebook page.
function failureMessage(link) {
  return isFacebookUrl(link)
    ? "Couldn't read that Facebook post — make sure you're logged in there, then try again"
    : "Couldn't read the post text — paste it into the box instead.";
}

// Expose everything the popup needs through the shared global scope.
globalThis.BaanRightSourceLink = {
  samePost,
  isFacebookUrl,
  isShareLink,
  isFacebookHome,
  readPostTextFromLink,
  chipHtml,
  failureMessage
};
