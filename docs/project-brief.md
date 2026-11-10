# BaanRight — Project Briefing (for the M3 demo and oral Q&A)

**Team:** 16RideRight · Group 16 · Intro2SE 15031001, Semester 1/2569
**Product:** BaanRight — a Thai housing-listing translator for international students at Mae Fah Luang University (MFU)
**Repository:** https://github.com/Kennethkaungsatt/BaanRight-mfu-housing-demo-
**Snapshot:** `main` @ `5868019` plus this brief · 46 commits · 28 Aug → 10 Nov 2026

Everything below is taken from the repository itself (git history, source code, the
M1 charter and M2 SRS in `docs/`), not from memory. Each section says how to check it.

---

## 1. One-screen summary

| Question | Answer |
|---|---|
| What is it? | A Chrome extension + web prototype that turns a Thai rental post into an English listing with structured facts, distance to campus, and a saved shortlist |
| Who is it for? | MFU international students who cannot read Thai and must find off-campus housing after year 1 |
| Requirements | **5 functional (FR-1…FR-5, 16 acceptance criteria)** and **5 non-functional (NFR-1…NFR-5)** |
| Languages | JavaScript (ES2020), HTML, CSS, JSON (manifest), Markdown/SVG for docs — **no backend, no database, no framework** |
| External APIs | **1 used at runtime** (MyMemory translation) · 1 declared but unused (Nominatim) · 0 API keys |
| AI models | **No generative model at runtime.** MyMemory machine translation only. Development used Claude, ChatGPT and Codebuff |
| Tests | **11 automated test cases, 11/11 pass** (`node --test`), plus 4 of 5 NFR checks executed |
| Code size | ≈ **5,170 lines** in code files (≈2,700 JS, ≈1,410 CSS, ≈640 HTML, 112 test, 311 deck) |
| Contributors | 3 of 5 members have commits; 2 members have none (see §9) |

---

## 2. Functional requirements (FR)

Source: `docs/M2-srs.pdf` §3. The report's Golden Thread table maps each one to its
design element, implementation and evidence (`docs/final-report.md` §5).

| ID | Requirement | ACs | Status | Where it lives | Evidence |
|---|---|---|---|---|---|
| **FR-1** | Input a housing listing (paste Thai post text) | 1 | ✅ Working | Translate tab: textarea, **Load demo**, optional source-link field; extension popup paste + "pull from source link" | Manual: paste / demo / source-link pull; empty input rejected with a message |
| **FR-2** | Translate Thai housing listing into English | 2 | ✅ Working | **Translate listing** button → MyMemory client with ≤450-byte chunking; original Thai kept on screen and in the saved record | Demo posts translate in 1.5–4 s; 4 unit tests cover success, quota text, HTTP 429, other HTTP errors |
| **FR-3** | Extract and save key housing information (price, deposit, phone, location, availability) | 8 | ✅ Working | Price hero + **Details** grid; **Save listing** → Saved tab; missing field shows "—" | 7 extractor tests (deposit formats, Thai digits, location vs floor area, trailing phone, availability, price/phone basics) + manual save → reload → compare |
| **FR-4** | Generate a Thai reply to a landlord | 3 | ✅ Working (5 fixed questions) | **Ask the landlord** → tick questions → **Generate Thai message** → **Copy** | Manual: 5 questions generate Thai and copy; no automatic sending (AC-3) |
| **FR-5** | Translate selected text directly from a webpage | 2 | ✅ Working (extension only) | `extension/content.js` + context menu "Translate with BaanRight"; popup opens pre-filled | Manual on a real Facebook housing post |

**Acceptance criteria total: 16** (FR-1: 1, FR-2: 2, FR-3: 8, FR-4: 3, FR-5: 2).
Note the SRS §9 self-check says "2 AC per FR" — that line is stale; §3 is the
source of truth and has 16 numbered criteria.
SRS §7 traceability and `docs/final-report.md` §5 are the same thread in two formats.

---

## 3. Non-functional requirements (NFR)

