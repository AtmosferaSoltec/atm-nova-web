# Nova

A React + TypeScript + Vite prototype for specialty healthcare workflows. Dentistry is the first module. All patient data is fictional; nothing connects to an API or database.

## Run locally

```sh
pnpm install
pnpm dev
```

```sh
pnpm lint
pnpm build
```

Read [AGENTS.md](AGENTS.md) before editing. Code and routes use English; UI copy uses Spanish.

## Demo access

The login offers direct entry for each role. Manual sign-in uses password `Nova2026!` and one of these fictional accounts:

| DNI      | Role               | Prototype scope                                          |
| -------- | ------------------ | -------------------------------------------------------- |
| 10000001 | Superadministrator | Platform overview, separate from clinical operations     |
| 10000002 | Owner              | Appointments, patients, estimates, organization branding |
| 10000003 | Administrator      | Appointments, patients, estimates, organization branding |
| 10000004 | Receptionist       | Appointments and basic patient information               |
| 10000005 | Cashier            | Estimates and simulated payments                         |
| 10000006 | Dentist            | Appointments, patients, dental chart, estimates          |

Role differences are visual prototype behavior, not authorization or a security boundary. No password recovery or registration is implemented.

## Structure

- `src/features/auth`: local demo login and fictional accounts.
- `src/features/dentistry`: dentistry screens, types, and mock data.
- `src/components/ui`: reusable styled controls using Radix Select/Dialog/Popover and React DayPicker.
- `src/components/common`: organization identity and Atmosfera developer credit.
- `src/config/brand.ts`: default organization identity and display role labels.
- `src/types`: shared application and UI types.

The initial agenda uses October 27, 2026 as a fixed demo date. Users can change dates, filter visits, create appointments, confirm visits, and mark attendance according to the selected role. Conflicting appointment times are rejected. The dental chart is a visual permanent-tooth prototype; it does not implement surface-level charting or clinical history. Estimates have predefined sample prices and simulated payments.

Organization name, local image preview, and palette can be changed from the owner or administrator identity screen. The new identity also appears on the login after logout. Branding resets on reload; uploaded images never leave the browser. Atmosfera assets were copied from the authorized ATM Pulso project.

Operational state is in memory and resets when the workspace is unmounted (including logout) or the page reloads. Dental chart changes are isolated by patient and persist while navigating within the active workspace. No browser storage is used. Future iterations should introduce a feature-owned state model when longer prototype workflows require it.

## Design direction

Warm ivory surfaces, forest-green accents, restrained typography, and an agenda-centered workspace. The clinic identity is independent of the developer credit. Fonts are loaded from Google Fonts with local sans-serif fallbacks; there are no API integrations.

Component references: [Radix Select](https://www.radix-ui.com/primitives/docs/components/select), [Radix Dialog](https://www.radix-ui.com/primitives/docs/components/dialog), and [React DayPicker](https://daypicker.dev/start).

## Repositories and local API scaffold

- Web remote: `git@github.com:AtmosferaSoltec/atm-nova-web.git`.
- API remote: `git@github.com:AtmosferaSoltec/atm-nova-api.git`.
- Local API folder: `../atm-nova-api` (Go + Gin, no endpoints).

The repositories are independent. The web does not call the API and does not
require it to run.

## Deployment

Production runs on the VPS at `https://nova.atmosferast.com`. Pushing commits to `main` deploys nothing. Only a push to `production` (after the commit is already in `main`) runs `.github/workflows/deploy.yml`: lint, build, a static nginx image published to GHCR, then `docker compose` on the server. The prototype has no runtime configuration, so there is no `.env`.

## Branches

Use only `main` for development and `production` for production releases.
