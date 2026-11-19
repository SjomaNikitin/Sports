import test from "node:test";
import assert from "node:assert/strict";
import { quizQuestions, getRecommendations } from "../quiz.js";
import { sports } from "../sports.js";

const answersFor = (sport) => Object.fromEntries(
  quizQuestions.map(({ id }) => [id, sport.preferences[id][0]]),
);

test("all 18 sports have valid profiles for all 4 key questions", () => {
  assert.equal(quizQuestions.length, 4);
  assert.equal(sports.length, 18);
  assert.equal(new Set(quizQuestions.map(({ id }) => id)).size, 4);

  for (const sport of sports) {
    assert.deepEqual(Object.keys(sport.preferences).sort(), quizQuestions.map(({ id }) => id).sort());
    for (const question of quizQuestions) {
      assert.ok(sport.preferences[question.id]?.length, `${sport.name}: ${question.id}`);
      for (const value of sport.preferences[question.id]) {
        assert.ok(question.options.some((option) => option.value === value && !option.neutral), value);
      }
    }
  }
});

test("recommendations return the three closest sports in score order", () => {
  for (const sport of sports) {
    const results = getRecommendations(sports, answersFor(sport));
    assert.equal(results.length, 3);
    assert.equal(results[0].matches.length, 4);
    assert.ok(results.every((result, index) => !index || result.matches.length <= results[index - 1].matches.length));
  }
});

test("every question affects ranking", () => {
  const answers = answersFor(sports[0]);
  const exact = { name: "Exact", preferences: Object.fromEntries(
    Object.entries(answers).map(([id, answer]) => [id, [answer]]),
  ) };

  for (const question of quizQuestions) {
    const other = question.options.find((option) => option.value !== answers[question.id] && !option.neutral);
    const mismatch = { name: "Mismatch", preferences: { ...exact.preferences, [question.id]: [other.value] } };
    assert.equal(getRecommendations([mismatch, exact], answers)[0].sport.name, "Exact");
    assert.equal(getRecommendations([mismatch, exact], { ...answers, [question.id]: other.value })[0].sport.name, "Mismatch");
  }
});

test("neutral place answer matches every sport", () => {
  const answers = { ...answersFor(sports[0]), place: "any" };
  const neutralOnly = { name: "Neutral", preferences: {} };
  const [result] = getRecommendations([neutralOnly], answers);
  assert.ok(result.matches.includes(quizQuestions.find(({ id }) => id === "place")));
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

test("recommendation pool stays diverse and does not overexpose Parkour", () => {
  let combinations = [{}];
  for (const question of quizQuestions) {
    combinations = combinations.flatMap((answers) => question.options.map((option) => ({
      ...answers,
      [question.id]: option.value,
    })));
  }

  const appearances = new Map(sports.map((sport) => [sport.name, 0]));
  for (const answers of combinations) {
    for (const { sport } of getRecommendations(sports, answers)) {
      appearances.set(sport.name, appearances.get(sport.name) + 1);
    }
  }

  assert.ok([...appearances.values()].every((count) => count > 0));
  assert.ok(appearances.get("Parkour") < combinations.length / 2);
});
