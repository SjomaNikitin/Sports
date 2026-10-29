import { useEffect } from "preact/hooks";
import "./motion.css";

// One delegated interaction layer; content stays visible without this hook.
export function usePageMotion() {
  useEffect(() => {
    const root = document.querySelector("#app") || document.body;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealed = new Set();
    const controls = "button, a[href], input, select, textarea, label, [role='button'], [data-tilt]";
    let reduced = preference.matches;
    let tilted = null;
    let pressed = null;
    let frame = 0;
    let point = null;

    function clearPress() {
      pressed?.classList.remove("is-pressed");
      pressed = null;
    }

    function clearTilt() {
      cancelAnimationFrame(frame);
      frame = 0;
      point = null;
      if (!tilted) return;
      ["--pointer-x", "--pointer-y", "--pointer-shift-x", "--pointer-shift-y"].forEach((property) => {
        tilted.style.removeProperty(property);
      });
      tilted = null;
    }

    function move(event) {
      if (reduced || event.pointerType === "touch") return;
      const target = event.target.closest?.("[data-tilt]");
      if (target !== tilted) clearTilt();
      if (!target || !root.contains(target)) return;
      tilted = target;
      point = { x: event.clientX, y: event.clientY };
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!tilted || !point) return;
        const bounds = tilted.getBoundingClientRect();
        if (!bounds.width || !bounds.height) return;
        const x = Math.max(-1, Math.min(1, ((point.x - bounds.left) / bounds.width - 0.5) * 2));
        const y = Math.max(-1, Math.min(1, ((point.y - bounds.top) / bounds.height - 0.5) * 2));
        tilted.style.setProperty("--pointer-x", x.toFixed(3));
        tilted.style.setProperty("--pointer-y", y.toFixed(3));
        tilted.style.setProperty("--pointer-shift-x", `${(x * 8).toFixed(2)}px`);
        tilted.style.setProperty("--pointer-shift-y", `${(y * 8).toFixed(2)}px`);
      });
    }

    function press(event) {
      clearPress();
      if (reduced || event.button !== 0) return;
      const target = event.target.closest?.(controls);
      if (!target || !root.contains(target) || target.matches(":disabled, [aria-disabled='true']")) return;
      pressed = target;
      pressed.classList.add("is-pressed");
    }

    function leave(event) {
      if (tilted && !tilted.contains(event.relatedTarget)) clearTilt();
      if (pressed && !pressed.contains(event.relatedTarget)) clearPress();
    }

    function reset() {
      clearTilt();
      clearPress();
    }

    function changePreference(event) {
      reduced = event.matches;
      if (reduced) {
        reset();
        revealed.forEach((element) => element.classList.remove("motion-entered"));
      }
    }

    const observer = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        if (!reduced) target.classList.add("motion-entered");
        revealed.add(target);
        observer.unobserve(target);
      });
    }, { threshold: 0.08 }) : null;

    function observeReveals(node) {
      if (!(node instanceof Element) || !observer) return;
      const elements = [...node.querySelectorAll("[data-reveal]")];
      if (node.matches("[data-reveal]")) elements.unshift(node);
      elements.forEach((element) => {
        if (!revealed.has(element)) observer.observe(element);
      });
    }

    observeReveals(root);
    // Watch only new content, not class/style updates from pointer movement.
    const mutations = observer && "MutationObserver" in window ? new MutationObserver((entries) => {
      entries.forEach((entry) => entry.addedNodes.forEach(observeReveals));
    }) : null;
    mutations?.observe(root, { childList: true, subtree: true });
    root.addEventListener("pointermove", move, { passive: true });
    root.addEventListener("pointerdown", press, { passive: true });
    root.addEventListener("pointerout", leave, { passive: true });
    window.addEventListener("pointerup", clearPress, { passive: true });
    window.addEventListener("pointercancel", reset, { passive: true });
    window.addEventListener("blur", reset);
    preference.addEventListener("change", changePreference);

    return () => {
      reset();
      observer?.disconnect();
      mutations?.disconnect();
      revealed.forEach((element) => element.classList.remove("motion-entered"));
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerdown", press);
      root.removeEventListener("pointerout", leave);
      window.removeEventListener("pointerup", clearPress);
      window.removeEventListener("pointercancel", reset);
      window.removeEventListener("blur", reset);
      preference.removeEventListener("change", changePreference);
    };
  }, []);
}
