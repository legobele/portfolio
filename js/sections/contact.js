/* contact.js — contact link cards. */

import { h, $, append, clear } from "../utils/dom.js";
import { CONTACTS } from "../config.js";
import { register } from "../registry.js";

function contactCard(c) {
  return h("a", { class: "contact-card", href: c.href, target: "_blank", rel: "noopener noreferrer" }, [
    h("span", { class: "contact-icon", html: c.icon, "aria-hidden": "true" }),
    h("span", null, [
      h("strong", { text: c.label }),
      h("small", { text: c.value }),
    ]),
  ]);
}

const module = {
  name: "contact",
  reducedMotionSafe: true,

  init(root) {
    const mount = $("[data-contact]", root);
    if (!mount) return;
    clear(mount);
    append(mount, CONTACTS.map(contactCard));
  },
};

register("contact", module);

export default module;
