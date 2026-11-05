// ============================================================
// Big Flower — main.js
// ============================================================

// Текущее состояние
let currentLang = localStorage.getItem('bf_lang') || 'ru';
let currentTheme = localStorage.getItem('bf_theme') || 'light';
let cart = JSON.parse(localStorage.getItem('bf_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('bf_wishlist')) || [];

const ROOT = document.documentElement;
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Сразу ставим тему и флаг "js", чтобы не было мигания
ROOT.setAttribute('data-theme', currentTheme);
ROOT.classList.add('js');

/* ------------------------------------------------------------
   ЗАГРУЗЧИК СТРАНИЦЫ
------------------------------------------------------------ */
const loaderStart = performance.now();
const loaderEl = document.createElement('div');
loaderEl.className = 'page-loader';
loaderEl.setAttribute('aria-hidden', 'true');
loaderEl.innerHTML = `
  <div class="loader-inner">
    <div class="loader-stage">
      <div class="loader-orbit">
        ${[0, 1, 2, 3, 4, 5].map(k => `<i style="--r:${k * 60}deg; --k:${k}"></i>`).join('')}
      </div>
      <svg class="loader-flower" viewBox="0 0 100 100" fill="none">
        <g class="lf-outer">
          ${[0, 1, 2, 3, 4].map(i =>
            `<g transform="rotate(${i * 72} 50 50)"><path class="lp lp-o" style="--i:${i}" d="M50 50 C41 43 38 26 44 12 L50 19 L56 12 C62 26 59 43 50 50 Z"/></g>`
          ).join('')}
        </g>
        <g class="lf-inner">
          ${[0, 1, 2, 3, 4].map(i =>
            `<g transform="rotate(${i * 72 + 36} 50 50) translate(50 50) scale(.62) translate(-50 -50)"><path class="lp lp-i" style="--i:${i}" d="M50 50 C41 43 38 26 44 12 L50 19 L56 12 C62 26 59 43 50 50 Z"/></g>`
          ).join('')}
        </g>
        <g class="lf-core">
          ${[0, 1, 2, 3, 4, 5, 6, 7].map(k => {
            const a = k * Math.PI / 4;
            const x = (50 + 11 * Math.sin(a)).toFixed(2), y = (50 - 11 * Math.cos(a)).toFixed(2);
            return `<line class="lf-stamen" x1="50" y1="50" x2="${x}" y2="${y}"/><circle cx="${x}" cy="${y}" r="1.7"/>`;
          }).join('')}
          <circle cx="50" cy="50" r="5"/>
        </g>
      </svg>
    </div>
    <div class="loader-brand"><span>Big</span> Flower</div>
    <div class="loader-bar"><i></i></div>
  </div>`;
document.body.prepend(loaderEl);

function hideLoader() {
  if (!loaderEl.isConnected) return;
  const firstVisit = !sessionStorage.getItem('bf_visited');
  const minTime = firstVisit ? 1100 : 450;
  const wait = Math.max(0, minTime - (performance.now() - loaderStart));
  setTimeout(() => {
    sessionStorage.setItem('bf_visited', '1');
    loaderEl.classList.add('hide');
    ROOT.classList.add('ready');
    playStagger();
    setTimeout(() => loaderEl.remove(), 700);
  }, wait);
}
if (document.readyState === 'complete') hideLoader();
else window.addEventListener('load', hideLoader);
setTimeout(hideLoader, 4500); // страховка, если что-то грузится слишком долго

/* ------------------------------------------------------------
   ПОСТЕПЕННОЕ ПОЯВЛЕНИЕ КАРТОЧЕК (только при заходе и смене фильтра)
------------------------------------------------------------ */
let staggerTimer;
function playStagger() {
  if (REDUCED) return;
  ROOT.classList.remove('stagger');
  void ROOT.offsetWidth;
  ROOT.classList.add('stagger');
  clearTimeout(staggerTimer);
  staggerTimer = setTimeout(() => ROOT.classList.remove('stagger'), 1400);
}
document.addEventListener('click', (e) => {
  if (e.target.closest('.filter-btn')) playStagger();
});

/* ------------------------------------------------------------
   ПЛАВНАЯ ЗАГРУЗКА КАРТИНОК (shimmer -> fade-in)
------------------------------------------------------------ */
const loadedSrcs = new Set();

function markImgLoaded(img, instant) {
  if (instant) img.classList.add('instant');
  img.classList.add('is-loaded');
  const wrap = img.closest('.card-img-wrap');
  if (wrap) wrap.classList.add('img-ready');
  loadedSrcs.add(img.getAttribute('src'));
}

document.addEventListener('load', (e) => {
  if (e.target.tagName === 'IMG') markImgLoaded(e.target, false);
}, true);

document.addEventListener('error', (e) => {
  if (e.target.tagName === 'IMG') {
    e.target.classList.add('is-loaded');
    const wrap = e.target.closest('.card-img-wrap');
    if (wrap) wrap.classList.add('img-ready');
  }
}, true);

// Если картинка уже загружалась раньше (перерисовка списка) — показываем сразу, без мигания
new MutationObserver((mutations) => {
  mutations.forEach(m => m.addedNodes.forEach(node => {
    if (node.nodeType !== 1) return;
    const imgs = node.tagName === 'IMG' ? [node] : node.querySelectorAll ? node.querySelectorAll('img') : [];
    imgs.forEach(img => {
      if (loadedSrcs.has(img.getAttribute('src'))) markImgLoaded(img, true);
    });
  }));
}).observe(document.documentElement, { childList: true, subtree: true });

/* ------------------------------------------------------------
   САКУРА: цветущие ветви в углах + лепестки, которые с них падают
------------------------------------------------------------ */
const Sakura = (() => {
  const PAL = {
    light: ['#F6B3C1', '#F29BB0', '#FAC9D3', '#EC8AA2'],
    dark:  ['#E58FA0', '#D97A90', '#F0AEBB', '#C86A80']
  };
  const SHAPE = new Path2D('M0 9 C-7 5 -10 -4 -5 -9 L0 -6 L5 -9 C10 -4 7 5 0 9 Z');
  const PETAL_D = 'M0 0 C-7 -4 -9 -15 -4 -19 L0 -16 L4 -19 C9 -15 7 -4 0 0 Z';
  const VB_W = 600, VB_H = 360;

  // [путь, толщина]
  const LIMBS = [
    ['M-20 14 C90 30 210 70 320 118 C400 152 480 142 560 180', 9],
    ['M150 52 C168 100 196 150 212 200', 5],
    ['M262 92 C300 62 350 54 400 62', 4],
    ['M338 128 C354 176 380 206 380 250', 4],
    ['M440 140 C470 108 520 92 575 100', 3.5],
    ['M60 26 C72 80 60 122 80 162', 4]
  ];
  // [x, y, масштаб] — центры цветков в координатах ветки
  const BLOSSOMS = [
    [212, 200, 1], [380, 250, .9], [575, 100, 1], [540, 176, .85], [400, 62, .9],
    [80, 162, .85], [300, 100, .8], [462, 114, .85], [152, 50, .8], [336, 128, .8]
  ];

  let canvas, ctx, W = 0, H = 0, dpr = 1;
  let petals = [], wraps = [];
  let raf = 0, last = 0, clock = 0, wind = 0, windTarget = 0, windTimer, resizeTimer;

  const rnd = (a, b) => a + Math.random() * (b - a);

  function flower(x, y, s, delay, idx) {
    const ps = [0, 72, 144, 216, 288].map(d => `<path class="bl-petal" transform="rotate(${d})" d="${PETAL_D}"/>`).join('');
    return `<g transform="translate(${x} ${y}) scale(${s})"><g class="bl" style="--d:${delay}s"><g class="bl-in" style="--f:${(idx % 4) * 0.7}s">${ps}<circle class="bl-core" r="2.8"/></g></g></g>`;
  }

  function branchSVG() {
    const limbs = LIMBS.map(([d, w], i) =>
      `<path class="limb" pathLength="1" d="${d}" stroke-width="${w}" style="--d:${(i * 0.18).toFixed(2)}s"/>`).join('');
    const blossoms = BLOSSOMS.map(([x, y, s], i) =>
      flower(x, y, s * 1.2, (1 + i * 0.12).toFixed(2), i) +
      flower(x + 15, y + 9, s * 0.75, (1.1 + i * 0.12).toFixed(2), i + 2)).join('');
    return `<svg class="sakura-branch" viewBox="0 0 ${VB_W} ${VB_H}" aria-hidden="true"><g class="limbs">${limbs}</g>${blossoms}</svg>`;
  }

  function build() {
    const bg = document.createElement('div');
    bg.className = 'sakura-bg';
    bg.setAttribute('aria-hidden', 'true');
    ['left', 'right'].forEach(side => {
      const w = document.createElement('div');
      w.className = 'sakura-branch-wrap ' + side;
      w.innerHTML = branchSVG();
      bg.appendChild(w);
      wraps.push({ el: w, mirror: side === 'right' });
    });
    document.body.appendChild(bg);

    canvas = document.createElement('canvas');
    canvas.className = 'sakura-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
  }

  // Откуда вылетает новый лепесток: чаще всего — из цветка на ветке
  function pickSource() {
    if (Math.random() < 0.8) {
      const pts = [];
      wraps.forEach(({ el, mirror }) => {
        const r = el.getBoundingClientRect();
        BLOSSOMS.forEach(([bx, by]) => {
          const x = r.left + (mirror ? 1 - bx / VB_W : bx / VB_W) * r.width;
          const y = r.top + (by / VB_H) * r.height;
          if (y > 70 && y < H * 0.85) pts.push({ x, y });
        });
      });
      if (pts.length) return pts[(Math.random() * pts.length) | 0];
    }
    return { x: rnd(0, W), y: -16 };
  }

  function spawn(p, initial) {
    const z = rnd(0.4, 1);
    p.z = z;
    p.s = 0.3 + z * 0.5;
    p.vy = 22 + z * 38;
    p.sa = rnd(14, 34);
    p.sf = rnd(0.6, 1.4);
    p.ph = rnd(0, 6.28);
    p.rot = rnd(0, 6.28);
    p.vr = rnd(-1.2, 1.2);
    p.fp = rnd(0, 6.28);
    p.fs = rnd(1.5, 3.5);
    p.c = (Math.random() * 4) | 0;
    p.a = 0.5 + z * 0.4;
    p.age = initial ? 1 : 0;
    if (initial) { p.x = rnd(0, W); p.y = rnd(-20, H); }
    else { const src = pickSource(); p.x = src.x + rnd(-6, 6); p.y = src.y + rnd(-4, 6); }
    return p;
  }

  function targetCount() {
    return Math.max(16, Math.min(40, Math.round(W * H / 28000)));
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    const n = targetCount();
    while (petals.length < n) petals.push(spawn({}, true));
    if (petals.length > n) petals.length = n;
  }

  function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const pal = PAL[ROOT.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'];
    const dim = ROOT.getAttribute('data-theme') === 'dark' ? 0.75 : 1;
    for (const p of petals) {
      const fl = Math.max(0.28, Math.abs(Math.cos(p.fp))); // «переворот» лепестка в воздухе
      const cs = Math.cos(p.rot) * p.s, sn = Math.sin(p.rot) * p.s;
      ctx.setTransform(dpr * cs, dpr * sn, -dpr * sn * fl, dpr * cs * fl, dpr * p.x, dpr * p.y);
      ctx.globalAlpha = p.a * dim * (0.75 + 0.25 * fl) * Math.min(1, p.age / 0.8);
      ctx.fillStyle = pal[p.c];
      ctx.fill(SHAPE);
    }
    ctx.globalAlpha = 1;
  }

  function step(dt) {
    clock += dt;
    wind += (windTarget - wind) * Math.min(1, dt * 2.5);
    const base = Math.sin(clock * 0.35) * 10 + 8;
    for (const p of petals) {
      p.age += dt;
      p.x += (Math.sin(clock * p.sf + p.ph) * p.sa + base + wind * (0.5 + p.z)) * dt;
      p.y += (p.vy + Math.abs(wind) * 0.05) * dt;
      p.rot += (p.vr + wind * 0.004) * dt;
      p.fp += p.fs * dt;
      if (p.y > H + 20 || p.x > W + 40 || p.x < -40) spawn(p, false);
    }
  }

  function frame(ts) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (ts - last) / 1000 || 0.016);
    last = ts;
    step(dt);
    draw();
  }

  function start() {
    if (raf || REDUCED) return;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function stop() { cancelAnimationFrame(raf); raf = 0; }

  function init() {
    if (canvas) return;
    build();
    resize();
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { resize(); if (REDUCED) draw(); }, 120);
    });
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
    if (REDUCED) { petals.forEach(p => (p.age = 1)); draw(); return; }
    start();
  }

  // Порыв ветра (при смене языка)
  function gust() {
    windTarget = 240;
    clearTimeout(windTimer);
    windTimer = setTimeout(() => { windTarget = 0; }, 700);
  }

  return { init, gust };
})();

