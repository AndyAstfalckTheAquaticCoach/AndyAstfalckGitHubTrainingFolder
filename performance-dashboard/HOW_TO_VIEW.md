# How to view the Performance dashboard mocks (at home)

## Step 1 — Get the files on your computer

```bash
git fetch origin
git checkout cursor/performance-dashboard-mocks-7491
```

Or merge Pull Request #4 on GitHub, then pull `main`.

## Step 2 — Open in your browser

1. Open your project folder in Finder (Mac) or File Explorer (Windows)
2. Go into the **`performance-dashboard`** folder
Then open either:
- **`index.html`** — 20 full dashboard layouts
- **`components/index.html`** — 6 ring + 6 chart + 6 viz styles to mix per metric

It should open in Chrome, Safari, or Edge.

## Step 3 — Browse

- You will see **20 tiles** in three sections
- **Click a tile** for full-screen preview
- Use **← →** arrow keys or Prev/Next to compare
- Press **Esc** to close

## If double-click does not work

Some browsers block charts when opening files directly. Run a tiny local server:

```bash
cd performance-dashboard
python3 -m http.server 8080
```

Then open: **http://localhost:8080**

## Quick picks when you review later

| If your athlete is… | Start with |
|---------------------|------------|
| Road cyclist | V1, V10, V17 |
| Runner | V6, V11 |
| Trail / ultra | V7, V15 |
| Gravel | V8, V19 |
| Triathlete | V9, V16 |
| Swim-only | V12 |
| Rowing / SkiErg | V13 |
| Duathlon | V14 |
| One portal, many sports | **V18** (sport switcher tabs) |
| Mobile app feel | V5, V11, **V20** |

No rush — pick layout and sport aspects separately when you are ready.
