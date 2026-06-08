/* ================================================
   PORTFOLIO DATA — Edit arrays below to update
   content without touching HTML structure
   ================================================ */

const TECH_STACK = [
  { name: 'HTML',       icon: '🌐', level: 'Proficient'  },
  { name: 'CSS',        icon: '🎨', level: 'Proficient'  },
  { name: 'JavaScript', icon: '⚡', level: 'Learning'    },
  { name: 'Python',     icon: '🐍', level: 'Learning'    },
];

const PROJECTS = [
  {
    title: 'Multi Info Hub',
    desc:  'A static web app that aggregates multiple information sources into a single clean interface.',
    tags:  ['HTML', 'CSS', 'JavaScript'],
    link:  'https://github.com/rofal-gg/multihub',
  },
  {
    title: 'E-Learning Platform',
    desc:  'A web-based e-learning platform built collaboratively, featuring course management and interactive learning modules.',
    tags:  ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    link:  'https://github.com/rofal-gg/E-learning',
  },
  {
    title: 'DexVoucher',
    desc:  'A voucher management and redemption system — streamlining the creation, distribution, and tracking of digital vouchers.',
    tags:  ['JavaScript', 'Web App'],
    link:  'https://github.com/dhamm-dev/dexvoucher',
  },
  // Add more projects here ↓
  // { title: '', desc: '', tags: [], link: '' },
];

const EDUCATION = [
  {
    year:   '2025 — Present',
    title:  'S1 Teknik Informatika',
    place:  'Universitas Trunojoyo Madura',
    detail: 'Semester 2 · Focusing on data structures, algorithms, and web development fundamentals.',
  },
  {
    year:   '2022 — 2025',
    title:  'SMA / Sederajat',
    place:  'Indonesia',
    detail: 'High school graduate with interest in technology and programming.',
  },
  // Add more education here ↓
];

/* ================================================
   TYPING EFFECT
   ================================================ */
function runTypingEffect() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrases = [
    'Frontend Developer.',
    'Web Explorer.',
    'UI Enthusiast.',
  ];

  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;
  const SPEED_TYPE   = 90;
  const SPEED_DELETE = 50;
  const PAUSE_END    = 1800;
  const PAUSE_START  = 400;

  function tick() {
    const current = phrases[phraseIdx];
    if (deleting) {
      charIdx--;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting   = false;
        phraseIdx  = (phraseIdx + 1) % phrases.length;
        setTimeout(tick, PAUSE_START);
        return;
      }
      setTimeout(tick, SPEED_DELETE);
    } else {
      charIdx++;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, PAUSE_END);
        return;
      }
      setTimeout(tick, SPEED_TYPE);
    }
  }
  tick();
}

/* ================================================
   HERO FADE-IN
   ================================================ */
function runHeroFade() {
  const items = document.querySelectorAll('.fade-in');
  items.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 150 * i);
  });
}

/* ================================================
   CITY NAVIGATION
   ================================================ */
function buildCities() {
  const cards   = document.querySelectorAll('.city-card');
  const panels  = document.querySelectorAll('.city-panel');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const target = card.dataset.city;

      // Toggle active card
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      // Toggle active panel
      panels.forEach(p => {
        p.classList.remove('active');
        if (p.id === `panel-${target}`) p.classList.add('active');
      });

      // Scroll panel into view
      document.getElementById(`panel-${target}`).scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  // Open first city by default
  if (cards.length) cards[0].click();
}

/* ================================================
   RENDER PROJECTS
   ================================================ */
function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  container.innerHTML = PROJECTS.map(p => `
    <div class="project-card">
      <div class="project-card-title">${p.title}</div>
      <div class="project-card-desc">${p.desc}</div>
      <div class="project-card-footer">
        <div class="project-tags">
          ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
        </div>
        ${p.link ? `
        <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="project-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          View on GitHub
        </a>` : ''}
      </div>
    </div>
  `).join('');
}

/* ================================================
   RENDER EDUCATION TIMELINE
   ================================================ */
function renderEducation() {
  const container = document.getElementById('education-container');
  if (!container) return;

  container.innerHTML = `<div class="timeline">` +
    EDUCATION.map(e => `
      <div class="timeline-item">
        <div class="timeline-year mono">${e.year}</div>
        <div class="timeline-title">${e.title}</div>
        <div class="timeline-sub">${e.place}</div>
        <div class="timeline-sub" style="margin-top:0.3rem">${e.detail}</div>
      </div>
    `).join('') +
  `</div>`;
}

/* ================================================
   RENDER TECH STACK
   ================================================ */
function renderTechStack() {
  const container = document.getElementById('techstack-container');
  if (!container) return;

  container.innerHTML = `<div class="tech-grid">` +
    TECH_STACK.map(t => `
      <div class="tech-badge">
        <span class="tech-badge-icon">${t.icon}</span>
        <div>
          <div class="tech-badge-name">${t.name}</div>
          <div class="tech-badge-level">${t.level}</div>
        </div>
      </div>
    `).join('') +
  `</div>`;
}

/* ================================================
   GUESTBOOK (localStorage)
   ================================================ */
const STORAGE_KEY = 'portfolio_guestbook';

function loadMessages() {
  const list = document.getElementById('messages-list');
  if (!list) return;

  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

  if (stored.length === 0) {
    list.innerHTML = `<div class="no-messages">// No messages yet. Be the first! 🚀</div>`;
    return;
  }

  list.innerHTML = stored.slice().reverse().map(m => `
    <div class="message-item">
      <div class="message-author">// ${escapeHtml(m.name)}</div>
      <div class="message-text">${escapeHtml(m.message)}</div>
      <div class="message-time">${m.time}</div>
    </div>
  `).join('');
}

function saveMessage(name, message) {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  stored.push({
    name,
    message,
    time: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
}

function setupGuestbook() {
  const form    = document.getElementById('guestbook-form');
  const nameEl  = document.getElementById('gb-name');
  const msgEl   = document.getElementById('gb-message');
  const btn     = document.getElementById('gb-submit');

  if (!form) return;
  loadMessages();

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = nameEl.value.trim();
    const message = msgEl.value.trim();
    if (!name || !message) return;

    saveMessage(name, message);
    nameEl.value  = '';
    msgEl.value   = '';
    loadMessages();

    // Button feedback
    btn.textContent = '✓ Sent!';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.disabled = false;
    }, 2000);
  });
}

/* ================================================
   ACTIVE NAV LINK ON SCROLL
   ================================================ */
function setupScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.navbar-links a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const link = document.querySelector(`.navbar-links a[href="#${entry.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

/* ================================================
   UTILS
   ================================================ */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ================================================
   INIT
   ================================================ */
document.addEventListener('DOMContentLoaded', () => {
  runHeroFade();
  runTypingEffect();
  renderProjects();
  renderEducation();
  renderTechStack();
  buildCities();
  setupGuestbook();
  setupScrollSpy();
});
