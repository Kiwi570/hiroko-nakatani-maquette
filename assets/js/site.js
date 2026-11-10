/* Effets propres à Hiroko Nakatani (direction « La cloche qui chante »). Le socle gère l'ouverture, le voile
   (forme « onde »), l'en-tête, le menu, le mode calme, les boucles et la bibliothèque d'effets.
   Chaque effet propre porte data-effet="nom-du-plan" (liste dans _audit/config.json). */
import { demarrer, etat, versObjet, quand } from './socle/index.js?v=1';
import { Cloche, gestes } from './cloche.js?v=1';
import { son, initSon } from './son.js?v=1';
import { feuilles } from './saison.js?v=1';
import { pinceauMouille, ensos } from './boosts.js?v=1';

const gsap = window.gsap;
const ST = window.ScrollTrigger;
const html = document.documentElement;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const page = html.dataset.page;
let cloche = null;

/* Accueil sur ordinateur : la cloche reste fixe à droite (plan « objet unique »). Décidé avant toute mesure. */
const modeFixe = () => page === 'accueil' && !etat.calme && matchMedia('(min-width: 1000px) and (min-height: 560px)').matches;
if (modeFixe()) html.classList.add('cloche-fixe');

/* ---------- Titres écrits au pinceau (grille wouahou, point 5) ---------- */
function ecrireTitre(h, delai = 0) {
  if (!h || !gsap) return;
  gsap.set(h, { opacity: 1 });
  if (etat.calme) return;
  let split = null;
  try { split = window.SplitText ? new window.SplitText(h, { type: 'lines', linesClass: 'pinceau-ligne' }) : null; } catch { split = null; }
  const lignes = split ? split.lines : [h];
  if (!split) h.classList.add('pinceau-ligne');
  gsap.set(lignes, { '--pm': 0 });
  gsap.set(h, { '--trait': 0 });
  const tl = gsap.timeline({ delay: delai, onComplete: () => { if (split) split.revert(); else h.classList.remove('pinceau-ligne'); h.style.removeProperty('--trait'); } });
  lignes.forEach((l, i) => tl.to(l, { '--pm': 1, duration: 0.75, ease: 'power2.inOut' }, i * 0.28));
  tl.to(h, { '--trait': 1, duration: 0.55, ease: 'power2.out' }, '-=.35');
  return tl;
}

/* Premier écran de chaque page : surtitre, phrase, actions et information clé arrivent après le titre. */
const premierEcran = () => $$('#debut [data-anime="gsap"]').filter((el) => !el.matches('h1'));
function arriverPremierEcran(delai) {
  if (!gsap) return;
  ecrireTitre($('#debut h1'), delai);
  gsap.fromTo(premierEcran(), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: delai + 0.15 });
  $$('[data-trace]').forEach((p, i) => gsap.fromTo(p, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut', delay: delai + 0.1 + i * 0.12 }));
}

/* ---------- Petite cloche : le fil qui relie les sections et les pages (point 4) ---------- */
function filMiniCloche() {
  const mc = $('[data-mini-cloche]');
  if (!mc) return;
  const sections = $$('main > section');
  const n = sections.length;
  const base = mc.getAttribute('aria-label');
  const sonner = () => { if (etat.calme) return; mc.classList.remove('sonne'); void mc.offsetWidth; mc.classList.add('sonne'); };
  let courante = -1;
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      const i = sections.indexOf(e.target);
      if (i === courante) return;
      courante = i;
      mc.style.setProperty('--avance', ((i + 1) / n).toFixed(3));
      mc.setAttribute('aria-label', `${base} · section ${i + 1} sur ${n}`);
      sonner();
    });
  }, { rootMargin: '-48% 0px -48% 0px' });
  sections.forEach((s) => io.observe(s));
  mc.addEventListener('click', () => { sonner(); son.frapper(0.8); if (cloche && html.classList.contains('cloche-fixe') && !html.classList.contains('cloche-partie')) cloche.frapper(0.5, 0.5, 1); });
  /* Sur téléphone, elle suit la barre du bas (masquée sur le pied de page). */
  const barre = $('[data-barre-fixe]');
  if (barre) new MutationObserver(() => mc.classList.toggle('barre-masquee', barre.classList.contains('barre-masquee') && innerWidth < 1000)).observe(barre, { attributes: true, attributeFilter: ['class'] });
}

