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
