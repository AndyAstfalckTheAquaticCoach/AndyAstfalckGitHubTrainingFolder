# Visualisation Specification

**Protocol alignment:** Section 11 AI Coach Protocol (Intervals.icu data mirror)  
**Last updated:** 2026-07-04  
**Target platform:** Mobile-first (iPhone); adaptable to desktop

---

## Design Principles (All Charts)

- **Not limited to circles** — use bars, stacked segments, timelines, gauges, triangles (markers/alerts), bands, and sparklines as appropriate.
- **Mobile-first (iPhone):** tap for detail; legend always visible; prefer horizontal layouts.
- **Trendlines** wherever time-series data exists (7d / 28d / 90d windows from `history.json`).
- **Null-safe:** if a metric is missing, show "No data" — never interpolate (per Section 11).
- **Per-sport isolation:** cycling thresholds ≠ running ≠ swim — never mix sport families on one threshold chart.

---

## 1. Power Zones — Running & Cycling

**Metrics:** Time in Zones 1–5 (power basis preferred; HR fallback per `zone_basis`).

### Charts

| Chart | Use |
|-------|-----|
| **Stacked horizontal bar** | Single workout — % time per zone |
| **Donut / ring** | Compact session summary on phone |
| **Timeline strip** | Full session width; color blocks show zone changes over time |
| **Weekly stacked bar** | 7-day zone distribution rollup |

### Zone Colours (Fixed)

| Zone | Colour | Hex |
|------|--------|-----|
| Z1 | Blue (coolest) | `#2563EB` |
| Z2 | Cyan / teal | `#06B6D4` |
| Z3 | Green | `#22C55E` |
| Z4 | Orange | `#F97316` |
| Z5 | Red (hottest) | `#EF4444` |

**Rule:** Zone 5 = red; each step down gets progressively cooler; Zone 1 = blue.

### Example — Stacked Bar

Sample data: Z1 45%, Z2 30%, Z3 15%, Z4 8%, Z5 2%

```
[████████████ Z1 45% ████ Z2 30% ██ Z3 15% █ Z4 8% ▌Z5 2%]
 blue          cyan      green    orange red
```

### Data Source

- Session: `recent_activities[].power_zones` / HR zones
- Weekly: `zone_distribution_7d`

### Sport Notes

- **Running:** may use **rFTPw** (run threshold power) — same 5-zone visual, different underlying watts.
- **Cycling:** split **indoor vs outdoor** when `ftp_indoor` differs (optional toggle or side-by-side bars).

### Mobile Interaction

- Tap a zone segment → show **minutes + %** for that zone
- Always show a **legend**: Z1–Z5 with colours
- If a zone is **0%**, show it in the legend (greyed out or omitted from the bar — pick one and stay consistent)

---

## 2. Aerobic & Anaerobic Thresholds — Cycling, Running, Swimming

**Metrics per sport** (from `thresholds.sports[family]`):

| Sport | Aerobic (LT1 / AeT) | Anaerobic (LT2 / AnT) |
|-------|---------------------|------------------------|
| **Cycling** | LT1 HR + estimated LT1 watts; FTP as LT2 proxy | `ftp` / `ftp_indoor`, `lthr` |
| **Running** | LT1 HR + easy pace band | `threshold_pace`, `lthr`, `ftp` (rFTPw) |
| **Swimming** | Aerobic pace band below CSS | CSS as anaerobic/threshold proxy, `lthr` if set |

### Charts

| Chart | Use |
|-------|-----|
| **Dual-threshold ladder** | Vertical or horizontal band: easy \| grey \| hard, with LT1 and LT2 marked as lines |
| **Gauge / arc** | Current session avg power/pace/HR shown against both thresholds |
| **Threshold timeline** | LT1/LT2 values over months (from `history.json` FTP timeline + dossier updates) |
| **Triangle markers** | Flag when session avg crosses LT2 or drift suggests LT1 shift |

### Shape Example — Threshold Ladder (Cycling Power)

