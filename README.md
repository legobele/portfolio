# benj dev portfolio

The coding portfolio of **benj legobele** — "ungodly ai slop generator 3000". Zero build step, zero framework, exactly as convoluted as promised.

## ✨ features

- **One HTML file, ~19 JS modules.** Fully modular, no bundler, ES modules only.
- **Rainbow-everything.** Animated gradient text, aurora hero, per-card hues, rainbow cursor trail.
- **Embedded accessibility options** (the point, honestly):
  - font size scaling, high contrast, dyslexia-friendly font (OpenDyslexic, lazy-loaded)
  - reduced motion (honours system pref), line/letter/word spacing
  - color-vision filters (protanopia / deuteranopia / tritanopia / grayscale)
  - glare reduction, loud focus outlines
  - every control keyboard-reachable, screen-reader announcements, persisted to localStorage
- Scroll-spy nav, scroll-reveal, typewriter hero, mobile menu.

## 🏗 stack

- HTML + CSS (custom properties) + vanilla JS ES modules
- Hosted on GitHub Pages (branch-based deployment from `main`)

## 🚀 dev

ES modules won't run over `file://` — serve it:

```bash
npx serve
# or
python -m http.server 8080
```

## 🚢 deploy

```bash
git push origin main
```

Pages picks it up from the `main` branch automatically.

## 📚 for the AI agents

Read `AGENTS.md`. There are no human programmers here.

## ⚖️ license

© 2026 benj legobele. all vibes reserved. repo is public so the agents can read it.
