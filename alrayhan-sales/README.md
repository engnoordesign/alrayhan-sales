# Alrayhan Sales — نظام البيع والشراء لعطور الريحان

Local sales & purchases system with daily / weekly / monthly accounting history.

## Run
1. Install Node.js 18+ from https://nodejs.org (LTS).
2. Windows: double-click `start.bat`. Other systems: run `start.sh`.
3. Open http://localhost:3000

First start: there are no default passwords. The server creates the `master` account and prints
its password once in the server window — write it down, sign in, and create sellers in Settings → Users.
Forgot it? Close the server, run `node server.js reset-password master`, start it again.

## Access levels
| Level      | Sell & buy | History | Reports | Settings | Exchange rate |
|------------|-----------|---------|---------|----------|---------------|
| Service    | yes       | yes (can delete) | yes | yes | can change |
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
- Settings → Users → **Edit** changes a user's display name, login username (including the master's own)
  and password. Usernames are English letters, numbers, `_ . -` (3–30), and must be unique.
- The last master account can't be deleted or downgraded.

## Service account (developer / maintenance)
A hidden account with every master power. Masters never see it in Settings → Users and can't edit,
delete or create one; it can only be made on the server:
- Docker: set `SERVICE_PASSWORD` (and optionally `SERVICE_USERNAME`, default `service`) in the environment,
  e.g. `SERVICE_PASSWORD='strong-password' docker compose up -d --build` — created on start if none exists.
- Or from the command line (creates it, or renames it / sets a new password):
  `node server.js service-account [username] [password]`
  (Docker: `docker compose run --rm sales node server.js service-account noor.dev`). Without a password one is generated and printed.

## Structure
- `server.js` — backend (Node, no dependencies): auth, roles, storage, CSV export
- `public/` — frontend (HTML/CSS/JS, fonts, logo)
- `data/db.json` — database, created on first run
- `data/backups/` — automatic daily backups (last 60 kept)

Set a different port with the PORT environment variable.
See the Arabic user manual PDF for full instructions.
