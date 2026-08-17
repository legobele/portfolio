/* main.js — the bootstrap. import order is load-bearing:
   1. a11y-state first so every later module sees correct settings
   2. standalone modules (no DOM node) init explicitly
   3. everything else boots via the registry in DOM order */

import a11yState from "./a11y/a11y-state.js";
import a11yAnnounce from "./a11y/a11y-announce.js";
import a11yFonts from "./a11y/a11y-fonts.js";
import a11yUI from "./a11y/a11y-ui.js";
import theme from "./theme.js";
import reveal from "./effects/reveal.js";
import rainbowFx from "./effects/rainbow-fx.js";
import cursor from "./effects/cursor.js";
import { boot } from "./registry.js";

// order-critical: accessibility state first
a11yState.init();
a11yAnnounce.init(document);

// standalone modules (not attached to a data-module node)
a11yFonts.init(document);
theme.init(document);
reveal.init(document);
rainbowFx.init(document);
cursor.init(document);

// side-effect imports that self-register
import "./nav.js";
import "./sections/hero.js";
import "./sections/projects.js";
import "./sections/about.js";
import "./sections/skills.js";
import "./sections/chaos.js";
import "./sections/contact.js";

// a11y-ui binds to its node via the boot loop below (data-module="a11y")
void a11yUI;

document.addEventListener("DOMContentLoaded", () => {
  boot();
});
