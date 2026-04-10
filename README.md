<div align="center">

<img src="public/icons.svg" alt="Algorithmaze Logo" width="72" />

# Algorithmaze

**An interactive algorithm recommendation and visualization tool for learners, students, and interview preppers.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green)](#)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?logo=vercel)](https://algorithmaze.vercel.app)

[🚀 Live Demo](https://algorithmaze.vercel.app) · [Report Bug](#) · [Request Feature](#)

</div>

---

## What is Algorithmaze?

Most algorithm tools assume you already know what to look for. Algorithmaze flips that — you describe your problem, and it guides you to the right algorithm or data structure, explains *why*, shows you how it behaves step by step, and hands you reference code.

Whether you're cramming for interviews or building intuition from scratch, Algorithmaze makes abstract CS concepts concrete.

---

## Features

- **Problem-driven recommendations** — answer a short questionnaire, get the right algorithm matched to your problem
- **Decision flow reasoning** — see exactly *why* an algorithm was chosen, not just *what*
- **Complexity analysis** — interactive charts and comparison tables for time/space complexity
- **Step-by-step visualizer** — play, pause, replay, and reset algorithm simulations
- **Syntax-highlighted code** — reference implementations for every supported algorithm
- **Broad coverage** — searching, sorting, graphs, trees, string matching, data structures, and hashing

---

## Algorithms Covered

| Category | Algorithms / Techniques |
|---|---|
| **Searching** | Binary Search, Linear Search |
| **Sorting** | Quick Sort, Merge Sort, Insertion Sort, Selection Sort |
| **Graph** | BFS, DFS, Dijkstra, Bellman-Ford |
| **String Matching** | Naive, KMP |
| **Data Structures** | Stack, Queue, Linked List |
| **Tree** | Traversals, Find Min/Max (BST), Find Kth Min/Max |
| **Hashing** | Linear Probing, Quadratic Probing, Double Hashing, Random Probing, Rehashing |

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS 4, Framer Motion |
| Charts | Recharts |
| Code Display | react-syntax-highlighter |
| Icons | Lucide React |
| Deployment | GitHub Pages via gh-pages |

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Installation

```bash
git clone https://github.com/your-username/algorithmaze.git
cd algorithmaze
npm install
```

### Run Locally

```bash
npm run dev
```

Open the URL shown by Vite (usually `http://localhost:5173`).

---

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Create production build
npm run preview   # Preview production build locally
npm run lint      # Run ESLint checks
npm run deploy    # Build and publish to GitHub Pages
```

---

## How It Works

```
User Input (ProblemSelector)
        │
        ▼
deduceAlgorithm()  ←  algorithmData.js (knowledge base)
        │
        ▼
Selected Algorithm Object
        │
   ┌────┴────────────────────────────────┐
   ▼        ▼          ▼         ▼       ▼
Overview  Decision  Complexity  Viz    Code
          Flow      Chart
```

1. User picks a problem category and answers focused questions.
2. `deduceAlgorithm(problemType, answers)` maps responses to the best-fit algorithm.
3. The result drives all five tabs: **Overview**, **Decision Flow**, **Complexity**, **Visualizer**, and **Code**.

Logic is deterministic and centralized in `src/utils/algorithmData.js`, making it easy to extend.

---

## Project Structure

```
Algorithmaze/
├── public/
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── ProblemSelector.jsx       # User questionnaire
│   │   ├── AlgorithmCard.jsx         # Overview tab
│   │   ├── DecisionTree.jsx          # Reasoning path tab
│   │   ├── ComplexityChart.jsx       # Complexity visualization
│   │   ├── ComplexityComparison.jsx  # Comparison table
│   │   ├── Visualizer.jsx            # Step-by-step simulation
│   │   ├── TreeTraversalVisualizer.jsx
│   │   └── CodeBlock.jsx             # Syntax-highlighted code
│   ├── utils/
│   │   └── algorithmData.js          # Algorithm knowledge base + recommendation logic
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

---

## Extending Algorithmaze

To add a new algorithm:

1. **Add its object** in `src/utils/algorithmData.js` (complexity, explanation, code, alternatives)
2. **Extend `problemTypes`** in `ProblemSelector.jsx` if a new question option is needed
3. **Update `deduceAlgorithm`** with the new mapping rule
4. **Add simulation logic** in `src/components/Visualizer.jsx` for interactive playback

---

## Deployment

This project deploys to GitHub Pages via the `gh-pages` package.

```bash
npm run deploy
```

This runs the production build (`predeploy`) and publishes the `dist/` folder automatically.

---

## Author

Designed and developed by **Krishna**.

---

<div align="center">

If Algorithmaze helped you, consider giving it a ⭐ on GitHub!

</div>
