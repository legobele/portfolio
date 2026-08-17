/* rainbow-fx.js — the animated aurora + shimmer layers. pure decoration,
   fully disabled when motion is reduced. */

import { h, $, append } from "../utils/dom.js";
import a11yState from "../a11y/a11y-state.js";
import { register } from "../registry.js";

const module = {
  name: "rainbow-fx",
  reducedMotionSafe: false,

  init(root) {
    if (a11yState.getState().motion === "reduced") return;

    const hero = $(".hero", root) || $("[data-module='hero']");
    if (!hero) return;

    // animated aurora blob behind the hero content
    const aurora = h("div", {
      class: "aurora",
      "aria-hidden": "true",
      style: { position: "absolute", inset: "0", zIndex: "0", pointerEvents: "none" },
    });
    const style = document.createElement("style");
    style.textContent = `
      .aurora {
        background:
          radial-gradient(420px 260px at 30% 30%, rgba(191,90,242,0.35), transparent 65%),
          radial-gradient(420px 260px at 70% 20%, rgba(10,132,255,0.30), transparent 65%),
          radial-gradient(420px 260px at 55% 70%, rgba(48,213,200,0.28), transparent 65%),
          radial-gradient(420px 260px at 20% 75%, rgba(255,45,146,0.26), transparent 65%);
        filter: blur(6px);
        opacity: 0.7;
        animation: aurora-drift 14s ease-in-out infinite alternate;
      }
      @keyframes aurora-drift {
        0%   { transform: translate3d(-3%, -2%, 0) scale(1);   filter: hue-rotate(0deg) blur(6px); }
        50%  { transform: translate3d(4%, 3%, 0)  scale(1.15); filter: hue-rotate(40deg) blur(8px); }
        100% { transform: translate3d(-2%, 1%, 0) scale(1.05); filter: hue-rotate(0deg) blur(6px); }
      }
    `;
    document.head.append(style);
    append(hero, aurora);
  },
};

register("rainbow-fx", module);

export default module;
