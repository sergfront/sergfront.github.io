(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- i18n ---------- */
  const UA = {
    skip: 'Перейти до робіт', short_name: 'С. Антонюк',
    nav_work: 'Роботи', nav_products: 'Продукти', nav_path: 'Досвід', nav_contact: 'Контакти',
    lang_switch: 'EN', name_1: 'Сергій', name_2: 'Антонюк',
    role: 'Frontend-розробник: React, TypeScript, Vue.js',
    lede: 'Роблю інтерфейси, якими люди користуються щодня, — від кар’єрного порталу Vodafone Україна до екранів ERP для цеху з сотнями рядків у реальному часі. Дев’ять років досвіду, працюю віддалено з Київщини.',
    cta_contact: 'Написати мені', cta_cv: 'Завантажити CV',
    work_h: 'Вибрані роботи',
    work_p: 'Живі сайти, які я зробив або над якими працював у студіях та агенціях. Відкривайте будь-який — усі вони досі онлайн.',
    f1_p: 'Розробив з нуля в агенції VIS-A-VIS: від верстки до інтеграцій. Дизайн досі на сайті.',
    f1_also: 'А також багато задач на vodafone.ua, Vodafone Pay і raiffeisen.ua.',
    f2_h: 'Музей «Голоси мирних»',
    f2_p: 'Інтерактивний онлайн-музей історій війни. Власні анімації на JavaScript і Canvas, без бібліотек анімацій.',
    list_h: 'Сайти брендів і продукти',
    p_horizon: 'Бізнес-парк у Києві — інтерактивний анімований сайт',
    p_iq: 'Будівельна компанія — анімований корпоративний сайт',
    p_expo: 'Виставковий центр — інтерактивний сайт',
    p_links: 'Маркетплейс гостьових публікацій і посилань',
    p_1guy: 'Сервіс викупу й обміну гаджетів',
    p_accu: 'Сайт бренду Roche з каталогом продукції',
    p_r1: 'Сайт онлайн-школи трьома мовами',
    more: 'Також працював над',
    cases_h: 'За логіном',
    cases_p: 'Останні чотири роки — два B2B-продукти під NDA. Без скриншотів: що я зробив і що змінилося.',
    c1_h: 'ERP для меблевого виробництва',
    c1_p: 'Замовлення, склад, планування вантажівок і цехові термінали зі сканерами штрихкодів. Я зробив підсистему прайс-листів від початку до кінця, близько 40 екранів таблиць з оновленням у реальному часі і все автоматизоване тестування з нуля.',
    c1_s1: 'E2E-тестів на Playwright', c1_s2: 'покриття бізнес-логіки, з нуля', c1_s3: 'unit-тестів на Vitest',
    c2_h: 'CRM і workflow SaaS',
    c2_p: 'CRM з workflow, вбудованим поштовим клієнтом і календарем. Розвивав UI-кіт і дизайн-токени, написав інтеграцію календаря і прискорив місця, які клієнти відчували найбільше.',
    c2_s1: 'завантаження Kanban для великого клієнта, було ~60 с', c2_s2: 'компонентів в UI-кіті', c2_s3: 'швидші списки в картках контактів',
    path_h: 'Дев’ять років, п’ять команд',
    t1: 'B2B SaaS, ERP і 11 проєктів на Laravel', t2: 'Агенція: Vodafone, Raiffeisen Bank, «Оберіг»',
    t3w: 'Хорошоп', t3: 'Рефакторинг і нові функції великої e-commerce-платформи',
    t4: '20+ сайтів з нуля, серед них анімовані й інтерактивні',
    t5w: 'Irene Bukur, фриланс', t5: 'Лендинги й адаптивні сайти',
    stack_h: 'Інструменти', stack_test: 'Тестування', stack_ai: 'Щодня',
    contact_h: 'Шукаю віддалену роботу у фронтенді',
    contact_p: 'React + TypeScript або Vue.js, повна зайнятість. Англійською вільно читаю й пишу, дзвінки — українською або російською.',
    foot: 'Написано вручну на HTML, CSS і JavaScript. Без фреймворків і бібліотек анімацій.'
  };
  const EN = {};
  document.querySelectorAll('[data-i18n]').forEach(el => { EN[el.dataset.i18n] = el.textContent; });

  function applyLang(lang) {
    const dict = lang === 'ua' ? UA : EN;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = dict[el.dataset.i18n];
      if (v != null) el.textContent = v;
    });
    root.setAttribute('data-lang', lang);
    root.lang = lang === 'ua' ? 'uk' : 'en';
    document.title = lang === 'ua' ? 'Сергій Антонюк — Frontend-розробник' : 'Serhii Antoniuk — Frontend Developer';
    const cv = document.getElementById('cv-link');
    cv.href = lang === 'ua' ? 'cv/Antoniuk_Serhii_Frontend_CV_UA.pdf' : 'cv/Antoniuk_Serhii_Frontend_CV_EN.pdf';
    splitName();
  }

  function splitName() {
    document.querySelectorAll('[data-split]').forEach((line, li) => {
      const text = line.textContent;
      line.textContent = '';
      [...text].forEach((c, i) => {
        const s = document.createElement('span');
        s.className = 'ch';
        s.style.setProperty('--i', i + li * 6);
        s.textContent = c;
        line.appendChild(s);
      });
      line.setAttribute('aria-label', text);
    });
  }

  applyLang(root.getAttribute('data-lang') || 'en');
  document.getElementById('lang').addEventListener('click', () => {
    const next = root.getAttribute('data-lang') === 'ua' ? 'en' : 'ua';
    store.set('lang', next);
    applyLang(next);
  });

  /* ---------- theme ---------- */
  const isDark = () => {
    const t = root.getAttribute('data-theme');
    return t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  };
  document.getElementById('theme').addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    store.set('theme', next);
  });

  /* ---------- load sequence ---------- */
  requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('is-loaded')));

  /* ---------- top bar ---------- */
  const bar = document.querySelector('.bar');
  const onScroll = () => bar.classList.toggle('is-scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- hero: layered mountains (dawn / night) ---------- */
  const canvas = document.querySelector('.hero__scene');
  const ctx = canvas.getContext('2d');
  const hero = document.querySelector('.hero');
  const heroName = document.querySelector('.hero__name');
  const PAL = {
    light: { sky: ['#9fb6e6', '#cdd6ef', '#f4dcc6', '#f7c9a6'], sun: [255, 214, 170], fog: [244, 222, 205],
             ridges: ['#a9b3dc', '#8691c4', '#6470aa', '#434d8a', '#262d63', '#141a3d'] },
    dark:  { sky: ['#05070f', '#0b1022', '#18204a', '#2c2f63'], sun: [205, 214, 255], fog: [60, 70, 130],
             ridges: ['#272f63', '#1f2655', '#181e47', '#121738', '#0c1029', '#070a1a'] }
  };
  // seeded random so the range is the same on every visit
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const LAYERS = [
    { base: .52, amp: .20, depth: .06, rough: 1.0 },
    { base: .60, amp: .17, depth: .12, rough: 1.2 },
    { base: .68, amp: .14, depth: .22, rough: 1.4 },
    { base: .74, amp: .12, depth: .36, rough: 1.6 },
    { base: .82, amp: .10, depth: .55, rough: 1.8 },
    { base: .90, amp: .08, depth: .80, rough: 2.0 }
  ].map(l => ({ ...l, waves: Array.from({ length: 6 }, (_, k) => ({ f: (k + 1) * (0.6 + rnd()) * l.rough, p: rnd() * 6.28, a: 1 / Math.pow(k + 1, 1.35) })) }));
  const stars = Array.from({ length: 140 }, () => ({ x: rnd(), y: rnd() * .55, r: rnd() * 1.2 + .2, tw: rnd() * 6.28 }));

  let W = 0, H = 0, dpr = 1, sprites = [], themeKey = '', heroVisible = true;
  let ptx = 0, pty = 0, px = 0, py = 0, scrollP = 0;
  const pad = 40;

  // 1D fractal value noise with "ridged" octaves -> sharp peaks, rough slopes
  LAYERS.forEach(l => { l.pts = Array.from({ length: 4096 }, () => rnd() * 2 - 1); l.off = rnd() * 100; });
  function noise(l, x) {
    const i = Math.floor(x), f = x - i, a = l.pts[i & 4095], b = l.pts[(i + 1) & 4095];
    const u = f * f * (3 - 2 * f);
    return a + (b - a) * u;
  }
  function ridgeY(l, x) {
    let y = 0, amp = 1, freq = 2.2 * l.rough, norm = 0;
    for (let o = 0; o < 7; o++) {
      const n = noise(l, x * freq + l.off + o * 17.3);
      y += (o < 3 ? (1 - Math.abs(n)) * 2 - 1 : n) * amp;
      norm += amp; amp *= .5; freq *= 2.1;
    }
    return y / norm;
  }
  function build() {
    const pal = PAL[themeKey];
    sprites = LAYERS.map((l, i) => {
      const c = document.createElement('canvas');
      const w = W + pad * 2, h = H + pad;
      c.width = w * dpr; c.height = h * dpr;
      const g = c.getContext('2d'); g.scale(dpr, dpr);
      g.beginPath(); g.moveTo(0, h);
      for (let x = 0; x <= w; x += 3) {
        const y = H * l.base - ridgeY(l, x / w) * H * l.amp;
        g.lineTo(x, y);
      }
      g.lineTo(w, h); g.closePath();
      const top = H * (l.base - l.amp * 1.4);
      const grad = g.createLinearGradient(0, top, 0, H);
      grad.addColorStop(0, pal.ridges[i]);
      grad.addColorStop(1, pal.ridges[Math.min(i + 1, pal.ridges.length - 1)]);
      g.fillStyle = grad; g.fill();
      return c;
    });
  }
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = hero.clientWidth; H = hero.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    themeKey = isDark() ? 'dark' : 'light';
    build(); draw(performance.now());
  }
  function draw(now) {
    const pal = PAL[themeKey], t = now / 1000;
    // sky
    const sky = ctx.createLinearGradient(0, 0, 0, H * .8);
    sky.addColorStop(0, pal.sky[0]); sky.addColorStop(.45, pal.sky[1]); sky.addColorStop(.8, pal.sky[2]); sky.addColorStop(1, pal.sky[3]);
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
    // stars at night
    if (themeKey === 'dark') {
      for (const s of stars) {
        const a = .35 + .45 * (reduce ? .5 : (Math.sin(t * 1.3 + s.tw) * .5 + .5));
        ctx.fillStyle = `rgba(225,230,255,${a})`;
        ctx.beginPath(); ctx.arc(s.x * W, s.y * H + scrollP * H * .5, s.r, 0, 6.28); ctx.fill();
      }
    }
    // sun / moon with glow
    const sx = W * .72 - px * 6, sy = H * (themeKey === 'dark' ? .24 : .4) + scrollP * H * .5;
    const [r, g, b] = pal.sun;
    const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, Math.max(W, H) * .45);
    glow.addColorStop(0, `rgba(${r},${g},${b},.7)`); glow.addColorStop(.22, `rgba(${r},${g},${b},.28)`); glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = themeKey === 'dark' ? '#e9edff' : '#fff1e2';
    ctx.beginPath(); ctx.arc(sx, sy, Math.min(W, H) * .045, 0, 6.28); ctx.fill();
    // ridges with parallax + drifting fog between them
    sprites.forEach((sp, i) => {
      const l = LAYERS[i];
      const ox = -pad + px * l.depth * 18;
      const oy = scrollP * H * (1 - l.depth) * .45 + py * l.depth * 6;
      ctx.drawImage(sp, ox, oy, W + pad * 2, H + pad);
      if (i === sprites.length - 1) {
        const sh = ctx.createLinearGradient(0, H * .55, 0, H);
        sh.addColorStop(0, 'rgba(8,10,28,0)'); sh.addColorStop(1, 'rgba(8,10,28,.55)');
        ctx.fillStyle = sh; ctx.fillRect(0, H * .55, W, H * .45);
      }
      if (i < sprites.length - 1) {
        const fy = H * (l.base + .02) + oy;
        const drift = reduce ? 0 : Math.sin(t * .05 + i) * W * .08;
        const [fr, fg, fb] = pal.fog;
        const fog = ctx.createLinearGradient(0, fy - H * .06, 0, fy + H * .05);
        fog.addColorStop(0, `rgba(${fr},${fg},${fb},0)`);
        fog.addColorStop(.5, `rgba(${fr},${fg},${fb},${.22 - i * .03})`);
        fog.addColorStop(1, `rgba(${fr},${fg},${fb},0)`);
        ctx.fillStyle = fog;
        ctx.fillRect(drift - W * .1, fy - H * .06, W * 1.2, H * .11);
      }
    });
  }
  function loop(now) {
    if (heroVisible) {
      px += (ptx - px) * .06; py += (pty - py) * .06;
      draw(now);
      const p = Math.min(1, scrollY / H);
      heroName.style.transform = `translateY(${p * -H * .18}px)`;
      heroName.style.opacity = 1 - p * 1.3;
    }
    requestAnimationFrame(loop);
  }
  addEventListener('resize', resize);
  const onThemeChange = () => { const k = isDark() ? 'dark' : 'light'; if (k !== themeKey) { themeKey = k; build(); draw(performance.now()); } };
  new MutationObserver(onThemeChange).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', onThemeChange);
  addEventListener('scroll', () => { scrollP = Math.min(1, scrollY / (H || 1)); if (reduce) draw(0); }, { passive: true });
  resize();
  if (!reduce) {
    addEventListener('pointermove', e => { ptx = e.clientX / innerWidth * 2 - 1; pty = e.clientY / innerHeight * 2 - 1; }, { passive: true });
    new IntersectionObserver(([en]) => { heroVisible = en.isIntersecting; }).observe(hero);
    requestAnimationFrame(loop);
  }

  /* ---------- reveal + counters ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('is-in');
      en.target.querySelectorAll('[data-count]').forEach(count);
      io.unobserve(en.target);
    });
  }, { threshold: 0.18 });
  document.querySelectorAll('.reveal').forEach(el => reduce ? el.classList.add('is-in') : io.observe(el));

  function count(el) {
    const to = +el.dataset.count;
    if (reduce) { el.textContent = to; return; }
    const dur = 1400, s = performance.now();
    const step = now => {
      const p = Math.min(1, (now - s) / dur);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    el.textContent = 0;
    requestAnimationFrame(step);
  }

  /* ---------- project preview that follows the cursor ---------- */
  const peek = document.querySelector('.peek');
  const peekImg = peek.querySelector('img');
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (fine && !reduce) {
    let px = 0, py = 0, tx = 0, ty = 0, raf = 0;
    const follow = () => {
      px += (tx - px) * 0.16; py += (ty - py) * 0.16;
      peek.style.translate = `${px + 28}px ${py - 110}px`;
      raf = Math.abs(tx - px) + Math.abs(ty - py) > 0.3 ? requestAnimationFrame(follow) : 0;
    };
    document.querySelectorAll('.row').forEach(row => {
      row.addEventListener('pointerenter', e => {
        peekImg.src = row.dataset.img;
        if (!peek.classList.contains('is-on')) { px = tx = e.clientX; py = ty = e.clientY; }
        peek.classList.add('is-on');
      });
      row.addEventListener('pointerleave', () => peek.classList.remove('is-on'));
      row.addEventListener('pointermove', e => {
        tx = Math.min(e.clientX, innerWidth - 380); ty = e.clientY;
        if (!raf) raf = requestAnimationFrame(follow);
      });
    });
  }

  /* ---------- magnetic buttons ---------- */
  if (fine && !reduce) {
    document.querySelectorAll('[data-magnetic]').forEach(el => {
      el.style.transition = 'transform .45s cubic-bezier(.2,.8,.1,1), background .2s, color .2s';
      el.addEventListener('pointermove', e => {
        const b = el.getBoundingClientRect();
        const x = (e.clientX - b.left - b.width / 2) * 0.22, y = (e.clientY - b.top - b.height / 2) * 0.3;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }
})();
