# AI-Use Statement (M3)

**Team:** 16RideRight · Group 16 · project: BaanRight
**Scope:** the Chrome extension and the web prototype in this repository.

We used AI assistants (in-editor chat assistants and a general chat model) while
building BaanRight. This statement says where, what happened, and how we checked
the result. The team owns every line that is in this repository.

## 1. What AI is used for in the product itself

BaanRight calls the **MyMemory translation API** at runtime. That is a
machine-translation service, not a generative model writing our code or content:
it receives the post text and returns a translation. No AI generates listings,
prices or answers — all extraction is deterministic regular-expression logic that
we wrote and test.

## 2. Where AI helped during development

| Area | How AI was used | Human owner |
|---|---|---|
| Web prototype (`prototype/`) | Codebuff built the complete web app: translate, extract, save, search, CSV export, alerts | Kaung Satt Thiha ran and reviewed it, then committed it |
| UI markup and CSS (extension popup) | Chat assistants scaffolded the popup layout (tabs, cards, detail grid) and iterated on the light/dark palette | Front-end member reviews and adjusts every screen |
| Thai text extraction | Chat assistants proposed regex variants for rent, deposit, phone and location, and Thai-digit normalisation | Member verified each pattern against real posts |
| Tests | Chat assistants drafted the `node:test` harness that slices the pure functions out of `extension/popup.js` and cases for deposit/location/distance edge cases | Member extended the cases and runs them before every merge |
| Documentation | Codebuff wrote the final report (including the Golden Thread and NFR table), this statement, `docs/project-brief.md`, the README and four SVG diagrams. Chat assistants outlined the SRS structure | Kaung Satt Thiha reviewed and committed the documents; the team is responsible for their content |
| Demo slides | Codebuff built `slides/demo-slides.html`, the PDF and `generate-pdf.sh` | Kaung Satt Thiha |
| Repository work | Codebuff moved the extension into `extension/` and updated paths, merged the `fix-ui-text` branch (including an FR-5 fix), merged teammates' commits and tagged `m3-demo` | Kaung Satt Thiha |
| Code audit | Codebuff read the extension source and reported two defects: an unused `nominatim` permission, and MyMemory quota warnings returned with HTTP 200 | Kaung Satt Thiha |
| Debugging | Chat assistants explained a failed pull of post text from Facebook and the MyMemory quota response | Member reproduced, fixed and committed |

## 3. What worked

- **Boilerplate and repetition.** Generating the first draft of a card layout or a
  regex loop saved hours that went into testing and demo preparation instead.
- **Edge cases we would have missed.** Asking for awkward Thai inputs surfaced the
  case where `มัดจำ 50` was being read as "50 months" instead of 50 baht, and the
  case where Thai digits (๐–๙) broke price extraction. Both became regression
  tests (`tests/extractors.test`).
- **Explaining unfamiliar APIs.** Context menus, service workers and storage quota
  behaviour were explained quickly, which shortened the debugging loop.

## 4. What did not work

- **Thai-language nuance.** Early generated regexes assumed spaces between Thai
  words. Thai does not use them, so patterns silently missed real posts; we
  rewrote them around Thai unit words and retested.
- **A refactor suggestion that broke the product.** An AI-proposed split of the
  source-link logic into a separate module stopped post pulling from working. It
  is visible in the history (`Refactor source-link…` → `Revert source-link
  refactor…`); we reverted it and fixed the two real bugs directly.
- **Confident but wrong explanations.** Some generated answers about Chrome
  extension permissions were outdated; we checked them against the official
  documentation before shipping.
- **Documentation bias.** Drafts praised features we had not finished (OCR, for
  example). We corrected the text to list OCR as not implemented.

## 5. How every AI-assisted change was checked

1. **Read before commit.** No generated block was committed unseen; the author
   had to be able to explain it.
2. **Automated tests.** `node --test tests/extractors.test` — 11 tests covering
   price, deposit, phone, location, distance, Thai digits and translation error
   handling — must pass before merging.
3. **Manual runs on real posts.** Each extractor change was tried on real Facebook
   housing posts and on the two demo posts, in both the popup and the prototype.
4. **Peer review.** Work arrives through pull requests (PR #2 is merged in the
   history); a teammate reads the diff before it reaches `main`.
5. **Demo dry-run.** The full demo script (translate → save → search → export →
   reply → theme) is run on the web prototype and the extension before class.

## 6. Disclosure

- AI assistance is limited to development-time help as described above. It is not
  part of the runtime behaviour except the MyMemory translation service.
- We did not knowingly share personal data (for example a real landlord's name or
  phone number) with an AI tool. In-editor assistants can read the code files they
  are used on, and we pasted code and example Thai posts into a chat model when
  debugging.
- **Codebuff (AI coding agent), 9–12 Nov 2026.** The repository's contributor list
  shows an account named `codebuff-team`. This is the AI coding tool Codebuff,
  run by Kaung Satt Thiha (@Kennethkaungsatt). It is not a team member and we
  claim no individual credit for it. Its work is listed in §2: the web
  prototype, the documentation, the demo slides, repository restructuring and a
  code audit. It also found two defects in the extension: an unused `nominatim`
  permission, and MyMemory quota warnings returned with HTTP 200.
- Codebuff did not write the extension feature code or the M1 and M2 PDFs, and it
  was not used to test the extension in a live Chrome profile.
- The team is responsible for everything in this repository. Kaung Satt Thiha
  reviewed Codebuff's output before committing it.
  
