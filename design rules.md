# Design Rules — Data Visualisation & Dashboard UX

**Purpose:** Actionable design rules for the performance dashboard, synthesised from recognised experts in information design, data visualisation, and dashboard UX.  
**Companion doc:** `visualisation spec.md` (what to show); this document (how to show it well).  
**Last updated:** 2026-07-05  
**Sources:** Expert literature (Tufte, Few, Knaflic, NN/G, FT) + *Endurance Athlete Dashboard* briefing (Gemini, 2026-07-05)

---

## 0. Core Paradigm — Design for Cognitive Fatigue

**Audience:** Elite endurance athletes viewing the dashboard in states of acute physical and neurological exhaustion.

**Goal:** Cognitive load approaches **zero**. Pattern recognition must be immediate; decoration is eliminated.

This paradigm (from the Gemini endurance-dashboard briefing) is **non-negotiable for Tier A views** (see §0.1). It aligns with Tufte (data-ink), Few (linear encoding), and NN/G (operational dashboards).

### 0.1 Two-Tier Dashboard Architecture

| Tier | Views | Rules |
|------|-------|-------|
| **Tier A — Primary metric rows** | Today tab, KPI list, glance readiness | Strict: linear encoding, bullet graphs, small multiples, word-size graphics. **Banned elements apply.** |
| **Tier B — Detail / drill-down** | Session detail, analytical PMC, coach desktop | More chart types permitted (timeline strips, stacked session zones, phase block timeline, scatter). Still no 3D, no chartjunk. |

When `design rules.md` and `visualisation spec.md` conflict on Tier A, **this section wins**.

### 0.2 Banned on Tier A (Non-Negotiable)

Synthesised from Gemini briefing + Few + Tufte + NN/G:

| Banned | Reason | Replace with |
|--------|--------|--------------|
| **Circular gauges & donut charts** | Angle/area encoding is inaccurate; wastes space (Few, NN/G) | Horizontal **stacked bar** (zones); **bullet graph** (targets); large **numeric label** (countdown days) |
| **Multi-line overlays ("spaghetti")** | Five timeframes on one axis = noise | **Small multiples** — one sparkline per horizon, independent Y-scale (Tufte) |
| **Radar / spider charts** | Arbitrary axes distort profile shape (Few) | Separate **metric rows** (HRV, RHR, sleep, TSB each own row) |
| **Radial / semi-circle gauges** | Poor lie factor, low accuracy | **Bullet graph** with grayscale bands |
| **Chartjunk** | Non-data pixels consume exhausted attention | Remove borders, heavy grids, decorative gradients (Tufte) |

**Tier B exceptions:** Session zone timeline strips, phase gradient block timeline, and power-duration curves remain valid in drill-down — they encode time or category, not circular magnitude comparison.

### 0.3 Five Temporal Horizons (Canonical)

All Tier A metric rows expose history across **five horizons** with **independent vertical scaling** per sparkline:

| Horizon | Label | Data source | Display rule |
|---------|-------|-------------|--------------|
| **7d** | 7 days | Daily resolution | Raw or 3d rolling avg |
| **30d** | 30 days | Daily resolution | 7d rolling avg optional |
| **90d** | 90 days | Daily / weekly | **Rolling average** required |
| **180d** | 180 days | Weekly aggregates | Rolling average or Z-score vs chronic mean |
| **365d** | 365 days | Weekly / monthly | **Z-score or rolling avg only** — no raw daily noise |

