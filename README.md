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

## Run with Docker (VPS)
```sh
git clone https://github.com/engnoordesign/alrayhan-sales.git && cd alrayhan-sales
docker compose up -d --build          # start (restarts by itself after a reboot)
docker compose logs -f                # view logs
git pull && docker compose up -d --build   # update to the latest code
```
- Opens on port 3000. To use another port: `SALES_PORT=3100 docker compose up -d`.
- The database and daily backups are kept in the Docker volume `alrayhan-sales-data`, so they survive updates and rebuilds.
- Copy the database out for safekeeping: `docker cp alrayhan-sales:/app/data ./sales-backup`

## Install as an app (phone & computer)
Open the system in the browser and press **تثبيت التطبيق / Install app** (on the sign-in page, or the ⬇ icon at the top).
- **Android / Chrome / Edge on a computer:** the browser shows its install window → press Install. The app gets its own icon and window.
- **iPhone / iPad (Safari):** Share ⎋ → Add to Home Screen.
- Full install needs a secure **https** link (the VPS behind Caddy/nginx) or `localhost`. On a plain `http://192.168…` shop-network address, iPhone still works; on Chrome use menu ⋮ → Cast, save and share → Create shortcut.
- Sales data is never stored on the phone — it always comes live from the server.

## First sign-in
- `master` / `master123` — full access (history, settings, users)
- `seller` / `1234` — sell & buy only

**Change both passwords right away in Settings → Users** — this repository is public.

The database is stored in `alrayhan-sales/data/` and is never uploaded to GitHub (see `.gitignore`).
See `alrayhan-sales/README.md` and the Arabic user manual PDF for details.
