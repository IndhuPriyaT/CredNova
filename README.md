# GigTrust 🛡️

**GigTrust** is an alternate credit scoring system designed explicitly for gig workers. Traditional credit systems rely heavily on standard W-2 payroll history and static credit lines, actively excluding millions of independent contractors, freelancers, and gig economy workers. GigTrust solves this by leveraging Account Aggregator APIs to analyze real-time behavioral financial data.

## Features ✨
- **Dynamic Scoring Engine**: Automatically adapts scores based on transaction consistency, income stability, and spending discipline rather than just credit history.
- **Account Aggregator Consent**: Secure onboarding flow simulating the connection of live bank statements.
- **Real-time Gig Worker Journey**: Interactive simulated dashboard demonstrating how specific financial improvements automatically shift the alternate credit score.
- **Responsive Fintech UI**: A sleek, premium application built natively with React, Vite, and completely bespoke scalable SVG data graphing logic.
- **Sustainability Bonus**: Rewards users with score bumps for eco-friendly and sustainable financial behavior (e.g., consistent public transit usage).

## The Prototype 🚀
This repository contains our interactive frontend prototype built specifically for the hackathon presentation. 

### Core Tech Stack
- **Frontend Layer**: React 18, Vite, React Router v6
- **Styling**: Custom Vanilla CSS (Modern Fintech Aesthetics with modular variables)
- **Data Logic**: Javascript Behavioral Scoring Engine (Fully ported from our Python backend modeling)

## How to Run Locally 💻
1. Clone the repository to your local machine.
2. Install the necessary Node dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to **[`http://localhost:5173/login`](http://localhost:5173/login)** to experience the full interaction flow!

## Core Architecture 📂
- `/src/pages/Login.jsx` — Initial simulated authentication entry point.
- `/src/pages/Consent.jsx` — Account Aggregator connection request highlighting tracking transparency.
- `/src/pages/Dashboard.jsx` — The main interactive simulation dashboard containing the stateful behavioral calculators, reactive dynamic spending graphs, and the animated score visualization.
- `/src/pages/Insights.jsx` — Detailed data breakdown explaining exactly why the engine generated the current alternate score.
- `/src/pages/Sustainability.jsx` — Environmentally-focused bonus metric breakdowns.