Source: `docs/M2-srs.pdf` §4. Status is what we actually checked — including the one
we did **not** check.

| ID | Kind | Target | How checked | Result |
|---|---|---|---|---|
| **NFR-1** | Performance | Translation shown within **10 s** | Stopwatch over trials (SRS) + live request timed for this brief | **≈1.5 s** for a short single-chunk post (measured 9 Nov 2026); 3–4 s for the longer demo posts. **Pass** |
| **NFR-2** | Performance | Extracted fields within **5 s** of processing | Local extraction is synchronous | Whole 11-test suite (all extractors, all cases) runs in **≈75 ms**; per-post extraction is sub-millisecond. **Pass** |
| **NFR-3** | Usability | First-time student pastes and starts within **30 s** without help | Timed test with an unfamiliar student | **Not formally timed.** Flow is paste → one button. Recorded as a gap in `docs/final-report.md` §7. **Unverified** |
| **NFR-4** | Reliability | Error message, never an empty/misleading translation | Disconnect network, submit | Shows "Couldn't translate that: Failed to fetch"; quota text and 429 handled by unit tests. **Pass** |
| **NFR-5** | Security / privacy | Saved listings only in the saver's browser storage | Browser profile A saves → profile B opens | No server, no account; profile B sees nothing. **Pass** |

---

## 4. Scope: what we built vs. what we deliberately did not

### In scope (M2 §2.1) — 5 FRs, all implemented
Input → translate → extract & save → Thai reply → selected-text translation.

### Out of scope (M2 §6) — 15 explicit exclusions
| Exclusion | Why it stays out |
|---|---|
| Auto-searching Facebook groups · auto-scraping posts | Platform terms and fragility; the user pastes or right-clicks instead |
| Booking / reserving accommodation · rental payments | Needs a payment provider and landlord agreements |
| Automatically contacting landlords | FR-4 AC-3: the student reviews and sends, the app never sends |
| Scam / red-flag detection · guaranteeing a listing is legitimate | Would be an unverifiable claim we cannot honour |
| Guaranteeing price or availability accuracy | Fields are extracted from free text; the landlord is the source of truth |
| Legal advice · judging whether a contract is fair · managing contracts | Out of the team's competence and a liability trap |
| Shared housing database between students | Needs a backend, accounts and moderation |
| User login / account system | No backend; privacy by design (NFR-5) |
| Complete housing marketplace | Different product |
| **Screenshot OCR in the current MVP** | Explicitly excluded by the SRS; the UI says "not in this build" instead of failing silently |

We also built supporting features the five FRs would be impractical without (distance,
photos, shortlist, CSV, alerts). They are labelled *supporting* in the report — not
counted as extra Must FRs, so the scope table above stays honest.

---

## 5. Technology and programming languages

| Language / format | Where | Volume |
|---|---|---|
| **JavaScript (ES2020, no framework)** | `extension/popup.js` 1,099 · `extension/background.js` 142 · `extension/content.js` 127 · `extension/photo-add.js` 147 · `prototype/script.js` 1,142 · `prototype/sw.js` 47 | **≈2,650 lines** |
| **HTML5** | `extension/popup.html` 165 · `extension/photo-add.html` 55 · `prototype/index.html` 416 | **≈640 lines** |
| **CSS3** (custom properties, grid, `prefers-color-scheme`) | `extension/popup.css` 525 · `prototype/style.css` 883 | **≈1,410 lines** |
| **JSON** | `extension/manifest.json` (MV3), `prototype/manifest.json` (PWA) | 2 files |
| **Node.js** (`node:test`, `vm`, `assert`) | `tests/extractors.test` | 112 lines, 11 cases |
| **Markdown / SVG** | Report, AI-use statement, 4 diagrams, 10-slide HTML deck | docs only |

**Deliberately not used:** TypeScript, React/Vue, bundlers, Node server, database, ORM,
auth provider, analytics, cloud hosting for the extension.

**Platform model:** Chrome Extension Manifest V3 (popup + service worker + content
script) and a static PWA (`prototype/`) that runs offline from `file://` except translation.

