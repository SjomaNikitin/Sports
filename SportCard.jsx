import { useState } from "preact/hooks";
import ultimateImage from "./assets/event/ultimate-frisbee.jpg";
import spikeballImage from "./assets/event/spikeball.jpg";

const localImages = { "Ultimate frisbee": ultimateImage, Spikeball: spikeballImage };

export default function SportCard({ name, description, imageUrl, index = 0, children }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article class="sport-info" data-reveal>
      <details class="sport-disclosure">
        <summary>
          <div class={`sport-image-wrap${imageFailed ? " image-unavailable" : ""}`}>
            {imageFailed ? <span class="sport-image-fallback" aria-hidden="true">{name}</span> : (
              <img class="sport-info-image" src={localImages[name] || imageUrl} alt="" loading="lazy" onError={() => setImageFailed(true)} />
            )}
            <span class="sport-card-index">{String(index + 1).padStart(2, "0")}</span>
            <span class="sport-image-action" aria-hidden="true">POZNAJ SPORT ↗</span>
          </div>
          <div class="sport-card-heading"><h3>{name}</h3><span class="sport-card-plus" aria-hidden="true">+</span></div>
        </summary>
        <div class="sport-info-content"><p>{description}</p>{children}</div>
      </details>
    </article>
  );
}
