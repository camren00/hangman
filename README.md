# Hangman

> A friendly, responsive hangman word game built with React.

![Hangman game preview](src/assets/hero.png)

## About

Hangman is a small React game where you reveal a hidden word one letter at a time. Players have six incorrect guesses before the illustrated hangman is complete. A result dialog announces a win or loss, and **New game** starts a fresh round.

This project demonstrates the React principles from chapter 2: component-based UI, props, state with `useState`, derived values, event handlers, and conditional rendering.

## Features

- Seven local PNG hangman illustrations, from zero misses to game over
- Clickable A-Z keyboard with used-letter states
- Hidden-word display that reveals correct guesses
- Miss counter and lives remaining indicator
- Win and loss modal with the answer shown after a loss
- New game button available during every round
- Responsive layout for desktop and mobile
- Production Docker image served by Nginx

## Run locally

### Prerequisites

- Node.js 20+
- npm

### Install and start

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create the production bundle |
| `npm run preview` | Preview the production bundle locally |
| `npm run lint` | Run Oxlint |

## Run with Docker

Build and run the production image:

```bash
docker build -t hangman .
docker run --rm -p 8080:80 hangman
```

Visit [http://localhost:8080](http://localhost:8080).

## Project structure

```text
src/
├── App.jsx       # Game state and reusable UI components
├── App.css       # Game layout and responsive styles
├── index.css     # Global styles
└── assets/       # Project assets
public/
└── hangman-stage-*.png  # Seven hangman status illustrations
```

## How to play

1. Select a letter from the on-screen keyboard.
2. Correct letters appear in the word.
3. Each incorrect letter uses one of six lives.
4. Reveal the whole word to win, or run out of lives and try again.

## Technology

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Nginx](https://nginx.org/) (Docker production server)
