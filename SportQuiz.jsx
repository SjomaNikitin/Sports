import { useEffect, useRef, useState } from "preact/hooks";
import { getRecommendations, quizQuestions } from "./quiz.js";
import { sports } from "./sports.js";
import { buttonGlow } from "./button-glow.js";
import SportCard from "./SportCard.jsx";

export default function SportQuiz() {
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
    <section class="sport-quiz page-width" aria-labelledby="quiz-title">
      <header class="quiz-intro" data-reveal>
        <span class="eyebrow">01 / ANKIETA</span>
        <h1 id="quiz-title" class="page-title">TWÓJ SPORT.<br />TWOJE ZASADY<span class="orange-dot">.</span></h1>
        <p>Siedem pytań. Nowe możliwości.<br />Sprawdź, co pasuje do Ciebie.</p>
      </header>

      <div class="quiz-layout">
      <aside class="quiz-sidebar">
        <span class="eyebrow">TWÓJ PROGRES</span>
        <div class="quiz-progress">
          <strong aria-hidden="true">0{answeredCount}<span>/ 0{quizQuestions.length}</span></strong>
          <label for="quiz-progress">Twoje odpowiedzi: {answeredCount} z {quizQuestions.length}</label>
          <progress id="quiz-progress" max={quizQuestions.length} value={answeredCount} />
        </div>
        <p>Bez złych odpowiedzi.<br />Po prostu po Twojemu.</p>
        <span class="quiz-sidebar-arrow" aria-hidden="true">↘</span>
      </aside>

      <form
        class="quiz-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (isComplete) setShowResults(true);
        }}
        onReset={resetQuiz}
      >
        {quizQuestions.map((question, index) => (
          <fieldset class="quiz-question" key={question.id} data-reveal>
            <legend>
              <span class="quiz-question-number" aria-hidden="true">0{index + 1}</span>
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
                  <span>{option.label}</span><span class="quiz-option-mark" aria-hidden="true">↗</span>
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
          <button {...buttonGlow} class="button quiz-button quiz-submit" type="submit" disabled={!isComplete} aria-describedby="quiz-hint">
            Pokaż pasujące sporty
          </button>
          <button {...buttonGlow} class="button quiz-button" type="reset">Zacznij od nowa</button>
        </div>
      </form>
      </div>

      {showResults && (
        <section class="quiz-results" data-reveal aria-labelledby="quiz-results-title">
          <h2 id="quiz-results-title" class="category-title" ref={resultHeading} tabIndex={-1}>Sporty dla Ciebie</h2>
          <p class="quiz-result-summary">
            {bestScore === quizQuestions.length
              ? "Te sporty pasują do wszystkich Twoich odpowiedzi. Wybierz ten, który najbardziej Cię zaciekawi!"
              : `Nie ma sportu pasującego do wszystkich odpowiedzi. Każda z najbliższych propozycji pasuje do ${bestScore} z ${quizQuestions.length} Twoich preferencji.`}
          </p>
          <p class="quiz-hint">Dostępność zależy od pogody i obiektów w Twojej okolicy.</p>
          <div class="sport-list">
            {recommendations.map(({ sport, matches }, index) => (
              <SportCard key={sport.name} {...sport} index={index}>
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
              </SportCard>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}

