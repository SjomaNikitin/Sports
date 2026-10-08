import { render } from "preact";
import "./styles.css";

const pages = [
  { id: "home", label: "Home", path: "" },
  { id: "ankieta", label: "Ankieta", path: "Ankieta/" },
  { id: "event", label: "Wydarzenie", path: "Event/" },
  { id: "kontakt", label: "Kontakt", path: "Kontakt/" },
];

const sports = [
  {
    name: "Ultimate frisbee",
    description: "Bezkontaktowa gra drużynowa, w której zdobywa się punkty, łapiąc dysk w polu punktowym przeciwnika.",
    imageUrl: "https://www.wroclaw.pl/beta2/files/news/81249/mainFrisbee.jpg",
  },
  {
    name: "Dwubój",
    description: "Dyscyplina składająca się z dwóch konkurencji rozgrywanych kolejno, na przykład biegu i jazdy na rowerze.",
    imageUrl: "https://fitmade.pl/wp-content/uploads/2024/04/weightlifting.jpg",
  },
  {
    name: "Padel",
    description: "Dynamiczna gra rakietowa, zwykle dla czterech osób, łącząca elementy tenisa i squasha.",
    imageUrl: "https://umtychy.pl/media/photos/10017590/original.jpg",
  },
  {
    name: "Bike polo",
    description: "Zespołowa odmiana polo, w której zawodnicy poruszają się na rowerach i uderzają piłkę specjalnymi kijami.",
    imageUrl: "https://images.wsj.net/im-818811?width=1260&height=841",
  },
  {
    name: "Bossaball",
    description: "Widowiskowa gra łącząca siatkówkę, piłkę nożną i akrobatykę na dmuchanym boisku z trampolinami.",
    imageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/Bossaball_in_%22El_Camp%C3%ADn%22.jpg/250px-Bossaball_in_%22El_Camp%C3%ADn%22.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
  },
  {
    name: "Disc golf",
    description: "Odmiana golfa, w której zamiast piłki i kijów rzuca się dyskiem do metalowych koszy.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEcYVR5Z4aEg1NOyO0RHEOgoHC_nybvxeKA63rwMremw&s=10",
  },
  {
    name: "Bouldering",
    description: "Wspinaczka na niewysokich ścianach bez liny, zabezpieczona grubymi materacami.",
    imageUrl: "https://voltboulderownia.pl/wp-content/uploads/2025/10/volt-boulderownia-wwa-03.webp",
  },
  {
    name: "Calisthenics freestyle",
    description: "Wykonywanie efektownych figur, obrotów i przejść na drążkach z wykorzystaniem ciężaru własnego ciała.",
    imageUrl: "https://gymgeneration.ch/cdn/shop/articles/calisthenics-die-kunst-der-korperbeherrschung-445570_7dac5896-d3cc-4487-9263-e3a48bce897a.jpg?v=1785586956&width=1100",
  },
  {
    name: "Fistball",
    description: "Gra drużynowa podobna do siatkówki, w której piłkę odbija się ręką lub przedramieniem i pozwala jej raz odbić się od podłoża.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd8YBTC-6LqhNEXnhABpOgq-OlfJBrD_JWNZGQfeV12ZsuOXv-_ShpdEMf&s=10",
  },
  {
    name: "Quad Ball",
    description: "Kontaktowa gra drużynowa inspirowana quidditchem, łącząca elementy piłki ręcznej, rugby i zbijaka.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB2HIWUA2FTSsVZPrCe_a6DPuPvq-olZI1aKz1RnWCMw&s=10",
  },
  {
    name: "Slackline",
    description: "Chodzenie oraz wykonywanie figur na elastycznej taśmie rozwieszonej nisko nad ziemią.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrhvu44NDeDAcWnaEXtY_1jxvvAAXz8uwjPIPhzuqVd9jk8JFkXmFhqcWw&s=10",
  },
  {
    name: "Parkour",
    description: "Sztuka sprawnego pokonywania miejskich lub naturalnych przeszkód za pomocą biegu, skoków i wspinania.",
    imageUrl: "https://fun4sport.pl/data/include/img/news/1778842086.jpg",
  },
  {
    name: "Crossminton",
    description: "Szybka gra rakietowa przypominająca badminton, rozgrywana bez siatki przy użyciu cięższej i odporniejszej na wiatr lotki.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Speedminton_game_on_rooftop.jpg?utm_source=pl.wikipedia.org&utm_campaign=index&utm_content=original",
  },
  {
    name: "Freestyle football",
    description: "Wykonywanie trików i efektownych kombinacji z piłką nożną bez rozgrywania klasycznego meczu.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNIZoJFhy7YLgOrXOSu8kkBnr64TbzlqmyMBSENXp6_g&s",
  },
  {
    name: "Dodgebee",
    description: "Bezpieczniejsza odmiana zbijaka, w której gracze rzucają miękkim dyskiem zamiast piłką.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMEILw_y_--jhJA_HX6j7JVKPNuRHrIQtCHy0MEsi0JWqysvtSedAoazig&s=10",
  },
  {
    name: "Rzut kaloszem",
    description: "Sport polegający na rzucie kaloszem do konkretnego celu albo na jak najdalszy dystans.",
    imageUrl: "https://www.projektefektywny.pl/wp-content/uploads/2020/07/rzut-kaloszem_HDR-300x200.jpg",
  },
  {
    name: "Spikeball",
    description: "Dynamiczna gra zespołowa, w której gracze odbijają piłkę w małą, okrągłą siatkę ustawioną przy ziemi.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU3PIZ79QW5Lx0NejWqJ1ePzNbBMxh3T2jJ53h1YKGEluWO0ax_eMy23s&s=10",
  },
  {
    name: "Bule",
    description: "Gra polegająca na rzucaniu metalowych kul jak najbliżej małej drewnianej kulki będącej celem.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTovszLI1ckPiIGpLstCcZW5SJc7WS7--ejoWIiESEE18vDV9DfHiV-YSM&s=10",
  },
];

