/* chaos.js — renders "the chaos" honorable-mentions list. */

import { h, $, append, clear } from "../utils/dom.js";
import { CHAOS } from "../config.js";
import { register } from "../registry.js";

function chaosItem(c) {
  return h("li", { class: "chaos-item", dataset: { reveal: "" } }, [
    h("div", { class: "chaos-item-head" }, [
      h("span", { class: "chaos-item-name", text: c.name }),
      h("a", {
        class: "chaos-item-link",
        href: `https://github.com/legobele/${c.name}`,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": `open ${c.name} on github`,
        text: "↗",
      }),
    ]),
    h("p", { class: "chaos-item-desc", text: c.desc }),
  ]);
}

const module = {
  name: "chaos",
  reducedMotionSafe: true,

  init(root) {
    const mount = $("[data-chaos]", root);
    if (!mount) return;
    clear(mount);
    append(mount, CHAOS.map(chaosItem));
  },
};

register("chaos", module);

export default module;
