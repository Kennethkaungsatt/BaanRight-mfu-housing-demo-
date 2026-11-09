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
| UI markup and CSS | Scaffolding the popup and web layout (tabs, cards, detail grid), and iterating on the light/dark palette | Front-end member reviews and adjusts every screen |
| Thai text extraction | Proposing regex variants for rent, deposit, phone and location, and Thai-digit normalisation | Member verified each pattern against real posts |
| Tests | Drafting the `node:test` harness that slices the pure functions out of `popup.js` and cases for deposit/location/distance edge cases | Member extended the cases and runs them before every merge |
| Documentation | Outlining this report, the SRS structure and the slide deck | Team rewrote content to match what the code actually does |
| Debugging | Explaining a failed pull of post text from Facebook and the MyMemory quota response | Member reproduced, fixed and committed |

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
- No student work, personal data or third-party code was uploaded to an AI tool.
- Code written with AI help is identified by the commits and pull requests in
  this repository, where every change is traceable to a team member's account.
- If any AI-assisted text ends up in the demo slides or this documentation, it has
  been reviewed and edited by the team before submission.
