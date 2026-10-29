import Icon from "./Icon.jsx";
import { useState } from "preact/hooks";
import { sports } from "./sports.js";
import { buttonGlow } from "./button-glow.js";
import SportCard from "./SportCard.jsx";
import heroImage from "./assets/hero-friends.png";
import eventImage from "./assets/event/spikeball.jpg";

const featuredIndices = [0, 16, 2, 6, 10, 12];
const catalog = [...featuredIndices.map((index) => sports[index]), ...sports.filter((_, index) => !featuredIndices.includes(index))];

export default function HomePage() {
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <section class="home-hero page-width" aria-labelledby="home-title">
        <div class="hero-meta"><span class="eyebrow"><span class="status-dot" /> SPORT POZA SCHEMATEM</span><span class="eyebrow">ODKRYWAJ. PRÓBUJ. GRAJ.</span></div>
        <div class="hero-composition" data-tilt>
          <div class="hero-copy">
            <h1 id="home-title">ZNAJDŹ<br />SWÓJ<br /><span class="hero-last-word">RUCH<span class="orange-dot">.</span></span></h1>
            <div class="hero-intro"><p>Mniej rutyny.<br />Więcej nowych możliwości.</p><a {...buttonGlow} class="button button-primary" href="./Ankieta/">Znajdź swój sport <span aria-hidden="true"><Icon name="arrow-up-right" /></span></a></div>
          </div>
          <div class="hero-visual" aria-hidden="true">
            <span class="hero-outline-word">PLAY</span>
            <img class="hero-athlete hero-friends" src={heroImage} alt="" fetchPriority="high" />
            <div class="hero-orange-overlay" />
            <span class="hero-vertical-note">NIE MUSISZ GRAĆ JAK WSZYSCY.</span>
            <span class="hero-visual-index">/ 01</span>
          </div>
        </div>
        <div class="hero-bottom"><span>18 SPORTÓW DO ODKRYCIA</span><span>TWOJE TEMPO. TWOJE ZASADY.</span><a href="#sporty">PRZEWIŃ I ODKRYJ <span aria-hidden="true"><Icon name="arrow-down" /></span></a></div>
      </section>

      <section class="home-manifesto page-width" data-reveal>
        <span class="eyebrow">01 / ZNAJDŹ SWOJĄ NISZĘ</span>
        <h2>Nie każdy musi<br />grać <span class="muted-text">w to samo.</span></h2>
        <p>Od frisbee po slackline.<br />Sprawdź, co Cię porusza.</p>
      </section>

      <section class="sport-catalog page-width" id="sporty" aria-labelledby="catalog-title">
        <header class="section-heading" data-reveal><h2 id="catalog-title">Wybierz coś<br /><span class="muted-text">nieoczywistego.</span></h2><span class="eyebrow">KOLEKCJA / 18 SPORTÓW</span></header>
        <div class="sport-list" id="sports-catalog-list">
          {(showAll ? catalog : catalog.slice(0, 6)).map((sport, index) => <SportCard key={sport.name} {...sport} index={index} />)}
        </div>
        <div class="catalog-more"><button {...buttonGlow} class="button button-outline" type="button" aria-expanded={showAll} aria-controls="sports-catalog-list" onClick={() => setShowAll(!showAll)}>{showAll ? "Pokaż mniej" : "Zobacz wszystkie 18 sportów"}<span aria-hidden="true"><Icon name={showAll ? "minus" : "plus"} /></span></button></div>
      </section>

      <section class="quiz-invitation" data-reveal>
        <div class="page-width quiz-invitation-inner"><span class="eyebrow">07 PYTAŃ / TWÓJ KIERUNEK</span><h2>Nie wiesz od<br />czego zacząć<span>?</span></h2><a {...buttonGlow} class="button button-dark" href="./Ankieta/">Sprawdź w ankiecie <span aria-hidden="true"><Icon name="arrow-up-right" /></span></a></div>
      </section>

      <section class="home-event page-width" data-reveal>
        <a href="./Event/" class="home-event-image" aria-label="Poznaj wydarzenie Sportnisz"><img src={eventImage} alt="Gra w SpikeBall" loading="lazy" /><span class="round-arrow" aria-hidden="true"><Icon name="arrow-up-right" /></span></a>
        <div class="home-event-copy"><span class="eyebrow">02 / SPOTKAJMY SIĘ W RUCHU</span><h2>Offline.<br />Na żywo.<br /><span class="muted-text">Razem.</span></h2><p>Cztery sporty. Jedno wydarzenie.</p><a class="text-link" href="./Event/">Poznaj wydarzenie <span aria-hidden="true"><Icon name="arrow-up-right" /></span></a><span class="home-photo-credit">Zdjęcie: <a href="https://commons.wikimedia.org/wiki/File:Spikeball_game.jpg">Esmé James</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a></span></div>
      </section>
    </>
  );
}
