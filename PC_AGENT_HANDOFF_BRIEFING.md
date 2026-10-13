# PC Agent Handoff Briefing — Visualisation Spec Workstream

**Prepared by:** Cursor Cloud Agent  
**Date:** 2026-10-13  
**Audience:** Cursor desktop / PC agent (Agents Window or My Machines worker)  
**Priority:** Read this first before continuing visualisation or Drive-file work

---

## 1. What “cloud agent” means for this query

This work was done by a **Cursor Cloud Agent** — it runs in a remote VM, not on the user’s PC.

| Surface | Did this work appear there? | Notes |
|---------|----------------------------|-------|
| **GitHub PR** | **Yes** | Draft PR with all markdown commits (see §3) |
| **cursor.com/agents** | **Yes** | This cloud run’s chat / history |
| **Cursor desktop Agents Window (local chats)** | **No** | Local IDE chats are separate unless Remote Control / Move to Cloud / same cloud session |
| **Google Drive folder** | **No** | Cloud agent cannot see personal Drive without sync or share |
| **Local disk / Drive-synced PC folder** | **No** | Not mounted in this cloud workspace |

**Bottom line:** Nothing was written to the user’s PC or Drive. Everything that “landed” is on **GitHub** (branch + draft PR) and in this **cloud agent session**. The PC agent must pull from GitHub (or open the PR) to continue.

---

## 2. Mission for the PC agent

Investigate and continue from this workstream:

1. **Confirm** the PR and files exist on the remote repo (pull/checkout the branch).
2. **Locate** the Google Drive folder the user mentioned (local sync or share) — cloud agent could not access it.
3. **Reconcile** Drive contents (`scripts.md`, JSON mirrors, sync scripts) with the new visualisation docs.
4. **Optionally implement** Tier A dashboard UI per the merged specs, or wire JSON field paths into the docs with real samples.

---

## 3. Where the artefacts are

### Repository

- **Repo:** `AndyAstfalckTheAquaticCoach/AndyAstfalckGitHubTrainingFolder`
- **Branch:** `cursor/visualisation-spec-15f6`
- **Base:** `main`
- **Draft PR:** https://github.com/AndyAstfalckTheAquaticCoach/AndyAstfalckGitHubTrainingFolder/pull/5

### Files added / updated on that branch

| File | Role |
|------|------|
| `visualisation spec.md` | What to show: zones, thresholds, swim, PMC, wellness, sleep/HRV, events, periodisation, shapes, Tier A/B |
| `design rules.md` | How to show it: expert rules + Gemini brief merge (§0 Core Paradigm) |
| `SECTION_11.md` | Already on main — coaching protocol / data integrity (do not invent numbers) |
| `PC_AGENT_HANDOFF_BRIEFING.md` | This document |

### Suggested git commands (on PC)

```bash
cd /path/to/AndyAstfalckGitHubTrainingFolder
git fetch origin cursor/visualisation-spec-15f6
git checkout cursor/visualisation-spec-15f6
# or: git pull origin cursor/visualisation-spec-15f6
```

Read in this order:
1. This briefing  
2. `design rules.md` §0 (Tier A/B + banned charts)  
3. `visualisation spec.md` (Dashboard Architecture + metric sections)  
4. `SECTION_11.md` only as needed for field names / integrity  

---

## 4. Conversation arc (what the user asked for)

1. **Agents on PC vs cloud** — how to see PC agents from phone/cloud; My Machines / Remote Control / Agents Window.
2. **User on iPhone** — cloud agents visible; local IDE chats not, unless handed off.
3. **Dashboard visualisation needs** — zones, shapes, power zones Z1 blue→Z5 red, thresholds, swim CSS/stroke metrics, CTL/ATL/TSB, wellness body comp.
4. **Saved as** `visualisation spec.md`.
5. **Expanded shapes**, sleep/HRV/RHR, event countdown, periodisation blocks; **gradual phase colour blends**.
6. **Expert design sources** → `design rules.md` (Tufte, Few, Knaflic, NN/g, FT Visual Vocabulary, etc.).
7. **Google Drive** link with scripts.md / JSON — cloud agent **could not open** Drive.
8. **Gemini briefing** compared and **merged** into our docs (cognitive fatigue, banned circular charts, bullet graphs, small multiples 7/30/90/180/365d, variance baselines, dynamic phase targets).

---

## 5. Canonical design decisions (do not undo without user OK)

### Tier A (Today tab — exhausted athlete)

