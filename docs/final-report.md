# BaanRight — Final Report (M3)

**Team:** 16RideRight · Group 16 · Intro2SE 15031001, Semester 1/2569
**Product:** BaanRight — Thai housing-listing translator for international students at Mae Fah Luang University (MFU)
**Surfaces:** Chrome extension (Manifest V3) + web prototype (`prototype/index.html`)

---

## 1. The problem

MFU students who do not read Thai lose most of the rental market. Landlords post
in Thai on Facebook groups: rent, deposit, phone number and location are buried in
free text, and the useful details (is the deposit one month or two? is it near the
Fah Thai market? how far is it from campus?) take minutes to decode — per post.
By the time a student has translated three posts by hand, the good room is gone.

BaanRight turns one Thai post into an English listing the student can act on in
a single click: translation, structured facts, distance to campus, and a saved
shortlist to compare.

## 2. Users and key scenarios

- **Primary user:** an MFU international student browsing Facebook housing groups.
- **Scenario A (find):** paste a post → read rent/deposit/phone/location/distance
  in English → call the landlord.
- **Scenario B (compare):** save three listings → search and shortlist them →
  export a CSV to compare side by side.
- **Scenario C (reply):** tick the questions to ask → get a Thai message to paste
  into Messenger.

## 3. What we built

| Surface | What it is | How to open |
|---|---|---|
| Web prototype | The same workflow as a responsive web app (Translate / Saved / Alerts tabs, reply templates) | double-click `prototype/index.html`, or the live link in the README |
| Chrome extension | Popup with the same tabs, plus in-page tools: right-click "Translate with BaanRight", source-link post pulling, photo capture | `chrome://extensions` → Developer mode → **Load unpacked** → repo root |

Both surfaces share the same extractor rules, the same MyMemory translation
client and the same storage shape, so behaviour is identical: what the demo
shows on the web is what the extension does inside Facebook.

## 4. Architecture

![System architecture](design/architecture.svg)

No backend and no account: the client holds all logic, the browser holds all
data. Translation is the only network dependency (MyMemory API); map links and
Nominatim are used only when the post contains them. This keeps the product free,
instant and private — nothing is uploaded except the post text being translated.

**Translation path** (`docs/design/sequence-fr-1.svg`): the post is split on line
boundaries into ≤ 450-byte UTF-8 chunks, translated sequentially, then joined.
Extraction always runs on the **original Thai text**, so Thai digits, phone
formats and Thai unit words are read from the source, not from the translation.

**Data** (`docs/design/data-model.svg`): saved listings, photos (as data URLs),
drafts, alerts and the theme are JSON documents in `chrome.storage.local` /
`localStorage`. A saved listing is self-contained and renders offline.

**Use cases** (`docs/design/use-case.svg`): translate, read details, save, search
and shortlist, ask the landlord, attach photos, export, alerts, in-page selection
translate, theme.

## 5. Golden Thread

Requirements are numbered in the M2 SRS (`docs/M2-srs.*`). Every **Must** FR is
traced from the problem to a design element, a prototype location and a test.

