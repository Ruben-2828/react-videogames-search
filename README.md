# GameShelf - Videogame Browser

GameShelf is a React single-page application for browsing videogames. It connects to the RAWG public API, offers search and genre filtering, and provides detail pages for each title.

See a live demo here: [ruben-2828.github.io/react-videogames-search](https://ruben-2828.github.io/react-videogames-search/)

## Features

- Browse a list of games ordered by rating.
- Search and genre filtering trigger RAWG requests for fresh results.
- Detail pages with release info, rating, genres, and platforms.
- Responsive card and list layout.
- MVVM separation between Views, ViewModels, Models, and Services.

## Tech Stack

- React + Vite
- JavaScript (no TypeScript)
- react-router-dom
- Vitest + React Testing Library

## Requirements

- Node.js 18 or higher

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Ruben-2828/react-videogames-search.git
cd react-videogames-search
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```bash
VITE_RAWG_API_KEY=your_rawg_key
```

You can copy `.env.example` as a starting point.

## Run Locally

```bash
npm run dev
```

## Tests

```bash
npm run test
```

## Build

```bash
npm run build
```

## Technical Documentation

- Architecture and technical decisions: [docs/TECHNICAL.md](docs/TECHNICAL.md)