Extension code lives in `extension/`; the web prototype in `prototype/`.

```bash
# verify the composition yourself
wc -l extension/popup.js extension/background.js extension/content.js \
      extension/photo-add.js extension/popup.html extension/popup.css \
      prototype/index.html prototype/script.js prototype/style.css prototype/sw.js
```

---

## 6. APIs — how many and which

**Runtime external services: 1.** Plus 1 permission that is declared but not used, and
several browser/Chrome APIs. No API keys, no accounts, no paid tiers.

| # | Service | What it does | Endpoint | Auth / cost | How it is called |
|---|---|---|---|---|---|
| 1 | **MyMemory Translation API** | Thai → English machine translation | `GET https://api.mymemory.translated.net/get?q=…&langpair=th\|en` | Free, no key; anonymous fair-use quota | `fetch` from the client; post split into ≤450-byte UTF-8 chunks, translated sequentially, joined |
| 2 | **Nominatim (OpenStreetMap)** | Reverse geocoding | `https://nominatim.openstreetmap.org/` | Free | **Declared in `extension/manifest.json` `host_permissions` only — no call exists in any JS file.** Unused permission; should be removed or used (see §11) |

**Not APIs (just URLs):** Google Maps share links (`maps.app.goo.gl`, `www.google.com/maps`)
are *detected by regex* inside the post to report stated distance; the map link is opened in
a new tab. Facebook is **not** accessed through any API — `extension/content.js` reads the page DOM the
user is already viewing (no Graph API, no token, no scraping of groups).

**Chrome extension APIs used (6 families, 27 call sites):**
`chrome.storage.local` (8), `chrome.runtime.*` (onMessage ×3, sendMessage ×2, onInstalled,
getURL, lastError), `chrome.contextMenus.*` (create ×2, removeAll, onClicked),
`chrome.tabs.*` (query, sendMessage, create), `chrome.downloads.download` (×2),
`chrome.action.openPopup`.
Permissions requested: `storage`, `contextMenus`, `activeTab`, `downloads`, `unlimitedStorage`.

**Browser Web APIs:** `fetch`, `navigator.clipboard` (copy translation/summary),
`navigator.share` (Web Share with clipboard fallback), `localStorage`, `serviceWorker` +
`caches` (offline shell), `FileReader`, `canvas` (photo downscale to ≤1000 px JPEG),
`Blob` + `URL.createObjectURL` (CSV and photo download), `matchMedia` (theme),
`beforeinstallprompt` (PWA install button).

```bash
# count them
grep -rhoE "chrome\.[a-zA-Z]+\.[a-zA-Z]+" extension/*.js | sort | uniq -c
grep -rn "nominatim" --include=*.js .   # returns nothing → declared but unused
```

**Error handling around the one real API:** HTTP 429 → "Free translation limit reached —
try again later (it resets daily)"; MyMemory returns quota warnings with HTTP **200** and the
warning inside `translatedText`, so we test `responseStatus` and the warning prefix too — that
is the failure a naive client would display as a translation, and it is covered by tests.

---

## 7. AI: which models, where they were used, and the backlog

### 7.1 In the product at runtime — **no generative model**
BaanRight calls **MyMemory**, a machine-translation service. It receives post text and returns
a translation; it does not write listings, prices or answers. **Extraction is rule-based**
(regex + Thai unit words), exactly as the SRS states for FR-3 — no LLM decides a price.
This is a deliberate design choice, and a demo question we expect.

### 7.2 During development — 3 tools, logged honestly

| Date | Tool / model | Used for | Human check |
|---|---|---|---|
| 27 Aug 2026 | **Claude** | Developing the extension: translation, extraction, storage and feature suggestions | Team tested manually, rewrote what did not match requirements (logged in M2 §8) |
| 27 Aug 2026 | **ChatGPT** | Organising the SRS and turning the problem into FRs/NFRs | Team set the measurable targets and adjusted them to the prototype |
| 9 Nov 2026 | **Codebuff** (coding agent) | M3 deliverables: the web prototype port, report, 4 SVG diagrams, 10-slide deck, README, link/asset verification | Every file re-read, all links/SVGs parsed, JS syntax-checked, test suite run; visible as co-author on `1949e8a`, `88908a5` and `21a6363` |

