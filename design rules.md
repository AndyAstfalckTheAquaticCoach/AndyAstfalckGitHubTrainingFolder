# Design Rules — Data Visualisation & Dashboard UX

**Purpose:** Actionable design rules for the performance dashboard, synthesised from recognised experts in information design, data visualisation, and dashboard UX.  
**Companion doc:** `visualisation spec.md` (what to show); this document (how to show it well).  
**Last updated:** 2026-07-04

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

| Chart type | Rule |
|------------|------|
| **Pie / donut** | Avoid for precise comparison; OK for 2–3 categories or one dominant share (NN/G, Knaflic) |
| **3D charts** | Do not use — distorts length and area (Tufte, NN/G) |
| **Radial gauges** | Large space, low accuracy — prefer linear bullet or bar (NN/G) |
| **Treemap** | Poor for at-a-glance magnitude; OK for exploratory drill-down only |
| **Radar / spider** | Max 5–6 axes; never sole encoding for critical KPIs |

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
| Intensity / zone | Z1 blue → Z5 red (`visualisation spec.md`) |
| Phase | Base blue → Taper green with **gradual blends** at boundaries |
| Status | Green / amber / red for readiness thresholds |
| Neutral | Grey for context series, grid, secondary metrics |

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

| Question | First choice | Second choice |
|----------|--------------|---------------|
| Trend over time? | Line chart | Sparkline + bullet |
| Compare categories? | Horizontal bar | Lollipop |
| Part-to-whole? | Stacked bar | Waffle |
| Single KPI vs target? | Bullet chart | Gauge (linear, not radial) |
| Distribution? | Histogram | Box plot |
| Two variables related? | Scatter | Hex-bin heatmap |
| Many KPIs at once? | Small multiples (Tufte) | Dashboard card grid |
| Exact lookup? | Table | — |
| Phase over season? | Gradient block timeline | Stacked area |
| Days until event? | Countdown ring | Milestone bar |

---

## 10. Anti-Patterns — Do Not Ship

| Anti-pattern | Why | Source |
|--------------|-----|--------|
| 3D pie chart | Distorts area; unreadable | Tufte, NN/G, Knaflic |
| Rainbow palette | No semantic meaning; colourblind fail | Few, ColorBrewer |
| Dual y-axis with unrelated scales | Implies false correlation | Few, Cairo |
| Chart without title/takeaway | User must guess the point | Knaflic |
| Spaghetti graph (10+ unfiltered lines) | Unreadable | Knaflic (Case Study 4) |
| Truncated bar chart y-axis | Lie factor > 1 | Tufte |
| Animation for decoration | Distracts; accessibility cost | Material Design |
| Hard phase colour jumps | Implies discontinuous training | Project rule (`visualisation spec.md`) |
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

When the two conflict:
1. **Section 11 data integrity** wins (never lie with data)  
2. **`visualisation spec.md`** wins on project-specific colour semantics (zones, phases)  
3. **`design rules.md`** wins on general UX and encoding quality  

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
- Knaflic, C. *Storytelling with Data*
- Laubheimer, P. Nielsen Norman Group. Dashboard and chart articles (2019–2024).
- Schwabish, J. & Ribecca, S. *Graphic Continuum*
- Tufte, E. *The Visual Display of Quantitative Information*; *Seeing with Fresh Eyes*
- WCAG 2.1 — Contrast and use of colour guidelines
