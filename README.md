# 🔮 Algorithmaze

> **An interactive algorithm recommendation and step-by-step visualization tool designed for students, educators, and interview candidates.**

[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=for-the-badge)](https://react.dev)
[![Vite 8](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white&style=for-the-badge)](https://vitejs.dev)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white&style=for-the-badge)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-F02436?logo=framer&logoColor=white&style=for-the-badge)](https://www.framer.com/motion/)
[![Recharts](https://img.shields.io/badge/Recharts-2.15-FF6B6B?style=for-the-badge)](https://recharts.org/)

[⚡ Live Demo Website](https://algorithmaze.vercel.app)

---

## 📖 Table of Contents

- [🌌 Introduction](#-introduction)
- [🏗️ System Architecture & Data Flow](#️-system-architecture--data-flow)
- [✨ Core Features](#-core-features)
- [🛠️ Tech Stack & Roles](#️-tech-stack--roles)
- [📂 Repository Structure](#-repository-structure)
- [🚀 Getting Started](#-getting-started)
- [🧩 Developer Extension Guide (Add a New Algorithm)](#-developer-extension-guide-add-a-new-algorithm)
- [👤 Author](#-author)

---

## 🌌 Introduction

Traditional algorithm platforms assume you already know which algorithm or data structure you need. **Algorithmaze flips this paradigm.** 

Instead of searching blindly, you describe your specific problem constraints and goals through an interactive questionnaire. Algorithmaze analyzes your responses, deduces the optimal algorithm, details the selection path, compares its complexity visually, and runs interactive simulations alongside syntax-highlighted code.

---

## 🏗️ System Architecture & Data Flow

Algorithmaze is structured as a single-page reactive application where data flows from a user questionnaire through a centralized inference engine to update visual representations.

```
                  ┌──────────────────────────────┐
                  │      User Questionnaire      │
                  │   (src/components/           │
                  │    ProblemSelector.jsx)      │
                  └──────────────┬───────────────┘
                                 │ Problem Category
                                 │ & Constraint Answers
                                 ▼
                  ┌──────────────────────────────┐
                  │    deduceAlgorithm Engine    │
                  │   (src/utils/                │
                  │    algorithmData.js)         │
                  └──────────────┬───────────────┘
                                 │ Matches optimal 
                                 │ algorithm configuration
                                 ▼
                  ┌──────────────────────────────┐
                  │ Central Application State    │
                  │       (src/App.jsx)          │
                  └──────────────┬───────────────┘
                                 │ Active Algorithm Data
                                 ▼
       ┌─────────────────────────┼─────────────────────────┐
       ▼                         ▼                         ▼
┌──────────────┐          ┌──────────────┐          ┌──────────────┐
│  Overview    │          │Decision Tree │          │  Complexity  │
│  (Card)      │          │ (Reasoning)  │          │   (Charts)   │
└──────────────┘          └──────────────┘          └──────────────┘
       │                         │                         │
       └─────────────────────────┼─────────────────────────┘
                                 ▼
                  ┌──────────────────────────────┐
                  │  Visualizer & Code Block     │
                  │  (Simulation / Sandbox)      │
                  └──────────────────────────────┘
```

1. **Input Stage:** The user selects a high-level category (e.g., Sorting, Graphs, Hashing) and responds to contextual questions (e.g., *"Is stability required?"*, *"Are there negative edge weights?"*).
2. **Inference Stage:** `deduceAlgorithm()` parses the questionnaire inputs and performs deterministic matches against the static knowledge base in `algorithmData.js`.
3. **Reactive Presentation Stage:** App state updates, triggering five synchronized, animated tabs driven by the matched algorithm's data.

---

## ✨ Core Features

*   **🧠 Decision Flow Visualizer:** Demonstrates the logic path that led to the recommended algorithm. Highlighting why options were discarded.
*   **📊 Complexity Analytics:** An interactive chart powered by Recharts that renders runtime growth curves ($O(1)$, $O(\log n)$, $O(n)$, $O(n \log n)$, $O(n^2)$) comparing the selected algorithm to fallback options.
*   **▶️ Step-by-Step Simulation Sandbox:** A robust playback engine to control animations (play, pause, step-forward, step-backward, speed adjustments) for searching, sorting, graph traversal, string matching, tree operations, and collision-resolution hashing.
*   **💻 Reference Implementations:** High-performance, clean C++ implementation blocks complete with one-click copy and syntax highlighting.

---

## 🛠️ Tech Stack & Roles

| Technology | Version | Purpose in Algorithmaze |
| :--- | :--- | :--- |
| **React** | 19.x | Component lifecycle management, client-side rendering, and UI synchronization. |
| **Vite** | 8.x | High-speed frontend build tooling, hot module replacement, and bundling. |
| **Tailwind CSS** | 4.x | Modern styling system utilizing utilities, modern grids, and sleek dark modes. |
| **Framer Motion** | 11.x | Micro-animations, responsive layout transitions, and tab switching animations. |
| **Recharts** | 2.15.x | Generates dynamic line charts plotting mathematical growth curves. |
| **React Syntax Highlighter** | 15.x | Beautiful syntax formatting for the embedded code implementations. |
| **Lucide React** | 0.x | High-quality, lightweight SVG iconography across the visual tabs and headers. |

---

## 📂 Repository Structure

Below is an overview of the key files and directories:

```bash
Algorithmaze/
├── public/                     # Static asset assets
│   └── icons.svg               # Application icons
├── src/
│   ├── assets/                 # Graphics and SVG logos
│   │   ├── hero.png            # Main dashboard hero illustration
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/             # Reusable UI Components
│   │   ├── Navbar.jsx          # Top navigation panel
│   │   ├── HeroSection.jsx     # Hero banner and introductory statistics
│   │   ├── ProblemSelector.jsx # Questionnaire logic and state
│   │   ├── AlgorithmCard.jsx   # Overview panel rendering descriptions & use cases
│   │   ├── DecisionTree.jsx    # Visual representation of the recommendation path
│   │   ├── ComplexityChart.jsx # Time and Space complexity Recharts plot
│   │   ├── ComplexityComparison.jsx # Comprehensive tabular complexity matrix
│   │   ├── Visualizer.jsx      # Core visualizer controller (Step generator & Player)
│   │   ├── TreeTraversalVisualizer.jsx # Custom visualizer for Trees and BSTs
│   │   └── CodeBlock.jsx       # Reference syntax highlighted workspace
│   ├── utils/
│   │   └── algorithmData.js    # Recommendation engine and static algorithm datasets
│   ├── App.jsx                 # Application entry root holding selected algorithm state
│   ├── main.jsx                # DOM mounting wrapper
│   └── index.css               # Global Tailwind directives
├── package.json                # Project configurations & scripts
└── vite.config.js              # Vite building adjustments
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (version 18+ recommended) and `npm` installed.

### Setup and Installation

1. Clone this repository to your local directory:
   ```bash
   git clone https://github.com/your-username/algorithmaze.git
   cd algorithmaze
   ```

2. Install the package dependencies:
   ```bash
   npm install
   ```

3. Spin up the development server locally:
   ```bash
   npm run dev
   ```

   Once running, open the URL (usually `http://localhost:5173`) in your browser to interact with the application.

### Available Scripts

*   `npm run dev` — Starts the local dev server.
*   `npm run build` — Bundles production assets.
*   `npm run preview` — Launches a local preview server for built files.
*   `npm run lint` — Validates file formats and quality rules with ESLint.
*   `npm run deploy` — Deploys the production build folder to GitHub Pages.

---

## 🧩 Developer Extension Guide (Add a New Algorithm)

Algorithmaze is built to be easily extendable. To add a new algorithm, follow these four steps:

### Step 1: Define the Algorithm Metadata
Open [algorithmData.js](file:///c:/Users/Krishna/Projects/Webprog/Algorithmaze/src/utils/algorithmData.js) and add your algorithm object to the `algorithms` export.

```javascript
export const algorithms = {
  // ... existing algorithms
  yourNewAlgorithm: {
    id: "yourNewAlgorithm",
    name: "Algorithm Name",
    type: "CategoryName", // e.g. Sorting, Searching, Hashing, Graph
    condition: "Optimal condition scenario",
    complexity: { 
      time: "O(n log n)", 
      space: "O(1)", 
      timeVal: 4,  // Value from 1 (O(1)) to 6 (O(n²)) for rendering chart
      spaceVal: 1  
    },
    explanation: "Brief description of the logic and mechanics of the algorithm.",
    alternatives: ["AlternativeAlg1", "AlternativeAlg2"],
    code: `// Provide reference code here
void customAlgorithm() {
    // implementation
}`
  }
};
```

### Step 2: Add Questionnaire Option
In [ProblemSelector.jsx](file:///c:/Users/Krishna/Projects/Webprog/Algorithmaze/src/components/ProblemSelector.jsx), locate the `problemTypes` array. Add or edit questions to route to your new algorithm.

```javascript
{
  id: "categoryName",
  title: "Category Display Name",
  questions: [
    {
      id: "questionIdKey",
      question: "Which constraint best describes your problem?",
      options: ["Option A", "Option B", "Option C"]
    }
  ]
}
```

### Step 3: Implement Recommendation Rules
In `src/utils/algorithmData.js`, add matching logic in the `deduceAlgorithm()` function:

```javascript
if (problemType === "categoryName") {
  if (answers.questionIdKey === "Option A") return algorithms.yourNewAlgorithm;
  // ...
}
```

### Step 4: Write Animation & Visualization Steps
Open [Visualizer.jsx](file:///c:/Users/Krishna/Projects/Webprog/Algorithmaze/src/components/Visualizer.jsx) and add your step generation inside `generateSteps()` to animate its data operations dynamically.

---

## 👤 Author

Designed, built, and polished by **Krishna**. 

*If this interactive tool helped you visualize algorithms better, feel free to drop a ⭐ on the repository!*