Disclosure lives in `docs/ai-use-statement.md` and in the M2 AI log (§8 of the SRS).
Known weakness: the **M2 log has only the two 27 Aug entries**; the M3 statement is prose,
not a per-prompt log. If the instructor asks for a prompt log, that is the gap — we can
reconstruct the M3 entries from the commit messages and this table.

### 7.3 AI usage backlog (planned, not built)
| Item | Why it is not in this release |
|---|---|
| OCR for screenshots | Explicitly out of scope in SRS §2.1/§6; UI already says so |
| LLM-based extraction instead of regex | Rejected on purpose: cost, privacy, non-determinism, and the SRS requires rule-based extraction we can test |
| Real routing API for walking distance | Needs a key and rate limits; today distance is stated minutes / map link / landmark approximation |
| Offline translation model | Too large for a browser extension; MyMemory is the only network dependency |
| Thai-language UI for landlords | Different user; out of scope for the student-facing MVP |

---

## 8. Testing: how many, what kind, and how to run it

### 8.1 Automated — 11 test cases, 11 passing
`tests/extractors.test` loads the **pure functions out of the shipped `popup.js`** in a `vm`
context, so the tested code is the code that ships.

| Area | Cases |
|---|---|
| Deposit formats (months, baht, commas, `ประกันห้อง`, no unit) | 1 |
| Location (floor area never reported as location; trailing phone stripped) | 2 |
| Distance (map link with minutes/km incl. decimals; minutes only; Fah Thai landmark; never null) | 2 |
| Thai digits ๐–๙ normalised | 1 |
| Price / phone / availability basics | 1 |
| Translation errors (success, quota text on HTTP 200, `responseStatus` 429/other, HTTP 429 vs other statuses) | 4 |

```bash
node --test tests/extractors.test      # Node 20+ → ℹ tests 11 · pass 11 · fail 0 · ~75 ms
```
Run on every change that touches extraction or translation (that is why the suite exists);
last run for this brief: **11/11 in 75 ms**.

### 8.2 Manual — the demo script, on both surfaces
2 demo posts × 2 surfaces (prototype + extension), 9 steps:
load demo → translate → read hero/details/distance → save → reload → search → star →
export CSV → reply → theme. Plus: source-link pull on a real post, photo add/paste/dedupe/
downscale, empty-input rejection, Ctrl/Cmd+Enter, offline error.

### 8.3 NFR checks
4 of 5 executed (NFR-1, 2, 4, 5 — see §3). **NFR-3 (30-second first use) is not measured
with an unfamiliar user**, and there is **no CI pipeline**; tests run locally before a merge.

### 8.4 Coverage check
- Every Must FR has at least one manual acceptance run and, for FR-2/FR-3, automated coverage.
- FR-5 has **manual-only** coverage (content script + context menu) — a headless test would
  need a browser harness we did not build.

---

## 9. Work done, member by member

Numbers are from `git log --author=… --numstat`. Two members map to one person: `kennethape`
and `Kennethkaungsatt` are the same GitHub account (`@Kennethkaungsatt`).

Repository layout now matches the course's Git-for-teams criteria: one entry point per
surface, one file per document (versions live in history, not in file names), no work left
on an unmerged branch, and a README that says what it is, who built it and how to open it.

| Member | Student ID | GitHub | Commits | Lines +/- | Files | Main area |
|---|---|---|---|---|---|---|
| Kaung Satt Thiha | 6931503006 | `@Kennethkaungsatt` (`kennethape` is the same account) | **11** | +5,965 / −345 | 33 | Web prototype, popup redesign, photo tray, docs, slides |
| Munir Sama | 6931503063 | `@mun2ddd` | **27** (incl. 1 merge) | +3,903 / −3,427 | 14 | Extractor logic, tests, source-link, cleanup, PR #2 |
| Nipitpon Seehawong | 6931503109 | `@thxbe` | **5** | +16 / −5 | 4 | Content-script button, popup labels, photo storage error handling |
| Min Thant Maung Maung | 6931503012 | **not linked** | **0** | — | — | — |
| Kanokporn Pakchaipoom | 6931503020 | **not linked** | **0** | — | — | — |

