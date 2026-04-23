(() => {

  /* ---------- i18n ---------- */
  const SUPPORTED = ['ru','en','no'];
  const saved = localStorage.getItem('glu_lang');
  const initial = SUPPORTED.includes(saved) ? saved
                : (navigator.language || 'ru').slice(0,2).toLowerCase();
  const startLang = SUPPORTED.includes(initial) ? initial : 'ru';

  const setLang = (lang) => {
    if (!SUPPORTED.includes(lang)) return;
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('.lang button').forEach(b => {
      b.setAttribute('aria-current', b.dataset.lang === lang ? 'true' : 'false');
    });
    localStorage.setItem('glu_lang', lang);
  };
  setLang(startLang);

  document.querySelectorAll('.lang button').forEach(b => {
    b.addEventListener('click', () => setLang(b.dataset.lang));
  });

  /* ---------- Boot sequence ---------- */
  const boot = document.getElementById('boot');
  const log  = document.getElementById('bootLog');
  const BOOT_LINES = {
    ru: [
      ['GLUSHKOV BIOS v2026.04 (C) 1978—2026', ''],
      ['Тест памяти ............................. 2048 МБ', 'ok'],
      ['Основной диск ........................... ОМСК→ГИТИС', 'ok'],
      ['Вторичный диск .......................... МОСКВА·NYC·ОСЛО', 'ok'],
      ['Модуль хореографии ...................... ONLINE', 'ok'],
      ['Модуль пластики ......................... ЗАГРУЖЕН', 'ok'],
      ['Мастерская: КУДРЯШОВ .................... OK', 'ok'],
      ['Мастерская: КАМЕНЬКОВИЧ/КРЫМОВ .......... OK', 'ok'],
      ['Мастерская: ЖЕНОВАЧ ..................... OK', 'ok'],
      ['Линк MET OPERA .......................... AIDA · 2024/25', 'warn'],
      ['HEDDA · НОРВЕГИЯ ........................ НОМИНИРОВАН', 'warn'],
      ['Нажмите ENTER для продолжения или ждите…', '']
    ],
    en: [
      ['GLUSHKOV BIOS v2026.04 (C) 1978—2026', ''],
      ['Memory Test ............................. 2048 MB', 'ok'],
      ['Primary drive ........................... OMSK→GITIS', 'ok'],
      ['Secondary drive ......................... MOSCOW·NYC·OSLO', 'ok'],
      ['Choreography engine ..................... ONLINE', 'ok'],
      ['Movement module ......................... LOADED', 'ok'],
      ['Workshop: KUDRYASHOV .................... OK', 'ok'],
      ['Workshop: KAMENKOVICH/KRYMOV ............ OK', 'ok'],
      ['Workshop: ZHENOVACH ..................... OK', 'ok'],
      ['MET OPERA link .......................... AIDA · 2024/25', 'warn'],
      ['HEDDA · NORWAY .......................... NOMINATED', 'warn'],
      ['Press ENTER to continue or wait…', '']
    ],
    no: [
      ['GLUSHKOV BIOS v2026.04 (C) 1978—2026', ''],
      ['Minnetest ............................... 2048 MB', 'ok'],
      ['Hoveddisk ............................... OMSK→GITIS', 'ok'],
      ['Sekundærdisk ............................ MOSKVA·NYC·OSLO', 'ok'],
      ['Koreografimotor ......................... ONLINE', 'ok'],
      ['Bevegelsesmodul ......................... LASTET', 'ok'],
      ['Verksted: KUDRJASJOV .................... OK', 'ok'],
      ['Verksted: KAMENKOVITSJ/KRYMOV ........... OK', 'ok'],
      ['Verksted: ZJENOVATSJ .................... OK', 'ok'],
      ['MET OPERA-lenke ......................... AIDA · 2024/25', 'warn'],
      ['HEDDA · NORGE ........................... NOMINERT', 'warn'],
      ['Trykk ENTER for å fortsette eller vent…', '']
    ]
  };

  const lines = BOOT_LINES[document.documentElement.lang] || BOOT_LINES.ru;
  let i = 0;
  const step = () => {
    if (i >= lines.length) { setTimeout(finish, 450); return; }
    const [text, cls] = lines[i++];
    const el = document.createElement('div');
    el.className = 'ln ' + (cls || '');
    el.textContent = '> ' + text;
    log.appendChild(el);
    setTimeout(step, 150 + Math.random()*110);
  };
  const finish = () => boot.classList.add('done');
  setTimeout(step, 180);

  const skip = () => { boot.classList.add('done'); };
  document.addEventListener('keydown', skip, {once:true});
  boot.addEventListener('click', skip, {once:true});

  /* ---------- Clock ---------- */
  const clock = document.getElementById('clock');
  const pad = n => String(n).padStart(2,'0');
  const tick = () => {
    const d = new Date();
    clock.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };
  tick(); setInterval(tick, 1000);

  /* ---------- Tabs ---------- */
  const tabs = document.querySelectorAll('.tab');
  const pages = document.querySelectorAll('.page');
  const activate = (target) => {
    tabs.forEach(t => {
      const on = t.dataset.target === target;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    pages.forEach(p => p.classList.toggle('active', p.id === target));
    window.scrollTo({top:0, behavior:'smooth'});
  };
  tabs.forEach(t => t.addEventListener('click', () => activate(t.dataset.target)));

  document.querySelectorAll('[data-jump]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      activate(a.dataset.jump);
    });
  });

  /* ---------- F-keys ---------- */
  const keyMap = {
    F1:'main', F2:'bio', F3:'theatre', F4:'film',
    F5:'opera', F6:'teaching', F7:'press', F10:'exit'
  };
  document.addEventListener('keydown', e => {
    if (keyMap[e.key]) { e.preventDefault(); activate(keyMap[e.key]); }
    if (e.key === 'Escape') activate('main');
  });
})();
