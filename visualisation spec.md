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

Visual components are not limited to circles and pie charts. Use the following shape vocabulary:

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

---

## 8. Priority Build Order

If building incrementally:

1. **Zone stacked bar** (Z1 blue → Z5 red) — highest value per session
2. **PMC chart** (CTL / ATL / TSB) — load management
3. **Wellness trendlines** (BMI, fat%, muscle, water)
4. **Threshold ladder** per sport
5. **Swim-specific** (CSS reference + SR/DPC scatter)
6. **Shape variety** (triangles for alerts, donuts for summaries, timelines for sessions)

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
