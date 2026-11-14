# Your one commit — Min Thant Maung Maung (`@Skai-max67`)

Read this from top to bottom and do it in order. Do not skip Part A: if the app
does not work, there is nothing to write down.

- You do **not** install anything.
- You do **not** need Terminal.
- Everything happens in a web browser and a text editor.

Total time: about 1 hour. Most of it is finding three people.

**What you are doing:** the project has one requirement nobody has measured yet —
that a student who has never seen the app can get what they need within
**30 seconds**. You are going to measure that honestly and put the record on GitHub
under your own name.

---

## Part A — get the app running on your computer (5 minutes)

1. Open Chrome. Go to the project page:

   **https://github.com/Kennethkaungsatt/BaanRight-mfu-housing-demo-**

   If you get "404 Not Found", see *Problems* at the end — it means you are logged
   into a different GitHub account.

2. Look for the green button labelled **`Code`** (top right of the file list).
   Click it.

3. In the menu that drops down, click **`Download ZIP`** (bottom item).

4. Open your **Downloads** folder. Double-click the `.zip` file. A folder appears.
   Open that folder.

5. Inside, open the folder named **`prototype`**. Double-click the file
   **`index.html`**.

   It opens in Chrome. The address bar starts with `file:///`. That is correct —
   you are not doing anything wrong.

6. Check it works **before** you call anyone: click the button **"▶ Load a demo
   post"**. Within about five seconds you should see English text plus a price,
   deposit, phone number and distance.

   - If you see that: good, continue.
   - If you see red text **"Couldn't translate that: Failed to fetch"**: you are
     offline, or on a network that blocks the translation service. Try phone
     hotspot or another Wi-Fi, reload the page, try again. **Do not run the test in
     that state** — the app will not produce any results and every participant will
     appear to "fail".

Keep that tab open. You will reload it between participants.

---

## Part B — run the timed test (about 45 minutes)

You need **3 people** who have never seen this app. Students are fine. People who
read Thai are less useful (the real user does not), but write down who they were
either way.

### B1. Before each person

1. Press **Cmd + R** to reload the page. This clears anything left from the person before.
2. If Thai text is still sitting in the big box, click **"Clear text"** so the box
   is empty. An empty box is essential — the test is "can they get it in".
3. Copy the post below into **Notes** (or any text file) on the screen, so the
   person can copy it from there. Do **not** use the "Load a demo post" button in
   the test — real users do not have that button, and using it makes the whole
   number meaningless.

```
ห้องให้เช่า ซอยแม่จันใต้ 3 ใกล้มหาวิทยาลัยแม่ฟ้าหลวง
ค่าเช่า 6000 บาท/เดือน
ประกัน 1 เดือน
พื้นที่ใช้สอย 24 ตารางเมตร มีแอร์ ตู้เย็น ทีวี wifi
ห่างจากมหาวิทยาลัย 10 นาที
ห้องว่าง พร้อมเข้าอยู่
สนใจโทร 081-234-5678
```

4. Have your phone stopwatch ready.

### B2. What you say (this exact sentence, then nothing)

> "Copy this Thai post into that box and get the room's price, deposit, phone and
> distance from MFU."

Then keep quiet. No pointing. No "press the big button". No translating for them.

### B3. Start and stop the clock

- **Start** when they first click into the paste box.
- **Stop** when the price **and at least three other fields** (deposit, phone,
  location, distance) are visible on screen.
- If they ask for help or give up: write `helped at __ s` or `gave up at __ s` and
  keep the number. **Do not re-run them to get a better time.** That is the finding,
  not a failure of yours.

### B4. Write it down

One row per person. Do it immediately, not from memory later.

| ID | Background (year/course, reads Thai? y/n) | Second | Fields visible at stop | Helped? | What they hesitated on |
|---|---|---|---|---|---|
| P1 |  |  |  |  |  |
| P2 |  |  |  |  |  |
| P3 |  |  |  |  |  |

If you cannot find three people, run **one or two** and mark the verdict
"inconclusive". That is still a real result and a real commit. **Never write down a
person who did not exist, and never write a time you did not measure.**

### B5. Work out the summary

- **Median** with 3 people: put the three times in order, take the middle one.
  With 4: average the middle two. Do not use an average of all of them.
- **Verdict:** met if everyone finished under 30 s unaided; not met if anyone
  needed help or went over; inconclusive if you ran fewer than 3.

---

## Part C — put it on GitHub through the website (10 minutes)

No Git. No Terminal. The website credits your account automatically.

### C1. Log in as the right account