| Must FR | Requirement | Design element | Prototype page / section | Test and evidence |
|---|---|---|---|---|
| FR-1 | Translate a Thai rental post into English | Translation client, chunking — `sequence-fr-1.svg`, `architecture.svg` | Translate tab → textarea → **Translate listing** | Demo posts 1–2 translate live; `translateChunk` tests cover success, quota text, HTTP 429 and other HTTP errors (4 cases) |
| FR-2 | Extract rent, deposit, phone, location, availability | Field extractors — `architecture.svg`, step 6 of `sequence-fr-1.svg` | Translate tab → large price + **Details** grid; Saved → details panel | `tests/extractors.test`: deposit formats (months/baht/commas/ประกันห้อง/no unit), location (floor area never mistaken for location, trailing phone stripped), price/phone/availability — 11 tests pass |
| FR-3 | Show distance from MFU | Distance detector + landmark table — `architecture.svg` | Translate tab → **Distance** row; Saved card subtitle | `tests/extractors.test`: map link keeps stated minutes and km (incl. decimals), Fah Thai landmark fallback, explicit "not stated" message |
| FR-4 | Save a listing and reopen it | `SavedListing` — `data-model.svg` | **Save listing** → Saved tab → reload page | Manual: save demo post, reload, listing and its details are still there |
| FR-5 | Search saved listings and shortlist them | `SavedListing.starred` — `data-model.svg` | Saved tab → search field, **★ Only** filter | Manual: 3 saved listings, query `ซอย`, star filter, remove |
| FR-6 | Generate a Thai message for the landlord | Translation path (en→th) — `sequence-fr-1.svg` | Translate tab → **Ask the landlord** → tick questions → **Generate Thai message** → Copy | Manual: 5 questions → Thai output, copied to clipboard |
| FR-7 | Attach photos to a listing, download later | `Photo` — `data-model.svg` | Translate tab → photo tray (**+ Add**, paste, drag & drop); Saved → download | Manual: add/paste/drag, duplicate rejected, downscaled to ≤1000 px, saved with the listing, downloaded |
| FR-8 | Export saved listings to CSV | `SavedListing` flattening — `data-model.svg` | Saved tab → **Export CSV** | Manual: export → header + rows, 11 columns, rent rendered as `6000 THB/month` |
| FR-9 | Prototype opens from one file with no build step | Static bundle — `architecture.svg` (web prototype group) | `prototype/index.html` | Double-clicked via `file://`: page and assets load, no server or build; service worker is skipped on `file://` by design |

**Should / Could FRs** (not required for the Golden Thread, implemented where noted):

| FR | Requirement | Status | Where |
|---|---|---|---|
| FR-10 | Pull the post text from a Facebook source link | Done (extension) | `background.js`, popup "Source link" field |
| FR-11 | Translate selected text on any page via right-click | Done (extension) | `content.js`, `background.js` context menu |
| FR-12 | Area + budget alerts | Done (prototype and popup) | Alerts tab |
| FR-13 | Light/dark theme, follows the OS | Done (both) | header toggle; `theme` key |
| FR-14 | Screenshot OCR | Not implemented | popup shows an explicit "not in this build" message instead of failing silently |

## 6. Verification

1. **Automated:** `node --test tests/extractors.test` — **11 tests, 11 pass**
   (0 fail). The suite loads the pure functions out of `popup.js` in a `vm`
   context, so the shipped code is what is tested.
2. **Manual demo script** run on the prototype and the extension: demo post 1
   (rent 6000, deposit 1 month, phone 081-234-5678, 10 min from MFU), demo post 2
   (rent 4500, deposit 2 months, map link), save → reload → search → star →
   export → reply → theme toggle.
3. **Cross-check with the extension:** the same post produces the same fields in
   the popup and the prototype, because both call the same extractor code.
4. **Responsive check:** 360 / 768 / 1440 px widths — no horizontal overflow;
   dark theme contrast sampled on key text/background pairs.

## 7. Limitations and honest gaps

- **Screenshot OCR (FR-14)** is not implemented; the UI says so rather than
  silently failing.
- **Translation quality** depends on MyMemory's free tier. There is a fair-use
  quota; on 429 the app shows the free-limit message. No offline translation.
- **Distance** is what the landlord states (minutes), what a map link implies, or
  a landmark approximation — it is not a routed walking distance.
- **No backend:** saved listings live in the browser only. Clearing site data
  clears them; they are not synced between devices.
- **Photo storage** is bounded by the browser; the app downscales and reports when
  the quota is hit.

## 8. What is next

1. OCR for screenshots (the one Must-adjacent gap).
2. A real distance calculation (routing API) instead of stated minutes.
3. Optional account + sync for saved listings.
4. Thai-language UI for landlords, so both sides of the conversation are served.

## 9. How to run the demo

1. Open `prototype/index.html` (double-click) — or the live link in the README.
2. Press **Load demo**, then **Translate listing** (or `Ctrl/Cmd + Enter`).
3. Show the price hero, the details grid, and the distance row.
4. **Save listing** → Saved tab → search, star, export CSV.
5. **Ask the landlord** → choose questions → **Generate Thai message** → copy.
6. For the extension: `chrome://extensions` → Developer mode → **Load unpacked**
   → this folder → open a Thai Facebook post → right-click → *Translate with
   BaanRight*.
