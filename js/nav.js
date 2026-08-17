/* nav.js — mobile menu toggle + scroll-spy active-section highlighting. */

import { $, $$, h } from "./utils/dom.js";
import { announce } from "./a11y/a11y-announce.js";
import { register } from "./registry.js";

const module = {
  name: "nav",
  reducedMotionSafe: true,

  init(root) {
    const toggle = $(".nav-toggle", root);
    const menu = $("#nav-menu", root);
    const links = $$(".nav-menu a", root);

    if (toggle && menu) {
      toggle.addEventListener("click", () => {
        const open = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!open));
        menu.dataset.open = String(!open);
        announce(open ? "Menu closed" : "Menu opened");
      });

      links.forEach((a) => a.addEventListener("click", () => {
        if (menu.dataset.open === "true") {
          toggle.setAttribute("aria-expanded", "false");
          menu.dataset.open = "false";
        }
      }));
    }

    // scroll-spy
    const sections = links
      .map((a) => $(a.getAttribute("href")))
      .filter(Boolean);

    if (!("IntersectionObserver" in window) || !sections.length) return;

    const spy = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = `#${entry.target.id}`;
        links.forEach((a) => {
          const current = a.getAttribute("href") === id;
          if (current) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      }
    }, { rootMargin: "-40% 0px -55% 0px" });

    sections.forEach((s) => spy.observe(s));
  },
};

register("nav", module);

export default module;