// Фонтан лепестков из кнопки (при смене темы)
function petalBurst(x, y, n = 14) {
  if (REDUCED) return;
  for (let i = 0; i < n; i++) {
    const el = document.createElement('i');
    el.className = 'burst-petal';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    document.body.appendChild(el);
    const ang = Math.random() * Math.PI * 2;
    const dist = 50 + Math.random() * 90;
    const dx = Math.cos(ang) * dist;
    const dy = Math.sin(ang) * dist + 50;
    const rot = (Math.random() - 0.5) * 540;
    const anim = el.animate([
      { transform: 'translate(-50%,-50%) translate(0,0) rotate(0deg) scale(.4)', opacity: 1 },
      { transform: `translate(-50%,-50%) translate(${dx}px,${dy}px) rotate(${rot}deg) scale(1)`, opacity: 0 }
    ], { duration: 750 + Math.random() * 450, easing: 'cubic-bezier(.15,.7,.3,1)' });
    anim.onfinish = () => el.remove();
  }
}

/* ------------------------------------------------------------
   ИНИЦИАЛИЗАЦИЯ
------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  Sakura.init();
  buildThemeToggle();
  initLang();
  updateBadges(true);
  bindGlobalEvents();
  initHeaderScroll();
  document.querySelectorAll('main, .nav, .footer').forEach(el => el.classList.add('swap-target'));
  if (window.lucide) lucide.createIcons();
});

/* ------------------------------------------------------------
   ШАПКА: тень при прокрутке
------------------------------------------------------------ */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ------------------------------------------------------------
   ТЕМА (dark / light) с круговой анимацией
