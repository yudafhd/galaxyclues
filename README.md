# Galaxy Clues Dino 3D

First-person 3D dino game scaffold built with Vite, React, Three.js, React Three Fiber, and drei.

## Run Locally

```sh
npm install
npm run dev
```

Open the local URL Vite prints, usually `http://localhost:5173/`.

Flow:

- Start on the home page with header, game grid, and footer.
- Click the Dino Meteor game card to open `/game/dino-meteor-dodge`.
- Press `Mulai` on the detail screen to load and start the game.

## Design System

- Tailwind CSS is integrated through the official Vite plugin.
- daisyUI is enabled as the Tailwind component system.
- The app uses a white-purple glossy visual layer on top of daisyUI light components.

Controls:

- Use `A` / `ArrowLeft` to move left.
- Use `D` / `ArrowRight` to move right.
- Use `W` / `ArrowUp` to move up.
- Use `S` / `ArrowDown` to move down.
- The camera follows behind the dino automatically.
- Meteors spawn from the front. Dodge them to keep the dino floating.
- Score increases by 1 for every meteor that passes the dino.
- Press `Space` to restart after a meteor hit.
- A loading overlay is shown while game assets download.

## Model Assets

Place Meshy or Blender-exported GLB files here:

- `public/models/dino.glb`
- `public/models/arena.glb`

If those files are missing, the app renders procedural fallback geometry so the scene still works.

## Build

```sh
npm run build
```

For Vercel, use:

- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
- `vercel.json` rewrites SPA routes such as `/game/dino-meteor-dodge` to `index.html`.

## Render Check

```sh
npm run verify:render
```

This uses Playwright to capture desktop and mobile canvas screenshots and checks the rendered pixels.
