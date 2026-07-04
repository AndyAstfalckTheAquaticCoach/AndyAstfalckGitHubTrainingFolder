# Visualisation Specification

**Protocol alignment:** Section 11 AI Coach Protocol (Intervals.icu data mirror)  
**Companion doc:** `design rules.md` — expert-derived rules for how to present data well on screen  
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

## 6. Recovery, Sleep & Autonomic Metrics

**Purpose:** Visualise overnight recovery and morning readiness signals. These metrics feed the readiness layer alongside TSB (Section 4) but are distinct from body composition (Section 5).

### Metrics

| Metric | Unit | Readiness role | Notes |
|--------|------|----------------|-------|
| **Sleep hours** | hours | **Active signal** — Green ≥ 7h, Amber 5–7h, Red < 5h | Primary sleep metric for readiness (Section 11 v11.21) |
| **HRV** | ms (RMSSD or SDNN) | **Active signal** — ↓ > 20% vs 7d baseline → flag | Compare to personal rolling baseline, not population norms |
| **RHR (resting heart rate)** | bpm | **Active signal** — ↑ ≥ 5 bpm vs 7d baseline → flag | Same baseline logic as HRV |
| **Sleep quality / sleep score** | device score | **Coaching context only** | Excluded from automated readiness (v11.21) — composites HRV + HR during sleep; show as trend, not traffic-light |
| **Bedtime / wake time** | local time | Context | Sleep regularity; jet-lag and shift-work patterns |
| **Sleep stages** | min (% deep / REM / light) | Context | When available from device sync — hypnogram-style display |
| **Respiration rate (sleep)** | breaths/min | Context | Vitals passthrough from wellness |
| **SpO2 (sleep)** | % | Context | Flag sustained dips with triangle marker |
| **Feel** | 1–5 scale | Context (manual) | 1 = Strong → 5 = Weak; not in automated readiness pipeline |

### Charts

| Chart | Use |
|-------|-----|
| **Sleep duration bar (7 nights)** | Vertical or horizontal bars per night; colour by threshold (green ≥ 7h, amber 5–7h, red < 5h) |
| **Hypnogram timeline strip** | Nightly sleep stages as coloured horizontal bands (deep / REM / light / awake) |
| **Dual-line trend (28d)** | HRV (line) + RHR (line) on shared date axis with 7d rolling baseline as dashed reference |
| **Baseline band chart** | Shaded band = 7d HRV or RHR baseline ± normal range; today's value as dot |
| **Diverging bar** | HRV or RHR % deviation from baseline (centre = 0) |
| **Bullet chart** | Last night sleep hours vs 7h target with amber/red background bands |
| **Calendar heatmap** | Sleep hours by night (same grid pattern as training load heatmap) |
| **Scatter: sleep → HRV** | Sleep hours (x) vs next-morning HRV (y) — shows personal sleep–recovery relationship |
| **Recovery radar** | 5–6 axes: HRV, RHR, sleep hours, TSB, feel, soreness — readiness snapshot |
| **Sparkline trio** | Dashboard card: 3 mini trends (HRV, RHR, sleep) with today's value badge |
| **Stacked nightly card** | Bedtime → wake timeline + total hours + stage breakdown in one card |

### Colour Guidance — Sleep Duration

| Hours | Colour | Label |
|-------|--------|-------|
| ≥ 7 | Green `#22C55E` | Adequate |
| 5 – 7 | Amber `#F59E0B` | Short |
| < 5 | Red `#EF4444` | Deficient |

### Colour Guidance — HRV / RHR vs Baseline

| Deviation | Colour | Marker |
|-----------|--------|--------|
| HRV within baseline (±10%) | Green | Circle ● |
| HRV ↓ 10–20% | Amber | Triangle ▲ |
| HRV ↓ > 20% | Red | Triangle ▲ |
| RHR within baseline (±3 bpm) | Green | Circle ● |
| RHR ↑ 3–5 bpm | Amber | Triangle ▲ |
| RHR ↑ ≥ 5 bpm | Red | Triangle ▲ |

