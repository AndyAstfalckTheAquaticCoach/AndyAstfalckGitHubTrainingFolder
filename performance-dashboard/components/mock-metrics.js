/** Canonical demo metrics — same numbers across all component demos for fair comparison */
window.COMPONENT_DEMO = {
  cycling: {
    primary: { label: "FTP / LT2", value: 258, unit: "W", pct: 86, delta: "+3W", target: 265, sub: "4.1 W/kg" },
    secondary: { label: "AeT / LT1", value: 195, unit: "W", pct: 72, delta: "+2W", target: 200, sub: "76% FTP" },
    tertiary: { label: "CTL", value: 78, unit: "", pct: 78, delta: "+4", target: 85, sub: "fitness" },
  },
  running: {
    primary: { label: "Threshold pace", value: "4:12", unit: "/km", pct: 88, delta: "−4s", target: "4:08", sub: "LT2" },
    secondary: { label: "AeT pace", value: "4:45", unit: "/km", pct: 74, delta: "−3s", target: "4:40", sub: "easy band" },
    tertiary: { label: "Weekly km", value: 58, unit: "km", pct: 72, delta: "+6km", target: 65, sub: "volume" },
  },
  curve: {
    labels: ["5s", "1m", "5m", "20m", "60m"],
    current: [892, 485, 312, 241, 218],
    previous: [905, 478, 305, 236, 215],
  },
  trend: [248, 250, 252, 255, 255, 258, 258],
  spark: [62, 65, 68, 71, 74, 76, 78],
};
