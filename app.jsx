import { render } from "preact";
import { useState } from "preact/hooks";
import HomePage from "./HomePage.jsx";
import SportQuiz from "./SportQuiz.jsx";
import EventPage from "./Event/EventPage.jsx";
import ContactPage from "./Kontakt/ContactPage.jsx";
import { buttonGlow } from "./button-glow.js";
import { usePageMotion } from "./use-page-motion.js";
import logo from "./assets/sportnisz-logo.svg";
import "./styles.css";

const pages = [
  { id: "home", label: "Home", path: "" },
  { id: "ankieta", label: "Ankieta", path: "Ankieta/" },
  { id: "event", label: "Wydarzenie", path: "Event/" },
  { id: "kontakt", label: "Kontakt", path: "Kontakt/" },
];

function getCurrentPage() {
  const path = window.location.pathname.toLowerCase();
  if (/\/ankieta(?:\/|$)/.test(path)) return "ankieta";
  if (/\/event(?:\/|$)/.test(path)) return "event";
  if (/\/kontakt(?:\/|$)/.test(path)) return "kontakt";
  return "home";
}

function getPageHref(page, currentPage) {
  return `${currentPage === "home" ? "./" : "../"}${page.path}`;
}

function PageHeader({ currentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header class="site-header page-width">
      <a href={getPageHref(pages[0], currentPage)} class="site-logo" aria-label="Sportnisz — strona główna"><img src={logo} alt="" width="1405" height="765" /></a>
      <button class="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Zamknij" : "Menu"}<span aria-hidden="true">{menuOpen ? "−" : "+"}</span></button>
      <nav id="main-navigation" class={`site-navigation${menuOpen ? " is-open" : ""}`} aria-label="Główna nawigacja" onKeyDown={(event) => { if (event.key === "Escape") { setMenuOpen(false); document.querySelector('.menu-toggle')?.focus(); } }}>
        {pages.map((page, index) => <a key={page.id} href={getPageHref(page, currentPage)} class={page.id === currentPage ? "is-current" : ""} aria-current={page.id === currentPage ? "page" : undefined}><span class="nav-index" aria-hidden="true">0{index}</span>{page.label}</a>)}
      </nav>
      <a {...buttonGlow} href={getPageHref(pages[2], currentPage)} class="button header-cta">Dołącz do gry <span aria-hidden="true">↗</span></a>
    </header>
  );
}

function PageFooter({ currentPage }) {
  return (
    <footer class="site-footer">
      <div class="page-width">
        <div class="footer-top"><a class="wordmark" href={getPageHref(pages[0], currentPage)}>sportnisz<span aria-hidden="true">*</span></a><p>Mniej schematów.<br />Więcej ruchu.</p><a class="text-link" href="mailto:sportnisz@gmail.com">Porozmawiajmy <span aria-hidden="true">↗</span></a></div>
        <div class="footer-bottom"><span>SPORTNISZ / SPORT POZA SCHEMATEM</span><nav aria-label="Nawigacja w stopce">{pages.map((page) => <a key={page.id} href={getPageHref(page, currentPage)}>{page.label}</a>)}</nav><a href="#top">DO GÓRY ↑</a></div>
      </div>
    </footer>
  );
}

function App() {
  const currentPage = getCurrentPage();
  usePageMotion();
  return (
    <>
      <a class="skip-link" href="#main-content">Przejdź do treści</a>
      <div id="top" />
      <PageHeader currentPage={currentPage} />
      <main id="main-content" class={`${currentPage}-page`}>
        {currentPage === "home" && <HomePage />}
        {currentPage === "ankieta" && <SportQuiz />}
        {currentPage === "event" && <EventPage />}
        {currentPage === "kontakt" && <ContactPage />}
      </main>
      <PageFooter currentPage={currentPage} />
    </>
  );
}

render(<App />, document.querySelector("#app"));
