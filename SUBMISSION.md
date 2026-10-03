*This is a submission for the [Hacktoberfest Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)*

## What I Built

I built **Syllabiq**, an open-source, personalized syllabus study companion and diagnostic platform. 

### Who I Built It For
I built this for my friend **Alex**, a university student who was drowning in chaotic exam prep. Like many students, Alex had course syllabi scattered across bloated LMS portals, PDFs buried in downloads folders, fragmented Google Docs for notes, and zero easy way to test whether they actually understood the material until exam day arrived. The cognitive friction of just figuring out *"What do I need to study next?"* was causing serious anxiety and procrastination.

### What Problem It Solves
Most study apps are either overly simplistic flashcard decks or expensive subscription-locked platforms ($15–$25/month) that don't respect a student's actual course syllabus. 

**Syllabiq** bridges this gap by grounding everything in the student's actual syllabus structure:
- **Hierarchical Syllabus Organization**: Automatically maps courses into Units and Topics with real-time mastery tracking.
- **3-in-1 Study Hub per Topic**:
  1. 📝 **Curated Notes & Personal Scratchpad**: Concise conceptual breakdowns, formula/code snippets, and an auto-saving student scratchpad that persists locally.
  2. ❓ **Active Practice Quizzes**: Topic-level quizzes with immediate feedback and pedagogical explanations.
  3. 📊 **Unit Assessments & Diagnostic Engine**: Timed mock exams that pinpoint weak spots and generate personalized study recommendations before real exams.
- **Smart Syllabus Outline Importer**: Alex can paste their raw course outline from their university portal, and Syllabiq converts it into structured study modules.

---

## Demo

- **Local Preview**: Run `python -m http.server 8080` and visit `http://localhost:8080/index.html` (or simply double-click `index.html` in any browser).
- **Core User Flow Demonstrated**:
  1. **Course & Topic Selection**: Seamless switching between Computer Science (*Data Structures & Complexity*) and Biology (*Cell Biology & Genetics*), or importing a custom syllabus.
  2. **Topic Mastery & Notes**: Interactive notes with bullet/formula formatting helpers and localStorage auto-save.
  3. **Interactive Quizzing**: Dynamic multiple-choice questions with explanation reveals and score tallying.
  4. **Diagnostic Assessments**: Timed assessments yielding targeted study recommendations based on missed questions.
  5. **Theme Customization**: Responsive dark and light mode toggle.

---

## Code

🔗 **GitHub Repository**: [https://github.com/deepmanna2007/Syllabiq](https://github.com/deepmanna2007/Syllabiq)

The project is completely self-contained with **zero external runtime dependencies** (no heavy npm bundles, no tracking scripts, no cloud logins required):

- **Repository Structure**:
  - [`index.html`](file:///d:/Hacktoberfest/challenge1/index.html) — Semantic HTML5 application architecture, accessibility attributes, sidebar navigator, and modal dialogs.
  - [`styles.css`](file:///d:/Hacktoberfest/challenge1/styles.css) — Custom design system using modern CSS variables, glassmorphism, responsive grid layout, and dark/light themes.
  - [`app.js`](file:///d:/Hacktoberfest/challenge1/app.js) — Reactive state store, Markdown parser, quiz runner, countdown timer, and recommendation engine.
  - [`data.js`](file:///d:/Hacktoberfest/challenge1/data.js) — Comprehensive default syllabi, notes, quizzes, and diagnostic assessment question banks.
  - [`README.md`](file:///d:/Hacktoberfest/challenge1/README.md) — Comprehensive setup, architecture, and usage guide.

---

## How I Built It

To build a genuinely helpful, distraction-free study tool, I used an **agentic pairing workflow**:
- **Agentic AI Architecture**: Built using autonomous agent capabilities with iterative code generation, rigorous workspace validation, and clean architectural separation of concerns.
- **Client-Side Knowledge Synthesis**: Rather than tying the application to a paid cloud API that could fail offline, the intelligence is baked directly into the client-side diagnostic engine. It analyzes student answer patterns, calculates unit-level passing thresholds, and automatically serves personalized study recommendations based on syllabus concepts.
- **Zero-Friction Local First**: Built using standard Web APIs (`localStorage`, CSS custom properties, vanilla ES6 modules) to guarantee instant load times and zero network overhead.

---

## Why Does Open Innovation Matter?

Open innovation is essential—especially in education:

1. **Accessibility Without Paywalls**: High-quality study tools should not be gated behind monthly subscriptions. Every student, regardless of financial background, deserves tools that help them succeed.
2. **Student Privacy First**: Closed study platforms harvest student notes, track study habits, and monetize educational data. With Syllabiq's open-source, local-first design, notes and exam scores stay in the student's browser—private, secure, and offline-ready.
3. **Customizability**: Closed educational platforms force students into rigid templates. An open platform allows educators and learners to fork the project, plug in their own course syllabi (from STEM to Humanities to Medical Board prep), and adapt it to their learning style.

---

## My Agent Session

This application was engineered through an agentic pairing session:
- **Planning**: Outlined a syllabus-first data hierarchy and designed the 3-mode workflow (Notes ➔ Quiz ➔ Assessment).
- **Execution**: Generated clean, accessible HTML5 structure, a curated CSS design system with light/dark contrast standards, and robust JavaScript state management.
- **Validation**: Launched a local HTTP daemon and verified that all endpoints (`/index.html`, `/styles.css`, `/data.js`, `/app.js`) respond with HTTP 200 and run smoothly.

---

## Prize Categories

- **Hacktoberfest Weekend Challenge: Build for a Friend**

---

**Submitted by**: [@deepmanna2007](https://github.com/deepmanna2007)
