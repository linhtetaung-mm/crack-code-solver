export interface Feedback {
  greens: number;
  reds: number;
  nulls: number;
}

export interface Step {
  guess: number[];
  feedback: Feedback;
}

// Match each occurrence only once, including repeated digits.
export function scoreGuess(code: number[], guess: number[]): Feedback {
  const greens = code.filter((digit, index) => digit === guess[index]).length;
  const codeCounts = new Array<number>(10).fill(0);
  const guessCounts = new Array<number>(10).fill(0);
  code.forEach(digit => codeCounts[digit]++);
  guess.forEach(digit => guessCounts[digit]++);
  const matches = codeCounts.reduce((total, count, digit) =>
    total + Math.min(count, guessCounts[digit]), 0);
  return { greens, reds: matches - greens, nulls: code.length - matches };
}

export function solveCode(level: number, history: Step[]): number[] | null {
  const result = new Array<number>(level).fill(0);

  const backtrack = (index: number): boolean => {
    if (index === level) {
      return history.every(step => {
        const actual = scoreGuess(result, step.guess);
        return actual.greens === step.feedback.greens &&
          actual.reds === step.feedback.reds;
      });
    }

    for (let digit = 0; digit <= 9; digit++) {
      result[index] = digit;
      const valid = history.every(step => {
        let greens = 0;
        for (let i = 0; i <= index; i++) {
          if (result[i] === step.guess[i]) greens++;
        }
        return greens <= step.feedback.greens &&
          greens + level - 1 - index >= step.feedback.greens;
      });
      if (valid && backtrack(index + 1)) return true;
    }
    return false;
  };

  return backtrack(0) ? [...result] : null;
}
