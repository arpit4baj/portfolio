/**
 * Arpit Bajpai — Portfolio Scripts & AI Agentic Engine
 * Intelligent interactions, canvas constellation, n8n workflow simulator,
 * project architecture inspector, AI playground, and autonomous portfolio assistant.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Year
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // 2. High-DPI Interactive Constellation Canvas
  initHeroCanvas();

  // 3. Navigation, Sticky Header & Scrollspy
  initNavigation();

  // 4. Interactive Skill Cards
  initSkillCards();

  // 5. Project Filters & Architecture Toggles
  initProjectFeatures();

  // 6. Automation Lab (n8n & AI Agent Simulation)
  initAutomationLab();

  // 7. AI Playground (Q&A, Explainer, Matchmaker, Skills)
  initPlayground();

  // 8. Portfolio AI Guide & Agentic Drawer
  initAiGuide();

  // 9. Accessible Modals (Project Studies & Printable Résumé)
  initModals();

  // 10. Back to Top Floating Button
  initBackToTop();

  // 11. Clipboard Email & Interactions
  initContactInteractions();

  // 12. Dismiss Lovable Badge if present
  const closeLovableBtn = document.getElementById('closeLovableBadge');
  const lovableBadge = document.getElementById('lovableBadge');
  if (closeLovableBtn && lovableBadge) {
    closeLovableBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      lovableBadge.style.display = 'none';
    });
  }
});

/**
 * ==========================================================================
 * 1. HERO CONSTELLATION CANVAS (High-DPI Razor Sharp Physics)
 * ==========================================================================
 */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, dpr;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }
  resize();

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 14000), 65);
  const maxDistance = 145;
  const mouse = { x: null, y: null, radius: 160 };

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 2 + 1.8;
      this.baseAlpha = Math.random() * 0.35 + 0.3;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      // Mouse repulsion
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(158, 115, 67, ${this.baseAlpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Connecting lines between particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.2;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(158, 115, 67, ${alpha})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }

      // Connecting line to cursor if in proximity
      if (mouse.x !== null && mouse.y !== null) {
        const mdx = particles[i].x - mouse.x;
        const mdy = particles[i].y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < mouse.radius) {
          const mAlpha = (1 - mdist / mouse.radius) * 0.35;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(158, 115, 67, ${mAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      particles[i].update();
      particles[i].draw();
    }

    requestAnimationFrame(render);
  }

  render();

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    } else {
      mouse.x = null;
      mouse.y = null;
    }
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', resize);
}

/**
 * ==========================================================================
 * 2. NAVIGATION & SCROLLSPY
 * ==========================================================================
 */
function initNavigation() {
  const header = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scrollspy
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }
}

/**
 * ==========================================================================
 * 3. INTERACTIVE SKILL CARDS
 * ==========================================================================
 */
function initSkillCards() {
  const cards = document.querySelectorAll('.skill-card');

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const isAlreadyActive = card.classList.contains('is-active');
      cards.forEach((c) => c.classList.remove('is-active'));
      if (!isAlreadyActive) {
        card.classList.add('is-active');
      }
    });
  });
}

/**
 * ==========================================================================
 * 4. PROJECT FILTERS & ARCHITECTURE PIPELINE TOGGLES
 * ==========================================================================
 */
function initProjectFeatures() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  // Category Filtering
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('is-filtered-out');
        } else {
          card.classList.add('is-filtered-out');
        }
      });
    });
  });

  // Architecture Flow Toggle
  const archButtons = document.querySelectorAll('[data-arch-target]');
  archButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = btn.getAttribute('data-arch-target');
      const diagram = document.getElementById(targetId);
      if (diagram) {
        diagram.classList.toggle('is-visible');
        if (diagram.classList.contains('is-visible')) {
          btn.innerHTML = '<span>Hide Architecture &times;</span>';
        } else {
          btn.innerHTML = '<span>Architecture Pipeline &#9881;</span>';
        }
      }
    });
  });
}

/**
 * ==========================================================================
 * 5. AUTOMATION LAB (n8n & AI AGENT SIMULATION)
 * ==========================================================================
 */