function SportInfo({ name, description, imageUrl }) {
  return (
    <article class="sport-info">
      <img class="sport-info-image" src={imageUrl} alt={name} />
      <div class="sport-info-content">
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </article>
  );
}

function getCurrentPage() {
  const path = window.location.pathname.toLowerCase();

  if (path.includes("/ankieta/")) return "ankieta";
  if (path.includes("/event/")) return "event";
  if (path.includes("/kontakt/")) return "kontakt";
  return "home";
}

function getPageHref(page, currentPage) {
  const root = currentPage === "home" ? "./" : "../";
  return `${root}${page.path}`;
}

function App() {
  const currentPage = getCurrentPage();
  const navigation = pages.filter((page) => page.id !== currentPage);

  return (
    <main>
      <h1>Grałeś już?</h1>

      <nav class="page-select" aria-label="Główna nawigacja">
        {navigation.map((page) => (
          <a
            class="page-select-button button"
            href={getPageHref(page, currentPage)}
            key={page.id}
          >
            {page.label}
          </a>
        ))}
      </nav>
      {currentPage === "home" && (
          <div class="ankieta-banner">
          <h2>Wybierz najepsze sporty dla siebie za pomocą ankiety!</h2>
            <a href="./Ankieta/" class="ankieta-button button">Przejdź do ankiety</a>
          </div>
      )}

      {currentPage === "home" && (
          <h2 class={"category-title"}>
            Poznaj różne sporty:
          </h2>
      )}
      {currentPage === "home" && (
        <section class="sport-list" aria-label="Lista sportów">
          {sports.map((sport) => (
            <SportInfo
              key={sport.name}
              name={sport.name}
              description={sport.description}
              imageUrl={sport.imageUrl}
            />
          ))}
        </section>
      )}
    </main>
  );
}

render(<App />, document.querySelector("#app"));
