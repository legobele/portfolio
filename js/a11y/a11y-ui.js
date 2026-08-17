/* a11y-ui.js — builds the whole accessibility options panel + floating button.
   Keyboard: Esc closes, focus trapped while open, every control is labelled. */

import { h, $, append, clear } from "../utils/dom.js";
import a11yState from "./a11y-state.js";
import { announce } from "./a11y-announce.js";
import { register } from "../registry.js";

function labelledSelect({ label, options, value, onChange, announceMsg }) {
  const id = `a11y-sel-${Math.random().toString(36).slice(2, 7)}`;
  const select = h("select", {
    id,
    "aria-label": label,
    onChange: (e) => {
      onChange(e.target.value);
      if (announceMsg) announce(`${label}: ${e.target.selectedOptions[0].textContent}`);
    },
  }, options.map((o) => h("option", { value: o.value, ...(o.value === value ? { selected: true } : {}) }, [o.label])));

  return h("div", { class: "a11y-row" }, [
    h("label", { for: id, text: label }),
    select,
  ]);
}

function labelledSwitch({ label, checked, onChange, announceMsg }) {
  const id = `a11y-sw-${Math.random().toString(36).slice(2, 7)}`;
  const input = h("input", {
    type: "checkbox",
    id,
    checked: checked ? "" : null,
    "aria-label": label,
    onChange: (e) => {
      onChange(e.target.checked);
      if (announceMsg) announce(`${label}: ${e.target.checked ? "on" : "off"}`);
    },
  });
  return h("div", { class: "a11y-row" }, [
    h("label", { for: id, text: label }),
    h("label", { class: "a11y-switch", for: id }, [input, h("span", { class: "a11y-switch-track" })]),
  ]);
}

function buildPanel(root) {
  const state = a11yState.getState();
  const mount = $("[data-a11y-controls]", root);
  clear(mount);

  append(mount, [
    h("fieldset", { class: "a11y-group" }, [
      h("legend", { class: "a11y-group-title", text: "text size" }),
      labelledSelect({
        label: "Font size",
        value: state.fontSize,
        options: [
          { value: "small", label: "Small" },
          { value: "default", label: "Default" },
          { value: "large", label: "Large" },
          { value: "xlarge", label: "Extra large" },
        ],
        onChange: (v) => a11yState.set("fontSize", v),
        announceMsg: true,
      }),
    ]),

    h("fieldset", { class: "a11y-group" }, [
      h("legend", { class: "a11y-group-title", text: "contrast & color" }),
      labelledSelect({
        label: "Contrast",
        value: state.contrast,
        options: [
          { value: "auto", label: "Automatic" },
          { value: "high", label: "High contrast" },
        ],
        onChange: (v) => a11yState.set("contrast", v),
        announceMsg: true,
      }),
      labelledSelect({
        label: "Color vision mode",
        value: state.cvd,
        options: [
          { value: "none", label: "Default" },
          { value: "protanopia", label: "Protanopia (red-blind)" },
          { value: "deuteranopia", label: "Deuteranopia (green-blind)" },
          { value: "tritanopia", label: "Tritanopia (blue-blind)" },
          { value: "grayscale", label: "Grayscale" },
        ],
        onChange: (v) => a11yState.set("cvd", v),
        announceMsg: true,
      }),
      labelledSelect({
        label: "Glare reduction",
        value: state.glare,
        options: [
          { value: "none", label: "Off" },
          { value: "dim", label: "Dim screen" },
          { value: "sepia", label: "Sepia" },
        ],
        onChange: (v) => a11yState.set("glare", v),
        announceMsg: true,
      }),
    ]),

    h("fieldset", { class: "a11y-group" }, [
      h("legend", { class: "a11y-group-title", text: "spacing" }),
      labelledSelect({
        label: "Line spacing",
        value: String(state.lineSpacing),
        options: [
          { value: "1", label: "Normal" },
          { value: "2", label: "Relaxed" },
          { value: "3", label: "Extra" },
        ],
        onChange: (v) => a11yState.set("lineSpacing", Number(v)),
        announceMsg: true,
      }),
      labelledSelect({
        label: "Letter spacing",
        value: String(state.letterSpacing),
        options: [
          { value: "1", label: "Normal" },
          { value: "2", label: "Wide" },
          { value: "3", label: "Extra wide" },
        ],
        onChange: (v) => a11yState.set("letterSpacing", Number(v)),
        announceMsg: true,
      }),
      labelledSelect({
        label: "Word spacing",
        value: String(state.wordSpacing),
        options: [
          { value: "1", label: "Normal" },
          { value: "2", label: "Wide" },
          { value: "3", label: "Extra wide" },
        ],
        onChange: (v) => a11yState.set("wordSpacing", Number(v)),
        announceMsg: true,
      }),
    ]),

    h("fieldset", { class: "a11y-group" }, [
      h("legend", { class: "a11y-group-title", text: "toggles" }),
      labelledSwitch({
        label: "Dyslexia-friendly font",
        checked: state.dyslexic,
        onChange: (v) => a11yState.set("dyslexic", v),
        announceMsg: true,
      }),
      labelledSwitch({
        label: "Reduce motion",
        checked: state.motion === "reduced",
        onChange: (v) => a11yState.set("motion", v ? "reduced" : "auto"),
        announceMsg: true,
      }),
      labelledSwitch({
        label: "Loud focus outlines",
        checked: state.focusLoud,
        onChange: (v) => a11yState.set("focusLoud", v),
        announceMsg: true,
      }),
    ]),

    h("div", { class: "a11y-actions" }, [
      h("button", {
        class: "a11y-action-btn a11y-action-btn--reset",
        type: "button",
        text: "Reset all",
        onClick: () => {
          a11yState.reset();
          buildPanel(root); // rebuild reflects defaults
          announce("All accessibility settings reset");
        },
      }),
    ]),
  ]);
}

function wireFab(root) {
  const btn = $("#a11y-fab-btn", root);
  const panel = $("#a11y-panel", root);

  if (!btn || !panel) return;

  const setOpen = (open) => {
    btn.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
    if (open) {
      const first = panel.querySelector("select, input, button");
      first?.focus();
    }
  };

  btn.addEventListener("click", () => {
    const next = btn.getAttribute("aria-expanded") !== "true";
    setOpen(next);
    announce(next ? "Accessibility options opened" : "Accessibility options closed");
  });

  $("#a11y-close", root)?.addEventListener("click", () => {
    setOpen(false);
    btn.focus();
    announce("Accessibility options closed");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (btn.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      btn.focus();
    }
  });

  // basic focus trap: Tab wraps inside the panel while open
  panel.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const focusables = panel.querySelectorAll("select, input, button");
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // close panel on outside click
  document.addEventListener("click", (e) => {
    if (btn.getAttribute("aria-expanded") === "true" && !root.contains(e.target)) {
      setOpen(false);
    }
  });
}

const module = {
  name: "a11y",
  reducedMotionSafe: true,

  init(el) {
    buildPanel(el);
    wireFab(el);
  },
};

register("a11y", module);

export default module;