function initAutomationLab() {
  const btnSimulate = document.getElementById('btnSimulateWorkflow');
  const btnReset = document.getElementById('btnResetWorkflow');
  const statusText = document.getElementById('workflowStatusText');
  const logScreen = document.getElementById('workflowLogScreen');

  const nodes = [
    document.getElementById('wfNode1'),
    document.getElementById('wfNode2'),
    document.getElementById('wfNode3'),
    document.getElementById('wfNode4'),
    document.getElementById('wfNode5'),
  ];

  if (!btnSimulate || !nodes[0]) return;

  let isRunning = false;
  let timeouts = [];

  function resetWorkflow() {
    timeouts.forEach((t) => clearTimeout(t));
    timeouts = [];
    isRunning = false;
    btnSimulate.disabled = false;
    btnSimulate.innerHTML = '<span class="guide-sparkle">&#9658;</span><span>Run Simulation</span>';

    nodes.forEach((node) => {
      if (node) {
        node.className = 'workflow-node-box node-idle';
      }
    });

    statusText.textContent = 'STATUS: IDLE · READY TO EXECUTE';
    logScreen.textContent = '// Press "Run Simulation" to observe step-by-step state propagation and telemetry.';
  }

  btnReset.addEventListener('click', resetWorkflow);

  btnSimulate.addEventListener('click', () => {
    if (isRunning) return;
    isRunning = true;
    btnSimulate.disabled = true;
    btnSimulate.innerHTML = '<span>Executing Pipeline...</span>';

    resetWorkflow();
    isRunning = true;
    btnSimulate.disabled = true;

    const timestamp = () => new Date().toISOString().split('T')[1].slice(0, 8);

    // Step 1: Webhook Ingestion
    statusText.textContent = 'STATUS: [STAGE 1/5] INGESTING WEBHOOK EVENT...';
    nodes[0].className = 'workflow-node-box node-active';
    logScreen.textContent = `[${timestamp()}] [TRIGGER] Ingesting HTTP POST webhook payload from external client...\n`;
    logScreen.textContent += `Payload: { "event": "research_brief_request", "priority": "high", "topic": "urban_air_anomaly" }`;

    // Step 2: n8n Pipeline
    timeouts.push(
      setTimeout(() => {
        nodes[0].className = 'workflow-node-box node-complete';
        nodes[1].className = 'workflow-node-box node-active';
        statusText.textContent = 'STATUS: [STAGE 2/5] n8n VALIDATING PAYLOAD & PREPARING EXECUTION CONTEXT...';
        logScreen.textContent += `\n\n[${timestamp()}] [n8n] Validating schema constraints against contract... [PASS]\n`;
        logScreen.textContent += `[n8n] Initializing session state ID: #exec_8f9024 · Routing to AI inference node.`;
      }, 1000)
    );

    // Step 3: LLM Inference
    timeouts.push(
      setTimeout(() => {
        nodes[1].className = 'workflow-node-box node-complete';
        nodes[2].className = 'workflow-node-box node-active';
        statusText.textContent = 'STATUS: [STAGE 3/5] LLM PARSING ENTITIES & COMPUTING SENTIMENT SCORE...';
        logScreen.textContent += `\n\n[${timestamp()}] [LLM] Tokenizing payload via structured JSON schema...\n`;
        logScreen.textContent += `[LLM] Extracted Entities: { "sensor_cluster": 14, "risk_level": "moderate", "actionable": true }`;
      }, 2200)
    );

    // Step 4: AI Agent Reasoning
    timeouts.push(
      setTimeout(() => {
        nodes[2].className = 'workflow-node-box node-complete';
        nodes[3].className = 'workflow-node-box node-active';
        statusText.textContent = 'STATUS: [STAGE 4/5] AI AGENT EVALUATING REACT REASONING LOOP & TOOLS...';
        logScreen.textContent += `\n\n[${timestamp()}] [AGENT] Invoking ReAct loop: evaluating tool availability...\n`;
        logScreen.textContent += `[AGENT] Chosen Tools: ["GmailAlertDispatcher", "PostgresSyncWorker"]\n`;
        logScreen.textContent += `[AGENT] Reasoning: Priority is 'high'; dispatching immediate email notification & writing audit log.`;
      }, 3400)
    );

    // Step 5: Action Dispatch
    timeouts.push(
      setTimeout(() => {
        nodes[3].className = 'workflow-node-box node-complete';
        nodes[4].className = 'workflow-node-box node-active';
        statusText.textContent = 'STATUS: [STAGE 5/5] DISPATCHING ACTION ENDPOINTS...';
        logScreen.textContent += `\n\n[${timestamp()}] [ACTION] Sent email alert via Gmail API to engineering on-call.\n`;
        logScreen.textContent += `[ACTION] Synchronized state record to PostgreSQL database: 1 row inserted, 0 errors.`;
      }, 4600)
    );

    // Complete
    timeouts.push(
      setTimeout(() => {
        nodes[4].className = 'workflow-node-box node-complete';
        statusText.textContent = 'STATUS: PIPELINE COMPLETED SUCCESSFULLY (EXECUTION TIME: 4.8s)';
        logScreen.textContent += `\n\n[${timestamp()}] [SUCCESS] n8n Workflow execution #exec_8f9024 terminated with code 0.`;
        btnSimulate.disabled = false;
        btnSimulate.innerHTML = '<span class="guide-sparkle">&#9658;</span><span>Run Again</span>';
        isRunning = false;
      }, 5800)
    );
  });
}

