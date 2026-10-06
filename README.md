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
- Listens on `127.0.0.1:3000` only — put Caddy/nginx in front for HTTPS (e.g. Caddyfile: `sales.example.com { reverse_proxy 127.0.0.1:3000 }`). Another port: `SALES_PORT=3100 docker compose up -d`.
- The database and daily backups are kept in the Docker volume `alrayhan-sales-data`, so they survive updates and rebuilds.
- Copy the database out for safekeeping: `docker cp alrayhan-sales:/app/data ./sales-backup`

## Install as an app (phone & computer)
Open the system in the browser and press **تثبيت التطبيق / Install app** (on the sign-in page, or the ⬇ icon at the top).
- **Android / Chrome / Edge on a computer:** the browser shows its install window → press Install. The app gets its own icon and window.
- **iPhone / iPad (Safari):** Share ⎋ → Add to Home Screen.
- Full install needs a secure **https** link (the VPS behind Caddy/nginx) or `localhost`. On a plain `http://192.168…` shop-network address, iPhone still works; on Chrome use menu ⋮ → Cast, save and share → Create shortcut.
- Sales data is never stored on the phone — it always comes live from the server.

## First sign-in
There are **no default passwords**. On the very first start the server creates the `master` account and prints its password once in the log:
```sh
docker compose logs sales | grep -A3 "first sign-in"      # Docker
```
(On a shop computer it appears in the server window.) You can choose it instead with `ADMIN_PASSWORD='your-strong-password' docker compose up -d --build` on the first start.
Then create the sellers and supervisors in **Settings → Users**. Passwords need 8+ characters and can't be common ones.

**Forgot a password?**
```sh
docker compose stop
docker compose run --rm sales node server.js reset-password master   # prints a new password
docker compose start
```
On a shop computer: close the server, run `node server.js reset-password master` in the `alrayhan-sales` folder, start it again.

## Security
- Login is limited (8 wrong tries per device, 15 per username, per 10 minutes); passwords are stored as scrypt hashes.
- Sessions use HttpOnly + SameSite=Strict cookies (Secure over HTTPS); cross-site requests are rejected.
- Strict browser security headers (CSP, no framing, no sniffing); Excel-formula injection is blocked in CSV exports.
- The Docker container runs as a non-root user with a read-only filesystem and no extra privileges.

The database is stored in `alrayhan-sales/data/` and is never uploaded to GitHub (see `.gitignore`).
See `alrayhan-sales/README.md` and the Arabic user manual PDF for details.
