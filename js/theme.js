/* theme.js — rainbow / dark / light switcher. rainbow is the default vibe,
   dark/light are the sane options. persisted to storage. */

import { get, set } from "./utils/storage.js";
import { h, $, append } from "./utils/dom.js";
import { announce } from "./a11y/a11y-announce.js";
import { register } from "./registry.js";

const STORAGE_KEY = "portfolio:theme";
const THEMES = ["rainbow", "dark", "light"];
const LABELS = { rainbow: "🌈", dark: "🌙", light: "☀️" };

let theme = get(STORAGE_KEY, "rainbow");
if (!THEMES.includes(theme)) theme = "rainbow";

function apply(next) {
  theme = next;
  document.documentElement.dataset.theme = theme;
  set(STORAGE_KEY, theme);
}

function buildButton() {
  const btn = h("button", {
    class: "theme-toggle",
    type: "button",
    "aria-label": `Theme: ${theme}. click to change`,
    title: "change theme",
    text: LABELS[theme],
  });

  btn.addEventListener("click", () => {
    const next = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
    apply(next);
    btn.textContent = LABELS[next];
    btn.setAttribute("aria-label", `Theme: ${next}. click to change`);
    announce(`Theme changed to ${next}`);
  });

  return btn;
}

const module = {
  name: "theme",
  reducedMotionSafe: true,

  init(root) {
    apply(theme);

    const menu = $("#nav-menu", root);
    const btn = buildButton();
    if (menu) append(menu, h("li", null, [btn]));
  },
};

register("theme", module);

export default module;