*Variance Baseline Rule (Guttag & Wiens):* macro horizons (90–365d) plot rolling averages or Z-scores (standard deviations from the athlete's chronic mean), not raw daily points.

### 0.4 Expert Rules Engine (Tier A)

#### Rule A — Word-Size Graphic (Tufte)

Data reads as a **single horizontal sentence**: metric name + current value + target comparison + trend — never separated into disconnected table and chart.

```
CTL (Fitness)   85 TSS/d   [====|----●---|-------]   /\/\_  /\__  /---  /\_/-  --/--
               ↑ value      ↑ bullet (target)         ↑ 7d  30d   90d   180d   365d
```

#### Rule B — Linear Target (Few)

All progress-to-target and zone compliance on Tier A uses **horizontal bullet graphs**:

- Background: three **neutral grayscale** bands — *Under-training* | *Optimal / target* | *Over-training / injury risk*
- High-contrast **target marker** (vertical line) through optimal zone
- **Current value** as dot or bar on the scale
- Do **not** rely on red/green alone (colour-blind accessibility)
- **Dynamic optimal ranges:** bullet bands ingest `phase_detection` — optimal CTL/TSB/ACWR ranges shift for Base, Build, Taper, Recovery (Gemini briefing)

#### Rule C — Small Multiples (Tufte)

To show 7 / 30 / 90 / 180 / 365d: five micro-sparklines in a **horizontal row**, each with **its own Y-axis scale**. Never overlay five horizons on one grid (Gemini briefing; avoids dual-axis deception — Few, Cairo).

Each sparkline includes a subtle **horizontal baseline** = athlete's chronic mean for that metric and horizon.

#### Rule D — Variance Baseline (Guttag & Wiens)

| Horizon | Plot |
|---------|------|
| 7d, 30d | Daily values or short rolling average |
| 90d, 180d, 365d | Rolling average **or** Z-score vs career/chronic mean |

### 0.5 Tier A Layout Template

```
[Metric Name]  [Current Value]  [Target Range Compliance]     [Small Multiples — independent Y each]
                                (Horizontal Bullet Graph)    7d    30d    90d    180d   365d
────────────────────────────────────────────────────────────────────────────────────────────────
CTL (Fitness)  85 TSS/d         [====|--●---|-------]        [~]   [~]    [~]    [~]     [~]
TSB (Form)     +12              [----|---●--|====]          [~]   [~]    [~]    [~]     [~]
HRV            48 ms            [----|----●-|----]            [~]   [~]    [~]    [~]     [~]
```

1. **Label & value** — left-aligned, bold sans-serif, tabular figures  
2. **Bullet graph** — centred; phase-aware optimal band  
3. **Sparkline row** — five cells; baseline = chronic mean  

### 0.6 Validation & Edge Cases (Gemini Briefing)

| Failure mode | Rule |
|--------------|------|
| **Outlier compression** | If one day dominates (e.g. 300 km ride), 7d/30d sparklines **auto-scale** to visible variance — do not flatten remaining days to a flat line |
| **Null / missing data** | Gap or broken line segment — **never** plot as zero (distorts scale and averages) |
| **Static target bands** | Bullet optimal zone **must** update from periodisation phase — not fixed year-round |
| **Lie factor** | Bar charts start at zero; no truncated axes on Tier A |

### 0.7 Comparison — Gemini Briefing vs Prior Docs

| Topic | Prior spec (2026-07-04) | Adopted position (2026-07-05) |
|-------|-------------------------|-------------------------------|
| Donut / ring charts | Allowed for zone summary | **Tier A banned**; Tier B session view → stacked bar only |
| Countdown ring | Primary event widget | **Tier A:** large day number + linear milestone bar; ring removed |
| TSB gauge | Semi-circle gauge | **Bullet graph** with grayscale bands + optional semantic label |
| Recovery radar | 6-axis snapshot | **Tier A:** separate metric rows; radar removed |
| PMC (CTL+ATL+TSB) | Multi-line one chart | **Tier A:** three metric rows; **Tier B drill-down:** combined PMC permitted |
| Temporal windows | 7d / 28d / 90d | **Canonical: 7, 30, 90, 180, 365d** (28d retained as rolling calc, displayed as 30d label) |
| Phase colours | Gradient blends | **Retained** — functional encoding, not decoration |
| Zone colours Z1–Z5 | Blue → red stacked bar | **Retained** — linear stacked bar (Few-approved); not a donut |
| "Not limited to circles" | Encouraged shape variety | **Refined:** linear shapes on Tier A; richer shapes Tier B only |

---

## 1. Expert Sources & Further Reading

These practitioners and organisations specialise in how data is presented graphically on screen. Use them as ongoing reference — not as rigid dogma, but as evidence-based defaults.

### Foundational authors

| Expert | Focus | Key resources |
|--------|-------|---------------|
| **Edward Tufte** | Information design, graphical integrity, minimalism | [edwardtufte.com](https://www.edwardtufte.com/) — *The Visual Display of Quantitative Information*; *Seeing with Fresh Eyes* |
| **Stephen Few** | Business intelligence, dashboards, chart selection | [perceptualedge.com/blog](https://www.perceptualedge.com/blog/) — *Show Me the Numbers*; *Information Dashboard Design*; *Now You See It* |
| **Cole Nussbaumer Knaflic** | Storytelling, decluttering, audience focus | [storytellingwithdata.com](https://www.storytellingwithdata.com/) — *Storytelling with Data*; blog & exercises |
| **Alberto Cairo** | Visual journalism, chart literacy, complexity | [thefunctionalart.com](https://www.thefunctionalart.com/) — *The Functional Art*; *How Charts Lie* |
| **William Cleveland & Robert McGill** | Graphical perception (empirical research) | *Graphical Perception: Theory, Experimentation, and Application* (Science, 1985) |
| **Brent Dykes** | Data storytelling in organisations | *Effective Data Storytelling* — setup (data, viz, config) + polish (noise, attention, trust) |

### Chart selection & vocabulary

| Resource | Focus | URL |
|----------|-------|-----|
| **Financial Times Visual Vocabulary** | Match chart type to data relationship (time, magnitude, distribution, etc.) | [ft.com/vocabulary](https://www.ft.com/vocabulary) · [GitHub](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary) |
| **Graphic Continuum** (Schwabish & Ribecca) | Expanded chart-type map; inspired FT Vocabulary | [policyviz.com/graphic-continuum](https://policyviz.com/graphic-continuum/) |
| **FT Chart Doctor** | Newsroom critique of good and bad charts | [ft.com/chart-doctor](https://www.ft.com/chart-doctor) |
| **From Data to Viz** | Decision tree: data shape → chart type | [datatoviz.com](https://datatoviz.com/) |
| **Data Viz Project** | Gallery of chart types with use cases | [datavizproject.com](https://datavizproject.com/) |

### Dashboard & product UX

| Resource | Focus | URL |
|----------|-------|-----|
| **Nielsen Norman Group** | Preattentive processing, chart choice, clutter, dashboard patterns | [nngroup.com/articles/dashboards-preattentive](https://www.nngroup.com/articles/dashboards-preattentive/) · [choosing-chart-types](https://www.nngroup.com/articles/choosing-chart-types/) · [clutter-charts](https://www.nngroup.com/articles/clutter-charts/) |
| **Material Design — Data visualisation** | Motion, colour, accessibility for charts | [m3.material.io/styles/data-visualization](https://m3.material.io/styles/data-visualization/overview) |
| **IBM Carbon Design System** | Dashboard and chart patterns | [carbondesignsystem.com](https://carbondesignsystem.com/data-visualization/getting-started/) |
| **ColorBrewer** | Colourblind-safe palettes for sequential & categorical data | [colorbrewer2.org](https://colorbrewer2.org/) |

### Communities & practice

| Resource | Focus |
|----------|-------|
| **Makeover Monday** (Kriebel & Murray) | Weekly chart redesign exercises |
| **PolicyViz** (Jon Schwabish) | Blog, podcast, practical viz advice |
| **Tableau Research / Eye-tracking studies** | Dashboard scan patterns (F-pattern, top-left KPI priority) |

---

## 2. Process Rules — Before You Draw Anything

Synthesised from Knaflic (*Storytelling with Data*), Dykes (*Effective Data Storytelling*), and Few (*Show Me the Numbers*).

### Rule 2.1 — Understand the context

| Do | Don't |
|----|-------|
| Define **who** is viewing (athlete on iPhone vs coach on desktop) | Build one chart for every audience at once |
| Define **what decision** the view supports (glance readiness vs deep analysis) | Show data without a question it answers |
| Define **how often** it updates (live, daily, post-workout) | Treat stale data as current without timestamp |

### Rule 2.2 — Choose display before decoration

Follow the **FT Visual Vocabulary** question: *What is the relationship in the data?*

| Relationship | Preferred encodings |
|--------------|---------------------|
| **Change over time** | Line chart, slope chart, timeline strip, calendar heatmap |
| **Magnitude / comparison** | Bar chart (horizontal if long labels), lollipop, bullet chart |
| **Part-to-whole** | Stacked bar, waffle chart — use pie/donut only for ≤3 slices or overwhelming share |
| **Distribution** | Histogram, box plot, strip plot |
| **Correlation** | Scatter plot, hex-bin heatmap |
| **Lookup of exact values** | **Table**, not a chart (Few) |

### Rule 2.3 — Graph vs table (Stephen Few)

**Use a table when:**
- Audience needs to look up individual values
- Precise values matter more than shape
- Multiple units of measure appear together
- Comparing a small set of scannable numbers

**Use a graph when:**
- Patterns, trends, or relationships matter
- Comparing many values at once
- Communicating a message or story
- Shape of data is the insight

### Rule 2.4 — Tell one story per view

Knaflic's six-lesson arc applies to every dashboard card:

1. Understand context  
2. Choose appropriate visual  
3. Eliminate clutter  
4. Focus attention  
5. Think like a designer  
6. Tell a story (title + takeaway, not just data dump)

---

## 3. Visual Encoding Rules — What Works on Screen

Based on Cleveland & McGill (1985), Few, and NN/G preattentive-processing research.

### Rule 3.1 — Prefer accurate quantitative encodings

**Ranked by human accuracy** for comparing values:

1. **Position on a common scale** (bar length, dot on axis) — best  
2. **Position on identical but non-aligned scales** — good  
3. **Length, angle, slope** — good to moderate  
4. **Area, volume, curvature, shading** — poor  
5. **Colour saturation alone** — do not use for magnitude  

**Default chart types:** horizontal/vertical **bar**, **line**, **scatter**, **bullet**.

### Rule 3.2 — Avoid or restrict weak encodings

| Chart type | Tier A | Tier B |
|------------|--------|--------|
| **Pie / donut** | **Banned** | Avoid; stacked bar preferred |
| **3D charts** | **Banned** | **Banned** |
| **Radial / circular gauges** | **Banned** | Avoid |
| **Radar / spider** | **Banned** | Avoid |
| **Multi-line (same axis)** | **Banned** for horizon comparison | PMC drill-down only (≤3 related series) |
| **Treemap** | **Banned** | Exploratory only |
| **Dual y-axis (unrelated scales)** | **Banned** | Avoid (Few, Cairo) |

### Rule 3.3 — Use preattentive attributes deliberately

Attributes people notice **before** conscious attention (Knaflic, NN/G):

| Attribute | Use for |
|-----------|---------|
| **Size** | Importance hierarchy (large = primary KPI) |
| **Colour (hue)** | Category, alert state — not magnitude |
| **Colour (saturation/intensity)** | Secondary emphasis only |
| **Position** | Primary data values, outliers |
| **Shape** | Category when colour alone is insufficient |

Combine **shape + colour** for alerts (e.g. triangle + red) — never colour alone for critical status.

---

## 4. Clarity Rules — Tufte & Knaflic

### Rule 4.1 — Maximise data-ink ratio (Tufte)

**Data-ink** = ink/pixels that encode data. **Non-data-ink** = everything else.

| Remove (non-data-ink) | Keep (data-ink) |
|-----------------------|-----------------|
| Chart borders | Data marks (bars, lines, points) |
| Heavy gridlines | Light reference lines if needed |
| Decorative backgrounds, 3D, shadows | Direct labels on key values |
| Redundant legends when direct labels work | One clear title stating the takeaway |
| Duplicate encoding (colour + pattern + label for same fact) | Axis ticks only when labels don't suffice |

**Principle:** Above all else, show the data. Revise and edit ruthlessly.

### Rule 4.2 — Eliminate clutter (Knaflic)

Every element consumes **cognitive load**. Default to removal:

- Gratuitous gridlines  
- Chart borders  
- Trailing decimal zeros  
- Label every data point when shape matters more than exact value  
- Legends when direct labelling is possible  

**Test:** Cover the element — if the message unchanged, delete it.

### Rule 4.3 — Graphical integrity / lie factor (Tufte)

```
Lie Factor = (Size of effect shown in graphic) / (Size of effect in data)
```

| Rule | Detail |
|------|--------|
| Target lie factor | 0.95 – 1.05 |
| Y-axis | Start at zero for bar charts; truncating axis exaggerates differences |
| Area/volume | Never use area to show one-dimensional change |
| Animation | Must not distort scale or imply false trends |

### Rule 4.4 — No chartjunk (Tufte)

**Chartjunk** = decoration that does not inform: moiré patterns, duck-shaped charts, gratuitous gradients, brand watermarks over data, spinning 3D pie charts.

**Exception for this project:** Gradual **phase colour gradients** (see `visualisation spec.md` §8) are functional — they encode transition, not decoration.

---

## 5. Attention & Hierarchy Rules

### Rule 5.1 — Inverted pyramid layout (NN/G, Tableau eye-tracking)

```
┌─────────────────────────────────────┐
│  TOP: 3–5 primary KPIs (large num)  │  ← F-pattern first sweep
├─────────────────────────────────────┤
│  MIDDLE: Trends & time-series       │  ← Second horizontal sweep
├─────────────────────────────────────┤
│  BOTTOM: Detail tables & drill-down  │  ← Vertical scan, deep dive
└─────────────────────────────────────┘
```

### Rule 5.2 — One focal point per card

- **One** colour accent per chart for the key message (Knaflic)  
- Mute context data (grey); highlight the insight (brand or semantic colour)  
- Title = **takeaway**, not chart type ("TSB rising into race window" not "TSB line chart")

### Rule 5.3 — Operational vs analytical dashboards (NN/G)

| Type | Goal | Design |
|------|------|--------|
| **Operational** | Immediate action (today's readiness) | Minimal interaction; large type; traffic-light semantics |
| **Analytical** | Pattern recognition (28d trends) | Filters, drill-down, comparison windows |

The performance dashboard combines both — **Today** tab = operational; **Load / Periodisation** = analytical.

### Rule 5.4 — Progressive disclosure

Show essentials first; reveal detail on tap/expand (NN/G, SaaS dashboard best practice):

- Dashboard card → sparkline + one number  
- Tap → full chart + annotations  
- Tap data point → session or day detail  

---

## 6. Colour Rules

### Rule 6.1 — Colour encodes meaning, not decoration

| Semantic use | Example (this project) |
|--------------|------------------------|
| Intensity / zone | Z1 blue → Z5 red on **linear stacked bars** only (`visualisation spec.md`) |
| Phase | Base blue → Taper green with **gradual blends** at boundaries |
| Target compliance (Tier A) | **Grayscale bullet bands** primary; semantic colour as secondary label only |
| Status | Pair colour + shape (triangle ▲) — never red/green alone |
| Neutral | Grey for context series, secondary metrics |

### Rule 6.2 — Never rely on colour alone (WCAG, NN/G)

- Pair colour with **shape**, **label**, **pattern**, or **position**  
- ~8% of men have some form of colour-vision deficiency  
- Test with colourblind simulation (protanopia, deuteranopia)

### Rule 6.3 — Palette discipline

- **Sequential data:** single-hue gradient or ColorBrewer sequential  
- **Categorical data:** max 6–8 distinguishable hues; ColorBrewer qualitative  
- **Diverging data** (above/below baseline): two hues with neutral midpoint  
- Limit **saturated colours** to 1–2 per view (Knaflic)

### Rule 6.4 — Contrast & accessibility

- Text on background: WCAG AA minimum **4.5:1** (body), **3:1** for large text and graphical objects  
- Do not use red/green as the **only** good/bad distinction  
- Dark mode: reduce saturation; test all semantic colours on both themes

---

## 7. Typography & Labelling Rules

### Rule 7.1 — Direct labelling beats legends

Label lines/bars at the data when possible. Legends force eye travel and memory load (Knaflic, NN/G).

### Rule 7.2 — Typographic hierarchy

| Level | Use | Size (mobile baseline) |
|-------|-----|------------------------|
| **KPI value** | Primary metric | 28–36px, semibold |
| **Card title / takeaway** | What this means | 14–16px, medium |
| **Axis / unit** | Context | 11–12px, regular, muted |
| **Annotation** | Callout insight | 12–13px |

Use **tabular figures** for numbers so digits align in columns.

### Rule 7.3 — Always show units and time context

- `250 W` not `250`  
- `ms HRV` not `42`  
- `Data as of 2026-07-04 06:00 UTC+1` on every dashboard  
- Comparison period: "vs 7d baseline" / "vs prior 28d"

### Rule 7.4 — Horizontal labels on mobile

Prefer **horizontal bar charts** when category labels are long (sport names, phase names, zone labels) — avoids rotated or truncated text (NN/G).

---

## 8. Dashboard Interaction Rules

### Rule 8.1 — Filters change context, not truth

- Filters must be visible and reversible  
- Never hide unfavourable data behind default filters  
- Show empty/filtered state explicitly ("No swims in this period")

### Rule 8.2 — Data states are designed, not afterthoughts

Every chart needs four states (Material Design, SaaS dashboard practice):

| State | Requirement |
|-------|-------------|
| **Loading** | Skeleton or shimmer — preserve layout |
| **Empty** | Explain why + what action to take |
| **Error** | Plain language + retry |
| **Partial** | Show available series; mark missing with "—" not zero |

### Rule 8.3 — Touch targets (iPhone)

- Minimum **44×44 pt** tap targets  
- Tap bar segment → tooltip with minutes + %  
- Pinch/zoom only in analytical drill-down — not on dashboard overview

---

## 9. Chart Selection Quick Reference

Based on FT Visual Vocabulary + Few + NN/G. Maps to `visualisation spec.md` metrics.

| Question | Tier A (first choice) | Tier B / drill-down |
|----------|----------------------|---------------------|
| Trend over time? | Small-multiple sparklines (5 horizons) | Full line chart |
| Compare categories? | Horizontal stacked bar | Grouped bar |
| Part-to-whole? | **Stacked horizontal bar** | Waffle (avoid pie) |
| Single KPI vs target? | **Bullet graph** (grayscale bands) | — |
| Distribution? | — | Histogram, box plot |
| Two variables related? | — | Scatter |
| Many KPIs at once? | **Metric row list** (word-size) | Small multiples grid |
| Exact lookup? | Inline value in metric row | Table |
| Phase over season? | Phase label + bullet target shift | Gradient block timeline |
| Days until event? | **Large numeral + linear milestone bar** | Event timeline |

---

## 10. Anti-Patterns — Do Not Ship

| Anti-pattern | Why | Source |
|--------------|-----|--------|
| Donut / circular gauge on Tier A | Angle encoding; wastes space | Gemini brief, Few, NN/G |
| 3D pie chart | Distorts area; unreadable | Tufte, NN/G, Knaflic |
| Spaghetti graph (5 horizons, 1 axis) | Unreadable | Gemini brief, Knaflic |
| Radar chart for readiness | Distorts profile | Gemini brief, Few |
| Rainbow palette | No semantic meaning; colourblind fail | Few, ColorBrewer |
| Dual y-axis with unrelated scales | Implies false correlation | Few, Cairo |
| Red/green-only target bands | Colour-blind fail | Gemini brief, WCAG |
| Plotting null as zero | Breaks scale and averages | Gemini brief, Section 11 |
| Static bullet targets across phases | Wrong optimal range in taper/base | Gemini brief |
| Chart without title/takeaway | User must guess the point | Knaflic |
| Truncated bar chart y-axis | Lie factor > 1 | Tufte |
| Hard phase colour jumps | Implies discontinuous training | Project rule |
| Sleep score as readiness gate | Double-counts HRV/RHR | Section 11 v11.21 |
| Mixing sport thresholds on one chart | Cross-sport error | Section 11 |

---

## 11. Review Checklist — Before Release

Adapted from DesiLe SaaS dashboard checklist, Tufte, and NN/G.

### Message
- [ ] Can the athlete state the takeaway in one sentence after 3 seconds?
- [ ] Title states insight, not chart type?
- [ ] Data timestamp and units visible?

### Encoding
- [ ] Quantitative comparisons use length or 2D position?
- [ ] Pie/donut used only where justified?
- [ ] Lie factor acceptable (honest axes)?

### Clutter
- [ ] Borders, heavy grids, redundant legends removed?
- [ ] Direct labels used where possible?
- [ ] One accent colour for the main point?

### Accessibility
- [ ] Colour + shape/label for status?
- [ ] Contrast passes WCAG AA?
- [ ] Works on iPhone portrait without horizontal scroll?

### Data integrity
- [ ] Null/missing shown as "No data" — not zero?
- [ ] No interpolation of missing wellness or training data?
- [ ] Per-sport thresholds isolated?

### States
- [ ] Loading, empty, error, and partial states designed?

---

## 12. How This Document Relates to the Project

| Document | Role |
|----------|------|
| **`design rules.md`** (this file) | Universal rules from design experts — how to present any metric well |
| **`visualisation spec.md`** | Project-specific — which metrics, shapes, colours, and layouts for the performance dashboard |
| **`SECTION_11.md`** | Data integrity — what the numbers mean; no estimation; coaching logic |

When documents conflict:
1. **Section 11 data integrity** wins (never lie with data)  
2. **§0 Core Paradigm (Tier A rules)** wins on primary dashboard layout  
3. **`visualisation spec.md`** wins on project-specific metric and colour semantics  
4. **`design rules.md` §1–13** wins on general Tier B UX and encoding quality  

---

## 13. Recommended Reading Order for Implementers

1. NN/G — [Dashboards: Preattentive Processing](https://www.nngroup.com/articles/dashboards-preattentive/) (15 min)  
2. FT — [Visual Vocabulary](https://www.ft.com/vocabulary) (browse by data relationship)  
3. Knaflic — [Storytelling with Data blog: strip away non-essential](https://www.storytellingwithdata.com/blog/2019/9/19/strip-away-nonessential) (10 min)  
4. Few — *Show Me the Numbers* (chart vs table, bar chart defaults)  
5. Tufte — *The Visual Display of Quantitative Information* (data-ink, integrity)  
6. Cairo — *How Charts Lie* (when visuals mislead)  

---

## References

- Cairo, A. *The Functional Art* / *How Charts Lie*
- Cleveland, W. S. & McGill, R. (1985). Graphical perception and graphical methods for analyzing scientific data. *Science*.
- Dykes, B. *Effective Data Storytelling*
- Few, S. *Show Me the Numbers*; *Information Dashboard Design*; *Now You See It*
- Financial Times Visual Journalism Team. *Visual Vocabulary*. [github.com/Financial-Times/chart-doctor](https://github.com/Financial-Times/chart-doctor)
- Guttag, J. & Wiens, J. *Introduction to Computational Thinking and Data Science* — rolling statistics, variance baselines
- Knaflic, C. *Storytelling with Data*
- Laubheimer, P. Nielsen Norman Group. Dashboard and chart articles (2019–2024).
- Schwabish, J. & Ribecca, S. *Graphic Continuum*
- Tufte, E. *The Visual Display of Quantitative Information*; *Seeing with Fresh Eyes*
- WCAG 2.1 — Contrast and use of colour guidelines
