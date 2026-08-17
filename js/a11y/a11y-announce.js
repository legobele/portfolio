/* a11y-announce.js — screen-reader live region. polite, atomic, non-throttled. */

import { $ } from "../utils/dom.js";
import { register } from "../registry.js";

let region = null;
let timer = null;

function ensureRegion() {
  if (region) return region;
  region = document.getElementById("a11y-announcer");
  if (!region) {
    region = document.createElement("div");
    region.id = "a11y-announcer";
    region.className = "sr-only";
    region.setAttribute("role", "status");
    region.setAttribute("aria-live", "polite");
    region.setAttribute("aria-atomic", "true");
    document.body.append(region);
  }
  return region;
}

/** announce("...") — voices changes to screen readers without being throttled away */
export function announce(message, delay = 50) {
  ensureRegion();
  clearTimeout(timer);
  timer = setTimeout(() => {
    region.textContent = "";
    // force a reflow so the same message re-announces on repeat
    void region.offsetHeight;
    region.textContent = message;
  }, delay);
}

const module = {
  name: "a11y-announce",
  reducedMotionSafe: true,
  init() {
    ensureRegion();
  },
};

register("a11y-announce", module);

export default module;
