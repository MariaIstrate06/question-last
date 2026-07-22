# question-last

A one-way communicator — no backend, no database. Angular 20 + TypeScript,
deployed to GitHub Pages via GitHub Actions.

Live: https://mariaistrate06.github.io/question-last/

## Setup

Before the app works fully, fill in the placeholders in
`src/environments/environment.ts`:

- `emailjs.publicKey` / `serviceId` / `templateId` — from an
  [EmailJS](https://www.emailjs.com/) account with Gmail connected as the
  service, and a template exposing `button_clicked` and `timestamp`
  variables.
- `adminPin` — the PIN that gates the hidden `/ilovelips` admin page.

## Development

```bash
npm install
npm start          # ng serve, http://localhost:4200
npm run build       # production build to dist/question-last
npm test            # unit tests (Karma)
```

## Content data

All content (`ganduri`, `reels`, `muzica`, `locuri`) lives in
`public/data.json`, fetched client-side at runtime. New items can be added
either by editing that file directly, or through the hidden `/ilovelips`
admin page, which commits straight to `main` using a GitHub personal access
token entered fresh each session (never stored in code).

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with
`--base-href=/question-last/` and publishes to GitHub Pages via
`actions/deploy-pages`. GitHub Pages must be configured to build from GitHub
Actions (Settings → Pages → Source → GitHub Actions).
