/* ========================================
   恋爱纪念网站 - 交互脚本
   ======================================== */

// --- 配置 ---
// 🔧 修改这里：你们的纪念日（在一起的第一天）
const ANNIVERSARY_DATE = new Date('2026-06-28T00:00:00');

// --- DOM 就绪 ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initCountdown();
  initHearts();
  initGallery();
  initFilters();
  initLightbox();
});

// ==========================================
// 主题切换
// ==========================================
function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  setTheme(theme);

  const btn = document.querySelector('.theme-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
      localStorage.setItem('theme', next);
    });
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = document.querySelector('.theme-btn .theme-icon');
  if (icon) {
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// ==========================================
// 移动端菜单
// ==========================================
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
    // 点击链接后关闭菜单
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }
}

// ==========================================
// 纪念日倒计时
// ==========================================
function initCountdown() {
  const container = document.getElementById('countdown');
  if (!container) return;

  function update() {
    const now = new Date();
    const diff = now - ANNIVERSARY_DATE;

    // 已在一起的天数
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const daysEl = document.getElementById('days-count');
    if (daysEl) daysEl.textContent = totalDays;

    // 距离下一个周年
    const nextAnniversary = new Date(ANNIVERSARY_DATE);
    nextAnniversary.setFullYear(now.getFullYear());
    if (now > nextAnniversary) {
      nextAnniversary.setFullYear(now.getFullYear() + 1);
    }

    const remaining = nextAnniversary - now;
    const rDays = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const rHours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const rMins = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const rSecs = Math.floor((remaining % (1000 * 60)) / 1000);

    const elements = {
      'count-days': rDays,
      'count-hours': rHours,
      'count-mins': rMins,
      'count-secs': rSecs,
    };

    Object.entries(elements).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(val).padStart(2, '0');
    });
  }

  update();
  setInterval(update, 1000);
}

// ==========================================
// 爱心飘落特效
// ==========================================
function initHearts() {
  const container = document.getElementById('hearts-container');
  if (!container) return;

  const hearts = ['💕', '💖', '💗', '💝', '💘', '✨', '🌸', '🩷'];

  function createHeart() {
    const heart = document.createElement('span');
    heart.className = 'heart-particle';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 1.2 + 0.8) + 'rem';
    heart.style.animationDuration = (Math.random() * 6 + 8) + 's';
    heart.style.animationDelay = '0s';

    container.appendChild(heart);

    heart.addEventListener('animationend', () => {
      heart.remove();
    });
  }

  // 初始生成一批
  for (let i = 0; i < 8; i++) {
    setTimeout(() => createHeart(), i * 400);
  }

  // 每隔几秒生成新的
  setInterval(createHeart, 3000);
}

// ==========================================
// 照片墙筛选
// ==========================================
function initFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// ==========================================
// 照片灯箱
// ==========================================
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const img = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const src = item.querySelector('img')?.src;
      const caption = item.querySelector('.gallery-caption')?.textContent;
      if (src) {
        img.src = src;
        img.alt = caption || '';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function close() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

// ==========================================
// 画廊-备用初始化 (用于非 gallery.html 页面)
// ==========================================
function initGallery() {
  // 灯箱在 initLightbox 中处理
}
