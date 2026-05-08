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
  function navigate(page) {
    state.currentPage = page;
    if (page === "leaderboard") {
      (async () => {
        try {
          const resp = await apiFetch("/api/leaderboard");
          const teams = (resp.teams || resp.items || []).map(t => ({
            teamKey: t.team_key,
            themeId: t.theme_id || null,
            membersCount: t.members_count || 0,
            memberNames: t.member_names || [],
            teamPoints: t.team_points || 0,
            pct: t.completion_pct || 0,
            isMyTeam: state.user?.team_name ? t.team_key === state.user.team_name : false,
          }));
          state.lbTeams = teams;
          render();
        } catch (e) {
          toast(e.message || "Failed to load leaderboard.", "warning");
        }
      })();
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
    errorEl.style.display = "none";
    if (!username || !password) { errorEl.textContent = "Please enter both username and password."; errorEl.style.display = "block"; return; }
    (async () => {
      try {
        const auth = await apiFetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({ username, password }),
        });
        setStoredToken(auth.token);
        localStorage.setItem("wn_user", JSON.stringify(auth.user));
        state.user = auth.user;

        await hydrateUserState();
        render();
        toast(`Welcome back, ${state.user.name}!`, "success");
      } catch (e) {
        errorEl.textContent = e.message || "Login failed.";
        errorEl.style.display = "block";
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

    state.currentDay = day.currentDay ?? 1;

    state.selectedTheme = theme.themeId || null;
    state.themeConfirmed = !!theme.themeConfirmed;
    state.timerStart = theme.timerStart ? new Date(theme.timerStart).getTime() : null;
    if (state.selectedTheme) saveUserTheme(state.user.id, state.selectedTheme);

    state.progress = progress.progress || {};
    saveUserProgress(state.user.id, state.progress);
  }
  
  // ===== NAVBAR =====
  function renderNavbar() {
    const theme = THEMES.find(t => t.id === state.selectedTheme);
    return `
      <nav class="navbar">
        <div class="nav-logo">
          <div style="width:36px;height:36px;border-radius:8px;background:linear-gradient(135deg,#e879f9,#38bdf8);display:flex;align-items:center;justify-content:center;font-size:1rem;font-family:var(--font-mono);color:white;font-weight:700;">{/}</div>
          <span class="logo-text">WebNexus</span>
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
      <div class="welcome-section">
        <h2>Welcome, ${state.user.name}! 👋</h2>
        <p>This is the WebNexus Hackathon Platform for <strong>B-TECH 2026 at BNU</strong>. Choose your theme, review requirements, and track your progress — all in one place.</p>
        <div class="day-info">
          <span class="day-badge">📅 Day ${state.currentDay} Active</span>
          ${state.themeConfirmed && theme ? `<span style="font-size:0.85rem;color:var(--text-muted);">Your theme: <strong style="color:var(--accent-pink);">${theme.name}</strong></span>` : `<span style="font-size:0.85rem;color:var(--warning);">⚠️ You haven't selected a theme yet</span>`}
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1rem;margin-bottom:2rem;">
        <div class="stat-card">
          <div class="stat-label">Current Day</div>
          <div class="stat-value" style="background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Day ${state.currentDay}</div>
          <div class="stat-sub">${state.currentDay === 1 ? 'Frontend Sprint' : 'Backend + Integration'}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Your Theme</div>
          <div class="stat-value" style="font-size:1.5rem;">${theme ? theme.icon : '—'}</div>
          <div class="stat-sub">${theme ? theme.name : 'Not selected'}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Total Themes</div>
          <div class="stat-value">4</div>
          <div class="stat-sub">Available to choose</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Max Bonus Pts</div>
          <div class="stat-value">${theme ? '+' + theme.bonusPoints : '+55'}</div>
          <div class="stat-sub">Extra leaderboard points</div>
        </div>
      </div>
      ${!state.themeConfirmed ? `
      <div style="background:rgba(250,204,21,0.05);border:1px solid rgba(250,204,21,0.2);border-radius:var(--radius);padding:1.25rem;margin-bottom:2rem;">
        <strong>⚠️ Action Required:</strong> You must select a theme before starting the competition. <button onclick="navigate('themes')" style="color:var(--accent-pink);font-weight:700;text-decoration:underline;background:none;border:none;cursor:pointer;">Choose your theme →</button>
      </div>` : ''}
      <div class="section-title">Competition Timeline</div>
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;">
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
      <div class="section-title">Choose Your Theme</div>
      <div class="section-subtitle">Review all themes in detail before locking in. Use Review Only to explore requirements first.</div>
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1rem 1.1rem;margin-bottom:1.25rem;">
        <div style="font-weight:800;margin-bottom:0.35rem;">Recommended Flow</div>
        <div style="font-size:0.92rem;color:var(--text-muted);line-height:1.6;">
          1) Select theme → 2) Open Review Only (requirements + design expectations) → 3) Lock theme & start timer.
        </div>
      </div>
      <div class="themes-grid">
        ${THEMES.map(theme => `
          <div class="theme-card ${state.selectedTheme === theme.id ? 'selected' : ''}" onclick="selectTheme('${theme.id}')">
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
        <div style="background:rgba(74,222,128,0.05);border:1px solid rgba(74,222,128,0.2);border-radius:var(--radius);padding:1.25rem;">
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
    return `
      <div class="section-title">${theme.icon} ${theme.name}</div>
      <div class="section-subtitle">Day ${state.currentDay} requirements are shown step-by-step. Mark each one complete to unlock the next.</div>
      <div style="background:rgba(56,189,248,0.06);border:1px solid rgba(56,189,248,0.25);border-radius:var(--radius);padding:0.9rem 1rem;margin-bottom:1rem;">
        <div style="font-size:0.95rem;line-height:1.6;">
          <strong>Design expectation:</strong> include <strong>Use Case Model</strong>, <strong>Class Diagram</strong>, and <strong>Sequence Diagram</strong> aligned with requirements and implementation.
        </div>
      </div>
      <div class="req-panel">
        <div class="req-tabs">
          ${tabs.map(tab => `<div class="req-tab ${activeTab === tab.id ? 'active' : ''} ${tab.locked ? 'locked' : ''}" onclick="${tab.locked ? 'toast(\'Day 2 requirements unlock on Day 2!\', \'warning\')' : `setReqTab('${tab.id}')`}">${tab.label}</div>`).join('')}
        </div>
        <div class="req-content">
          ${renderReqTab(theme, activeTab, handbook)}
        </div>
      </div>
    `;
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
    toggleProgress(key, checked);
    if (checked) setReqFocus(tab, nextIndex);
  }

  function renderReqTab(theme, tab, handbook = {}) {
    if (tab === "overview") {
      return `
        <div class="req-section">
          <h3>🎯 Objective</h3>
          <p style="color:var(--text-muted);font-size:0.9rem;line-height:1.7;">${theme.desc}</p>
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
            Before implementation, prepare design documents that map directly to your selected theme requirements.
          </p>
          <div class="req-item"><span>1️⃣</span><span><strong>Use Case Model:</strong> actors, use-cases, and system boundaries.</span></div>
          <div class="req-item"><span>2️⃣</span><span><strong>Class Diagram:</strong> entities/tables, relationships, and key attributes.</span></div>
          <div class="req-item"><span>3️⃣</span><span><strong>Sequence Diagram:</strong> request/response flow for login + core feature.</span></div>
        </div>
        <div class="diagram-grid">
          <div class="diagram-card">
            <div class="diagram-preview">${renderUseCaseDiagram(theme)}</div>
            <div class="diagram-info">
              <div class="diagram-title">Use Case Model</div>
              <div class="diagram-subtitle">Actors and functional scope</div>
            </div>
          </div>
          <div class="diagram-card">
            <div class="diagram-preview">${renderClassDiagram(theme)}</div>
            <div class="diagram-info">
              <div class="diagram-title">Class Diagram</div>
              <div class="diagram-subtitle">Data model alignment with DB/API</div>
            </div>
          </div>
          <div class="diagram-card">
            <div class="diagram-preview">${renderSequenceDiagram(theme)}</div>
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
      const defaultCursor = firstIncompleteIndex === -1 ? items.length - 1 : firstIncompleteIndex;
      const requestedCursor = state.reqFocusIndexByTab?.[tab] ?? defaultCursor;
      // Never let users jump to future (not-yet-unlocked) requirements.
      const cursorIndex = Math.max(0, Math.min(defaultCursor, Math.min(items.length - 1, requestedCursor)));
      const key = keys[cursorIndex];
      const done = !!progress[key];
      const canInteract = cursorIndex === defaultCursor && !done;
      const nextIndex = Math.min(items.length - 1, cursorIndex + 1);

      const stepsHtml = items.map((_, i) => {
        const doneStep = doneFlags[i];
        const isUnlocked = i <= defaultCursor;
        const isFocus = i === cursorIndex;
        const bg = isFocus ? "rgba(232,121,249,0.12)" : (doneStep ? "rgba(74,222,128,0.08)" : "var(--surface2)");
        const border = isFocus ? "rgba(232,121,249,0.45)" : (doneStep ? "rgba(74,222,128,0.25)" : "var(--border)");
        const color = doneStep ? "var(--success)" : "var(--text-muted)";
        return `
          <button type="button"
            ${isUnlocked ? `onclick="setReqFocus('${tab}', ${i})"` : "disabled"}
            style="
              background:${bg};
              border:1px solid ${border};
              color:${color};
              font-family:var(--font-mono);
              font-weight:800;
              padding:0.35rem 0.6rem;
              border-radius:999px;
              cursor:${isUnlocked ? "pointer" : "not-allowed"};
              font-size:0.85rem;
              opacity:${isUnlocked ? "1" : "0.55"};
            "
          >
            ${i + 1}${doneStep ? " ✓" : ""}
          </button>
        `;
      }).join("");

      return `
        <div class="req-section">
          <h3>${tab === "day1" ? "📄 Day 1 — Frontend Sprint" : "⚙️ Day 2 — Backend + Integration"}</h3>
          <div style="display:flex;gap:1rem;flex-wrap:wrap;">
            <div style="flex:1;min-width:260px;">
              <div style="background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:1.25rem;">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;margin-bottom:0.75rem;">
                  <div style="font-family:var(--font-mono);font-weight:800;color:var(--text-muted);font-size:0.95rem;">
                    Phase step ${cursorIndex + 1} / ${items.length}
                  </div>
                  <div style="font-family:var(--font-mono);font-weight:900;color:var(--accent-teal);background:rgba(56,189,248,0.08);border:1px solid rgba(56,189,248,0.18);padding:0.2rem 0.6rem;border-radius:999px;">
                    ${items[cursorIndex].pts} pts
                  </div>
                </div>

                <div style="font-size:1.05rem;line-height:1.6;">${items[cursorIndex].text}</div>

                <div style="margin-top:1rem;">
                  <label style="display:flex;align-items:center;gap:0.75rem;">
                    <input
                      type="checkbox"
                      ${done ? "checked" : ""}
                      ${(!canInteract || done) ? "disabled" : ""}
                      onchange="handleReqStepToggle('${key}', '${tab}', ${nextIndex}, this.checked)"
                      style="flex-shrink:0;accent-color:var(--accent-pink);width:18px;height:18px;cursor:pointer;"
                    />
                    <span style="color:var(--text-muted);font-weight:600;">
                      ${done ? "Completed (read-only)" : canInteract ? "Mark this requirement complete" : "Locked (read-only)"}
                    </span>
                  </label>

                  ${done ? `
                    <div style="margin-top:0.8rem;font-size:0.92rem;color:var(--success);font-weight:800;">
                      ✓ Done. You can revisit this in read-only mode.
                    </div>
                  ` : ""}
                </div>
              </div>
            </div>

            <div style="min-width:240px;">
              <div style="font-weight:800;color:var(--text-muted);margin-bottom:0.6rem;">Steps</div>
              <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">${stepsHtml}</div>
              <div style="margin-top:0.85rem;font-size:0.88rem;color:var(--text-muted);line-height:1.5;">
                Completed: <strong style="color:var(--accent-teal)">${completedCount}</strong> / ${items.length}
              </div>
            </div>
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
  
  function toggleProgress(key, checked) {
    const progress = getUserProgress(state.user.id);
    // Once a requirement is completed, it becomes read-only (can't be unchecked).
    if (progress[key] && !checked) {
      toast("Completed requirements are locked (read-only).", "warning");
      return;
    }
    progress[key] = checked;
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
    if (checked) toast("Task marked complete! 🎉", "success");
  }
  
  // ===== PROGRESS PAGE =====
  function renderProgressPage() {
    const theme = THEMES.find(t => t.id === state.selectedTheme);
    if (!theme) return '';
    const p1 = calcProgress(state.user.id, theme.id, 1);
    const p2 = calcProgress(state.user.id, theme.id, 2);
    const overall = Math.round((p1.pts + p2.pts) / (p1.total + (p2.total || 1)) * 100);
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
          return `
            <label class="task-check ${done ? 'done' : ''}" style="justify-content:space-between;width:100%;max-width:600px;">
              <div style="display:flex;align-items:center;gap:0.5rem;">
                <input
                  type="checkbox"
                  ${done ? 'checked' : ''}
                  ${done ? 'disabled' : ''}
                  onchange="toggleProgress('${key}', this.checked)"
                  style="accent-color:var(--accent-pink);"
                />
                <span>${item.text.split('—')[0]}</span>
              </div>
              <span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--accent-pink);">${item.pts}pts</span>
            </label>
          `;
        }).join('')}
      </div>
    `;
  }
  
  // ===== LEADERBOARD PAGE =====
  function renderLeaderboardPage() {
    const teamsSorted = (state.lbTeams || []).slice();
    const rankColors = ["gold", "silver", "bronze"];
    const medals = ["🥇", "🥈", "🥉"];

    const lbFilter = state.lbTeamFilter || "all";
    const visibleTeams = lbFilter === "all" ? teamsSorted : teamsSorted.filter(t => t.teamKey === lbFilter);

    const teamOptions = [
      { id: "all", label: "All Teams" },
      ...teamsSorted.map(t => {
        const theme = THEMES.find(tt => tt.id === t.themeId);
        const memberNames = (t.memberNames || []);
        const shown = memberNames.slice(0, 4);
        const rest = memberNames.length - shown.length;
        const memberText = rest > 0 ? `${shown.join(", ")} +${rest} more` : shown.join(", ");
        return { id: t.teamKey, label: `${t.teamKey}${theme ? ` — ${theme.icon} ${theme.name}` : ""} — ${memberText}` };
      }),
    ];

    const meUserId = state.user?.id;
    return `
      <div class="section-title">🏆 Leaderboard</div>
      <div class="section-subtitle">Team-wise rankings based on progress. Final results are determined by judges.</div>

      <div style="background:rgba(250,204,21,0.05);border:1px solid rgba(250,204,21,0.15);border-radius:var(--radius);padding:1rem 1.25rem;margin-bottom:1rem;font-size:1rem;">
        <div style="font-weight:900;color:var(--accent-white);margin-bottom:0.25rem;font-size:1.08rem;">
          <strong>Final evaluation will be done by judges.</strong>
        </div>
        <div style="color:var(--text-muted);font-weight:600;">
          This leaderboard reflects self-reported progress only; final scoring may differ.
        </div>
      </div>

      <div style="display:flex;gap:0.8rem;align-items:center;flex-wrap:wrap;margin-bottom:1.25rem;">
        <div style="font-weight:800;color:var(--text-muted);">Team:</div>
        <select
          value="${lbFilter}"
          onchange="setLbTeamFilter(this.value)"
          style="background:var(--surface2);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:0.6rem 0.8rem;font-weight:700;min-width:260px;"
        >
          ${teamOptions.map(o => `<option value="${o.id}">${o.label}</option>`).join("")}
        </select>
      </div>

      <div class="leaderboard-table">
        <div class="lb-header">
          <div>Rank</div>
          <div>Team</div>
          <div>Members</div>
          <div>Points</div>
          <div>Progress</div>
        </div>
        ${visibleTeams.map((team, i) => {
          const theme = THEMES.find(t => t.id === team.themeId);
          const isMeTeam = meUserId && (team.isMyTeam === true);
          const memberNames = (team.memberNames || []);
          const shown = memberNames.slice(0, 3);
          const rest = memberNames.length - shown.length;
          const memberText = rest > 0 ? `${shown.join(", ")} +${rest}` : shown.join(", ");
          return `
            <div class="lb-row ${isMeTeam ? 'current-user' : ''}">
              <div class="lb-rank ${rankColors[i] || ''}">
                ${i < 3 ? medals[i] : `#${i+1}`}
              </div>
              <div>
                <div class="lb-name">${team.teamKey}${isMeTeam ? '<span style="font-size:0.7rem;color:var(--accent-pink);margin-left:0.35rem;">(your team)</span>' : ''}</div>
                <div class="lb-theme" style="margin-top:0.25rem;">${theme ? `${theme.icon} ${theme.name}` : "Theme not selected"}</div>
              </div>
              <div class="lb-theme" style="font-size:0.9rem;color:var(--text-muted);">${memberText}</div>
              <div class="lb-pts">${team.teamPoints} pts</div>
              <div class="lb-progress">
                <div class="lb-bar-wrap"><div class="lb-bar-fill" style="width:${team.pct}%"></div></div>
                <div class="lb-pct">${team.pct}%</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function setLbTeamFilter(teamKey) {
    state.lbTeamFilter = teamKey;
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
    const actors = theme?.id === "community_health"
      ? ["Patient", "Provider", "Admin"]
      : theme?.id === "ai_task"
      ? ["Student", "Manager", "System"]
      : theme?.id === "financial_dashboard"
      ? ["Investor", "Analyst", "API"]
      : ["Individual", "NGO", "Community"];
    return `
      <svg viewBox="0 0 280 200" class="svg-diagram" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="278" height="198" rx="8" fill="none" stroke="#2a2a3a" stroke-width="1"/>
        <text x="140" y="18" text-anchor="middle" font-size="10" fill="#7070a0" font-family="Space Mono">Use Case Diagram</text>
        <!-- System box -->
        <rect x="70" y="25" width="140" height="150" rx="8" fill="none" stroke="#38bdf8" stroke-width="1" stroke-dasharray="4,3"/>
        <text x="140" y="38" text-anchor="middle" font-size="8" fill="#38bdf8" font-family="Space Mono">System</text>
        <!-- Use cases -->
        <ellipse cx="140" cy="65" rx="40" ry="12" fill="#1a1a24" stroke="#e879f9" stroke-width="1"/>
        <text x="140" y="68" text-anchor="middle" font-size="7" fill="#f0f0ff">Login/Register</text>
        <ellipse cx="140" cy="100" rx="40" ry="12" fill="#1a1a24" stroke="#e879f9" stroke-width="1"/>
        <text x="140" y="103" text-anchor="middle" font-size="7" fill="#f0f0ff">Core Feature</text>
        <ellipse cx="140" cy="135" rx="40" ry="12" fill="#1a1a24" stroke="#e879f9" stroke-width="1"/>
        <text x="140" y="138" text-anchor="middle" font-size="7" fill="#f0f0ff">View Dashboard</text>
        <ellipse cx="140" cy="165" rx="40" ry="12" fill="#1a1a24" stroke="#e879f9" stroke-width="1"/>
        <text x="140" y="168" text-anchor="middle" font-size="7" fill="#f0f0ff">Manage Data</text>
        <!-- Actors -->
        ${actors.map((a, i) => `
          <circle cx="${i === 0 ? 30 : i === 1 ? 250 : 250}" cy="${i === 0 ? 100 : i === 1 ? 80 : 140}" r="10" fill="none" stroke="#2dd4bf" stroke-width="1.5"/>
          <line x1="${i === 0 ? 30 : i === 1 ? 250 : 250}" y1="${i === 0 ? 110 : i === 1 ? 90 : 150}" x2="${i === 0 ? 30 : i === 1 ? 250 : 250}" y2="${i === 0 ? 135 : i === 1 ? 115 : 170}" stroke="#2dd4bf" stroke-width="1.5"/>
          <text x="${i === 0 ? 30 : i === 1 ? 250 : 250}" y="${i === 0 ? 152 : i === 1 ? 130 : 185}" text-anchor="middle" font-size="7" fill="#2dd4bf">${a}</text>
          <line x1="${i === 0 ? 40 : i === 1 ? 240 : 240}" y1="${i === 0 ? 100 : i === 1 ? 90 : 140}" x2="${i === 0 ? 100 : i === 1 ? 180 : 180}" y2="${i === 0 ? 100 : i === 1 ? 95 : 140}" stroke="#2a2a3a" stroke-width="1"/>
        `).join('')}
      </svg>
    `;
  }
  
  function renderClassDiagram(theme) {
    const tables = theme ? theme.db.slice(0, 3) : ["Users", "Data", "Logs"];
    return `
      <svg viewBox="0 0 280 200" class="svg-diagram" xmlns="http://www.w3.org/2000/svg">
        <text x="140" y="14" text-anchor="middle" font-size="10" fill="#7070a0" font-family="Space Mono">Class Diagram</text>
        ${tables.map((t, i) => {
          const name = t.split(':')[0];
          const fields = t.split(':')[1]?.split(',').slice(0,3).map(f => f.trim()) || [];
          const x = i === 0 ? 20 : i === 1 ? 100 : 180;
          const y = i === 1 ? 80 : 40;
          return `
            <rect x="${x}" y="${y}" width="80" height="${20 + fields.length * 12}" rx="4" fill="#1a1a24" stroke="#38bdf8" stroke-width="1"/>
            <rect x="${x}" y="${y}" width="80" height="16" rx="4" fill="#38bdf8" fill-opacity="0.15"/>
            <text x="${x+40}" y="${y+11}" text-anchor="middle" font-size="7" fill="#38bdf8" font-weight="bold" font-family="Space Mono">${name}</text>
            ${fields.map((f, j) => `<text x="${x+6}" y="${y+22+j*12}" font-size="6" fill="#7070a0" font-family="Space Mono">• ${f.slice(0,12)}</text>`).join('')}
          `;
        })}
        <!-- Relationship lines -->
        <line x1="100" y1="80" x2="80" y2="70" stroke="#2a2a3a" stroke-width="1" marker-end="url(#arrow)"/>
        <line x1="180" y1="80" x2="200" y2="70" stroke="#2a2a3a" stroke-width="1"/>
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#2a2a3a"/>
          </marker>
        </defs>
      </svg>
    `;
  }
  
  function renderSequenceDiagram(theme) {
    return `
      <svg viewBox="0 0 280 200" class="svg-diagram" xmlns="http://www.w3.org/2000/svg">
        <text x="140" y="14" text-anchor="middle" font-size="10" fill="#7070a0" font-family="Space Mono">Sequence Diagram</text>
        <!-- Actors -->
        ${["Client", "Server", "DB"].map((a, i) => {
          const x = 40 + i * 100;
          return `
            <rect x="${x-25}" y="20" width="50" height="16" rx="4" fill="#1a1a24" stroke="#e879f9" stroke-width="1"/>
            <text x="${x}" y="31" text-anchor="middle" font-size="8" fill="#e879f9" font-family="Space Mono">${a}</text>
            <line x1="${x}" y1="36" x2="${x}" y2="190" stroke="#2a2a3a" stroke-width="1" stroke-dasharray="4,3"/>
          `;
        })}
        <!-- Messages -->
        ${[
          {from:40,to:140,y:55,label:"POST /login"},
          {from:140,to:240,y:80,label:"Query user"},
          {from:240,to:140,y:105,label:"User record",dashed:true},
          {from:140,to:40,y:130,label:"JWT token",dashed:true},
          {from:40,to:140,y:155,label:"GET /data"},
          {from:140,to:40,y:175,label:"200 response",dashed:true},
        ].map(m => `
          <line x1="${m.from}" y1="${m.y}" x2="${m.to}" y2="${m.y}" stroke="${m.dashed?'#2dd4bf':'#38bdf8'}" stroke-width="1.2" ${m.dashed?'stroke-dasharray="4,2"':''}/>
          <polygon points="${m.to>m.from?m.to-4+','+m.y+' '+(m.to-8)+','+(m.y-3)+' '+(m.to-8)+','+(m.y+3):m.to+4+','+m.y+' '+(m.to+8)+','+(m.y-3)+' '+(m.to+8)+','+(m.y+3)}" fill="${m.dashed?'#2dd4bf':'#38bdf8'}"/>
          <text x="${(m.from+m.to)/2}" y="${m.y-3}" text-anchor="middle" font-size="6" fill="#7070a0" font-family="Space Mono">${m.label}</text>
        `).join('')}
      </svg>
    `;
  }
  
  // ===== ADMIN PAGE =====
  function renderAdminPage() {
    return `
      <div class="section-title">⚙️ Admin Panel</div>
      <div class="section-subtitle">Manage day settings and monitor participants. To release Day 2 requirements, click "⚙️ Day 2 — Backend" below.</div>
      <div class="admin-grid">
        <div class="stat-card">
          <div class="stat-label">Total Participants</div>
          <div class="stat-value">${USERS_DB.filter(u=>u.role!=='admin').length}</div>
          <div class="stat-sub">Registered users</div>
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
      <div class="section-title" style="font-size:1rem;margin-bottom:0.75rem;">Switch Day</div>
      <div class="admin-controls">
        <button class="btn-day ${state.currentDay===1?'active-day':''}" onclick="setDay(1)">📄 Day 1 — Frontend</button>
        <button class="btn-day ${state.currentDay===2?'active-day':''}" onclick="setDay(2)">⚙️ Day 2 — Backend</button>
      </div>
      <div class="section-title" style="font-size:1rem;margin-bottom:0.75rem;">Participants</div>
      <div class="leaderboard-table">
        <div class="lb-header" style="grid-template-columns:60px 1fr 150px 100px;">
          <div>#</div><div>Name</div><div>Theme</div><div>Status</div>
        </div>
        ${USERS_DB.filter(u=>u.role!=='admin').map((u, i) => {
          const themeId = getUserTheme(u.id);
          const theme = THEMES.find(t => t.id === themeId);
          return `
            <div class="lb-row" style="grid-template-columns:60px 1fr 150px 100px;">
              <div>${i+1}</div>
              <div class="lb-name">${u.name}</div>
              <div style="font-size:0.8rem;color:var(--text-muted);">${theme ? theme.icon + ' ' + theme.name.split(' ').slice(0,2).join(' ') : '—'}</div>
              <div><span style="font-size:0.75rem;padding:0.2rem 0.5rem;border-radius:999px;background:${theme?'rgba(74,222,128,0.1)':'rgba(112,112,160,0.1)'};color:${theme?'var(--success)':'var(--text-muted)'};">${theme?'Active':'No theme'}</span></div>
            </div>
          `;
        }).join('')}
      </div>
      <div class="section-title" style="font-size:1rem;margin:1.25rem 0 0.75rem;">Testing Data</div>
      <div style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;">
        <button class="btn-ghost" onclick="clearTestingData()">🧹 Clear Local Progress Data</button>
        <div style="font-size:0.8rem;color:var(--text-muted);line-height:1.5;">
          Removes saved themes/progress/design review for all users in this browser.
        </div>
      </div>
    `;
  }
  
  function setDay(day) {
    state.currentDay = day;
    localStorage.setItem("wn_current_day", day);
    toast(`Switched to Day ${day}. Requirements updated.`, "success");
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

        // Reset in-memory state for the current user.
        state.progress = {};
        state.designWizard = getUserDesignWizard(state.user.id);
        state.currentDay = 1;
        state.selectedTheme = null;
        state.themeConfirmed = false;
        state.currentPage = "themes";

        toast("Testing data cleared.", "success");
        render();
      }
    );
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
  
  // ===== ATTACH EVENTS =====
  function attachNavEvents() {}
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
  
  init();