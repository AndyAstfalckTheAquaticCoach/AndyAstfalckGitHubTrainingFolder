(function () {
  function ringSvg(pct, color, size) {
    size = size || 120;
    const r = (size - 10) / 2;
    const c = 2 * Math.PI * r;
    const off = c - (pct / 100) * c;
    return (
      '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + " " + size + '">' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="#2a3544" stroke-width="8"/>' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="8" ' +
      'stroke-dasharray="' + c + '" stroke-dashoffset="' + off + '" stroke-linecap="round"/>' +
      "</svg>"
    );
  }

  function deltaClass(d) {
    if (!d) return "flat";
    const s = String(d).toLowerCase();
    if (s.includes("+") || s.includes("↑") || s.includes("improv")) return "up";
    if (s.includes("−") || s.includes("-") && !s.includes("stable")) return "down";
    return "flat";
  }

  function renderRings(container, rings) {
    if (!container) return;
    container.innerHTML = rings
      .map(function (ring) {
        return (
          '<div class="ring-wrap">' +
          '<div class="ring">' +
          ringSvg(ring.pct, ring.color) +
          '<span class="ring-value">' + ring.value + "</span>" +
          (ring.unit ? '<span class="ring-unit">' + ring.unit + "</span>" : "") +
          "</div>" +
          '<div class="ring-label">' + ring.label + "</div>" +
          (ring.delta
            ? '<div class="ring-delta ' + deltaClass(ring.delta) + '">' + ring.delta + "</div>"
            : "") +
          (ring.sub ? '<div class="ring-sub">' + ring.sub + "</div>" : "") +
          "</div>"
        );
      })
      .join("");
  }

  function renderChips(container, insights) {
    if (!container) return;
    container.innerHTML = insights
      .map(function (i) {
        var arrow = i.dir === "up" ? "↑" : i.dir === "down" ? "↓" : "→";
        return '<span class="chip ' + i.dir + '">' + arrow + " " + i.label + ": " + i.value + "</span>";
      })
      .join("");
  }

  function sparkline(canvas, series, color) {
    if (!canvas || !series || !series.length) return;
    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;
    var min = Math.min.apply(null, series);
    var max = Math.max.apply(null, series);
    var pad = (max - min) * 0.1 || 1;
    min -= pad;
    max += pad;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = color || "#3dff8f";
    ctx.lineWidth = 2;
    ctx.beginPath();
    series.forEach(function (v, i) {
      var x = (i / (series.length - 1)) * w;
      var y = h - ((v - min) / (max - min)) * h;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    var last = series[series.length - 1];
    var lx = w;
    var ly = h - ((last - min) / (max - min)) * h;
    ctx.fillStyle = color || "#3dff8f";
    ctx.beginPath();
    ctx.arc(lx, ly, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  function areaChart(canvas, labels, current, previous) {
    if (!canvas) return;
    if (typeof Chart === "undefined") return;
    new Chart(canvas, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Current 28d",
            data: current,
            borderColor: "#3dff8f",
            backgroundColor: "rgba(61,255,143,0.12)",
            fill: true,
            tension: 0.35,
            pointRadius: 4,
            pointBackgroundColor: "#3dff8f",
          },
          {
            label: "Previous 28d",
            data: previous,
            borderColor: "#4da3ff",
            backgroundColor: "rgba(77,163,255,0.08)",
            fill: true,
            tension: 0.35,
            pointRadius: 3,
            borderDash: [4, 4],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: "#7a8a9e", boxWidth: 12, font: { size: 11 } } },
        },
        scales: {
          x: { ticks: { color: "#7a8a9e", font: { size: 10 } }, grid: { color: "rgba(42,53,68,0.5)" } },
          y: {
            ticks: { color: "#7a8a9e", font: { size: 10 } },
            grid: { color: "rgba(42,53,68,0.5)" },
          },
        },
      },
    });
  }

  window.DashHelpers = {
    ringSvg: ringSvg,
    renderRings: renderRings,
    renderChips: renderChips,
    sparkline: sparkline,
    areaChart: areaChart,
    deltaClass: deltaClass,
  };
})();