### Coaching Notes

- Sleep quality/score may be displayed but must **not** drive automated go/modify/skip decisions — hours, HRV, and RHR are the primary signals.
- HRV and sleep are **logged for context on race day** — never race stopper inputs (Section 11 Race-Week Protocol).
- Show **7d and 28d trendlines** on all autonomic metrics; single-night values are noisy.
- When HRV and RHR conflict (HRV low, RHR normal), show both — do not collapse to one traffic light.

### Data Source

- Daily wellness entries in `latest.json`
- `history.json` 90-day daily tier (HRV, RHR, sleep hours, weight)
- `readiness_decision` for pre-computed go/modify/skip (optional overlay on recovery card)
- Extended wellness passthrough (v11.16): respiration, spO2, subjective scales

---

## 7. Event Countdown & Race Calendar

**Purpose:** Surface upcoming goal events, taper milestones, and race-week progression so the athlete always knows where they are in the competition calendar.

### Metrics

| Field | Source | Meaning |
|-------|--------|---------|
| **Race events** | `race_calendar` | All upcoming races within 90 days |
| **Priority** | `RACE_A` / `RACE_B` / `RACE_C` | A = goal event; B = secondary; C = training race (no taper) |
| **Days to event** | Computed | D-N countdown from athlete local date |
| **Taper alert** | `taper_alert.active` | True when RACE_A is 8–14 days out — volume reduction should begin |
| **Race week** | `race_week.active` | True when RACE_A or RACE_B is ≤ 7 days out — day-by-day protocol active |
| **Event type** | `moving_time` duration class | Short (< 90 min) / medium (90 min–3 h) / long (> 3 h) — drives TSB target |
| **TSB target range** | Phase + event type | Pre-race freshness target (e.g. +10 to +25 for long endurance A-race) |

### Charts

| Chart | Use |
|-------|-----|
| **Circular countdown ring** | Large centre number (days remaining) with arc fill approaching race day; star ★ for RACE_A |
| **Horizontal countdown bar** | Full 90-day window with milestones marked: taper onset (D-14), race week (D-7), race day (D-0) |
| **Event card stack** | Scrollable cards — nearest A-race pinned top; B/C races below with smaller countdown |
| **Multi-event timeline** | 90-day horizontal axis; diamonds ◆ for A-races, circles ● for B, small dots for C |
| **Race-week Gantt (D-7 → D-0)** | Seven-row swimlane with prescribed load %, zone targets, and purpose per day (from Race-Week Protocol) |
| **TSB approach chart** | PMC with shaded target band narrowing as race approaches |
| **Taper progress bullet** | Planned volume reduction (41–60% over 2 weeks) vs actual weekly TSS |
| **Go/no-go checklist card** | D-0 only: TSB, illness/injury status with green/flag/red rows |

### Priority Visual Treatment

| Priority | Shape | Size | Taper behaviour |
|----------|-------|------|-----------------|
| **RACE_A** | Star ★ + bold label | Largest countdown | Full taper + race-week protocol |
| **RACE_B** | Diamond ◆ | Medium | Lighter taper; lower TSB target |
| **RACE_C** | Circle ● | Small | No taper adjustment; informational only |

### Mobile Layout — Countdown Card (Suggested)

```
┌─────────────────────────────────┐
│  ★ Ironman Aalborg              │
│       ┌─────────┐               │
│       │   23    │  days          │
│       │  ◔◔◔◔◑  │  countdown ring│
│       └─────────┘               │
│  Taper starts in 9 days         │
│  TSB target: +10 to +25         │
│  ───●────────────── 90d bar     │
└─────────────────────────────────┘
```

### Data Source

- `race_calendar` block in `latest.json`
- `taper_alert`, `race_week` flags
- `phase_detection` (Peak / Taper phase alignment)
- Race-week day table: Section 11 Race-Week Protocol (D-7 to D-0)

---

## 8. Periodisation Block Charts

