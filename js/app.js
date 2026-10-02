/**
 * Typing Shadowing — Core Application Logic
 * Pure client-side Vanilla JS (IIFE pattern, no build tools, zero dependencies)
 */
(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════
  // 1. CLASSIC TEXTS REPOSITORY (Organized by CEFR Level A1 → C2)
  // ═══════════════════════════════════════════════════════════════════
  const TEXTS_BY_LEVEL = {
    A1: [
      {
        title: "The Little Prince (El Principito) — Antoine de Saint-Exupéry",
        text: "Once upon a time there was a little prince who lived on a planet that was scarcely any bigger than himself, and who had need of a friend."
      },
      {
        title: "Peter Pan — J.M. Barrie",
        text: "All children, except one, grow up. They soon know that they will grow up, and the way Wendy knew was this. One day when she was two years old she was playing in a garden."
      },
      {
        title: "The Tortoise and the Hare (Esopo)",
        text: "A hare was making fun of the tortoise one day for being so slow. Do you ever get anywhere? he asked with a laugh. Yes, replied the tortoise, and I get there sooner than you think."
      }
    ],
    A2: [
      {
        title: "Alice's Adventures in Wonderland — Lewis Carroll",
        text: "Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do. Once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it."
      },
      {
        title: "The Secret Garden — Frances Hodgson Burnett",
        text: "When Mary Lennox was sent to Misselthwaite Manor to live with her uncle everybody said she was the most disagreeable-looking child ever seen. It was true, too. She had a little thin face and a little thin light body."
      },
      {
        title: "The Wind in the Willows — Kenneth Grahame",
        text: "The Mole had been working very hard all the morning, spring-cleaning his little home. First with brooms, then with dusters, then on ladders and steps and chairs, with a brush and a pail of whitewash."
      }
    ],
    B1: [
      {
        title: "The Adventures of Sherlock Holmes — Arthur Conan Doyle",
        text: "To Sherlock Holmes she is always the woman. I have seldom heard him mention her under any other name. In his eyes she eclipses and predominates the whole of her sex."
      },
      {
        title: "Treasure Island — Robert Louis Stevenson",
        text: "Squire Trelawney, Dr. Livesey, and the rest of these gentlemen having asked me to write down the whole particulars about Treasure Island, to the beginning, keeping nothing back but the bearings of the island."
      },
      {
        title: "The Wonderful Wizard of Oz — L. Frank Baum",
        text: "Dorothy lived in the midst of the great Kansas prairies, with Uncle Henry, who was a farmer, and Aunt Em, who was the farmer's wife. Their house was small, for the lumber to build it had to be carried by wagon."
      }
    ],
    B2: [
      {
        title: "Pride and Prejudice — Jane Austen",
        text: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood."
      },
      {
        title: "The Picture of Dorian Gray — Oscar Wilde",
        text: "The studio was filled with the rich odour of roses, and when the light summer wind stirred amidst the trees of the garden, there came through the open door the heavy scent of the lilac."
      },
      {
        title: "Great Expectations — Charles Dickens",
        text: "My father's family name being Pirrip, and my Christian name Philip, my infant tongue could make of both names nothing longer or more explicit than Pip. So, I called myself Pip, and came to be called Pip."
      }
    ],
    C1: [
      {
        title: "Frankenstein — Mary Shelley",
        text: "I am by birth a Genevese, and my family is one of the most distinguished of that republic. My ancestors had been for many years counsellors and syndics, and my father had filled several public situations with honour and reputation."
      },
      {
        title: "Moby Dick — Herman Melville",
        text: "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world."
      },
      {
        title: "The Great Gatsby — F. Scott Fitzgerald",
        text: "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since. Whenever you feel like criticizing anyone, he told me, just remember that all the people in this world haven't had the advantages that you've had."
      }
    ],
    C2: [
      {
        title: "Ulysses — James Joyce",
        text: "Stately, plump Buck Mulligan came from the stairhead, bearing a bowl of lather on which a mirror and a razor lay crossed. A yellow dressinggown, ungirdled, was sustained gently behind him by the mild morning air."
      },
      {
        title: "Heart of Darkness — Joseph Conrad",
        text: "The Nellie, a cruising yawl, swung to her anchor without a flutter of the sails, and was at rest. The flood had made, the wind was nearly calm, and being bound down the river, the only thing for it was to come to and wait for the turn of the tide."
      },
      {
        title: "To the Lighthouse — Virginia Woolf",
        text: "Yes, of course, if it's fine tomorrow, said Mrs Ramsay. But you'll have to be up with the lark, she added. To her son these words conveyed an extraordinary joy, as if it were settled the expedition were bound to take place."
      }
    ]
  };

  // ═══════════════════════════════════════════════════════════════════
  // 2. STATE
  // ═══════════════════════════════════════════════════════════════════
  const state = {
    level: 'A1',
    textIndex: 0,
    words: [],           // Array of string words for the current text
    currentWordIndex: 0,
    currentInput: '',    // What user has typed for the current word
    startTime: null,
    timerInterval: null,
    elapsedSeconds: 0,
    totalKeystrokes: 0,
    correctKeystrokes: 0,
    errorsCount: 0,
    isCompleted: false,
    autoContinue: false,
    theme: localStorage.getItem('ts_theme') || 'light'
  };

  // ═══════════════════════════════════════════════════════════════════
  // 3. AUDIO ENGINE (Web Speech API + Web Audio API feedback)
  // ═══════════════════════════════════════════════════════════════════
  const audio = {
    synth: window.speechSynthesis,
    voice: null,
    audioCtx: null,

    init() {
      // Find high quality English voice
      if (this.synth) {
        const loadVoices = () => {
          const voices = this.synth.getVoices();
          // Prefer US or GB natural English voices
          this.voice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('David') || v.name.includes('Zira')))
                    || voices.find(v => v.lang.startsWith('en'))
                    || null;
        };
        loadVoices();
        if (this.synth.onvoiceschanged !== undefined) {
          this.synth.onvoiceschanged = loadVoices;
        }
      }
    },

    // Speak a word or phrase with high quality settings
    speak(text) {
      if (!this.synth) return;
      try {
        // Clean word of extraneous punctuation for cleaner pronunciation
        const cleanWord = text.replace(/[^a-zA-Z0-9']/g, '').trim();
        if (!cleanWord) return;

        this.synth.cancel(); // Cancel any prior utterance
        const utterance = new SpeechSynthesisUtterance(cleanWord);
        utterance.lang = 'en-US';
        if (this.voice) {
          utterance.voice = this.voice;
        }
        utterance.rate = 0.95; // Slightly natural pace for learning
        utterance.pitch = 1.0;
        this.synth.speak(utterance);
      } catch (e) {
        console.warn('Speech synthesis error:', e);
      }
    },

    // Subtle audio click effect for typing feedback
    playKeySound(type = 'click') {
      try {
        if (!this.audioCtx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) this.audioCtx = new AudioContext();
        }
        if (!this.audioCtx) return;

        if (this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
        }

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        const now = this.audioCtx.currentTime;
        if (type === 'error') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(140, now);
          osc.frequency.exponentialRampToValueAtTime(70, now + 0.1);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
          osc.start(now);
          osc.stop(now + 0.1);
        } else {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(600, now);
          osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);
          gain.gain.setValueAtTime(0.03, now);
          gain.gain.linearRampToValueAtTime(0.001, now + 0.04);
          osc.start(now);
          osc.stop(now + 0.04);
        }
      } catch (e) {
        // AudioContext not available or blocked
      }
    }
  };

  // ═══════════════════════════════════════════════════════════════════
  // 4. DOM ELEMENTS
  // ═══════════════════════════════════════════════════════════════════
  const dom = {
    themeToggle: document.getElementById('themeToggle'),
    levelTabs: document.querySelectorAll('.level-tab'),
    welcomeSection: document.getElementById('welcomeSection'),
    practiceArena: document.getElementById('practiceArena'),
    btnStart: document.getElementById('btnStart'),

    textTitle: document.getElementById('textTitle'),
    textProgress: document.getElementById('textProgress'),
    textBody: document.getElementById('textBody'),
    currentWord: document.getElementById('currentWord'),
    typedFeedback: document.getElementById('typedFeedback'),
    hiddenInput: document.getElementById('hiddenInput'),

    statWPM: document.getElementById('statWPM'),
    statAccuracy: document.getElementById('statAccuracy'),
    statTime: document.getElementById('statTime'),
    statWords: document.getElementById('statWords'),

    btnRepeat: document.getElementById('btnRepeat'),
    btnNext: document.getElementById('btnNext'),
    toggleAuto: document.getElementById('toggleAuto'),

    modal: document.getElementById('completionModal'),
    modalWPM: document.getElementById('modalWPM'),
    modalAccuracy: document.getElementById('modalAccuracy'),
    modalTime: document.getElementById('modalTime'),
    modalErrors: document.getElementById('modalErrors'),
    modalRepeat: document.getElementById('modalRepeat'),
    modalNext: document.getElementById('modalNext'),

    keys: document.querySelectorAll('.key')
  };

  // ═══════════════════════════════════════════════════════════════════
  // 5. APPLICATION CONTROLLER
  // ═══════════════════════════════════════════════════════════════════

  function init() {
    audio.init();
    applyTheme(state.theme);
    setupEventListeners();
    loadText();
  }

  function applyTheme(theme) {
    state.theme = theme;
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('ts_theme', theme);
  }

  function setupEventListeners() {
    // Theme toggle
    dom.themeToggle.addEventListener('click', () => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
    });

    // Level tabs
    dom.levelTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const level = tab.getAttribute('data-level');
        if (level && level !== state.level) {
          dom.levelTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          state.level = level;
          state.textIndex = 0;
          resetSession();
          loadText();
        }
      });
    });

    // Start practice button in hero
    dom.btnStart.addEventListener('click', () => {
      dom.welcomeSection.style.display = 'none';
      dom.practiceArena.style.display = 'block';
      focusInput();
    });

    // Hidden input typing listener
    dom.hiddenInput.addEventListener('input', handleInput);
    dom.hiddenInput.addEventListener('keydown', handleKeyDown);

    // Keep input focused when clicking on the arena
    dom.practiceArena.addEventListener('click', () => {
      focusInput();
    });

    // Sidebar controls
    dom.btnRepeat.addEventListener('click', () => {
      resetSession();
      loadText();
      focusInput();
    });

    dom.btnNext.addEventListener('click', () => {
      nextText();
      focusInput();
    });

    dom.toggleAuto.addEventListener('change', (e) => {
      state.autoContinue = e.target.checked;
    });

    // Modal controls
    dom.modalRepeat.addEventListener('click', () => {
      dom.modal.style.display = 'none';
      resetSession();
      loadText();
      focusInput();
    });

    dom.modalNext.addEventListener('click', () => {
      dom.modal.style.display = 'none';
      nextText();
      focusInput();
    });

    // Virtual keyboard click interactivity
    dom.keys.forEach(key => {
      key.addEventListener('click', () => {
        const k = key.getAttribute('data-key');
        if (k && !state.isCompleted) {
          if (k === 'Backspace') {
            if (state.currentInput.length > 0) {
              state.currentInput = state.currentInput.slice(0, -1);
              dom.hiddenInput.value = state.currentInput;
              renderFeedback();
              updateVirtualKeyboard();
            }
          } else if (k === ' ' || k.length === 1) {
            simulateKeyInput(k);
          }
        }
        focusInput();
      });
    });
  }

  function focusInput() {
    if (dom.hiddenInput) {
      dom.hiddenInput.focus();
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // 6. TEXT LOADING & RENDERING
  // ═══════════════════════════════════════════════════════════════════

  function loadText() {
    const list = TEXTS_BY_LEVEL[state.level] || TEXTS_BY_LEVEL['A1'];
    const currentItem = list[state.textIndex % list.length];

    dom.textTitle.textContent = `${state.level} · ${currentItem.title}`;

    // Split text into words (clean split preserving spaces)
    const rawWords = currentItem.text.trim().split(/\s+/);
    state.words = rawWords;
    state.currentWordIndex = 0;
    state.currentInput = '';
    state.isCompleted = false;
    dom.hiddenInput.value = '';

    renderTextBody();
    updateCurrentWordDisplay();
    updateProgressDisplay();
    updateStatsDisplay();
    updateVirtualKeyboard();
  }

  function renderTextBody() {
    dom.textBody.innerHTML = '';
    state.words.forEach((word, index) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.setAttribute('data-word-idx', index);
      span.textContent = word;

      if (index < state.currentWordIndex) {
        span.classList.add('word--completed');
      } else if (index === state.currentWordIndex) {
        span.classList.add('word--current');
      } else {
        span.classList.add('word--upcoming');
      }

      dom.textBody.appendChild(span);
    });
  }

  function updateWordHighlights() {
    const wordElements = dom.textBody.querySelectorAll('.word');
    wordElements.forEach((el, index) => {
      el.className = 'word';
      if (index < state.currentWordIndex) {
        el.classList.add('word--completed');
      } else if (index === state.currentWordIndex) {
        el.classList.add('word--current');
        // Scroll into view if needed
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      } else {
        el.classList.add('word--upcoming');
      }
    });
  }

  function updateCurrentWordDisplay() {
    const targetWord = state.words[state.currentWordIndex] || '';
    dom.currentWord.textContent = targetWord;
    renderFeedback();
  }

  function renderFeedback() {
    const targetWord = state.words[state.currentWordIndex] || '';
    const typed = state.currentInput;
    dom.typedFeedback.innerHTML = '';

    for (let i = 0; i < targetWord.length; i++) {
      const charSpan = document.createElement('span');
      charSpan.className = 'char-feedback';

      if (i < typed.length) {
        if (typed[i] === targetWord[i]) {
          charSpan.textContent = typed[i];
          charSpan.classList.add('correct');
        } else {
          charSpan.textContent = typed[i];
          charSpan.classList.add('wrong');
        }
      } else {
        charSpan.textContent = targetWord[i];
        charSpan.style.opacity = '0.35';
      }

      dom.typedFeedback.appendChild(charSpan);
    }
  }

  function updateProgressDisplay() {
    const total = state.words.length;
    const current = Math.min(state.currentWordIndex, total);
    dom.textProgress.textContent = `${current} / ${total}`;
    dom.statWords.innerHTML = `${current}<small>/${total}</small>`;
  }

  // ═══════════════════════════════════════════════════════════════════
  // 7. INPUT & TYPING VALIDATION ENGINE
  // ═══════════════════════════════════════════════════════════════════

  function handleKeyDown(e) {
    if (state.isCompleted) return;

    // Start timer on first keystroke
    if (!state.startTime) {
      startTimer();
    }

    // Highlight pressed key on virtual keyboard
    highlightKeyOnPress(e.key);

    // If Backspace
    if (e.key === 'Backspace') {
      audio.playKeySound('click');
      return; // Let standard input handler update currentInput
    }

    // Space handling
    if (e.key === ' ') {
      e.preventDefault();
      attemptAdvanceWord();
    }
  }

  function handleInput(e) {
    if (state.isCompleted) return;

    const val = dom.hiddenInput.value;
    state.totalKeystrokes++;

    const targetWord = state.words[state.currentWordIndex] || '';

    // Check if the current typed character is correct or mistake
    if (val.length > state.currentInput.length) {
      const typedChar = val[val.length - 1];
      const expectedChar = targetWord[val.length - 1];

      if (typedChar === expectedChar) {
        state.correctKeystrokes++;
        audio.playKeySound('click');
      } else {
        state.errorsCount++;
        audio.playKeySound('error');
      }
    }

    state.currentInput = val;
    renderFeedback();
    updateVirtualKeyboard();
    updateStatsDisplay();

    // Auto-advance if word is completely and accurately typed
    if (val === targetWord) {
      // If this is the last word, finish immediately
      if (state.currentWordIndex === state.words.length - 1) {
        completeCurrentWord();
      }
    }
  }

  function simulateKeyInput(char) {
    if (!state.startTime) startTimer();
    const targetWord = state.words[state.currentWordIndex] || '';

    if (char === ' ') {
      attemptAdvanceWord();
      return;
    }

    const val = state.currentInput + char;
    state.totalKeystrokes++;

    const expectedChar = targetWord[state.currentInput.length];
    if (char === expectedChar) {
      state.correctKeystrokes++;
      audio.playKeySound('click');
    } else {
      state.errorsCount++;
      audio.playKeySound('error');
    }

    state.currentInput = val;
    dom.hiddenInput.value = val;
    renderFeedback();
    updateVirtualKeyboard();
    updateStatsDisplay();

    if (val === targetWord && state.currentWordIndex === state.words.length - 1) {
      completeCurrentWord();
    }
  }

  function attemptAdvanceWord() {
    const targetWord = state.words[state.currentWordIndex] || '';
    if (state.currentInput === targetWord) {
      completeCurrentWord();
    } else {
      // Shake current word to indicate incomplete/wrong
      audio.playKeySound('error');
      dom.currentWord.classList.remove('shake');
      void dom.currentWord.offsetWidth; // Trigger reflow
      dom.currentWord.classList.add('shake');
    }
  }

  function completeCurrentWord() {
    const completedWord = state.words[state.currentWordIndex];

    // Play pronunciation immediately (Typing Shadowing core feature!)
    audio.speak(completedWord);

    state.currentWordIndex++;
    state.currentInput = '';
    dom.hiddenInput.value = '';

    updateProgressDisplay();
    updateWordHighlights();

    if (state.currentWordIndex >= state.words.length) {
      finishText();
    } else {
      updateCurrentWordDisplay();
      updateVirtualKeyboard();
      updateStatsDisplay();
    }
  }

  function finishText() {
    state.isCompleted = true;
    stopTimer();
    updateStatsDisplay();

    // Calculate final metrics
    const finalWPM = calculateWPM();
    const finalAcc = calculateAccuracy();
    const finalTime = formatTime(state.elapsedSeconds);

    dom.modalWPM.textContent = finalWPM;
    dom.modalAccuracy.textContent = `${finalAcc}%`;
    dom.modalTime.textContent = finalTime;
    dom.modalErrors.textContent = state.errorsCount;

    // Show completion modal
    setTimeout(() => {
      dom.modal.style.display = 'flex';

      // If auto-continue is active, transition to next after 2.5s
      if (state.autoContinue) {
        setTimeout(() => {
          if (dom.modal.style.display !== 'none') {
            dom.modal.style.display = 'none';
            nextText();
          }
        }, 2500);
      }
    }, 400);
  }

  function nextText() {
    const list = TEXTS_BY_LEVEL[state.level] || TEXTS_BY_LEVEL['A1'];
    state.textIndex = (state.textIndex + 1) % list.length;
    resetSession();
    loadText();
  }

  function resetSession() {
    stopTimer();
    state.startTime = null;
    state.elapsedSeconds = 0;
    state.totalKeystrokes = 0;
    state.correctKeystrokes = 0;
    state.errorsCount = 0;
    state.isCompleted = false;
    state.currentInput = '';
    if (dom.hiddenInput) dom.hiddenInput.value = '';
  }

  // ═══════════════════════════════════════════════════════════════════
  // 8. VIRTUAL KEYBOARD & FINGER OVERLAY
  // ═══════════════════════════════════════════════════════════════════

  function updateVirtualKeyboard() {
    // Clear all previous active keys
    dom.keys.forEach(k => k.classList.remove('active-key'));

    if (state.isCompleted) return;

    const targetWord = state.words[state.currentWordIndex] || '';
    const typed = state.currentInput;

    let nextChar = '';
    if (typed.length < targetWord.length) {
      nextChar = targetWord[typed.length];
    } else if (typed === targetWord && state.currentWordIndex < state.words.length - 1) {
      nextChar = ' '; // Prompt spacebar
    }

    if (!nextChar) return;

    // Find key element
    let targetKeyEl = null;
    const lowerChar = nextChar.toLowerCase();

    dom.keys.forEach(key => {
      const k = key.getAttribute('data-key');
      if (k === nextChar || k.toLowerCase() === lowerChar) {
        targetKeyEl = key;
      }
    });

    if (targetKeyEl) {
      targetKeyEl.classList.add('active-key');
    }
  }

  function highlightKeyOnPress(key) {
    const lowerKey = key.toLowerCase();
    dom.keys.forEach(k => {
      const attr = k.getAttribute('data-key');
      if (attr === key || attr.toLowerCase() === lowerKey || (key === ' ' && attr === ' ')) {
        k.classList.add('pressed');
        setTimeout(() => k.classList.remove('pressed'), 120);
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  // 9. TIMER & STATS
  // ═══════════════════════════════════════════════════════════════════

  function startTimer() {
    state.startTime = Date.now();
    state.timerInterval = setInterval(() => {
      state.elapsedSeconds = Math.floor((Date.now() - state.startTime) / 1000);
      dom.statTime.textContent = formatTime(state.elapsedSeconds);
      updateStatsDisplay();
    }, 500);
  }

  function stopTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
  }

  function calculateWPM() {
    if (state.elapsedSeconds < 1) return 0;
    const minutes = state.elapsedSeconds / 60;
    // Standard WPM formula: (correct keystrokes / 5) / minutes
    const wordsTyped = (state.correctKeystrokes / 5);
    return Math.max(0, Math.round(wordsTyped / minutes));
  }

  function calculateAccuracy() {
    if (state.totalKeystrokes === 0) return 100;
    const acc = Math.round((state.correctKeystrokes / state.totalKeystrokes) * 100);
    return Math.min(100, Math.max(0, acc));
  }

  function updateStatsDisplay() {
    dom.statWPM.textContent = calculateWPM();
    const acc = calculateAccuracy();
    dom.statAccuracy.innerHTML = `${acc}<small>%</small>`;
    dom.statTime.textContent = formatTime(state.elapsedSeconds);
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // ═══════════════════════════════════════════════════════════════════
  // 10. BOOTSTRAP
  // ═══════════════════════════════════════════════════════════════════
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose namespace for debugging or external calls
  window.__TYPING_SHADOWING__ = {
    state,
    audio,
    loadText,
    nextText,
    resetSession
  };

})();
