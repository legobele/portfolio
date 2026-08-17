/* reveal.js — scroll-reveal via IntersectionObserver. respects reduced motion
   (a11y.css forces opacity 1 when data-motion="reduced", and we skip observing).
   Uses a MutationObserver so nodes rendered by section modules post-boot are picked up. */

import a11yState from "../a11y/a11y-state.js";
import { register } from "../registry.js";

const module = {
  name: "reveal",
  reducedMotionSafe: true,

  init() {
    if (a11yState.getState().motion === "reduced") return;

    if (!("IntersectionObserver" in window)) {
      // no IO support: just reveal everything
      const flip = () => {
        document.querySelectorAll("[data-reveal]").forEach((el) => {
          el.dataset.revealed = "true";
        });
      };
      new MutationObserver(flip).observe(document.body, { childList: true, subtree: true });
      flip();
      return;
    }

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.dataset.revealed = "true";
          io.unobserve(entry.target);
        }
      }
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    const scan = (root) => {
      for (const el of root.querySelectorAll("[data-reveal]:not([data-revealed])")) {
        io.observe(el);
      }
    };

    // initial scan + watch for dynamically rendered sections
    scan(document);
    new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) scan(node);
        }
      }
    }).observe(document.body, { childList: true, subtree: true });
  },
};

register("reveal", module);

export default module;
