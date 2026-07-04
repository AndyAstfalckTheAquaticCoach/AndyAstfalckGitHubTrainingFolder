# Performance Dashboard Mocks

Ten interactive **Performance tab** mockups for the athlete portal.

## Open at home

1. Pull branch `cursor/performance-dashboard-mocks-7491` (or merge PR #3)
2. Open **`performance-dashboard/index.html`** in your browser (double-click the file)

## Gallery sections

### Layout variations (V1–V5)
Same road-cycling athlete — pick a visual style (rings, sidebar, bento, timeline, minimal).

### Sport-specific dashboards (V6–V10)
Metrics tailored per athlete type (Section 11 per-sport rules):

| # | Athlete | Hero metrics | De-emphasised |
|---|---------|--------------|---------------|
| **V6** | Road runner | Threshold pace, AeT pace, LTHR, weekly km | Power curve |
| **V7** | Trail runner | Uphill AeT, vert/week, flat threshold | Track 5k speed |
| **V8** | Gravel cyclist | FTP, 2h sustainable W, durability, vert | 5s sprint |
| **V9** | Triathlete | Swim CSS, bike FTP, run pace + 3-column detail | Single-sport FTP only |
| **V10** | Road cyclist | FTP, AeT, AnT, VO₂/W′ + coach summary | — |

## Files

- `index.html` — gallery + full-screen viewer (← → to compare)
- `mock-profiles.js` — sport-specific mock data
- `sport-dashboard.js` — shared renderer for V6–V10
- `v1`–`v10` — individual dashboards

## Local server (optional)

```bash
cd performance-dashboard
python3 -m http.server 8080
# http://localhost:8080
```
