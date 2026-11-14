# Your one commit — Kanokporn Pakchaipoom (`@MelleM686`)

Read this from top to bottom and do it in order. Do not skip Part A: if the app does
not run, there is nothing to review.

- You do **not** install anything.
- You do **not** need Terminal.
- Everything happens in a web browser and a text editor.
- You need an **internet connection** — the Thai is produced by an online translation
  service, so it does not work offline.

Total time: about 40 minutes.

**What you are doing:** the app writes a Thai message that a student sends to a
landlord. Nobody has checked whether that Thai sounds like something a person would
actually send. You are the Thai speaker, so you check it and put the record on
GitHub under your own name.

---

## Part A — get the app running on your computer (5 minutes)

1. Open Chrome. Go to the project page:

   **https://github.com/Kennethkaungsatt/BaanRight-mfu-housing-demo-**

   If you get "404 Not Found", see *Problems* at the end — you are logged into a
   different GitHub account.

2. Click the green **`Code`** button (top right of the file list).

3. Click **`Download ZIP`** (bottom of the menu).

4. Open your **Downloads** folder, double-click the `.zip`. A folder appears. Open it.

5. Open the folder **`prototype`**, then double-click **`index.html`**.

   It opens in Chrome. The address bar starts with `file:///`. That is correct.

6. Check it works before you judge anything: click **"▶ Load a demo post"**. Within
   about five seconds you should see English text plus price, deposit, phone and
   distance.

   - If that works, continue.
   - If you see red **"Couldn't translate that: Failed to fetch"**, you are offline
     or the network is blocking the service. Try another Wi-Fi or a phone hotspot,
     reload, try again. Nothing you review afterwards would be real without it.

---

## Part B — capture and review the Thai (25 minutes)

### B1. Get the Thai the app actually produces

1. Click the tab **"Ask the landlord"**.
2. Tick **all five** questions.
3. Press **"Generate Thai message"**. Wait a few seconds.
4. A Thai message appears in a box, five lines. **Copy it exactly as it is.**
   Do not fix it, do not tidy it, do not retype it from memory. If a line is wrong,
   that wrong line is the evidence — paste it and describe the problem next to it.
5. If you press Generate a second time and the wording changes, note that too.

### B2. Judge each line

For each of the five lines ask yourself:

- Would a person really type this to a landlord they have never met?
- Is the politeness level right for a first message to a stranger?
- Would the landlord understand it, or would it come back as a confusing reply?

Then look at the **whole message**: the app joins five lines with no greeting, no
introduction and no sign-off. Decide whether that matters and what you would do.
Nobody else on the team can answer this — that is why this is your commit.

### B3. Do not touch the code

Do not change anything in `extension/` or `prototype/`. If you think the wording
should change, write your proposed Thai in the sheet and mark it "(proposed)". The
repo owner makes the change.

---

## Part C — put it on GitHub through the website (10 minutes)

No Git. No Terminal. The website credits your account automatically.

### C1. Log in as the right account

1. Go to **https://github.com** and log in.
2. Top-right: your avatar. Click it and check the username is **`MelleM686`**.
   If not, log out and log in with the right account — this is the most common way
   people end up with no credit.

### C2. Open the project

Go to **https://github.com/Kennethkaungsatt/BaanRight-mfu-housing-demo-**

You need to see a green **`Code`** button **and** an **`Add file`** button. If
`Add file` is missing, Kenneth has not added you as a collaborator yet — tell him
exactly: *"add @MelleM686 as a collaborator"*. You cannot fix that yourself.

### C3. Create the file

1. Click **`Add file`** → **`Create new file`**.
2. In the box that says **"Name your file…"**, type exactly:

   ```
   docs/thai-copy-review.md
   ```

   When you type the `/`, GitHub turns `docs` into a folder and gives you a second
   box for the filename. That is normal. No spaces anywhere.
3. Click into the big text area and paste your filled sheet (Part D has the text).
4. Scroll to the bottom. In the first small box, type this message:

   ```
   Review the Thai the landlord reply actually produces
   ```

   (You can add the count too, e.g. `... (3 issues found)`.)
5. Leave the setting on **"Commit directly to the `main` branch"**. Do **not**
   choose "Create a new branch and start a pull request".
6. Click the green **`Commit changes`** button.

You should land on the file page with a line like *"MelleM686 committed now"*.

### C4. Prove it worked

1. Click **`History`** (top right of the file). Your commit is at the top, with your
   avatar.
2. Click your avatar → your profile → **Contributions**. Today's square turns green.
3. Send Kenneth the link and say it is done.

---

## Part D — the text to paste (this is the whole job)

You have been sent a file called **`paste-kanokporn.md`**. That file **is** the
document you commit — its first line is the title that will appear on GitHub. Do not
retype anything from this handout.

1. Open `paste-kanokporn.md` in any text editor. Press **Cmd + A**, then **Cmd + C**.
2. In GitHub (step C3), click the big text area and press **Cmd + V**.
3. Fill it in **in the GitHub editor**:
   - **Date** — today's date
   - **§3 table** — paste the Thai the app showed for each of the five, verbatim, then
     your verdict, the problem, and your proposed wording marked "(proposed)"
   - **§4 table** — a verdict on each of the five rows
   - **§5** — your notes on the two demo posts
   - **§6** — write `none` if you have no findings; do not leave it blank
   - **§8 Sign-off** — your name is already there; add the date
4. Before you press Commit: press **Cmd + F** and search for `____`. **Zero results**
   is the only acceptable number. Then scroll the three tables and check that **no
   cell is empty** — an empty row looks like you skipped it.

## Problems you might hit

| What you see | What it means | What to do |
|---|---|---|
| "404 Not Found" on the project page | Wrong GitHub account | Log out, log in as `MelleM686` |
| No **`Add file`** button | Not a collaborator yet | Tell Kenneth: "add @MelleM686 as a collaborator", accept the invite email, reload |
| Only a **`Fork`** button | You cannot write to the project | Fork → create the file in your fork → **Contribute** → **Open pull request**. Kenneth merges. Still yours. |
| "Couldn't translate that: Failed to fetch" | Offline or blocked service | Other Wi-Fi or hotspot, reload, try the demo post |
| Generate gives nothing (or "Tick at least one question") | No question ticked, or the translation failed | Tick all five, press again, check your connection |
| A line comes back in English or half-translated | The translation service failed on that line | Keep it as-is in the table, write "came back in English" in the Problem column |
| You typed the filename wrong | It lands in the wrong place | Open the file → trash icon → **Commit changes** → redo C3. Do not keep renaming. |

**Rules, one last time:** the Thai in the table must be what the app showed you, not
what it should have said. Your suggestions go in the "Proposed wording" column and
nowhere else. One new file, no code edits, no new branch.

**Stuck?** Paste this to Claude with what happened:

> I'm a student adding one file to a GitHub repo through the website and I'm stuck.
> Repo: https://github.com/Kennethkaungsatt/BaanRight-mfu-housing-demo-
> I'm logged in as @MelleM686. I'm trying to create `docs/thai-copy-review.md`
> via Add file → Create new file, and I have a finished markdown file to paste in.
> Do not tell me to use Terminal or git. Ask me one question at a time.
> Here is exactly what I see: [describe it, or paste the error]
