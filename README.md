# ☁️ Skybuddy

**A weather app with a memory.** Skybuddy remembers the cities you care about, greets you with your own local forecast the moment you open it, and quietly shifts from day to night right along with the sky outside your window.

**🔗 Live app:** [skybuddy-silk.vercel.app](https://skybuddy-silk.vercel.app/)
**📦 Repository:** [github.com/kulla-kukkai/skybuddy](https://github.com/kulla-kukkai/skybuddy)

---

## What is this?

Skybuddy is a single-page weather dashboard built for the JS3 *Examinerande projektarbete*. Open it and it immediately asks for your location, pulls live weather for wherever you are, and shows it inside a soft, glass-like card that changes color palette depending on whether it's day or night at that location — a small detail, but one that makes the app feel alive rather than static.

From there you can search any city in the world, preview its weather instantly, and save it to your own list with one tap. Saved cities live in a horizontally scrolling chip bar at the bottom of the screen, so switching between "how's the weather at home" and "how's the weather where my friend lives" takes exactly one click — no page reload, no waiting.

Every city also has its own detail page, reachable through routing, with a fuller picture: sunrise and sunset times, UV index, rain probability, and a 7-day forecast strip. It's the same weather engine underneath, just zoomed in.

## Screenshots

![Skybuddy on desktop and mobile](./screenshots.png)

## Features

- 📍 **Location-aware by default** — uses the browser's Geolocation API to show current weather with zero input required
- 🔍 **Instant city search** — type a city name and see live conditions immediately, with a friendly message if nothing matches
- ⭐ **Favorites, done right** — add or remove cities from your list from either page; everything is saved to `localStorage`, so your list survives a page reload, a closed tab, or a restarted laptop
- 🗺️ **Two-page routing** — a fast dashboard and a fuller detail view, connected with React Router, no reloads (see below)
- 🌗 **Day/night theming** — the entire color palette shifts based on the actual time of day *at the city you're viewing*, not your own local time
- 📅 **7-day forecast** with sunrise, sunset, UV index, and rain chance on each city's detail page
- 📱 **Fully responsive** — designed mobile-first with a glassmorphism aesthetic, tested on real devices, not just DevTools
- 🎨 **Hand-picked weather icons** replacing generic emoji, matched to the app's pastel color scheme
- 🧭 **Live URL for every city** — `/city/Sydney` is a real, shareable address, not just an in-memory state change

## Routing

Skybuddy uses three routes, all handled by `react-router-dom` with no full-page reloads between them:

| Route | Page | What it shows |
|---|---|---|
| `/` | `HomePage` | The dashboard — search bar, current weather (for whichever city or location is selected), and the horizontally scrolling row of saved-city chips |
| `/current` | `CityDetailPage` | Full detail view for your current geolocation — same layout as below, just without a city name in the URL |
| `/city/:cityName` | `CityDetailPage` | Full detail view for one specific saved or searched city: sunrise/sunset, UV index, rain chance, and the 7-day forecast strip |

`HomePage` and `CityDetailPage` are genuinely different views, not the same content duplicated: the dashboard is built for glancing quickly and switching cities fast, while the detail page is built for reading — one city, no distractions, plus the extra stats the dashboard deliberately leaves out. Both pull data through the same `useWeatherData` hook, so `/city/Sydney` and clicking the "Sydney" chip on `/` always agree with each other.

## Tech stack

| Layer | Choice |
|---|---|
| UI framework | React (Vite) |
| Routing | React Router |
| Shared state | React Context (`FavoritesContext`) |
| Data fetching | Custom hook (`useWeatherData`) + native `fetch` |
| Weather data | [Open-Meteo](https://open-meteo.com/) — Geocoding API + Forecast API (free, no API key required) |
| Persistence | `localStorage` |
| Styling | CSS Modules, no UI framework |
| Deployment | Vercel |

## Project structure

```
src/
├── assets/            # SVGs and other static assets
├── components/        # Presentational building blocks, one folder each
│   ├── CitySearchForm/
│   ├── CityChipList/
│   ├── WeatherDetail/
│   ├── ForecastList/
│   ├── ForecastItem/
│   └── CityStats/
├── context/
│   └── FavoritesContext.jsx   # global favorites state + localStorage sync
├── hooks/
│   └── useWeatherData.js      # shared fetch/loading/error logic for both pages
├── pages/
│   ├── HomePage.jsx           # the dashboard — search, current view, favorites
│   └── CityDetailPage.jsx     # full detail view for a single city
├── services/
│   └── weatherApi.js          # all Open-Meteo requests live here, isolated from UI
├── utils/
│   └── weatherCodes.js        # maps Open-Meteo's weather codes to text + icons
└── styles/
    └── theme.css               # shared CSS variables for both day and night themes

public/
└── weather-icons/       # weather icon set, served as static assets
```

The split isn't arbitrary: `services/` never touches state or JSX, `hooks/` never touches the DOM directly, and every visible piece of UI is a component with exactly one job. Two pages share the same data-fetching hook instead of duplicating logic — the difference between the dashboard and the detail view is purely what each one *does* with the same data.

## Architecture

![Architecture overview](./architecture.png)

Data flows one way, top to bottom: the API is only ever called from `services/weatherApi.js`, which knows nothing about React. `useWeatherData` wraps that service in state (`loading`, `error`, `city`) and is the only place that logic lives, shared by both pages. `FavoritesContext` runs independently alongside it, syncing to `localStorage` on every change — a deliberate separation between "the weather I'm currently looking at" (local to a page, via the hook) and "the cities I've saved" (global, via Context).

## User flow & error handling

![User flow and error handling](./user-flow.png)

Every error state shown to the user is deliberate, not a fallback for something that was missed:

| Situation | What the user sees |
|---|---|
| Search submitted empty | "Please enter a city name" |
| City not found | "We couldn't find a city called '...'" |
| API/network failure | "Can't reach the weather service right now." |
| Location permission denied | "Location access denied. Pick a saved city below instead." |
| Geolocation unsupported | "Geolocation is not supported on this device" |

A saved city can be removed from **two places**: the × that appears on hover over its chip on the dashboard, or the "Remove from the list" button on its own detail page — the second exists specifically because hover doesn't exist on touchscreens. The "+ Save" button follows the same logic in reverse: it only appears when the city currently being viewed *isn't* already saved, from either page, since both render the same `WeatherDetail` component.

## Getting started locally

You'll need [Node.js](https://nodejs.org/) installed. No API keys, no `.env` file, no backend — Open-Meteo is free and open.

```bash
# 1. Clone the repo
git clone https://github.com/kulla-kukkai/skybuddy.git
cd skybuddy

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
```

Then open the URL it prints (usually `http://localhost:5173`) in your browser. When the browser asks for location access, allowing it gets you the full experience — declining it still works fine, you just land in "pick a saved city" mode instead.

## How to try it out

A few things worth testing deliberately, since they're easy to miss on a quick glance:

- **Search for a city that doesn't exist** (try mashing the keyboard) — you should get a clear "couldn't find that" message, not a blank screen or a crash
- **Submit the search box empty** — it should tell you to type something rather than silently doing nothing
- **Add a city, then reload the whole page** — it should still be in your list
- **Add a city, then remove it** — from either the chip's hover-to-reveal × button, or the "Remove from the list" button on its detail page
- **Check a city on the opposite side of the world from you** — if it's nighttime there, the whole page should shift into its dark theme, independent of what time it actually is where you are
- **Shrink the browser window (or open it on a phone)** — layout, tap targets, and the forecast strip should all adapt cleanly

## Requirements checklist

**Godkänd (G)**

- [x] 5+ clearly scoped components, each with a single responsibility
- [x] Sensible folder structure separating components, pages, and helpers
- [x] Routing between 2+ views, no full page reloads (`react-router-dom`)
- [x] State shared across components via Context, cleanly separated from local form state
- [x] External API calls with loading and error handling
- [x] A form with validation and clear user feedback
- [x] Data persisted across page reloads (`localStorage`)
- [x] Clean, consistently named, committed code
- [x] Complete submission: repo, README, deployed link

**Väl godkänd (VG)** — all five extra criteria met:

- [x] **Extended error handling** — distinct empty states and network-failure messages, written in plain language rather than technical jargon
- [x] **Thoughtful architecture** — a shared custom hook (`useWeatherData`), reusable presentational components, and a hard line between data-fetching and rendering
- [x] **Responsive design** — verified on an actual phone, not only browser emulation (which, in one memorable debugging session, turned out to be lying to me)
- [x] **Extended functionality beyond the brief** — geolocation, a full favorites system, day/night theming, and sunrise/sunset/UV/rain-chance detail data
- [x] **A real commit history** — small, descriptive commits made throughout the week, not one dump at the end

## Credits

Weather data courtesy of [Open-Meteo](https://open-meteo.com/), free for non-commercial use, no API key required.

Weather icons from [Flaticon](https://www.flaticon.com/) — *[replace this line with the exact attribution text from your Flaticon download page, e.g. "Icons made by [Author Name] from www.flaticon.com"]*.

## A few honest limitations

- Reverse geocoding isn't implemented, so "current location" is labeled generically rather than with an actual city name
- No dedicated tests suite — testing was manual throughout, guided by the checklist above
- The 7-day forecast view is read-only; tapping into a specific day for deeper detail was prototyped during development but ultimately cut in favor of a simpler, calmer interface

---

Built solo over one very eventful week, with more `console.log` debugging sessions than I'd like to admit and at least one bug that turned out to be a missing `<meta>` tag.
