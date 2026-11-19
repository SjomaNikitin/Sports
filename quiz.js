export const quizQuestions = [
  {
    id: "activity",
    title: "Jak chcesz uprawiać sport?",
    options: [
      { value: "solo", label: "Samodzielnie" },
      { value: "pairs", label: "Z jedną osobą" },
      { value: "team", label: "W ekipie lub drużynie" },
    ],
  },
  {
    id: "style",
    title: "Co najbardziej Cię wciąga?",
    options: [
      { value: "game", label: "Gra i rywalizacja" },
      { value: "skill", label: "Triki i rozwijanie techniki" },
      { value: "precision", label: "Celność, balans i kontrola" },
      { value: "endurance", label: "Tempo, wysiłek i wytrzymałość" },
    ],
  },
  {
    id: "place",
    title: "Gdzie najchętniej się ruszasz?",
    options: [
      { value: "outdoor", label: "Na zewnątrz" },
      { value: "indoor", label: "Pod dachem" },
      { value: "any", label: "Miejsce nie ma znaczenia", neutral: true },
    ],
  },
  {
    id: "access",
    title: "Jak chcesz zacząć?",
    options: [
      { value: "easy", label: "Od razu, z prostym sprzętem" },
      { value: "organized", label: "Może być obiekt i specjalny sprzęt" },
    ],
  },
];

export function getRecommendations(sports, answers) {
  const isComplete = quizQuestions.every((question) =>
    question.options.some((option) => option.value === answers[question.id]),
  );

  if (!isComplete) return [];

  const answerKey = quizQuestions.map(({ id }) => answers[id]).join("|");
  const tieBreaker = (name) => [...`${answerKey}|${name}`]
    .reduce((hash, character) => ((hash * 31) + character.codePointAt(0)) >>> 0, 2166136261);

  return sports
    .map((sport) => ({
      sport,
      tie: tieBreaker(sport.name),
      matches: quizQuestions.filter((question) => {
        const option = question.options.find((item) => item.value === answers[question.id]);
        return option.neutral || sport.preferences[question.id]?.includes(option.value);
      }),
    }))
    .sort((left, right) => right.matches.length - left.matches.length || left.tie - right.tie)
    .slice(0, 3)
    .map(({ sport, matches }) => ({ sport, matches }));
}