```bash
git shortlog -sne --all        # 4 identities (3 people; two are the same account)
git log --author=mun2ddd --numstat --format="" | awk '{a+=$1; d+=$2} END {print a, d}'
git log --oneline main..origin/fix-ui-text
```

### Kaung Satt Thiha — `@Kennethkaungsatt`
- Initial demo prototype (28 Aug) and the popup redesign: photo saving, v0.4.0–0.4.2.
- Add-photos tab redesign for desktop, draft autosave, fix for the popup closing when a photo is added.
- Source-link field + expandable saved-listing details; website link in the README.
- **M3 deliverables:** `prototype/` (the whole web app: tabs, extraction port, saved list, CSV,
  alerts, reply generator, PWA), `docs/final-report.md`, `docs/ai-use-statement.md`,
  4 SVG diagrams, 10-slide deck, README rewrite.
- **Can answer:** "open the prototype and walk me through FR-1…FR-5"; chunking; why the
  web version matches the extension; how the Golden Thread table is built.

### Munir Sama — `@mun2ddd`
- **Extraction engine:** deposit/location/distance fixes, more rent and deposit phrasings,
  Thai-digit handling, trailing-phone cleanup, "never invent a value".
- **Translation client reliability:** quota errors from MyMemory handled as errors, not translations.
- **Tests:** created `tests/extractors.test` (11 cases) and fixed the duplicated `(2)` file.
- **Source link:** pull the post text from a share link; fix for Facebook share links;
  refactored into a module, it broke post pulling, then **reverted it** and fixed the two real
  bugs directly — the honest "what did not work" story in the AI-use statement.
- Repo hygiene: deleted the stray `popup8-11.*` / `content8-11.*` duplicates; merged PR #2.
- **Can answer:** regex edge cases (the `มัดจำ 50` = 50 baht not 50 months case), why
  extraction is rule-based, how the tests load shipped code, what the revert taught us.

### Nipitpon Seehawong — `@thxbe`
- Button position calculation in `content.js` (the in-page translate button stayed on screen).
- Error handling for photo storage quota (`photo-add.js`).
- Clearer labels (**Clear photos**, **Clear text**), danger styling for destructive buttons,
  and a real bug fix: `mouseup` removed the floating button before its `click` could send the
  selected text, so FR-5 failed intermittently.
- Those three commits sat on `origin/fix-ui-text` from 10–11 Oct until 10 Nov; they are now
  **merged into `main`** (`18e14bf`), so no work is stranded on a branch.
- **Can answer:** how the in-page button is placed, why the mouseup guard is needed, what
  happens when storage is full, and why unmerged branch work does not count as delivered.

### Min Thant Maung Maung · Kanokporn Pakchaipoom — **no commits, no linked account**
The git history shows nothing for either name. That is a real risk in a review that matches
contributions by account, so fill it deliberately rather than hoping nobody looks:
- Add their GitHub handles to the README table (currently "—").
- Give each one a **visible, committed** task before 16 Nov. Safe options: run the manual
  acceptance script and commit `docs/acceptance-results.md`; record the NFR-3 timed test with
  3 first-time users; time NFR-1 over 3 trials and commit the numbers; own the Thai copy of
  the reply templates.
- If asked in the oral: they should describe **non-code work they actually did** (interviews —
  the charter records three user interviews dated 26–27 Aug — testing, translation review,
  slides). Do not claim code that is not in the history; one honest sentence beats a story
  that collapses under a `git log` check.

---

## 10. What I (the AI agent) did for this project

Scope: M3 deliverables and the web prototype. I did **not** write the Chrome extension's
feature code, and I did not change the team's M1/M2 documents.

