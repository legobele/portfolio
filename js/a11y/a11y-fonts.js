/* a11y-fonts.js — loads OpenDyslexic on demand when the dyslexic toggle flips.
   No CDN tag in the HTML — it's injected lazily so it never slows first paint. */

import a11yState from "./a11y-state.js";
import { register } from "../registry.js";

const OPEN_DYSLEXIC_CSS = "https://fonts.googleapis.com/css2?family=OpenDyslexic&display=swap";

let loaded = false;
let loading = null;

export function isLoaded() {
  return loaded;
}

export function ensureDyslexicFont() {
  if (loaded) return Promise.resolve();
  if (loading) return loading;

  loading = new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = OPEN_DYSLEXIC_CSS;
    link.onload = () => { loaded = true; resolve(); };
    link.onerror = () => reject(new Error("OpenDyslexic failed to load"));
    document.head.append(link);
  });

  return loading;
}

const module = {
  name: "a11y-fonts",
  reducedMotionSafe: true,

  init() {
    if (a11yState.getState().dyslexic) {
      ensureDyslexicFont().catch(() => {});
    }
    a11yState.subscribe((next) => {
      if (next.dyslexic) ensureDyslexicFont().catch(() => {});
    });
  },
};

register("a11y-fonts", module);

export default module;
