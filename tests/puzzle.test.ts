import assert from 'node:assert/strict';
import test from 'node:test';
import { scoreGuess, solveCode } from '../src/crack-code/puzzle.ts';

test('an exact guess wins, including leading zeroes and repeated digits', () => {
  assert.deepEqual(scoreGuess([0, 1, 1, 2], [0, 1, 1, 2]),
    { greens: 4, reds: 0, nulls: 0 });
});

test('correct digits in different positions are red', () => {
  assert.deepEqual(scoreGuess([1, 2, 3, 4], [4, 3, 2, 1]),
    { greens: 0, reds: 4, nulls: 0 });
});

test('repeated guess digits cannot match the same code digit twice', () => {
  assert.deepEqual(scoreGuess([1, 1, 2, 3], [1, 2, 2, 2]),
    { greens: 2, reds: 0, nulls: 2 });
  assert.deepEqual(scoreGuess([1, 1, 2, 2], [2, 3, 1, 3]),
    { greens: 0, reds: 2, nulls: 2 });
});

test('absent digits are all null', () => {
  assert.deepEqual(scoreGuess([1, 2, 3], [4, 5, 6]),
    { greens: 0, reds: 0, nulls: 3 });
});

test('a fresh solver starts with zeroes', () => {
  assert.deepEqual(solveCode(4, []), [0, 0, 0, 0]);
});

test('solver honors all previous feedback and does not mutate history', () => {
  const history = [
    { guess: [0, 0, 0], feedback: { greens: 0, reds: 0, nulls: 3 } },
    { guess: [1, 1, 1], feedback: { greens: 2, reds: 0, nulls: 1 } },
    { guess: [1, 2, 1], feedback: { greens: 1, reds: 2, nulls: 0 } },
  ];
  const original = structuredClone(history);
  assert.deepEqual(solveCode(3, history), [1, 1, 2]);
  assert.deepEqual(history, original);
});

test('contradictory feedback yields no candidate', () => {
  assert.equal(solveCode(3, [
    { guess: [0, 0, 0], feedback: { greens: 3, reds: 0, nulls: 0 } },
    { guess: [0, 0, 0], feedback: { greens: 0, reds: 0, nulls: 3 } },
  ]), null);
});

test('solver can return a fully constrained ten-digit code', () => {
  const code = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  assert.deepEqual(solveCode(10, [
    { guess: code, feedback: { greens: 10, reds: 0, nulls: 0 } },
  ]), code);
});