/**
 * ==========================================================================
 * 6. AI PLAYGROUND (Interactive Demonstrations & Knowledge Engine)
 * ==========================================================================
 */
function initPlayground() {
  // Tabs switching
  const tabButtons = document.querySelectorAll('.playground-tab-btn');
  const tabContents = document.querySelectorAll('.playground-tab-content');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b) => b.classList.remove('active'));
      tabContents.forEach((c) => c.classList.remove('is-active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('is-active');
      }
    });
  });

  // Tab 1: Q&A Engine
  const inputEl = document.getElementById('playgroundInput');
  const submitBtn = document.getElementById('playgroundSubmitBtn');
  const answerEl = document.getElementById('playgroundAnswer');
  const promptChips = document.querySelectorAll('.prompt-chips-group .chip-btn');

  function askQuestion(query) {
    if (!query || !query.trim()) return;
    answerEl.innerHTML = '<em>Consulting portfolio knowledge model...</em>';

    setTimeout(() => {
      const response = generatePortfolioAnswer(query);
      answerEl.innerHTML = response;
    }, 350);
  }

  if (submitBtn && inputEl) {
    submitBtn.addEventListener('click', () => {
      askQuestion(inputEl.value);
    });

    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        askQuestion(inputEl.value);
      }
    });
  }

  promptChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-prompt');
      if (inputEl) inputEl.value = q;
      askQuestion(q);
    });
  });

  // Tab 2: Project Explainer
  const selectProject = document.getElementById('explainerProjectSelect');
  const explainerDisplay = document.getElementById('explainerDisplay');

  const projectData = {
    music: {
      title: 'Listening Patterns · Spotify Audio PCA & K-Means',
      problem: 'Can high-dimensional streaming history uncover non-obvious seasonal mood cycles and circadian listening habits?',
      approach: 'Vectorized 10,400+ tracks extracted via Spotify Web API across 5 dimensions (acousticness, danceability, energy, tempo, valence). Applied K-Means with PCA orthogonal dimensionality reduction.',
      metric: 'Identified distinct cyclical phase shifts in acousticness between winter and summer routines.',
      stack: 'Python, Spotify API, Scikit-Learn, PCA & K-Means, Seaborn, Matplotlib',
    },
    air: {
      title: 'City of Breath · Urban Air Quality XGBoost Regression',
      problem: 'Where and when do severe atmospheric particulate pollution spikes accumulate in metropolitan Lucknow?',
      approach: 'Gathered hourly PM2.5/PM10 readings across 14 municipal stations combined with weather features. Addressed sensor dropouts via spline interpolation and trained an XGBoost regression model.',
      metric: '0.91 R² fit uncovering early morning thermal inversion traps between 06:00 and 09:30 AM.',
      stack: 'Python, XGBoost, GeoPandas, Spline Interpolation, Time-Series Decomposition',
    },
    churn: {
      title: 'Who Will Leave · Telecom Churn Classifier & SHAP',
      problem: 'How can a machine learning model prioritize customer retention without defaulting to misleading naive accuracy metrics?',
      approach: 'Addressed severe 73:27 class imbalance with SMOTE and stratified cross-validation. Optimized decision probability threshold to 0.38 to balance customer acquisition cost against retention profit.',
      metric: '87.4% Recall on high-risk accounts + SHAP feature attribution explaining month-to-month contract churn vectors.',
      stack: 'Python, LightGBM, SMOTE, Scikit-Learn, SHAP Explainability, Cost Matrix Tuning',
    },
    stockout: {
      title: 'Stockwise · Inventory Stockout Risk & Logistic Regression',
      problem: 'How can historical sales and inventory signals help identify products at risk of running out of stock?',
      approach: 'Validates uploaded retail CSV data, engineers 12 inventory and sales features, applies the saved scaler, and scores stockout risk with a custom Logistic Regression pipeline.',
      metric: 'Uses a configurable probability threshold for ML risk classes; operational inventory status is calculated separately from the model risk estimate.',
      stack: 'Python, Custom Logistic Regression, NumPy, Pandas, Flask, HTML, CSS & JavaScript',
    },
    nlp: {
      title: 'Market Discourse · Financial Embeddings & NLP',
      problem: 'Can dense semantic representations capture sentiment shifts in quarterly earnings and macroeconomic text before market consensus forms?',
      approach: 'Tokenized and embedded corporate transcripts and financial commentary using BERT transformers and Word2Vec. Projected vectors onto orthogonal sentiment axes (Growth vs. Risk).',
      metric: 'Language sentiment shifts predicted sectoral market volatility 48 to 72 hours in advance.',
      stack: 'Python 3, BERT & Transformers, Word2Vec, Dense Vector Math, Plotly, Time-Series Resampling',
    },
  };

  function updateExplainer(key) {
    const p = projectData[key];
    if (!p || !explainerDisplay) return;

    explainerDisplay.innerHTML = `
      <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-dark); margin-bottom: 0.5rem;">${p.title}</h3>
      <p style="font-size: 0.92rem; color: var(--text-body); margin-bottom: 1.2rem;">${p.problem}</p>
      <div class="explainer-grid">
        <div class="explainer-stat-block">
          <span class="explainer-stat-label">Engineering Approach</span>
          <div class="explainer-stat-value">${p.approach}</div>
        </div>
        <div class="explainer-stat-block">
          <span class="explainer-stat-label">Benchmark &amp; Finding</span>
          <div class="explainer-stat-value"><strong>${p.metric}</strong></div>
        </div>
        <div class="explainer-stat-block">
          <span class="explainer-stat-label">Stack Employed</span>
          <div class="explainer-stat-value"><code>${p.stack}</code></div>
        </div>
      </div>
    `;
  }

  if (selectProject) {
    selectProject.addEventListener('change', (e) => {
      updateExplainer(e.target.value);
    });
    updateExplainer('music');
  }

  // Tab 3: Project Matchmaker
  const matchButtons = document.querySelectorAll('.recommender-pill-btn');
  const matchResult = document.getElementById('recommenderResult');

  const matchRecommendations = {
    ml: {
      project: 'Who Will Leave · Telecom Churn Classifier',
      summary: 'Demonstrates end-to-end supervised machine learning with SMOTE, cost-sensitive probability thresholding (0.38 cutoff), and explainable AI through SHAP value decomposition.',
      highlight: 'Best for evaluating tabular data modeling, cross-validation discipline, and interpretability.',
      modalId: 'modal-churn',
    },
    timeseries: {
      project: 'City of Breath · Urban Air Quality Study',
      summary: 'Showcases time-series forecasting, spatial regression with GeoPandas coordinates, spline imputation for sensor dropouts, and discovering thermal inversion traps (0.91 R²).',
      highlight: 'Best for evaluating sensor telemetry, spatial analytics, and regression pipelines.',
      modalId: 'modal-air',
    },
    unsupervised: {
      project: 'Listening Patterns · Spotify Audio Analysis',
      summary: 'Analyzed 10,400+ songs across 5 continuous audio feature dimensions using K-Means and Principal Component Analysis (PCA) to discover seasonal behavioral shifts.',
      highlight: 'Best for evaluating unsupervised clustering, vectorization, and exploratory analytics.',
      modalId: 'modal-music',
    },
    nlp: {
      project: 'Market Discourse · Financial Embeddings Pipeline',
      summary: 'High-dimensional semantic vectors using BERT and Word2Vec mapped onto orthogonal sentiment dimensions (Risk vs. Growth) with rolling exponential time-series filters.',
      highlight: 'Best for evaluating NLP transformer architectures, dense vector math, and financial text mining.',
      modalId: 'modal-nlp',
    },
  };

  function updateMatchmaker(key) {
    const m = matchRecommendations[key];
    if (!m || !matchResult) return;

    matchResult.innerHTML = `
      <span class="system-num">RECOMMENDED MATCH</span>
      <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-dark); margin: 0.3rem 0 0.6rem;">${m.project}</h3>
      <p style="font-size: 0.92rem; color: var(--text-body); margin-bottom: 0.8rem; line-height: 1.6;">${m.summary}</p>
      <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent-gold-dark); background: rgba(158, 115, 67, 0.08); padding: 0.4rem 0.8rem; border-radius: 4px; display: inline-block; margin-bottom: 1.2rem;">${m.highlight}</div>
      <div>
        <button class="project-details-btn" data-modal="${m.modalId}">Open Case Study &rarr;</button>
      </div>
    `;

    // Re-bind modal click
    const btn = matchResult.querySelector('[data-modal]');
    if (btn) {
      btn.addEventListener('click', () => {
        openModalDialog(m.modalId);
      });
    }
  }

  matchButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      matchButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      updateMatchmaker(btn.getAttribute('data-match'));
    });
  });
  updateMatchmaker('ml');

  // Tab 4: Skill In Action
  const skillItemButtons = document.querySelectorAll('.skill-action-btn');
  const skillActionResult = document.getElementById('skillActionResult');

  const skillExplanations = {
    langchain: {
      name: 'LangChain & ReAct Agent Loops',
      desc: 'Used to configure autonomous reasoning chains where the language model iteratively reasons, inspects intermediate tool outputs, and self-corrects runtime query errors.',
      example: 'Applied in client RAG query routing, automated document summarization agents, and structured schema translation.',
    },
    n8n: {
      name: 'n8n Event-Driven Automation',
      desc: 'Self-hosted workflow automation connecting webhook triggers, REST APIs, PostgreSQL tables, and language model inference nodes into zero-maintenance pipelines.',
      example: 'Applied in multi-channel telemetry ingestion, automated anomaly alert triage, and asynchronous database state synchronization.',
    },
    shap: {
      name: 'SHAP (SHapley Additive exPlanations)',
      desc: 'Explainable AI technique rooted in cooperative game theory to decompose black-box gradient boosted trees into individual marginal feature contributions.',
      example: 'Applied in the Telecom Churn project to prove month-to-month contracts and customer service inquiries were dominant churn drivers.',
    },
    xgboost: {
      name: 'XGBoost Spatial & Tabular Regressors',
      desc: 'Extreme Gradient Boosting tuned with stratified k-fold splits, learning rate shrinkage, and regularization penalties (L1/L2) to prevent spatial overfitting.',
      example: 'Applied in City of Breath to achieve 0.91 R² across 14 municipal air stations factoring in meteorological parameters.',
    },
    pandas: {
      name: 'Pandas Production Data Wrangling',
      desc: 'Vectorized transformations, spline interpolations, multi-level indexing, rolling exponential windows, and categorical dtype optimization.',
      example: 'Applied across 10,400+ music stream events and multi-year municipal air sensor log consolidation.',
    },
    sql: {
      name: 'SQL Analytic Window Functions & CTEs',
      desc: 'Advanced relational schema design, complex multi-table JOINs, Common Table Expressions (CTEs), and analytic window functions (ROW_NUMBER, LEAD, LAG).',
      example: 'Applied in partitioning user behavioral cohorts, aggregating time-stamped log streams, and database normalization.',
    },
  };

  function updateSkillAction(key) {
    const s = skillExplanations[key];
    if (!s || !skillActionResult) return;

    skillActionResult.innerHTML = `
      <span class="system-num">SKILL ARCHITECTURE</span>
      <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-dark); margin: 0.3rem 0 0.6rem;">${s.name}</h3>
      <p style="font-size: 0.92rem; color: var(--text-body); margin-bottom: 0.8rem; line-height: 1.6;">${s.desc}</p>
      <div style="font-size: 0.85rem; color: var(--text-dark); background: var(--bg-card); border: 1px solid var(--border-subtle); padding: 0.9rem 1.2rem; border-radius: 6px;">
        <strong>How Arpit Used It:</strong> ${s.example}
      </div>
    `;
  }

  skillItemButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      skillItemButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      updateSkillAction(btn.getAttribute('data-skill-item'));
    });
  });
  updateSkillAction('langchain');
}

