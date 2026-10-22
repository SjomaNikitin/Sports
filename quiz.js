export const quizQuestions = [
  {
    id: "activity", title: "Forma aktywności",
    options: [
      { value: "solo", label: "Indywidualnie" },
      { value: "team", label: "Drużynowo" },
      { value: "pairs", label: "W parach" },
      { value: "group-solo", label: "W grupie, ale indywidualnie" },
    ],
  },
  {
    id: "place", title: "Miejsce uprawiania",
    options: [
      { value: "outdoor", label: "Na zewnątrz" },
      { value: "indoor", label: "W hali" },
    ],
  },
  {
    id: "contact", title: "Kontakt fizyczny",
    options: [
      { value: "contact", label: "Sporty kontaktowe" },
      { value: "non-contact", label: "Sporty bezkontaktowe" },
      { value: "any", label: "Bez znaczenia", neutral: true },
    ],
  },
  {
    id: "equipment", title: "Sprzęt",
    options: [
      { value: "none", label: "Bez sprzętu" },
      { value: "basic", label: "Podstawowy sprzęt" },
      { value: "specialist", label: "Specjalistyczny sprzęt" },
      { value: "any", label: "Nie mam preferencji", neutral: true },
    ],
  },
  {
    id: "conditions", title: "Warunki uprawiania",
    options: [
      { value: "partners", label: "Wymaga partnera lub zespołu" },
      { value: "independent", label: "Można uprawiać samodzielnie" },
      { value: "infrastructure", label: "Potrzebna jest infrastruktura sportowa" },
      { value: "anywhere", label: "Można uprawiać niemal wszędzie" },
    ],
  },
  {
    id: "season", title: "Pora roku",
    options: [
      { value: "year-round", label: "Cały rok" },
      { value: "summer", label: "Lato" },
      { value: "winter", label: "Zima" },
      { value: "seasonal", label: "Sport sezonowy, bez preferencji" },
    ],
  },
  {
    id: "cost", title: "Koszt rozpoczęcia",
    options: [
      { value: "low", label: "Niski" },
      { value: "medium", label: "Średni" },
      { value: "high", label: "Wysoki" },
      { value: "any", label: "Bez ograniczeń", neutral: true },
    ],
  },
];

export function getRecommendations(sports, answers) {
  const isComplete = quizQuestions.every((question) =>
    question.options.some((option) => option.value === answers[question.id]),
  );

  if (!isComplete) return [];

  // Neutral answers satisfy every sport equally; all other answers have equal weight.
  const rankedSports = sports.map((sport) => ({
    sport,
    matches: quizQuestions.filter((question) => {
      const option = question.options.find((option) => option.value === answers[question.id]);
      return option.neutral || sport.preferences[question.id]?.includes(option.value);
    }),
  }));
  const bestScore = Math.max(0, ...rankedSports.map(({ matches }) => matches.length));

  return rankedSports.filter(({ matches }) => matches.length === bestScore);
}
