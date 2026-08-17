/* config.js — all site data lives here. change a project without touching HTML. */

export const SITE = {
  name: "benj",
  tagline: "ungodly ai slop generator 3000",
  handle: "legobele",
  github: "https://github.com/legobele",
  year: new Date().getFullYear(),
};

const RAINBOW = [
  "var(--rainbow-red)",
  "var(--rainbow-orange)",
  "var(--rainbow-yellow)",
  "var(--rainbow-green)",
  "var(--rainbow-teal)",
  "var(--rainbow-blue)",
  "var(--rainbow-indigo)",
  "var(--rainbow-violet)",
  "var(--rainbow-pink)",
];

export const PROJECTS = [
  {
    name: "nivelato",
    tagline: "laser-measurement field tool for glass techs",
    icon: "📏",
    hue: RAINBOW[0],
    url: "https://github.com/legobele/nivelato",
    live: "https://legobele.github.io/nivelato/",
    description:
      "Field measurement tool for glass shop technicians in Puerto Rico. Calculates out-of-squareness (desnivel / descuadre) for door and window openings from laser measurements, then visualizes the deformed opening on an interactive canvas with deviation arrows.",
    tags: ["HTML", "CSS", "JS", "Firebase", "GitHub Pages"],
    stats: { commits: "420", stars: "1" },
  },
  {
    name: "pi-self-improve",
    tagline: "a coding agent toolkit that trains itself",
    icon: "🤖",
    hue: RAINBOW[4],
    url: "https://github.com/legobele/pi-self-improve",
    live: null,
    description:
      "Fork of the Pi agent harness (unified LLM API, agent loop, TUI, coding agent CLI) retrofitted into a self-improving agent: it detects its own repeated failures and requests finetunes of itself. TypeScript monorepo, 5,667 commits and counting.",
    tags: ["TypeScript", "monorepo", "LLM", "agents", "self-improvement"],
    stats: { commits: "5,667", stars: "0" },
  },
  {
    name: "qgi-platform",
    tagline: "one Firebase app for the whole glass shop",
    icon: "🪟",
    hue: RAINBOW[8],
    url: "https://github.com/legobele/qgi-platform",
    live: null,
    description:
      "QGI Unified Platform — a single Firebase app running the glass shop: customer kiosk, order tracking, admin dashboard, catalog editor and install coordinator. Built with Vite + React + Firestore. Production business software, prompt-cooked.",
    tags: ["Vite", "React", "Firestore", "Firebase", "kiosk"],
    stats: { commits: "5", stars: "0" },
  },
];

export const SKILLS = [
  { name: "prompting AI into production software", level: 100 },
  { name: "vanilla html/css/js", level: 95 },
  { name: "react + vite", level: 82 },
  { name: "firebase / firestore", level: 88 },
  { name: "local LLMs & finetunes", level: 85 },
  { name: "python", level: 78 },
  { name: "c / c++", level: 70 },
  { name: "windows sysadmin chaos", level: 92 },
];

export const CHAOS = [
  { name: "qgi-ios5-cursed", desc: "QGI Platform, skeuomorphically tortured back to 2011. iOS 5 skin over the glass shop app. iGlass edition. probably a war crime.", hue: RAINBOW[1] },
  { name: "unsloth", desc: "fork of the local model training UI, because the installer couldn't find an Intel Arc GPU to save its life.", hue: RAINBOW[8] },
  { name: "HAM", desc: "Hierarchical Attention Memory — a 4-layer summarization engine for agentic context. self-describing AI memory, done wrong enough to work.", hue: RAINBOW[5] },
  { name: "ram-snapshots", desc: "periodic system memory snapshots. for the green squares.", hue: RAINBOW[4] },
  { name: "lumina", desc: "frontend for your LM Studio LLMs. made fully by Kimi K2.5 as of first commit.", hue: RAINBOW[2] },
  { name: "benjs-status", desc: "hellish tool thing i made for no reason.", hue: RAINBOW[6] },
  { name: "what-window-is-benj-in", desc: "the world's stupidest tool. a frontend for screenshotting everything i do, i guess??", hue: RAINBOW[0] },
  { name: "desktop-t1sm420", desc: "agentic PC command server named after my own machine, because why not.", hue: RAINBOW[7] },
  { name: "hellish-ai-vs-code-clone-thingy", desc: "an AI code editor clone injected into anything with an XSS hole. yes this is as bad an idea as it sounds.", hue: RAINBOW[3] },
  { name: "nivelato-staging", desc: "staging repo for nivelato. push here before prod. the software engineering way.", hue: RAINBOW[0] },
];

export const CONTACTS = [
  { label: "github", value: "github.com/legobele", href: "https://github.com/legobele", icon: "🐙" },
  { label: "the live site", value: "legobele.github.io", href: "https://legobele.github.io/", icon: "🌐" },
];

export { RAINBOW };
