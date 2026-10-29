import Icon from "../Icon.jsx";
import { useRef, useState } from "preact/hooks";
import { buttonGlow } from "../button-glow.js";
import ultimateImage from "../assets/event/ultimate-frisbee.jpg";
import kubbImage from "../assets/event/kubb.jpg";
import paddleImage from "../assets/event/beach-paddle-action.jpg";
import spikeballImage from "../assets/event/spikeball.jpg";
import EventScrollStory from "./EventScrollStory.jsx";
import "./event.css";
import "./scroll-story.css";

const eventSports = [
  {
    id: "ultimate-frisbee",
    name: "Ultimate Frisbee",
    category: "Dysk · Drużyna · Ruch",
    description: "Podaj dysk, znajdź przestrzeń, złap punkt. Gramy razem, bez kontaktu i w duchu fair play.",
    image: ultimateImage,
    imageAlt: "Zawodnik Ultimate Frisbee wykonujący podanie dyskiem na boisku",
    credit: "Evanf32",
    source: "https://commons.wikimedia.org/wiki/File:James_White_Flick.jpg",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  {
    id: "kubb",
    name: "Kubb",
    category: "Drewno · Celność · Taktyka",
    description: "Drewniane klocki, celny rzut i dobry plan. Przewróć klocki rywali, a na końcu strąć króla.",
    image: kubbImage,
    imageAlt: "Gracz rzucający drewnianą pałeczką do klocków podczas gry w Kubb",
    credit: "FabioVi",
    source: "https://commons.wikimedia.org/wiki/File:Kubb_throw_from_8m.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  {
    id: "beach-paddle",
    name: "Beach Paddle",
    category: "Paletki · Plaża · Wspólny rytm",
    description: "Dwie paletki, jedna piłka, wspólny rytm. Utrzymajcie ją w powietrzu jak najdłużej.",
    image: paddleImage,
    imageAlt: "Gracz odbijający piłkę pomarańczową paletką na plaży nad morzem",
    imagePosition: "22% center",
    credit: "shira gal",
    source: "https://commons.wikimedia.org/wiki/File:Playing_matkot.jpg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  },
  {
    id: "spikeball",
    name: "SpikeBall",
    category: "Siatka · Refleks · 360°",
    description: "Dwie pary i okrągła siatka. Odbij, obiegnij, zaskocz — gra toczy się w każdym kierunku.",
    image: spikeballImage,
    imageAlt: "Cztery osoby grające w SpikeBall wokół okrągłej siatki",
    credit: "Esmé James (@ezy_bezzie)",
    source: "https://commons.wikimedia.org/wiki/File:Spikeball_game.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
];

// Keep these placeholders until the final event information is ready.
const eventCards = [
  { title: "Spotkajmy się\nw ruchu.", label: "O wydarzeniu", sport: eventSports[0] },
  { title: "Dobra ekipa.\nDobry dzień.", label: "Wspólnie i aktywnie", sport: eventSports[1] },
  { title: "Po prostu\ndołącz.", label: "Miejsce dla Ciebie", sport: eventSports[2] },
];

function EventSports() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabs = useRef([]);

  function selectSport(index) {
    setSelectedIndex(index);
  }

  function handleTabKeyDown(event, index) {
    let nextIndex;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % eventSports.length;
        break;
      case "ArrowLeft":
        nextIndex = (index - 1 + eventSports.length) % eventSports.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = eventSports.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    selectSport(nextIndex);
    tabs.current[nextIndex]?.focus();
  }

  return (
    <section class="event-sports" id="event-sports" aria-labelledby="event-sports-title">
      <div class="page-width">
        <header class="event-section-heading" data-reveal>
          <div>
            <p class="eyebrow">WYBIERZ SWÓJ RUCH</p>
            <h2 id="event-sports-title">Cztery sporty.<br /><span>Zero nudy.</span></h2>
          </div>
          <p class="event-section-note">Przełącz sport. <br />Zobacz, w co gramy.</p>
        </header>

        <div class="event-sport-tabs" role="tablist" aria-label="Sporty na wydarzeniu">
          {eventSports.map((sport, index) => (
            <button
              {...buttonGlow}
              key={sport.id}
              ref={(element) => { tabs.current[index] = element; }}
              class="event-sport-tab"
              type="button"
              role="tab"
              id={`tab-${sport.id}`}
              aria-controls={`panel-${sport.id}`}
              aria-selected={selectedIndex === index}
              tabIndex={selectedIndex === index ? 0 : -1}
              onClick={() => selectSport(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              <span class="event-tab-number" aria-hidden="true">0{index + 1}</span>
              <span class="event-tab-name">{sport.name}</span>
              <span class="event-tab-arrow" aria-hidden="true"><Icon name="arrow-up-right" /></span>
            </button>
          ))}
        </div>

        {eventSports.map((sport, index) => (
          <div
            key={sport.id}
            class="event-sport-panel"
            role="tabpanel"
            id={`panel-${sport.id}`}
            aria-labelledby={`tab-${sport.id}`}
            tabIndex={0}
            hidden={selectedIndex !== index}
            data-tilt
          >
            <img class="event-sport-background" style={{ objectPosition: sport.imagePosition }} src={sport.image} alt={sport.imageAlt} loading="lazy" />
            <div class="event-sport-panel-top" aria-hidden="true">
              <span>{sport.category}</span>
              <span>0{index + 1} / 04</span>
            </div>
            <div class="event-sport-description">
              <h3>{sport.name}</h3>
              <p>{sport.description}</p>
            </div>
            <span class="event-sport-mark" aria-hidden="true"><Icon name="arrow-up-right" /></span>
          </div>
        ))}
        <p class="event-sports-footnote"><span>JEDNO WYDARZENIE. CZTERY MOŻLIWOŚCI.</span><span aria-hidden="true">SPRT / 04</span></p>
      </div>
    </section>
  );
}

export default function EventPage() {
  return (
    <div class="event-content">
      <EventScrollStory cards={eventCards} />

      <EventSports />

      <div class="page-width">
        <details class="event-photo-credits">
          <summary>Autorzy zdjęć</summary>
          <ul>
            {eventSports.map((sport) => (
              <li key={sport.id}>
                <a href={sport.source}>{sport.name}</a>: {sport.credit} · <a href={sport.licenseUrl}>{sport.license}</a>
              </li>
            ))}
          </ul>
          <p>Zdjęcia z Wikimedia Commons; kadrowanie i monochromatyczna prezentacja w układzie strony.</p>
        </details>
      </div>
    </div>
  );
}
