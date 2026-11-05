# TWS Digital — Valden-inspired website version

This static homepage follows the reference site's oversized hero, pill-shaped navigation and calls to action, rounded media, and editorial spacing while retaining TWS Digital's copy, project assets, fonts, and black/white/green palette.

## Run locally
Open `index.html` in a browser, or serve this directory with a static web server.

## Main files
- `index.html` — homepage structure and Tailwind utility classes
- `tailwind.input.css` — Tailwind CSS v4 entry point and TWS theme tokens
- `tailwind.css` — compiled, self-contained Tailwind and site stylesheet
- `valden-style.css` — detailed component styling and responsive art direction
- `valden-interactions.js` — accessible mobile navigation, scroll reveals, draggable work slider, and single-open FAQ behavior
- Existing portfolio pages and assets are retained from the supplied project.

## Rebuild Tailwind CSS
Run `npm install` once, then `npm run build:css` whenever you change Tailwind classes or source styles. Use `npm run watch:css` to rebuild while editing. The compiled `tailwind.css` is included, so opening `index.html` does not require a build step.

The page retains the supplied project content and makes no added claims about client results or pricing.
