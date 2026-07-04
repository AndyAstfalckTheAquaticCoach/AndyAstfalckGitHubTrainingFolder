(function () {
  function getProfile(key) {
    return window.ATHLETE_PROFILES && window.ATHLETE_PROFILES[key];
  }

  function renderHeroRings(container, profile) {
    if (!container || !profile) return;
    var accent = profile.accent || "#3dff8f";
    container.innerHTML = profile.heroMetrics
      .map(function (m) {
        return (
          '<div class="ring-wrap">' +
          '<div class="ring">' +
          DashHelpers.ringSvg(m.pct, accent) +
          '<span class="ring-value">' +
          m.value +
          "</span>" +
          (m.unit ? '<span class="ring-unit">' + m.unit + "</span>" : "") +
          "</div>" +
          '<div class="ring-label">' +
          m.label +
          "</div>" +
          '<div class="ring-delta ' +
          DashHelpers.deltaClass(m.delta) +
          '">' +
          m.delta +
          "</div>" +
          (m.sub ? '<div class="ring-sub">' + m.sub + "</div>" : "") +
          "</div>"
        );
      })
      .join("");
  }

  function renderTrends(container, trends, accent) {
    if (!container) return;
    accent = accent || "#3dff8f";
    container.innerHTML = trends
      .map(function (tr) {
        return (
          '<div class="trend-row"><div class="trend-left"><div class="trend-name">' +
          tr.name +
          '</div><div class="trend-val">' +
          tr.value +
          '</div></div><canvas class="trend-spark" data-series="' +
          tr.series.join(",") +
          '" data-color="' +
          accent +
          '"></canvas><div class="trend-delta ' +
          DashHelpers.deltaClass(tr.delta) +
          '">' +
          tr.delta +
          "</div></div>"
        );
      })
      .join("");
    container.querySelectorAll(".trend-spark").forEach(function (c) {
      c.width = 80;
      c.height = 28;
      DashHelpers.sparkline(c, c.dataset.series.split(",").map(Number), c.dataset.color);
    });
  }

  function renderTable(tbody, table) {
    if (!tbody || !table) return;
    tbody.innerHTML = table.rows
      .map(function (row) {
        var trend = row[row.length - 1];
        var cells = row
          .slice(0, -1)
          .map(function (c, i) {
            return i === 0 ? "<td>" + c + "</td>" : "<td>" + (i === 1 ? "<strong>" + c + "</strong>" : c) + "</td>";
          })
          .join("");
        return (
          "<tr>" +
          cells +
          "<td class='trend-" +
          trend +
          "'>" +
          (trend === "up" ? "↑" : trend === "down" ? "↓" : "→") +
          "</td></tr>"
        );
      })
      .join("");
    var thead = tbody.closest("table");
    if (thead) {
      var hr = thead.querySelector("thead tr");
      if (hr) hr.innerHTML = table.headers.map(function (h) { return "<th>" + h + "</th>"; }).join("");
    }
  }

  function renderChart(canvas, chart, accent) {
    if (!canvas || !chart || typeof Chart === "undefined") return;
    var existing = Chart.getChart(canvas);
    if (existing) existing.destroy();
    accent = accent || "#3dff8f";
    if (chart.type === "power" || chart.type === "pace" || !chart.type) {
      DashHelpers.areaChart(canvas, chart.labels, chart.current, chart.previous);
      return;
    }
    if (chart.type === "dual") {
      new Chart(canvas, {
        type: "bar",
        data: {
          labels: chart.labels,
          datasets: [
            { label: "Vert (m)", data: chart.current, backgroundColor: accent + "88", borderColor: accent, borderWidth: 1, yAxisID: "y" },
            { label: chart.series2Label || "Decoupling", data: chart.series2, type: "line", borderColor: "#ffb020", tension: 0.3, yAxisID: "y1" },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { labels: { color: "#7a8a9e", font: { size: 10 } } } },
          scales: {
            x: { ticks: { color: "#7a8a9e" }, grid: { color: "rgba(42,53,68,0.5)" } },
            y: { position: "left", ticks: { color: "#7a8a9e" }, grid: { color: "rgba(42,53,68,0.5)" } },
            y1: { position: "right", ticks: { color: "#ffb020" }, grid: { display: false } },
          },
        },
      });
      return;
    }
    if (chart.type === "stacked") {
      new Chart(canvas, {
        type: "doughnut",
        data: {
          labels: chart.labels,
          datasets: [{ data: chart.current, backgroundColor: ["#4da3ff", "#3dff8f", "#ff6b6b"], borderWidth: 0 }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: "bottom", labels: { color: "#7a8a9e", font: { size: 11 } } } },
        },
      });
    }
  }

  function renderTriSport(container, sports) {
    if (!container || !sports) return;
    container.innerHTML = ["swim", "bike", "run"]
      .map(function (key) {
        var s = sports[key];
        if (!s) return "";
        var metrics = s.metrics
          .map(function (m) {
            return '<div class="tri-metric"><span class="tri-k">' + m.k + '</span><span class="tri-v">' + m.v + '</span><span class="tri-d">' + m.d + "</span></div>";
          })
          .join("");
        return (
          '<div class="tri-col" style="--sport-color:' +
          s.color +
          '"><div class="tri-head">' +
          s.label +
          '</div><div class="tri-metrics">' +
          metrics +
          '</div><canvas class="tri-chart" id="triChart' +
          key +
          '"></canvas></div>'
        );
      })
      .join("");
    ["swim", "bike", "run"].forEach(function (key) {
      var s = sports[key];
      var c = document.getElementById("triChart" + key);
      if (!c || !s || !s.chart) return;
      new Chart(c, {
        type: "line",
        data: {
          labels: s.chart.labels,
          datasets: [{ data: s.chart.current, borderColor: s.color, tension: 0.35, pointRadius: 3, fill: false }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { x: { ticks: { color: "#7a8a9e", font: { size: 9 } }, grid: { display: false } }, y: { display: false } },
        },
      });
    });
  }

  function initSportDashboard(profileKey, opts) {
    opts = opts || {};
    var profile = getProfile(profileKey);
    if (!profile) return;

    document.documentElement.style.setProperty("--sport-accent", profile.accent);

    var a = profile.athlete;
    var titleEl = document.getElementById("pageTitle");
    if (titleEl) titleEl.textContent = a.name + " · " + a.sport;
    var subEl = document.getElementById("pageSub");
    if (subEl) subEl.textContent = a.goal;
    var phaseEl = document.getElementById("phaseBadge");
    if (phaseEl) phaseEl.textContent = a.phase + " · Wk " + a.phaseWeek;
    var syncEl = document.getElementById("syncBadge");
    if (syncEl) syncEl.textContent = "Synced " + a.lastSync;

    renderHeroRings(document.getElementById("heroRings"), profile);
    DashHelpers.renderChips(document.getElementById("insights"), profile.insights);

    var chartTitle = document.getElementById("chartTitle");
    if (chartTitle && profile.chart) chartTitle.textContent = profile.chart.title;
    var rotBadge = document.getElementById("rotBadge");
    if (rotBadge && profile.chart) rotBadge.textContent = profile.chart.badge;

    renderChart(document.getElementById("mainChart"), profile.chart, profile.accent);
    renderTrends(document.getElementById("trendList"), profile.trends, profile.accent);

    var tableTitle = document.getElementById("tableTitle");
    if (tableTitle && profile.table) tableTitle.textContent = profile.table.title;
    renderTable(document.getElementById("tableBody"), profile.table);

    var execGrid = document.getElementById("execGrid");
    if (execGrid && profile.execution) {
      execGrid.innerHTML = profile.execution
        .map(function (e) {
          return (
            '<div class="card exec-card"><div class="exec-name">' +
            e.name +
            '</div><div class="exec-val">' +
            e.value +
            '</div><span class="badge badge-green">' +
            e.trend +
            "</span></div>"
          );
        })
        .join("");
    }

    var narrative = document.getElementById("narrative");
    if (narrative) narrative.textContent = profile.narrative;

    if (opts.tri && profile.sports) {
      renderTriSport(document.getElementById("triSports"), profile.sports);
      var triEl = document.getElementById("triSports");
      if (triEl) triEl.style.display = "grid";
    } else {
      var triHide = document.getElementById("triSports");
      if (triHide) { triHide.style.display = "none"; triHide.innerHTML = ""; }
    }

    var tag = document.getElementById("variationTag");
    if (tag && opts.tag) tag.textContent = opts.tag;
  }

  window.SportDashboard = { init: initSportDashboard, getProfile: getProfile };
})();
