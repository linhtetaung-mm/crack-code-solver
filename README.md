# 🧩 CrackCode Puzzle & Advanced Solver

A lightweight, high-performance mini puzzle game and automated solver built with **React**, **TypeScript**, **Tailwind CSS v4**, and **Vite**. This application features an interactive game environment alongside a persistent background solver tool, designed to offer seamless, zero-state-loss navigation.

## 🚀 Key Features

*   **🎮 Game Mode (`CrackCode`)**: An engaging, interactive logic puzzle experience.
*   **🤖 Advanced Solver Mode**: A persistent automated tool built to crack code combinations behind the scenes.
*   **💾 Zero State Loss**: Tab navigation uses smart visual toggling (`hidden`) instead of standard conditional rendering. Your active game progress, inputs, and solver algorithms remain perfectly intact when switching tabs.
*   **📝 Integrated Documentation**: Game rules and hints are parsed dynamically from a raw `.md` asset via a zero-overhead modal overlay window.
*   **⚡ Optimized Performance**: Managed exclusively through **pnpm** and hard-linked node assets to preserve local disk space and offer rapid build runtimes.

---

## 🛠️ Tech Stack & Dependencies

*   **Runtime & Bundler**: Vite (React + TypeScript plugin)
*   **Package Manager**: `pnpm` (v11+)
*   **Styles & Graphics**: Tailwind CSS v4, Lucide React (Tree-shakable layout icons)
*   **Markdown Core**: `react-markdown`, `@tailwindcss/typography` (Native fluid prose layouts)

---

## 🛠️ Local Development Setup

Follow these quick commands to spin up the codebase in your local developer space:

### 1. Clone the Repository
```bash
git clone https://github.com/linhtetaung-mm/crack-code-solver.git
cd crack-code-solver
```

### 2. Install Project Dependencies
Ensure you have `pnpm` configured globally on your local machine, then initialize the workspace:
```bash
pnpm install
```

### 3. Spin Up the Local Sandbox Server
Boot up the Vite HMR engine:
```bash
pnpm dev
```
Open up your browser panel and point it to the active port address outputted in your console (usually `http://localhost:5173`).

---

## 📦 Building for Production & Deployment

To generate an optimized, fully compressed static production bundle ready to be shipped directly onto free host nodes like Vercel, Netlify, or GitHub Pages, execute:

```bash
pnpm build
```
The build artifacts will compile instantly into a self-contained static directory asset block named `/dist`.

---

## 📄 License
This interactive web app engine is open-source and free to distribute. Feel free to modify, hack, or adapt it to build your own mini web puzzles!