/**
 * ==========================================================================
 * 7. PORTFOLIO AI GUIDE & AGENTIC DRAWER
 * ==========================================================================
 */
function initAiGuide() {
  const backdrop = document.getElementById('aiDrawerBackdrop');
  const drawer = document.getElementById('aiAssistantDrawer');
  const closeBtn = document.getElementById('closeAiDrawerBtn');
  const triggerNav = document.getElementById('navAiGuideBtn');
  const triggerFloat = document.getElementById('floatingAiGuideBtn');
  const triggerHero = document.getElementById('heroAskAiBtn');
  const sendBtn = document.getElementById('drawerSendBtn');
  const inputEl = document.getElementById('drawerTextInput');
  const messagesBody = document.getElementById('drawerMessagesBody');
  const chips = document.querySelectorAll('[data-drawer-prompt]');

  if (!backdrop || !drawer) return;

  function openDrawer() {
    backdrop.classList.add('is-open');
    if (inputEl) inputEl.focus();
  }

  function closeDrawer() {
    backdrop.classList.remove('is-open');
  }

  [triggerNav, triggerFloat, triggerHero].forEach((btn) => {
    if (btn) btn.addEventListener('click', openDrawer);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeDrawer();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  // Handle Chat Submissions
  function handleUserMessage(text) {
    if (!text || !text.trim()) return;

    // Append User Message
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble chat-bubble-user';
    userBubble.textContent = text;
    messagesBody.appendChild(userBubble);

    if (inputEl) inputEl.value = '';
    messagesBody.scrollTop = messagesBody.scrollHeight;

    // AI Response with simulated typing delay
    setTimeout(() => {
      const responseObj = processAgentQuery(text);

      const aiBubble = document.createElement('div');
      aiBubble.className = 'chat-bubble chat-bubble-assistant';
      aiBubble.innerHTML = responseObj.reply;
      messagesBody.appendChild(aiBubble);

      // If Agent executed an action, append action badge & execute
      if (responseObj.action) {
        const actionBadge = document.createElement('div');
        actionBadge.className = 'chat-bubble-system-action';
        actionBadge.innerHTML = `&rarr; Executing tool: <code>${responseObj.action.name}()</code>`;
        messagesBody.appendChild(actionBadge);

        setTimeout(() => {
          executeAgentAction(responseObj.action);
        }, 600);
      }

      messagesBody.scrollTop = messagesBody.scrollHeight;
    }, 400);
  }

  if (sendBtn && inputEl) {
    sendBtn.addEventListener('click', () => {
      handleUserMessage(inputEl.value);
    });

    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleUserMessage(inputEl.value);
      }
    });
  }

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-drawer-prompt');
      handleUserMessage(q);
    });
  });
}

