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
*   **Package Manager**: `pnpm` (v10, compatible with Vercel)
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
Use Node.js 24 (also specified in `.nvmrc`) and pnpm 10. Install the versions recorded in the lockfile:
```bash
pnpm install --frozen-lockfile
```

### 3. Spin Up the Local Sandbox Server
Boot up the Vite HMR engine:
```bash
pnpm dev
```
Open up your browser panel and point it to the active port address outputted in your console (usually `http://localhost:5173`).

---

## 📦 Building for Production & Deployment

Run all deployment checks locally:

```bash
pnpm check
```

This runs ESLint, eight puzzle scoring and solver tests, and the TypeScript/Vite production build. You can also run each check separately:

```bash
pnpm lint
pnpm test
pnpm build
```

The production output is `dist`. Preview it locally with `pnpm preview`.

### Deploy on Vercel

1. Commit and push these files to the connected GitHub repository.
2. In Vercel, add a new project and import `linhtetaung-mm/crack-code-solver`.
3. Use these settings:

| Setting | Value |
| --- | --- |
| Root Directory | Repository root (`.`), where `package.json` lives |
| Framework Preset | Vite |
| Node.js Version | 24.x |
| Build Command | `pnpm check` (configured in `vercel.json`) |
| Output Directory | `dist` (configured in `vercel.json`) |
| Install Command | Leave automatic detection enabled |
| Environment Variables | None required |

The local folder is named `crack-code-puzzle`, but it is itself the Git repository root. Do not set Vercel's Root Directory to `crack-code-puzzle` unless you later move the app into a subfolder within the repository.

Vercel detects pnpm from the committed `pnpm-lock.yaml`. Its lockfile version is compatible with pnpm 10; leave the install command on automatic detection. No Corepack environment variable is needed. The app switches views within the root page and currently needs no route rewrites or backend services.

The build command runs lint and tests before creating production assets, so a failed check stops deployment. After the initial import, pushes to the configured production branch trigger deployments.

References: [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite), [package manager detection](https://vercel.com/docs/package-managers), [Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).

---

## 📄 License
This interactive web app engine is open-source and free to distribute. Feel free to modify, hack, or adapt it to build your own mini web puzzles!