/* ---------- Goutte : retour physique de l'action principale (point 7) ---------- */
function cibleGoutte() {
  if (cloche && html.classList.contains('cloche-fixe') && !html.classList.contains('cloche-partie')) return $('.accueil-ouverture .cloche-eau');
  const mc = $('[data-mini-cloche]');
  return mc && mc.getBoundingClientRect().width ? mc : null;
}
function lancerGoutte(depuis, { surArrivee } = {}) {
  const cible = cibleGoutte();
  if (!cible || etat.calme) { surArrivee && surArrivee(); return; }
  const a = depuis.getBoundingClientRect(), b = cible.getBoundingClientRect();
  const x0 = a.left + a.width / 2, y0 = a.top + a.height / 2, x1 = b.left + b.width / 2, y1 = b.top + b.height / 2;
  const g = document.createElement('span');
  g.className = 'goutte'; g.setAttribute('aria-hidden', 'true'); g.setAttribute('data-ephemere', ''); g.setAttribute('data-audit-ignorer', '');
  g.style.left = `${x0}px`; g.style.top = `${y0}px`;
  document.body.appendChild(g);
  const dx = x1 - x0, dy = y1 - y0, haut = Math.min(-60, dy * 0.4 - 120);
  const anim = g.animate([
    { transform: 'translate(0, 0) scale(.6)', opacity: 0 },
    { transform: `translate(${dx * 0.5}px, ${haut}px) scale(1.1)`, opacity: 1, offset: 0.45 },
    { transform: `translate(${dx}px, ${dy}px) scale(.8)`, opacity: 1 },
  ], { duration: 820, easing: 'cubic-bezier(.4,0,.3,1)' });
  anim.finished.catch(() => {}).then(() => {
    g.remove();
    if (cible.matches('.cloche-eau') && cloche) cloche.frapper(0.5, 0.5, 1.1);
    else { cible.classList.remove('sonne'); void cible.offsetWidth; cible.classList.add('sonne'); }
    surArrivee && surArrivee();
  });
}
function retours() {
  document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('[data-retour]');
    if (!a) return;
    /* La billetterie s'ouvre dans un nouvel onglet (action normale du lien) ; ici, la goutte et le tampon. */
    const ligneDate = a.closest('.date, .parcours, .saison-date, section');
    lancerGoutte(a, { surArrivee: () => { if (ligneDate && ligneDate.classList.contains('date')) { ligneDate.dataset.recu = 'Billetterie ouverte'; ligneDate.classList.add('est-recue'); } } });
  });
}

/* ---------- Agenda à l'heure de Paris : passé grisé, jour même repéré, prochaine séance ---------- */
function maintenantParis() {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).map((x) => [x.type, x.value]));
  return { jour: `${p.year}-${p.month}-${p.day}`, minutes: Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute) / 60000 };
}
function agendaVivant() {
  const n = maintenantParis();
  $$('[data-date]').forEach((li) => {
    const fin = +li.dataset.fin;
    li.classList.remove('date--avenir', 'date--aujourdhui', 'date--passe');
    li.classList.add(fin && fin < n.minutes ? 'date--passe' : (li.dataset.jour === n.jour || (li.dataset.mardis || '').split(' ').includes(n.jour)) ? 'date--aujourdhui' : 'date--avenir');
  });
  /* Accueil : seules les quatre prochaines dates restent. */
  $$('[data-prochaines]').forEach((ol) => { $$('.date--passe', ol).forEach((li) => li.remove()); });
  /* Agenda : une date passée depuis la génération rejoint les dates passées. */
  const passees = $('.dates-liste--passees');
  if (passees) $$('[data-agenda] .date--passe').forEach((li) => passees.prepend(li));
  $$('[data-mois-groupe]').forEach((g) => g.classList.toggle('est-vide', !$('.date:not(.est-masquee)', g)));
}

