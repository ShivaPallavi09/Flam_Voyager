# Flam Voyager — AI Interactive Trip & Itinerary Studio

> Senior Software Engineering Intern Assignment Submission for **Flam AI** (Bangalore).

Flam Voyager is an **AI-native, non-chatbot interactive travel workspace** built with React 18, TypeScript, Tailwind CSS, and Google Gemini 2.5 Flash. Instead of a conversational chat bubble, it provides direct, tactile UI controls (live sliders, interactive timelines, inline AI activity swapping, dynamic group cost scaling, and structured packing checklists).

---

## 🌟 Key Features

1. **Non-Chatbot AI Interactiveness**:
   - **Interactive Trip Configurator**: Real-time sliders for duration and group size, vibe tag selectors, and budget tier buttons.
   - **Inline AI Activity Swapper**: Click "Swap Activity" on any timeline card to trigger an isolated AI request to swap that single activity without re-architecting the whole plan.
   - **Dynamic Budget & Group Scaler**: Recalculates category expense allocations live when adjusting group size sliders.
   - **Smart Prep Checklist**: Categorized packing checklist with interactive completion tracking and item additions.

2. **Dual AI Execution Pipeline**:
   - **Live Google Gemini 2.5 Flash Integration**: Enforces JSON Schema mode (`responseMimeType: "application/json"`) for 100% structured component rendering.
   - **Zero-Dependency Mock Fallback**: Includes realistic, high-fidelity mock datasets for immediate offline testing without requiring an API key.

3. **Production UX Polish**:
   - Glassmorphism dark theme (`slate-950` palette).
   - Step-by-step skeleton loader with animated progress stages.
   - Graceful error handling banner with instant mock fallback.
   - Responsive across mobile, tablet, and desktop viewports.

---

## 🏗️ Architecture & AI Pipeline

```
[ User Input / Presets ]
           │
           ▼
┌─────────────────────────┐     Has API Key?     ┌──────────────────────────────┐
│  React State Manager    │ ───────────────────► │  Google Gemini 2.5 Flash REST│
│ (App.tsx & TripForm.tsx)│                      │  JSON Schema Mode Enforced   │
└─────────────────────────┘ ◄─────────────────── └──────────────────────────────┘
           │                                                    │
           │ No Key / Error Fallback                            │ Structured JSON
           ▼                                                    ▼
┌─────────────────────────┐                      ┌──────────────────────────────┐
│  High-Fidelity Mock     │                      │  JSON Parsing & Validation   │
│  Generator Engine       │                      │  (geminiService.ts)          │
└─────────────────────────┘                      └──────────────────────────────┘
           │                                                    │
           └───────────────────┬────────────────────────────────┘
                               ▼
            ┌────────────────────────────────────┐
            │   Interactive Dashboard Viewports  │
            │  - Day-by-Day Timeline             │
            │  - Inline AI Activity Swapper      │
            │  - Group Budget Scaler             │
            │  - Curated Hotels Grid             │
            │  - Prep Checklist                  │
            └────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Glassmorphism
- **Iconography**: Lucide React
- **AI Engine**: Google Gemini 2.5 Flash REST API (`application/json`)
- **Interactivity**: Canvas-Confetti, React State Hooks

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/flam-voyager-ai.git
   cd flam-voyager-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## 💡 How API Keys & Demo Mode Work

- **Demo Mode**: No API key required! Simply choose a preset or fill out the form, and the application will instantly render a rich, realistic trip using the internal mock engine.
- **Custom Gemini API Key**: Click **"API Key Setup"** in the top right header to enter your free Google Gemini API key. All subsequent generations and activity swaps will call live AI models.

---

## ⏱️ Time Spent & Limitations

### Time Spent
- **Requirements Extraction & UX Architecture**: 45 mins
- **Core Component Development**: 2.5 hours
- **Gemini JSON Pipeline & Swapper Logic**: 1.5 hours
- **UI/UX Polish & Responsiveness Audit**: 1 hour
- **Total Development Time**: ~5.75 hours

### Limitations & Future Enhancements
- **Interactive Route Map**: Future versions will integrate Mapbox GL JS for interactive map pins.
- **Multi-Currency Support**: Future iteration will support live forex conversion APIs (EUR, JPY, GBP).

---

## 📄 License

MIT © 2026 Flam Voyager AI
