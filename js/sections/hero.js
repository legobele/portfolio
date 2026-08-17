/* hero.js — the typewriter eyebrow in the hero. cycles the taglines. */

import { $ } from "../utils/dom.js";
import a11yState from "../a11y/a11y-state.js";
import { register } from "../registry.js";

const TYPE_SPEED = 45;   // ms per char
const HOLD_MS = 2200;    // pause at full phrase
const DELETE_SPEED = 22; // ms per char while deleting

const module = {
  name: "typewriter",
  reducedMotionSafe: false,

  init(el) {
    if (a11yState.getState().motion === "reduced") {
      el.textContent = el.dataset.strings?.split(";;")[0] || el.textContent;
      return;
    }

    const phrases = (el.dataset.strings || "").split(";;").filter(Boolean);
    if (!phrases.length) return;

    let index = 0;
    let charIndex = 0;
    let deleting = false;

    const step = () => {
      const phrase = phrases[index];
      if (deleting) {
        charIndex -= 1;
        el.textContent = phrase.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          index = (index + 1) % phrases.length;
          setTimeout(step, 300);
        } else {
          setTimeout(step, DELETE_SPEED);
        }
      } else {
        charIndex += 1;
        el.textContent = phrase.slice(0, charIndex);
        if (charIndex === phrase.length) {
          setTimeout(() => {
            deleting = true;
            step();
          }, HOLD_MS);
        } else {
          setTimeout(step, TYPE_SPEED);
        }
      }
    };

    setTimeout(step, 600);
  },
};

register("typewriter", module);

export default module;