1. Go to **https://github.com** and log in.
2. Top-right corner: your avatar. Click it and check the username is
   **`Skai-max67`**. If it is not, log out and log in with the right account — this
   is the single most common way people end up with no credit.

### C2. Open the project

Go to **https://github.com/Kennethkaungsatt/BaanRight-mfu-housing-demo-**

You need to see a green **`Code`** button **and** an **`Add file`** button. If
`Add file` is missing, Kenneth has not added you as a collaborator yet — tell him
exactly: *"add @Skai-max67 as a collaborator"*. You cannot fix that yourself.

### C3. Create the file

1. Click **`Add file`** → **`Create new file`**.
2. In the box that says **"Name your file…"**, type exactly:

   ```
   docs/usability-test-nfr3.md
   ```

   When you type the `/`, GitHub turns `docs` into a folder and gives you a second,
   shorter box for the filename. That is normal. No spaces anywhere.
3. Click into the big text area below and paste your filled sheet (Part D below has
   the text to fill in).
4. Scroll to the bottom. You will see **"Commit changes"**.
5. In the first small box, type this message:

   ```
   Record the NFR-3 timed usability test on the prototype
   ```

   (You can add the median too, e.g. `... (median 22 s, n=3)`.)
6. Leave the setting on **"Commit directly to the `main` branch"**. Do **not**
   choose "Create a new branch and start a pull request".
7. Click the green **`Commit changes`** button.

You should land on the file's page with a line like *"Skai-max67 committed now"*.

### C4. Prove it worked

1. On that page, click **`History`** (top right of the file). Your commit is at the
   top, with your avatar.
2. Click your avatar → your profile → **Contributions**. Today's square turns green.
3. Send Kenneth the link to the file and say it is done.

---

## Part D — the text to paste (this is the whole job)

You have been sent a file called **`paste-min-thant.md`**. That file **is** the
document you commit — its first line is the title that will appear on GitHub. Do not
retype anything from this handout.

1. Open `paste-min-thant.md` in any text editor. Press **Cmd + A**, then **Cmd + C**.
2. In GitHub (step C3), click the big text area and press **Cmd + V**.
3. Fill it in **in the GitHub editor**:
   - **Date(s) of sessions** — the real date you ran them
   - the **P1 / P2 / P3** rows — background, seconds, fields visible, helped?, what
     they hesitated on
   - **§5 Summary** — participants run, median, fastest, slowest, how many under 30 s,
     verdict, caveats
   - **§6** — leave this exactly as it is. It is a note for the repo owner, not yours.
   - **§7 Sign-off** — your name is already there; add the date
   - **§8** — the commit message you used
4. Delete any participant row you did not actually run. An empty P4 or P5 row reads
   as a session that never happened.
5. Before you press Commit: press **Cmd + F** and search for `____`. **Zero results**
   is the only acceptable number. Every blank must hold a real value.
6. Then scroll the results table and check that **no cell is empty** — a row with
   blank cells looks like a participant you never ran.

## Problems you might hit

| What you see | What it means | What to do |
|---|---|---|
| "404 Not Found" on the project page | You are logged into a different GitHub account | Log out, log in as `Skai-max67` |
| No **`Add file`** button | You are not a collaborator yet | Tell Kenneth: "add @Skai-max67 as a collaborator", wait for the invite email, accept it, then reload |
| Only a **`Fork`** button, and `Add file` appears after forking | You cannot write to the project | Fork → create the file in your fork → **Contribute** → **Open pull request**. Kenneth merges it. It still counts as yours. |
| "Couldn't translate that: Failed to fetch" | No connection to the translation service | Other Wi-Fi or phone hotspot, reload, try the demo post again |
| "You don't have permission to edit this file" | Not a collaborator, or you opened the wrong repo | Back to the row above |
| You typed the filename wrong | It will land in the wrong place | Open the file → trash icon → **Commit changes** → start C3 again. Do not keep renaming. |
| Everything worked but your square is not green | It updates within a few minutes | Check the commit's author avatar links to your profile |

**Rules, one last time:** one new file, real numbers, no invented people, no edits
to other files, no new branch. An empty or made-up sheet is worse than no commit —
a reviewer can see both.

**Stuck?** Paste this to Claude with what happened:

> I'm a student adding one file to a GitHub repo through the website and I'm stuck.
> Repo: https://github.com/Kennethkaungsatt/BaanRight-mfu-housing-demo-
> I'm logged in as @Skai-max67. I'm trying to create `docs/usability-test-nfr3.md`
> via Add file → Create new file, and I have a finished markdown file to paste in.
> Do not tell me to use Terminal or git. Ask me one question at a time.
> Here is exactly what I see: [describe it, or paste the error]