**Purpose:** Show where the athlete is in the training cycle — current phase, block history, and planned progression through Base → Build → Peak → Taper → Recovery (URF v5.1 Rolling Phase Model).

### Phase States

| Phase | Colour (suggested) | Meaning |
|-------|-------------------|---------|
| **Base** | Blue `#2563EB` | CTL stable; low hard-day density; aerobic foundation |
| **Build** | Orange `#F97316` | CTL rising; sustained hard days; intensity block |
| **Peak** | Purple `#A855F7` | Race approaching; fitness at cycle high; volume not yet reducing |
| **Taper** | Green `#22C55E` | Race within 14 days; volume reducing; maintain intensity |
| **Recovery** | Grey `#94A3B8` | Declining load; no structured pattern |
| **Deload** | Teal `#14B8A6` | Planned load reduction within Build; rebound confirmation |
| **Overreached** | Red `#EF4444` | Safety gate — ACWR / monotony alarm |

**Confidence:** Each phase carries `high` / `medium` / `low` confidence — show as border weight or opacity on the phase badge when low.

### Phase Colour Transitions

Phase boundaries in the data are discrete (a phase label changes on a date), but the **visual must not snap** from one colour to the next. Transitions must feel continuous — the athlete is progressing through a cycle, not jumping between unrelated states.

**Rules:**

| Rule | Detail |
|------|--------|
| **No hard edges** | Do not use solid adjacent blocks of different phase colours without a blend zone |
| **Gradient blend zone** | At every phase boundary, interpolate between the outgoing and incoming phase colour over a visible span |
| **Default blend width** | **5–7 days** at daily resolution, or **~10% of the shorter adjacent block** (whichever is smaller) — long blocks keep a fixed max blend (~7 days) so transitions don't stretch excessively |
| **Gradient type** | Linear gradient along the time axis (horizontal on timelines, radial on countdown ring segments where phases meet) |
| **Single-phase blocks** | If a block is shorter than the blend width, use a soft gradient across the entire block rather than a flat fill |
| **Overreached (red)** | May use a sharper transition than other phases (2–3 day blend) so alarm state remains visually distinct — but still not an instant cut |
| **Calendar overlay** | Each day inherits a colour from the gradient at that date — not the solid colour of the block it belongs to |

**Implementation (CSS / SVG example):**

```css
/* Base #2563EB → Build #F97316 over 7 days at boundary */
background: linear-gradient(
  to right,
  #2563EB 0%,
  #2563EB calc(100% - 7days),
  #F97316 100%
);
```

Use explicit gradient stops per boundary rather than a single fill colour per segment.

**Phase-pair blend reference:**

| From → To | Blend character |
|-----------|-----------------|
| Base → Build | Blue warming into orange |
| Build → Peak | Orange deepening into purple |
| Peak → Taper | Purple easing into green |
| Taper → Recovery | Green fading into grey |
| Build → Deload | Orange cooling into teal |
| Any → Overreached | Current colour → red over 2–3 days |

**Hexagon phase badge:** the badge fill may use a subtle gradient reflecting recent phase history (e.g. trailing 14 days weighted toward current phase colour) rather than a flat single colour.

### Block Structure (Issurin Model)

Visualise the macro cycle as linked blocks:

```
Accumulation (Base) → Transmutation (Build) → Realisation (Peak) → Taper → Recovery
```

### Charts

| Chart | Use |
|-------|-----|
| **Horizontal block timeline** | Full season as **gradient-blended** segments; width = duration; current position marked with a vertical line or dot |
| **Phase swimlane (Gantt)** | One row per mesocycle; bar fills use horizontal gradients at block edges — no solid colour rectangles abutting each other |
| **Hexagon phase badge** | Current phase dominant colour with subtle gradient from prior phase (trailing 14 days) |
| **Phase transition curve** | Smooth colour strip over time — phase label changes at centre of blend zone, not at colour edge |
| **Stacked area (volume by phase)** | Weekly hours or TSS with **gradient fill** between phase colours at transitions; area opacity may vary by phase |
| **Block report card (4–6 weeks)** | Mini PMC + phase label + key metrics for the current block |
| **Dual-stream indicator** | Two small icons: retrospective (history) vs prospective (plan) — show when streams agree/disagree |
| **Pyramid / funnel diagram** | Issurin block progression — sections connected by gradient bands, not hard dividing lines |
| **Phase comparison slope chart** | This block vs previous block: CTL gain, hours, hard days, grey zone % |
| **Calendar overlay** | Per-day background colour sampled from phase gradient — smooth shift across week boundaries |