```
Z1–Z2 Easy     │████████████░░░░░░│  < LT1
Grey zone      │        ░░░░░░░░░░│  LT1 – LT2
Z4+ Hard       │              ▓▓▓│  > LT2 (FTP)
               LT1↑          LT2/FTP↑
```

### DFA a1 Overlay (Cycling Only)

Optional 4-band split as a second row under the 5-zone bar:

- `below_lt1`
- `lt1_transition`
- `transition_lt2`
- `above_lt2`

---

## 3. Swimming — CSS, Stroke Rate, Tempo, Distance

### Metrics

| Metric | Unit | Meaning |
|--------|------|---------|
| **Critical Swim Speed (CSS)** | pace / 100m | Threshold pace — compare all swim sets against this |
| **Stroke rate (SR)** | strokes/min (SPM) | Cadence |
| **Stroke tempo** | sec/stroke | Inverse of rate; useful for drill comparison |
| **Stroke distance (DPC)** | m/stroke | Distance per cycle — efficiency proxy |

### Charts

| Chart | Use |
|-------|-----|
| **Pace vs CSS bar** | Session avg pace with CSS as vertical reference line; green if faster, red if slower |
| **Multi-line trend (28d)** | CSS, avg pace, SR on shared time axis (dual Y if needed) |
| **Scatter: SR vs pace** | Efficiency — lower SR at same pace = improvement |
| **Scatter: DPC vs pace** | Stroke length efficiency over time |
| **Session strip** | Timeline of SR/tempo per length or interval |
| **Stacked interval bars** | Per rep: pace, SR, DPC side by side |

### Shape Example — CSS Reference Chart

```
Pace (sec/100m)  ← faster                    slower →
                 |---- CSS ----|
    Session avg  ●─────────────|  (+3s slower than CSS)
    Best rep     ●──|           (−1s faster)
```

### Data Source

- CSS: `thresholds.sports.swim.threshold_pace`
- Session metrics: activity streams / interval summaries for SR, tempo, DPC

---

## 4. Training Stress, Fatigue & Freshness (PMC)

**Metrics (Banister model):**

| Label | JSON field | Meaning |
|-------|------------|---------|
| **Fitness** | `CTL` | Chronic training load |
| **Fatigue** | `ATL` | Acute training load |
| **Freshness / Form** | `TSB` (= CTL − ATL) | Readiness to perform |
| **Stress** | `TSS` | Daily/weekly training stress |

### Charts

| Chart | Use |
|-------|-----|
| **Performance Management Chart (PMC)** | 42–90d line chart: CTL (blue), ATL (pink/red), TSB (green/yellow bars or line) — **primary load chart** |
| **TSB gauge** | Current freshness with target bands (+10 to +25 pre-race, negative = fatigued) |
| **Weekly TSS bars** | Bar chart with 7d/28d average trendline |
| **Load ratio sparkline** | ACWR or Load-Recovery ratio with amber/red thresholds |

### TSB Colour Bands

| TSB range | Colour | Label |
|-----------|--------|--------|
| > +25 | Deep green | Very fresh |
| +10 to +25 | Green | Race-ready |
| −10 to +10 | Yellow | Neutral |
| −10 to −30 | Orange | Fatigued |
| < −30 | Red | Very fatigued |

### Data Source

- Current: `current_status` (CTL / ATL / TSB)
- History: `history.json` 90-day daily tier

---

## 5. Wellness — Body Composition & Trends

**Metrics** (Intervals.icu wellness passthrough, Section 11 v11.16+):

| Metric | Unit | Chart type |
|--------|------|------------|
| **BMI** | kg/m² | Line + 7d/28d trend; reference bands (underweight / normal / overweight) as shaded zones |
| **Body fat %** | % | Line trend + current value badge |
| **Muscle mass** | kg | Line trend; area fill under curve |
| **Water retention** | kg or % | Line trend; flag spikes > X% from 28d mean (triangle alert marker) |

### Charts

