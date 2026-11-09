# BaanRight — Thai Housing Translator

An off-campus housing assistant for international students at Mae Fah Luang
University (MFU). BaanRight turns Thai rental posts into listings you can act on:
it translates the post, extracts the rent, deposit, phone number, location and
availability, works out the distance to campus, and saves everything — photos
included — in one click.

**Built by 16RideRight (Group 16)** · Intro2SE 15031001, Semester 1/2569.

| | |
|---|---|
| **Web prototype** | open [`prototype/index.html`](prototype/index.html) — double-click, no build step, no server |
| **Live demo** | https://baanright-web.vercel.app/ |
| **Chrome extension** | Load unpacked from this repository (see below) |
| **Final report** | [`docs/final-report.md`](docs/final-report.md) (includes the Golden Thread table) |

## Open the prototype

Double-click **`prototype/index.html`**. It runs entirely in the browser: no
install, no build, no server. Tabs: **Translate**, **Saved**, **Alerts**, plus the
reply generator. Press **Load demo** to fill in a sample Thai post.

`Translated` needs an internet connection (MyMemory API); everything else,
including saved listings, works offline.

## Install the Chrome extension

1. Open `chrome://extensions` and turn on **Developer mode**.
2. Click **Load unpacked** and select this folder.
3. Pin BaanRight to your toolbar — or select a Thai post and right-click →
   **Translate with BaanRight**.

## Features

- **Translate & extract** — paste a Thai post, get English plus structured
  details (price, deposit, phone, location, availability). `Ctrl/Cmd + Enter` runs it.
- **Distance from MFU** — stated minutes, a map link, or the Fah Thai market
  landmark; never a blank answer.
- **Save photos** — right-click any photo on Facebook → *Save image to BaanRight*,
  or add files from your computer. Tick the photos you want and they are attached
  when the listing is saved.
- **Saved listings** — searchable list with one-tap *Call landlord*, original post
  link, photo thumbnails, a ★ shortlist and details on demand.
- **Ask the landlord** — tick the questions you want, generate a Thai message, copy it.
- **Export CSV** — take saved listings into a spreadsheet to compare.
- **Alerts** — keep your target area and max budget, then see which saved listings match.
- **Works where you read** — select text anywhere (right-click → *Translate with
  BaanRight*) and it lands in the popup ready to translate.
- **Light/dark theme**, responsive layout, autosaved drafts.

## Repository layout

```
README.md                     this file
prototype/                    web prototype — index.html is the single entry point
  index.html  style.css  script.js  sw.js  manifest.json  icons/
docs/
  final-report.md             M3 report + Golden Thread table
  ai-use-statement.md         where AI helped and how we checked it
  design/
    architecture.svg          system architecture
    use-case.svg              actors and use cases
    sequence-fr-1.svg         translate & extract sequence (Must FR)
    data-model.svg            stored JSON shapes
slides/
  demo-slides.html            demo deck (arrow keys; print → PDF)
popup.html / popup.js / popup.css        extension popup (Translate / Saved / Alerts)
background.js / content.js               context menus, in-page selection translate
photo-add.html / photo-add.js            save Facebook photos into a listing
manifest.json                            Chrome extension manifest (MV3)
icons/                                   extension icons
tests/extractors.test                    unit tests for the extractors
```

## Tests

```bash
node --test tests/extractors.test     # 11 tests, all passing (Node 20+)
```

The suite loads the pure functions out of `popup.js` in an isolated `vm` context,
so the shipped code is what is tested. It covers deposit formats (months, baht,
commas, `ประกันห้อง`, no unit), Thai digits, location vs. floor area, trailing
phone numbers, distance detection, and translation error handling (quota text,
HTTP 429, other statuses).

## Documentation

| Document | Where |
|---|---|
| Final Report + Golden Thread | [`docs/final-report.md`](docs/final-report.md) |
| AI-Use Statement | [`docs/ai-use-statement.md`](docs/ai-use-statement.md) |
| Architecture | [`docs/design/architecture.svg`](docs/design/architecture.svg) |
| Use-case diagram | [`docs/design/use-case.svg`](docs/design/use-case.svg) |
| Sequence (translate / extract) | [`docs/design/sequence-fr-1.svg`](docs/design/sequence-fr-1.svg) |
| Data model | [`docs/design/data-model.svg`](docs/design/data-model.svg) |
| Demo slides | [`slides/demo-slides.html`](slides/demo-slides.html) |
| Team Charter (M1) | `docs/M1-team-charter.pdf` |
| SRS (M2) | `docs/M2-srs.pdf` |

## Team

| Member | GitHub |
|---|---|
| Kenneth | [@Kennethkaungsatt](https://github.com/Kennethkaungsatt) |
| Mun2ddd | [@mun2ddd](https://github.com/mun2ddd) |
| thxbe | [@thxbe](https://github.com/thxbe) |

Team roles, student IDs and meeting arrangements are recorded in the M1 Team
Charter. Work reaches `main` through pull requests (for example the merge of PR #2 in
the history); every member commits from their own account.

## How it is built

Plain JavaScript, no framework and no backend. The extension is Manifest V3
(popup + service worker + content script); the prototype is a static page with a
small service worker for offline use. Data lives in `chrome.storage.local` or
`localStorage`. Translation uses the free MyMemory API, called directly from the
client; long posts are split into ≤ 450-byte chunks and translated sequentially.