function filtresAgenda() {
  const zone = $('[data-filtres]');
  if (!zone) return;
  const vide = $('[data-filtres-vide]');
  const boutons = $$('[data-filtre]', zone);
  const appliquer = (type, anime) => {
    const lignes = $$('[data-agenda] .date');
    const avant = new Map(anime && !etat.calme ? lignes.filter((l) => !l.classList.contains('est-masquee')).map((l) => [l, l.getBoundingClientRect()]) : []);
    boutons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filtre === type)));
    lignes.forEach((l) => l.classList.toggle('est-masquee', type !== 'tout' && l.dataset.type !== type));
    $$('[data-mois-groupe]').forEach((g) => g.classList.toggle('est-vide', !$('.date:not(.est-masquee)', g)));
    if (vide) vide.hidden = lignes.some((l) => !l.classList.contains('est-masquee'));
    /* Le bloc « Prochaine séance » suit le filtre : avec « Marches », il montre la prochaine marche. */
    const premiere = lignes.find((l) => !l.classList.contains('est-masquee') && !l.classList.contains('date--passe'));
    const texte = $('[data-prochaine]'), lien = $('[data-prochaine-lien]'), label = $('[data-prochaine-label]');
    if (premiere && texte) {
      texte.textContent = `${$('.date-meta', premiere).textContent.split(' · ').slice(0, 2).join(', ')} · ${$('.date-titre', premiere).textContent}`;
      if (lien) lien.href = $('.date-reserver', premiere).href;
      if (label) label.textContent = type === 'tout' ? label.dataset.tout : label.dataset.filtreLabel;
    }
    /* La liste se réorganise sous les yeux : chaque date glisse de son ancienne place à la nouvelle. */
    if (avant.size) {
      lignes.filter((l) => !l.classList.contains('est-masquee')).forEach((l, i) => {
        const r0 = avant.get(l), r1 = l.getBoundingClientRect();
        if (r0) l.animate([{ transform: `translate(${r0.left - r1.left}px, ${r0.top - r1.top}px)` }, { transform: 'none' }], { duration: 520, easing: 'cubic-bezier(.22,1,.36,1)' });
        else l.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 420, delay: Math.min(i, 8) * 30, easing: 'ease-out', fill: 'backwards' });
      });
    }
    if (ST) ST.refresh();
  };
  boutons.forEach((b) => b.addEventListener('click', () => {
    const type = b.dataset.filtre;
    const u = new URL(location.href);
    if (type === 'tout') u.searchParams.delete('type'); else u.searchParams.set('type', type);
    history.replaceState(null, '', u);
    appliquer(type, true);
  }));
  const depart = new URLSearchParams(location.search).get('type');
  if (depart && boutons.some((b) => b.dataset.filtre === depart)) appliquer(depart, false);
}

