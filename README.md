# Alrayhan Sales — نظام البيع والشراء لعطور الريحان

Sell & buy accounting system for Alrayhan Perfumes (two branches). Node.js 18+, no dependencies.

## Run in GitHub Codespaces
1. Click **Code → Codespaces → Create codespace on main**.
2. Wait for it to load. The server starts by itself and the app opens in a new browser tab.
   If the tab doesn't open: go to the **Ports** tab and click the globe icon next to port 3000.
3. To restart it manually, run `npm start` in the terminal.

## Run on a shop computer
1. Install Node.js 18+ (LTS) from https://nodejs.org.
2. Windows: double-click `alrayhan-sales/start.bat`. Other systems: run `alrayhan-sales/start.sh`.
3. Open http://localhost:3000

## First sign-in
- `master` / `master123` — full access (history, settings, users)
- `seller` / `1234` — sell & buy only

**Change both passwords right away in Settings → Users** — this repository is public.

The database is stored in `alrayhan-sales/data/` and is never uploaded to GitHub (see `.gitignore`).
See `alrayhan-sales/README.md` and the Arabic user manual PDF for details.
