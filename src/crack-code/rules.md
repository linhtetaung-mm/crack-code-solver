# 🧩 How to Play: Crack the Code

Welcome to **CrackCode**! Your mission is to break a hidden secret passcode using deductive logic, math, and strategic guessing. If you get stuck, you can switch over to the **Advanced Solver** tab to analyze the possibilities.

---

## 🎯 The Objective
The game generates a hidden secret code of a set length (e.g., 4 digits up to 10 digits). You must deduce the exact sequence of numbers in the fewest attempts possible.

---

## 🚦 Understanding the Feedback
Every time you submit a guess, the game evaluates your input and gives you two vital clues to help you narrow down the answer:

*   **🟢 Correct Position**: The number of digits that are **correct** and in the **exact right spot**.
*   **🔴 Wrong Position**: The number of digits that are part of the secret code, but you placed them in the **wrong spot**.
*   **⚪️ Incorrect**: If a digit doesn't trigger a green or yellow indicator, it is not part of the passcode at all.


### 💡 Example Scenario
Imagine the secret code is **`4 2 7 1`**:
*   If you guess **`1 2 3 4`**:
    *   The `2` is in the exact right spot. (**1 Correct Position** 🟢)
    *   The `1` and `4` are in the code but in the wrong spots. (**2 Wrong Positions** 🔴)
    *   The `3` is not in the code.

---

## 🛠️ Advanced Solver & Technical Note
Having trouble with larger numbers? Switch over to the **Advanced Solver**! It uses a backtracking algorithm to filter out impossible combinations based on your hints.

⚠️ **Performance Warning (10+ Digits)**: 
When playing with huge 10-digit combinations, computing all candidate numbers simultaneously can cause intense CPU load and crash the web browser. 

The original algorithm for this puzzle was natively built 4 years ago using optimized **C** structures (and later **Python** arrays). Because this current web edition was quickly generated with the help of **AI assistance**, the backtrack loop can be heavy. To prevent browser crashes on large puzzles, future optimizations will introduce pre-filtering functions before launching full backtracking loops. 

Feel free to modify, optimize, and improve the solver's efficiency!

---

## 🏁 Tips for Victory
1.  **Eliminate First**: Spend your first two turns guessing entirely different sets of numbers (e.g., `1 2 3 4` then `5 6 7 8`) to quickly see which digits exist in the puzzle.
2.  **Isolate the Greens**: Once you lock down a "Correct Position" (🟢), keep that number locked in place for your subsequent guesses.
3.  **Trust the Solver**: If the math gets too dizzying, plug your historical hints into the automated solver to see the remaining possibilities!

**Good luck, Codebreaker!**