| Chart | Use |
|-------|-----|
| **Multi-metric dashboard card** | 4 mini sparklines (BMI, fat%, muscle kg, water) on one screen |
| **Combined body comp chart** | Dual axis: fat% (line) + muscle kg (line) over 90d — shows recomposition |
| **Trendline overlay** | 7d moving avg (dashed) + 28d moving avg (solid) on each metric |
| **Delta badges** | "−0.8 kg fat vs 28d ago", "+0.3 kg muscle" |

### Coaching Note

Wellness body-composition fields are **coaching context only** — not wired into readiness P0–P3 (per Section 11). Show trends; do not auto-trigger training changes from BMI alone.

### Data Source

- Daily wellness entries
- `history.json` 90-day tier (`weight` + extended wellness fields)

---

## 6. Suggested App Structure (iPhone)

```
┌─────────────────────────────────────┐
│  Today                               │
│  ├─ Freshness gauge (TSB)           │
│  ├─ Last workout zone bar (Z1–Z5)   │
│  └─ Wellness sparklines (4 metrics) │
├─────────────────────────────────────┤
│  Training Load                       │
│  └─ PMC chart (CTL/ATL/TSB)         │
├─────────────────────────────────────┤
│  Thresholds (per sport tabs)         │
│  ├─ Cycling: FTP, LTHR, LT1         │
│  ├─ Running: pace, rFTPw, LTHR       │
│  └─ Swim: CSS, SR, DPC trends       │
├─────────────────────────────────────┤
│  Session Detail                      │
│  ├─ Zone timeline strip             │
│  ├─ Threshold ladder                │
│  └─ Interval breakdown (swim/run)   │
└─────────────────────────────────────┘
```

---

## 7. Shape Library

Visual components are not limited to circles and pie charts. The performance dashboard should draw from a broad shape vocabulary — choosing the form that best matches the data structure (proportion, trend, comparison, distribution, or sequence).

### 7.1 Core Shapes (Already in Use)

| Shape | Typical use |
|-------|-------------|
| **Horizontal stacked bar** | Zone distribution, weekly load |
| **Donut / ring** | Compact proportional summaries |
| **Timeline strip** | Session-level zone or pace over time |
| **Line + trendline** | CTL/ATL/TSB, wellness metrics, CSS trends |
| **Gauge / arc** | Current TSB, session intensity vs threshold |
| **Dual-threshold ladder** | Aerobic / anaerobic band placement |
| **Scatter plot** | Swim SR vs pace, DPC vs pace |
| **Triangle marker** | Threshold breach, water retention spike, alert |
| **Sparkline** | Mini trends on dashboard cards |
| **Shaded reference bands** | BMI categories, TSB target ranges |

### 7.2 Proportional & Part-to-Whole Shapes

| Shape | Description | Dashboard use |
|-------|-------------|---------------|
| **Waffle chart** | 10×10 grid of coloured cells (= 100%) | Zone % at a glance; polarisation ratio (easy vs hard cells) |
| **Radial bar / sunburst** | Segments radiating from centre | Multi-sport time split; nested zone breakdown per sport |
| **Treemap** | Nested rectangles sized by value | Weekly TSS or hours by sport family (cycling / run / swim) |
| **100% stacked column** | Vertical stacked bars summing to 100% | Compare zone profiles across multiple sessions side by side |
| **Semi-circle gauge** | Half-arc with coloured segments | Weekly polarisation index or easy-time ratio |

### 7.3 Comparison & Target Shapes

