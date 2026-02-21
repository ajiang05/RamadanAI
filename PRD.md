# Product Requirements Document (PRD): Ramadan Companion

## 1. Overview
**Product Name:** Ramadan Companion — *Your Personal AI Guide for the Holy Month*
**Vision:** A beautifully designed app that helps Muslims navigate Ramadan with ease — offering prayer times, iftar/suhoor planning, Quran reflection, and community connection, all personalized to the user.

## 2. Problem Statement & Pitch Angle
**The Pitch:** *"There are 1.8 billion Muslims in the world and almost none of the top productivity and wellness apps were built with them in mind. Ramadan Companion is the app that finally feels like it was made for us."*

**Timeliness:** Ramadan is happening right now in February/March 2026. This app is not just a hypothetical—it's immediately deployable and personally meaningful to a huge portion of the world, making the narrative highly compelling for hackathon judges.

## 3. Tech Stack & Platform
- **Target Platform:** Web Application
- **Framework:** Next.js (React)
- **Styling:** Vanilla CSS / TailwindCSS (Midnight Blue & Gold theme)
- **AI Integration:** Google Gemini API (via Google AI Studio)
- **Deployment:** Vercel (recommended)

## 4. MVP Scope (Hackathon Delivery)

The implementation priority for the MVP is as follows:

1. **Scaffolding:** Initialize Next.js project, setup TailwindCSS, configure `.env` structure, and establish the Midnight Blue & Gold design system.
2. **Feature 1 (The Core):** Implement GPS-based Prayer Times and Fasting Countdown.
3. **Feature 2 (The AI Heart):** Integrate Gemini API for conversational Quran reflection.
4. **Feature 3 (The Delight):** Build the 30-day Deeds Journal and animated Lantern Mascot (fanoos).
5. **Feature 4 (The Utility):** Add AI Meal Planner recommendations.
6. **Localization:** Multilingual support natively in at least Arabic and English.
2. **AI Quran Reflection:** Gemini-powered Quran reflection — paste any verse and get a personalized, conversational explanation.
3. **Smart Meal Planner:** AI meal suggestions for suhoor and iftar based on dietary preferences and regional fasting duration constraints.
4. **Deeds Journal & Mascot:** A 30-day good deeds journal featuring a glowing animated lantern mascot.
5. **Localization:** Multilingual support natively in at least Arabic and English.

## 4. Hackathon Category Alignment Strategy
Our product specifically targets and excels in the following hackathon categories:

- **Best Use of Gemini API:** Gemini powers a conversational Islamic scholar companion that answers questions about Ramadan practices, explains Quranic verses in context, and generates personalized dua (prayer) reflections based on the user's emotional state that day.
- **Best AI/ML Hack:** A smart meal planner that learns dietary preferences and generates suhoor and iftar recipes optimized for sustained energy during fasting hours, factoring in the user's location (some regions fast 18+ hours).
- **Best DEI Hack:** Serves an underserved community in the tech space. Offers culturally competent app design and authentic DEI integration. Inclusion of multilingual support (Arabic, Urdu, Turkish, Bahasa, French) serves the global diversity of the Muslim world.
- **Best UI/UX Hack:** Features rich Islamic geometric patterns, a core dark midnight blue and gold palette, crescent moon motifs, and smooth transitions tied to the prayer time cycle.
- **Cutest Hack:** Introduces an animated lantern mascot (the iconic Ramadan *fanoos*) that glows brighter as the user completes daily goals (prayers logged, Quran pages read, good deeds tracked).
- **Best Software Hack:** Delivers a complete, polished product spanning prayer time calculations by location, meal planning, AI-assisted reflections, and progress tracking over 30 days.
- **Best Beginner Hack:** Highly modular setup where beginners can easily own self-contained, demonstrable features like the prayer time display, daily checklist, or the lantern mascot animation.

## 5. UI/UX & Design Language
- **Color Palette:** Curated Midnight Blue and Gold.
- **Motifs:** Islamic geometric patterns, crescent moon branding.
- **Animations:** Smooth transitions based on local prayer times (e.g., dawn to dusk visual changes). The mascot (*fanoos* lantern) acts as an adorable, interactive reward mechanism.

---
*Note: This PRD is the reference source of truth for the Ramadan Companion architecture and will guide all subsequent code execution.*
