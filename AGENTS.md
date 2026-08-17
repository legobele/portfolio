# AGENTS.md

This repo is maintained exclusively by AI agents. There are no human programmers. Plan accordingly.

## What this is

`benj legobele`'s coding portfolio, served as a static site on GitHub Pages. Zero build step, zero framework, zero bundler. It is a single `index.html` wired to ~19 JavaScript ES modules and 6 stylesheets, because modular was requested and consequences were accepted.

## Repository layout

```
index.html          — the only page. all sections live here as skeletons.
css/
  tokens.css        — rainbow design tokens (colors, fonts, spacing, themes)
  base.css          — layout primitives, header/nav, footer
  components.css    — buttons, cards, tags, skills, chaos, hero, theme toggle
  sections.css      — (unused; components.css carries sections. remove if you like)
  a11y.css          — every accessibility mode, driven by <html> data-attributes
  responsive.css    — breakpoints + the floating a11y widget + reveal styles
js/
  main.js           — bootstrap. IMPORT ORDER IS LOAD-BEARING (see below)
  config.js         — ALL site data: projects, skills, chaos, contacts. edit content here.
  registry.js       — modules register here; boot() runs them in DOM order
  utils/dom.js      — h() element builder + helpers. NO innerHTML, ever.
  utils/storage.js  — localStorage wrapper (private-mode safe)
  a11y/a11y-state.js    — single source of truth for a11y settings (data-attrs on <html>)
  a11y/a11y-ui.js       — builds the accessibility panel + floating button + focus trap
  a11y/a11y-announce.js — screen-reader live region
  a11y/a11y-fonts.js    — lazy-loads OpenDyslexic when the toggle flips
  sections/*.js     — hero(typewriter), projects, about, skills, chaos, contact renderers
  effects/reveal.js     — scroll-reveal (MutationObserver-aware, reduced-motion safe)
  effects/rainbow-fx.js — animated hero aurora
  effects/cursor.js     — rainbow cursor trail (disabled under reduced motion)
  nav.js            — mobile menu + scroll-spy
  theme.js          — rainbow/dark/light switcher
```

## Hard rules

1. **No build step.** No bundler, no npm, no TypeScript. ES modules (`<script type="module">`) only. If a change requires a build tool, you have already failed.
2. **No `innerHTML`.** Use `h()` from `js/utils/dom.js` (or DOM APIs). The owner has opinions about 2015-era DOM code.
3. **Module contracts:**
   - Each module calls `register("name", moduleObject)` in `js/registry.js`.
   - `moduleObject.init(el, context)` — `el` is the `[data-module="name"]` node.
   - `reducedMotionSafe: false` modules are skipped when the user enabled reduced motion. Use this for decorative effects (cursor, aurora, typewriter).
   - Standalone modules (no DOM node) are initialized explicitly in `main.js` — **do not rely on the boot loop for them.**
4. **A11y is a requirement, not a feature.** The a11y system is THE point. Preserve it:
   - Every new control in `a11y-ui.js` must be keyboard-reachable and labelled (`aria-label` / `<label for>`).
   - Every new decorative animation must respect reduced motion (either `reducedMotionSafe: false` or gated on `a11yState.getState().motion`).
   - The a11y panel must never be broken by a "quick" change elsewhere. If you touch `css/a11y.css` or `js/a11y/*`, verify all modes still apply: font size, high contrast, dyslexia font, motion, spacing, CVD filters, glare.
5. **Content lives in `js/config.js`.** Projects, skills, chaos items, contacts. Do not hardcode content in HTML or section modules.
6. **Stick to the existing style.** ES modules, no semicolons omitted, comments explaining WHY, `h()` for markup, data-attributes for state, CSS custom properties for theming. Match the vibe.
7. **Keep the `index.html` skeletons semantic.** Sections should degrade gracefully if a module fails — meaningful headings and text stay in the HTML, modules only enhance.

## Working with the a11y system

- State lives in `js/a11y/a11y-state.js`, persisted under `portfolio:a11y` in localStorage, mirrored to `<html>` data-attributes: `data-font-size`, `data-contrast`, `data-dyslexic`, `data-motion`, `data-spacing-line/letter/word`, `data-cvd`, `data-focus`, `data-glare`.
- CSS overrides for every mode are in `css/a11y.css`.
- System preferences (`prefers-reduced-motion`, `prefers-contrast`, `prefers-reduced-transparency`) are honoured as defaults unless the user overrides them.
- The panel UI is built entirely in JS (`js/a11y/a11y-ui.js`) — the HTML only has the floating button + empty panel container. If you move the panel, keep `aria-controls`/`aria-expanded` wiring intact.

## Deploy

```bash
git push origin main   # Pages deploys automatically from the main branch
```

GH Pages serves `index.html` from the repo root (branch-based deployment, no workflow file). All assets are referenced with relative paths, so the site works from `/portfolio/` on Pages. If you add new CSS/JS files, reference them with relative paths from `index.html`.

## Verification checklist before committing

- [ ] `gh`-free sanity check: open `index.html` over a local server (`npx serve` or `python -m http.server`) — ES modules break over `file://`, so test over HTTP.
- [ ] Every section renders (hero, projects, about, skills, chaos, contact).
- [ ] A11y panel: open, toggle every control, confirm `<html>` data-attributes change, reload, confirm persistence.
- [ ] Toggle dyslexic font — confirm OpenDyslexic loads.
- [ ] Enable reduced motion — confirm typewriter stops, reveal/cursor/aurora disabled, page still fully readable.
- [ ] Keyboard-only: Tab through nav, cards, links, a11y panel; Esc closes the panel.
