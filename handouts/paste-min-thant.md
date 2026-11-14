# NFR-3 usability test — first use within 30 seconds

**Status:** not yet run. This file is the record sheet; it is empty on purpose.
**Tester:** Min Thant Maung Maung (`@Skai-max67`)
**Surface tested:** prototype (`prototype/index.html`) — not the extension
**Date(s) of sessions:** ____
**Requirement:** SRS §4 NFR-3 — a first-time student pastes a post and gets usable output within **30 seconds**, without help.
**Why this file exists:** `docs/final-report.md` §5 currently says this requirement was *not formally timed*. Until someone measures it, the report has to admit that. This sheet is how it stops being a gap.

---

## 1. What you are measuring

One number per person: **seconds from their first click into the paste box to price + at least three other fields being visible** (deposit, phone, location, distance from MFU).

It is not "did they like it", and it is not the demo button. It is the honest first-run cost of the real task.

## 2. Setup

- Use the built prototype (open `prototype/index.html` in a browser) **or** the extension loaded from `extension/`. Write down which one — do not mix surfaces in one table.
- Have this exact post on the clipboard so every participant gets the same input:

```
ห้องให้เช่า ซอยแม่จันใต้ 3 ใกล้มหาวิทยาลัยแม่ฟ้าหลวง
ค่าเช่า 6000 บาท/เดือน
ประกัน 1 เดือน
พื้นที่ใช้สอย 24 ตารางเมตร มีแอร์ ตู้เย็น ทีวี wifi
ห่างจากมหาวิทยาลัย 10 นาที
ห้องว่าง พร้อมเข้าอยู่
สนใจโทร 081-234-5678
```

  (This is the first demo post in `prototype/script.js`, unmodified.)
- Timers ready: phone stopwatch is fine. Start it on their **first click into the paste box**, stop it when the fields are on screen.
- Agree a participant ID scheme **before** anyone sits down: P1, P2, P3… No names in this file.

## 3. Rules for every session

1. Say **only** this: *"Paste this Thai post and get the room's price, deposit, phone and distance from MFU."* Then stop talking.
2. The **"Load a demo post" button is not allowed** during the timed run. It is a demo affordance real users don't have; allowing it makes the number meaningless. Every participant pastes.
3. No pointing at the button, no "try the big one", no translating anything for them.
4. Write down what they **did** and what they **asked**, in their words. Not your interpretation.
5. If they give up or ask for help, record `gave up at __ s` or `helped at __ s`. **Never turn that into a pass, and never re-run them to get a better time** — that is the finding.
6. Note whether they read Thai. The target user does not; if all your participants read Thai, say so in §5, because the number then isn't evidence for the real user.

## 4. Results

| ID | Background (role/year, reads Thai? y/n) | Started unaided? | Seconds | Fields visible at stop | Help needed? | What they hesitated on / asked |
|---|---|---|---|---|---|---|
| P1 |  |  |  |  |  |  |
| P2 |  |  |  |  |  |  |
| P3 |  |  |  |  |  |  |
| P4 |  |  |  |  |  |  |
| P5 |  |  |  |  |  |  |

Fill only the rows you actually ran. Delete the rest — an empty P5 row reads as five sessions that never happened.

## 5. Summary

- Participants run: **____**
- Median time: **____ s**
- Slowest: **____ s** · Fastest: **____ s**
- Finished under 30 s, unaided: **____ of ____**
- **Verdict:** ____ — write `met`, `not met` or `inconclusive` (if inconclusive, say why here)
- **Caveats about the sample:** ____ — all read Thai / all CS students / all on a laptop; write `none` if there are none

## 6. Where the number goes — **not part of your commit**

This section is for the repo owner, done as a separate follow-up once your sheet is on GitHub. Do not edit `docs/final-report.md` yourself: your commit should add one new file and nothing else.

Replace this row in `docs/final-report.md` §5:

```
| NFR-3 usability | First-time student pastes and starts within 30 s | Not formally timed with an unfamiliar user; the flow is paste → one button. Gap noted in §7 |
```

with the same row whose third cell reads, for example:

```
| NFR-3 usability | First-time student pastes and starts within 30 s | Timed with <n> first-time participants on <date>: median <n> s (range <n>–<n> s), <n>/<n> under 30 s unaided. Method and per-participant data in `docs/usability-test-nfr3.md` |
```

The same "**Unverified**" claim appears in `docs/project-brief.md` (NFR-3 row) and, if that file is committed, `slides/demo-slides-v2.html` (slide 6, NFR-3 row). Update all of them or none — a fresh test next to a stale "unverified" is worse than either alone.

If the verdict is **not met**, do not delete this file. Report the median, and say what the first-run cost actually is. A measured miss is a better answer than an unmeasured pass.

## 7. Sign-off

I ran these sessions myself and the numbers above are what I recorded, not estimates.

Name: Min Thant Maung Maung  GitHub: `@Skai-max67`  Date: ____

## 8. Commit message

```
Record the NFR-3 timed usability test on the <prototype|extension> (<n> participants)

<one line: median seconds and pass/fail against the 30 s target>
<one line: what participants hesitated on, if anything>
```
