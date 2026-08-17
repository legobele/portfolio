/* registry.js — every module registers here, main.js boots them in order.
   modules: { name, init(element, context), reducedMotionSafe? } */

const modules = new Map();

export function register(name, module) {
  modules.set(name, module);
}

export function boot(selector = "[data-module]", context = document) {
  const order = [];
  for (const el of context.querySelectorAll(selector)) {
    const name = el.dataset.module;
    const mod = modules.get(name);
    if (!mod) {
      console.warn(`[registry] no module registered for "${name}"`);
      continue;
    }
    order.push({ name, mod, el });
  }

  const a11yState = modules.get("a11y-state")?.getState?.();
  for (const { name, mod, el } of order) {
    try {
      if (mod.reducedMotionSafe === false && a11yState?.motion === "reduced") {
        continue;
      }
      mod.init?.(el, context);
      mod.onReady?.();
    } catch (err) {
      console.error(`[registry] module "${name}" failed to init`, err);
    }
  }

  for (const { mod } of order) {
    if (typeof mod.onAllReady === "function") mod.onAllReady();
  }
}

export function has(name) {
  return modules.has(name);
}
