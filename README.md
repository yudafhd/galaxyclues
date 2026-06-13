# Galaxy Clues Dino 3D

First-person 3D dino game scaffold built with Vite, React, Three.js, React Three Fiber, and drei.

## Run Locally

```sh
npm install
npm run dev
```

Open the local URL Vite prints, usually `http://localhost:5173/`.

Controls:

- Use `A` / `ArrowLeft` to move left.
- Use `D` / `ArrowRight` to move right.
- The camera follows behind the dino automatically.
- Meteors spawn from the front. Dodge them to keep the dino floating.
- Score increases by 1 for every meteor that passes the dino.
- Press `Space` to restart after a meteor hit.

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

## Render Check

```sh
npm run verify:render
```

This uses Playwright to capture desktop and mobile canvas screenshots and checks the rendered pixels.
