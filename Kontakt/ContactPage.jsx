import Icon from "../Icon.jsx";
import { useState } from "preact/hooks";
import { buttonGlow } from "../button-glow.js";

const contactEmail = "sportnisz@gmail.com";

export default function ContactPage() {
  const [status, setStatus] = useState("");

  function composeMessage(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Sportnisz / ${data.get("topic")}`;
    const body = `${data.get("message")}\n\n${data.get("name")}\n${data.get("email")}`;
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("Dokończ wysyłanie w swoim programie pocztowym.");
  }

  return (
    <div class="contact-page page-width">
      <header class="contact-heading" data-reveal><span class="eyebrow">03 / KONTAKT</span><h1 class="page-title">POZNAJMY<br />SIĘ<span class="orange-dot">.</span></h1><p>Pytanie, pomysł, wspólna gra.<br />Zacznijmy od rozmowy.</p><span class="contact-asterisk" aria-hidden="true" data-tilt><Icon name="asterisk" /></span></header>
      <div class="contact-layout">
        <aside class="contact-details" data-reveal>
          <span class="eyebrow">NAPISZ DO NAS</span><a class="contact-email" href={`mailto:${contactEmail}`}>sportnisz<span>@gmail.com</span><span class="contact-email-arrow" aria-hidden="true"><Icon name="arrow-up-right" /></span></a>
          <div class="contact-note"><span class="eyebrow">SPORT ŁĄCZY.</span><p>Masz pomysł na coś nowego?<br />Chętnie go poznamy.</p></div>
          <a href="../Event/" class="text-link">Zobacz najbliższe wydarzenie <span aria-hidden="true"><Icon name="arrow-up-right" /></span></a>
        </aside>
        <form class="contact-form" onSubmit={composeMessage} data-reveal>
          <div class="contact-form-row"><label>JAK MASZ NA IMIĘ?<input name="name" autoComplete="name" placeholder="Twoje imię" required /></label><label>TWÓJ E-MAIL<input name="email" type="email" autoComplete="email" placeholder="ty@przyklad.pl" required /></label></div>
          <label>O CZYM POROZMAWIAMY?<select name="topic" defaultValue="Pytanie o wydarzenie"><option>Pytanie o wydarzenie</option><option>Współpraca</option><option>Inny temat</option></select></label>
          <label>TWOJA WIADOMOŚĆ<textarea name="message" rows={4} placeholder="Hej Sportnisz…" required /></label>
          <div class="contact-form-footer"><p>Otworzymy Twój program pocztowy.<br />Wiadomość wyślesz samodzielnie.</p><button {...buttonGlow} class="button button-dark" type="submit">Otwórz wiadomość <span aria-hidden="true"><Icon name="arrow-up-right" /></span></button></div>
          <p class="contact-status" role="status">{status}</p>
        </form>
      </div>
    </div>
  );
}
