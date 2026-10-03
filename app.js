/**
 * Syllabiq - Personalized Syllabus Study Guide, Notes, Quizzes & Assessments
 * Main Application Logic
 */

(function () {
  "use strict";

  // Storage Keys
  const STORAGE_KEYS = {
    SYLLABI: "syllabiq_syllabi",
    PROGRESS: "syllabiq_progress",
    PROFILE: "syllabiq_profile",
    THEME: "syllabiq_theme"
  };

  // State
  let state = {
    syllabi: [],
    profile: {
      name: "Alex Morgan",
      streak: 4,
      targetExam: "",
      pace: "balanced"
    },
    progress: {
      masteredTopics: {}, // { [topicId]: boolean }
      personalNotes: {},  // { [topicId]: string }
      quizScores: {},     // { [topicId]: number }
      assessmentScores: {} // { [unitId]: { score: number, passed: boolean, date: string } }
    },
    activeSyllabusId: null,
    activeUnitId: null,
    activeTopicId: null,
    activeTab: "notes",
    searchTerm: "",
    // Quiz state
    quiz: {
      currentQuestionIndex: 0,
      userAnswers: {},
      score: 0,
      isFinished: false
    },
    // Assessment state
    assessment: {
      isActive: false,
      timerInterval: null,
      secondsRemaining: 0,
      userAnswers: {}
    }
  };

  // DOM Elements Cache
  const DOM = {
    // Header & Profile
    themeToggleBtn: document.getElementById("themeToggleBtn"),
    themeIcon: document.getElementById("themeIcon"),
    openProfileBtn: document.getElementById("openProfileBtn"),
    profileNameDisplay: document.getElementById("profileNameDisplay"),
    streakCount: document.getElementById("streakCount"),
    headerMasteryFill: document.getElementById("headerMasteryFill"),
    headerMasteryText: document.getElementById("headerMasteryText"),

    // Sidebar
    syllabusSelect: document.getElementById("syllabusSelect"),
    syllabusCountBadge: document.getElementById("syllabusCountBadge"),
    topicCountDisplay: document.getElementById("topicCountDisplay"),
    openNewSyllabusBtn: document.getElementById("openNewSyllabusBtn"),
    openAddTopicBtn: document.getElementById("openAddTopicBtn"),
    topicSearch: document.getElementById("topicSearch"),
    unitsContainer: document.getElementById("unitsContainer"),

    // Main Header / Hero
    crumbSyllabus: document.getElementById("crumbSyllabus"),
    crumbUnit: document.getElementById("crumbUnit"),
    crumbTopic: document.getElementById("crumbTopic"),
    activeTopicTitle: document.getElementById("activeTopicTitle"),
    topicDurationBadge: document.getElementById("topicDurationBadge"),
    topicUnitNameBadge: document.getElementById("topicUnitNameBadge"),
    toggleMasteryBtn: document.getElementById("toggleMasteryBtn"),
    masteryIcon: document.getElementById("masteryIcon"),
    masteryBtnLabel: document.getElementById("masteryBtnLabel"),

    // Tabs
    tabNotesBtn: document.getElementById("tabNotesBtn"),
    tabQuizBtn: document.getElementById("tabQuizBtn"),
    tabAssessmentBtn: document.getElementById("tabAssessmentBtn"),
    quizCountBadge: document.getElementById("quizCountBadge"),
    paneNotes: document.getElementById("paneNotes"),
    paneQuiz: document.getElementById("paneQuiz"),
    paneAssessment: document.getElementById("paneAssessment"),

    // Tab 1: Notes
    notesRenderArea: document.getElementById("notesRenderArea"),
    takeawaysBox: document.getElementById("takeawaysBox"),
    takeawaysList: document.getElementById("takeawaysList"),
    personalNotesTextarea: document.getElementById("personalNotesTextarea"),
    notesSaveStatus: document.getElementById("notesSaveStatus"),
    insertBulletBtn: document.getElementById("insertBulletBtn"),
    insertFormulaBtn: document.getElementById("insertFormulaBtn"),
    clearNotesBtn: document.getElementById("clearNotesBtn"),

    // Tab 2: Quiz
    quizActiveState: document.getElementById("quizActiveState"),
    quizFinishedState: document.getElementById("quizFinishedState"),
    quizStepCounter: document.getElementById("quizStepCounter"),
    quizProgressFill: document.getElementById("quizProgressFill"),
    quizScoreNumber: document.getElementById("quizScoreNumber"),
    quizQuestionText: document.getElementById("quizQuestionText"),
    quizOptionsGrid: document.getElementById("quizOptionsGrid"),
    quizExplanationBox: document.getElementById("quizExplanationBox"),
    quizExplanationText: document.getElementById("quizExplanationText"),
    prevQuizBtn: document.getElementById("prevQuizBtn"),
    nextQuizBtn: document.getElementById("nextQuizBtn"),
    quizOutcomeIcon: document.getElementById("quizOutcomeIcon"),
    quizFinalScoreTitle: document.getElementById("quizFinalScoreTitle"),
    quizFinalScoreDesc: document.getElementById("quizFinalScoreDesc"),
    retakeQuizBtn: document.getElementById("retakeQuizBtn"),
    continueToAssessmentBtn: document.getElementById("continueToAssessmentBtn"),

    // Tab 3: Assessment
    assessmentOverviewCard: document.getElementById("assessmentOverviewCard"),
    unitAssessmentTitle: document.getElementById("unitAssessmentTitle"),
    unitAssessmentDesc: document.getElementById("unitAssessmentDesc"),
    assessmentQCount: document.getElementById("assessmentQCount"),
    assessmentDuration: document.getElementById("assessmentDuration"),
    assessmentPassingScore: document.getElementById("assessmentPassingScore"),
    startAssessmentBtn: document.getElementById("startAssessmentBtn"),
    assessmentActiveCard: document.getElementById("assessmentActiveCard"),
    assessmentExamName: document.getElementById("assessmentExamName"),
    assessmentAnsweredRatio: document.getElementById("assessmentAnsweredRatio"),
    timerCountdown: document.getElementById("timerCountdown"),
    assessmentForm: document.getElementById("assessmentForm"),
    cancelAssessmentBtn: document.getElementById("cancelAssessmentBtn"),
    submitAssessmentBtn: document.getElementById("submitAssessmentBtn"),
    assessmentResultsCard: document.getElementById("assessmentResultsCard"),
    resultsScoreBanner: document.getElementById("resultsScoreBanner"),
    resultsPercentage: document.getElementById("resultsPercentage"),
    resultsStatusMessage: document.getElementById("resultsStatusMessage"),
    resultsScoreRaw: document.getElementById("resultsScoreRaw"),
    personalizedRecsList: document.getElementById("personalizedRecsList"),
    retakeAssessmentBtn: document.getElementById("retakeAssessmentBtn"),
    backToNotesBtn: document.getElementById("backToNotesBtn"),

    // Modals
    newSyllabusModal: document.getElementById("newSyllabusModal"),
    closeNewSyllabusModal: document.getElementById("closeNewSyllabusModal"),
    cancelNewSyllabusBtn: document.getElementById("cancelNewSyllabusBtn"),
    saveNewSyllabusBtn: document.getElementById("saveNewSyllabusBtn"),
    newSyllabusTitle: document.getElementById("newSyllabusTitle"),
    newSyllabusCategory: document.getElementById("newSyllabusCategory"),
    newSyllabusOutline: document.getElementById("newSyllabusOutline"),

    addTopicModal: document.getElementById("addTopicModal"),
    closeAddTopicModal: document.getElementById("closeAddTopicModal"),
    cancelAddTopicBtn: document.getElementById("cancelAddTopicBtn"),
    saveNewTopicBtn: document.getElementById("saveNewTopicBtn"),
    targetUnitSelect: document.getElementById("targetUnitSelect"),
    newTopicTitle: document.getElementById("newTopicTitle"),
    newTopicDuration: document.getElementById("newTopicDuration"),
    newTopicNotes: document.getElementById("newTopicNotes"),

    profileModal: document.getElementById("profileModal"),
    closeProfileModal: document.getElementById("closeProfileModal"),
    cancelProfileBtn: document.getElementById("cancelProfileBtn"),
    saveProfileBtn: document.getElementById("saveProfileBtn"),
    profileNameInput: document.getElementById("profileNameInput"),
    profileTargetExam: document.getElementById("profileTargetExam"),
    profilePace: document.getElementById("profilePace"),
    resetDefaultDataBtn: document.getElementById("resetDefaultDataBtn"),

    // Toast
    toastContainer: document.getElementById("toastContainer")
  };

  /* ==========================================================================
     Storage & State Initialization
     ========================================================================== */

  function loadState() {
    try {
      const storedSyllabi = localStorage.getItem(STORAGE_KEYS.SYLLABI);
      if (storedSyllabi) {
        state.syllabi = JSON.parse(storedSyllabi);
      } else {
        state.syllabi = JSON.parse(JSON.stringify(DEFAULT_SYLLABI));
        saveSyllabi();
      }

      const storedProgress = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      if (storedProgress) {
        state.progress = JSON.parse(storedProgress);
      }

      const storedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (storedProfile) {
        state.profile = Object.assign(state.profile, JSON.parse(storedProfile));
      }

      const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || "dark";
      setTheme(storedTheme);
    } catch (e) {
      console.warn("Error loading from local storage, using defaults", e);
      state.syllabi = JSON.parse(JSON.stringify(DEFAULT_SYLLABI));
    }

    // Set initial active syllabus, unit, topic
    if (state.syllabi.length > 0) {
      state.activeSyllabusId = state.syllabi[0].id;
      if (state.syllabi[0].units.length > 0) {
        state.activeUnitId = state.syllabi[0].units[0].id;
        if (state.syllabi[0].units[0].topics.length > 0) {
          state.activeTopicId = state.syllabi[0].units[0].topics[0].id;
        }
      }
    }
  }

  function saveSyllabi() {
    try {
      localStorage.setItem(STORAGE_KEYS.SYLLABI, JSON.stringify(state.syllabi));
    } catch (e) {
      console.error("Could not save syllabi to localStorage", e);
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(state.progress));
    } catch (e) {
      console.error("Could not save progress to localStorage", e);
    }
    updateGlobalMasteryHeader();
  }

  function saveProfile() {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(state.profile));
    } catch (e) {
      console.error("Could not save profile to localStorage", e);
    }
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    if (DOM.themeIcon) {
      DOM.themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
    }
  }

  /* ==========================================================================
     Helper Getters
     ========================================================================== */

  function getActiveSyllabus() {
    return state.syllabi.find(s => s.id === state.activeSyllabusId) || state.syllabi[0];
  }

  function getActiveUnit() {
    const syl = getActiveSyllabus();
    if (!syl || !syl.units) return null;
    return syl.units.find(u => u.id === state.activeUnitId) || syl.units[0] || null;
  }

  function getActiveTopic() {
    const unit = getActiveUnit();
    if (!unit || !unit.topics) return null;
    return unit.topics.find(t => t.id === state.activeTopicId) || unit.topics[0] || null;
  }

  function getAllTopicsForSyllabus(syl) {
    if (!syl || !syl.units) return [];
    return syl.units.flatMap(u => u.topics || []);
  }

  /* ==========================================================================
     UI Rendering
     ========================================================================== */

  function renderProfileAndHeader() {
    if (DOM.profileNameDisplay) {
      DOM.profileNameDisplay.textContent = state.profile.name || "Student";
    }
    if (DOM.streakCount) {
      DOM.streakCount.textContent = state.profile.streak || "1";
    }
    updateGlobalMasteryHeader();
  }

  function updateGlobalMasteryHeader() {
    const syl = getActiveSyllabus();
    if (!syl) return;

    const allTopics = getAllTopicsForSyllabus(syl);
    if (allTopics.length === 0) {
      if (DOM.headerMasteryFill) DOM.headerMasteryFill.style.width = "0%";
      if (DOM.headerMasteryText) DOM.headerMasteryText.textContent = "0%";
      return;
    }

    const masteredCount = allTopics.filter(t => state.progress.masteredTopics[t.id]).length;
    const percentage = Math.round((masteredCount / allTopics.length) * 100);

    if (DOM.headerMasteryFill) DOM.headerMasteryFill.style.width = `${percentage}%`;
    if (DOM.headerMasteryText) DOM.headerMasteryText.textContent = `${percentage}%`;
  }

  function renderSyllabusDropdown() {
    DOM.syllabusSelect.innerHTML = "";
    state.syllabi.forEach(s => {
      const option = document.createElement("option");
      option.value = s.id;
      option.textContent = `${s.icon ? s.icon + " " : ""}${s.title}`;
      if (s.id === state.activeSyllabusId) {
        option.selected = true;
      }
      DOM.syllabusSelect.appendChild(option);
    });

    if (DOM.syllabusCountBadge) {
      DOM.syllabusCountBadge.textContent = `${state.syllabi.length} available`;
    }
  }

  function renderUnitsAndTopics() {
    const syl = getActiveSyllabus();
    if (!syl) {
      DOM.unitsContainer.innerHTML = `<div class="empty-state">No syllabus found.</div>`;
      return;
    }

    const query = state.searchTerm.toLowerCase().trim();
    let totalTopicsCount = 0;
    DOM.unitsContainer.innerHTML = "";

    syl.units.forEach((unit, unitIdx) => {
      // Filter topics if search query is active
      const filteredTopics = (unit.topics || []).filter(topic => {
        if (!query) return true;
        return (
          topic.title.toLowerCase().includes(query) ||
          (topic.summary && topic.summary.toLowerCase().includes(query)) ||
          (topic.notes && topic.notes.toLowerCase().includes(query))
        );
      });

      totalTopicsCount += (unit.topics || []).length;

      // Check if unit assessment is passed
      const unitAssessmentRecord = state.progress.assessmentScores[unit.id];
      const assessmentPassed = unitAssessmentRecord && unitAssessmentRecord.passed;

      const unitGroup = document.createElement("div");
      unitGroup.className = "unit-group";
      unitGroup.dataset.unitId = unit.id;

      // Header
      const unitHeader = document.createElement("div");
      unitHeader.className = "unit-header";
      unitHeader.innerHTML = `
        <div class="unit-title-wrapper">
          <span class="unit-expand-arrow">▼</span>
          <span class="unit-title" title="${escapeHtml(unit.title)}">${escapeHtml(unit.title)}</span>
        </div>
        <span class="unit-assessment-badge ${assessmentPassed ? 'passed' : ''}">
          ${assessmentPassed ? 'Exam Passed ✓' : 'Exam Ready'}
        </span>
      `;

      // Toggle collapse on clicking unit header
      unitHeader.addEventListener("click", () => {
        unitGroup.classList.toggle("collapsed");
      });

      // Topics List
      const topicList = document.createElement("ul");
      topicList.className = "topic-list";

      if (filteredTopics.length === 0) {
        const emptyLi = document.createElement("li");
        emptyLi.style.padding = "0.6rem 1rem";
        emptyLi.style.fontSize = "0.78rem";
        emptyLi.style.color = "var(--text-muted)";
        emptyLi.textContent = query ? "No matching topics" : "No topics added yet";
        topicList.appendChild(emptyLi);
      } else {
        filteredTopics.forEach(topic => {
          const isMastered = !!state.progress.masteredTopics[topic.id];
          const hasNotes = !!state.progress.personalNotes[topic.id];
          const isActive = topic.id === state.activeTopicId;

          const topicLi = document.createElement("li");
          topicLi.className = `topic-item ${isActive ? "active" : ""}`;
          topicLi.dataset.topicId = topic.id;
          topicLi.dataset.unitId = unit.id;

          let statusClass = "";
          if (isMastered) statusClass = "completed";
          else if (hasNotes) statusClass = "in-progress";

          topicLi.innerHTML = `
            <span class="topic-name" title="${escapeHtml(topic.title)}">${escapeHtml(topic.title)}</span>
            <span class="topic-status-dot ${statusClass}" title="${isMastered ? 'Mastered' : hasNotes ? 'In Progress' : 'Not Started'}"></span>
          `;

          topicLi.addEventListener("click", () => {
            selectTopic(unit.id, topic.id);
          });

          topicList.appendChild(topicLi);
        });
      }

      unitGroup.appendChild(unitHeader);
      unitGroup.appendChild(topicList);
      DOM.unitsContainer.appendChild(unitGroup);
    });

    if (DOM.topicCountDisplay) {
      DOM.topicCountDisplay.textContent = `${totalTopicsCount} topics`;
    }
  }

  function selectTopic(unitId, topicId) {
    state.activeUnitId = unitId;
    state.activeTopicId = topicId;

    // Reset quiz state for the new topic
    resetQuizState();

    renderUnitsAndTopics();
    renderActiveTopic();
  }

  function renderActiveTopic() {
    const syl = getActiveSyllabus();
    const unit = getActiveUnit();
    const topic = getActiveTopic();

    if (!topic || !unit) {
      DOM.activeTopicTitle.textContent = "Select or create a topic to start studying";
      return;
    }

    // Breadcrumbs
    DOM.crumbSyllabus.textContent = syl ? syl.category || syl.title : "Course";
    DOM.crumbUnit.textContent = unit.title.split(":")[0];
    DOM.crumbTopic.textContent = topic.title;

    // Hero
    DOM.activeTopicTitle.textContent = topic.title;
    DOM.topicDurationBadge.textContent = topic.duration ? `⏱️ ${topic.duration}` : "⏱️ 15 min read";
    DOM.topicUnitNameBadge.textContent = unit.title;

    // Mastery Button
    const isMastered = !!state.progress.masteredTopics[topic.id];
    updateMasteryButtonUI(isMastered);

    // Tab Counts
    const quizCount = (topic.quiz || []).length;
    DOM.quizCountBadge.textContent = quizCount;

    // Render Tab 1 (Notes)
    renderTopicNotes(topic);

    // Render Tab 2 (Quiz)
    renderQuizView(topic);

    // Render Tab 3 (Assessment for unit)
    renderAssessmentOverview(unit);
  }

  function updateMasteryButtonUI(isMastered) {
    if (isMastered) {
      DOM.toggleMasteryBtn.classList.add("mastered");
      DOM.toggleMasteryBtn.setAttribute("aria-pressed", "true");
      DOM.masteryIcon.textContent = "✓";
      DOM.masteryBtnLabel.textContent = "Mastered";
    } else {
      DOM.toggleMasteryBtn.classList.remove("mastered");
      DOM.toggleMasteryBtn.setAttribute("aria-pressed", "false");
      DOM.masteryIcon.textContent = "○";
      DOM.masteryBtnLabel.textContent = "Mark as Mastered";
    }
  }

  /* ==========================================================================
     Tab 1: Notes & Study Guide
     ========================================================================== */

  function renderTopicNotes(topic) {
    // Render curated structured notes with markdown formatting
    if (topic.notes) {
      DOM.notesRenderArea.innerHTML = parseMarkdownToHtml(topic.notes);
    } else if (topic.summary) {
      DOM.notesRenderArea.innerHTML = `<p>${escapeHtml(topic.summary)}</p>`;
    } else {
      DOM.notesRenderArea.innerHTML = `<p class="empty-state">No notes added for this topic yet. Add notes or click '+ Add Topic' to customize.</p>`;
    }

    // Render Key Takeaways
    if (topic.keyTakeaways && topic.keyTakeaways.length > 0) {
      DOM.takeawaysBox.style.display = "block";
      DOM.takeawaysList.innerHTML = "";
      topic.keyTakeaways.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        DOM.takeawaysList.appendChild(li);
      });
    } else {
      DOM.takeawaysBox.style.display = "none";
    }

    // Personal Student Notes
    const savedPersonalNote = state.progress.personalNotes[topic.id] || "";
    DOM.personalNotesTextarea.value = savedPersonalNote;
  }

  // Simple, safe Markdown parser for headings, bold, inline code, code blocks, lists
  function parseMarkdownToHtml(markdown) {
    if (!markdown) return "";
    let html = escapeHtml(markdown.trim());

    // Fenced Code blocks ```code```
    html = html.replace(/```([a-z]*)\n([\s\S]*?)```/g, function (match, lang, code) {
      return `<pre><code>${code.trim()}</code></pre>`;
    });

    // Blockquotes
    html = html.replace(/^&gt; (.*$)/gim, '<blockquote>$1</blockquote>');

    // Headers
    html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^# (.*$)/gim, '<h3>$1</h3>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Inline Code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Horizontal Rule
    html = html.replace(/---/g, '<hr style="border:none; border-top:1px solid var(--border-color); margin:1.25rem 0;">');

    // Bullet Lists (- or *)
    html = html.replace(/^\s*[-*]\s+(.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gis, '<ul>$1</ul>');

    // Numbered Lists
    html = html.replace(/^\s*\d+\.\s+(.*$)/gim, '<li>$1</li>');

    // Paragraphs (double newlines)
    html = html.split(/\n{2,}/).map(paragraph => {
      if (paragraph.startsWith('<h') || paragraph.startsWith('<ul') || paragraph.startsWith('<pre') || paragraph.startsWith('<blockquote') || paragraph.startsWith('<hr')) {
        return paragraph;
      }
      return `<p>${paragraph.replace(/\n/g, '<br>')}</p>`;
    }).join('');

    return html;
  }

  /* ==========================================================================
     Tab 2: Interactive Practice Quiz
     ========================================================================== */

  function resetQuizState() {
    state.quiz = {
      currentQuestionIndex: 0,
      userAnswers: {},
      score: 0,
      isFinished: false
    };
  }

  function renderQuizView(topic) {
    const questions = topic.quiz || [];

    if (questions.length === 0) {
      DOM.quizActiveState.style.display = "none";
      DOM.quizFinishedState.style.display = "block";
      DOM.quizOutcomeIcon.textContent = "📝";
      DOM.quizFinalScoreTitle.textContent = "No Practice Quiz Available";
      DOM.quizFinalScoreDesc.textContent = "This topic does not have quiz questions yet. You can mark it as mastered or practice on the Unit Assessment!";
      DOM.retakeQuizBtn.style.display = "none";
      return;
    }

    DOM.retakeQuizBtn.style.display = "inline-flex";

    if (state.quiz.isFinished) {
      DOM.quizActiveState.style.display = "none";
      DOM.quizFinishedState.style.display = "block";
      renderQuizFinishedView(questions);
    } else {
      DOM.quizActiveState.style.display = "block";
      DOM.quizFinishedState.style.display = "none";
      renderQuizCurrentQuestion(questions);
    }
  }

  function renderQuizCurrentQuestion(questions) {
    const qIndex = state.quiz.currentQuestionIndex;
    const q = questions[qIndex];
    if (!q) return;

    // Header info
    DOM.quizStepCounter.textContent = `Question ${qIndex + 1} of ${questions.length}`;
    const progressPercent = ((qIndex + 1) / questions.length) * 100;
    DOM.quizProgressFill.style.width = `${progressPercent}%`;
    DOM.quizScoreNumber.textContent = state.quiz.score;

    // Question content
    DOM.quizQuestionText.textContent = q.question;
    DOM.quizOptionsGrid.innerHTML = "";

    const letters = ["A", "B", "C", "D", "E"];
    const hasAnswered = state.quiz.userAnswers.hasOwnProperty(qIndex);
    const chosenIndex = state.quiz.userAnswers[qIndex];

    q.options.forEach((optText, optIdx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-option-btn";
      btn.innerHTML = `
        <span class="option-letter">${letters[optIdx] || optIdx + 1}</span>
        <span>${escapeHtml(optText)}</span>
      `;

      if (hasAnswered) {
        btn.disabled = true;
        if (optIdx === q.correctIndex) {
          btn.classList.add("correct");
        } else if (optIdx === chosenIndex) {
          btn.classList.add("incorrect");
        }
      } else {
        btn.addEventListener("click", () => {
          handleQuizAnswerSelect(qIndex, optIdx, q, questions);
        });
      }

      DOM.quizOptionsGrid.appendChild(btn);
    });

    // Explanation Box
    if (hasAnswered && q.explanation) {
      DOM.quizExplanationBox.classList.add("visible");
      DOM.quizExplanationText.textContent = q.explanation;
    } else {
      DOM.quizExplanationBox.classList.remove("visible");
      DOM.quizExplanationText.textContent = "";
    }

    // Nav Buttons
    DOM.prevQuizBtn.disabled = qIndex === 0;
    DOM.nextQuizBtn.disabled = !hasAnswered;

    if (qIndex === questions.length - 1) {
      DOM.nextQuizBtn.textContent = "Finish Quiz 🎉";
    } else {
      DOM.nextQuizBtn.textContent = "Next Question →";
    }
  }

  function handleQuizAnswerSelect(qIndex, chosenIndex, q, questions) {
    state.quiz.userAnswers[qIndex] = chosenIndex;
    const isCorrect = chosenIndex === q.correctIndex;
    if (isCorrect) {
      state.quiz.score += 10;
      showToast("Correct! +10 points", "success");
    } else {
      showToast("Not quite right. Check the explanation!", "info");
    }

    renderQuizCurrentQuestion(questions);
  }

  function renderQuizFinishedView(questions) {
    const totalQ = questions.length;
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (state.quiz.userAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const percent = Math.round((correctCount / totalQ) * 100);
    const topic = getActiveTopic();

    // Save quiz score
    if (topic) {
      state.progress.quizScores[topic.id] = percent;
      if (percent >= 70 && !state.progress.masteredTopics[topic.id]) {
        state.progress.masteredTopics[topic.id] = true;
        showToast("🌟 Mastery unlocked for this topic!", "success");
        updateMasteryButtonUI(true);
      }
      saveProgress();
    }

    if (percent === 100) {
      DOM.quizOutcomeIcon.textContent = "🏆";
      DOM.quizFinalScoreTitle.textContent = "Flawless Performance!";
    } else if (percent >= 70) {
      DOM.quizOutcomeIcon.textContent = "🎉";
      DOM.quizFinalScoreTitle.textContent = "Great Job!";
    } else {
      DOM.quizOutcomeIcon.textContent = "💡";
      DOM.quizFinalScoreTitle.textContent = "Good Practice!";
    }

    DOM.quizFinalScoreDesc.textContent = `You answered ${correctCount} of ${totalQ} questions correctly (${percent}%). Best score has been recorded to your syllabus progress!`;
  }

  /* ==========================================================================
     Tab 3: Unit Assessment
     ========================================================================== */

  function renderAssessmentOverview(unit) {
    // Reset active assessment if running
    if (state.assessment.isActive) {
      clearInterval(state.assessment.timerInterval);
      state.assessment.isActive = false;
    }

    const assessment = unit.assessment;

    if (!assessment || !assessment.questions || assessment.questions.length === 0) {
      DOM.unitAssessmentTitle.textContent = `${unit.title}: Assessment`;
      DOM.unitAssessmentDesc.textContent = "No assessment questions have been configured for this unit yet.";
      DOM.assessmentQCount.textContent = "0";
      DOM.startAssessmentBtn.disabled = true;
      return;
    }

    DOM.startAssessmentBtn.disabled = false;
    DOM.unitAssessmentTitle.textContent = assessment.title || `${unit.title} Assessment`;
    DOM.unitAssessmentDesc.textContent = assessment.description || "Comprehensive unit assessment evaluating your conceptual mastery and problem-solving readiness.";
    DOM.assessmentQCount.textContent = assessment.questions.length;
    DOM.assessmentDuration.textContent = assessment.timeLimitMinutes || 15;
    DOM.assessmentPassingScore.textContent = `${assessment.passingScore || 70}%`;

    // Check if previously taken
    const prevRecord = state.progress.assessmentScores[unit.id];
    if (prevRecord) {
      DOM.unitAssessmentDesc.textContent = `Previous attempt: ${prevRecord.score}% (${prevRecord.passed ? 'PASSED ✓' : 'NEEDS REVIEW'}). You may retake at any time.`;
    }

    DOM.assessmentOverviewCard.style.display = "flex";
    DOM.assessmentActiveCard.style.display = "none";
    DOM.assessmentResultsCard.style.display = "none";
  }

  function startUnitAssessment() {
    const unit = getActiveUnit();
    if (!unit || !unit.assessment) return;

    const assessment = unit.assessment;
    state.assessment.isActive = true;
    state.assessment.userAnswers = {};
    state.assessment.secondsRemaining = (assessment.timeLimitMinutes || 15) * 60;

    DOM.assessmentOverviewCard.style.display = "none";
    DOM.assessmentActiveCard.style.display = "block";
    DOM.assessmentResultsCard.style.display = "none";

    DOM.assessmentExamName.textContent = assessment.title;
    updateAssessmentAnsweredCount(assessment.questions.length);

    // Render questions
    DOM.assessmentForm.innerHTML = "";
    assessment.questions.forEach((q, idx) => {
      const qBlock = document.createElement("div");
      qBlock.className = "assessment-question-block";

      const qTitle = document.createElement("div");
      qTitle.className = "assessment-q-index";
      qTitle.textContent = `Question ${idx + 1} of ${assessment.questions.length}`;

      const qText = document.createElement("p");
      qText.style.fontWeight = "600";
      qText.style.color = "var(--text-primary)";
      qText.style.marginBottom = "0.75rem";
      qText.textContent = q.question;

      const optsList = document.createElement("div");
      optsList.className = "assessment-options-list";

      q.options.forEach((optText, optIdx) => {
        const label = document.createElement("label");
        label.className = "assessment-radio-label";
        const input = document.createElement("input");
        input.type = "radio";
        input.name = `assessment_q_${idx}`;
        input.value = optIdx;

        input.addEventListener("change", () => {
          state.assessment.userAnswers[idx] = optIdx;
          // Style selected radio container
          optsList.querySelectorAll(".assessment-radio-label").forEach(l => l.classList.remove("selected"));
          label.classList.add("selected");
          updateAssessmentAnsweredCount(assessment.questions.length);
        });

        const span = document.createElement("span");
        span.textContent = optText;

        label.appendChild(input);
        label.appendChild(span);
        optsList.appendChild(label);
      });

      qBlock.appendChild(qTitle);
      qBlock.appendChild(qText);
      qBlock.appendChild(optsList);
      DOM.assessmentForm.appendChild(qBlock);
    });

    // Start Timer
    updateTimerDisplay();
    clearInterval(state.assessment.timerInterval);
    state.assessment.timerInterval = setInterval(() => {
      state.assessment.secondsRemaining--;
      updateTimerDisplay();
      if (state.assessment.secondsRemaining <= 0) {
        clearInterval(state.assessment.timerInterval);
        showToast("Time is up! Submitting your answers automatically.", "info");
        submitUnitAssessment();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const mins = Math.floor(state.assessment.secondsRemaining / 60);
    const secs = state.assessment.secondsRemaining % 60;
    DOM.timerCountdown.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    if (state.assessment.secondsRemaining < 120) {
      DOM.timerCountdown.parentElement.classList.add("danger");
    } else {
      DOM.timerCountdown.parentElement.classList.remove("danger");
    }
  }

  function updateAssessmentAnsweredCount(total) {
    const answeredCount = Object.keys(state.assessment.userAnswers).length;
    DOM.assessmentAnsweredRatio.textContent = `${answeredCount} of ${total} Answered`;
  }

  function submitUnitAssessment() {
    clearInterval(state.assessment.timerInterval);
    state.assessment.isActive = false;

    const unit = getActiveUnit();
    if (!unit || !unit.assessment) return;

    const assessment = unit.assessment;
    const questions = assessment.questions || [];
    let correctCount = 0;
    const missedQuestions = [];

    questions.forEach((q, idx) => {
      const chosen = state.assessment.userAnswers[idx];
      if (chosen === q.correctIndex) {
        correctCount++;
      } else {
        missedQuestions.push({ question: q, index: idx + 1, chosenIndex: chosen });
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    const passingThreshold = assessment.passingScore || 70;
    const isPassed = percentage >= passingThreshold;

    // Save Assessment Record
    state.progress.assessmentScores[unit.id] = {
      score: percentage,
      passed: isPassed,
      date: new Date().toISOString()
    };
    saveProgress();
    renderUnitsAndTopics();

    // Display Results View
    DOM.assessmentActiveCard.style.display = "none";
    DOM.assessmentResultsCard.style.display = "flex";

    DOM.resultsPercentage.textContent = `${percentage}%`;
    DOM.resultsScoreRaw.textContent = `${correctCount} / ${questions.length} Correct`;

    if (isPassed) {
      DOM.resultsScoreBanner.className = "results-score-banner passed";
      DOM.resultsStatusMessage.textContent = `🎯 Unit Competency Achieved! You passed with flying colors.`;
    } else {
      DOM.resultsScoreBanner.className = "results-score-banner failed";
      DOM.resultsStatusMessage.textContent = `Target score is ${passingThreshold}%. Review the recommended syllabus topics below before retaking.`;
    }

    // Generate Personalized Study Recommendations
    DOM.personalizedRecsList.innerHTML = "";
    if (missedQuestions.length === 0) {
      const p = document.createElement("p");
      p.className = "rec-item";
      p.innerHTML = "✨ <strong>Outstanding!</strong> You have demonstrated full mastery over all concepts in this unit. Ready to proceed to the next unit.";
      DOM.personalizedRecsList.appendChild(p);
    } else {
      missedQuestions.forEach(item => {
        const div = document.createElement("div");
        div.className = "rec-item";
        div.innerHTML = `
          <strong>Review Question ${item.index}:</strong> "${escapeHtml(item.question.question)}"<br>
          <span style="color:var(--text-muted); font-size:0.8rem;">💡 ${escapeHtml(item.question.explanation || "Focus on core mechanics in topic notes.")}</span>
        `;
        DOM.personalizedRecsList.appendChild(div);
      });
    }
  }

  /* ==========================================================================
     Syllabus & Topic Management (Modals)
     ========================================================================== */

  function handleCreateOrImportSyllabus() {
    const title = DOM.newSyllabusTitle.value.trim();
    if (!title) {
      alert("Please enter a course or syllabus title.");
      return;
    }

    const category = DOM.newSyllabusCategory.value.trim() || "General Studies";
    const outlineText = DOM.newSyllabusOutline.value.trim();

    const newSyllabusId = "syl-" + Date.now();
    const newUnits = parseSyllabusOutlineText(outlineText);

    const newSyllabus = {
      id: newSyllabusId,
      title: title,
      category: category,
      icon: "📚",
      description: `Course outline for ${title}`,
      targetWeeks: 4,
      units: newUnits.length > 0 ? newUnits : [
        {
          id: `unit-${Date.now()}-1`,
          title: "Unit 1: Fundamentals",
          description: "Introductory concepts and foundational theories.",
          topics: [
            {
              id: `topic-${Date.now()}-1`,
              title: "Core Introduction & Principles",
              duration: "20 min read",
              summary: "Overview of key foundations.",
              notes: `### Overview\nWelcome to ${title}. Document your notes and takeaways here.`,
              keyTakeaways: ["Review key terms", "Complete practice exercises"],
              quiz: [
                {
                  id: `q-${Date.now()}-1`,
                  question: "What is the primary objective of this unit?",
                  options: ["Understand foundational principles", "Memorize without comprehension", "Skip directly to advanced topics", "None of the above"],
                  correctIndex: 0,
                  explanation: "Foundational mastery provides the scaffolding needed for subsequent advanced topics."
                }
              ]
            }
          ],
          assessment: {
            title: `Unit 1 Diagnostic Assessment`,
            timeLimitMinutes: 10,
            passingScore: 70,
            questions: [
              {
                id: `as-${Date.now()}-1`,
                question: "Which habit best reinforces long-term retention of this syllabus?",
                options: ["Cramming the night before", "Spaced repetition with practice quizzes", "Reading notes passively once", "Ignoring assessments"],
                correctIndex: 1,
                explanation: "Spaced repetition and active retrieval through practice testing produce the highest long-term retention."
              }
            ]
          }
        }
      ]
    };

    state.syllabi.push(newSyllabus);
    saveSyllabi();

    // Select new syllabus
    state.activeSyllabusId = newSyllabusId;
    state.activeUnitId = newSyllabus.units[0].id;
    state.activeTopicId = newSyllabus.units[0].topics[0].id;

    renderSyllabusDropdown();
    renderUnitsAndTopics();
    renderActiveTopic();

    closeModal(DOM.newSyllabusModal);
    DOM.newSyllabusTitle.value = "";
    DOM.newSyllabusCategory.value = "";
    DOM.newSyllabusOutline.value = "";

    showToast(`"${title}" syllabus created!`, "success");
  }

  // Parses user syllabus text into structured units & topics
  function parseSyllabusOutlineText(text) {
    if (!text) return [];

    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
    const units = [];
    let currentUnit = null;
    let unitCount = 1;
    let topicCount = 1;

    lines.forEach(line => {
      // Line is a Unit if it starts with Unit, Module, Chapter, # or doesn't have a bullet
      const isUnitHeader = /^(unit|module|chapter|section|\#)/i.test(line) || (!line.startsWith("-") && !line.startsWith("*") && line.endsWith(":"));

      if (isUnitHeader) {
        currentUnit = {
          id: `unit-${Date.now()}-${unitCount++}`,
          title: line.replace(/^[#\-\*]\s*/, "").replace(/:$/, ""),
          description: `Key syllabus modules and outcomes for this unit.`,
          topics: [],
          assessment: {
            title: `${line.replace(/^[#\-\*]\s*/, "").replace(/:$/, "")} Assessment`,
            timeLimitMinutes: 15,
            passingScore: 70,
            questions: [
              {
                id: `as-${Date.now()}-${unitCount}`,
                question: `Which approach best demonstrates mastery of ${line.replace(/^[#\-\*]\s*/, "")}?`,
                options: ["Applying concepts to practical problems", "Memorizing only definitions", "Leaving questions unanswered", "Skimming without notes"],
                correctIndex: 0,
                explanation: "Active problem application confirms true conceptual depth."
              }
            ]
          }
        };
        units.push(currentUnit);
      } else {
        // Line is a topic
        if (!currentUnit) {
          currentUnit = {
            id: `unit-${Date.now()}-${unitCount++}`,
            title: "Unit 1: Core Topics",
            description: "Foundation unit",
            topics: [],
            assessment: {
              title: "Unit 1 Assessment",
              timeLimitMinutes: 15,
              passingScore: 70,
              questions: []
            }
          };
          units.push(currentUnit);
        }

        const topicName = line.replace(/^[\-\*\d\.]+\s*/, "").trim();
        if (topicName) {
          currentUnit.topics.push({
            id: `topic-${Date.now()}-${topicCount++}`,
            title: topicName,
            duration: "20 min read",
            summary: `Notes and study materials for ${topicName}.`,
            notes: `### Overview: ${topicName}\nAdd personal study notes, definitions, diagrams, and review checklists for this topic.`,
            keyTakeaways: [`Understand fundamental concepts of ${topicName}`],
            quiz: [
              {
                id: `q-${Date.now()}-${topicCount}`,
                question: `What is the core premise of ${topicName}?`,
                options: ["Fundamental syllabus principle", "Unrelated tangent", "Temporary anomaly", "None of the above"],
                correctIndex: 0,
                explanation: "Each syllabus topic builds directly on the core principles of the unit."
              }
            ]
          });
        }
      }
    });

    return units;
  }

  function handleOpenAddTopicModal() {
    const syl = getActiveSyllabus();
    if (!syl || !syl.units || syl.units.length === 0) {
      alert("Please create or select a syllabus with units first.");
      return;
    }

    DOM.targetUnitSelect.innerHTML = "";
    syl.units.forEach(u => {
      const opt = document.createElement("option");
      opt.value = u.id;
      opt.textContent = u.title;
      if (u.id === state.activeUnitId) opt.selected = true;
      DOM.targetUnitSelect.appendChild(opt);
    });

    DOM.newTopicTitle.value = "";
    DOM.newTopicNotes.value = "";
    openModal(DOM.addTopicModal);
  }

  function handleSaveNewTopic() {
    const unitId = DOM.targetUnitSelect.value;
    const title = DOM.newTopicTitle.value.trim();
    if (!title) {
      alert("Please enter a topic title.");
      return;
    }

    const syl = getActiveSyllabus();
    const unit = syl.units.find(u => u.id === unitId);
    if (!unit) return;

    const newTopicId = `topic-${Date.now()}`;
    const userNotes = DOM.newTopicNotes.value.trim();

    const newTopic = {
      id: newTopicId,
      title: title,
      duration: DOM.newTopicDuration.value.trim() || "20 min read",
      summary: `Custom topic in ${unit.title}`,
      notes: userNotes || `### ${title}\nAdd your curated study points here.`,
      keyTakeaways: [`Understand ${title}`],
      quiz: [
        {
          id: `q-${Date.now()}`,
          question: `Which statement is most accurate regarding ${title}?`,
          options: ["It forms a critical part of this unit", "It can be safely ignored", "It has no practical applications", "None of the above"],
          correctIndex: 0,
          explanation: "Mastery of each topic solidifies overall course proficiency."
        }
      ]
    };

    unit.topics = unit.topics || [];
    unit.topics.push(newTopic);
    saveSyllabi();

    state.activeUnitId = unitId;
    state.activeTopicId = newTopicId;

    renderUnitsAndTopics();
    renderActiveTopic();
    closeModal(DOM.addTopicModal);
    showToast(`Topic "${title}" added!`, "success");
  }

  /* ==========================================================================
     Profile Settings Modal
     ========================================================================== */

  function handleOpenProfileModal() {
    DOM.profileNameInput.value = state.profile.name || "Alex Morgan";
    DOM.profileTargetExam.value = state.profile.targetExam || "";
    DOM.profilePace.value = state.profile.pace || "balanced";
    openModal(DOM.profileModal);
  }

  function handleSaveProfile() {
    state.profile.name = DOM.profileNameInput.value.trim() || "Alex Morgan";
    state.profile.targetExam = DOM.profileTargetExam.value;
    state.profile.pace = DOM.profilePace.value;

    saveProfile();
    renderProfileAndHeader();
    closeModal(DOM.profileModal);
    showToast("Profile settings saved!", "success");
  }

  function handleResetToDefaults() {
    if (confirm("Reset all syllabi, notes, and quiz progress back to default demo state?")) {
      localStorage.removeItem(STORAGE_KEYS.SYLLABI);
      localStorage.removeItem(STORAGE_KEYS.PROGRESS);
      loadState();
      renderSyllabusDropdown();
      renderUnitsAndTopics();
      renderActiveTopic();
      renderProfileAndHeader();
      closeModal(DOM.profileModal);
      showToast("Reset to default sample syllabi complete!", "info");
    }
  }

  /* ==========================================================================
     Tab Switcher & Interactive Helpers
     ========================================================================== */

  function switchTab(tabName) {
    state.activeTab = tabName;

    DOM.tabNotesBtn.classList.toggle("active", tabName === "notes");
    DOM.tabNotesBtn.setAttribute("aria-selected", tabName === "notes");
    DOM.paneNotes.classList.toggle("active", tabName === "notes");

    DOM.tabQuizBtn.classList.toggle("active", tabName === "quiz");
    DOM.tabQuizBtn.setAttribute("aria-selected", tabName === "quiz");
    DOM.paneQuiz.classList.toggle("active", tabName === "quiz");

    DOM.tabAssessmentBtn.classList.toggle("active", tabName === "assessment");
    DOM.tabAssessmentBtn.setAttribute("aria-selected", tabName === "assessment");
    DOM.paneAssessment.classList.toggle("active", tabName === "assessment");
  }

  function openModal(modalEl) {
    if (modalEl) modalEl.classList.add("active");
  }

  function closeModal(modalEl) {
    if (modalEl) modalEl.classList.remove("active");
  }

  function showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${type === "success" ? "✓" : "💡"}</span> <span>${escapeHtml(message)}</span>`;
    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  }

  function escapeHtml(text) {
    if (!text) return "";
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* ==========================================================================
     Event Listeners Setup
     ========================================================================== */

  function setupEventListeners() {
    // Theme toggle
    DOM.themeToggleBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(current === "dark" ? "light" : "dark");
    });

    // Syllabus selector dropdown
    DOM.syllabusSelect.addEventListener("change", (e) => {
      state.activeSyllabusId = e.target.value;
      const syl = getActiveSyllabus();
      if (syl && syl.units && syl.units.length > 0) {
        state.activeUnitId = syl.units[0].id;
        if (syl.units[0].topics && syl.units[0].topics.length > 0) {
          state.activeTopicId = syl.units[0].topics[0].id;
        }
      }
      resetQuizState();
      renderUnitsAndTopics();
      renderActiveTopic();
      updateGlobalMasteryHeader();
    });

    // Search filter
    DOM.topicSearch.addEventListener("input", (e) => {
      state.searchTerm = e.target.value;
      renderUnitsAndTopics();
    });

    // Mastery toggle button
    DOM.toggleMasteryBtn.addEventListener("click", () => {
      const topic = getActiveTopic();
      if (!topic) return;

      const current = !!state.progress.masteredTopics[topic.id];
      state.progress.masteredTopics[topic.id] = !current;
      saveProgress();

      updateMasteryButtonUI(!current);
      renderUnitsAndTopics();
      showToast(!current ? "Marked as mastered! 🎉" : "Mastery unchecked", "success");
    });

    // Study Tabs
    DOM.tabNotesBtn.addEventListener("click", () => switchTab("notes"));
    DOM.tabQuizBtn.addEventListener("click", () => switchTab("quiz"));
    DOM.tabAssessmentBtn.addEventListener("click", () => switchTab("assessment"));

    // Student Personal Notes Auto-save
    let saveTimeout = null;
    DOM.personalNotesTextarea.addEventListener("input", (e) => {
      const topic = getActiveTopic();
      if (!topic) return;

      state.progress.personalNotes[topic.id] = e.target.value;

      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        saveProgress();
        DOM.notesSaveStatus.classList.add("visible");
        setTimeout(() => DOM.notesSaveStatus.classList.remove("visible"), 2000);
      }, 500);
    });

    // Personal Notes formatting helpers
    DOM.insertBulletBtn.addEventListener("click", () => {
      const ta = DOM.personalNotesTextarea;
      const start = ta.selectionStart;
      const val = ta.value;
      ta.value = val.substring(0, start) + "\n• " + val.substring(start);
      ta.focus();
      ta.selectionStart = ta.selectionEnd = start + 3;
      ta.dispatchEvent(new Event("input"));
    });

    DOM.insertFormulaBtn.addEventListener("click", () => {
      const ta = DOM.personalNotesTextarea;
      const start = ta.selectionStart;
      const val = ta.value;
      ta.value = val.substring(0, start) + "\n[Formula: ]\n" + val.substring(start);
      ta.focus();
      ta.selectionStart = ta.selectionEnd = start + 11;
      ta.dispatchEvent(new Event("input"));
    });

    DOM.clearNotesBtn.addEventListener("click", () => {
      const topic = getActiveTopic();
      if (!topic) return;
      if (confirm("Clear all your personal notes for this topic?")) {
        DOM.personalNotesTextarea.value = "";
        state.progress.personalNotes[topic.id] = "";
        saveProgress();
        showToast("Personal notes cleared", "info");
      }
    });

    // Practice Quiz Nav
    DOM.prevQuizBtn.addEventListener("click", () => {
      if (state.quiz.currentQuestionIndex > 0) {
        state.quiz.currentQuestionIndex--;
        const topic = getActiveTopic();
        renderQuizCurrentQuestion(topic.quiz || []);
      }
    });

    DOM.nextQuizBtn.addEventListener("click", () => {
      const topic = getActiveTopic();
      const questions = topic.quiz || [];
      if (state.quiz.currentQuestionIndex < questions.length - 1) {
        state.quiz.currentQuestionIndex++;
        renderQuizCurrentQuestion(questions);
      } else {
        state.quiz.isFinished = true;
        renderQuizFinishedView(questions);
        DOM.quizActiveState.style.display = "none";
        DOM.quizFinishedState.style.display = "block";
      }
    });

    DOM.retakeQuizBtn.addEventListener("click", () => {
      resetQuizState();
      const topic = getActiveTopic();
      renderQuizView(topic);
    });

    DOM.continueToAssessmentBtn.addEventListener("click", () => {
      switchTab("assessment");
    });

    // Unit Assessment Nav
    DOM.startAssessmentBtn.addEventListener("click", startUnitAssessment);
    DOM.submitAssessmentBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to finish and submit your assessment?")) {
        submitUnitAssessment();
      }
    });
    DOM.cancelAssessmentBtn.addEventListener("click", () => {
      if (confirm("Discard this assessment attempt?")) {
        clearInterval(state.assessment.timerInterval);
        state.assessment.isActive = false;
        renderAssessmentOverview(getActiveUnit());
      }
    });
    DOM.retakeAssessmentBtn.addEventListener("click", startUnitAssessment);
    DOM.backToNotesBtn.addEventListener("click", () => switchTab("notes"));

    // Modals
    DOM.openNewSyllabusBtn.addEventListener("click", () => openModal(DOM.newSyllabusModal));
    DOM.closeNewSyllabusModal.addEventListener("click", () => closeModal(DOM.newSyllabusModal));
    DOM.cancelNewSyllabusBtn.addEventListener("click", () => closeModal(DOM.newSyllabusModal));
    DOM.saveNewSyllabusBtn.addEventListener("click", handleCreateOrImportSyllabus);

    DOM.openAddTopicBtn.addEventListener("click", handleOpenAddTopicModal);
    DOM.closeAddTopicModal.addEventListener("click", () => closeModal(DOM.addTopicModal));
    DOM.cancelAddTopicBtn.addEventListener("click", () => closeModal(DOM.addTopicModal));
    DOM.saveNewTopicBtn.addEventListener("click", handleSaveNewTopic);

    DOM.openProfileBtn.addEventListener("click", handleOpenProfileModal);
    DOM.closeProfileModal.addEventListener("click", () => closeModal(DOM.profileModal));
    DOM.cancelProfileBtn.addEventListener("click", () => closeModal(DOM.profileModal));
    DOM.saveProfileBtn.addEventListener("click", handleSaveProfile);
    DOM.resetDefaultDataBtn.addEventListener("click", handleResetToDefaults);

    // Close modals on clicking overlay backdrop
    window.addEventListener("click", (e) => {
      if (e.target === DOM.newSyllabusModal) closeModal(DOM.newSyllabusModal);
      if (e.target === DOM.addTopicModal) closeModal(DOM.addTopicModal);
      if (e.target === DOM.profileModal) closeModal(DOM.profileModal);
    });
  }

  /* ==========================================================================
     Application Boot
     ========================================================================== */

  function init() {
    loadState();
    renderProfileAndHeader();
    renderSyllabusDropdown();
    renderUnitsAndTopics();
    renderActiveTopic();
    setupEventListeners();
  }

  // Initialize once DOM is fully ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
