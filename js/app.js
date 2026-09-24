/* =========================================================
   BEMA Studio — lógica del sitio
   ---------------------------------------------------------
   - Navegación entre páginas (#/ruta)
   - Selector de idioma ES / EN (se guarda en el navegador)
   - Menú móvil
   - Validación del formulario de contacto
   Requiere js/content.js cargado antes.
   ========================================================= */
(function(){
const I18N = window.BEMA_CONTENT;
const PROJECTS = window.BEMA_PROJECTS || [];

/* ===================== íconos ===================== */
const ICON = {
  web:'<rect x="3" y="4" width="22" height="19" rx="3"/><line x1="3" y1="9.5" x2="25" y2="9.5"/><line x1="8" y1="15" x2="16" y2="15"/>',
  brand:'<path d="M14 3 L25 14 L14 25 L3 14 Z"/><circle cx="14" cy="14" r="3.5"/>',
  mkt:'<polyline points="3,21 10,14 15,18 25,7"/><polyline points="18,7 25,7 25,14"/>'
};
const ARROW = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="6" y1="18" x2="18" y2="6"/><polyline points="8,6 18,6 18,16"/></svg>';
const CHECK = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="4,12 10,18 20,6"/></svg>';
const PLUS = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
const BLOCKS = cls => `<svg class="${cls||''}" viewBox="0 0 106 106" aria-hidden="true"><rect class="blk-a" x="2" y="74" width="30" height="30" rx="5"/><rect class="blk-a" x="38" y="38" width="30" height="30" rx="5"/><rect class="blk-b" x="74" y="2" width="30" height="30" rx="5"/></svg>`;
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ===================== idioma ===================== */
const LANG_KEY = 'bema-lang';
function initialLang(){
  const q = new URLSearchParams(location.search).get('lang');
  if(q === 'es' || q === 'en') return q;
  try { const s = localStorage.getItem(LANG_KEY); if(s === 'es' || s === 'en') return s; } catch(e){}
  return (navigator.language || 'es').toLowerCase().startsWith('en') ? 'en' : 'es';
}
let lang = initialLang();
let T = I18N[lang];

/* ===================== vistas ===================== */
function cta(next){
  return `<section class="grid cta-row">
    <div class="cell c-panel cta-main">
      <div class="txt"><h2>${T.cta[0]}</h2><p class="lead">${T.cta[1]}</p></div>
      <a class="btn btn-accent" href="#/contacto">${T.cta[2]}</a>
    </div>
    <a class="cell c-card next" href="#${next}"><span class="eyebrow">${T.next}</span><strong>${T.nav[next]} →</strong></a>
  </section>`;
}

function home(){
  const h = T.home, steps = T.process.steps;
  return `
  <section class="grid home-hero" aria-labelledby="h-home">
    <div class="cell c-accent big">
      <p class="eyebrow">${h.eyebrow}</p>
      <h1 id="h-home">${h.h1}</h1>
      <div class="hero-foot"><a class="btn btn-dark" href="#/contacto">${h.btn}</a><p>${h.sub}</p></div>
    </div>
    <div class="cell c-panel hero-mark">${BLOCKS('stack')}</div>
    <div class="cell c-card tagcell">
      <p class="serif">Build &amp; Evolve.</p>
      <div class="chips">${h.chips.map(c=>`<span>${c}</span>`).join('')}</div>
    </div>
  </section>
  <section class="grid home-services" aria-label="${T.nav['/sitios-web']}, ${T.nav['/branding']}, ${T.nav['/marketing']}">
    <a class="cell c-panel svc svc-web span2" href="#/sitios-web">
      <p class="eyebrow">${h.web[0]}</p>
      <div class="svc-row"><h2>${h.web[1]}</h2><span class="round-go">${ARROW}</span></div>
    </a>
    <a class="cell c-card svc" href="#/branding">
      <p class="eyebrow">${h.brand[0]}</p>
      <div class="svc-body"><h2>${h.brand[1]}</h2><p class="soft">${h.brand[2]}</p><span class="link" style="text-decoration:underline">${h.more}</span></div>
    </a>
    <a class="cell c-card svc" href="#/marketing">
      <p class="eyebrow">${h.mkt[0]}</p>
      <div class="svc-body"><h2>${h.mkt[1]}</h2><p class="soft">${h.mkt[2]}</p><span class="link" style="text-decoration:underline">${h.more}</span></div>
    </a>
    <div class="cell c-sand proc span2">
      <div class="proc-top"><p class="eyebrow soft">${h.how}</p><a class="link" href="#/proceso">${h.howLink}</a></div>
      <ol class="steps4" style="list-style:none;margin:0;padding:0">
        ${steps.map((s,i)=>`<li class="step"><span class="num${i===3?' hl':''}">${i+1}</span>${s[0]}</li>`).join('')}
      </ol>
    </div>
  </section>
  ${workSection()}
  <section class="cell c-panel final" aria-labelledby="h-final">
    <div class="final-text"><h2 id="h-final">${h.final}</h2><p class="lead">${h.finalSub}</p></div>
    <div class="final-side"><a class="btn btn-accent" href="#/contacto">${h.write}</a><span class="soft">${h.email}</span></div>
  </section>`;
}

function service(path){
  const d = T.services[path];
  return `
  <section class="grid page-hero">
    <div class="cell c-panel main">
      <div class="hero-top"><p class="eyebrow">${d.n} · ${d.name}</p><a class="back" href="#/">${T.back}</a></div>
      <h1>${d.h1}</h1>
      <p class="lead">${d.lead}</p>
    </div>
    <div class="cell c-accent icon-cell"><svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[d.icon]}</svg></div>
  </section>
  <h2 class="sec-title">${T.included}</h2>
  <section class="grid inc">
    ${d.inc.map((x,i)=>`<div class="cell c-card"><span class="inc-n">${String(i+1).padStart(2,'0')}</span><div><h3>${x[0]}</h3><p class="soft">${x[1]}</p></div></div>`).join('')}
  </section>
  <section class="grid two">
    <div class="cell c-sand"><h2>${T.forWho}</h2><ul class="checks">${d.ideal.map(t=>`<li>${CHECK}<span>${t}</span></li>`).join('')}</ul></div>
    <div class="cell c-card"><h2>${T.faq}</h2><div class="faq">${d.faq.map((q,i)=>`<details${i===0?' open':''}><summary>${q[0]}${PLUS}</summary><p>${q[1]}</p></details>`).join('')}</div></div>
  </section>
  ${examplesSection(path)}
  ${cta(d.next)}`;
}

function proceso(){
  const p = T.process;
  return `
  <section class="grid page-hero">
    <div class="cell c-panel main">
      <div class="hero-top"><p class="eyebrow">${p.eyebrow}</p><a class="back" href="#/">${T.back}</a></div>
      <h1>Build <span class="serif" style="color:var(--accent)">&amp;</span> Evolve.</h1>
      <p class="lead">${p.lead}</p>
    </div>
    <div class="cell c-sand icon-cell">${BLOCKS('stack')}</div>
  </section>
  <ol class="grid steps-big" style="list-style:none;margin:0;padding:0">
    ${p.steps.map((s,i)=>`<li class="cell c-card"><span class="num lg${i===3?' hl':''}">${i+1}</span><div><h2>${s[0]}</h2><p class="soft">${s[1]}</p><p class="you">${s[2]}</p></div></li>`).join('')}
  </ol>
  <section class="cell c-accent after"><h2>${p.after[0]}</h2><p>${p.after[1]}</p></section>
  ${cta('/contacto')}`;
}

function contacto(){
  const c = T.contact, f = c.f;
  const field = (key, type, extra) => `<label class="field"${extra||''}>${f[key][0]}<input name="${key}" type="${type}" placeholder="${esc(f[key][1])}"${type==='email'?' autocomplete="email"':''}${key==='name'?' autocomplete="name"':''}${key==='phone'?' autocomplete="tel"':''}>${extra?'<span class="err" aria-live="polite"></span>':''}</label>`;
  return `
  <section class="grid contact">
    <div class="cell c-accent hi"><a class="back" href="#/">${T.back}</a><h1>${c.h1}</h1></div>
    <div class="cell c-card form" id="formCell">
      <h2>${c.title}</h2>
      <form id="contactForm" novalidate style="display:flex;flex-direction:column;gap:22px">
        <div class="fields">
          ${field('name','text',' data-f="name"')}
          ${field('email','email',' data-f="email"')}
          ${field('phone','tel')}
          ${field('business','text')}
        </div>
        <fieldset><legend>${c.need}</legend><div class="opts">${c.opts.map(o=>`<label class="opt"><input type="checkbox" name="need" value="${esc(o)}">${o}</label>`).join('')}</div></fieldset>
        <label class="field">${f.message[0]}<textarea name="message" placeholder="${esc(f.message[1])}"></textarea></label>
        <button class="btn btn-dark" type="submit">${c.send}</button>
      </form>
    </div>
    <div class="cell c-panel direct"><p class="eyebrow">${c.direct}</p><div class="direct-lines"><span>${c.email}</span><span>${c.phone}</span><span class="soft" style="font-size:16px;font-weight:600">Bryan &amp; Emanuel · Texas</span></div></div>
  </section>
  <h2 class="sec-title">${c.after}</h2>
  <ol class="grid after3" style="list-style:none;margin:0;padding:0">
    ${c.steps.map((s,i)=>`<li class="cell c-card"><span class="num">${i+1}</span><div><h3>${s[0]}</h3><p class="soft">${s[1]}</p></div></li>`).join('')}
  </ol>`;
}

/* ===================== proyectos ===================== */
const CAT_KEYS = ['web','brand','mkt'];
const SERVICE_CAT = {'/sitios-web':'web','/branding':'brand','/marketing':'mkt'};
const TONES = ['t-panel','t-accent','t-sand'];
function pText(p){ return p[lang] || {}; }
function shot(src, label, tone){
  if(src) return `<div class="shot"><img src="${esc(src)}" alt="" loading="lazy"></div>`;
  return `<div class="shot ${tone}" role="img" aria-label="${esc(label)}"><span class="shot-bar"><i></i><i></i><i></i></span><span class="shot-label">${label}</span></div>`;
}
function catChips(p){
  const f = T.projectsPage.filters;
  return `<div class="tags">${p.cats.map(c=>`<span>${f[c]}</span>`).join('')}</div>`;
}
function projCard(p, i, big){
  const t = pText(p);
  return `<a class="cell c-card proj${big?' proj-big':''}" href="#/proyectos/${p.id}">
    ${shot(p.shot, T.caseLabels.shot, TONES[i % 3])}
    <div class="proj-meta">
      <p class="eyebrow">${t.type || ''}</p>
      <h3>${p.name}</h3>
      ${t.summary ? `<p class="soft">${t.summary}</p>` : ''}
      ${catChips(p)}
    </div>
  </a>`;
}
function workSection(){
  const w = T.work, list = PROJECTS.slice(0,3);
  if(!list.length) return '';
  return `
  <section class="work" aria-labelledby="h-work">
    <div class="work-head">
      <div><p class="eyebrow soft">${w.eyebrow}</p><h2 id="h-work" class="sec-title" style="padding-top:8px">${w.title}</h2></div>
      <a class="link" href="#/proyectos" style="text-decoration:underline">${w.all}</a>
    </div>
    <div class="grid work-grid">
      ${list.map((p,i)=>projCard(p,i,i===0)).join('')}
    </div>
  </section>`;
}
function examplesSection(path){
  const cat = SERVICE_CAT[path];
  const list = PROJECTS.filter(p=>p.cats.includes(cat)).slice(0,2);
  if(!list.length) return '';
  return `
  <section aria-labelledby="h-ex">
    <div class="work-head"><h2 id="h-ex" class="sec-title">${T.examples}</h2><a class="link" href="#/proyectos" style="text-decoration:underline">${T.work.all}</a></div>
    <div class="grid ex-grid">${list.map((p,i)=>projCard(p, PROJECTS.indexOf(p), false)).join('')}</div>
  </section>`;
}
let projFilter = 'all';
function proyectos(){
  const pp = T.projectsPage;
  const icon = '<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="10" height="10" rx="2"/><rect x="15" y="3" width="10" height="10" rx="2"/><rect x="3" y="15" width="10" height="10" rx="2"/><rect x="15" y="15" width="10" height="10" rx="2"/></svg>';
  return `
  <section class="grid page-hero">
    <div class="cell c-panel main">
      <div class="hero-top"><p class="eyebrow">${pp.eyebrow}</p><a class="back" href="#/">${T.back}</a></div>
      <h1>${pp.h1}</h1>
      <p class="lead">${pp.lead}</p>
    </div>
    <div class="cell c-accent icon-cell">${icon}</div>
  </section>
  <div class="filters" role="group" aria-label="${pp.eyebrow}">
    ${['all',...CAT_KEYS].map(k=>`<button type="button" data-filter="${k}" aria-pressed="${k===projFilter}">${pp.filters[k]}</button>`).join('')}
  </div>
  <section class="grid proj-grid" id="projGrid" aria-live="polite">${projGridHTML()}</section>
  ${cta('/contacto')}`;
}
function projGridHTML(){
  const list = PROJECTS.map((p,i)=>[p,i]).filter(([p])=>projFilter==='all' || p.cats.includes(projFilter));
  if(!list.length) return `<p class="soft" style="grid-column:1/-1;padding:24px 0">${T.projectsPage.empty}</p>`;
  return list.map(([p,i])=>projCard(p,i,false)).join('');
}
function bindFilters(){
  document.querySelectorAll('.filters button').forEach(b => b.addEventListener('click', () => {
    projFilter = b.dataset.filter;
    document.querySelectorAll('.filters button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    document.getElementById('projGrid').innerHTML = projGridHTML();
  }));
}
function caso(id){
  const i = PROJECTS.findIndex(p=>p.id===id);
  const p = PROJECTS[i], t = pText(p), L = T.caseLabels, f = T.projectsPage.filters;
  const next = PROJECTS[(i+1) % PROJECTS.length];
  const did = (t.did && t.did.length) ? t.did : L.phDid;
  return `
  <section class="grid page-hero">
    <div class="cell c-panel main">
      <div class="hero-top"><p class="eyebrow">${t.type || ''}</p><a class="back" href="#/proyectos">${L.back}</a></div>
      <h1>${p.name}</h1>
      <p class="lead">${t.summary || L.phSummary}</p>
    </div>
    <div class="cell c-card case-facts">
      <div><p class="eyebrow soft">${L.services}</p><div class="tags" style="margin-top:12px">${p.cats.map(c=>`<span>${f[c]}</span>`).join('')}</div></div>
      <div><p class="eyebrow soft">${L.year}</p><p class="fact">${p.year || L.phYear}</p></div>
      <div><p class="eyebrow soft">${L.place}</p><p class="fact">${p.place || L.phPlace}</p></div>
    </div>
  </section>
  <div class="case-shot">${shot(p.shot, L.shot, TONES[i % 3])}</div>
  <section class="grid case-three">
    <div class="cell c-card"><p class="eyebrow soft">01</p><h2>${L.challenge}</h2><p class="soft">${t.challenge || L.phChallenge}</p></div>
    <div class="cell c-sand"><p class="eyebrow soft">02</p><h2>${L.did}</h2><ul class="checks small">${did.map(x=>`<li>${CHECK}<span>${x}</span></li>`).join('')}</ul></div>
    <div class="cell c-card"><p class="eyebrow soft">03</p><h2>${L.result}</h2><p class="soft">${t.result || L.phResult}</p></div>
  </section>
  <h2 class="sec-title">${L.beforeAfter}</h2>
  <section class="grid two ba">
    <figure><figcaption class="eyebrow soft">${L.before}</figcaption>${shot(p.before, L.shotBefore, 't-sand')}</figure>
    <figure><figcaption class="eyebrow soft">${L.after}</figcaption>${shot(p.after, L.shotAfter, 't-panel')}</figure>
  </section>
  <section class="cell c-accent quote">
    <p class="eyebrow">${L.quote}</p>
    <blockquote><p class="serif">“${t.quote || L.phQuote}”</p><footer>${t.author || L.phAuthor}</footer></blockquote>
  </section>
  <section class="grid cta-row">
    <div class="cell c-panel cta-main">
      <div class="txt"><h2>${T.cta[0]}</h2><p class="lead">${T.cta[1]}</p></div>
      <a class="btn btn-accent" href="#/contacto">${T.cta[2]}</a>
    </div>
    <a class="cell c-card next" href="#/proyectos/${next.id}"><span class="eyebrow">${L.next}</span><strong>${next.name} →</strong></a>
  </section>`;
}

/* ===================== formulario ===================== */
function bindForm(){
  const f = document.getElementById('contactForm'); if(!f) return;
  const c = T.contact;
  f.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    const set = (key, msg) => { const w = f.querySelector(`[data-f="${key}"]`); w.classList.toggle('bad', !!msg); w.querySelector('.err').textContent = msg || ''; if(msg) ok = false; };
    const name = f.elements.name.value.trim(), email = f.elements.email.value.trim();
    set('name', name ? '' : c.errName);
    set('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : c.errEmail);
    if(!ok){ f.querySelector('.bad input').focus(); return; }
    /* AQUÍ se conectará el envío real del formulario (email o servicio de formularios). */
    const cell = document.getElementById('formCell');
    cell.innerHTML = `<div class="sent" style="display:flex;flex-direction:column"><span class="num lg hl">${CHECK}</span><h2 tabindex="-1">${c.thanks(esc(name.split(' ')[0]))}</h2><p class="lead soft">${c.thanksSub(esc(email))}</p><a class="link" href="#/">${T.back.replace('← ','')}</a></div>`;
    cell.querySelector('h2').focus();
  });
}

/* ===================== navegación ===================== */
const VIEWS = {'/':home,'/proceso':proceso,'/contacto':contacto,'/proyectos':proyectos};
const main = document.getElementById('main');
const pills = document.getElementById('pills');
const menuLinks = document.getElementById('menuLinks');
const menu = document.getElementById('menu');
const openBtn = document.getElementById('menuOpen');
const DESKTOP_NAV = ['/sitios-web','/branding','/marketing','/proyectos','/proceso'];
const MOBILE_NAV = ['/','/sitios-web','/branding','/marketing','/proyectos','/proceso'];

function currentPath(){
  const p = location.hash.replace(/^#/,'') || '/';
  if(p.startsWith('/proyectos/') && PROJECTS.some(x => '/proyectos/'+x.id === p)) return p;
  return (VIEWS[p] || T.services[p]) ? p : '/';
}
function navHTML(list, cur, mobile){
  return list.map(p => `<a href="#${p}"${p===cur?' aria-current="page"':''}>${T.nav[p]}${mobile?'<span aria-hidden="true">→</span>':''}</a>`).join('');
}
function applyStatic(){
  document.documentElement.lang = T.htmlLang;
  document.querySelector('meta[name="description"]').setAttribute('content', T.metaDesc);
  document.querySelectorAll('[data-t]').forEach(el => { el.textContent = T[el.dataset.t]; });
  document.querySelectorAll('[data-t-label]').forEach(el => { el.setAttribute('aria-label', T[el.dataset.tLabel]); });
  document.querySelectorAll('.lang').forEach(g => {
    g.innerHTML = ['es','en'].map(l => `<button type="button" data-lang="${l}" aria-pressed="${l===lang}" lang="${l}" aria-label="${l==='es'?'Español':'English'}">${l.toUpperCase()}</button>`).join('');
  });
}
function route(opts){
  const path = currentPath();
  const caseId = path.startsWith('/proyectos/') ? path.slice(11) : null;
  main.innerHTML = caseId ? caso(caseId) : T.services[path] ? service(path) : VIEWS[path]();
  const navPath = caseId ? '/proyectos' : path;
  pills.innerHTML = navHTML(DESKTOP_NAV, navPath, false);
  menuLinks.innerHTML = navHTML(MOBILE_NAV, navPath, true);
  document.title = path === '/' ? T.metaTitle : caseId ? `${PROJECTS.find(p=>p.id===caseId).name} · BEMA Studio` : `${T.nav[path]} · BEMA Studio`;
  if(!(opts && opts.keepScroll)){ closeMenu(false); window.scrollTo(0,0); if(route.ran) main.focus({preventScroll:true}); }
  route.ran = true;
  bindForm();
  bindFilters();
}
function setLang(l){
  if(l === lang) return;
  lang = l; T = I18N[l];
  try { localStorage.setItem(LANG_KEY, l); } catch(e){}
  applyStatic();
  route({keepScroll:true});
}
document.addEventListener('click', e => {
  const b = e.target.closest('.lang button');
  if(b){ setLang(b.dataset.lang); const again = document.querySelector(`${menu.classList.contains('open') ? '.menu' : '.site-head'} .lang button[data-lang="${lang}"]`); if(again) again.focus(); }
});
function openMenu(){ menu.classList.add('open'); openBtn.setAttribute('aria-expanded','true'); document.body.style.overflow='hidden'; document.getElementById('menuClose').focus(); }
function closeMenu(returnFocus){ if(!menu.classList.contains('open')) return; menu.classList.remove('open'); openBtn.setAttribute('aria-expanded','false'); document.body.style.overflow=''; if(returnFocus) openBtn.focus(); }
openBtn.addEventListener('click', openMenu);
document.getElementById('menuClose').addEventListener('click', () => closeMenu(true));
menu.addEventListener('keydown', e => { if(e.key === 'Escape') closeMenu(true); });
menu.addEventListener('click', e => { if(e.target.closest('a')) closeMenu(false); });
window.addEventListener('hashchange', () => route());
applyStatic();
route();
})();
