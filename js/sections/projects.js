/* projects.js — renders the project cards from config.js.
   Each card gets a data-reveal for scroll-in, and its own hue. */

import { h, $, append, clear } from "../utils/dom.js";
import { PROJECTS } from "../config.js";
import { register } from "../registry.js";

function projectCard(p) {
  const hue = p.hue;
  const tagHtml = p.tags.map((t, i) =>
    h("span", { class: "tag", dataset: { hue: String((i % 9) + 1) }, text: t })
  );

  const links = [
    h("a", { href: p.url, target: "_blank", rel: "noopener noreferrer", text: "code →" }),
  ];
  if (p.live) {
    links.push(h("a", { href: p.live, target: "_blank", rel: "noopener noreferrer", text: "live →" }));
  }

  const stats = Object.entries(p.stats).map(([k, v]) =>
    h("span", { title: k, html: `⚑ ${v} ${k}` })
  );

  return h("article", { class: "project-card", dataset: { reveal: "" }, style: { "--card-hue": hue } }, [
    h("div", { class: "project-card-top" }, [
      h("h3", { class: "project-title" }, [
        h("a", { href: p.url, target: "_blank", rel: "noopener noreferrer", text: p.name }),
      ]),
      h("span", { class: "project-icon", html: p.icon, "aria-hidden": "true" }),
    ]),
    h("p", { class: "project-desc", text: p.description }),
    h("div", { class: "project-tags" }, tagHtml),
    h("div", { class: "project-stats" }, stats),
    h("div", { class: "project-links" }, links),
  ]);
}

const module = {
  name: "projects",
  reducedMotionSafe: true,

  init(root) {
    const mount = $("[data-projects]", root);
    if (!mount) return;
    clear(mount);
    append(mount, PROJECTS.map(projectCard));
  },
};

register("projects", module);

export default module;