/* ---------- Accueil ---------- */
function accueil() {
  const racine = $('[data-cloche]');
  if (!racine) return;
  cloche = new Cloche(racine, { surEnergie: (E) => racine.style.setProperty('--chant', E.toFixed(3)) });
  gestes(racine, cloche, son);
  const canvasSaison = $('.accueil-ouverture [data-saison]');
  feuilles(canvasSaison, { surEau: (x, y) => cloche && cloche.frapper(x, y, 0.45) });

  /* Kanji écrits au pinceau au défilement : 今, puis 心, puis 念. */
  const traits = $$('[data-kanji] .kanji-trait');
  if (traits.length && gsap && ST && !etat.calme) {
    gsap.set(traits, { strokeDasharray: 1, strokeDashoffset: 1 });
    const tl = gsap.timeline({ scrollTrigger: { trigger: '[data-kanji]', start: 'top 85%', end: 'top 25%', scrub: 0.6 } });
    traits.forEach((t, i) => tl.to(t, { strokeDashoffset: 0, duration: 1, ease: 'none' }, i * 0.75));
  }

  if (!gsap || !ST || etat.calme) return;
  const fixe = html.classList.contains('cloche-fixe');

  /* L'eau de la cloche reflète la section lue. */
  if (fixe) {
    $$('main > section[data-eau]').forEach((s, i) => {
      if (i === 0) return;
      ST.create({ trigger: s, start: 'top 55%', end: 'bottom 55%', onToggle: (self) => { if (self.isActive) cloche.versEau(s.dataset.eau); } });
    });
    ST.create({ trigger: '#debut', start: 'top top', end: 'bottom 55%', onEnterBack: () => cloche.versEau('grok/eau-bois') });
  }
  /* Les quatre pratiques : la carte survolée, touchée ou lue change l'eau. */
  $$('.pratique').forEach((p) => {
    const activer = () => { $$('.pratique').forEach((x) => x.classList.toggle('est-active', x === p)); if (fixe) cloche.versEau(p.dataset.eauCarte); };
    p.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') activer(); });
    p.addEventListener('focusin', activer);
    if (!fixe) ST.create({ trigger: p, start: 'top 60%', end: 'bottom 40%', onToggle: (self) => self.isActive && activer() });
  });

  /* La marche, pas à pas : scène épinglée sur ordinateur, la cloche sonne à chaque arrêt. */
  const scene = $('.marche-scene');
  const etapes = $$('.etape', scene), arrets = $$('.chemin-arret', scene), pas = $('.chemin-pas', scene), trace = $('.chemin-trace', scene);
  const chemin = $('.chemin-trace', scene);
  /* Points du chemin calculés une fois (jamais pendant le défilement). */
  const L = chemin.getTotalLength ? chemin.getTotalLength() : 0;
  const points = L ? Array.from({ length: 61 }, (_, i) => chemin.getPointAtLength((L * i) / 60)) : [];
  gsap.set(trace, { strokeDasharray: 1, '--chemin': 1 });
  let courante = -1;
  const allerA = (i, p) => {
    trace.style.setProperty('--chemin', String(1 - p));
    if (points.length) { const q = points[Math.min(60, Math.round(p * 60))]; pas.setAttribute('cx', q.x.toFixed(1)); pas.setAttribute('cy', q.y.toFixed(1)); }
    if (i === courante) return;
    courante = i;
    etapes.forEach((e, k) => e.classList.toggle('est-active', k === i));
    arrets.forEach((a, k) => a.classList.toggle('est-passe', k <= i));
    if (fixe) { cloche.versEau(etapes[i].dataset.eauEtape); cloche.frapper(0.5, 0.5, 0.9); }
  };
  if (fixe) {
    ST.create({ trigger: scene, start: 'top top', end: 'bottom bottom', onUpdate: (self) => allerA(Math.min(etapes.length - 1, Math.floor(self.progress * etapes.length)), self.progress), onLeaveBack: () => allerA(0, 0) });
    allerA(0, 0);
  } else {
    ST.create({ trigger: scene, start: 'top 70%', end: 'bottom 60%', scrub: 0.4, onUpdate: (self) => allerA(Math.min(etapes.length - 1, Math.floor(self.progress * etapes.length)), self.progress) });
    $('.marche-etapes', scene).dataset.anime = 'cascade';
  }

  /* Plongée : la cloche grandit jusqu'à l'écran, on plonge dans son eau, la cime des arbres apparaît.
     Les plans du bois découpés s'écartent et grandissent : on traverse les branches (profondeur). */
  const plongee = $('#plongee');
  gsap.timeline({ scrollTrigger: { trigger: plongee, start: 'top 85%', end: 'top top', scrub: 0.4 } })
    .fromTo('.plan--hg', { x: 0, y: 0, scale: 1, opacity: 0.95 }, { x: '-38%', y: '-20%', scale: 2.1, opacity: 0, ease: 'power1.in' }, 0)
    .fromTo('.plan--hd', { x: 0, y: 0, scale: 1, opacity: 0.95 }, { x: '40%', y: '-24%', scale: 2.3, opacity: 0, ease: 'power1.in' }, 0)
    .fromTo('.plan--bd', { x: 0, y: 0, scale: 1, opacity: 0.95 }, { x: '36%', y: '30%', scale: 2, opacity: 0, ease: 'power1.in' }, 0);
  const media = $('.plongee-media', plongee);
  if (fixe) {
    let m = null;
    const mesurer = () => {
      const r = $('.accueil-ouverture .cloche-eau').getBoundingClientRect();
      m = { cx: r.left + r.width / 2, cy: r.top + r.height / 2, rw: r.width / 2, vh: innerHeight, vw: document.documentElement.clientWidth };
      m.R = Math.hypot(Math.max(m.cx, m.vw - m.cx), Math.max(m.cy, m.vh - m.cy));
    };
    ST.addEventListener('refreshInit', () => { gsap.set(racine, { scale: 1, opacity: 1 }); mesurer(); });
    mesurer();
    ST.create({ trigger: plongee, start: 'top 95%', onEnter: () => cloche.versEau('grok/eau-plongee'), onLeaveBack: () => cloche.versEau('eau-cerisier') });
    ST.create({
      trigger: plongee, start: 'top 75%', end: 'top top', scrub: 0.3,
      onUpdate: (self) => {
        const p = self.progress, e = p * p * (3 - 2 * p);
        const r = m.rw + (m.R - m.rw) * e;
        gsap.set(racine, { scale: r / m.rw, opacity: p > 0.82 ? 1 - (p - 0.82) / 0.18 : 1 });
        const haut = m.vh * 0.75 * (1 - p);
        media.style.setProperty('--px', `${m.cx}px`);
        media.style.setProperty('--py', `${m.cy - haut}px`);
        media.style.setProperty('--plongee', `${r.toFixed(1)}px`);
        html.classList.toggle('cloche-partie', p > 0.995);
      },
      onLeave: () => { html.classList.add('cloche-partie'); media.style.setProperty('--plongee', '150%'); },
      onEnterBack: () => html.classList.remove('cloche-partie'),
      onLeaveBack: () => { html.classList.remove('cloche-partie'); gsap.set(racine, { scale: 1, opacity: 1 }); media.style.setProperty('--plongee', `${m.rw}px`); },
    });
    media.style.setProperty('--plongee', `${m.rw}px`);
  } else {
    gsap.fromTo(media, { '--plongee': '12%' }, { '--plongee': '150%', ease: 'none', scrollTrigger: { trigger: plongee, start: 'top 85%', end: 'top 15%', scrub: 0.3 } });
  }
}