- **Word-size metric row:** `[Name] [Value] [Bullet graph] [5 sparklines: 7d 30d 90d 180d 365d]`
- **Banned:** donuts, circular gauges, radar, multi-line “spaghetti” horizon overlays, chartjunk
- **Targets:** horizontal **bullet graphs**, grayscale under/optimal/over bands; **phase-aware** optimal ranges
- **Horizons:** 7 / 30 / 90 / 180 / 365 days; **independent Y-scale** per sparkline
- **Macro horizons (90–365d):** rolling average or Z-score vs chronic mean — not raw daily noise
- **Nulls:** gap / broken segment — **never plot as zero**

### Tier B (drill-down)

- Combined PMC, session zone timeline strips, phase block gradient timelines, scatter plots OK
- Still no 3D / decorative chartjunk

### Retained project semantics

- Zone colours Z1 `#2563EB` → Z5 `#EF4444` on **linear stacked bars**
- Phase colours blend over **5–7 days** (no hard cuts)
- Section 11 integrity: no interpolation; per-sport thresholds; sleep score not a readiness gate

### Conflict resolution order

1. Section 11 data integrity  
2. `design rules.md` §0 Tier A paradigm  
3. `visualisation spec.md` metric/colour semantics  
4. Broader design rules for Tier B  

---

## 6. Google Drive — PC agent investigation task

**User link:** https://drive.google.com/drive/folders/1bT8ykLyqR4FyeGX-5OQplOXq0r72trS2  

User said this folder holds **scripts.md**, scripts, and **JSON** files. Cloud agent timeout / no auth — **PC agent must investigate**.

### Checklist for PC agent

- [ ] Confirm Drive is synced locally (Google Drive for Desktop path) **or** open via browser while signed in as the user  
- [ ] Inventory folder contents (names, types, dates) — do **not** dump IBANs/BSN/secrets into chat  
- [ ] Identify: `scripts.md`, sync scripts (`sync.py`?), `latest.json`, `history.json`, `intervals.json`, dossier files  
- [ ] Map JSON fields → Tier A metric rows (CTL, ATL, TSB, HRV, RHR, sleep, zones, race_calendar, phase_detection)  
- [ ] Note gaps vs `visualisation spec.md` (missing fields, horizon tiers, wellness body-comp)  
- [ ] Propose whether Drive files should be **committed to GitHub** (user’s preferred long-term path for Section 11 mirrors)  
- [ ] Report findings back in the PC agent chat (and optionally append a short inventory section to this briefing)

### Important

- Do not invent metrics. Use verified JSON / Section 11 definitions only.  
- Do not paste full IBANs, BSN, passport data.  
- Prefer GitHub as source of truth for agent-readable mirrors.

---

## 7. Suggested next implementation steps (after Drive inventory)

1. Checkout PR branch; confirm markdown matches this briefing.  
2. If JSON exists: document exact field paths for each Tier A metric row.  
3. Build **one** Tier A prototype row (e.g. CTL) with bullet + 5 sparklines — validate null/outlier rules.  
4. Wire phase-aware bullet bands from `phase_detection`.  
5. Keep circular countdown / gauges / radar **out** of Today tab.  
6. Ask user before merging PR #5 to `main`.

---

## 8. How the user can see / steer this from phone or PC

| Goal | Action |
|------|--------|
| See this cloud work | Open PR #5 or [cursor.com/agents](https://cursor.com/agents) (same Cursor account) |
| Continue on PC with local files | Open Cursor desktop → Agents Window → new agent with **this briefing + branch checkout** |
| Run tools on PC from web/phone | `agent worker start` (My Machines); pick machine in environment dropdown |
| Hand off a live desktop chat | Desktop: `/remote-control` so session appears in phone inbox |

---

## 9. Open questions for the user (PC agent should ask if unclear)

1. Should PR #5 be merged to `main` as documentation-only?  
2. Is the Drive folder the canonical home for sync/JSON, or should those move to GitHub?  
3. Target stack for the dashboard UI (Swift, React Native, web)?  
4. Are local IDE agents already working on the same Drive folder?

---

## 10. One-paragraph prompt the user can paste into a PC agent

> Read `PC_AGENT_HANDOFF_BRIEFING.md` on branch `cursor/visualisation-spec-15f6` of `AndyAstfalckGitHubTrainingFolder` (PR #5). Pull that branch. Confirm `visualisation spec.md` and `design rules.md` are present. Then investigate Google Drive folder `1bT8ykLyqR4FyeGX-5OQplOXq0r72trS2` (scripts.md + JSON) on this PC — inventory files, map fields to Tier A metric rows, report gaps. Do not invent data; follow Section 11 integrity and Tier A bans (no donuts/gauges/radar on Today). Report findings and propose next implementation step.

---

*End of handoff. Cloud agent work is complete for this documentation merge; PC agent owns Drive investigation and any local UI implementation.*
