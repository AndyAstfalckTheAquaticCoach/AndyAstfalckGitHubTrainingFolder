/**
 * Sport-specific athlete profiles — Section 11 per-sport threshold rules.
 * Each profile drives hero metrics, charts, and insights for its dashboard.
 */
window.ATHLETE_PROFILES = {
  roadCyclist: {
    id: "roadCyclist",
    label: "Road cyclist",
    accent: "#3dff8f",
    athlete: { name: "Olivia Jones", sport: "Road cycling", phase: "Build", phaseWeek: 3, lastSync: "2h ago", goal: "Gran Fondo — July 26" },
    heroMetrics: [
      { label: "FTP / LT2", value: "258", unit: "W", pct: 86, delta: "+3W", sub: "4.1 W/kg · eFTP 261" },
      { label: "AeT / LT1", value: "195", unit: "W", pct: 72, delta: "+2W", sub: "76% FTP · DFA moderate" },
      { label: "AnT", value: "258", unit: "W", pct: 86, delta: "stable", sub: "LTHR 164 bpm" },
      { label: "VO₂ / W′", value: "51", unit: "ml/kg", pct: 78, delta: "W′ 18.2kJ", sub: "high confidence" },
    ],
    insights: [
      { label: "20min power", value: "+2.1%", dir: "up" },
      { label: "Endurance curve", value: "Biased ↑", dir: "up" },
      { label: "Durability", value: "−0.4% dec", dir: "up" },
      { label: "FTP", value: "Flat 6wk", dir: "flat" },
    ],
    chart: { title: "Power curve · 28d vs previous", type: "power", labels: ["5s", "1m", "5m", "20m", "60m"], current: [892, 485, 312, 241, 218], previous: [905, 478, 305, 236, 215], badge: "Endurance-biased −2.1" },
    trends: [
      { name: "FTP", value: "258W", delta: "+3W", series: [248, 250, 252, 255, 255, 258, 258] },
      { name: "AeT est.", value: "195W", delta: "+2W", series: [188, 189, 191, 192, 193, 194, 195] },
      { name: "LTHR", value: "164", delta: "stable", series: [163, 164, 164, 163, 164, 164, 164] },
      { name: "CTL", value: "78", delta: "+4", series: [62, 65, 68, 71, 74, 76, 78] },
    ],
    table: { title: "Sustainability · race durations", headers: ["Duration", "Actual", "Coggan", "CP/W′", "HR", "Trend"], rows: [
      ["20 min", "241W", "240W", "238W", "158", "up"], ["60 min", "218W", "222W", "220W", "152", "flat"], ["90 min", "205W", "212W", "208W", "149", "up"],
    ]},
    execution: [
      { name: "Durability 7d/28d", value: "2.1% / 2.5%", trend: "improving" },
      { name: "EF trend", value: "1.42", trend: "stable" },
      { name: "Easy time ratio", value: "82%", trend: "good" },
      { name: "TID 7d / 28d", value: "Polarized", trend: "consistent" },
    ],
    narrative: "Power curve shifting endurance-biased — 20min and 60min anchors rising. On track for Gran Fondo pacing at ~218W for 60min efforts.",
  },

  gravelCyclist: {
    id: "gravelCyclist",
    label: "Gravel cyclist",
    accent: "#e8a838",
    athlete: { name: "Marcus Chen", sport: "Gravel cycling", phase: "Base", phaseWeek: 5, lastSync: "45m ago", goal: "Gravel Worlds — Sep 12" },
    heroMetrics: [
      { label: "FTP outdoor", value: "272", unit: "W", pct: 84, delta: "+5W", sub: "4.0 W/kg · long-event focus" },
      { label: "AeT / LT1", value: "204", unit: "W", pct: 70, delta: "+4W", sub: "75% FTP · steady gravel pace" },
      { label: "2h sustainable", value: "212", unit: "W", pct: 78, delta: "+6W", sub: "observed MMP · 42d window" },
      { label: "Durability", value: "2.8", unit: "% dec", pct: 65, delta: "improving", sub: "7d vs 28d aggregate" },
    ],
    insights: [
      { label: "90min+ power", value: "+3.4%", dir: "up" },
      { label: "Decoupling", value: "−0.6%", dir: "up" },
      { label: "Weekly vert", value: "4,200m", dir: "up" },
      { label: "5s sprint", value: "N/A", dir: "flat" },
    ],
    chart: { title: "Long-duration power · gravel focus", type: "power", labels: ["20m", "40m", "60m", "90m", "2h"], current: [248, 232, 218, 205, 198], previous: [242, 228, 212, 198, 192], badge: "Durability improving" },
    trends: [
      { name: "FTP", value: "272W", delta: "+5W", series: [258, 262, 265, 268, 270, 271, 272] },
      { name: "2h MMP", value: "198W", delta: "+6W", series: [182, 186, 190, 192, 194, 196, 198] },
      { name: "Vert / week", value: "4.2k m", delta: "+800m", series: [2800, 3100, 3400, 3600, 3800, 4000, 4200] },
      { name: "CTL", value: "92", delta: "+6", series: [72, 78, 82, 85, 88, 90, 92] },
    ],
    table: { title: "Event-duration sustainability", headers: ["Duration", "Actual", "Coggan", "HR", "Elev gain", "Trend"], rows: [
      ["60 min", "218W", "222W", "151", "680m", "up"], ["90 min", "205W", "212W", "148", "920m", "up"], ["3 h", "188W", "195W", "145", "1,450m", "up"],
    ]},
    execution: [
      { name: "Durability 7d/28d", value: "2.8% / 3.4%", trend: "improving" },
      { name: "EF on climbs", value: "1.38", trend: "stable" },
      { name: "Easy time ratio", value: "85%", trend: "good" },
      { name: "Long ride VI", value: "1.03", trend: "consistent" },
    ],
    narrative: "Fitness building through volume and climbing — 2h sustainable power up 6W. Decoupling improving on 90min+ mixed-terrain rides. Sprint metrics de-emphasised for gravel prep.",
  },

  runner: {
    id: "runner",
    label: "Road runner",
    accent: "#4da3ff",
    athlete: { name: "Sarah Okonkwo", sport: "Running", phase: "Build", phaseWeek: 2, lastSync: "1h ago", goal: "Half marathon — Oct 18" },
    heroMetrics: [
      { label: "Threshold pace", value: "4:12", unit: "/km", pct: 88, delta: "−4s", sub: "LT2 · 4.18 min/km" },
      { label: "AeT pace", value: "4:45", unit: "/km", pct: 74, delta: "−3s", sub: "true easy / marathon pace band" },
      { label: "LTHR", value: "174", unit: "bpm", pct: 82, delta: "stable", sub: "run-specific · not cycling HR" },
      { label: "Weekly vol.", value: "58", unit: "km", pct: 72, delta: "+6km", sub: "polarized 82% easy" },
    ],
    insights: [
      { label: "Threshold pace", value: "−4s/km", dir: "up" },
      { label: "HR curve 20m", value: "+1.2%", dir: "up" },
      { label: "Weekly km", value: "+6km", dir: "up" },
      { label: "rFTPw", value: "352W", dir: "flat" },
    ],
    chart: { title: "Pace-duration profile · best efforts 28d", type: "pace", labels: ["1km", "5km", "10km", "HM", "60min"], current: [3.52, 4.05, 4.18, 4.28, 4.35], previous: [3.55, 4.08, 4.22, 4.32, 4.38], badge: "Threshold improving", invertY: true },
    trends: [
      { name: "Thresh pace", value: "4:12/km", delta: "−4s", series: [4.28, 4.24, 4.22, 4.20, 4.18, 4.14, 4.12] },
      { name: "AeT pace", value: "4:45/km", delta: "−3s", series: [4.58, 4.55, 4.52, 4.50, 4.48, 4.46, 4.45] },
      { name: "Weekly km", value: "58km", delta: "+6km", series: [42, 46, 48, 50, 52, 55, 58] },
      { name: "CTL", value: "64", delta: "+3", series: [52, 54, 56, 58, 60, 62, 64] },
    ],
    table: { title: "Race-pace sustainability", headers: ["Distance", "Best pace", "Avg HR", "EF", "vs 28d", "Trend"], rows: [
      ["5 km", "4:05/km", "168", "1.08", "−3s", "up"], ["10 km", "4:18/km", "172", "1.06", "−4s", "up"], ["Half", "4:28/km", "174", "1.04", "−4s", "up"],
    ]},
    execution: [
      { name: "Durability 7d/28d", value: "3.2% / 3.8%", trend: "improving" },
      { name: "EF trend", value: "1.06", trend: "improving" },
      { name: "Easy time ratio", value: "82%", trend: "good" },
      { name: "TID 7d / 28d", value: "Polarized", trend: "consistent" },
    ],
    narrative: "Threshold pace dropped 4s/km over the block — HM goal pace (4:28) now sits comfortably above current LT2. Power metrics secondary; pace and HR curve drive this dashboard.",
  },

  trailRunner: {
    id: "trailRunner",
    label: "Trail runner",
    accent: "#7cb342",
    athlete: { name: "Jake Morrison", sport: "Trail running", phase: "Build", phaseWeek: 4, lastSync: "3h ago", goal: "UTMB CCC — Aug 28" },
    heroMetrics: [
      { label: "Uphill AeT", value: "6:45", unit: "/km", pct: 76, delta: "−8s", sub: "grade-adjusted · >8% climbs" },
      { label: "Flat threshold", value: "4:05", unit: "/km", pct: 85, delta: "−3s", sub: "road LT2 reference" },
      { label: "Vert / week", value: "2.8k", unit: "m", pct: 80, delta: "+420m", sub: "target 3.2k peak week" },
      { label: "LTHR", value: "178", unit: "bpm", pct: 83, delta: "+1", sub: "trail HR runs 5–8 higher" },
    ],
    insights: [
      { label: "Uphill AeT", value: "−8s/km", dir: "up" },
      { label: "Vert tolerance", value: "+420m/wk", dir: "up" },
      { label: "Long run dec", value: "−0.5%", dir: "up" },
      { label: "Flat 5k pace", value: "flat", dir: "flat" },
    ],
    chart: { title: "Elevation load vs durability · 28d", type: "dual", labels: ["W1", "W2", "W3", "W4"], current: [2100, 2400, 2650, 2800], previous: [1800, 2000, 2200, 2380], badge: "Vert building", series2: [4.2, 3.9, 3.5, 3.1], series2Label: "Decoupling %" },
    trends: [
      { name: "Vert / week", value: "2,800m", delta: "+420m", series: [1400, 1800, 2100, 2400, 2500, 2650, 2800] },
      { name: "Uphill AeT", value: "6:45/km", delta: "−8s", series: [7.12, 7.05, 6.98, 6.92, 6.88, 6.82, 6.75] },
      { name: "Long run hr", value: "152 avg", delta: "stable", series: [154, 153, 152, 152, 151, 152, 152] },
      { name: "CTL", value: "88", delta: "+5", series: [68, 72, 76, 80, 82, 85, 88] },
    ],
    table: { title: "Trail-specific benchmarks", headers: ["Session type", "Metric", "Value", "HR", "Decoupling", "Trend"], rows: [
      ["Long run 3h+", "Avg pace", "6:12/km", "152", "3.1%", "up"], ["Uphill reps", "AeT pace", "6:45/km", "168", "—", "up"], ["Flat tempo", "Thresh", "4:05/km", "176", "2.4%", "flat"],
    ]},
    execution: [
      { name: "Durability 7d/28d", value: "3.1% / 3.6%", trend: "improving" },
      { name: "Vert gain / hr", value: "18.4 m", trend: "improving" },
      { name: "Easy time ratio", value: "78%", trend: "good" },
      { name: "Long run fuel", value: "OK", trend: "stable" },
    ],
    narrative: "Vertical volume building without durability regression — key for CCC. Flat threshold stable; uphill AeT improving. Dashboard prioritises vert, grade-adjusted pace, and long-run decoupling over track speed.",
  },

  triathlete: {
    id: "triathlete",
    label: "Triathlete",
    accent: "#b388ff",
    athlete: { name: "Emma Larsen", sport: "Triathlon", phase: "Build", phaseWeek: 3, lastSync: "30m ago", goal: "Ironman 70.3 — Aug 9" },
    heroMetrics: [
      { label: "Bike FTP", value: "245", unit: "W", pct: 82, delta: "+4W", sub: "cycling threshold · isolated" },
      { label: "Run thresh", value: "4:22", unit: "/km", pct: 86, delta: "−3s", sub: "run LTHR 171" },
      { label: "Swim CSS", value: "1:28", unit: "/100m", pct: 80, delta: "−2s", sub: "critical swim speed" },
      { label: "Combined CTL", value: "96", unit: "", pct: 88, delta: "+4", sub: "multi-sport load" },
    ],
    insights: [
      { label: "Bike FTP", value: "+4W", dir: "up" },
      { label: "Run off bike", value: "−5s/km", dir: "up" },
      { label: "Swim CSS", value: "−2s", dir: "up" },
      { label: "Brick durability", value: "stable", dir: "flat" },
    ],
    sports: {
      swim: {
        label: "Swim", color: "#4da3ff",
        metrics: [
          { k: "CSS", v: "1:28/100m", d: "−2s" },
          { k: "AeT pace", v: "1:38/100m", d: "−1s" },
          { k: "Weekly vol.", v: "12 km", d: "+1.2km" },
          { k: "TSS/wk", v: "280", d: "+20" },
        ],
        chart: { labels: ["400m", "800m", "1500m", "3k"], current: [1.22, 1.26, 1.28, 1.32], previous: [1.24, 1.28, 1.30, 1.34] },
      },
      bike: {
        label: "Bike", color: "#3dff8f",
        metrics: [
          { k: "FTP", v: "245W", d: "+4W" },
          { k: "AeT", v: "185W", d: "+3W" },
          { k: "70.3 bike", v: "210W", d: "+5W" },
          { k: "TSS/wk", v: "420", d: "+30" },
        ],
        chart: { labels: ["5m", "20m", "60m", "90m"], current: [295, 238, 212, 198], previous: [290, 232, 208, 192] },
      },
      run: {
        label: "Run", color: "#ff6b6b",
        metrics: [
          { k: "Threshold", v: "4:22/km", d: "−3s" },
          { k: "AeT", v: "4:55/km", d: "−2s" },
          { k: "Off-bike", v: "4:35/km", d: "−5s" },
          { k: "TSS/wk", v: "340", d: "+25" },
        ],
        chart: { labels: ["5km", "10km", "21km", "42km"], current: [4.08, 4.18, 4.28, 4.45], previous: [4.12, 4.22, 4.32, 4.48] },
      },
    },
    chart: { title: "Multi-sport CTL balance · 28d", type: "stacked", labels: ["Swim", "Bike", "Run"], current: [18, 42, 36], previous: [16, 44, 38], badge: "Bike-heavy block" },
    trends: [
      { name: "Bike FTP", value: "245W", delta: "+4W", series: [232, 235, 238, 240, 242, 244, 245] },
      { name: "Run pace", value: "4:22/km", delta: "−3s", series: [4.32, 4.30, 4.28, 4.26, 4.24, 4.23, 4.22] },
      { name: "Swim CSS", value: "1:28", delta: "−2s", series: [1.34, 1.32, 1.31, 1.30, 1.29, 1.285, 1.28] },
      { name: "Combined CTL", value: "96", delta: "+4", series: [78, 82, 86, 88, 90, 94, 96] },
    ],
    table: { title: "70.3 race estimation", headers: ["Leg", "Target", "Sustainable", "Confidence", "Trend"], rows: [
      ["Swim 1.9km", "1:30/100m", "1:28/100m", "moderate", "up"], ["Bike 90km", "220W NP", "210W obs.", "high", "up"], ["Run 21km", "4:35/km", "4:28/km", "moderate", "up"],
    ]},
    execution: [
      { name: "Brick run dec", value: "3.4%", trend: "stable" },
      { name: "Swim EF", value: "stable", trend: "good" },
      { name: "Easy ratio (all)", value: "80%", trend: "good" },
      { name: "Sport balance", value: "Bike+", trend: "planned" },
    ],
    narrative: "Three isolated threshold systems — no cross-sport FTP. Bike block driving CTL; run threshold improving including off-bike bricks. Swim CSS progressing but lowest confidence leg for 70.3.",
  },

  swimOnly: {
    id: "swimOnly",
    label: "Swim focus",
    accent: "#4da3ff",
    athlete: { name: "Priya Nair", sport: "Swimming", phase: "Build", phaseWeek: 2, lastSync: "4h ago", goal: "Ironman swim — sub 1:20/100m" },
    heroMetrics: [
      { label: "CSS", value: "1:24", unit: "/100m", pct: 88, delta: "−3s", sub: "critical swim speed · LT2 proxy" },
      { label: "AeT pace", value: "1:34", unit: "/100m", pct: 74, delta: "−2s", sub: "aerobic threshold band" },
      { label: "Weekly vol.", value: "14", unit: "km", pct: 70, delta: "+1.5km", sub: "pool + open water" },
      { label: "SWOLF", value: "42", unit: "", pct: 82, delta: "−2", sub: "efficiency trend" },
    ],
    insights: [
      { label: "CSS", value: "−3s/100m", dir: "up" },
      { label: "400m best", value: "−2s", dir: "up" },
      { label: "Stroke rate", value: "stable", dir: "flat" },
      { label: "Open water", value: "+2 sessions", dir: "up" },
    ],
    chart: { title: "Pace by distance · 28d best", type: "power", labels: ["100m", "400m", "800m", "1500m", "3.8km"], current: [1.12, 1.20, 1.24, 1.26, 1.30], previous: [1.14, 1.22, 1.26, 1.28, 1.32], badge: "CSS improving" },
    trends: [
      { name: "CSS", value: "1:24", delta: "−3s", series: [1.32, 1.30, 1.29, 1.28, 1.26, 1.25, 1.24] },
      { name: "Weekly km", value: "14km", delta: "+1.5km", series: [10, 11, 11.5, 12, 12.5, 13, 14] },
      { name: "SWOLF", value: "42", delta: "−2", series: [46, 45, 44, 44, 43, 42, 42] },
      { name: "CTL", value: "52", delta: "+3", series: [40, 42, 44, 46, 48, 50, 52] },
    ],
    table: { title: "Race-pace targets", headers: ["Distance", "Target", "Current", "Gap", "Trend"], rows: [
      ["400m", "1:18/100m", "1:20/100m", "−2s", "up"], ["1500m", "1:26/100m", "1:26/100m", "on", "flat"], ["IM 3.8km", "1:20/100m", "1:30/100m", "−10s", "up"],
    ]},
    execution: [
      { name: "Stroke efficiency", value: "improving", trend: "good" },
      { name: "Kick share", value: "12%", trend: "stable" },
      { name: "Pool vs OW", value: "60/40", trend: "planned" },
      { name: "TID", value: "Pyramidal", trend: "consistent" },
    ],
    narrative: "Swim-only dashboard — pace per 100m is the primary threshold language. No bike/run FTP. CSS is the anchor metric for Ironman swim pacing.",
  },

  rower: {
    id: "rower",
    label: "Rowing / SkiErg",
    accent: "#ff7043",
    athlete: { name: "Tom Becker", sport: "Rowing", phase: "Peak", phaseWeek: 1, lastSync: "1h ago", goal: "2k erg — sub 6:20" },
    heroMetrics: [
      { label: "2k pace", value: "1:35.2", unit: "/500m", pct: 90, delta: "−1.8s", sub: "threshold proxy · 6:21/2k" },
      { label: "rFTPw", value: "385", unit: "W", pct: 86, delta: "+8W", sub: "erg threshold power" },
      { label: "AeT watts", value: "290", unit: "W", pct: 72, delta: "+5W", sub: "75% rFTPw band" },
      { label: "LTHR", value: "178", unit: "bpm", pct: 84, delta: "stable", sub: "rowing-specific" },
    ],
    insights: [
      { label: "2k estimate", value: "6:21", dir: "up" },
      { label: "500m snap", value: "+2W", dir: "up" },
      { label: "Durability 30m", value: "stable", dir: "flat" },
      { label: "Stroke rate", value: "28 avg", dir: "flat" },
    ],
    chart: { title: "Power at duration · SkiErg/row", type: "power", labels: ["60s", "2m", "5m", "20m", "30m"], current: [520, 410, 340, 295, 280], previous: [512, 405, 332, 288, 275], badge: "2k on target" },
    trends: [
      { name: "rFTPw", value: "385W", delta: "+8W", series: [365, 368, 372, 375, 378, 382, 385] },
      { name: "2k pace", value: "1:35.2", delta: "−1.8s", series: [1.38, 1.37, 1.36, 1.36, 1.35, 1.35, 1.352] },
      { name: "30m watts", value: "280W", delta: "+5W", series: [265, 268, 270, 272, 275, 278, 280] },
      { name: "CTL", value: "58", delta: "+2", series: [50, 52, 54, 55, 56, 57, 58] },
    ],
    table: { title: "Sustainability · erg distances", headers: ["Duration", "Actual W", "HR", "Pace/500m", "Trend"], rows: [
      ["2 min", "410W", "172", "1:27", "up"], ["5 min", "340W", "176", "1:32", "up"], ["20 min", "295W", "174", "1:38", "flat"],
    ]},
    execution: [
      { name: "Durability 7d/28d", value: "2.8% / 3.1%", trend: "stable" },
      { name: "Drive:recovery", value: "1:2.1", trend: "good" },
      { name: "Easy ratio", value: "78%", trend: "good" },
      { name: "TID", value: "Threshold", trend: "peak phase" },
    ],
    narrative: "Rowing dashboard uses rFTPw and /500m pace — not cycling FTP. 2k prediction is the hero race metric; shorter durations show snap, 20–30m shows aerobic sustainability.",
  },

  duathlon: {
    id: "duathlon",
    label: "Duathlon",
    accent: "#ce93d8",
    athlete: { name: "Chris Walsh", sport: "Duathlon", phase: "Build", phaseWeek: 4, lastSync: "2h ago", goal: "Standard du — AG podium" },
    heroMetrics: [
      { label: "Bike FTP", value: "268", unit: "W", pct: 84, delta: "+4W", sub: "cycling threshold only" },
      { label: "Run thresh", value: "4:08", unit: "/km", pct: 87, delta: "−3s", sub: "run LTHR 172" },
      { label: "Brick pace", value: "4:18", unit: "/km", pct: 80, delta: "−4s", sub: "run off bike · key metric" },
      { label: "Combined CTL", value: "82", unit: "", pct: 85, delta: "+3", sub: "run-heavy block" },
    ],
    insights: [
      { label: "Brick run", value: "−4s/km", dir: "up" },
      { label: "Bike FTP", value: "+4W", dir: "up" },
      { label: "Run fresh", value: "−2s/km", dir: "up" },
      { label: "T2 practice", value: "2 bricks/wk", dir: "flat" },
    ],
    chart: { title: "Run-off-bike vs fresh run · 28d", type: "dual", labels: ["W1", "W2", "W3", "W4"], current: [4.28, 4.24, 4.20, 4.18], previous: [4.35, 4.32, 4.28, 4.26], badge: "Brick improving", series2: [4.12, 4.10, 4.09, 4.08], series2Label: "Fresh run /km" },
    trends: [
      { name: "Bike FTP", value: "268W", delta: "+4W", series: [258, 260, 262, 264, 265, 266, 268] },
      { name: "Brick pace", value: "4:18/km", delta: "−4s", series: [4.32, 4.30, 4.26, 4.24, 4.22, 4.20, 4.18] },
      { name: "Fresh run", value: "4:08/km", delta: "−3s", series: [4.16, 4.14, 4.12, 4.11, 4.10, 4.09, 4.08] },
      { name: "CTL", value: "82", delta: "+3", series: [70, 72, 75, 77, 78, 80, 82] },
    ],
    table: { title: "Race simulation", headers: ["Segment", "Target", "Current", "Confidence", "Trend"], rows: [
      ["Bike 40km", "220W NP", "215W obs.", "high", "up"], ["Run 1 off bike", "4:25/km", "4:18/km", "moderate", "up"], ["Run 2", "4:35/km", "4:28/km", "moderate", "up"],
    ]},
    execution: [
      { name: "Brick decoupling", value: "3.8%", trend: "improving" },
      { name: "Bike TID", value: "Polarized", trend: "good" },
      { name: "Run TID", value: "Polarized", trend: "good" },
      { name: "T2 time", value: "45s", trend: "stable" },
    ],
    narrative: "Duathlon dashboard centres the brick run — the metric that wins races. Bike FTP and fresh run threshold shown separately; no swim block.",
  },

  ultraRunner: {
    id: "ultraRunner",
    label: "Ultra trail",
    accent: "#66bb6a",
    athlete: { name: "Nina Kovač", sport: "Ultra trail", phase: "Base", phaseWeek: 6, lastSync: "5h ago", goal: "UTMB — 100M" },
    heroMetrics: [
      { label: "AeT HR", value: "148", unit: "bpm", pct: 78, delta: "stable", sub: "time-on-feet anchor" },
      { label: "Vert / week", value: "3.6k", unit: "m", pct: 85, delta: "+600m", sub: "building toward 5k peak" },
      { label: "Long run", value: "5:45", unit: "/km", pct: 72, delta: "−12s", sub: "6h+ trail pace avg" },
      { label: "Walk:run", value: "8", unit: "%", pct: 90, delta: "−2%", sub: "power hike efficiency" },
    ],
    insights: [
      { label: "Time on feet", value: "+45min/wk", dir: "up" },
      { label: "Vert load", value: "+600m", dir: "up" },
      { label: "Night block", value: "added", dir: "up" },
      { label: "Flat speed", value: "ignored", dir: "flat" },
    ],
    chart: { title: "Weekly vert vs long-run decoupling", type: "dual", labels: ["W1", "W2", "W3", "W4", "W5", "W6"], current: [2200, 2600, 2900, 3100, 3400, 3600], previous: [1800, 2100, 2400, 2600, 2800, 3000], badge: "Vert building", series2: [5.2, 4.8, 4.5, 4.2, 3.9, 3.6], series2Label: "Decoupling %" },
    trends: [
      { name: "Vert / week", value: "3,600m", delta: "+600m", series: [1400, 1800, 2200, 2600, 2900, 3300, 3600] },
      { name: "Long run hr", value: "148 bpm", delta: "stable", series: [150, 149, 149, 148, 148, 148, 148] },
      { name: "Weekly hours", value: "12.5h", delta: "+1.2h", series: [8, 9, 9.5, 10, 11, 12, 12.5] },
      { name: "CTL", value: "95", delta: "+5", series: [72, 78, 82, 86, 88, 92, 95] },
    ],
    table: { title: "Ultra benchmarks", headers: ["Session", "Metric", "Value", "Fuel", "Trend"], rows: [
      ["6h long", "Pace", "5:45/km", "OK", "up"], ["Back-to-back", "Decoupling", "3.6%", "tested", "up"], ["Night 3h", "AeT hold", "148 bpm", "practice", "up"],
    ]},
    execution: [
      { name: "Durability 7d/28d", value: "3.6% / 4.1%", trend: "improving" },
      { name: "Vert tolerance", value: "high", trend: "building" },
      { name: "Easy ratio", value: "88%", trend: "excellent" },
      { name: "GI training", value: "on plan", trend: "good" },
    ],
    narrative: "Ultra dashboard de-emphasises threshold pace and sprint. Vert, time-on-feet, AeT HR stability, and long-run decoupling are the performance language for 100M prep.",
  },
};