/* ---------- Marches : feuilles de saison sur l'ouverture ---------- */
function marches() {
  feuilles($('.m-ouverture [data-saison]'));
  if (!gsap || !ST || etat.calme) return;
  if (etat.arrivee !== 'retour') $$('[data-trace]').forEach((p) => gsap.set(p, { strokeDasharray: 1, strokeDashoffset: 1 }));
  gsap.to('.plan-rond svg', { rotate: -8, ease: 'none', scrollTrigger: { trigger: '.m-ouverture', start: 'top top', end: 'bottom top', scrub: 0.4 } });
}

/* ---------- Ateliers : l'anneau des thèmes tourne, le centre respire et change de forme ---------- */
function ateliers() {
  if (!gsap || !ST || etat.calme) return;
  const anneau = $('[data-anneau]');
  if (!anneau) return;
  const centre = $('.anneau-centre', anneau);
  gsap.fromTo(anneau, { '--rotation': '0deg' }, { '--rotation': '-36deg', ease: 'none', scrollTrigger: { trigger: '.a-ouverture', start: 'top top', end: 'bottom top', scrub: 0.5 } });
  gsap.fromTo(centre, { borderRadius: '47% 53% 51% 49% / 52% 48% 52% 48%', scale: 1 }, { borderRadius: '58% 42% 38% 62% / 44% 60% 40% 56%', scale: 0.92, ease: 'none', scrollTrigger: { trigger: '.a-ouverture', start: 'top top', end: 'bottom top', scrub: 0.5 } });
}

/* ---------- MBSR : on descend d'un palier par semaine ---------- */
function mbsr() {
  const scene = $('.b-plongee');
  if (!scene) return;
  const paliers = $$('.palier', scene);
  if (!gsap || !ST || etat.calme) { paliers.forEach((p) => p.classList.add('est-atteint')); return; }
  ST.create({ trigger: scene, start: 'top top', end: 'bottom bottom', onUpdate: (self) => {
    const n = Math.min(8, Math.floor(self.progress * 8.4) + (self.progress > 0.02 ? 1 : 0));
    paliers.forEach((p, i) => p.classList.toggle('est-atteint', i < n));
    scene.style.setProperty('--profondeur', self.progress.toFixed(3));
  } });
  gsap.fromTo('.b-plongee-media img', { scale: 1.02, yPercent: 0 }, { scale: 1.16, yPercent: 4, ease: 'none', scrollTrigger: { trigger: scene, start: 'top top', end: 'bottom bottom', scrub: 0.4 } });
}

/* ---------- Contact : formulaire en trois temps, le message part en goutte ---------- */
function contact() {
  const f = $('[data-etapes]');
  if (!f) return;
  const etapes = $$('[data-etape-form]', f), fil = $$('.etapes-fil li', f);
  const msg = $('[data-message-envoi]', f);
  if (msg) msg.dataset.texte = msg.textContent.trim();
  let i = 0;
  const montrer = (k) => {
    i = k;
    etapes.forEach((e, n) => e.classList.toggle('est-active', n === k));
    fil.forEach((l, n) => { l.classList.toggle('est-active', n === k); l.classList.toggle('est-faite', n < k); });
    const champ = $('input, textarea', etapes[k]);
    champ && champ.focus({ preventScroll: true });
    if (ST) ST.refresh();
  };
  const valide = (k) => {
    let ok = true;
    $$('input[required], textarea[required]', etapes[k]).forEach((c) => {
      const groupe = c.type === 'radio' ? $$(`input[name="${c.name}"]`, f) : [c];
      const plein = c.type === 'radio' ? groupe.some((x) => x.checked) : (c.value || '').trim().length >= (+c.getAttribute('minlength') || 1);
      let p = $(`#erreur-etape-${c.name}`, f);
      if (!plein) {
        ok = false;
        if (!p) { p = document.createElement('p'); p.id = `erreur-etape-${c.name}`; p.className = 'champ-erreur'; p.setAttribute('aria-live', 'polite'); (c.closest('.champ') || c.closest('.choix') || c.parentElement).after(p); }
        p.textContent = c.type === 'radio' ? 'Choisissez un sujet.' : c.name === 'message' ? 'Écrivez quelques mots (10 caractères au moins).' : 'Ce champ est à remplir.';
        groupe.forEach((x) => x.setAttribute('aria-invalid', 'true'));
      } else if (p) { p.textContent = ''; groupe.forEach((x) => x.removeAttribute('aria-invalid')); }
    });
    return ok;
  };
  $$('[data-suivant]', f).forEach((b) => b.addEventListener('click', () => { if (valide(i)) montrer(Math.min(etapes.length - 1, i + 1)); }));
  $$('[data-precedent]', f).forEach((b) => b.addEventListener('click', () => montrer(Math.max(0, i - 1))));
  f.addEventListener('submit', () => {
    requestAnimationFrame(() => {
      if (msg && !msg.hidden) { f.classList.add('est-envoye'); lancerGoutte($('[type="submit"]', f)); }
    });
  });
  /* Sujet prérempli par l'adresse (?sujet=mbsr) : on passe directement au message. */
  if (new URLSearchParams(location.search).get('sujet') && $('input[name="sujet"]:checked', f)) montrer(1);
}