/**
 * ==========================================================================
 * AGENTIC LOGIC & DOMAIN KNOWLEDGE ENGINE
 * ==========================================================================
 */
function processAgentQuery(query) {
  const q = query.toLowerCase();

  // Navigation: Projects / ML
  if (q.includes('show me your ml') || q.includes('machine learning project')) {
    return {
      reply: 'Arpit has built several machine learning systems, including the <strong>Telecom Churn Classifier</strong> (LightGBM & SHAP, 87.4% recall) and <strong>City of Breath</strong> (XGBoost spatial regression, 0.91 R²). I will filter and scroll to the machine learning projects for you.',
      action: { name: 'filter_and_navigate', section: 'projects', filter: 'ml' },
    };
  }

  // Navigation: Automation / n8n
  if (q.includes('automation') || q.includes('n8n') || q.includes('workflow')) {
    return {
      reply: 'Arpit designs automated pipelines integrating <strong>n8n</strong>, webhook listeners, REST APIs, and autonomous LangChain reasoning agents. Let me take you directly to the <strong>Automation Lab</strong> simulation.',
      action: { name: 'navigate_to_section', section: 'lab' },
    };
  }

  // Navigation: AI Playground
  if (q.includes('playground') || q.includes('demonstration') || q.includes('test')) {
    return {
      reply: 'Taking you to the <strong>AI Playground</strong> where you can explore live demonstrations, project matchmaking, and tech implementations.',
      action: { name: 'navigate_to_section', section: 'playground' },
    };
  }

  // Navigation: Architecture
  if (q.includes('architecture') || q.includes('under the hood') || q.includes('stack')) {
    return {
      reply: 'Navigating to the <strong>Under the Hood</strong> section to show the 4-layer system architecture connecting frontend, agent routing, LLM reasoning, and n8n.',
      action: { name: 'navigate_to_section', section: 'architecture' },
    };
  }

  // Navigation: Résumé
  if (q.includes('resume') || q.includes('résumé') || q.includes('download resume') || q.includes('cv')) {
    return {
      reply: 'Opening Arpit\'s print-optimized, publication-style résumé preview modal for you.',
      action: { name: 'open_modal', modalId: 'modal-resume' },
    };
  }

  // Projects Overview
  if (q.includes('project') || q.includes('what have you built') || q.includes('built')) {
    return {
      reply: 'Arpit has engineered 4 core systems:<br>1. <strong>Listening Patterns</strong>: Spotify audio clustering with K-Means & PCA.<br>2. <strong>City of Breath</strong>: PM2.5 spatial regression with XGBoost (0.91 R²).<br>3. <strong>Who Will Leave</strong>: Cost-weighted customer churn classifier with LightGBM & SHAP.<br>4. <strong>Market Discourse</strong>: Financial text NLP embedding pipeline with BERT & Word2Vec.<br><br>Scrolling to the Projects section.',
      action: { name: 'navigate_to_section', section: 'projects' },
    };
  }

  // Strongest Project
  if (q.includes('strongest project') || q.includes('best project') || q.includes('favorite')) {
    return {
      reply: 'His strongest supervised project is <strong>Who Will Leave</strong> because of its business rigor: instead of relying on naive accuracy on an imbalanced dataset (73:27), he implemented SMOTE, tuned cost-sensitive probability cutoffs to 0.38, achieved 87.4% recall, and explained decisions with SHAP attribution.',
      action: { name: 'open_modal', modalId: 'modal-churn' },
    };
  }

  // Currently Learning / Exploring
  if (q.includes('learning') || q.includes('exploring') || q.includes('currently')) {
    return {
      reply: 'Arpit is currently exploring:<br>&bull; <strong>Agentic AI & ReAct Reasoning Loops</strong><br>&bull; <strong>RAG Architectures & Vector Databases</strong><br>&bull; <strong>AI Automation with n8n</strong><br>&bull; <strong>Private / Local LLMs</strong><br>&bull; <strong>Deep Learning & NLP Encoders</strong><br><br>Let me take you to his journey milestones.',
      action: { name: 'navigate_to_section', section: 'journey' },
    };
  }

  // Why Hire Arpit
  if (q.includes('why should i hire') || q.includes('hire') || q.includes('candidate')) {
    return {
      reply: 'Why Arpit stands out:<br>1. <strong>First-Principles Rigor</strong>: Audits assumptions, prevents data leakage, and benchmarks against real cost rather than vanity metrics.<br>2. <strong>Modern AI Breadth</strong>: Fluent across classic ML (XGBoost/LightGBM/SHAP), dense NLP embeddings (BERT/Word2Vec), and agentic workflows (LangChain, n8n).<br>3. <strong>National Finalist</strong>: India AI Impact Buildathon recognition among competitive collegiate teams.<br>4. <strong>Engineering Craft</strong>: Coded this high-performance portfolio from scratch without bulky framework dependencies.',
      action: { name: 'navigate_to_section', section: 'about' },
    };
  }

  // Skills
  if (q.includes('skill') || q.includes('tool') || q.includes('technology') || q.includes('python')) {
    return {
      reply: 'Arpit\'s workbench spans 7 structured domains:<br>&bull; <strong>Data</strong>: Python, SQL, Pandas, NumPy, Applied Statistics<br>&bull; <strong>Machine Learning</strong>: Scikit-Learn, LightGBM, XGBoost, SHAP<br>&bull; <strong>Deep Learning</strong>: Neural Networks, BERT, Word2Vec<br>&bull; <strong>Generative AI</strong>: LLMs, RAG, Prompt Engineering<br>&bull; <strong>AI Agents</strong>: LangChain, Tool Calling, ReAct Loops<br>&bull; <strong>Automation</strong>: n8n, Webhooks, REST APIs<br>&bull; <strong>Applications</strong>: Vector Search, Git, Google Colab.',
      action: { name: 'navigate_to_section', section: 'skills' },
    };
  }

  // Default response
  return {
    reply: `I can help you explore Arpit's work in <strong>Machine Learning</strong>, <strong>Generative AI</strong>, <strong>AI Agents</strong>, and <strong>n8n Automation</strong>. You can ask to view his projects, inspect his system architecture, or open his résumé.`,
    action: null,
  };
}

