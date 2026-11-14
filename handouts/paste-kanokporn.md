# Thai copy review — the message a student sends to a landlord

**Status:** not yet run. This file is the record sheet; it is empty on purpose.
**Reviewer:** Kanokporn Pakchaipoom (`@MelleM686`)
**Date:** ____
**What is being reviewed:** the Thai text produced by **Ask the landlord** (FR-4) — the one piece of Thai in the product that leaves the app and reaches a real person. A wrong register here costs a student a room.

---

## 1. Read this first: the Thai is not in the repository

The app does **not** store Thai sentences. It stores five **English** templates, sends each one to MyMemory (en → th), and joins the results with newlines:

- templates: `extension/popup.js` line 7 (`REPLY_TEMPLATES`) and `prototype/script.js` line 13 (same five, same order)
- assembly: `extension/popup.js` line 1060 and `prototype/script.js` line 1027 — one translated line per question, joined with `\n`, with **no greeting, no sign-off, no name**

**Consequence:** you cannot review this by reading the code. You have to run the app, tick all five questions, press **Generate Thai message**, and copy the actual Thai into the table below **verbatim**. Do not paraphrase, do not "clean it up", and do not write Thai from memory as though the app had produced it. If something looks wrong, keep the wrong text and describe the problem in the next column — the evidence is the bug.

## 2. How to capture the output

1. Open `prototype/index.html` (or the extension popup) with a network connection — translation is a live API call.
2. Go to **Ask the landlord**, tick **all five**, press **Generate Thai message**.
3. Copy the five lines into the "App output" column, one per row, exactly as shown.
4. If you generate twice and get different wording, say so in §4 — non-deterministic output is itself worth reporting.

## 3. The five messages

| id | English source (what the app sends) | App's Thai output (paste verbatim) | Reads like natural Thai? | Problem | Proposed wording (label it as a proposal) |
|---|---|---|---|---|---|
| `avail` | Hi, is this room still available? |  |  |  |  |
| `view` | Can I schedule a viewing this weekend? |  |  |  |  |
| `deposit` | Is the deposit negotiable? |  |  |  |  |
| `utilities` | What utilities are included in the price? |  |  |  |  |
| `foreigner` | Do you accept international students as tenants? |  |  |  |  |

Judge each on: is this something a person would actually type to a landlord, or does it read like a translated sentence? Is the politeness level right for a first message to a stranger? Is anything ambiguous in a way that would get a confusing reply?

## 4. How the message arrives (not just the words)

These are layout and social problems the translation can't fix, so they need a decision rather than a rewording.

| # | Observation | Verdict (fine / problem) | Proposed change |
|---|---|---|---|
| 1 | The five lines are joined into one message with no greeting or self-introduction. |  |  |
| 2 | There is no sign-off and no name — the student is a stranger to the landlord. |  |  |
| 3 | Five questions arrive at once in a single DM; a landlord may answer only the first. |  |  |
| 4 | The machine may pick a politeness particle (ครับ / ค่ะ) without knowing the sender's gender. Check whether the output commits to one, and whether that is acceptable. |  |  |
| 5 | Sending order: is "is it available" first the right opener, or should a greeting come before it? |  |  |

Also note here if the same question translated differently between two runs, or if a line came back in English / half-translated. Write `none` if neither happened:

____

## 5. Other Thai a user sees

Lower priority, but the reviewer is the only person who can spot it. Judge naturalness and whether it reads like a real listing (these are demo posts in `prototype/script.js`, shown on screen):

**Demo post 1**
```
ห้องให้เช่า ซอยแม่จันใต้ 3 ใกล้มหาวิทยาลัยแม่ฟ้าหลวง
ค่าเช่า 6000 บาท/เดือน
ประกัน 1 เดือน
พื้นที่ใช้สอย 24 ตารางเมตร มีแอร์ ตู้เย็น ทีวี wifi
ห่างจากมหาวิทยาลัย 10 นาที
ห้องว่าง พร้อมเข้าอยู่
สนใจโทร 081-234-5678
```

**Demo post 2**
```
บ้านให้เช่า ใกล้ตลาดฟ้าไทย เฟอร์นิเจอร์ครบ ใหม่เอี่ยม
ค่าเช่า 4,500 บาท/เดือน
ประกัน 2 เดือน
ทำเล : ซอยคุณหญิงสุชาดา หลัง ม.แม่ฟ้าหลวง
ห่าง มอ 5นาที https://maps.app.goo.gl/demoMapLink
ว่างให้เช่า Tel 092-111-2233
```

| Item | Reads naturally? | Note |
|---|---|---|
| Demo post 1 |  |  |
| Demo post 2 |  |  |
| Paste-box placeholder / example text, if any |  |  |

## 6. Out of scope — do not change these

The extractor matches Thai **keywords** (`ค่าเช่า`, `ราคา`, `ประกัน`, `มัดจำ`, `ห้องว่าง`, `ว่างให้เช่า`, …) in `extension/popup.js` and `prototype/script.js`. Those are parser vocabulary, not copy: editing them changes what the app extracts, and `tests/extractors.test` depends on the current set.

If you believe a keyword is missing or wrong, **write it as a finding here** and let the person who owns that code change it:

Finding (or write "none"):

## 7. If a fix is needed — report it, don't do it in this commit

Your commit adds one new file and nothing else. **Do not edit code through the GitHub website.** If the wording needs changing, write what and why here and the repo owner will make the change.

- The five templates are **English**. If the Thai is wrong because the English was ambiguous, change the English string and keep the `id` identical (the id is what the checkbox sends).
- Re-run **Generate Thai message** after any change and paste the new Thai next to the old one — the before/after is the evidence the fix worked.
- If code changes at all, run the suite before committing:

```
node --test tests/extractors.test
```

Expect `tests 11 · pass 11 · fail 0`. If that fails, stop — the change touched extraction, not copy.

## 8. Sign-off

I am a Thai speaker, I ran the app myself, and the Thai quoted above is what the app showed me.

Name: Kanokporn Pakchaipoom  GitHub: `@MelleM686`  Date: ____

## 9. Commit message

```
Review the Thai the landlord reply actually produces (<n> issues found)

<one line: the most serious problem, or "no wording changes needed">
<one line: whether any template text was changed and the tests still pass>
```
