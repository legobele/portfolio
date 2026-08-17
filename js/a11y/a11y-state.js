/* a11y-state.js — single source of truth for accessibility settings.
   Defaults honour system preferences first, then user's saved choices override.
   Every setting is persisted to storage and mirrored onto <html> data-attributes. */

import { get, set, remove } from "../utils/storage.js";
import { register } from "../registry.js";

const STORAGE_KEY = "portfolio:a11y";

const DEFAULTS = {
  fontSize: "default",      // small | default | large | xlarge
  contrast: "auto",         // auto | high
  dyslexic: false,          // boolean — OpenDyslexic font
  motion: "auto",           // auto | reduced
  lineSpacing: 1,           // 1 | 2 | 3
  letterSpacing: 1,         // 1 | 2 | 3
  wordSpacing: 1,           // 1 | 2 | 3
  cvd: "none",              // none | protanopia | deuteranopia | tritanopia | grayscale
  focusLoud: false,         // louder focus outline
  glare: "none",            // none | dim | sepia
};

function systemPrefs() {
  const mq = (q) => {
    try { return window.matchMedia(q).matches; } catch { return false; }
  };
  return {
    motion: mq("(prefers-reduced-motion: reduce)") ? "reduced" : "auto",
    contrast: mq("(prefers-contrast: more)") ? "high" : "auto",
  };
}

let state = { ...DEFAULTS };

function readSaved() {
  const saved = get(STORAGE_KEY, {});
  return { ...DEFAULTS, ...saved };
}

function applyAttributes() {
  const root = document.documentElement;

  root.dataset.fontSize = state.fontSize;

  const effectiveContrast = state.contrast === "high"
    ? "high"
    : (state.contrast === "auto" ? systemPrefs().contrast : "auto");
  root.dataset.contrast = effectiveContrast;

  root.dataset.dyslexic = String(state.dyslexic);
  root.dataset.motion = state.motion === "auto" ? systemPrefs().motion : "reduced";
  root.dataset.spacingLine = String(state.lineSpacing);
  root.dataset.spacingLetter = String(state.letterSpacing);
  root.dataset.spacingWord = String(state.wordSpacing);
  root.dataset.cvd = state.cvd;
  root.dataset.focus = state.focusLoud ? "loud" : "default";
  root.dataset.glare = state.glare;
}

const subscribers = new Set();

const module = {
  name: "a11y-state",
  reducedMotionSafe: true,

  init() {
    state = { ...DEFAULTS, ...readSaved() };
    applyAttributes();
  },

  getState() {
    return { ...state };
  },

  set(key, value) {
    if (!(key in DEFAULTS)) return;
    state[key] = value;
    set(STORAGE_KEY, state);
    applyAttributes();
    for (const fn of subscribers) fn({ ...state });
  },

  setMany(patch) {
    for (const [k, v] of Object.entries(patch)) this.set(k, v);
  },

  reset() {
    state = { ...DEFAULTS };
    remove(STORAGE_KEY);
    applyAttributes();
    for (const fn of subscribers) fn({ ...state });
  },

  subscribe(fn) {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  },
};

register("a11y-state", module);

export default module;