### Block Chart — Annotated Example

Conceptual layout — **rendered output uses gradients at every boundary**, not the hard segment edges shown here for labelling only:

```
2026 Season ──────────────────────────────────────────────►

Jan      Feb      Mar      Apr      May      Jun      Jul
[Base~~~~~│~~~Build~~~~~~~~│~~Peak~~│~Taper~│Rec]
  4 wk  ↑blend  6 wk    ↑blend  2 wk ↑  2 wk
        5–7d              5–7d       5–7d
                              ★ A-race

Colour:  blue ──gradient──► orange ──gradient──► purple ──gradient──► green ──gradient──► grey
         (no instant colour jumps at │ markers)
```

Overlay on each block segment (optional, on tap):
- Weekly TSS (bar height within segment)
- CTL trend line
- Hard days / week
- Phase reason codes (e.g. `RACE_IMMINENT_VOLUME_REDUCING`)

### Integration with Event Countdown

When `race_week.active` or `taper_alert.active`:
- Highlight Taper / Peak segment on block timeline
- Show vertical marker at race day on the season chart
- Display planned vs actual volume reduction within the taper block

### Data Source

- `phase_detection` in `latest.json` (phase, confidence, reason_codes, basis streams)
- `history.json` monthly tier (`phase` field)
- `weekly_180d` rows for retrospective block reconstruction
- `validation_metadata.phase_detection` for audit trail

---

## 9. Suggested App Structure (iPhone)

