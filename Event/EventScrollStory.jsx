import { useScrollStory } from "./use-scroll-story.js";

export default function EventScrollStory({ cards }) {
  const { rootRef, activeScene, goToScene } = useScrollStory(cards.length + 1);
  const chapters = ["Początek", ...cards.map((card) => card.label)];

  return (
    <section ref={rootRef} class="event-scroll-story" style={{ "--scene-count": chapters.length }} aria-label="Poznaj wydarzenie Sportnisz">
      <div class="event-story-stage">
        <div class="event-story-orbit" aria-hidden="true"><span /></div>
        <div class="event-story-topline page-width">
          <span class="eyebrow"><i aria-hidden="true" /> 02 / WYDARZENIE</span>
          <a class="event-story-skip" href="#event-sports">Poznaj sporty <span aria-hidden="true">↗</span></a>
        </div>

        <div class="event-scenes">
          <header class="event-scene event-scene-intro page-width" id="event-scene-0">
            <div class="event-intro-type">
              <span class="event-scene-kicker">DOBRY DZIEŃ ZACZYNA SIĘ OD RUCHU.</span>
              <h1>WYJDŹ.<br />ZAGRAJ<span class="event-orange">.</span></h1>
            </div>
            <div class="event-intro-aside">
              <span class="event-intro-star" aria-hidden="true">✳</span>
              <p>Mało planowania.<br />Dużo ruchu.</p>
              <span class="eyebrow">4 SPORTY. WSPÓLNA ENERGIA.</span>
            </div>
            <span class="event-intro-watermark" aria-hidden="true">PLAY</span>
          </header>

          {cards.map(({ title, label, sport }, index) => (
            <article class={`event-scene event-scene-story page-width${index % 2 ? " event-scene-reversed" : ""}`} id={`event-scene-${index + 1}`} key={label} aria-labelledby={`event-scene-title-${index + 1}`}>
              <div class="event-scene-copy">
                <p class="event-scene-kicker"><span>0{index + 1}</span> {label}</p>
                <h2 id={`event-scene-title-${index + 1}`}>{title}</h2>
                <p class="event-scene-placeholder">Bla bla bla, bla bla bla.<br />Bla bla bla, bla bla bla, bla bla bla.</p>
                <span class="event-scene-sign" aria-hidden="true">{index === 1 ? "↗" : "+"}</span>
              </div>
              <figure class="event-scene-figure">
                <div class="event-scene-image-wrap">
                  <img style={{ objectPosition: sport.imagePosition }} src={sport.image} alt={sport.imageAlt} loading="eager" decoding="async" />
                  <span class="event-scene-image-index" aria-hidden="true">0{index + 1}</span>
                  <span class="event-scene-image-line" aria-hidden="true" />
                </div>
                <figcaption><span>SPORTNISZ / WSPÓLNIE W RUCHU</span><span>0{index + 1} — 03</span></figcaption>
              </figure>
            </article>
          ))}
        </div>

        <div class="event-story-bottom page-width">
          <span class="event-scroll-hint">PRZEWIŃ, ABY ODKRYĆ <span aria-hidden="true">↓</span></span>
          <nav class="event-chapters" aria-label="Rozdziały wydarzenia">
            {chapters.map((label, index) => (
              <button type="button" key={label} aria-label={`${index === 0 ? "Start" : `Rozdział ${index}`}: ${label}`} aria-current={activeScene === index ? "step" : undefined} aria-controls={`event-scene-${index}`} onClick={() => goToScene(index)}><span aria-hidden="true">{index === 0 ? "START" : `0${index}`}</span></button>
            ))}
          </nav>
          <span class="event-chapter-count" aria-hidden="true">0{activeScene} <span>/ 03</span></span>
        </div>
        <div class="event-story-progress" aria-hidden="true" />
      </div>
    </section>
  );
}
