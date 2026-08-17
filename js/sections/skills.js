/* skills.js — rainbow progress bars. width driven by --level, animated by reveal.js. */

import { h, $, append, clear } from "../utils/dom.js";
import { SKILLS } from "../config.js";
import { register } from "../registry.js";

function skillItem(s) {
  return h("div", { class: "skill-item", dataset: { reveal: "" } }, [
    h("div", { class: "skill-head" }, [
      h("span", { class: "skill-name", text: s.name }),
      h("span", { class: "skill-pct", text: `${s.level}%` }),
    ]),
    h("div", { class: "skill-track" }, [
      h("div", { class: "skill-fill", style: { "--level": `${s.level}%` } }),
    ]),
  ]);
}

const module = {
  name: "skills",
  reducedMotionSafe: true,

  init(root) {
    const mount = $("[data-skills]", root);
    if (!mount) return;
    clear(mount);
    append(mount, SKILLS.map(skillItem));
  },
};

register("skills", module);

export default module;