/* ---------- Démarrage ---------- */
demarrer({
  preparer() {
    initSon();
    pinceauMouille();
    ensos(() => { const mc = $('[data-mini-cloche]'); if (mc) { mc.classList.remove('sonne'); void mc.offsetWidth; mc.classList.add('sonne'); } son.frapper(0.7); });
    filMiniCloche();
    retours();
    agendaVivant();
    filtresAgenda();
    if (page === 'accueil') accueil();
    if (page === 'marches') marches();
    if (page === 'ateliers') ateliers();
    if (page === 'mbsr') mbsr();
    if (page === 'contact') contact();
    if (page === '404') $$('[data-mini-cloche]').forEach((m) => m.classList.add('sonne'));
    /* Passage ordinateur ↔ tablette sur l'accueil : la mise en page de la cloche change, on recharge proprement. */
    if (page === 'accueil') {
      let avant = modeFixe();
      matchMedia('(min-width: 1000px) and (min-height: 560px)').addEventListener('change', () => { if (modeFixe() !== avant) { avant = modeFixe(); location.reload(); } });
    }
  },
  pret: [new Promise((ok) => { const f = () => ok(); if (document.readyState === 'complete') ok(); else addEventListener('load', f, { once: true }); setTimeout(ok, 1200); }).then(() => cloche && cloche.pret)],
  /* Intro (moins de 3 s) : l'ensō du logo se trace, le kanji s'écrit, puis le logo tombe comme une goutte
     dans l'eau de la cloche (objet d'ouverture) et la page s'ouvre en onde depuis elle. */
  jouer() {
    if (!gsap) return null;
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.fromTo('.ouverture-enso', { '--enso': '0deg' }, { '--enso': '360deg', duration: 0.7, ease: 'power1.inOut' }, 0.05)
      .fromTo('.ouverture-kanji', { '--encre-p': '0%' }, { '--encre-p': '112%', duration: 0.5, ease: 'power1.in' }, 0.3)
      .fromTo('.ouverture-nom, .ouverture-ligne', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.06 }, 0.35)
      .to('.ouverture-nom, .ouverture-ligne', { opacity: 0, duration: 0.2 }, 0.85);
    versObjet(tl, { a: 0.95, duree: 0.5, ouverture: 0.8 });
    tl.call(() => { if (cloche) cloche.frapper(0.5, 0.5, 1.3); }, null, 1.45);
    tl.call(() => arriverPremierEcran(0), null, 1.5);
    return tl;
  },
  etatFinal() {
    if (!gsap) return;
    gsap.set(premierEcran(), { clearProps: 'opacity,transform' });
    $$('#debut h1').forEach((h) => { gsap.set(h, { opacity: 1 }); h.style.removeProperty('--trait'); });
    $$('[data-trace]').forEach((p) => gsap.set(p, { strokeDashoffset: 0 }));
    $$('[data-kanji] .kanji-trait').forEach((t) => gsap.set(t, { strokeDashoffset: 0 }));
  },
  arrivee() { arriverPremierEcran(0.15); },
});

quand('pret', () => { if (etat.calme) $$('.palier').forEach((p) => p.classList.add('est-atteint')); });
