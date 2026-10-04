# Alrayhan Sales — نظام البيع والشراء لعطور الريحان

Local sales & purchases system with daily / weekly / monthly accounting history.

## Run
1. Install Node.js 18+ from https://nodejs.org (LTS).
2. Windows: double-click `start.bat`. Other systems: run `start.sh`.
3. Open http://localhost:3000

Default accounts (change them right away in Settings → Users):
- master / master123  — full access (history, settings, users)
- seller / 1234       — sell & buy only

## Structure
- `server.js` — backend (Node, no dependencies): auth, roles, storage, CSV export
- `public/` — frontend (HTML/CSS/JS, fonts, logo)
- `data/db.json` — database, created on first run
- `data/backups/` — automatic daily backups (last 60 kept)

Set a different port with the PORT environment variable.
See the Arabic user manual PDF for full instructions.