| Shape | Description | Dashboard use |
|-------|-------------|---------------|
| **Bullet chart** | Thin bar with target marker and background bands | Planned vs actual TSS; session compliance; ACWR vs target range |
| **Diverging bar** | Bar extending left/right from a centre zero | Delta from 28d baseline (HRV, RHR, weight, FTP change) |
| **Slope chart** | Two-point line per entity (before → after) | Pre/post block comparison; threshold test results |
| **Grouped bar** | Side-by-side bars per category | Indoor vs outdoor FTP; power vs HR zone basis; 7d vs 28d TID |
| **Floating / range bar** | Bar showing min–max span | Interval power range per rep; HR range within a zone block |
| **Lollipop chart** | Dot on a stem | Highlight single values (today's TSB, latest CSS) against a scale |

### 7.4 Time & Sequence Shapes

| Shape | Description | Dashboard use |
|-------|-------------|---------------|
| **Calendar heatmap** | Grid of days coloured by intensity | Training consistency; daily TSS or hours (GitHub-style) |
| **Waterfall chart** | Cumulative steps up/down | How daily TSS builds to weekly total; fatigue accumulation |
| **Step chart** | Horizontal steps at threshold change points | FTP / CSS / LTHR timeline when values jump |
| **Gantt / swimlane** | Horizontal bars on a time axis | Week plan: planned vs completed sessions by day |
| **Ridge / joy plot** | Stacked density curves | Distribution of session durations or intensities across weeks |
| **Event timeline** | Vertical line with diamond/triangle nodes | Threshold tests, races, deloads, illness markers |

### 7.5 Distribution & Density Shapes

| Shape | Description | Dashboard use |
|-------|-------------|---------------|
| **Histogram** | Bar bins along a continuous axis | Power or pace distribution within a session |
| **Box plot** | Median, quartiles, whiskers | Interval power consistency across reps |
| **Hex bin / heatmap scatter** | Density-coloured hexagons | Where most training time falls (power × HR) |
| **Violin plot** | Mirrored density curves | Compare power output spread between two sessions (desktop) |
| **Strip plot** | Individual dots along an axis | Every interval rep's power on one scale |

### 7.6 Multi-Metric & Profile Shapes

| Shape | Description | Dashboard use |
|-------|-------------|---------------|
| **Radar / spider chart** | Axes radiating from centre | Readiness snapshot: HRV, RHR, sleep, TSB, feel, soreness |
| **Power-duration curve** | Line through anchor durations (5s–60min) | MMP profile; compare 28d windows (capability metric) |
| **HR-duration curve** | Same form for sustained HR anchors | HR curve delta across two 28d windows |
| **Area-under-curve fill** | Line chart with gradient fill below | Fitness (CTL) growth; muscle mass trend |
| **Parallel coordinates** | Multiple vertical axes linked by lines | Compare last 5 key sessions across 6+ metrics |
| **Profile overlay** | Two lines on same axes | Route elevation + power; decoupling drift (first vs last third) |

### 7.7 Flow & Relationship Shapes

| Shape | Description | Dashboard use |
|-------|-------------|---------------|
| **Sankey / flow diagram** | Width-proportional flows between nodes | Total hours → sport → zone → session type |
| **Chord diagram** | Circular flows between categories | Cross-sport load transfer (which sports contribute most TSS) |
| **Network / node graph** | Connected nodes sized by weight | Workout library usage; which session types dominate the block |
| **Correlation matrix** | Grid of coloured cells | HRV vs TSB vs sleep vs performance (coach deep-dive) |

### 7.8 Marker & Indicator Shapes

Use distinct shapes so alerts and landmarks are scannable without reading labels:

| Shape | Meaning |
|-------|---------|
| **Triangle ▲** | Alert, threshold breach, spike (water retention, ACWR alarm) |
| **Diamond ◆** | Personal record, new threshold, race result |
| **Circle ●** | Normal data point, session marker |
| **Square ■** | Planned session (vs completed circle) |
| **Chevron ▶** | Trend direction on a card (improving / declining) |
| **Star ★** | A-race or key benchmark session |
| **Hexagon ⬡** | Phase badge (Base, Build, Peak, Taper, Recovery) |
| **Cross ✕** | Skipped session, failed rep, insufficient data |

### 7.9 Mobile-Optimised Shape Rules

| Rule | Rationale |
|------|-----------|
| Prefer **horizontal** bars and strips on iPhone | More readable in portrait; thumb-friendly tap targets |
| Limit radar charts to **≤6 axes** | Legibility on small screens |
| Use **sparklines + one number** on dashboard cards | Glanceable; detail on tap |
| Reserve **Sankey, chord, parallel coords, violin** for desktop or drill-down | Too dense for primary mobile view |
| **Calendar heatmap** works well on mobile | One cell per day; tap for session list |
| **Bullet charts** replace full gauges when space is tight | Same information in less height |
| Animate **timeline strips** on session open only | Avoid motion on dashboard scroll |

### 7.10 Shape-to-Metric Mapping (Extended)

Recommended shapes for metrics not covered in sections 1–5:

| Metric | Recommended shape(s) |
|--------|---------------------|
| **Seiler TID classification** | Waffle or 100% stacked bar (Z1 / Z2 / Z3 easy-grey-hard) |
| **Polarisation index (Treff PI)** | Semi-circle gauge with PI scale |
| **Easy time ratio** | Bullet chart vs 0.75–0.9 target band |
| **Grey zone %** | Single diverging bar from 5% target |
| **Hard days per week** | Row of 7 squares (filled = hard day) |
| **Decoupling / durability** | Slope chart (first third → last third) or profile overlay |
| **Variability index (VI)** | Lollipop vs 1.05 threshold |
| **Efficiency factor (EF)** | Line + 7d/28d trendline |
| **HRRc (heart rate recovery)** | Sparkline with triangle on declining trend |
| **Power curve delta** | Dual power-duration curves (current vs prior 28d) |
| **Sustainability profile anchors** | Grouped bar (actual vs Coggan vs CP model) |
| **Phase detection** | Hexagon badge + step timeline of phase changes |
| **Race calendar proximity** | Event timeline with star markers |
| **Plan adherence** | Bullet chart (completed vs planned TSS) |
| **DFA a1 band split** | Secondary stacked bar below power zones (4 bands) |
| **Environmental heat stress** | Shaded band on session timeline (temperature tier) |
| **Nutrition / carbs used** | Waterfall (session kJ → carbs g → deficit vs target) |
| **Multi-sport weekly volume** | Treemap or radial bar |

### 7.11 Shape Selection Guide

Choose shape by the question the athlete is asking:

| Question type | Best shapes |
|---------------|-------------|
| "How much time in each zone?" | Stacked bar, donut, waffle, timeline strip |
| "Am I on target?" | Bullet chart, gauge, diverging bar |
| "Is it getting better or worse?" | Line + trendline, slope chart, sparkline, chevron |
| "How does this session compare?" | Grouped bar, slope chart, dual curve overlay |
| "What did the week look like?" | Calendar heatmap, Gantt, waterfall, treemap |
| "Where are my limits?" | Power-duration curve, threshold ladder, gauge |
| "What's the overall picture?" | Radar chart, Sankey, dashboard card grid |
| "What needs attention?" | Triangle markers, bullet chart with red band, alert badges |

---

## 8. Priority Build Order

If building incrementally:

1. **Zone stacked bar** (Z1 blue → Z5 red) — highest value per session
2. **PMC chart** (CTL / ATL / TSB) — load management
3. **Wellness trendlines** (BMI, fat%, muscle, water)
4. **Threshold ladder** per sport
5. **Swim-specific** (CSS reference + SR/DPC scatter)
6. **Shape variety** — calendar heatmap, bullet charts, marker shapes (see §7)

---

## 9. Data Integrity Rules

- All numeric references must use verified data from the JSON mirror — no estimation or interpolation (Section 11).
- Thresholds MUST be applied **per sport family**; cross-sport threshold application is forbidden.
- When `zone_basis` is not `"power"`, note the basis in the UI so the athlete knows which zones drove the chart.
- Per-activity zone distributions may show both power and HR zones regardless of aggregation preference.

---

## 10. Related Protocol References

- Zone distribution & polarisation: Section 11 — Zone Distribution & Polarisation Metrics
- Per-sport thresholds: `current_status.thresholds.sports[family]`
- Load metrics: CTL / ATL / TSB (Banister impulse–response)
- Wellness passthrough: Section 11 v11.16 — Extended Wellness Fields
- Post-workout zone reporting: Power zones (% breakdown), HR zones (% breakdown)