function generatePortfolioAnswer(query) {
  const res = processAgentQuery(query);
  return res.reply;
}

function executeAgentAction(action) {
  if (!action) return;

  if (action.name === 'navigate_to_section') {
    const sec = document.getElementById(action.section);
    if (sec) {
      sec.scrollIntoView({ behavior: 'smooth' });
      sec.classList.add('section-agent-target');
      setTimeout(() => sec.classList.remove('section-agent-target'), 2200);
    }
  } else if (action.name === 'filter_and_navigate') {
    const sec = document.getElementById(action.section);
    if (sec) {
      sec.scrollIntoView({ behavior: 'smooth' });
    }
    const filterBtn = document.querySelector(`.filter-btn[data-filter="${action.filter}"]`);
    if (filterBtn) filterBtn.click();
  } else if (action.name === 'open_modal') {
    openModalDialog(action.modalId);
  }
}

/**
 * ==========================================================================
 * 8. ACCESSIBLE MODALS (Project Deep Dives & Résumé)
 * ==========================================================================
 */
let openModalDialog = () => {};

function initModals() {
  const backdrop = document.getElementById('modalBackdrop');
  if (!backdrop) return;

  const detailButtons = document.querySelectorAll('[data-modal]');
  const closeButtons = document.querySelectorAll('[data-close-modal]');

  function open(modalId) {
    const dialog = document.getElementById(modalId);
    if (!dialog) return;

    document.querySelectorAll('.modal-dialog').forEach((d) => {
      d.classList.remove('active');
      d.setAttribute('aria-hidden', 'true');
    });

    backdrop.classList.add('is-open');
    dialog.classList.add('active');
    dialog.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    backdrop.classList.remove('is-open');
    document.querySelectorAll('.modal-dialog').forEach((d) => {
      d.classList.remove('active');
      d.setAttribute('aria-hidden', 'true');
    });
    document.body.style.overflow = '';
  }

  openModalDialog = open;

  detailButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-modal');
      open(modalId);
    });
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener('click', close);
  });

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      close();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('is-open')) {
      close();
    }
  });
}

/**
 * ==========================================================================
 * 9. BACK TO TOP BUTTON
 * ==========================================================================
 */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

/**
 * ==========================================================================
 * 10. CLIPBOARD EMAIL & TOAST NOTIFICATIONS
 * ==========================================================================
 */
function initContactInteractions() {
  const emailToCopy = 'ab1790197@gmail.com';
  const copyButtons = [
    document.getElementById('copyEmailBtn'),
    document.getElementById('copyEmailConnectBtn'),
    ...document.querySelectorAll('[data-copy-email]'),
  ].filter(Boolean);

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        await navigator.clipboard.writeText(emailToCopy);
        showToast('Email copied to clipboard (ab1790197@gmail.com)!');
      } catch (err) {
        showToast(`Email: ${emailToCopy}`);
      }
    });
  });
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9e7343" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-8px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