```
┌─────────────────────────────────────┐
│  Today                               │
│  ├─ Event countdown ring (A-race)   │
│  ├─ Phase hexagon badge             │
│  ├─ Freshness gauge (TSB)           │
│  ├─ Recovery sparklines (HRV/RHR/   │
│  │   sleep)                         │
│  ├─ Last workout zone bar (Z1–Z5)   │
│  └─ Wellness sparklines (body comp) │
├─────────────────────────────────────┤
│  Training Load                       │
│  └─ PMC chart (CTL/ATL/TSB)         │
├─────────────────────────────────────┤
│  Periodisation                       │
│  └─ Block timeline (season phases)  │
├─────────────────────────────────────┤
│  Recovery & Sleep                    │
│  ├─ 7-night sleep bars              │
│  ├─ HRV/RHR baseline chart          │
│  └─ Hypnogram (when stages avail.)  │
├─────────────────────────────────────┤
│  Events                              │
│  ├─ Countdown cards (A/B/C)         │
│  └─ Race-week Gantt (when active)   │
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

## 10. Shape Library

Visual components are not limited to circles and pie charts. The performance dashboard should draw from a broad shape vocabulary — choosing the form that best matches the data structure (proportion, trend, comparison, distribution, or sequence).

### 10.1 Core Shapes (Already in Use)

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

### 10.2 Proportional & Part-to-Whole Shapes

| Shape | Description | Dashboard use |
|-------|-------------|---------------|
| **Waffle chart** | 10×10 grid of coloured cells (= 100%) | Zone % at a glance; polarisation ratio (easy vs hard cells) |
| **Radial bar / sunburst** | Segments radiating from centre | Multi-sport time split; nested zone breakdown per sport |
| **Treemap** | Nested rectangles sized by value | Weekly TSS or hours by sport family (cycling / run / swim) |
| **100% stacked column** | Vertical stacked bars summing to 100% | Compare zone profiles across multiple sessions side by side |
| **Semi-circle gauge** | Half-arc with coloured segments | Weekly polarisation index or easy-time ratio |

### 10.3 Comparison & Target Shapes

| Shape | Description | Dashboard use |
|-------|-------------|---------------|
| **Bullet chart** | Thin bar with target marker and background bands | Planned vs actual TSS; session compliance; ACWR vs target range |
| **Diverging bar** | Bar extending left/right from a centre zero | Delta from 28d baseline (HRV, RHR, weight, FTP change) |
| **Slope chart** | Two-point line per entity (before → after) | Pre/post block comparison; threshold test results |
| **Grouped bar** | Side-by-side bars per category | Indoor vs outdoor FTP; power vs HR zone basis; 7d vs 28d TID |
| **Floating / range bar** | Bar showing min–max span | Interval power range per rep; HR range within a zone block |
| **Lollipop chart** | Dot on a stem | Highlight single values (today's TSB, latest CSS) against a scale |

### 10.4 Time & Sequence Shapes

| Shape | Description | Dashboard use |
|-------|-------------|---------------|
| **Calendar heatmap** | Grid of days coloured by intensity | Training consistency; daily TSS or hours (GitHub-style) |
| **Waterfall chart** | Cumulative steps up/down | How daily TSS builds to weekly total; fatigue accumulation |
| **Step chart** | Horizontal steps at threshold change points | FTP / CSS / LTHR timeline when values jump |
| **Gantt / swimlane** | Horizontal bars on a time axis | Week plan: planned vs completed sessions by day |
| **Ridge / joy plot** | Stacked density curves | Distribution of session durations or intensities across weeks |
| **Event timeline** | Vertical line with diamond/triangle nodes | Threshold tests, races, deloads, illness markers |

### 10.5 Distribution & Density Shapes

| Shape | Description | Dashboard use |
|-------|-------------|---------------|
| **Histogram** | Bar bins along a continuous axis | Power or pace distribution within a session |
| **Box plot** | Median, quartiles, whiskers | Interval power consistency across reps |
| **Hex bin / heatmap scatter** | Density-coloured hexagons | Where most training time falls (power × HR) |
| **Violin plot** | Mirrored density curves | Compare power output spread between two sessions (desktop) |
| **Strip plot** | Individual dots along an axis | Every interval rep's power on one scale |

### 10.6 Multi-Metric & Profile Shapes

| Shape | Description | Dashboard use |
|-------|-------------|---------------|
| **Radar / spider chart** | Axes radiating from centre | Readiness snapshot: HRV, RHR, sleep, TSB, feel, soreness |
| **Power-duration curve** | Line through anchor durations (5s–60min) | MMP profile; compare 28d windows (capability metric) |
| **HR-duration curve** | Same form for sustained HR anchors | HR curve delta across two 28d windows |
| **Area-under-curve fill** | Line chart with gradient fill below | Fitness (CTL) growth; muscle mass trend |
| **Parallel coordinates** | Multiple vertical axes linked by lines | Compare last 5 key sessions across 6+ metrics |
| **Profile overlay** | Two lines on same axes | Route elevation + power; decoupling drift (first vs last third) |

### 10.7 Flow & Relationship Shapes

| Shape | Description | Dashboard use |
|-------|-------------|---------------|
| **Sankey / flow diagram** | Width-proportional flows between nodes | Total hours → sport → zone → session type |
| **Chord diagram** | Circular flows between categories | Cross-sport load transfer (which sports contribute most TSS) |
| **Network / node graph** | Connected nodes sized by weight | Workout library usage; which session types dominate the block |
| **Correlation matrix** | Grid of coloured cells | HRV vs TSB vs sleep vs performance (coach deep-dive) |

### 10.8 Marker & Indicator Shapes

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

### 10.9 Mobile-Optimised Shape Rules

| Rule | Rationale |
|------|-----------|
| Prefer **horizontal** bars and strips on iPhone | More readable in portrait; thumb-friendly tap targets |
| Limit radar charts to **≤6 axes** | Legibility on small screens |
| Use **sparklines + one number** on dashboard cards | Glanceable; detail on tap |
| Reserve **Sankey, chord, parallel coords, violin** for desktop or drill-down | Too dense for primary mobile view |
| **Calendar heatmap** works well on mobile | One cell per day; tap for session list |
| **Bullet charts** replace full gauges when space is tight | Same information in less height |
| Animate **timeline strips** on session open only | Avoid motion on dashboard scroll |

### 10.10 Shape-to-Metric Mapping (Extended)

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
| **Sleep hours (7 nights)** | Duration bar chart or calendar heatmap |
| **Sleep stages** | Hypnogram timeline strip |
| **HRV vs baseline** | Baseline band chart, diverging bar, sparkline |
| **RHR vs baseline** | Baseline band chart, diverging bar, sparkline |
| **Recovery snapshot** | Radar chart (HRV, RHR, sleep, TSB, feel) |
| **Sleep → HRV relationship** | Scatter plot |
| **Event countdown** | Circular countdown ring, horizontal milestone bar |
| **Race calendar (90d)** | Multi-event timeline with priority shapes |
| **Race week (D-7 → D-0)** | Gantt swimlane with daily load/zone rows |
| **Taper progress** | Bullet chart (planned vs actual volume reduction) |
| **Current training phase** | Hexagon badge with confidence opacity |
| **Season periodisation** | Horizontal block timeline, phase swimlane Gantt |
| **Block comparison** | Slope chart (this block vs previous) |
| **Volume by phase** | Stacked area chart coloured by phase state |
| **Phase transitions** | Gradient colour strip; label at centre of blend zone (not at colour edge) |

### 10.11 Shape Selection Guide

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
| "Am I recovered?" | Sleep bars, HRV/RHR baseline band, recovery radar |
| "How long until my race?" | Countdown ring, milestone bar, event card stack |
| "What phase am I in?" | Block timeline, hexagon badge, phase swimlane |

---

## 11. Priority Build Order

If building incrementally:

1. **Zone stacked bar** (Z1 blue → Z5 red) — highest value per session
2. **PMC chart** (CTL / ATL / TSB) — load management
3. **Event countdown ring** — motivational anchor; links to taper/race week
4. **Recovery sparklines** (HRV, RHR, sleep hours) — daily readiness glance
5. **Phase block timeline** — season context
6. **Wellness trendlines** (BMI, fat%, muscle, water)
7. **Sleep duration bars + baseline band chart** — deeper recovery view
8. **Threshold ladder** per sport
9. **Swim-specific** (CSS reference + SR/DPC scatter)
10. **Race-week Gantt + full shape variety** (see §10)

---

## 12. Data Integrity Rules

- All numeric references must use verified data from the JSON mirror — no estimation or interpolation (Section 11).
- Thresholds MUST be applied **per sport family**; cross-sport threshold application is forbidden.
- When `zone_basis` is not `"power"`, note the basis in the UI so the athlete knows which zones drove the chart.
- Per-activity zone distributions may show both power and HR zones regardless of aggregation preference.

---

## 13. Related Protocol References

- Zone distribution & polarisation: Section 11 — Zone Distribution & Polarisation Metrics
- Per-sport thresholds: `current_status.thresholds.sports[family]`
- Load metrics: CTL / ATL / TSB (Banister impulse–response)
- Recovery signals: Section 11 — Recovery Metrics Integration (HRV / RHR / Sleep / Feel)
- Sleep readiness: hours-only for automated signals (v11.21); quality/score as context
- Wellness passthrough: Section 11 v11.16 — Extended Wellness Fields
- Phase detection: Section 11 — Phase Detection Criteria (dual-stream, 8 phase states)
- Race calendar: Section 11 — Race-Week Protocol (`race_calendar`, `taper_alert`, `race_week`)
- Post-workout zone reporting: Power zones (% breakdown), HR zones (% breakdown)
