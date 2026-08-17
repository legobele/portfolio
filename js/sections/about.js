/* about.js — tints each "the bit" card with a rainbow hue. light touch. */

import { $$ } from "../utils/dom.js";
import { RAINBOW } from "../config.js";
import { register } from "../registry.js";

const module = {
  name: "about",
  reducedMotionSafe: true,

  init(root) {
    const cards = $$(".about-card", root);
    cards.forEach((card, i) => {
      card.style.setProperty("--card-hue", RAINBOW[i % RAINBOW.length]);
      card.dataset.reveal = "";
    });
  },
};

register("about", module);

export default module;
