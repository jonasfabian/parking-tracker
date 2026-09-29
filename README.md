# Zurich Parking Tracker

Live availability of the public car parks in Zurich on one map.

Status: rebuild in progress.

<!-- Add a GIF and the live link here once the MVP is deployed. -->

## How it works

<!-- Add a small diagram: feed, core, UI. -->

The app reads the live feed of the Parkleitsystem Stadt Zürich, turns it into a clean model in a pure core module and shows it as a list and a map.

## Getting started

```sh
npm install
npm run dev
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the local dev server |
| `npm test` | Runs all tests once |
| `npm run test:watch` | Runs tests on every change |
| `npm run lint` | Checks the code style |
| `npm run typecheck` | Checks the types |
| `npm run build` | Builds the production version |

## Project structure

```
src/core     pure domain logic, fully tested
src/data     fetching, caching, error handling
src/ui       map, list, detail view
tests        tests and saved feed snapshots
docs         decisions and their reasons
```

## Decisions

See [docs/decisions](docs/decisions).

## Data

Parkleitsystem Stadt Zürich, published under CC0.