/** Default profile for original v1–v5 dashboards */
window.PERFORMANCE_MOCK = (function () {
  var p = window.ATHLETE_PROFILES.roadCyclist;
  return {
    athlete: p.athlete,
    thresholds: {
      ftp: 258, ftpIndoor: 255, ftpDelta: 3, ftpWkg: 4.1, aet: 195, aetDelta: 2, aetPctFtp: 76,
      aetSource: "DFA", aetConfidence: "moderate", ant: 258, antDelta: 0, lthr: 164,
      vo2max: 51, wPrime: 18.2, wPrimeConfidence: "high", eftp: 261,
    },
    insights: p.insights,
    powerCurve: { labels: p.chart.labels, current: p.chart.current, previous: p.chart.previous, rotationIndex: -2.1, rotationLabel: "Endurance-biased" },
    trends: p.trends,
    sustainability: [{ dur: "20 min", actual: 241, coggan: 240, cp: 238, hr: 158, trend: "up" }, { dur: "60 min", actual: 218, coggan: 222, cp: 220, hr: 152, trend: "flat" }, { dur: "90 min", actual: 205, coggan: 212, cp: 208, hr: 149, trend: "up" }],
    execution: p.execution,
    ftpHistory: [{ date: "Oct", value: 248 }, { date: "Nov", value: 250 }, { date: "Dec", value: 252 }, { date: "Jan", value: 255 }, { date: "Feb", value: 255 }, { date: "Mar", value: 258 }],
  };
})();
