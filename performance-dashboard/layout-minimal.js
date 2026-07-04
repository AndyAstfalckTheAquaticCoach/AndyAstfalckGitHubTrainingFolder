(function () {
  function render(profileKey) {
    var p = window.ATHLETE_PROFILES[profileKey];
    if (!p) return;
    var root = document.getElementById("minimalRoot");
    if (!root) return;
    var h = p.heroMetrics[0];
    var rows = p.heroMetrics.slice(1).concat(
      p.trends.slice(0, 2).map(function (t) {
        return { label: t.name, value: t.value, delta: t.delta, isTrend: true };
      })
    );
    root.innerHTML =
      '<p class="date">' +
      p.athlete.sport +
      " · Synced " +
      p.athlete.lastSync +
      "</p>" +
      "<h1>Performance</h1>" +
      '<p class="phase">' +
      p.athlete.phase +
      " · Week " +
      p.athlete.phaseWeek +
      "</p>" +
      '<div class="hero-metric">' +
      '<div class="label">' +
      h.label +
      "</div>" +
      '<div class="value">' +
      h.value +
      "</div>" +
      '<div class="meta"><em>' +
      h.delta +
      "</em> · " +
      (h.sub || h.unit) +
      "</div></div>" +
      '<div class="section-label">Thresholds & trends</div>' +
      rows
        .map(function (r) {
          var dc = DashHelpers.deltaClass(r.delta);
          return (
            '<div class="row"><span class="row-label">' +
            r.label +
            '</span><div class="row-right"><div class="row-val">' +
            r.value +
            (r.unit ? " " + r.unit : "") +
            '</div><div class="row-delta ' +
            (dc === "flat" ? "flat" : "") +
            '">' +
            r.delta +
            "</div></div></div>"
          );
        })
        .join("") +
      '<div class="section-label">Adaptation</div>' +
      '<div class="insight-line">' +
      p.narrative +
      "</div>" +
      '<div class="curve-minimal"><canvas id="minChart"></canvas></div>' +
      '<div class="pill-row">' +
      p.insights
        .map(function (i, idx) {
          return '<span class="pill' + (i.dir === "up" ? " active" : "") + '">' + i.label + ": " + i.value + "</span>";
        })
        .join("") +
      "</div>";
    document.title = "Minimal · " + p.label + " | Performance";
    var tag = document.querySelector(".variation-tag");
    if (tag) tag.textContent = "Minimal · " + p.label;
    new Chart(document.getElementById("minChart"), {
      type: "line",
      data: {
        labels: p.chart.labels,
        datasets: [{ data: p.chart.current, borderColor: p.accent, borderWidth: 2, pointRadius: 0, tension: 0.4 }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } },
    });
  }
  window.MinimalLayout = { render: render };
})();
