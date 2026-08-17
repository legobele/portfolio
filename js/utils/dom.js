/* dom.js — tiny DOM kit. no innerHTML, we are not animals (2015 called). */

export const $ = (sel, ctx = document) => ctx.querySelector(sel);
export const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/** h("div", { class: "x", onClick }, [child, text]) — builder */
export function h(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  attrs = attrs ?? {};

  for (const [key, value] of Object.entries(attrs)) {
    if (value == null || value === false) continue;
    if (key === "class") el.className = value;
    else if (key === "dataset") Object.assign(el.dataset, value);
    else if (key === "style") Object.assign(el.style, value);
    else if (key.startsWith("on") && typeof value === "function") {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (key === "html") {
      el.setAttribute("aria-hidden", "true");
      el.textContent = value;
    } else if (key === "text") {
      el.textContent = value;
    } else {
      el.setAttribute(key, value === true ? "" : value);
    }
  }

  append(el, children);
  return el;
}

export function append(parent, children) {
  for (const child of [].concat(children)) {
    if (child == null || child === false) continue;
    parent.append(child.nodeType ? child : document.createTextNode(child));
  }
}

export function clear(parent) {
  while (parent.firstChild) parent.removeChild(parent.firstChild);
}

export function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}
