import { render } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { getRecommendations, quizQuestions } from "./quiz.js";
import { sports } from "./sports.js";
import "./styles.css";

const pages = [
  { id: "home", label: "Home", path: "" },
  { id: "ankieta", label: "Ankieta", path: "Ankieta/" },
  { id: "event", label: "Wydarzenie", path: "Event/" },
  { id: "kontakt", label: "Kontakt", path: "Kontakt/" },
];


function SportInfo({ name, description, imageUrl, heading: Heading = "h2", children }) {
  return (
    <article class="sport-info">
      <img class="sport-info-image" src={imageUrl} alt={name} />
      <div class="sport-info-content">
        <Heading>{name}</Heading>
        <p>{description}</p>
        {children}
      </div>
    </article>
  );
}

function SportQuiz() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const resultHeading = useRef(null);
  const firstAnswer = useRef(null);
  const answeredCount = quizQuestions.filter((question) => answers[question.id]).length;
  const isComplete = answeredCount === quizQuestions.length;
  const recommendations = showResults ? getRecommendations(sports, answers) : [];
  const bestScore = recommendations[0]?.matches.length ?? 0;

  useEffect(() => {
    if (showResults) resultHeading.current?.focus();
  }, [showResults]);

  function resetQuiz() {
    setAnswers({});
    setShowResults(false);
    firstAnswer.current?.focus();
  }

  return (
    <section class="sport-quiz" aria-labelledby="quiz-title">
      <header class="quiz-intro">
        <h2 id="quiz-title" class="category-title">Znajdź sport dla siebie</h2>
        <p>Odpowiedz na {quizQuestions.length} pytań i poznaj sporty z naszej listy, które pasują do Twoich preferencji.</p>
      </header>

      <div class="quiz-progress">
        <label for="quiz-progress">Twoje odpowiedzi: {answeredCount} z {quizQuestions.length}</label>
        <progress id="quiz-progress" max={quizQuestions.length} value={answeredCount} />
      </div>

      <form
        class="quiz-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (isComplete) setShowResults(true);
        }}
        onReset={resetQuiz}
      >
        {quizQuestions.map((question, index) => (
          <fieldset class="quiz-question" key={question.id}>
            <legend>
              <span class="quiz-question-number" aria-hidden="true">{index + 1}</span>
              {question.title}
            </legend>
            <div class="quiz-options">
              {question.options.map((option, optionIndex) => (
                <label
                  class={`quiz-option${answers[question.id] === option.value ? " is-selected" : ""}`}
                  key={option.value}
                >
                  <input
                    ref={index === 0 && optionIndex === 0 ? firstAnswer : undefined}
                    type="radio"
                    name={question.id}
                    value={option.value}
                    checked={answers[question.id] === option.value}
                    required
                    onChange={() => {
                      setAnswers((previous) => ({ ...previous, [question.id]: option.value }));
                      setShowResults(false);
                    }}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}

        <p class="quiz-hint" id="quiz-hint" aria-live="polite">
          {isComplete
            ? "Gotowe! Sprawdź, które sporty pasują do Ciebie."
            : "Zaznacz po jednej odpowiedzi w każdym pytaniu, aby zobaczyć wynik."}
        </p>
        <div class="quiz-actions">
          <button class="button quiz-button quiz-submit" type="submit" disabled={!isComplete} aria-describedby="quiz-hint">
            Pokaż pasujące sporty
          </button>
          <button class="button quiz-button" type="reset">Zacznij od nowa</button>
        </div>
      </form>

      {showResults && (
        <section class="quiz-results" aria-labelledby="quiz-results-title">
          <h2 id="quiz-results-title" class="category-title" ref={resultHeading} tabIndex={-1}>Sporty dla Ciebie</h2>
          <p class="quiz-result-summary">
            {bestScore === quizQuestions.length
              ? "Te sporty pasują do wszystkich Twoich odpowiedzi. Wybierz ten, który najbardziej Cię zaciekawi!"
              : `Nie ma sportu pasującego do wszystkich odpowiedzi. Każda z najbliższych propozycji pasuje do ${bestScore} z ${quizQuestions.length} Twoich preferencji.`}
          </p>
          <p class="quiz-hint">Dostępność zależy od pogody i obiektów w Twojej okolicy.</p>
          <div class="sport-list">
            {recommendations.map(({ sport, matches }) => (
              <SportInfo key={sport.name} {...sport} heading="h3">
                <p class="quiz-match-count">Dopasowanie: {matches.length} z {quizQuestions.length}</p>
                <ul class="quiz-match-list" aria-label="Porównanie z Twoimi odpowiedziami">
                  {quizQuestions.map((question) => {
                    const isMatch = matches.includes(question);
                    const labels = question.options
                      .filter((option) => sport.preferences[question.id]?.includes(option.value))
                      .map((option) => option.label)
                      .join(" / ");

                    return (
                      <li key={question.id} class={isMatch ? "quiz-match" : "quiz-mismatch"}>
                        <span aria-hidden="true">{isMatch ? "✓" : "–"}</span>
                        <span><strong>{question.title}:</strong> {labels}{!isMatch && " (inna preferencja)"}</span>
                      </li>
                    );
                  })}
                </ul>
              </SportInfo>
            ))}
          </div>
        </section>
      )}
    </section>
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

function PageHeader({ currentPage }) {
  const navigation = pages.filter((page) => page.id !== currentPage);

  return (
    <>
      <h1>Sportnisz</h1>

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
    </>
  );
}

function App() {
  const currentPage = getCurrentPage();

  return (
    <main class={currentPage === "ankieta" ? "quiz-page" : undefined}>
      <PageHeader currentPage={currentPage} />
      {currentPage === "ankieta" && <SportQuiz />}
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

const headerRoot = document.querySelector("#page-header");

if (headerRoot) {
  render(<PageHeader currentPage={getCurrentPage()} />, headerRoot);
} else {
  render(<App />, document.querySelector("#app"));
}
