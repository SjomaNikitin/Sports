import { useLayoutEffect, useRef, useState } from "preact/hooks";

const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const smoothstep = (start, end, value) => {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};

// Native scrolling drives one sticky stage. No wheel/touch interception.
export function useScrollStory(sceneCount) {
  const rootRef = useRef(null);
  const navigateRef = useRef(null);
  const [activeScene, setActiveScene] = useState(0);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stage = root.querySelector(".event-story-stage");
    const scenes = [...root.querySelectorAll(".event-scene")];
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const shortScreen = window.matchMedia("(max-height: 559px)");
    const total = sceneCount - 0.5;
    let enabled = false;
    let start = 0;
    let travel = 1;
    let current = 0;
    let target = 0;
    let active = -1;
    let frame = 0;
    let previousTime = 0;

    function paint(position) {
      const chapter = Math.min(Math.floor(position), sceneCount - 1);
      const blend = smoothstep(0.35, 1, position - chapter);
      const nextActive = Math.min(chapter + (blend >= 0.5 ? 1 : 0), sceneCount - 1);

      scenes.forEach((scene, index) => {
        const outgoing = index === chapter;
        const incoming = index === chapter + 1;
        const last = chapter === sceneCount - 1;
        const opacity = outgoing ? (last ? 1 : 1 - smoothstep(0.05, 0.65, blend))
          : incoming ? smoothstep(0.35, 0.95, blend) : 0;
        const shift = outgoing ? (last ? 0 : -blend) : 1 - blend;
        scene.style.setProperty("--scene-opacity", opacity.toFixed(4));
        scene.style.setProperty("--scene-shift", shift.toFixed(4));
        scene.style.visibility = opacity > 0.001 ? "visible" : "hidden";
      });

      root.style.setProperty("--story-progress", (position / total).toFixed(4));
      root.style.setProperty("--orbit-turn", `${(position * 75).toFixed(2)}deg`);
      root.style.setProperty("--orbit-x", `${(Math.sin(position * Math.PI) * 12).toFixed(2)}vw`);

      if (active !== nextActive) {
        active = nextActive;
        scenes.forEach((scene, index) => {
          scene.setAttribute("aria-hidden", String(index !== active));
          scene.inert = index !== active;
        });
        setActiveScene(active);
      }
    }

    function tick(time) {
      const elapsed = previousTime ? Math.min(time - previousTime, 64) : 16;
      previousTime = time;
      current += (target - current) * (1 - Math.exp(-elapsed / 65));
      if (Math.abs(target - current) < 0.0005) current = target;
      paint(current);
      frame = current !== target ? requestAnimationFrame(tick) : 0;
      if (!frame) previousTime = 0;
    }

    function scroll() {
      if (!enabled) return;
      target = clamp((window.scrollY - start) / travel, 0, 1) * total;
      if (!frame && current !== target) frame = requestAnimationFrame(tick);
    }

    function measure() {
      if (!enabled) return;
      start = root.getBoundingClientRect().top + window.scrollY;
      travel = Math.max(1, root.offsetHeight - stage.offsetHeight);
      target = clamp((window.scrollY - start) / travel, 0, 1) * total;
      current = target;
      paint(current);
    }

    function configure() {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      enabled = !motion.matches && !shortScreen.matches;
      root.dataset.scrollReady = String(enabled);
      active = -1;
      if (enabled) {
        measure();
      } else {
        scenes.forEach((scene) => {
          scene.removeAttribute("style");
          scene.removeAttribute("aria-hidden");
          scene.inert = false;
        });
        ["--story-progress", "--orbit-turn", "--orbit-x"].forEach((name) => root.style.removeProperty(name));
        setActiveScene(0);
      }
    }

    navigateRef.current = (index) => {
      if (enabled) {
        window.scrollTo({ top: start + (index / total) * travel, behavior: "smooth" });
      } else {
        scenes[index]?.scrollIntoView({ behavior: motion.matches ? "instant" : "smooth", block: "start" });
      }
    };

    configure();
    const resize = new ResizeObserver(measure);
    resize.observe(stage);
    const header = document.querySelector(".site-header");
    if (header) resize.observe(header);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    motion.addEventListener("change", configure);
    shortScreen.addEventListener("change", configure);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", measure);
      motion.removeEventListener("change", configure);
      shortScreen.removeEventListener("change", configure);
      navigateRef.current = null;
    };
  }, [sceneCount]);

  return { rootRef, activeScene, goToScene: (index) => navigateRef.current?.(index) };
}
