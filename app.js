// =============================================
// WEBNEXUS HACKATHON PLATFORM — app.js
// B-TECH 2026 | BNU
// =============================================

// ===== CONFIG =====
const CONFIG = {
    hackathonName: "WebNexus — B-TECH 2026",
    university: "BNU",
    totalTime: 3.5 * 60 * 60 * 1000, // 3.5 hours in ms
  };
  
  // ===== USERS DB (replace with Supabase / Firebase calls) =====
  // Format: { username: "firstname_lastname", password: "phonenumber" }
  const USERS_DB = [
    { id: 1, username: "admin", password: "admin123", role: "admin", name: "Admin" },
    { id: 2, username: "ali_hassan", password: "03001234567", role: "participant", name: "Ali Hassan" },
    { id: 3, username: "sara_khan", password: "03211234567", role: "participant", name: "Sara Khan" },
    { id: 4, username: "usman_malik", password: "03331234567", role: "participant", name: "Usman Malik" },
    { id: 5, username: "fatima_ali", password: "03451234567", role: "participant", name: "Fatima Ali" },
    { id: 6, username: "bilal_ahmed", password: "03121234567", role: "participant", name: "Bilal Ahmed" },
  ];
  
  // ===== THEMES DATA =====
  const THEMES = [
    {
      id: "community_health",
      name: "Community Health Platform",
      icon: "🏥",
      color: "#38bdf8",
      desc: "Full-stack healthcare web platform for patients to find doctors, book appointments, and manage health records.",
      day1Points: 33,
      day2Points: 36,
      bonusPoints: 48,
      day1: [
        { text: "Landing Page — hero section, CTA buttons (Find a Doctor, Book Appointment), feature highlights", pts: 5 },
        { text: "Doctor/Provider Listing Page — searchable and filterable grid/list with specialization, rating, availability badge", pts: 5 },
        { text: "Doctor Profile Page — bio, specialization, location, working hours, Book Appointment button", pts: 4 },
        { text: "Appointment Booking Form — multi-step or single form with date/time picker, reason for visit, patient details", pts: 5 },
        { text: "Patient Dashboard — health profile, upcoming appointments, appointment history, basic vitals input", pts: 5 },
        { text: "Health Resources / Blog Page — paginated list of articles with category filters (Nutrition, Mental Health, First Aid)", pts: 4 },
        { text: "Registration/Login Pages — separate flows for Patient and Provider with form validation", pts: 3 },
        { text: "404 / Error State Page — user-friendly error page with navigation options", pts: 2 },
      ],
      day2: [
        { text: "POST /api/auth/register — register patient or provider with hashed password, role assignment, input validation", pts: 5 },
        { text: "POST /api/auth/login — authenticate user, return JWT/session token, role-based redirect", pts: 5 },
        { text: "GET /api/doctors — paginated list with optional filters (specialization, city, availability)", pts: 5 },
        { text: "GET /api/doctors/:id — full doctor profile including availability slots", pts: 4 },
        { text: "POST /api/appointments — create new appointment, prevent double-booking", pts: 6 },
        { text: "GET /api/appointments/:userId — appointment history for patient or schedule for provider", pts: 4 },
        { text: "PUT /api/appointments/:id — update status (Confirmed / Cancelled / Completed)", pts: 4 },
        { text: "GET /api/resources — paginated health articles with category filtering", pts: 3 },
      ],
      bonus: [
        { text: "Real-time appointment status updates using WebSockets or SSE", pts: 10 },
        { text: "AI-powered symptom checker — suggests relevant specializations", pts: 10 },
        { text: "Email or SMS confirmation on appointment booking (SendGrid/Twilio)", pts: 8 },
        { text: "Provider dashboard with a calendar view for managing daily schedule", pts: 8 },
        { text: "Geolocation-based doctor search — 'Find Doctors Near Me'", pts: 6 },
        { text: "Dark mode toggle with preference persistence", pts: 6 },
      ],
      db: [
        "Users: id, name, email, password (hashed), role (patient/provider/admin), created_at",
        "DoctorProfiles: user_id (FK), specialization, bio, location, working_hours (JSON), profile_image_url",
        "Appointments: id, patient_id (FK), doctor_id (FK), datetime, status, reason, created_at",
        "HealthResources: id, title, body, category, author, published_at",
      ],
      must: [
        "Doctor search with at least 2 working filter options",
        "Complete appointment booking flow — form persists to DB",
        "Patient dashboard with real appointment data from backend",
        "User registration and login with role differentiation",
        "Protected routes — unauthenticated users blocked",
        "Responsive design on mobile and desktop",
        "At least 5 seeded doctor profiles visible",
        "Health resources page with at least 3 DB articles",
      ],
    },
    {
      id: "ai_task",
      name: "AI-Powered Task Automation",
      icon: "🤖",
      color: "#e879f9",
      desc: "Smart productivity web app combining task management, scheduling, and AI chatbot to automate workflows via natural language.",
      day1Points: 34,
      day2Points: 40,
      bonusPoints: 55,
      day1: [
        { text: "Landing Page — value proposition, feature highlights, live demo prompt input, 'Get Started' CTA", pts: 5 },
        { text: "User Dashboard — overview cards: pending tasks, completed, upcoming events, AI-generated daily summary", pts: 6 },
        { text: "Task Manager View — list/kanban with priority tags, due dates, status toggles, add/edit/delete", pts: 6 },
        { text: "AI Chat Interface Page — chat-style UI for natural language commands (e.g., 'Add task: finish report by Friday')", pts: 6 },
        { text: "Calendar / Schedule View — weekly or monthly view with color coding by priority", pts: 5 },
        { text: "Settings / Preferences Page — notification preferences, working hours, timezone, theme toggle", pts: 3 },
        { text: "Onboarding / Welcome Flow — guided setup: name, role, productivity goals", pts: 3 },
      ],
      day2: [
        { text: "POST /api/auth/register and POST /api/auth/login — user auth with JWT, hashed passwords", pts: 5 },
        { text: "GET/POST/PUT/DELETE /api/tasks — full CRUD: title, description, due_date, priority, status, user_id", pts: 8 },
        { text: "POST /api/ai/chat — accepts message, sends to AI API (OpenAI/Gemini/Anthropic), returns response, parses task creation commands", pts: 10 },
        { text: "POST /api/ai/schedule — accepts user tasks, returns AI-generated optimized daily schedule", pts: 8 },
        { text: "GET /api/tasks/summary — JSON summary (counts by status, overdue, priority breakdown)", pts: 5 },
        { text: "GET /api/events/calendar — tasks formatted as calendar events (start/end times)", pts: 4 },
      ],
      bonus: [
        { text: "AI agent that reads all tasks and autonomously reorganizes priorities on new high-urgency task", pts: 12 },
        { text: "Real-time collaboration — multiple users share a task board with live WebSocket updates", pts: 10 },
        { text: "Voice input on chat interface using Web Speech API", pts: 8 },
        { text: "Recurring task automation — user defines a rule, system auto-generates tasks on schedule", pts: 8 },
        { text: "Productivity analytics page — task completion rate, average time-to-completion, daily output charts", pts: 6 },
        { text: "Browser push notifications for upcoming task deadlines", pts: 6 },
      ],
      db: [
        "Users: id, name, email, password, timezone, role, created_at",
        "Tasks: id, user_id (FK), title, description, due_date, priority (low/medium/high), status (todo/in-progress/done)",
        "Events: id, user_id (FK), title, start_datetime, end_datetime, linked_task_id (nullable)",
        "ChatHistory: id, user_id (FK), role (user/assistant), message, timestamp",
      ],
      must: [
        "Full task CRUD — create, read, update, delete tasks from UI, persisted to DB",
        "AI chat interface connected to a real AI API — contextually relevant responses",
        "AI-generated daily schedule — at least one working AI schedule endpoint",
        "Task filtering by priority and status, working end-to-end",
        "User authentication — registration and login required",
        "Calendar view displaying real task data as events",
        "Dashboard summary cards with live task statistics",
      ],
    },
    {
      id: "financial_dashboard",
      name: "Financial Data Dashboard",
      icon: "📈",
      color: "#2dd4bf",
      desc: "Full-stack financial dashboard with real-time stock data, portfolio tracking, interactive charts, and AI-powered insights.",
      day1Points: 34,
      day2Points: 40,
      bonusPoints: 55,
      day1: [
        { text: "Landing Page — market summary ticker bar, top-gaining/losing stocks, platform highlights, sign-in CTA", pts: 5 },
        { text: "Market Overview Page — sector performance grid, top movers list, global market indices table", pts: 6 },
        { text: "Stock Search & Detail Page — search by ticker, company overview, current price, daily change, key metrics, chart placeholder", pts: 6 },
        { text: "Portfolio Tracker Page — user portfolio with buy price, current price, gain/loss per asset, portfolio total", pts: 6 },
        { text: "Watchlist Page — saved stocks with real-time price display and quick-add functionality", pts: 4 },
        { text: "Charts & Analytics Page — interactive historical price chart (line/candlestick) for selected stock/index", pts: 5 },
        { text: "User Profile / Settings Page — display name, API key display, currency preference, notifications", pts: 2 },
      ],
      day2: [
        { text: "GET /api/market/quote/:symbol — current stock price, change, volume, market cap from public API", pts: 8 },
        { text: "GET /api/market/history/:symbol?range=1M — historical OHLCV data formatted for chart rendering", pts: 8 },
        { text: "GET /api/market/overview — market indices and top movers, cached server-side (TTL: 60s)", pts: 6 },
        { text: "GET/POST/DELETE /api/portfolio — full CRUD: add stock, delete holding, compute current value", pts: 8 },
        { text: "GET/POST/DELETE /api/watchlist — add/remove/list watchlist stocks for authenticated user", pts: 5 },
        { text: "POST /api/auth/register and POST /api/auth/login — JWT authentication", pts: 5 },
      ],
      bonus: [
        { text: "AI-powered stock analysis assistant — AI provides technical/fundamental commentary using current data", pts: 12 },
        { text: "Live price streaming using WebSockets (e.g., Finnhub WebSocket feed) with auto-updating chart", pts: 10 },
        { text: "Portfolio analytics — pie chart by sector, total return over time, Sharpe ratio approximation", pts: 8 },
        { text: "Price alert system — target price triggers in-app or email notification", pts: 8 },
        { text: "Crypto integration — unified dashboard showing stocks and cryptocurrencies via CoinGecko", pts: 6 },
        { text: "CSV/PDF portfolio export", pts: 6 },
      ],
      db: [
        "Users: id, email, password (hashed), display_name, currency_preference, created_at",
        "Portfolio: id, user_id (FK), symbol, company_name, quantity, buy_price, buy_date",
        "Watchlist: id, user_id (FK), symbol, added_at",
        "PriceCache (optional): symbol, data (JSON), cached_at — reduces external API calls",
      ],
      must: [
        "Live stock price lookup via external API end-to-end",
        "Historical price chart with real data for at least one time range",
        "Portfolio CRUD — add, view, remove holdings with computed gain/loss",
        "Watchlist — save and retrieve at least 5 stocks with live prices",
        "User authentication — login required for portfolio and watchlist",
        "Market overview showing at least 3 major indices and top movers",
        "Server-side caching/rate-limiting to handle API quota constraints",
        "Responsive layout on mobile and desktop",
      ],
    },
    {
      id: "sustainability",
      name: "Sustainability & Green Tech",
      icon: "🌱",
      color: "#4ade80",
      desc: "Full-stack sustainability platform for tracking carbon footprint, eco-actions, community challenges, and AI-driven green recommendations.",
      day1Points: 35,
      day2Points: 42,
      bonusPoints: 55,
      day1: [
        { text: "Landing Page — environmental impact stats, platform mission, challenge previews, carbon calculator entry", pts: 5 },
        { text: "Personal Dashboard — daily carbon score, streak tracker, green action log, level/badge display", pts: 6 },
        { text: "Carbon Footprint Calculator — interactive form (transport, diet, energy, shopping) with CO2 visualization", pts: 7 },
        { text: "Community Challenges Page — active challenges with participation count, progress bars, join/leave", pts: 5 },
        { text: "Eco-Action Log — log sustainable actions with points value and category", pts: 5 },
        { text: "Environmental Data Map / Regional Stats — visual display of pollution, air quality, or energy data by region", pts: 5 },
        { text: "Leaderboard Page — community ranking by eco-points, filterable by week/month/all-time", pts: 4 },
        { text: "Registration / Login Pages — standard auth with optional sustainability profile setup", pts: 3 },
      ],
      day2: [
        { text: "POST /api/auth/register and POST /api/auth/login — JWT auth, sustainability profile fields", pts: 5 },
        { text: "POST /api/footprint/calculate — server-side CO2 calculation using emission factors, breakdown by category", pts: 10 },
        { text: "GET/POST /api/actions — log sustainable action, retrieve history", pts: 8 },
        { text: "GET/POST/PUT /api/challenges — create challenge, join/leave, participation stats", pts: 8 },
        { text: "GET /api/leaderboard — top users ranked by eco-points with weekly/monthly/all-time filter", pts: 5 },
        { text: "GET /api/env/airquality?city= — proxy to OpenAQ/WAQI, returns AQI and pollution data", pts: 6 },
      ],
      bonus: [
        { text: "AI sustainability advisor — AI generates personalized weekly green action plan with CO2 savings", pts: 12 },
        { text: "Social sharing — share eco-score card or completed challenge to social media (Open Graph)", pts: 10 },
        { text: "Interactive map with regional AQI/carbon intensity color-coded markers (Leaflet.js/Mapbox)", pts: 8 },
        { text: "Team/Group challenges — organizations/friend groups compete in shared challenge with group leaderboard", pts: 8 },
        { text: "Monthly sustainability report — PDF or in-app view showing footprint trend and CO2 saved", pts: 6 },
        { text: "Gamification tier system — Bronze/Silver/Gold/Platinum eco-levels with unlockable badges", pts: 6 },
      ],
      db: [
        "Users: id, name, email, password, city, diet_type, transport_habits, total_eco_points, streak_days, created_at",
        "FootprintLogs: id, user_id (FK), transport_co2, energy_co2, diet_co2, shopping_co2, total_co2, logged_date",
        "EcoActions: id, user_id (FK), category, description, co2_saved, points_earned, logged_at",
        "Challenges: id, creator_id (FK), title, description, target_metric, end_date, participant_count",
        "ChallengeParticipants: id, challenge_id (FK), user_id (FK), joined_at, contribution_value",
      ],
      must: [
        "Carbon footprint calculator with at least 3 input categories, server-side calculation, visual breakdown",
        "Eco-action log — add, view, track actions, points system updates user's score",
        "Community challenges — at least 2 active, join/leave working end-to-end",
        "Leaderboard with at least 5 users ranked by eco-points with time filters",
        "Live environmental data from external API (air quality or climate metric)",
        "User authentication with sustainability profile (city, habits)",
        "Streak tracker updating based on daily login or action logging",
        "Responsive design on mobile and desktop",
      ],
    },
  ];
  
  // ===== LEADERBOARD DATA (simulated — replace with DB) =====
  let LEADERBOARD = [
    { id: 2, name: "Ali Hassan", theme: "ai_task", pts: 42, pct: 65, day: 1 },
    { id: 3, name: "Sara Khan", theme: "sustainability", pts: 38, pct: 58, day: 1 },
    { id: 4, name: "Usman Malik", theme: "financial_dashboard", pts: 35, pct: 53, day: 1 },
    { id: 5, name: "Fatima Ali", theme: "community_health", pts: 30, pct: 45, day: 1 },
    { id: 6, name: "Bilal Ahmed", theme: "ai_task", pts: 27, pct: 41, day: 1 },
  ];

  // ===== HANDBOOK DETAILS (extracted from PDF) =====
  const HANDBOOK_DETAILS = {
    community_health: {
      problem:
        "Many underserved communities struggle to access doctor availability, booking, and reliable health guidance. Providers also lack simple digital channels.",
      objective:
        "Build a full-stack healthcare platform where patients can find doctors, book appointments, view resources, and manage a basic profile while providers manage availability.",
      targetUsers: [
        "Patient / Community Member",
        "Healthcare Provider (Doctor / Clinic)",
        "Admin / Coordinator",
      ],
      uiux: [
        "Trustworthy medical aesthetic (blues, whites, greens).",
        "Clear typography hierarchy and interactive states on controls.",
        "Graceful loading and empty states.",
      ],
      responsive: [
        "Responsive on 375px mobile, 768px tablet, and desktop.",
        "Mobile-friendly booking flow and adaptive card grid.",
      ],
      interactive: [
        "Live doctor search and filters.",
        "Date/time booking with disabled past dates.",
        "Real-time form validation and submission feedback.",
      ],
    },
    ai_task: {
      problem:
        "Users lose productivity from context-switching and repetitive task management with low-intelligence tools.",
      objective:
        "Build an AI productivity app for task management, scheduling, and workflow automation using structured UI + natural language chat.",
      targetUsers: [
        "Student / Learner",
        "Professional / Freelancer",
        "Team Lead / Manager",
      ],
      uiux: [
        "Distraction-free UI with clear focus states.",
        "Chat bubbles, timestamps, and clear task priority colors.",
        "Strong empty states for task/calendar views.",
      ],
      responsive: [
        "Usable from mobile touch screens to desktop.",
        "Task cards and calendar adapt cleanly at small widths.",
      ],
      interactive: [
        "Task add/edit/delete and filtering by status/priority.",
        "Chat input sends prompts and shows AI/mock replies.",
        "Calendar date interactions for task visibility.",
      ],
    },
    financial_dashboard: {
      problem:
        "Retail users and students need cleaner tools for market visualization, portfolio tracking, and actionable insights without clutter.",
      objective:
        "Build a full-stack financial dashboard with live/near-live market data, portfolio/watchlist tracking, and chart-based analytics.",
      targetUsers: ["Retail Investor", "Finance Student", "Analyst / Researcher"],
      uiux: [
        "Professional data-dense layout (dark/light capable).",
        "Consistent gain/loss color coding and chart tooltips.",
        "Sortable tables and visible loading/refresh indicators.",
      ],
      responsive: [
        "Charts scale fluidly; no awkward mobile overflow.",
        "Tables become scrollable and cards stack on mobile.",
      ],
      interactive: [
        "Live ticker movement in header/landing.",
        "Debounced symbol search and range-switching charts.",
        "Watchlist add/remove interactions.",
      ],
    },
    sustainability: {
      problem:
        "People lack practical tools to measure and reduce environmental impact; communities need motivating, actionable sustainability systems.",
      objective:
        "Build a full-stack sustainability platform for footprint tracking, eco-actions, community challenges, environmental data, and recommendations.",
      targetUsers: [
        "Eco-Conscious Individual",
        "Community Organizer / NGO",
        "Student / Educator",
      ],
      uiux: [
        "Nature-inspired visual language with gamification.",
        "Consistent impact-oriented data visuals.",
        "Motivational microcopy and visible progress cues.",
      ],
      responsive: [
        "Touch-friendly calculator/dashboard on mobile.",
        "Challenge cards and map/chart components adapt without overflow.",
      ],
      interactive: [
        "Real-time footprint updates based on inputs.",
        "Action logging with points preview.",
        "Leaderboard filters and animated challenge progress.",
      ],
    },
  };
  
  // ===== STATE =====
  let state = {
    user: null,
    currentPage: "login",
    currentDay: 1,
    selectedTheme: null,
    previewTheme: null,
    themeConfirmed: false,
    timerStart: null,
    timerEl: null,
    timerInterval: null,
    progress: {},
    designWizard: null,
    lbTeamFilter: "all",
    // Index of the currently focused requirement step (read-only allowed for already-completed steps).
    reqFocusIndexByTab: { day1: 0, day2: 0 },
    lbTeams: [],
    toastQueue: [],
  };
  
  // ===== AUTH =====
  function getStoredToken() {
    return localStorage.getItem("wn_token");
  }

  function setStoredToken(token) {
    if (!token) localStorage.removeItem("wn_token");
    else localStorage.setItem("wn_token", token);
  }

  async function apiFetch(path, options = {}) {
    const token = getStoredToken();
    const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
    if (token) headers.Authorization = `Bearer ${token}`;
    const res = await fetch(path, { ...options, headers });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error || `Request failed: ${res.status}`);
    return data;
  }
  
  function logout() {
    localStorage.removeItem("wn_user");
    setStoredToken(null);
    state.user = null;
    state.currentPage = "login";
    state.timerInterval && clearInterval(state.timerInterval);
    render();
  }
  
  function getStoredUser() {
    try { return JSON.parse(localStorage.getItem("wn_user")); } catch { return null; }
  }
  
  function getUserProgress(userId) {
    try { return JSON.parse(localStorage.getItem(`wn_progress_${userId}`)) || {}; } catch { return {}; }
  }
  
  function saveUserProgress(userId, progress) {
    localStorage.setItem(`wn_progress_${userId}`, JSON.stringify(progress));
  }
  
  function getUserTheme(userId) {
    return localStorage.getItem(`wn_theme_${userId}`);
  }
  
  function saveUserTheme(userId, themeId) {
    localStorage.setItem(`wn_theme_${userId}`, themeId);
  }
  
  function getTimerStart(userId) {
    const v = localStorage.getItem(`wn_timer_${userId}`);
    return v ? parseInt(v) : null;
  }
  
  function saveTimerStart(userId) {
    const now = Date.now();
    localStorage.setItem(`wn_timer_${userId}`, now);
    return now;
  }

  // ===== DESIGN WIZARD (requirements + UML review) =====
  function defaultDesignWizardState() {
    return {
      step: 0, // 0..4 (4 = pick focus & lock)
      completed: {
        requirements: false,
        usecase: false,
        class: false,
        sequence: false,
      },
      locked: false,
      focus: null, // one of: requirements|usecase|class|sequence
    };
  }

  function getUserDesignWizard(userId) {
    try {
      const raw = localStorage.getItem(`wn_design_${userId}`);
      if (!raw) return defaultDesignWizardState();
      const parsed = JSON.parse(raw);
      return { ...defaultDesignWizardState(), ...parsed, completed: { ...defaultDesignWizardState().completed, ...(parsed.completed || {}) } };
    } catch {
      return defaultDesignWizardState();
    }
  }

  function saveUserDesignWizard(userId, wizardState) {
    localStorage.setItem(`wn_design_${userId}`, JSON.stringify(wizardState));
  }
  
  // ===== TIMER =====
  function startTimer(userId) {
    let start = state.timerStart || getTimerStart(userId);
    if (!start) start = saveTimerStart(userId);
    state.timerStart = start;
    updateTimerDisplay();
    state.timerInterval = setInterval(updateTimerDisplay, 1000);
  }
  
  function updateTimerDisplay() {
    if (!state.timerEl) return;
    const elapsed = Date.now() - state.timerStart;
    const remaining = Math.max(0, CONFIG.totalTime - elapsed);
    const h = Math.floor(remaining / 3600000);
    const m = Math.floor((remaining % 3600000) / 60000);
    const s = Math.floor((remaining % 60000) / 1000);
    const str = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    state.timerEl.textContent = `⏱ ${str}`;
    if (remaining < 600000) state.timerEl.classList.add("timer-urgent");
    else state.timerEl.classList.remove("timer-urgent");
  }
  
  // ===== TOAST =====
  function toast(msg, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const el = document.createElement("div");
    const icons = { success: "✅", info: "ℹ️", warning: "⚠️" };
    el.className = `toast ${type}`;
    el.innerHTML = `<span>${icons[type] || "ℹ️"}</span> <span>${msg}</span>`;
    container.appendChild(el);
    setTimeout(() => { el.style.opacity = "0"; el.style.transform = "translateX(100%)"; el.style.transition = "0.3s"; setTimeout(() => el.remove(), 300); }, 3500);
  }
  
  // ===== CALC PROGRESS =====
  function calcProgress(userId, themeId, day) {
    const progress = getUserProgress(userId);
    const theme = THEMES.find(t => t.id === themeId);
    if (!theme) return { pct: 0, pts: 0, total: 0, done: 0 };
    const items = day === 1 ? theme.day1 : theme.day2;
    let done = 0, pts = 0, total = 0;
    items.forEach((item, i) => {
      total += item.pts;
      const key = `${themeId}_day${day}_${i}`;
      if (progress[key]) { done++; pts += item.pts; }
    });
    const pct = total > 0 ? Math.round((pts / total) * 100) : 0;
    return { pct, pts, total, done, totalItems: items.length };
  }
  
  // ===== NAVIGATE =====
  function buildLbTeams(apiItems) {
    return apiItems.map(t => {
      const progressMap = (t.progress && typeof t.progress === "object") ? t.progress : {};
      return {
        teamKey: t.team_key,
        themeId: t.theme_id || null,
        membersCount: t.members_count || 0,
        memberNames: t.member_names || [],
        progressMap,
        isMyTeam: state.user?.team_name ? t.team_key === state.user.team_name : false,
      };
    });
  }

  function navigate(page) {
    if (page === "admin") state.adminTeams = null;
    state.currentPage = page;
    closeSidebarOnMobile();
    if (page === "leaderboard") {
      state.lbLoading = true;
      render();
      (async () => {
        try {
          const resp = await apiFetch("/api/leaderboard");
          state.lbTeams = buildLbTeams(resp.teams || resp.items || []);
          state.lbLoading = false;
          render();
        } catch (e) {
          state.lbLoading = false;
          toast(e.message || "Failed to load leaderboard.", "warning");
          render();
        }
      })();
      return;
    }
    render();
  }
  
  // ===== RENDER =====
  function render() {
    const app = document.getElementById("app");
    if (!state.user) {
      app.innerHTML = renderLoginPage();
      attachLoginEvents();
      return;
    }
    app.innerHTML = `
      ${renderNavbar()}
      <div id="sidebar-backdrop" class="sidebar-backdrop" onclick="toggleSidebar()"></div>
      <div class="dashboard-layout">
        ${renderSidebar()}
        <main class="main-content page-enter">
          ${renderPage()}
        </main>
      </div>
      <div id="modal-overlay" class="modal-overlay"></div>
      <div class="toast-container" id="toast-container"></div>
    `;
    state.timerEl = document.getElementById("nav-timer");
    startTimer(state.user.id);
    attachNavEvents();
    attachPageEvents();
    // Kick off scroll reveal on next frame so DOM is painted
    requestAnimationFrame(() => initScrollReveal());
  }
  
  // ===== LOGIN PAGE =====
  function renderLoginPage() {
    return `
      <div class="login-page">
        <div class="login-card">
          <div class="login-logo">
            <div style="width:72px;height:72px;border-radius:16px;background:linear-gradient(135deg,#e879f9,#38bdf8);display:flex;align-items:center;justify-content:center;font-size:2rem;margin:0 auto 1rem;">
              {/}
            </div>
            <h1>WebNexus</h1>
            <p>B-TECH Hackathon 2026 — BNU</p>
          </div>
          <div id="login-error" class="login-error">Invalid username or password.</div>
          <div class="form-group">
            <label class="form-label">Username</label>
            <input type="text" id="login-user" class="form-input" placeholder="firstname_lastname" autocomplete="username"/>
            <div class="login-hint">Use your name in format: firstname_lastname</div>
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" id="login-pass" class="form-input" placeholder="Your phone number" autocomplete="current-password"/>
            <div class="login-hint">Your password is your phone number</div>
          </div>
          <button class="btn-primary" id="login-btn">Login to Dashboard →</button>
        </div>
      </div>
      <div class="toast-container" id="toast-container"></div>
    `;
  }
  
  function attachLoginEvents() {
    document.getElementById("login-btn").addEventListener("click", doLogin);
    document.getElementById("login-pass").addEventListener("keydown", e => { if (e.key === "Enter") doLogin(); });
    document.getElementById("login-user").addEventListener("keydown", e => { if (e.key === "Enter") document.getElementById("login-pass").focus(); });
  }
  
  function doLogin() {
    const username = document.getElementById("login-user").value.trim();
    const password = document.getElementById("login-pass").value.trim();
    const errorEl = document.getElementById("login-error");
    const btn = document.getElementById("login-btn");
    errorEl.style.display = "none";
    if (!username || !password) { errorEl.textContent = "Please enter both username and password."; errorEl.style.display = "block"; return; }
    // Show loading state immediately
    btn.disabled = true;
    btn.textContent = "Logging in...";
    btn.style.opacity = "0.7";
    (async () => {
      try {
        const auth = await apiFetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({ username, password }),
        });
        setStoredToken(auth.token);
        localStorage.setItem("wn_user", JSON.stringify(auth.user));
        state.user = auth.user;
        btn.textContent = "Loading your dashboard...";
        await hydrateUserState();
        render();
        toast(`Welcome, ${state.user.name}! 🎉`, "success");
      } catch (e) {
        errorEl.textContent = e.message || "Login failed.";
        errorEl.style.display = "block";
        btn.disabled = false;
        btn.textContent = "Login to Dashboard →";
        btn.style.opacity = "1";
      }
    })();
  }

  async function hydrateUserState() {
    if (!state.user) return;
    const [me, day, theme, progress] = await Promise.all([
      apiFetch("/api/me"),
      apiFetch("/api/state/day"),
      apiFetch(`/api/theme/${state.user.id}`),
      apiFetch(`/api/progress/${state.user.id}`),
    ]);

    state.user = me.user;
    localStorage.setItem("wn_user", JSON.stringify(state.user));

    // Prefer server value; fall back to whatever localStorage has (set by admin via setDay)
    const localDay = parseInt(localStorage.getItem("wn_current_day") || "1");
    state.currentDay = day.currentDay ?? localDay;
    // Keep localStorage in sync with server value
    localStorage.setItem("wn_current_day", String(state.currentDay));

    state.selectedTheme = theme.themeId || null;
    state.themeConfirmed = !!theme.themeConfirmed;
    state.timerStart = theme.timerStart ? new Date(theme.timerStart).getTime() : null;
    if (state.selectedTheme) saveUserTheme(state.user.id, state.selectedTheme);

    state.progress = progress.progress || {};
    saveUserProgress(state.user.id, state.progress);
  }
  
  function renderNavbar() {
    const theme = THEMES.find(t => t.id === state.selectedTheme);
    return `
      <nav class="navbar">
        <div style="display:flex;align-items:center;gap:0.75rem;">
          <button class="hamburger-btn" id="sidebar-toggle" onclick="toggleSidebar()" aria-label="Toggle navigation" style="display:none;">
            <span></span><span></span><span></span>
          </button>
          <div class="nav-logo">
            <div style="width:36px;height:36px;border-radius:8px;background:linear-gradient(135deg,#e879f9,#38bdf8);display:flex;align-items:center;justify-content:center;font-size:1rem;font-family:var(--font-mono);color:white;font-weight:700;">{/}</div>
            <span class="logo-text">WebNexus</span>
          </div>
        </div>
        <div class="nav-right">
          ${state.themeConfirmed ? `<span class="nav-day-badge">Day ${state.currentDay}</span>` : ''}
          <span class="nav-user">Logged in as <span>${state.user.name}</span></span>
          ${state.themeConfirmed ? `<div class="nav-timer" id="nav-timer">⏱ 03:30:00</div>` : ''}
          <button onclick="logout()" style="font-size:0.8rem;color:var(--text-muted);padding:0.3rem 0.6rem;border:1px solid var(--border);border-radius:6px;transition:all 0.15s;" onmouseover="this.style.color='var(--error)'" onmouseout="this.style.color='var(--text-muted)'">Logout</button>
        </div>
      </nav>
    `;
  }
  
  // ===== SIDEBAR =====
  function renderSidebar() {
    const isAdmin = state.user.role === "admin";
    const items = [
      { id: "overview", icon: "🏠", label: "Overview" },
      { id: "themes", icon: "🎯", label: "Themes" },
      ...(state.themeConfirmed ? [
        { id: "requirements", icon: "📋", label: "Requirements" },
        { id: "progress", icon: "📊", label: "My Progress" },
        { id: "diagrams", icon: "📐", label: "Design Review" },
      ] : []),
      { id: "leaderboard", icon: "🏆", label: "Leaderboard" },
      ...(isAdmin ? [{ id: "admin", icon: "⚙️", label: "Admin" }] : []),
    ];
    return `
      <aside class="sidebar">
        <div class="sidebar-section">Navigation</div>
        ${items.map(item => `
          <div class="sidebar-item ${state.currentPage === item.id ? 'active' : ''}" onclick="navigate('${item.id}')">
            <span class="icon">${item.icon}</span>
            <span>${item.label}</span>
          </div>
        `).join('')}
      </aside>
    `;
  }
  
  // ===== PAGE ROUTER =====
  function renderPage() {
    switch (state.currentPage) {
      case "overview": return renderOverviewPage();
      case "themes": return renderThemesPage();
      case "requirements": return state.themeConfirmed ? renderRequirementsPage() : renderThemesPage();
      case "progress": return state.themeConfirmed ? renderProgressPage() : renderThemesPage();
      case "diagrams": return state.themeConfirmed ? renderDiagramsPage() : renderThemesPage();
      case "leaderboard": return renderLeaderboardPage();
      case "admin": return state.user.role === "admin" ? renderAdminPage() : renderOverviewPage();
      default: return renderOverviewPage();
    }
  }
  
  // ===== OVERVIEW PAGE =====
  function renderOverviewPage() {
    const theme = THEMES.find(t => t.id === state.selectedTheme);
    return `
      <div class="welcome-section scroll-reveal">
        <h2>Welcome, ${state.user.name}! 👋</h2>
        <p>This is the WebNexus Hackathon Platform for <strong>B-TECH 2026 at BNU</strong>. Choose your theme, review requirements, and track your progress — all in one place.</p>
        <div class="day-info">
          <span class="day-badge">📅 Day ${state.currentDay} Active</span>
          ${state.themeConfirmed && theme ? `<span style="font-size:0.85rem;color:var(--text-muted);">Your theme: <strong style="color:var(--accent-pink);">${theme.name}</strong></span>` : `<span style="font-size:0.85rem;color:var(--warning);">⚠️ You haven't selected a theme yet</span>`}
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1rem;margin-bottom:2rem;">
        <div class="stat-card scroll-reveal delay-1">
          <div class="stat-label">Current Day</div>
          <div class="stat-value" style="background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Day ${state.currentDay}</div>
          <div class="stat-sub">${state.currentDay === 1 ? 'Frontend Sprint' : 'Backend + Integration'}</div>
        </div>
        <div class="stat-card scroll-reveal delay-2">
          <div class="stat-label">Your Theme</div>
          <div class="stat-value" style="font-size:1.5rem;">${theme ? theme.icon : '—'}</div>
          <div class="stat-sub">${theme ? theme.name : 'Not selected'}</div>
        </div>
        <div class="stat-card scroll-reveal delay-3">
          <div class="stat-label">Total Themes</div>
          <div class="stat-value">4</div>
          <div class="stat-sub">Available to choose</div>
        </div>
        <div class="stat-card scroll-reveal delay-4">
          <div class="stat-label">Max Bonus Pts</div>
          <div class="stat-value">${theme ? '+' + theme.bonusPoints : '+55'}</div>
          <div class="stat-sub">Extra leaderboard points</div>
        </div>
      </div>
      ${!state.themeConfirmed ? `
      <div style="background:rgba(250,204,21,0.05);border:1px solid rgba(250,204,21,0.2);border-radius:var(--radius);padding:1.25rem;margin-bottom:2rem;" class="scroll-reveal">
        <strong>⚠️ Action Required:</strong> You must select a theme before starting the competition. <button onclick="navigate('themes')" style="color:var(--accent-pink);font-weight:700;text-decoration:underline;background:none;border:none;cursor:pointer;">Choose your theme →</button>
      </div>` : ''}
      ${state.themeConfirmed && theme ? `
      <div style="background:rgba(74,222,128,0.05);border:1px solid rgba(74,222,128,0.2);border-radius:var(--radius);padding:1.25rem;margin-bottom:2rem;" class="scroll-reveal">
        <div style="font-weight:800;color:var(--success);margin-bottom:0.6rem;">✅ Must-Have Requirements — ${theme.name}</div>
        <div style="font-size:0.84rem;color:var(--error);margin-bottom:0.65rem;">⚠️ Omitting any of these will result in a scoring penalty from judges.</div>
        <div style="display:flex;flex-direction:column;gap:0.35rem;max-height:220px;overflow-y:auto;padding-right:0.25rem;">
          ${theme.must.map(m => `
            <div style="display:flex;gap:0.5rem;align-items:flex-start;font-size:0.85rem;line-height:1.5;">
              <span style="color:var(--success);flex-shrink:0;">☑</span>
              <span>${m}</span>
            </div>
          `).join('')}
        </div>
        <button onclick="navigate('requirements')" style="margin-top:0.9rem;color:var(--accent-blue);font-weight:700;font-size:0.84rem;background:none;border:none;cursor:pointer;text-decoration:underline;">View full requirements →</button>
      </div>` : ''}
      <div class="section-title scroll-reveal">Competition Timeline</div>
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;" class="scroll-reveal delay-1">
        ${['Day 1 — Frontend Sprint', 'Day 2 — Backend + Integration'].map((d, i) => `
          <div style="display:flex;gap:1rem;align-items:flex-start;padding-bottom:${i===0?'1.5rem':'0'};${i===0?'border-bottom:1px solid var(--border);margin-bottom:1.5rem;':''}">
            <div style="width:32px;height:32px;border-radius:50%;background:${state.currentDay===i+1?'var(--gradient)':'var(--surface2)'};display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:700;flex-shrink:0;">${i+1}</div>
            <div>
              <div style="font-weight:700;margin-bottom:0.25rem;">${d}</div>
              <div style="font-size:0.82rem;color:var(--text-muted);">${i===0 ? 'Build all frontend pages and interactive UI. Duration: 3.5 hours.' : 'Implement backend APIs, database, and full integration. Duration: 3.5 hours.'}</div>
            </div>
            ${state.currentDay===i+1?`<span style="font-size:0.75rem;background:rgba(74,222,128,0.1);color:var(--success);padding:0.2rem 0.5rem;border-radius:999px;margin-left:auto;">Active</span>`:''}
          </div>
        `).join('')}
      </div>
    `;
  }
  
  // ===== THEMES PAGE =====
  function renderThemesPage() {
    return `
      <div class="section-title scroll-reveal">Choose Your Theme</div>
      <div class="section-subtitle scroll-reveal delay-1">Review all themes in detail before locking in. Use Review Only to explore requirements first.</div>
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1rem 1.1rem;margin-bottom:1.25rem;" class="scroll-reveal delay-2">
        <div style="font-weight:800;margin-bottom:0.35rem;">Recommended Flow</div>
        <div style="font-size:0.92rem;color:var(--text-muted);line-height:1.6;">
          1) Select theme → 2) Open Review Only (requirements + design expectations) → 3) Lock theme & start timer.
        </div>
      </div>
      <div class="themes-grid">
        ${THEMES.map((theme, i) => `
          <div class="theme-card scroll-reveal delay-${Math.min(i+1,6)} ${state.selectedTheme === theme.id ? 'selected' : ''}" onclick="selectTheme('${theme.id}')">
            <div class="theme-icon">${theme.icon}</div>
            <div class="theme-name">${theme.name}</div>
            <div class="theme-desc">${theme.desc}</div>
            <div class="theme-points">
              <span class="pts-badge">Day1: ${theme.day1Points}pts</span>
              <span class="pts-badge">Day2: ${theme.day2Points}pts</span>
              <span class="pts-badge" style="color:var(--warning);border-color:rgba(250,204,21,0.3);">Bonus: +${theme.bonusPoints}pts</span>
            </div>
            ${state.selectedTheme === theme.id ? `
              <div style="margin-top:1rem;font-size:0.8rem;color:var(--accent-pink);font-weight:700;">✓ Selected</div>
              ${!state.themeConfirmed ? `
                <div style="margin-top:0.9rem;display:flex;gap:0.6rem;flex-wrap:wrap;align-items:center;">
                  <button class="btn-ghost" onclick="event.stopPropagation(); reviewTheme('${theme.id}')">📖 Review Only</button>
                  <button class="btn-confirm" onclick="event.stopPropagation(); confirmTheme()">🔒 Lock in Theme & Start Timer →</button>
                </div>
                <div style="margin-top:0.65rem;font-size:0.82rem;color:var(--text-muted);line-height:1.5;">
                  Review requirements, then lock to start your timer.
                </div>
              ` : ''}
            ` : ''}
          </div>
        `).join('')}
      </div>
      ${state.themeConfirmed ? `
        <div style="background:rgba(74,222,128,0.05);border:1px solid rgba(74,222,128,0.2);border-radius:var(--radius);padding:1.25rem;" class="scroll-reveal">
          <strong>✅ Theme locked:</strong> ${THEMES.find(t=>t.id===state.selectedTheme)?.name}. Good luck! <button onclick="navigate('requirements')" style="color:var(--accent-blue);font-weight:700;background:none;border:none;cursor:pointer;text-decoration:underline;">View Requirements →</button>
        </div>
      ` : ''}
    `;
  }
  
  function selectTheme(id) {
    if (state.themeConfirmed) { toast("Theme is already locked in. You cannot change it.", "warning"); return; }
    state.selectedTheme = id;
    render();
  }
  
  function confirmTheme() {
    if (!state.selectedTheme) return;
    const theme = THEMES.find(t => t.id === state.selectedTheme);
    showModal(
      `🔒 Lock in "${theme.name}"?`,
      `This is irreversible. Your 3.5-hour countdown begins immediately. Make sure you're ready to start building!`,
      async () => {
        if (!state.user) return;
        const resp = await apiFetch(`/api/theme/${state.user.id}`, {
          method: "PUT",
          body: JSON.stringify({ themeId: state.selectedTheme, themeConfirmed: true }),
        });
        state.themeConfirmed = !!resp.themeConfirmed;
        saveUserTheme(state.user.id, state.selectedTheme);

        // timerStart is shared per team from server, but keep local fallback too.
        const localStart = saveTimerStart(state.user.id);
        state.timerStart = localStart;

        render();
        toast(`Theme locked for your team! Timer started. Build ${theme.name}!`, "success");
        setTimeout(() => navigate("requirements"), 500);
      }
    );
  }

  function reviewTheme(themeId) {
    if (!themeId) return;
    const theme = THEMES.find(t => t.id === themeId);
    if (!theme) return;
    state.previewTheme = themeId;
    const handbook = HANDBOOK_DETAILS[theme.id] || {};
    showReviewModal(theme, handbook);
  }

  function showReviewModal(theme, handbook = {}) {
    const overlay = document.getElementById("modal-overlay");
    if (!overlay) return;
    overlay.innerHTML = `
      <div class="modal" style="max-width:900px;max-height:82vh;display:flex;flex-direction:column;">
        <h3 style="margin-bottom:0.4rem;">${theme.icon} ${theme.name} — Review Overview</h3>
        <p style="margin-bottom:0.8rem;">Read this before locking. This is a quick handbook summary for planning.</p>
        <div style="overflow:auto;padding-right:0.25rem;">
          <div class="req-section" style="margin-bottom:1rem;">
            <h3>🧩 Problem Statement</h3>
            <p style="font-size:0.95rem;color:var(--text-muted);line-height:1.65;">${handbook.problem || theme.desc}</p>
          </div>
          <div class="req-section" style="margin-bottom:1rem;">
            <h3>🎯 Objective</h3>
            <p style="font-size:0.95rem;color:var(--text-muted);line-height:1.65;">${handbook.objective || theme.desc}</p>
          </div>
          <div class="req-section" style="margin-bottom:1rem;">
            <h3>👥 Target Users</h3>
            ${(handbook.targetUsers || []).map(item => `<div class="req-item"><span>•</span><span>${item}</span></div>`).join("")}
          </div>
          <div class="req-section" style="margin-bottom:1rem;">
            <h3>📐 Required Design Artifacts</h3>
            <div class="req-item"><span>1️⃣</span><span>Use Case Model</span></div>
            <div class="req-item"><span>2️⃣</span><span>Class Diagram</span></div>
            <div class="req-item"><span>3️⃣</span><span>Sequence Diagram</span></div>
          </div>
          <div class="req-section" style="margin-bottom:1rem;">
            <h3>📄 Day 1 / Day 2 Scope</h3>
            <div class="req-item"><span>•</span><span>Day 1 items: ${theme.day1.length} (${theme.day1Points} pts)</span></div>
            <div class="req-item"><span>•</span><span>Day 2 items: ${theme.day2.length} (${theme.day2Points} pts) ${state.currentDay >= 2 ? "— currently unlocked" : "— unlocks on Day 2"}</span></div>
            <div class="req-item"><span>•</span><span>Must-have items: ${theme.must.length}</span></div>
          </div>
        </div>
        <div class="modal-actions" style="margin-top:1rem;">
          <button class="btn-ghost" onclick="closeModal()">Close</button>
          <button class="btn-confirm" onclick="closeModal(); confirmTheme();">Lock Theme & Start Timer</button>
        </div>
      </div>
    `;
    overlay.classList.add("open");
  }
  
  // ===== REQUIREMENTS PAGE =====
  function renderRequirementsPage() {
    const theme = THEMES.find(t => t.id === state.selectedTheme);
    if (!theme) return `<div>No theme selected.</div>`;
    const handbook = HANDBOOK_DETAILS[theme.id] || {};
    const tabs = [
      { id: "overview", label: "📌 Overview" },
      { id: "design", label: "📐 Design / UML" },
      { id: "day1", label: `📄 Day 1 (${theme.day1Points} pts)` },
      ...(state.currentDay >= 2 ? [{ id: "day2", label: `⚙️ Day 2 (${theme.day2Points} pts)` }] : [{ id: "day2", label: `🔒 Day 2 (Unlocks Tomorrow)`, locked: true }]),
      { id: "bonus", label: `⭐ Bonus (+${theme.bonusPoints} pts)` },
      { id: "db", label: "🗄️ Database" },
      { id: "must", label: "✅ Must-Have" },
    ];
    const activeTab = state.reqTab || "day1";

    // Calculate overall progress
    const p1 = calcProgress(state.user.id, theme.id, 1);
    const totalDone = p1.done;
    const totalItems = p1.totalItems;

    return `
      <div class="section-title scroll-reveal">${theme.icon} ${theme.name}</div>

      <div class="vibe-header scroll-reveal delay-1">
        <div class="vibe-badge">✦ Vibe Coding Mode</div>
        <div class="vibe-title">Build freely — requirements are your compass, not your cage.</div>
        <div class="vibe-sub">
          These requirements guide your build. You choose <em>how</em> to implement them — be creative, be bold, be you.
          Work through them one at a time. Each unlocks the next. Can't go back — only forward. 🚀
        </div>
        <div style="margin-top:0.9rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
          <div style="font-size:0.85rem;color:var(--text-muted);">Day ${state.currentDay} progress:</div>
          <div style="flex:1;min-width:120px;max-width:260px;">
            <div class="progress-bar-wrap" style="height:7px;margin-bottom:0;">
              <div class="progress-bar-fill" style="width:${p1.pct}%"></div>
            </div>
          </div>
          <div style="font-family:var(--font-mono);font-size:0.88rem;color:var(--accent-teal);font-weight:700;">${totalDone}/${totalItems} done · ${p1.pts} pts</div>
        </div>

        <!-- Must-Have Requirements quick-view -->
        <div style="margin-top:1rem;display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">
          <button onclick="openMustHaveModal('${theme.id}')" style="display:flex;align-items:center;gap:0.45rem;padding:0.45rem 0.9rem;border-radius:999px;font-size:0.82rem;font-weight:700;border:1.5px solid rgba(74,222,128,0.4);background:rgba(74,222,128,0.07);color:var(--success);cursor:pointer;transition:all 0.15s;" onmouseover="this.style.background='rgba(74,222,128,0.14)'" onmouseout="this.style.background='rgba(74,222,128,0.07)'">
            ✅ View Must-Have Requirements (${theme.must.length})
          </button>
          <span style="font-size:0.78rem;color:var(--text-muted);">⚠️ Omitting any must-have incurs a scoring penalty</span>
        </div>
      </div>

      <div class="req-panel scroll-reveal delay-2">
        <div class="req-tabs">
          ${tabs.map(tab => `<div class="req-tab ${activeTab === tab.id ? 'active' : ''} ${tab.locked ? 'locked' : ''}" onclick="${tab.locked ? 'toast(\'Day 2 requirements unlock on Day 2!\', \'warning\')' : `setReqTab('${tab.id}')`}">${tab.label}</div>`).join('')}
        </div>
        <div class="req-content">
          ${renderReqTab(theme, activeTab, handbook)}
        </div>
      </div>
    `;
  }
  
  function openMustHaveModal(themeId) {
    const theme = THEMES.find(t => t.id === themeId);
    if (!theme) return;
    const overlay = document.getElementById("modal-overlay");
    if (!overlay) return;
    overlay.innerHTML = `
      <div class="modal" style="max-width:560px;max-height:80vh;display:flex;flex-direction:column;">
        <h3 style="margin-bottom:0.4rem;">✅ Must-Have Requirements</h3>
        <p style="font-size:0.88rem;color:var(--error);margin-bottom:0.85rem;">⚠️ Omitting any of these will result in a significant scoring penalty.</p>
        <div style="overflow-y:auto;flex:1;padding-right:0.25rem;display:flex;flex-direction:column;gap:0.5rem;">
          ${theme.must.map((m, i) => `
            <div style="display:flex;align-items:flex-start;gap:0.6rem;padding:0.65rem 0.8rem;background:rgba(74,222,128,0.05);border:1px solid rgba(74,222,128,0.18);border-radius:8px;">
              <span style="color:var(--success);font-size:1rem;flex-shrink:0;margin-top:0.05rem;">☑</span>
              <span style="font-size:0.88rem;line-height:1.55;">${m}</span>
            </div>
          `).join('')}
        </div>
        <div class="modal-actions" style="margin-top:1rem;">
          <button class="btn-confirm" onclick="closeModal()">Got it</button>
        </div>
      </div>
    `;
    overlay.classList.add("open");
  }

  function setReqTab(tab) {
    state.reqTab = tab;
    render();
  }
  
  function setReqFocus(tab, index) {
    if (!state.reqFocusIndexByTab) state.reqFocusIndexByTab = { day1: 0, day2: 0 };
    state.reqFocusIndexByTab[tab] = index;
    render();
  }

  function handleReqStepToggle(key, tab, nextIndex, checked) {
    if (!checked) return; // Only forward, never unchecked
    toggleProgress(key, true);
    // After completing, advance focus to the next incomplete item
    const newCursor = nextIndex;
    if (!state.reqFocusIndexByTab) state.reqFocusIndexByTab = { day1: 0, day2: 0 };
    state.reqFocusIndexByTab[tab] = newCursor;
    render();
  }

  function renderReqTab(theme, tab, handbook = {}) {
    if (tab === "overview") {
      return `
        <div class="req-section">
          <h3>🎯 Objective</h3>
          <p style="color:var(--text-muted);font-size:0.9rem;line-height:1.7;">${theme.desc}</p>
        </div>
        <div class="req-section">
          <h3>✅ Must-Have Requirements <span style="font-size:0.78rem;font-weight:500;color:var(--error);">— omitting any incurs a scoring penalty</span></h3>
          ${theme.must.map(m => `
            <div class="req-item">
              <span style="color:var(--success);">☑</span>
              <span>${m}</span>
            </div>
          `).join('')}
        </div>
        <div class="req-section">
          <h3>🎨 UI/UX + Responsiveness Checklist</h3>
          ${(handbook.uiux || []).map(item => `
            <div class="req-item"><span>•</span><span>${item}</span></div>
          `).join('')}
          ${(handbook.responsive || []).map(item => `
            <div class="req-item"><span>📱</span><span>${item}</span></div>
          `).join('')}
          ${(handbook.interactive || []).map(item => `
            <div class="req-item"><span>⚡</span><span>${item}</span></div>
          `).join('')}
        </div>
        <div class="req-section">
          <h3>📊 Scoring Breakdown</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:0.75rem;">
            ${[
              { label: "Functionality & Features", pct: "35%", icon: "⚙️" },
              { label: "Backend Architecture & API", pct: "20%", icon: "🗄️" },
              { label: "Innovation & Scalability", pct: "15%", icon: "💡" },
              { label: "UI/UX & Responsiveness", pct: "12%", icon: "🎨" },
              { label: "Code Quality", pct: "10%", icon: "✨" },
              { label: "Final Pitch", pct: "8%", icon: "🎤" },
            ].map(s => `
              <div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:0.875rem;">
                <div style="font-size:1.2rem;margin-bottom:0.3rem;">${s.icon}</div>
                <div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:0.2rem;">${s.label}</div>
                <div style="font-size:1.1rem;font-weight:800;font-family:var(--font-mono);color:var(--accent-teal);">${s.pct}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
    if (tab === "design") {
      return `
        <div class="req-section">
          <h3>📐 Required Design Artifacts</h3>
          <p style="font-size:0.9rem;color:var(--text-muted);line-height:1.6;margin-bottom:0.8rem;">
            Before implementation, prepare these design documents. They map directly to your theme's architecture.
            <strong style="color:var(--accent-pink);">Click any diagram to expand it.</strong>
          </p>
          <div style="display:flex;flex-wrap:wrap;gap:0.6rem;margin-bottom:1.25rem;">
            <div class="req-item" style="padding:0.4rem 0.75rem;background:rgba(232,121,249,0.07);border-radius:8px;border:1px solid rgba(232,121,249,0.2);"><span>1️⃣</span><span><strong>Use Case Model:</strong> Actors, use-cases, system boundaries</span></div>
            <div class="req-item" style="padding:0.4rem 0.75rem;background:rgba(56,189,248,0.07);border-radius:8px;border:1px solid rgba(56,189,248,0.2);"><span>2️⃣</span><span><strong>Class Diagram:</strong> Entities, relationships, attributes</span></div>
            <div class="req-item" style="padding:0.4rem 0.75rem;background:rgba(45,212,191,0.07);border-radius:8px;border:1px solid rgba(45,212,191,0.2);"><span>3️⃣</span><span><strong>Sequence Diagram:</strong> Login + core feature flow</span></div>
          </div>
        </div>
        <div class="diagram-grid">
          <div class="diagram-card" onclick="openDiagramModal('usecase','${theme.id}')" style="cursor:pointer;" title="Click to expand">
            <div class="diagram-preview" style="position:relative;">
              ${renderUseCaseDiagram(theme)}
              <div style="position:absolute;top:6px;right:6px;background:rgba(0,0,0,0.6);border-radius:6px;padding:2px 7px;font-size:0.7rem;color:#aaa;pointer-events:none;">🔍 Expand</div>
            </div>
            <div class="diagram-info">
              <div class="diagram-title">Use Case Model</div>
              <div class="diagram-subtitle">Actors and functional scope</div>
            </div>
          </div>
          <div class="diagram-card" onclick="openDiagramModal('class','${theme.id}')" style="cursor:pointer;" title="Click to expand">
            <div class="diagram-preview" style="position:relative;">
              ${renderClassDiagram(theme)}
              <div style="position:absolute;top:6px;right:6px;background:rgba(0,0,0,0.6);border-radius:6px;padding:2px 7px;font-size:0.7rem;color:#aaa;pointer-events:none;">🔍 Expand</div>
            </div>
            <div class="diagram-info">
              <div class="diagram-title">Class Diagram</div>
              <div class="diagram-subtitle">Data model alignment with DB/API</div>
            </div>
          </div>
          <div class="diagram-card" onclick="openDiagramModal('sequence','${theme.id}')" style="cursor:pointer;" title="Click to expand">
            <div class="diagram-preview" style="position:relative;">
              ${renderSequenceDiagram(theme)}
              <div style="position:absolute;top:6px;right:6px;background:rgba(0,0,0,0.6);border-radius:6px;padding:2px 7px;font-size:0.7rem;color:#aaa;pointer-events:none;">🔍 Expand</div>
            </div>
            <div class="diagram-info">
              <div class="diagram-title">Sequence Diagram</div>
              <div class="diagram-subtitle">Interaction flow across layers</div>
            </div>
          </div>
        </div>
      `;
    }
    if (tab === "day1" || tab === "day2") {
      const items = tab === "day1" ? theme.day1 : theme.day2;
      const progress = getUserProgress(state.user.id);
      const keys = items.map((_, i) => `${theme.id}_${tab}_${i}`);
      const doneFlags = keys.map(k => !!progress[k]);
      const firstIncompleteIndex = doneFlags.findIndex(d => !d);
      const completedCount = doneFlags.filter(Boolean).length;
      const allDone = firstIncompleteIndex === -1;
      // The "active" (unlocked) cursor: first incomplete, or last if all done
      const activeCursor = allDone ? items.length - 1 : firstIncompleteIndex;
      // User can VIEW any item up to activeCursor, but can only COMPLETE the active one
      const requestedCursor = state.reqFocusIndexByTab?.[tab] ?? activeCursor;
      // Clamp: can browse up to activeCursor, not beyond
      const cursorIndex = Math.max(0, Math.min(activeCursor, requestedCursor));
      const key = keys[cursorIndex];
      const isActiveCursor = cursorIndex === activeCursor;
      const isDone = doneFlags[cursorIndex];
      const canComplete = isActiveCursor && !isDone;
      const nextIndex = Math.min(items.length - 1, activeCursor + 1);

      // Step pills — can browse all unlocked (done + active), not locked ones
      const stepsHtml = items.map((_, i) => {
        const isDoneStep = doneFlags[i];
        const isUnlocked = i <= activeCursor; // can view
        const isFocused = i === cursorIndex;
        let pillClass = 'req-step-pill';
        if (isDoneStep) pillClass += ' done';
        else if (i === activeCursor) pillClass += ' active';
        if (isUnlocked && !isDoneStep && i !== activeCursor) pillClass += ' unlocked';
        return `
          <button type="button" class="${pillClass}"
            ${isUnlocked ? `onclick="setReqFocus('${tab}', ${i})"` : "disabled"}
            title="${isDoneStep ? 'Completed' : i === activeCursor ? 'Current task' : isUnlocked ? 'View' : 'Locked'}"
          >
            ${isDoneStep ? '✓' : i + 1}
          </button>
        `;
      }).join("");

      const dayLabel = tab === "day1" ? "📄 Day 1 — Frontend Sprint" : "⚙️ Day 2 — Backend + Integration";

      return `
        <div class="req-section">
          <h3>${dayLabel}</h3>

          <div style="display:flex;gap:1.25rem;flex-wrap:wrap;align-items:flex-start;">

            <!-- Main task card -->
            <div style="flex:1;min-width:280px;">
              <div class="req-phase-card ${isDone ? 'done-req' : isActiveCursor ? 'active-req' : 'locked-req'}">

                <!-- Card header -->
                <div style="display:flex;align-items:center;justify-content:space-between;gap:0.75rem;margin-bottom:1rem;flex-wrap:wrap;">
                  <div style="display:flex;align-items:center;gap:0.6rem;">
                    ${isDone
                      ? `<span style="font-size:1.2rem;">✅</span>`
                      : isActiveCursor
                      ? `<span style="width:10px;height:10px;border-radius:50%;background:var(--accent-pink);display:inline-block;animation:phaseGlow 2s infinite;"></span>`
                      : `<span style="width:10px;height:10px;border-radius:50%;background:var(--border);display:inline-block;"></span>`
                    }
                    <span style="font-size:0.82rem;font-weight:700;color:var(--text-muted);font-family:var(--font-mono);">
                      ${isDone ? 'COMPLETED' : isActiveCursor ? 'CURRENT TASK' : 'PREVIEW'}
                    </span>
                  </div>
                  <div style="font-family:var(--font-mono);font-weight:900;color:var(--accent-teal);background:rgba(45,212,191,0.08);border:1px solid rgba(45,212,191,0.2);padding:0.2rem 0.65rem;border-radius:999px;font-size:0.85rem;">
                    ${items[cursorIndex].pts} pts
                  </div>
                </div>

                <!-- Task text -->
                <div style="font-size:1.05rem;line-height:1.65;margin-bottom:0.5rem;font-weight:${isActiveCursor && !isDone ? '600' : '400'};">
                  ${items[cursorIndex].text}
                </div>

                <!-- Vibe note (active only) -->
                ${isActiveCursor && !isDone ? `
                  <div style="margin-top:0.75rem;padding:0.6rem 0.8rem;background:linear-gradient(135deg,rgba(232,121,249,0.07),rgba(56,189,248,0.07));border:1px solid rgba(232,121,249,0.2);border-radius:8px;">
                    <div style="font-size:0.78rem;font-weight:700;color:var(--accent-pink);margin-bottom:0.3rem;">✦ Vibe Coding Hint</div>
                    <div style="font-size:0.79rem;color:var(--text-muted);line-height:1.55;">${getVibeHint(tab, cursorIndex, theme.id)}</div>
                  </div>
                ` : ''}

                <!-- Action -->
                ${isDone
                  ? `<div class="req-done-badge">✅ Locked in — great work! Move to the next step.</div>`
                  : isActiveCursor
                  ? `<button class="req-complete-btn" onclick="handleReqStepToggle('${key}', '${tab}', ${nextIndex}, true)">
                      ✓ Mark Complete &amp; Unlock Next
                    </button>`
                  : `<div style="margin-top:0.9rem;font-size:0.82rem;color:var(--text-muted);padding:0.6rem;background:var(--surface);border-radius:6px;border:1px solid var(--border);">
                      👁 Preview mode — complete active task first to unlock this step.
                    </div>`
                }
              </div>
            </div>

            <!-- Step tracker -->
            <div style="min-width:200px;max-width:240px;">
              <div style="font-weight:800;color:var(--text-muted);font-size:0.82rem;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:0.75rem;">Steps</div>
              <div style="display:flex;flex-wrap:wrap;gap:0.45rem;">${stepsHtml}</div>
              <div style="margin-top:1rem;padding:0.75rem;background:var(--surface);border:1px solid var(--border);border-radius:8px;">
                <div style="font-size:0.78rem;color:var(--text-muted);margin-bottom:0.3rem;">Completed</div>
                <div style="font-family:var(--font-mono);font-weight:800;font-size:1.1rem;color:var(--accent-teal);">${completedCount} <span style="color:var(--text-muted);font-size:0.85rem;font-weight:500;">/ ${items.length}</span></div>
                <div class="progress-bar-wrap" style="margin-top:0.5rem;margin-bottom:0;height:5px;">
                  <div class="progress-bar-fill" style="width:${Math.round((completedCount/items.length)*100)}%"></div>
                </div>
              </div>
              ${allDone ? `
                <div style="margin-top:0.75rem;padding:0.65rem;background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.25);border-radius:8px;text-align:center;">
                  <div style="font-size:1.2rem;">🎉</div>
                  <div style="font-size:0.82rem;color:var(--success);font-weight:700;margin-top:0.2rem;">All ${tab === 'day1' ? 'Day 1' : 'Day 2'} tasks done!</div>
                </div>
              ` : ''}
            </div>

          </div>

          <!-- Vibe Coding Toolbox — always visible below task area -->
          <div style="margin-top:1.25rem;">
            ${renderVibeToolbox(tab)}
          </div>
        </div>
      `;
    }
    if (tab === "bonus") {
      return `
        <div class="req-section">
          <h3>⭐ Bonus Features — Leaderboard Boosters</h3>
          <p style="font-size:0.82rem;color:var(--text-muted);margin-bottom:1rem;">Optional features awarded in order of submission. Each item scored separately.</p>
          ${theme.bonus.map((item, i) => `
            <div class="req-item bonus-item">
              <span>★ ${item.text}</span>
              <span class="req-item-pts">+${item.pts} pts</span>
            </div>
          `).join('')}
        </div>
      `;
    }
    if (tab === "db") {
      return `
        <div class="req-section">
          <h3>🗄️ Database Schema Requirements</h3>
          ${theme.db.map(d => `
            <div class="req-item" style="font-family:var(--font-mono);font-size:0.8rem;">
              <span>🔷 ${d}</span>
            </div>
          `).join('')}
        </div>
      `;
    }
    if (tab === "must") {
      return `
        <div class="req-section">
          <h3>✅ Core Must-Have Features</h3>
          <p style="font-size:0.82rem;color:var(--error);margin-bottom:1rem;">⚠️ Omitting any of these will result in a significant scoring penalty.</p>
          ${theme.must.map(m => `
            <div class="req-item">
              <span style="color:var(--success);">☑</span>
              <span>${m}</span>
            </div>
          `).join('')}
        </div>
      `;
    }
    return '';
  }
  
  // ===== VIBE CODING HELPERS =====
  // Per-task contextual hints — gives students creative implementation ideas
  const VIBE_HINTS = {
    day1: [
      "Try a full-bleed hero with a CSS gradient mesh or animated blob background. Use Framer Motion or GSAP ScrollTrigger for the CTA entrance.",
      "Build a responsive card grid with CSS Grid auto-fill. Add a live filter using URLSearchParams so filtered state survives page refresh.",
      "Use CSS Grid for a magazine-style profile layout. Animate the booking button with a CSS keyframe pulse on hover.",
      "Multi-step form: store each step in state, show a progress bar, animate between steps with a slide transition.",
      "Dashboard: use recharts or Chart.js for the vitals chart. Skeleton loaders on fetch instead of a spinner — much more polished.",
      "Blog/resources: implement a debounced search filter client-side. Use CSS :has() for selected-category card highlights.",
      "Auth forms: show password strength meter, inline validation on blur, and a success micro-animation on submit.",
      "404 page: make it fun — ASCII art, a lottie animation, or a mini game. Judges notice creative error states.",
    ],
    day2: [
      "Hash passwords with bcrypt (cost factor 12). Return a signed JWT with role in payload. Use middleware to protect all non-auth routes.",
      "JWT login: add refresh token pattern — short-lived access token (15m) + long-lived refresh token in httpOnly cookie.",
      "Use cursor-based pagination instead of offset — better performance at scale. Add Redis or in-memory TTL cache.",
      "Profile endpoint: use a DB view or JOIN to return nested doctor data in one query. Avoid N+1 queries.",
      "Prevent double-booking at the DB layer with a unique partial index on (doctor_id, datetime, status != 'cancelled').",
      "Appointment history: add filtering by date range and status. Use query param validation with Zod or Joi.",
      "PATCH/PUT: use optimistic locking (version field) to prevent concurrent update conflicts.",
      "Paginated resources: add full-text search with PostgreSQL tsvector or a simple ILIKE fallback.",
    ],
  };

  function getVibeHint(tab, index, themeId) {
    const hints = VIBE_HINTS[tab] || VIBE_HINTS.day1;
    return hints[index % hints.length] || "Build this your way — choose your stack, your aesthetic, your approach.";
  }

  function renderVibeToolbox(tab) {
    const isBackend = tab === "day2";
    const stacks = isBackend
      ? [
          { icon: "🟡", label: "Node + Express", tip: "Fast REST APIs + WebSockets" },
          { icon: "🐍", label: "FastAPI", tip: "Async Python, auto Swagger docs" },
          { icon: "🟢", label: "NestJS", tip: "Structured, TypeScript-first" },
          { icon: "🦀", label: "Bun + Hono", tip: "Edge-ready, ultra-fast" },
          { icon: "📦", label: "Supabase", tip: "Instant BaaS — no backend needed" },
          { icon: "🔷", label: "Prisma ORM", tip: "Type-safe DB queries" },
        ]
      : [
          { icon: "⚛️", label: "React", tip: "Hooks + component ecosystem" },
          { icon: "🟢", label: "Vue 3", tip: "Composition API, fast DX" },
          { icon: "⚡", label: "Svelte", tip: "Compiles to vanilla JS" },
          { icon: "🌊", label: "Glassmorphism", tip: "backdrop-blur + semi-transparent" },
          { icon: "🔲", label: "Bento Grid", tip: "Asymmetric card layouts" },
          { icon: "💫", label: "Micro-animations", tip: "GSAP / Framer Motion" },
        ];
    const tools = [
      { icon: "🤖", label: "Claude / GPT", tip: "Architecture + boilerplate" },
      { icon: "🎨", label: "v0.dev", tip: "UI from text → React code" },
      { icon: "⚡", label: "Cursor", tip: "AI autocomplete in editor" },
      { icon: "🗂️", label: "Excalidraw", tip: "Whiteboard UML first" },
    ];
    return `
      <details style="background:var(--surface);border:1px solid var(--border);border-radius:10px;overflow:hidden;">
        <summary style="padding:0.75rem 1rem;cursor:pointer;font-weight:700;font-size:0.88rem;color:var(--text-muted);list-style:none;display:flex;align-items:center;gap:0.5rem;user-select:none;">
          <span style="color:var(--accent-pink);">✦</span> Vibe Coding Toolbox — ${isBackend ? 'Backend Stacks' : 'Frontend Stacks & Aesthetics'} + AI Tools
          <span style="margin-left:auto;font-size:0.75rem;opacity:0.5;">click to expand</span>
        </summary>
        <div style="padding:0.9rem 1rem 1rem;border-top:1px solid var(--border);">
          <div style="font-size:0.78rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:0.6rem;">${isBackend ? '⚙️ Backend Options' : '🎨 Frontend / Design Options'}</div>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:1rem;">
            ${stacks.map(s => `
              <div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:0.45rem 0.75rem;font-size:0.78rem;transition:border-color 0.15s;" onmouseover="this.style.borderColor='var(--accent-pink)'" onmouseout="this.style.borderColor='var(--border)'">
                <span>${s.icon} <strong>${s.label}</strong></span>
                <span style="color:var(--text-muted);margin-left:0.35rem;">— ${s.tip}</span>
              </div>
            `).join('')}
          </div>
          <div style="font-size:0.78rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:0.6rem;">🤖 AI & Tools</div>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:1rem;">
            ${tools.map(t => `
              <div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:0.45rem 0.75rem;font-size:0.78rem;transition:border-color 0.15s;" onmouseover="this.style.borderColor='var(--accent-teal)'" onmouseout="this.style.borderColor='var(--border)'">
                <span>${t.icon} <strong>${t.label}</strong></span>
                <span style="color:var(--text-muted);margin-left:0.35rem;">— ${t.tip}</span>
              </div>
            `).join('')}
          </div>
          <div style="background:rgba(45,212,191,0.05);border:1px solid rgba(45,212,191,0.15);border-radius:8px;padding:0.65rem 0.9rem;">
            <div style="font-size:0.76rem;font-weight:700;color:var(--accent-teal);margin-bottom:0.4rem;">💡 Judge Impressers</div>
            <div style="display:flex;flex-wrap:wrap;gap:0.3rem 1.25rem;">
              ${(isBackend ? [
                "Rate limiting + input validation on every endpoint",
                "Consistent error envelope: { success, data, error }",
                "DB indexes on foreign keys and filter columns",
                "Environment-based config (.env) — no hardcoded secrets",
              ] : [
                "Skeleton loaders instead of spinners",
                "Optimistic UI — update before API confirms",
                "Responsive with no horizontal overflow on mobile",
                "Animated empty states — not just blank boxes",
              ]).map(tip => `<div style="font-size:0.75rem;color:var(--text-muted);">→ ${tip}</div>`).join('')}
            </div>
          </div>
        </div>
      </details>
    `;
  }

  function toggleProgress(key, checked) {
    const progress = getUserProgress(state.user.id);
    // Once a requirement is completed, it's permanently locked — can never be unchecked.
    if (progress[key] && !checked) {
      toast("Completed requirements are permanently locked. No going back! 🔒", "warning");
      return;
    }
    // Can only check (mark complete), not uncheck
    if (!checked) return;
    progress[key] = true;
    saveUserProgress(state.user.id, progress);
    state.progress = progress;
    // Persist to Supabase (non-blocking)
    (async () => {
      try {
        await apiFetch(`/api/progress/${state.user.id}`, {
          method: "PUT",
          body: JSON.stringify({ progress }),
        });
      } catch (e) {
        toast(e.message || "Failed to sync progress.", "warning");
      }
    })();
    toast("Task locked in! 🎉 Next requirement unlocked.", "success");
  }
  
  // ===== PROGRESS PAGE =====
  function renderProgressPage() {
    const theme = THEMES.find(t => t.id === state.selectedTheme);
    if (!theme) return '';
    const p1 = calcProgress(state.user.id, theme.id, 1);
    const p2 = calcProgress(state.user.id, theme.id, 2);
    const totalPts = p1.pts + p2.pts;
    const totalMax = p1.total + p2.total;
    const overall = totalMax > 0 ? Math.round((totalPts / totalMax) * 100) : 0;
    return `
      <div class="section-title">📊 My Progress</div>
      <div class="section-subtitle">Track how much of the requirements you've completed.</div>
      <div class="progress-section">
        <div class="progress-header">
          <div class="progress-title">Overall Completion</div>
          <div class="progress-pct">${overall}%</div>
        </div>
        <div class="progress-bar-wrap">
          <div class="progress-bar-fill" style="width:${overall}%"></div>
        </div>
        <div style="font-size:0.82rem;color:var(--text-muted);">Total points earned: <strong style="color:var(--accent-teal);">${p1.pts + p2.pts}</strong> / ${p1.total + p2.total}</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:2rem;">
        ${[{day:1,p:p1,label:'Day 1 — Frontend Sprint'},{day:2,p:p2,label:'Day 2 — Backend + Integration'}].map(({day,p,label}) => `
          <div class="progress-section">
            <div class="progress-header">
              <div class="progress-title">${label}</div>
              <div class="progress-pct">${p.pct}%</div>
            </div>
            <div class="progress-bar-wrap">
              <div class="progress-bar-fill" style="width:${p.pct}%"></div>
            </div>
            <div style="font-size:0.82rem;color:var(--text-muted);">
              ${p.done}/${p.totalItems} tasks done — ${p.pts}/${p.total} pts
              ${day > state.currentDay ? '<span style="color:var(--warning);"> (locked)</span>' : ''}
            </div>
          </div>
        `).join('')}
      </div>
      <div class="section-title" style="font-size:1rem;">Day 1 Checklist</div>
      <div class="progress-tasks" style="display:flex;flex-direction:column;gap:0.5rem;margin-bottom:2rem;">
        ${theme.day1.map((item, i) => {
          const key = `${theme.id}_day1_${i}`;
          const done = !!state.progress[key];
          // In progress page, only allow checking if it's the next sequential item (same forward-only rule)
          const progress = getUserProgress(state.user.id);
          const d1Keys = theme.day1.map((_, j) => `${theme.id}_day1_${j}`);
          const firstIncomplete = d1Keys.findIndex(k => !progress[k]);
          const canCheck = !done && (firstIncomplete === i);
          return `
            <label class="task-check ${done ? 'done' : ''}" style="justify-content:space-between;width:100%;max-width:600px;${!done && !canCheck ? 'opacity:0.5;' : ''}">
              <div style="display:flex;align-items:center;gap:0.5rem;">
                <input
                  type="checkbox"
                  ${done ? 'checked' : ''}
                  ${done || !canCheck ? 'disabled' : ''}
                  onchange="toggleProgress('${key}', this.checked)"
                  style="accent-color:var(--accent-pink);"
                />
                <span style="font-size:0.88rem;">${item.text}</span>
              </div>
              <span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--accent-pink);flex-shrink:0;margin-left:0.5rem;">${item.pts}pts</span>
            </label>
          `;
        }).join('')}
      </div>
      ${state.currentDay >= 2 ? `
      <div class="section-title" style="font-size:1rem;">Day 2 Checklist</div>
      <div class="progress-tasks" style="display:flex;flex-direction:column;gap:0.5rem;margin-bottom:2rem;">
        ${theme.day2.map((item, i) => {
          const key = `${theme.id}_day2_${i}`;
          const done = !!state.progress[key];
          const progress = getUserProgress(state.user.id);
          const d2Keys = theme.day2.map((_, j) => `${theme.id}_day2_${j}`);
          const firstIncomplete = d2Keys.findIndex(k => !progress[k]);
          const canCheck = !done && (firstIncomplete === i);
          return `
            <label class="task-check ${done ? 'done' : ''}" style="justify-content:space-between;width:100%;max-width:600px;${!done && !canCheck ? 'opacity:0.5;' : ''}">
              <div style="display:flex;align-items:center;gap:0.5rem;">
                <input
                  type="checkbox"
                  ${done ? 'checked' : ''}
                  ${done || !canCheck ? 'disabled' : ''}
                  onchange="toggleProgress('${key}', this.checked)"
                  style="accent-color:var(--accent-teal);"
                />
                <span style="font-size:0.88rem;">${item.text}</span>
              </div>
              <span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--accent-teal);flex-shrink:0;margin-left:0.5rem;">${item.pts}pts</span>
            </label>
          `;
        }).join('')}
      </div>
      ` : '<div style="padding:1rem;background:rgba(250,204,21,0.05);border:1px solid rgba(250,204,21,0.15);border-radius:8px;color:var(--text-muted);font-size:0.88rem;">🔒 Day 2 checklist unlocks when Day 2 begins.</div>'}
    `;
  }
  
  // ===== LEADERBOARD PAGE =====
  // Computes per-day progress for a team using the same calcProgress logic.
  // For the leaderboard we use the team's stored progress map (from the API).
  function calcProgressFromMap(progressMap, themeId, day) {
    const theme = THEMES.find(t => t.id === themeId);
    if (!theme) return { pct: 0, pts: 0, total: 0, done: 0, totalItems: 0 };
    const items = day === 1 ? theme.day1 : theme.day2;
    let done = 0, pts = 0, total = 0;
    items.forEach((item, i) => {
      total += item.pts;
      const key = `${themeId}_day${day}_${i}`;
      if (progressMap && progressMap[key]) { done++; pts += item.pts; }
    });
    const pct = total > 0 ? Math.round((pts / total) * 100) : 0;
    return { pct, pts, total, done, totalItems: items.length };
  }

  function renderLeaderboardPage() {
    // Show loading skeleton while API call is in-flight
    if (state.lbLoading) {
      return `
        <div class="section-title">🏆 Leaderboard</div>
        <div class="section-subtitle">Loading team rankings...</div>
        <div style="display:flex;flex-direction:column;gap:0.75rem;margin-top:1.5rem;">
          ${[1,2,3,4,5].map(() => `
            <div style="height:64px;border-radius:12px;background:var(--surface2);border:1px solid var(--border);animation:pulse 1.4s ease-in-out infinite;"></div>
          `).join('')}
        </div>
      `;
    }

    const rawTeams = (state.lbTeams || []).slice();
    const lbDay = state.lbDay || 1;

    // Score every team for the selected day using the same calcProgressFromMap helper
    const teamsSorted = rawTeams.map(team => {
      const p = calcProgressFromMap(team.progressMap || {}, team.themeId, lbDay);
      return { ...team, dayPts: p.pts, dayPct: p.pct, dayDone: p.done, dayTotal: p.totalItems };
    }).sort((a, b) => b.dayPts - a.dayPts);

    const meUserId = state.user?.id;
    const top3 = teamsSorted.slice(0, 3);
    const lbFilter = state.lbTeamFilter || "all";
    const visibleTeams = lbFilter === "all" ? teamsSorted : teamsSorted.filter(t => t.teamKey === lbFilter);

    const teamOptions = [
      { id: "all", label: "All Teams" },
      ...teamsSorted.map(t => {
        const theme = THEMES.find(tt => tt.id === t.themeId);
        const shown = (t.memberNames || []).slice(0, 3).join(", ");
        return { id: t.teamKey, label: `${t.teamKey}${theme ? " — " + theme.name : ""}` };
      }),
    ];

    // Podium — only when showing all teams
    const podiumHtml = (lbFilter === "all" && top3.length > 0) ? (() => {
      const podiumOrder = top3.length >= 3 ? [top3[1], top3[0], top3[2]] : top3;
      const medals = ["🥇","🥈","🥉"];
      const rankClasses = ["rank-2","rank-1","rank-3"];
      return `
        <div class="lb-podium scroll-reveal delay-1">
          ${podiumOrder.map((team, pi) => {
            if (!team) return "";
            const rank = top3.indexOf(team);
            const theme = THEMES.find(t => t.id === team.themeId);
            return `
              <div class="lb-podium-item ${rankClasses[pi]}">
                <div class="lb-podium-medal">${medals[rank]}</div>
                <div class="lb-podium-name">${team.teamKey}${meUserId && team.isMyTeam ? ' <span style="color:var(--accent-pink);font-size:0.7rem;">(you)</span>' : ""}</div>
                <div class="lb-podium-theme">${theme ? theme.icon + " " + theme.name : "—"}</div>
                <div class="lb-podium-pts">${team.dayPts}</div>
                <div class="lb-podium-pts-label">${team.dayPct}% · ${team.dayDone}/${team.dayTotal} reqs</div>
              </div>
            `;
          }).join("")}
        </div>
      `;
    })() : "";

    return `
      <div class="section-title scroll-reveal">🏆 Leaderboard</div>
      <div class="section-subtitle scroll-reveal delay-1">Team rankings based on self-reported progress. Final results determined by judges.</div>

      <div style="background:rgba(250,204,21,0.05);border:1px solid rgba(250,204,21,0.15);border-radius:var(--radius);padding:1rem 1.25rem;margin-bottom:1.25rem;" class="scroll-reveal delay-2">
        <div style="font-weight:900;color:var(--accent-white);margin-bottom:0.25rem;">⚖️ Final evaluation is done by judges.</div>
        <div style="color:var(--text-muted);font-size:0.9rem;">This leaderboard reflects self-reported progress only — scoring may differ after judging.</div>
      </div>

      <!-- Day selector -->
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1.25rem;" class="scroll-reveal delay-2">
        ${[1,2].map(d => `
          <button onclick="setLbDay(${d})" style="padding:0.5rem 1.1rem;border-radius:999px;font-weight:700;font-size:0.85rem;border:1.5px solid ${lbDay===d?"var(--accent-pink)":"var(--border)"};background:${lbDay===d?"rgba(232,121,249,0.12)":"var(--surface2)"};color:${lbDay===d?"var(--accent-pink)":"var(--text-muted)"};cursor:pointer;transition:all 0.15s;">
            ${d === 1 ? "📄 Day 1 — Frontend Sprint" : "⚙️ Day 2 — Backend + Integration"}
          </button>
        `).join("")}
      </div>

      ${podiumHtml}

      <div style="display:flex;gap:0.8rem;align-items:center;flex-wrap:wrap;margin-bottom:0.75rem;" class="scroll-reveal delay-3">
        <div style="font-weight:800;color:var(--text-muted);font-size:0.9rem;">Filter team:</div>
        <select onchange="setLbTeamFilter(this.value)"
          style="background:var(--surface2);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:0.6rem 0.8rem;font-weight:700;min-width:200px;max-width:100%;transition:border-color 0.15s;"
          onfocus="this.style.borderColor='var(--accent-pink)'" onblur="this.style.borderColor='var(--border)'">
          ${teamOptions.map(o => `<option value="${o.id}" ${lbFilter===o.id?"selected":""}>${o.label}</option>`).join("")}
        </select>
      </div>

      <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;" class="scroll-reveal delay-4">
        <div class="leaderboard-table" style="min-width:500px;">
          <div class="lb-header">
            <div>Rank</div>
            <div>Team</div>
            <div>Members</div>
            <div>Points</div>
            <div>Progress</div>
          </div>
          ${visibleTeams.length === 0
            ? `<div style="padding:2rem;text-align:center;color:var(--text-muted);">No teams found.</div>`
            : visibleTeams.map((team, i) => {
              const theme = THEMES.find(t => t.id === team.themeId);
              const isMeTeam = meUserId && team.isMyTeam === true;
              const shown = (team.memberNames || []).slice(0, 3);
              const rest = (team.memberNames || []).length - shown.length;
              const memberText = rest > 0 ? shown.join(", ") + " +" + rest : shown.join(", ");
              const rankClass = i === 0 ? "gold" : i === 1 ? "silver" : i === 2 ? "bronze" : "";
              const rowRankClass = i === 0 ? "lb-row-rank1" : i === 1 ? "lb-row-rank2" : i === 2 ? "lb-row-rank3" : "";
              const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "#" + (i+1);
              return `
                <div class="lb-row ${rowRankClass} ${isMeTeam ? "current-user" : ""}" style="animation-delay:${i*0.06}s;">
                  <div class="lb-rank"><div class="lb-rank-badge ${rankClass}">${medal}</div></div>
                  <div>
                    <div class="lb-name">${team.teamKey}${isMeTeam ? '<span style="font-size:0.7rem;color:var(--accent-pink);margin-left:0.35rem;">(your team)</span>' : ""}</div>
                    <div class="lb-theme" style="margin-top:0.2rem;">${theme ? theme.icon + " " + theme.name : "Theme not selected"}</div>
                  </div>
                  <div class="lb-theme" style="font-size:0.85rem;color:var(--text-muted);align-self:center;">${memberText || "—"}</div>
                  <div class="lb-pts" style="align-self:center;">${team.dayPts} <span style="font-size:0.72rem;color:var(--text-muted);font-weight:500;">pts</span></div>
                  <div class="lb-progress" style="align-self:center;">
                    <div class="lb-bar-wrap"><div class="lb-bar-fill" style="width:${team.dayPct}%"></div></div>
                    <div class="lb-pct">${team.dayPct}%</div>
                  </div>
                </div>
              `;
            }).join("")
          }
        </div>
      </div>
    `;
  }
  function setLbTeamFilter(teamKey) {
    state.lbTeamFilter = teamKey;
    render();
  }

  function setLbDay(day) {
    state.lbDay = day;
    render();
  }
  
  // ===== DIAGRAMS PAGE =====
  function renderDiagramsPage() {
    const themeId = state.themeConfirmed ? state.selectedTheme : (state.previewTheme || state.selectedTheme);
    const theme = THEMES.find(t => t.id === themeId);
    if (!theme) return `<div>No theme selected. Please select a theme first.</div>`;

    const handbook = HANDBOOK_DETAILS[theme.id] || {};
    const detailList = (title, items, icon = "•") => `
      <div class="req-section">
        <h3>${title}</h3>
        ${(items || []).map(it => `
          <div class="req-item">
            <span>${icon}</span>
            <span>${it}</span>
          </div>
        `).join("")}
      </div>
    `;

    return `
      <div class="section-title">${theme.icon} ${theme.name} — Review Only</div>
      <div class="section-subtitle">Detailed handbook overview before lock-in. No lock action happens on this page.</div>
      ${!state.themeConfirmed ? `
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-bottom:1rem;">
          <button class="btn-ghost" onclick="navigate('themes')">← Back to Theme Selection</button>
          <button class="btn-confirm" onclick="confirmTheme()">🔒 Lock This Theme & Start Timer</button>
        </div>
      ` : ""}
      <div class="req-panel">
        <div class="req-content">
          <div class="req-section">
            <h3>🧩 Problem Statement</h3>
            <p style="font-size:0.98rem;color:var(--text-muted);line-height:1.7;">${handbook.problem || theme.desc}</p>
          </div>
          <div class="req-section">
            <h3>🎯 Objective</h3>
            <p style="font-size:0.98rem;color:var(--text-muted);line-height:1.7;">${handbook.objective || theme.desc}</p>
          </div>
          ${detailList("👥 Target Users", handbook.targetUsers, "•")}
          ${detailList("🎨 UI/UX Expectations", handbook.uiux, "•")}
          ${detailList("📱 Responsiveness Requirements", handbook.responsive, "•")}
          ${detailList("⚡ Minimum Interactive Functionality", handbook.interactive, "•")}
          <div class="req-section">
            <h3>📄 Day 1 Requirements (${theme.day1Points} pts)</h3>
            ${theme.day1.map(item => `
              <div class="req-item">
                <span>•</span>
                <span>${item.text}</span>
                <span class="req-item-pts">${item.pts} pts</span>
              </div>
            `).join("")}
          </div>
          <div class="req-section">
            <h3>${state.currentDay >= 2 ? "⚙️ Day 2 Requirements" : "🔒 Day 2 Requirements (Unlocks on Day 2)"} (${theme.day2Points} pts)</h3>
            ${theme.day2.map(item => `
              <div class="req-item" style="${state.currentDay >= 2 ? "" : "opacity:0.75;"}">
                <span>•</span>
                <span>${item.text}</span>
                <span class="req-item-pts">${item.pts} pts</span>
              </div>
            `).join("")}
          </div>
          <div class="req-section">
            <h3>🗄️ Database Requirements</h3>
            ${theme.db.map(item => `
              <div class="req-item"><span>•</span><span>${item}</span></div>
            `).join("")}
          </div>
          <div class="req-section">
            <h3>✅ Core Must-Haves</h3>
            ${theme.must.map(item => `
              <div class="req-item"><span>☑</span><span>${item}</span></div>
            `).join("")}
          </div>
          <div class="req-section">
            <h3>⭐ Bonus Features (+${theme.bonusPoints} pts)</h3>
            ${theme.bonus.map(item => `
              <div class="req-item bonus-item">
                <span>★</span>
                <span>${item.text}</span>
                <span class="req-item-pts">+${item.pts} pts</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  }

  function setDesignReviewed(sectionKey, checked) {
    if (!state.user) return;
    const wizard = state.designWizard || getUserDesignWizard(state.user.id);
    wizard.completed[sectionKey] = !!checked;
    saveUserDesignWizard(state.user.id, wizard);
    state.designWizard = wizard;
    render();
  }

  function goDesignStep(nextStep) {
    if (!state.user) return;
    const wizard = state.designWizard || getUserDesignWizard(state.user.id);
    if (wizard.locked) return;

    const step = Math.max(0, Math.min(4, nextStep));

    // If moving forward, require the current step to be reviewed.
    if (step > wizard.step) {
      if (wizard.step === 0 && !wizard.completed.requirements) return;
      if (wizard.step === 1 && !wizard.completed.usecase) return;
      if (wizard.step === 2 && !wizard.completed.class) return;
      if (wizard.step === 3 && !wizard.completed.sequence) return;
    }

    wizard.step = step;
    saveUserDesignWizard(state.user.id, wizard);
    state.designWizard = wizard;
    render();
  }

  function lockDesignFocus(focusId) {
    if (!state.user) return;
    const wizard = state.designWizard || getUserDesignWizard(state.user.id);
    if (wizard.locked) return;

    const allReviewed =
      wizard.completed.requirements &&
      wizard.completed.usecase &&
      wizard.completed.class &&
      wizard.completed.sequence;

    if (!allReviewed) {
      toast("Review all 4 sections before locking focus.", "warning");
      return;
    }

    wizard.locked = true;
    wizard.focus = focusId;
    wizard.step = 4;
    saveUserDesignWizard(state.user.id, wizard);
    state.designWizard = wizard;
    toast("Design focus locked. You can't go back.", "success");
    render();
  }
  