| Deliverable | File(s) | Verified by |
|---|---|---|
| Web prototype (full port of the popup: translate, extract, saved, alerts, photos, CSV, reply, theme, PWA/offline) | `prototype/index.html`, `style.css`, `script.js`, `sw.js`, `manifest.json`, icons | `node --check` on JS; all element IDs cross-checked against the HTML; no horizontal overflow at 360/768/1440 px; live Thai→English run produced price/deposit/phone/location/distance; save → reload → search → star → CSV re-run; dark-theme contrast sampled ≥4.9:1 |
| Final report with the Golden Thread rewritten around the **real** FR-1…FR-5 numbering | `docs/final-report.md` | FR numbers checked against the extracted SRS text, not against a draft |
| AI-use statement | `docs/ai-use-statement.md` | Claims restricted to what the code and history show |
| Design diagrams | `docs/design/architecture.svg`, `use-case.svg`, `sequence-fr-2.svg`, `data-model.svg` | All 4 parse as valid XML; sequence file renamed so the number matches FR-2 |
| Demo deck | `slides/demo-slides.html` | JS passes `node --check`; every asset reference exists; 10 slides, arrow-key navigation, prints to PDF |
| README + `.gitignore` + M1/M2 PDFs copied in | `README.md`, `.gitignore`, `docs/*.pdf` | Test command re-run; every local link/image resolves |

**Two judgement calls I made and why:**
1. **I first left the extension files at the repository root**, because a teammate was still
   committing to `popup.js`/`background.js` and moving them mid-branch would have broken that
   work. Once the team's commits had landed, I merged the loose `fix-ui-text` branch (so it is
   not stranded) and moved the nine extension files into **`extension/`** in a single commit,
   updating the test loader and every documented path. Root now holds only README, `docs/`,
   `extension/`, `prototype/`, `slides/`, `tests/` — the layout the course Git guide asks for.
2. **I recorded NFR-3 as "not formally timed"** instead of claiming a test we never ran, and
   flagged the unused Nominatim permission rather than quietly leaving it.

**Limits of my work:** I could not push (GitHub credential expired — the team pushed), I did
not test the extension in a live Chrome profile from here (the team did), and the deck is
HTML — a PDF export is still worth doing for the projector.

---

## 11. Known gaps to say out loud (better than being caught)

1. **NFR-3 unmeasured** — no timed first-time-user test yet.
2. **No CI** — tests are run locally before merging.
3. **FR-5 is manual-only** — no automated coverage of the content script.
4. **Unused `nominatim.openstreetmap.org` host permission** — remove it or implement reverse
   geocoding; an unused permission weakens the privacy story.
5. **Two members with no commits** — fix before the review, not during it.
6. **M2 AI log has 2 entries** — the M3 work is disclosed in prose, not per prompt.
7. **MyMemory free tier** — no SLA; on quota exhaustion the app says so instead of guessing.
8. **Distance is stated, not routed** — minutes as written by the landlord, a map link, or a
   landmark approximation.
9. **No CI** — the 11 tests run locally before a merge, not on every push.

---

## 12. Sixty-second demo script (what to say while clicking)

1. "International students at MFU can't read Thai rental posts; by the time they've translated
   three by hand the room is gone."
2. **Load demo** → **Translate listing** — "one click: English plus price, deposit, phone,
   location, availability, and distance from campus — FR-1, FR-2, FR-3."
3. Point at the details grid — "missing fields show a dash; we never invent a value — that's
   FR-3 acceptance criterion 8."
4. **Save listing** → Saved tab → search / ★ / **Export CSV** — "compare options — FR-3 AC-7."
5. **Ask the landlord** → tick → **Generate Thai message** → copy — "FR-4, and the app never
   sends it for you — AC-3."
6. Extension: select Thai text on a post → right-click → **Translate with BaanRight** — "FR-5."
7. Close on the honest line: "OCR and scam detection are explicitly out of scope in our SRS;
   the UI says so rather than pretending."
