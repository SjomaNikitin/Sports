import test from "node:test";
import assert from "node:assert/strict";
import { quizQuestions, getRecommendations } from "../quiz.js";
import { sports } from "../sports.js";

const answersFor = (sport) => Object.fromEntries(
  quizQuestions.map(({ id }) => [id, sport.preferences[id][0]]),
);

test("all 18 sports have valid profiles for all 7 questions", () => {
  assert.equal(quizQuestions.length, 7);
  assert.equal(sports.length, 18);
  assert.equal(new Set(quizQuestions.map(({ id }) => id)).size, 7);
  for (const sport of sports) {
    for (const question of quizQuestions) {
      assert.ok(sport.preferences[question.id]?.length, `${sport.name}: ${question.id}`);
      for (const value of sport.preferences[question.id]) {
        assert.ok(question.options.some((option) => option.value === value && !option.neutral), value);
      }
    }
    const results = getRecommendations(sports, answersFor(sport));
    assert.ok(results.some((result) => result.sport === sport));
    assert.ok(results.every(({ matches }) => matches.length === 7));
  }
});

test("every question affects ranking and tied closest matches are retained", () => {
  const answers = answersFor(sports[0]);
  const exact = { name: "Exact", preferences: Object.fromEntries(
    Object.entries(answers).map(([id, answer]) => [id, [answer]]),
  ) };
  for (const question of quizQuestions) {
    const other = question.options.find((option) => option.value !== answers[question.id] && !option.neutral);
    const mismatch = { name: "Mismatch", preferences: { ...exact.preferences, [question.id]: [other.value] } };
    assert.deepEqual(getRecommendations([mismatch, exact], answers).map(({ sport }) => sport.name), ["Exact"]);
    const changed = { ...answers, [question.id]: other.value };
    assert.deepEqual(getRecommendations([mismatch, exact], changed).map(({ sport }) => sport.name), ["Mismatch"]);
    assert.equal(getRecommendations([mismatch, { ...mismatch, name: "Tie" }], answers).length, 2);
  }
});

test("neutral answers match every sport equally", () => {
  const answers = answersFor(sports[0]);
  const neutralQuestions = quizQuestions.filter(({ options }) => options.some((option) => option.neutral));
  for (const question of neutralQuestions) {
    answers[question.id] = question.options.find((option) => option.neutral).value;
    const neutralOnly = { name: "Neutral", preferences: {} };
    const [result] = getRecommendations([neutralOnly], answers);
    assert.ok(result.matches.includes(question));
  }
});

test("incomplete and invalid answers do not produce results", () => {
  assert.deepEqual(getRecommendations(sports, {}), []);
  const answers = answersFor(sports[0]);
  for (const question of quizQuestions) {
    assert.deepEqual(getRecommendations(sports, { ...answers, [question.id]: undefined }), []);
    assert.deepEqual(getRecommendations(sports, { ...answers, [question.id]: "invalid" }), []);
  }
  assert.deepEqual(getRecommendations([], answers), []);
});

test("removed place answers are rejected", () => {
  for (const place of ["gym", "water", "home", "anywhere"]) {
    assert.deepEqual(getRecommendations(sports, { ...answersFor(sports[0]), place }), []);
  }
});
