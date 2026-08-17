/* cursor.js — rainbow cursor trail on a fixed canvas. disabled under reduced motion. */

import { register } from "../registry.js";

const module = {
  name: "cursor",
  reducedMotionSafe: false,

  init() {
    const canvas = document.createElement("canvas");
    canvas.id = "cursor-trail";
    canvas.setAttribute("aria-hidden", "true");
    document.body.append(canvas);

    const ctx = canvas.getContext("2d");
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let px = null, py = null;
    let hue = 0;
    let raf = null;

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize, { passive: true });

    const onMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      if (px == null) { px = x; py = y; return; }
      ctx.strokeStyle = `hsl(${hue % 360} 100% 60%)`;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(x, y);
      ctx.stroke();
      hue += 6;
      px = x; py = y;
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });

    // teardown is never called on a single-page site, but keep refs for tests
    module._cleanup = () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      canvas.remove();
    };
  },
};

register("cursor", module);

export default module;