------------------------------------------------------------ */
const SUN_SVG = `<svg class="ico-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`;
const MOON_SVG = `<svg class="ico-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>`;

function initTheme() {
  ROOT.setAttribute('data-theme', currentTheme);
}

function buildThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.classList.add('theme-toggle');
  btn.setAttribute('aria-label', 'Toggle theme');
  btn.innerHTML = SUN_SVG + MOON_SVG;
}

function toggleTheme(e) {
  const next = currentTheme === 'light' ? 'dark' : 'light';
  const apply = () => {
    currentTheme = next;
    ROOT.setAttribute('data-theme', currentTheme);
    localStorage.setItem('bf_theme', currentTheme);
  };

  const btn = e && e.currentTarget;
  btn && btn.classList.add('spin');
  setTimeout(() => btn && btn.classList.remove('spin'), 600);

  const r = btn ? btn.getBoundingClientRect() : null;
  const x = r ? r.left + r.width / 2 : innerWidth / 2;
  const y = r ? r.top + r.height / 2 : 40;

  // Круговое "проявление" новой темы от кнопки (View Transitions API) + фонтан лепестков
  if (document.startViewTransition && !REDUCED && btn) {
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(apply);
    transition.ready.then(() => {
      petalBurst(x, y);
      ROOT.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(.65, 0, .35, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    }).catch(() => {});
    return;
  }

  // Запасной вариант: плавная смена цветов
  ROOT.classList.add('theme-fade');
  apply();
  petalBurst(x, y);
  setTimeout(() => ROOT.classList.remove('theme-fade'), 500);
}

/* ------------------------------------------------------------
   ЯЗЫК: красивый выпадающий список + анимация смены
------------------------------------------------------------ */
const LANGS = [
  { code: 'ru', name: 'Русский' },
  { code: 'uz', name: "O'zbekcha" },
  { code: 'en', name: 'English' }
];

const GLOBE_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
const CHEV_SVG = `<svg class="lang-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`;
const CHECK_SVG = `<svg class="lang-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;

let langWrap = null;

function buildLangDropdown() {
  const select = document.getElementById('langSelect');
  if (!select || langWrap) return;

  langWrap = document.createElement('div');
  langWrap.className = 'lang-dd';
  langWrap.innerHTML = `
    <button type="button" class="lang-btn" aria-haspopup="listbox" aria-expanded="false">
      ${GLOBE_SVG}
      <span class="lang-current">${currentLang.toUpperCase()}</span>
      ${CHEV_SVG}
    </button>
    <ul class="lang-menu" role="listbox">
      ${LANGS.map(l => `
        <li role="option" tabindex="-1" data-lang="${l.code}">
          <span class="lang-code">${l.code.toUpperCase()}</span>
          <span class="lang-name">${l.name}</span>
          ${CHECK_SVG}
        </li>`).join('')}
    </ul>`;

  select.insertAdjacentElement('afterend', langWrap);
  select.classList.add('lang-select-native'); // прячем старый select, он остаётся для совместимости

  const btn = langWrap.querySelector('.lang-btn');
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    setLangMenu(!langWrap.classList.contains('open'));
  });

  langWrap.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', (e) => {
      e.stopPropagation();
      setLangMenu(false);
      setLang(li.dataset.lang);
    });
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); li.click(); }
    });
  });

  document.addEventListener('click', () => setLangMenu(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setLangMenu(false); });
}

function setLangMenu(open) {
  if (!langWrap) return;
  langWrap.classList.toggle('open', open);
  langWrap.querySelector('.lang-btn').setAttribute('aria-expanded', String(open));
}

function syncLangDropdown(animate) {
  if (!langWrap) return;
  const cur = langWrap.querySelector('.lang-current');
  cur.textContent = currentLang.toUpperCase();
  if (animate) {
    cur.classList.remove('flip');
    void cur.offsetWidth;
    cur.classList.add('flip');
  }
  langWrap.querySelectorAll('li').forEach(li => {
    const active = li.dataset.lang === currentLang;
    li.classList.toggle('active', active);
    li.setAttribute('aria-selected', String(active));
  });
}

function initLang() {
  const select = document.getElementById('langSelect');
  if (select) select.value = currentLang;
  buildLangDropdown();
  syncLangDropdown(false);
  applyTranslations();
  ROOT.setAttribute('lang', currentLang);
}

let langBusy = false;
function setLang(lang) {
  if (lang === currentLang || langBusy) return;
  langBusy = true;
  currentLang = lang;
  localStorage.setItem('bf_lang', lang);

  const select = document.getElementById('langSelect');
  if (select) select.value = lang;
  syncLangDropdown(true);
  ROOT.setAttribute('lang', lang);

  const swap = () => {
    applyTranslations();
    if (typeof renderPageContent === 'function') renderPageContent();
    if (window.lucide) lucide.createIcons();
  };

  if (REDUCED) { swap(); langBusy = false; return; }

  ROOT.classList.add('lang-swap'); // отключает повторное "выезжание" карточек
  Sakura.gust();

  // Две шторки пролетают по экрану, на середине меняем текст
  const info = LANGS.find(l => l.code === lang) || { name: lang };
  const D = 1000;
  const keys = [
    { clipPath: 'inset(0 100% 0 0)', easing: 'cubic-bezier(.7,0,.3,1)' },
    { clipPath: 'inset(0 0 0 0)', offset: 0.4, easing: 'linear' },
    { clipPath: 'inset(0 0 0 0)', offset: 0.6, easing: 'cubic-bezier(.7,0,.3,1)' },
    { clipPath: 'inset(0 0 0 100%)' }
  ];
  const back = document.createElement('div');
  back.className = 'lang-veil back';
  const front = document.createElement('div');
  front.className = 'lang-veil front';
  front.innerHTML = `<div class="veil-inner"><span class="veil-code">${lang.toUpperCase()}</span><span class="veil-name">${info.name}</span></div>`;
  document.body.append(back, front);
  back.animate(keys, { duration: D, fill: 'both' });
  front.animate(keys, { duration: D - 90, delay: 90, fill: 'both' });

  setTimeout(swap, D * 0.52);
  setTimeout(() => {
    back.remove();
    front.remove();
    ROOT.classList.remove('lang-swap');
    langBusy = false;
  }, D + 40);
}

function t(key) {
  return i18n[currentLang][key] || key;
}
function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });
}

/* ------------------------------------------------------------
   УВЕДОМЛЕНИЯ (вместо alert)
------------------------------------------------------------ */
let toastBox = null;
function showToast(message) {
  if (!toastBox) {
    toastBox = document.createElement('div');
    toastBox.className = 'toast-box';
    document.body.appendChild(toastBox);
  }
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `
    <span class="toast-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
    <span class="toast-text"></span>`;
  el.querySelector('.toast-text').textContent = message;
  toastBox.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    el.classList.add('out');
    setTimeout(() => el.remove(), 400);
  }, 2400);
}
// Все alert() на сайте (добавление в корзину, оформление заказа, сохранение профиля) становятся красивыми уведомлениями
window.alert = (msg) => showToast(String(msg));

/* ------------------------------------------------------------
   КОРЗИНА & ИЗБРАННОЕ
------------------------------------------------------------ */
function toggleWishlist(id) {
  // запоминаем, какая именно кнопка-сердце нажата, чтобы анимировать только её
  const favBtns = [...document.querySelectorAll('.card-fav-btn')];
  const clicked = window.event && window.event.target && window.event.target.closest
    ? window.event.target.closest('.card-fav-btn') : null;
  const idx = clicked ? favBtns.indexOf(clicked) : -1;

  const index = wishlist.indexOf(id);
  const adding = index === -1;
  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(id);
  }
  localStorage.setItem('bf_wishlist', JSON.stringify(wishlist));
  updateBadges();
  if (typeof renderPageContent === 'function') renderPageContent();
  if (window.lucide) lucide.createIcons();

  if (adding && idx > -1) {
    const again = document.querySelectorAll('.card-fav-btn')[idx];
    if (again) again.classList.add('pop');
  }
}

function addToCart(id, qty = 1) {
  const found = cart.find(item => item.id === id);
  if (found) {
    found.qty += qty;
  } else {
    cart.push({ id, qty });
  }
  localStorage.setItem('bf_cart', JSON.stringify(cart));
  updateBadges();
  alert(t('added'));
  if (typeof renderPageContent === 'function') renderPageContent();
}

function updateBadges(silent) {
  const cBadge = document.getElementById('cartBadge');
  const wBadge = document.getElementById('wishlistBadge');
  const cValue = String(cart.reduce((sum, item) => sum + item.qty, 0));
  const wValue = String(wishlist.length);
  setBadge(cBadge, cValue, silent);
  setBadge(wBadge, wValue, silent);
}

function setBadge(el, value, silent) {
  if (!el) return;
  const changed = el.textContent !== value;
  el.textContent = value;
  if (changed && !silent && !REDUCED) {
    el.classList.remove('bump');
    void el.offsetWidth;
    el.classList.add('bump');
  }
}

function bindGlobalEvents() {
  const tBtn = document.getElementById('themeToggle');
  if (tBtn) tBtn.addEventListener('click', toggleTheme);
  const lSelect = document.getElementById('langSelect');
  if (lSelect) lSelect.addEventListener('change', (e) => setLang(e.target.value));
}