function renderUseCaseDiagram(theme) {
    const data = {
      community_health: {
        actors: [
          { name: "Patient", x: 28, ys: [70, 110, 150, 190] },
          { name: "Provider", x: 372, ys: [70, 110, 190] },
          { name: "Admin", x: 372, ys: [150, 230] },
        ],
        usecases: [
          { label: "Register / Login", y: 70 },
          { label: "Search Doctors", y: 110 },
          { label: "Book Appointment", y: 150 },
          { label: "View Dashboard", y: 190 },
          { label: "Manage Schedules", y: 230 },
        ],
        title: "Community Health Platform",
      },
      ai_task: {
        actors: [
          { name: "Student", x: 28, ys: [70, 110, 150] },
          { name: "Manager", x: 28, ys: [190, 230] },
          { name: "AI System", x: 372, ys: [110, 150, 190] },
        ],
        usecases: [
          { label: "Login / Register", y: 70 },
          { label: "Manage Tasks", y: 110 },
          { label: "AI Chat", y: 150 },
          { label: "View Calendar", y: 190 },
          { label: "Get Schedule", y: 230 },
        ],
        title: "AI Task Automation",
      },
      financial_dashboard: {
        actors: [
          { name: "Investor", x: 28, ys: [70, 110, 150] },
          { name: "Analyst", x: 28, ys: [190, 230] },
          { name: "Market API", x: 372, ys: [110, 150, 190] },
        ],
        usecases: [
          { label: "Login / Register", y: 70 },
          { label: "Search Stocks", y: 110 },
          { label: "View Charts", y: 150 },
          { label: "Manage Portfolio", y: 190 },
          { label: "Watchlist", y: 230 },
        ],
        title: "Financial Dashboard",
      },
      sustainability: {
        actors: [
          { name: "Individual", x: 28, ys: [70, 110, 150] },
          { name: "NGO", x: 28, ys: [190, 230] },
          { name: "Ext. API", x: 372, ys: [150, 190] },
        ],
        usecases: [
          { label: "Register / Login", y: 70 },
          { label: "Log Eco Action", y: 110 },
          { label: "Calculate Footprint", y: 150 },
          { label: "Join Challenge", y: 190 },
          { label: "View Leaderboard", y: 230 },
        ],
        title: theme?.name || "Sustainability",
      },
    };
    const d = data[theme?.id] || data.sustainability;
    const ucX = 200, ucW = 110, ucH = 22;
    return `
      <svg viewBox="0 0 400 290" class="svg-diagram" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="uca" markerWidth="7" markerHeight="7" refX="7" refY="3.5" orient="auto"><polygon points="0 0, 7 3.5, 0 7" fill="#38bdf8" opacity="0.7"/></marker>
          <linearGradient id="ucHeader" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#e879f9" stop-opacity="0.22"/><stop offset="100%" stop-color="#38bdf8" stop-opacity="0.22"/></linearGradient>
          <filter id="ucGlow"><feGaussianBlur stdDeviation="2.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <!-- Background -->
        <rect width="400" height="290" rx="10" fill="#0f0f1a" stroke="#1e1e2e" stroke-width="1.5"/>
        <!-- Title bar -->
        <rect x="0" y="0" width="400" height="28" rx="10" fill="url(#ucHeader)"/>
        <rect x="0" y="18" width="400" height="10" fill="url(#ucHeader)"/>
        <text x="200" y="18" text-anchor="middle" font-size="9.5" fill="#c0c0e0" font-family="Space Mono" font-weight="bold">${d.title} — Use Case Diagram</text>
        <!-- System boundary -->
        <rect x="110" y="44" width="180" height="238" rx="8" fill="none" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="5,3" opacity="0.6"/>
        <text x="200" y="57" text-anchor="middle" font-size="8" fill="#38bdf8" font-family="Space Mono" opacity="0.8">&lt;&lt;System&gt;&gt;</text>
        <!-- Use cases -->
        ${d.usecases.map((uc, i) => `
          <ellipse cx="${ucX}" cy="${uc.y}" rx="${ucW/2}" ry="${ucH/2}" fill="#161625" stroke="#e879f9" stroke-width="1.2" filter="url(#ucGlow)" opacity="0.95"/>
          <text x="${ucX}" y="${uc.y + 3.5}" text-anchor="middle" font-size="7.5" fill="#f0e0ff" font-family="Space Mono">${uc.label}</text>
        `).join('')}
        <!-- Actors and connections -->
        ${d.actors.map((actor) => {
          const isLeft = actor.x < 200;
          const ax = actor.x;
          // Stick figure
          const headY = actor.ys[0] - 18;
          const bodyY = headY + 12;
          const legsY = bodyY + 18;
          const connectX = isLeft ? ucX - ucW/2 : ucX + ucW/2;
          const lineStart = isLeft ? ax + 12 : ax - 12;
          return `
            <!-- Actor: ${actor.name} -->
            <circle cx="${ax}" cy="${headY}" r="7" fill="none" stroke="#2dd4bf" stroke-width="1.5"/>
            <line x1="${ax}" y1="${headY+7}" x2="${ax}" y2="${bodyY+10}" stroke="#2dd4bf" stroke-width="1.5"/>
            <line x1="${ax-8}" y1="${bodyY}" x2="${ax+8}" y2="${bodyY}" stroke="#2dd4bf" stroke-width="1.5"/>
            <line x1="${ax}" y1="${bodyY+10}" x2="${ax-7}" y2="${legsY}" stroke="#2dd4bf" stroke-width="1.5"/>
            <line x1="${ax}" y1="${bodyY+10}" x2="${ax+7}" y2="${legsY}" stroke="#2dd4bf" stroke-width="1.5"/>
            <text x="${ax}" y="${legsY+11}" text-anchor="middle" font-size="7" fill="#2dd4bf" font-family="Space Mono">${actor.name}</text>
            ${actor.ys.map(y => `<line x1="${lineStart}" y1="${y}" x2="${connectX}" y2="${y}" stroke="#2dd4bf" stroke-width="0.9" stroke-dasharray="3,2" opacity="0.55" marker-end="url(#uca)"/>`).join('')}
          `;
        }).join('')}
      </svg>
    `;
  }

  function renderClassDiagram(theme) {
    const schemas = {
      community_health: [
        { name: "User", color: "#38bdf8", fields: ["+id: UUID", "+name: String", "+email: String", "+role: Enum"], methods: ["+login()", "+register()"] },
        { name: "DoctorProfile", color: "#e879f9", fields: ["+user_id: FK", "+specialization", "+location: String", "+working_hours: JSON"], methods: ["+getSlots()"] },
        { name: "Appointment", color: "#2dd4bf", fields: ["+id: UUID", "+patient_id: FK", "+doctor_id: FK", "+datetime: Date", "+status: Enum"], methods: ["+confirm()", "+cancel()"] },
        { name: "HealthResource", color: "#facc15", fields: ["+id: UUID", "+title: String", "+category: String", "+published_at: Date"], methods: [] },
      ],
      ai_task: [
        { name: "User", color: "#38bdf8", fields: ["+id: UUID", "+name: String", "+timezone: String", "+role: Enum"], methods: ["+login()"] },
        { name: "Task", color: "#e879f9", fields: ["+id: UUID", "+user_id: FK", "+title: String", "+priority: Enum", "+status: Enum", "+due_date: Date"], methods: ["+complete()", "+reschedule()"] },
        { name: "ChatHistory", color: "#2dd4bf", fields: ["+id: UUID", "+user_id: FK", "+role: String", "+message: Text", "+timestamp: Date"], methods: [] },
        { name: "Event", color: "#facc15", fields: ["+id: UUID", "+task_id: FK", "+start: DateTime", "+end: DateTime"], methods: [] },
      ],
      financial_dashboard: [
        { name: "User", color: "#38bdf8", fields: ["+id: UUID", "+email: String", "+currency: String"], methods: ["+login()"] },
        { name: "Portfolio", color: "#e879f9", fields: ["+id: UUID", "+user_id: FK", "+symbol: String", "+quantity: Float", "+buy_price: Decimal"], methods: ["+gainLoss()", "+currentValue()"] },
        { name: "Watchlist", color: "#2dd4bf", fields: ["+id: UUID", "+user_id: FK", "+symbol: String", "+added_at: Date"], methods: ["+getLivePrice()"] },
        { name: "PriceCache", color: "#facc15", fields: ["+symbol: String", "+data: JSON", "+cached_at: Date"], methods: ["+isStale()"] },
      ],
      sustainability: [
        { name: "User", color: "#38bdf8", fields: ["+id: UUID", "+city: String", "+diet_type: String", "+eco_points: Int"], methods: ["+login()", "+updateStreak()"] },
        { name: "FootprintLog", color: "#e879f9", fields: ["+id: UUID", "+user_id: FK", "+total_co2: Float", "+logged_date: Date"], methods: ["+calculate()"] },
        { name: "Challenge", color: "#2dd4bf", fields: ["+id: UUID", "+title: String", "+end_date: Date", "+participant_count: Int"], methods: ["+join()", "+leave()"] },
        { name: "EcoAction", color: "#4ade80", fields: ["+id: UUID", "+user_id: FK", "+category: String", "+co2_saved: Float", "+points: Int"], methods: ["+log()"] },
      ],
    };
    const tables = schemas[theme?.id] || schemas.community_health;
    const positions = [
      { x: 10, y: 38 }, { x: 205, y: 38 },
      { x: 10, y: 185 }, { x: 205, y: 185 },
    ];
    const rowH = 13, headerH = 20, padY = 8, classW = 180;
    const arrows = [
      { from: 0, to: 1, label: "1..*" },
      { from: 0, to: 2, label: "1..*" },
      { from: 1, to: 3, label: "0..*" },
    ];
    return `
      <svg viewBox="0 0 395 310" class="svg-diagram" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="cdarrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><polygon points="0 0, 8 4, 0 8" fill="#7070a0"/></marker>
          <marker id="cddiamond" markerWidth="9" markerHeight="9" refX="1" refY="4.5" orient="auto"><polygon points="1 4.5, 5 1, 9 4.5, 5 8" fill="#7070a0" opacity="0.6"/></marker>
          <linearGradient id="cdBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0f0f1a"/><stop offset="100%" stop-color="#0a0a14"/></linearGradient>
        </defs>
        <rect width="395" height="310" rx="10" fill="url(#cdBg)" stroke="#1e1e2e" stroke-width="1.5"/>
        <text x="197" y="16" text-anchor="middle" font-size="9.5" fill="#c0c0e0" font-family="Space Mono" font-weight="bold">Class Diagram — ${theme?.name || ''}</text>
        <!-- Relationship lines -->
        <line x1="190" y1="80" x2="205" y2="80" stroke="#7070a0" stroke-width="1" marker-end="url(#cdarrow)"/>
        <line x1="100" y1="${38 + headerH + padY*2 + rowH * (tables[0]?.fields?.length||4)}" x2="100" y2="185" stroke="#7070a0" stroke-width="1" stroke-dasharray="4,2" marker-end="url(#cdarrow)"/>
        <line x1="295" y1="${38 + headerH + padY*2 + rowH * (tables[1]?.fields?.length||5)}" x2="295" y2="185" stroke="#7070a0" stroke-width="1" stroke-dasharray="4,2" marker-end="url(#cdarrow)"/>
        ${tables.map((t, i) => {
          const pos = positions[i];
          const totalRows = t.fields.length + (t.methods.length ? t.methods.length + 1 : 0);
          const boxH = headerH + padY*2 + totalRows * rowH + 4;
          return `
            <!-- Class: ${t.name} -->
            <rect x="${pos.x}" y="${pos.y}" width="${classW}" height="${boxH}" rx="6" fill="#161625" stroke="${t.color}" stroke-width="1.5"/>
            <rect x="${pos.x}" y="${pos.y}" width="${classW}" height="${headerH}" rx="6" fill="${t.color}" fill-opacity="0.18"/>
            <rect x="${pos.x}" y="${pos.y+14}" width="${classW}" height="6" fill="${t.color}" fill-opacity="0.18"/>
            <text x="${pos.x + classW/2}" y="${pos.y + 13}" text-anchor="middle" font-size="9" fill="${t.color}" font-family="Space Mono" font-weight="bold">«class» ${t.name}</text>
            <line x1="${pos.x}" y1="${pos.y + headerH}" x2="${pos.x + classW}" y2="${pos.y + headerH}" stroke="${t.color}" stroke-width="0.7" opacity="0.4"/>
            ${t.fields.map((f, j) => `<text x="${pos.x + 7}" y="${pos.y + headerH + padY + j * rowH + 9}" font-size="7" fill="#a0a0c0" font-family="Space Mono">${f}</text>`).join('')}
            ${t.methods.length ? `<line x1="${pos.x}" y1="${pos.y + headerH + padY + t.fields.length * rowH + 4}" x2="${pos.x + classW}" y2="${pos.y + headerH + padY + t.fields.length * rowH + 4}" stroke="${t.color}" stroke-width="0.7" opacity="0.3"/>` : ''}
            ${t.methods.map((m, j) => `<text x="${pos.x + 7}" y="${pos.y + headerH + padY + (t.fields.length + 1 + j) * rowH + 9}" font-size="7" fill="${t.color}" font-family="Space Mono" opacity="0.85">${m}</text>`).join('')}
          `;
        }).join('')}
      </svg>
    `;
  }

  function renderSequenceDiagram(theme) {
    const seqs = {
      community_health: {
        title: "Book Appointment — Sequence",
        actors: ["Browser", "Frontend", "API Server", "Database"],
        messages: [
          { from: 0, to: 1, label: "Submit login form", y: 58 },
          { from: 1, to: 2, label: "POST /api/auth/login", y: 78 },
          { from: 2, to: 3, label: "SELECT user WHERE email=?", y: 98 },
          { from: 3, to: 2, label: "User record", y: 118, dashed: true },
          { from: 2, to: 1, label: "{ token: JWT }", y: 138, dashed: true },
          { from: 1, to: 2, label: "GET /api/doctors?spec=cardio", y: 162 },
          { from: 2, to: 3, label: "SELECT doctors + slots", y: 182 },
          { from: 3, to: 2, label: "Doctor list + availability", y: 202, dashed: true },
          { from: 2, to: 1, label: "200 OK — doctors[]", y: 222, dashed: true },
          { from: 1, to: 2, label: "POST /api/appointments", y: 246 },
          { from: 2, to: 3, label: "INSERT appointment", y: 266 },
          { from: 3, to: 2, label: "Appointment ID", y: 280, dashed: true },
          { from: 2, to: 1, label: "201 Created", y: 295, dashed: true },
        ],
      },
      ai_task: {
        title: "AI Task Creation — Sequence",
        actors: ["User", "Chat UI", "API Server", "AI API"],
        messages: [
          { from: 0, to: 1, label: "Type: 'Add task: Report by Fri'", y: 58 },
          { from: 1, to: 2, label: "POST /api/ai/chat", y: 78 },
          { from: 2, to: 3, label: "Send message + context", y: 98 },
          { from: 3, to: 2, label: "Parsed task intent + JSON", y: 118, dashed: true },
          { from: 2, to: 2, label: "INSERT task into DB", y: 138, selfMsg: true },
          { from: 2, to: 1, label: "{ reply, newTask: {...} }", y: 158, dashed: true },
          { from: 1, to: 0, label: "Display AI reply + new task card", y: 178, dashed: true },
          { from: 0, to: 1, label: "POST /api/ai/schedule", y: 202 },
          { from: 1, to: 2, label: "Send all tasks for scheduling", y: 222 },
          { from: 2, to: 3, label: "Optimize schedule prompt", y: 242 },
          { from: 3, to: 2, label: "Ordered schedule[]", y: 262, dashed: true },
          { from: 2, to: 1, label: "200 OK — schedule[]", y: 282, dashed: true },
          { from: 1, to: 0, label: "Render calendar view", y: 296, dashed: true },
        ],
      },
      financial_dashboard: {
        title: "Stock Quote + Portfolio — Sequence",
        actors: ["User", "Dashboard", "API Server", "Market API"],
        messages: [
          { from: 0, to: 1, label: "Search 'AAPL'", y: 58 },
          { from: 1, to: 2, label: "GET /api/market/quote/AAPL", y: 78 },
          { from: 2, to: 3, label: "Fetch quote (Finnhub/Alpha)", y: 98 },
          { from: 3, to: 2, label: "{ price, change, vol }", y: 118, dashed: true },
          { from: 2, to: 2, label: "Cache result (TTL 60s)", y: 138, selfMsg: true },
          { from: 2, to: 1, label: "200 OK — quote data", y: 158, dashed: true },
          { from: 1, to: 0, label: "Render stock card + chart", y: 178, dashed: true },
          { from: 0, to: 1, label: "Click 'Add to Portfolio'", y: 202 },
          { from: 1, to: 2, label: "POST /api/portfolio", y: 222 },
          { from: 2, to: 2, label: "INSERT holding record", y: 242, selfMsg: true },
          { from: 2, to: 1, label: "201 Created", y: 262, dashed: true },
          { from: 1, to: 2, label: "GET /api/market/history/AAPL?range=1M", y: 282 },
          { from: 2, to: 3, label: "Fetch OHLCV data", y: 296 },
        ],
      },
      sustainability: {
        title: "Carbon Footprint Calc — Sequence",
        actors: ["User", "Calculator", "API Server", "AQ API"],
        messages: [
          { from: 0, to: 1, label: "Fill: transport, diet, energy", y: 58 },
          { from: 1, to: 2, label: "POST /api/footprint/calculate", y: 78 },
          { from: 2, to: 2, label: "Apply emission factors", y: 98, selfMsg: true },
          { from: 2, to: 1, label: "{ total_co2, breakdown }", y: 118, dashed: true },
          { from: 1, to: 0, label: "Render CO2 visualization", y: 138, dashed: true },
          { from: 0, to: 1, label: "Log eco action", y: 162 },
          { from: 1, to: 2, label: "POST /api/actions", y: 182 },
          { from: 2, to: 2, label: "UPDATE user eco_points", y: 202, selfMsg: true },
          { from: 2, to: 1, label: "201 Created + new score", y: 222, dashed: true },
          { from: 1, to: 2, label: "GET /api/env/airquality?city=LHR", y: 246 },
          { from: 2, to: 3, label: "Proxy → OpenAQ API", y: 266 },
          { from: 3, to: 2, label: "AQI + pollution data", y: 281, dashed: true },
          { from: 2, to: 1, label: "200 OK — env data", y: 296, dashed: true },
        ],
      },
    };
    const s = seqs[theme?.id] || seqs.community_health;
    const cols = s.actors.length;
    const W = 400, H = 315;
    const colW = W / cols;
    const actorXs = s.actors.map((_, i) => Math.round(colW * i + colW / 2));
    const actorBoxH = 20, lifelineStart = 38 + actorBoxH;
    return `
      <svg viewBox="0 0 ${W} ${H}" class="svg-diagram" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="sqa" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0 0, 7 3.5, 0 7" fill="#38bdf8"/></marker>
          <marker id="sqar" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0 0, 7 3.5, 0 7" fill="#2dd4bf"/></marker>
          <linearGradient id="sqBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0f0f1a"/><stop offset="100%" stop-color="#0a0a14"/></linearGradient>
        </defs>
        <rect width="${W}" height="${H}" rx="10" fill="url(#sqBg)" stroke="#1e1e2e" stroke-width="1.5"/>
        <text x="${W/2}" y="16" text-anchor="middle" font-size="9" fill="#c0c0e0" font-family="Space Mono" font-weight="bold">${s.title}</text>
        <!-- Actor boxes + lifelines -->
        ${s.actors.map((a, i) => `
          <rect x="${actorXs[i]-30}" y="24" width="60" height="${actorBoxH}" rx="5" fill="#161625" stroke="#e879f9" stroke-width="1.2"/>
          <text x="${actorXs[i]}" y="${24 + actorBoxH/2 + 4}" text-anchor="middle" font-size="7.5" fill="#e8b4f8" font-family="Space Mono">${a}</text>
          <line x1="${actorXs[i]}" y1="${lifelineStart}" x2="${actorXs[i]}" y2="${H - 10}" stroke="#2a2a3a" stroke-width="1.2" stroke-dasharray="5,3"/>
        `).join('')}
        <!-- Messages -->
        ${s.messages.map(m => {
          const x1 = actorXs[m.from];
          const x2 = actorXs[m.to];
          const color = m.dashed ? "#2dd4bf" : "#38bdf8";
          const markerEnd = m.dashed ? "url(#sqar)" : "url(#sqa)";
          if (m.selfMsg) {
            return `
              <path d="M${x1},${m.y} Q${x1+22},${m.y} ${x1+22},${m.y+10} Q${x1+22},${m.y+20} ${x1},${m.y+20}" fill="none" stroke="${color}" stroke-width="1.1" stroke-dasharray="${m.dashed?'4,2':''}"/>
              <polygon points="${x1},${m.y+17} ${x1+4},${m.y+20} ${x1-4},${m.y+20}" fill="${color}"/>
              <text x="${x1+26}" y="${m.y+12}" font-size="6.2" fill="#7070a0" font-family="Space Mono">${m.label}</text>
            `;
          }
          const dir = x2 > x1 ? 1 : -1;
          const arrowX = x2 - dir * 2;
          return `
            <line x1="${x1}" y1="${m.y}" x2="${arrowX}" y2="${m.y}" stroke="${color}" stroke-width="1.1" ${m.dashed?'stroke-dasharray="4,2"':''} marker-end="${markerEnd}"/>
            <text x="${(x1+x2)/2}" y="${m.y - 3}" text-anchor="middle" font-size="6.2" fill="#7070a0" font-family="Space Mono">${m.label.length > 28 ? m.label.slice(0,27)+'…' : m.label}</text>
          `;
        }).join('')}
      </svg>
    `;
  }


  // ===== ADMIN PAGE =====
  function renderAdminPage() {
    // Fetch live data if not loaded yet
    if (!state.adminTeams) {
      state.adminTeams = [];
      (async () => {
        try {
          const resp = await apiFetch("/api/leaderboard");
          state.adminTeams = (resp.teams || resp.items || []);
          render();
        } catch (e) { toast("Failed to load participant data.", "warning"); }
      })();
    }
  
    const teams = state.adminTeams || [];
    const totalMembers = teams.reduce((s, t) => s + (t.members_count || 0), 0);
  
    return `
      <div class="section-title">⚙️ Admin Panel</div>
      <div class="section-subtitle">Manage day settings and monitor teams. Click "⚙️ Day 2 — Backend" to release Day 2 requirements.</div>
      <div class="admin-grid">
        <div class="stat-card">
          <div class="stat-label">Total Participants</div>
          <div class="stat-value">${totalMembers}</div>
          <div class="stat-sub">Across all teams</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Total Teams</div>
          <div class="stat-value">${teams.length}</div>
          <div class="stat-sub">Competing groups</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Current Day</div>
          <div class="stat-value">Day ${state.currentDay}</div>
          <div class="stat-sub">${state.currentDay === 1 ? 'Frontend Sprint' : 'Backend + Integration'}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Active Themes</div>
          <div class="stat-value">${THEMES.length}</div>
          <div class="stat-sub">Available challenges</div>
        </div>
      </div>
      <!-- Day unlock control — prominent -->
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;margin-bottom:1.5rem;">
        <div style="font-weight:800;font-size:1rem;margin-bottom:0.35rem;">🔓 Day Unlock Control</div>
        <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:1rem;">Currently active: <strong style="color:var(--accent-teal);">Day ${state.currentDay} — ${state.currentDay === 1 ? 'Frontend Sprint' : 'Backend + Integration'}</strong></div>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
          <button onclick="setDay(1)" style="padding:0.65rem 1.4rem;border-radius:10px;font-weight:700;font-size:0.92rem;border:2px solid ${state.currentDay===1?'var(--accent-teal)':'var(--border)'};background:${state.currentDay===1?'rgba(45,212,191,0.12)':'var(--surface2)'};color:${state.currentDay===1?'var(--accent-teal)':'var(--text-muted)'};cursor:pointer;transition:all 0.15s;">
            📄 Day 1 — Frontend Sprint ${state.currentDay===1?'✓ Active':''}
          </button>
          <button onclick="setDay(2)" style="padding:0.65rem 1.4rem;border-radius:10px;font-weight:700;font-size:0.92rem;border:2px solid ${state.currentDay===2?'var(--accent-pink)':'rgba(232,121,249,0.3)'};background:${state.currentDay===2?'rgba(232,121,249,0.12)':'rgba(232,121,249,0.05)'};color:${state.currentDay===2?'var(--accent-pink)':'var(--accent-pink)'};cursor:pointer;transition:all 0.15s;">
            ⚙️ Unlock Day 2 — Backend ${state.currentDay===2?'✓ Active':'🔒'}
          </button>
        </div>
        ${state.currentDay === 2 ? `<div style="margin-top:0.75rem;font-size:0.82rem;color:var(--success);">✅ Day 2 is live — all participants can now see backend requirements.</div>` : `<div style="margin-top:0.75rem;font-size:0.82rem;color:var(--text-muted);">Day 2 requirements are hidden from participants until you click Unlock.</div>`}
      </div>

      <div class="section-title" style="font-size:1rem;margin-bottom:0.75rem;">Teams & Progress</div>
      <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
        <div class="leaderboard-table" style="min-width:500px;">
          <div class="lb-header">
            <div>#</div><div>Team</div><div>Members</div><div>Points</div><div>Progress</div>
          </div>
          ${teams.length === 0 ? `<div style="padding:1.5rem;text-align:center;color:var(--text-muted);">Loading teams...</div>` :
            teams.map((t, i) => {
              const theme = THEMES.find(th => th.id === t.theme_id);
              const memberNames = (t.member_names || []);
              const shown = memberNames.slice(0, 3);
              const rest = memberNames.length - shown.length;
              const memberText = rest > 0 ? `${shown.join(", ")} +${rest} more` : (shown.join(", ") || "—");
              return `
                <div class="lb-row">
                  <div style="font-family:var(--font-mono);font-weight:700;">${i+1}</div>
                  <div>
                    <div class="lb-name">${t.team_key}</div>
                    <div class="lb-theme">${theme ? theme.icon + ' ' + theme.name : 'No theme'}</div>
                  </div>
                  <div style="font-size:0.82rem;color:var(--text-muted);line-height:1.5;">${memberText}</div>
                  <div class="lb-pts">${(() => {
                    // Reconstruct actual points from progress map (same logic as leaderboard page)
                    const th = THEMES.find(th => th.id === t.theme_id);
                    if (!th) return (t.team_points || 0);
                    if (typeof t.team_progress_points === "number") return t.team_progress_points;
                    if (t.progress && typeof t.progress === "object") {
                      let pts = 0;
                      Object.entries(t.progress).forEach(([key, done]) => {
                        if (!done) return;
                        const parts = key.split("_");
                        const idx = parseInt(parts[parts.length - 1]);
                        const dayPart = parts[parts.length - 2];
                        if (isNaN(idx)) return;
                        const dayItems = dayPart === "day1" ? th.day1 : th.day2;
                        if (dayItems && dayItems[idx]) pts += dayItems[idx].pts;
                      });
                      return pts;
                    }
                    return (t.team_points || 0);
                  })()} pts</div>
                  <div class="lb-progress">
                    <div class="lb-bar-wrap"><div class="lb-bar-fill" style="width:${t.completion_pct || 0}%"></div></div>
                    <div class="lb-pct">${t.completion_pct || 0}%</div>
                  </div>
                </div>
              `;
            }).join('')
          }
        </div>
      </div>
      <div class="section-title" style="font-size:1rem;margin:1.25rem 0 0.75rem;">Testing Data</div>
      <div style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;">
        <button class="btn-ghost" onclick="clearTestingData()">🧹 Clear My Progress Data</button>
        <div style="font-size:0.8rem;color:var(--text-muted);line-height:1.5;">
          Clears your progress in Supabase and resets local state for testing.
        </div>
      </div>
    `;
  }
  
  function setDay(day) {
    state.currentDay = day;
    localStorage.setItem("wn_current_day", String(day));
    // Persist to server so ALL participants see the unlock immediately
    (async () => {
      try {
        await apiFetch("/api/state/day", {
          method: "PUT",
          body: JSON.stringify({ currentDay: day }),
        });
      } catch (e) {
        // Server may not support PUT /api/state/day yet — local change still works
        console.warn("setDay API call failed:", e.message);
      }
    })();
    toast(`Switched to Day ${day}. Day 2 requirements ${day >= 2 ? "unlocked ✅" : "locked 🔒"} for all participants.`, "success");
    render();
  }

  function clearTestingData() {
    if (!state.user) return;
    showModal(
      "🧹 Clear Testing Data?",
      "This removes saved themes/progress/design review + timer day settings for all users in this browser. It does NOT delete the logged-in user session.",
      () => {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (!k) continue;
          if (
            k.startsWith("wn_progress_") ||
            k.startsWith("wn_theme_") ||
            k.startsWith("wn_timer_") ||
            k.startsWith("wn_design_") ||
            k === "wn_current_day"
          ) {
            keysToRemove.push(k);
          }
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));
        localStorage.setItem("wn_current_day", 1);

        // Also wipe progress in Supabase for this user (non-blocking)
        apiFetch(`/api/progress/${state.user.id}`, {
          method: "PUT",
          body: JSON.stringify({ progress: {} }),
        }).catch(() => {});

        // Reset in-memory state for the current user.
        state.progress = {};
        state.designWizard = getUserDesignWizard(state.user.id);
        state.currentDay = 1;
        state.selectedTheme = null;
        state.themeConfirmed = false;
        state.currentPage = "admin";
        state.adminTeams = null;

        toast("Testing data cleared.", "success");
        render();
      }
    );
  }
  
  // ===== DIAGRAM EXPAND MODAL =====
  function openDiagramModal(type, themeId) {
    const theme = THEMES.find(t => t.id === themeId);
    if (!theme) return;
    const overlay = document.getElementById("modal-overlay");
    if (!overlay) return;
    const titleMap = { usecase: "Use Case Diagram", class: "Class Diagram", sequence: "Sequence Diagram" };
    const svgContent = type === "usecase" ? renderUseCaseDiagram(theme)
      : type === "class" ? renderClassDiagram(theme)
      : renderSequenceDiagram(theme);
    overlay.innerHTML = `
      <div class="modal" style="max-width:820px;max-height:92vh;display:flex;flex-direction:column;padding:1.25rem;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;flex-wrap:wrap;gap:0.5rem;">
          <div>
            <div style="font-weight:900;font-size:1.1rem;">${theme.icon} ${titleMap[type]}</div>
            <div style="font-size:0.82rem;color:var(--text-muted);">${theme.name}</div>
          </div>
          <button class="btn-ghost" onclick="closeModal()" style="font-size:0.82rem;">✕ Close</button>
        </div>
        <div style="flex:1;overflow:auto;display:flex;align-items:center;justify-content:center;background:var(--surface);border-radius:10px;border:1px solid var(--border);padding:1rem;min-height:360px;">
          <div style="width:100%;max-width:700px;">
            ${svgContent.replace(/class="svg-diagram"/g, 'style="width:100%;height:auto;display:block;"')}
          </div>
        </div>
        <div style="margin-top:0.85rem;display:flex;gap:0.5rem;flex-wrap:wrap;">
          ${["usecase","class","sequence"].map(t => `<button class="req-tab ${t===type?'active':''}" onclick="openDiagramModal('${t}','${themeId}')">${t==='usecase'?'Use Case':t==='class'?'Class':'Sequence'}</button>`).join('')}
        </div>
      </div>
    `;
    overlay.classList.add("open");
  }

  // ===== MODAL =====
  function showModal(title, msg, onConfirm) {
    const overlay = document.getElementById("modal-overlay");
    if (!overlay) return;
    overlay.innerHTML = `
      <div class="modal">
        <h3>${title}</h3>
        <p>${msg}</p>
        <div class="modal-actions">
          <button class="btn-ghost" onclick="closeModal()">Cancel</button>
          <button class="btn-confirm" onclick="modalConfirm()">Confirm</button>
        </div>
      </div>
    `;
    overlay.classList.add("open");
    window._modalConfirm = onConfirm;
  }
  
  function closeModal() {
    const overlay = document.getElementById("modal-overlay");
    if (overlay) overlay.classList.remove("open");
  }
  
  function modalConfirm() {
    closeModal();
    if (window._modalConfirm) window._modalConfirm();
  }
  
  // ===== SCROLL REVEAL OBSERVER =====
  function initScrollReveal() {
    const els = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-scale');
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    els.forEach(el => io.observe(el));
  }

  // ===== ATTACH EVENTS =====
  function attachNavEvents() {
    // Show hamburger on small screens
    const hamburger = document.getElementById("sidebar-toggle");
    if (hamburger) {
      const checkBreakpoint = () => {
        hamburger.style.display = window.innerWidth <= 768 ? "flex" : "none";
      };
      checkBreakpoint();
      window.addEventListener("resize", checkBreakpoint);
    }
  }
  function attachPageEvents() {}
  
  // ===== INIT =====
  function init() {
    const stored = getStoredUser();
    state.designWizard = stored ? getUserDesignWizard(stored.id) : null;

    const token = getStoredToken();
    if (token) {
      // Live session: hydrate from server
      (async () => {
        try {
          // seed minimal state so render won't crash
          if (stored) state.user = stored;
          await hydrateUserState();
          state.designWizard = getUserDesignWizard(state.user.id);
          state.currentPage = "overview";
          render();
        } catch {
          // token invalid or server not ready -> fall back to login
          logout();
        }
      })();
      return;
    }

    // No token: show login; keep local cache only for UI continuity
    if (stored) {
      state.user = stored;
      state.progress = getUserProgress(stored.id);
      state.currentPage = "overview";
    }
    render();

    // Keep "Day 2" unlock in sync across tabs/windows.
    window.addEventListener("storage", (e) => {
      if (e.key !== "wn_current_day") return;
      if (!state.user) return;
      state.currentDay = parseInt(e.newValue || "1");
      render();
    });
  }
  
  function toggleSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const backdrop = document.getElementById("sidebar-backdrop");
    if (sidebar) sidebar.classList.toggle("open");
    if (backdrop) backdrop.classList.toggle("visible");
  }

  function closeSidebarOnMobile() {
    if (window.innerWidth <= 768) {
      const sidebar = document.querySelector(".sidebar");
      const backdrop = document.getElementById("sidebar-backdrop");
      if (sidebar) sidebar.classList.remove("open");
      if (backdrop) backdrop.classList.remove("visible");
    }
  }

  window.navigate = navigate;
  window.logout = logout;
  window.selectTheme = selectTheme;
  window.confirmTheme = confirmTheme;
  window.reviewTheme = reviewTheme;
  window.closeModal = closeModal;
  window.modalConfirm = modalConfirm;
  window.setReqTab = setReqTab;
  window.setReqFocus = setReqFocus;
  window.handleReqStepToggle = handleReqStepToggle;
  window.toggleProgress = toggleProgress;
  window.toast = toast;
  window.setDay = setDay;
  window.setDesignReviewed = setDesignReviewed;
  window.goDesignStep = goDesignStep;
  window.lockDesignFocus = lockDesignFocus;
  window.clearTestingData = clearTestingData;
  window.setLbTeamFilter = setLbTeamFilter;
  window.setLbDay = setLbDay;
  window.openMustHaveModal = openMustHaveModal;
  window.openDiagramModal = openDiagramModal;
  window.toggleSidebar = toggleSidebar;
  window.closeSidebarOnMobile = closeSidebarOnMobile;
  window.initScrollReveal = initScrollReveal;
  
  init();