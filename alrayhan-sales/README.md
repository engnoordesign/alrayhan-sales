# Alrayhan Sales — نظام البيع والشراء لعطور الريحان

Local sales & purchases system with daily / weekly / monthly accounting history.

## Run
1. Install Node.js 18+ from https://nodejs.org (LTS).
2. Windows: double-click `start.bat`. Other systems: run `start.sh`.
3. Open http://localhost:3000

Default accounts (change them right away in Settings → Users):
- master / master123  — full access (sell & buy, history, reports, settings, users)
- seller / 1234       — sell & buy only

## Access levels
| Level      | Sell & buy | History | Reports | Settings | Exchange rate |
|------------|-----------|---------|---------|----------|---------------|
| Master     | yes       | yes (can delete) | yes | yes | can change |
| Supervisor | no        | yes (view only)  | yes | hidden | view only |
| Seller     | yes       | no      | no      | hidden   | view only |

- The master sets which branch each seller works in (Settings → Users → "Works in").
  A seller with a branch always records into that branch, whatever is picked at sign-in.
  "Any branch" lets the seller choose at sign-in.
- Reports tab: daily, weekly (Saturday–Friday) or monthly report for one branch or all,
  with totals, by-branch, by-user, by-day, top-selling items and every entry.
  Print it or save as PDF, or export that period to Excel.
- Changing a user's level or branch signs them out so the new access applies at once.

## Structure
- `server.js` — backend (Node, no dependencies): auth, roles, storage, CSV export
- `public/` — frontend (HTML/CSS/JS, fonts, logo)
- `data/db.json` — database, created on first run
- `data/backups/` — automatic daily backups (last 60 kept)

Set a different port with the PORT environment variable.
See the Arabic user manual PDF for full instructions.
