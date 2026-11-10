/* Effets propres à Hiroko Nakatani (direction « La cloche qui chante »). Le socle gère l'ouverture, le voile
   (forme « onde »), l'en-tête, le menu, le mode calme, les boucles et la bibliothèque d'effets.
   Chaque effet propre porte data-effet="nom-du-plan" (liste dans _audit/config.json). */
import { demarrer, etat, versObjet, quand, boucle } from './socle/index.js?v=2';
import { Cloche, gestes } from './cloche.js?v=2';
import { son, initSon } from './son.js?v=2';
import { feuilles } from './saison.js?v=2';
import { pinceauMouille, ensos } from './boosts.js?v=2';
import { anneaux } from './socle/voile.js?v=2';
import { maintenantParis, comptes, motsEncre, poussiere, refletMiniCloche, bulles, ecrireCompte, seanceDeLigne, libelleLigne, prochaineLigne } from './vivant.js?v=2';

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
  motsEncre(h, delai + 0.45 + lignes.length * 0.2);
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
      refletMiniCloche(mc, e.target);
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
    if (a.matches('.date .date-reserver, [data-prochaine-lien]') && $('[data-recap]') && $('[data-recap]').showModal) return;
    /* La billetterie s'ouvre dans un nouvel onglet (action normale du lien) ; ici, la goutte et le tampon. */
    const ligneDate = a.closest('.date, .parcours, .saison-date, section');
    lancerGoutte(a, { surArrivee: () => { if (ligneDate && ligneDate.classList.contains('date')) { ligneDate.dataset.recu = 'Billetterie ouverte'; ligneDate.classList.add('est-recue'); } } });
  });
}

/* ---------- Agenda à l'heure de Paris : passé grisé, jour même repéré, prochaine séance ---------- */
/* « Prochaine séance » de l'accueil : recalculée à l'heure réelle, parmi les dates de la liste. */
function prochaineAccueil() {
  const lien = $('.accueil-ouverture [data-prochaine]');
  if (!lien) return;
  const li = prochaineLigne($$('.dates-liste[data-prochaines] .date'));
  const l = li && libelleLigne(li);
  if (!l) return;
  lien.textContent = l.texte;
  const cpt = $('.accueil-ouverture [data-compte]');
  if (cpt) { cpt.dataset.compte = l.debut; cpt.dataset.compteFin = l.fin; ecrireCompte(cpt); }
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
    $$('[data-mois-lien]').forEach((l) => { const g = document.getElementById(`mois-${l.dataset.moisLien}`); l.closest('.mf').classList.toggle('mf--filtre', !g || g.classList.contains('est-vide')); });
    if (vide) vide.hidden = lignes.some((l) => !l.classList.contains('est-masquee'));
    /* Le bloc « Prochaine séance » suit le filtre : avec « Marches », il montre la prochaine marche. */
    const premiere = prochaineLigne(lignes.filter((l) => !l.classList.contains('est-masquee') && !l.classList.contains('date--passe')));
    const texte = $('[data-prochaine]'), lien = $('[data-prochaine-lien]'), label = $('[data-prochaine-label]');
    if (premiere && texte) {
      texte.textContent = (libelleLigne(premiere) || {}).texte || texte.textContent;
      if (lien) lien.href = $('.date-reserver', premiere).href;
      const cpt = $('[data-compte-agenda]');
      const sc = cpt && seanceDeLigne(premiere);
      if (cpt) { if (sc) { cpt.dataset.compte = sc.debut; cpt.dataset.compteFin = sc.fin; ecrireCompte(cpt); } else cpt.hidden = true; }
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
  appliquer(depart && boutons.some((b) => b.dataset.filtre === depart) ? depart : 'tout', false);
}

/* ---------- Accueil ---------- */
/* Chorégraphie de la cloche (ordinateur) : grande à l'ouverture, un peu plus petite sur 念, médaillon en bas
   à droite pour les pratiques et les dates (le contenu reprend la largeur), grande pour la marche,
   réduite sur « Qui suis-je », puis la plongée. Les reflets suivent toujours la section lue. */
let plongeeEnCours = false;
const POSES = { debut: [1, 0, 0], nen: [0.86, 0.015, 0.035], pratiques: 'medaillon', marche: [1, 0, 0], dates: 'medaillon', hiroko: [0.8, 0, 0.03], plongee: [1, 0, 0] };
function choregraphie(racine) {
  let pose = 'debut';
  const cible = (nom) => {
    const p = POSES[nom];
    const D = racine.offsetWidth, vw = document.documentElement.clientWidth, vh = innerHeight;
    if (p !== 'medaillon') return { scale: p[0], x: p[1] * vw, y: p[2] * vh };
    const r = racine.getBoundingClientRect();
    const cx0 = r.left + r.width / 2 - gsap.getProperty(racine, 'x'), cy0 = r.top + r.height / 2 - gsap.getProperty(racine, 'y');
    const Dm = Math.min(136, D * 0.4);
    return { scale: Dm / D, x: cx0 + D / 2 - 0.62 * Dm - cx0, y: vh - 26 - 0.62 * Dm - cy0 };
  };
  const poser = (nom, instant) => {
    pose = nom;
    if (!html.classList.contains('cloche-fixe') || html.classList.contains('cloche-partie') || plongeeEnCours) return;
    html.classList.toggle('cloche-medaillon', POSES[nom] === 'medaillon');
    const c = cible(nom);
    const inverse = () => racine.style.setProperty('--inv', (1 / Math.max(0.05, +gsap.getProperty(racine, 'scale'))).toFixed(3));
    if (instant) { gsap.set(racine, { ...c, overwrite: 'auto' }); inverse(); }
    else gsap.to(racine, { ...c, duration: 1.1, ease: 'power3.inOut', overwrite: 'auto', onUpdate: inverse, onComplete: inverse });
  };
  Object.keys(POSES).forEach((id) => {
    const s = document.getElementById(id);
    if (!s) return;
    const debut = id === 'plongee' ? 'top 82%' : 'top 62%', fin = id === 'hiroko' ? 'bottom 82%' : 'bottom 62%';
    ST.create({ trigger: s, start: debut, end: fin, onToggle: (self) => { if (self.isActive) poser(id); } });
  });
  ST.addEventListener('refresh', () => poser(pose, true));
  return { pose: () => pose };
}

function accueil() {
  const racine = $('[data-cloche]');
  if (!racine) return;
  cloche = new Cloche(racine, { surEnergie: (E) => racine.style.setProperty('--chant', E.toFixed(3)) });
  gestes(racine, cloche, son);
  const canvasSaison = $('.accueil-ouverture [data-saison]');
  feuilles(canvasSaison, { surEau: (x, y) => cloche && cloche.frapper(x, y, 0.45) });
  poussiere($('[data-poussiere]'));

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
    choregraphie(racine);
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

  /* Qui suis-je : un ensō se trace au pinceau autour de l'aquarelle. */
  const ensoQui = $('.qui-enso .enso-trait');
  if (ensoQui) {
    gsap.set(ensoQui, { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.timeline({ scrollTrigger: { trigger: '.qui-cadre', start: 'top 85%', end: 'center 45%', scrub: 0.6 } })
      .to(ensoQui, { strokeDashoffset: 0, ease: 'power1.inOut' }, 0)
      .fromTo('.qui-media', { scale: 0.9, rotate: -6 }, { scale: 1, rotate: 0, ease: 'power2.out' }, 0);
  }

  /* Plongée : la cloche grandit jusqu'à l'écran, on plonge dans son eau ; les plans du bois arrivent autour de nous
     (premier plan net, plan du milieu flou, fond photo), la poussière d'or monte ; le titre naît au centre d'une onde. */
  const plongee = $('#plongee');
  const P = { hg: ['-30%', '-22%', 1.7], hd: ['32%', '-24%', 1.8], bd: ['30%', '30%', 1.7] };
  const arrivee = gsap.timeline({ scrollTrigger: { trigger: plongee, start: 'top 70%', end: 'top top', scrub: 0.4 } });
  Object.entries(P).forEach(([k, [x, y, sc]]) => arrivee.fromTo(`.plan--${k}`, { x, y, scale: sc, opacity: 0 }, { x: 0, y: 0, scale: 1, opacity: 0.95, ease: 'power2.out' }, 0));
  arrivee.fromTo('.plan--milieu', { scale: 1.35, opacity: 0 }, { scale: 1, opacity: 0.55, ease: 'power2.out' }, 0.1);
  gsap.timeline({ scrollTrigger: { trigger: plongee, start: 'top top', end: 'bottom bottom', scrub: 0.5 } })
    .fromTo('.plan--hg', { x: 0, y: 0, scale: 1 }, { x: '-20%', y: '-14%', scale: 1.32, ease: 'none', immediateRender: false }, 0)
    .fromTo('.plan--hd', { x: 0, y: 0, scale: 1 }, { x: '22%', y: '-12%', scale: 1.38, ease: 'none', immediateRender: false }, 0)
    .fromTo('.plan--bd', { x: 0, y: 0, scale: 1 }, { x: '18%', y: '16%', scale: 1.34, ease: 'none', immediateRender: false }, 0)
    .fromTo('.plan--milieu', { x: 0, scale: 1 }, { x: '-5%', scale: 1.1, ease: 'none', immediateRender: false }, 0)
    .fromTo('.plongee-media img', { scale: 1 }, { scale: 1.07, ease: 'none', immediateRender: false }, 0);
  const titre = $('[data-plongee-titre]', plongee), suite = $$('[data-plongee-suite]', plongee);
  const naitre = gsap.timeline({ paused: true })
    .fromTo(titre, { clipPath: 'circle(0% at 50% 60%)', filter: 'blur(10px)', scale: 1.06 }, { clipPath: 'circle(80% at 50% 60%)', filter: 'blur(0px)', scale: 1, duration: 1.5, ease: 'power2.out', clearProps: 'clipPath,filter' })
    .fromTo(suite, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }, 0.55);
  gsap.set([titre, ...suite], { opacity: 0 });
  gsap.set(titre, { opacity: 1, clipPath: 'circle(0% at 50% 60%)' });
  const eclore = () => {
    const r = titre.getBoundingClientRect();
    if (r.bottom > 0 && r.top < innerHeight) anneaux(r.left + r.width / 2, r.top + r.height * 0.6, Math.max(r.width, 320) * 0.7, 1300, 6);
    son.frapper(0.55);
    naitre.play();
  };
  ST.create({ trigger: plongee, start: fixe ? 'top -8%' : 'top 35%', onEnter: eclore, onLeaveBack: () => naitre.reverse() });
  const media = $('.plongee-media', plongee);
  if (fixe) {
    let m = null;
    const mesurer = () => {
      const r = $('.accueil-ouverture .cloche-eau').getBoundingClientRect();
      m = { cx: r.left + r.width / 2, cy: r.top + r.height / 2, rw: r.width / 2, vh: innerHeight, vw: document.documentElement.clientWidth };
      m.R = Math.hypot(Math.max(m.cx, m.vw - m.cx), Math.max(m.cy, m.vh - m.cy));
    };
    ST.addEventListener('refreshInit', () => { gsap.set(racine, { scale: 1, x: 0, y: 0, opacity: 1 }); if (html.classList.contains('cloche-fixe')) mesurer(); else media.style.setProperty('--plongee', '150%'); });
    mesurer();
    ST.create({ trigger: plongee, start: 'top 95%', onEnter: () => cloche.versEau('grok/eau-plongee'), onLeaveBack: () => cloche.versEau('eau-cerisier') });
    ST.create({
      trigger: plongee, start: 'top 75%', end: 'top top', scrub: true,
      onToggle: (self) => { plongeeEnCours = self.isActive || self.progress >= 1; },
      onUpdate: (self) => {
        if (!html.classList.contains('cloche-fixe')) return;
        const p = self.progress, e = p * p * (3 - 2 * p);
        plongeeEnCours = p > 0;
        racine.style.setProperty('--inv', '1');
        html.classList.toggle('cloche-plonge', p > 0.04);
        gsap.killTweensOf(racine, 'scale,x,y');
        const r = m.rw + (m.R - m.rw) * e;
        gsap.set(racine, { scale: r / m.rw, x: 0, y: 0, opacity: p > 0.82 ? 1 - (p - 0.82) / 0.18 : 1, overwrite: 'auto' });
        const haut = m.vh * 0.75 * (1 - p);
        media.style.setProperty('--px', `${m.cx}px`);
        media.style.setProperty('--py', `${m.cy - haut}px`);
        media.style.setProperty('--plongee', `${r.toFixed(1)}px`);
        html.classList.toggle('cloche-partie', p > 0.995);
      },
      onLeave: () => { if (html.classList.contains('cloche-fixe')) html.classList.add('cloche-partie'); media.style.setProperty('--plongee', '150%'); },
      onEnterBack: () => html.classList.remove('cloche-partie'),
      onLeaveBack: () => { plongeeEnCours = false; html.classList.remove('cloche-partie'); gsap.set(racine, { scale: 1, opacity: 1 }); media.style.setProperty('--plongee', `${m.rw}px`); },
    });
    media.style.setProperty('--plongee', `${m.rw}px`);
  } else {
    gsap.fromTo(media, { '--plongee': '12%' }, { '--plongee': '150%', ease: 'none', scrollTrigger: { trigger: plongee, start: 'top 85%', end: 'top 15%', scrub: 0.3 } });
  }
}

/* ---------- Marches : feuilles de saison, quatre parcours tracés tour à tour, un marcheur, l'eau qui monte ---------- */
function marches() {
  feuilles($('.m-ouverture [data-saison]'));
  feuilles($('.m-tarifs [data-saison]'));
  planParcours();
  friseEau();
  if (!gsap || !ST || etat.calme) return;
  if (etat.arrivee !== 'retour') $$('[data-trace]').forEach((p) => gsap.set(p, { strokeDasharray: 1, strokeDashoffset: 1 }));
  gsap.to('.plan-rond svg', { rotate: -8, ease: 'none', scrollTrigger: { trigger: '.m-ouverture', start: 'top top', end: 'bottom top', scrub: 0.4 } });
}
function planParcours() {
  const svg = $('.plan-rond svg');
  if (!svg) return;
  const traces = $$('[data-parcours-trace]', svg), marcheur = $('[data-marcheur]', svg), legendes = $$('[data-legende]'), reperes = $$('[data-repere]', svg);
  const montrer = (i) => {
    legendes.forEach((l, k) => l.classList.toggle('est-visible', k === i));
    reperes.forEach((r, k) => r.classList.toggle('est-actif', k === i));
    traces.forEach((t, k) => t.classList.toggle('est-actif', k === i));
  };
  montrer(0);
  if (etat.calme || !gsap || !traces.length) return;
  const points = traces.map((t) => { const L = t.getTotalLength(); return Array.from({ length: 120 }, (_, i) => t.getPointAtLength((L * i) / 120)); });
  const placer = (k, p) => { const q = points[k][Math.min(119, Math.max(0, Math.floor(p * 119)))]; marcheur.setAttribute('cx', q.x.toFixed(1)); marcheur.setAttribute('cy', q.y.toFixed(1)); };
  gsap.set(traces, { strokeDasharray: 1, strokeDashoffset: 1 });
  const dessin = { k: 0, p: 0 };
  let marche = false, temps = 0, courant = 0;
  const tl = gsap.timeline({ delay: etat.arrivee === 'retour' ? 0.3 : 2.1, onComplete: () => { marche = true; } });
  traces.forEach((t, k) => {
    tl.call(() => { dessin.k = k; montrer(k); }, null, k * 1.15);
    tl.fromTo(dessin, { p: 0 }, { p: 1, duration: 1.1, ease: 'power1.inOut', immediateRender: false, onUpdate: () => { t.style.strokeDashoffset = String(1 - dessin.p); placer(k, dessin.p); } }, k * 1.15);
  });
  const DUREE = 6;
  boucle(svg, (dt) => {
    if (!marche) return;
    temps += dt;
    const k = Math.floor(temps / DUREE) % traces.length;
    if (k !== courant) { courant = k; montrer(k); }
    placer(k, (temps % DUREE) / DUREE);
  });
}
/* Déroulé : les photos des étapes se découvrent comme une eau qui monte (bord en vague). */
function friseEau() {
  const frise = $('[data-frise-eau]');
  if (!frise || !gsap || !ST || etat.calme) return;
  const medias = $$('.frise-media', frise);
  medias.forEach((m) => m.style.setProperty('--niveau', '0'));
  ST.create({ trigger: frise, start: 'top 88%', end: 'bottom 60%', scrub: 0.6, onUpdate: (self) => {
    medias.forEach((m, k) => {
      const p = Math.min(1, Math.max(0, self.progress * (medias.length + 0.6) - k * 0.9));
      m.style.setProperty('--niveau', p.toFixed(3));
      m.classList.toggle('monte', p > 0.01 && p < 0.99);
    });
  } });
}

/* ---------- Ateliers : l'anneau des thèmes se fait tourner (souris, doigt, clavier), avec élan et aimantation ;
   la nuit tombe sur la méditation en ligne, la lampe s'allume ---------- */
function ateliers() {
  anneauGlissable();
  nuitEnLigne();
}
function anneauGlissable() {
  const anneau = $('[data-anneau]');
  if (!anneau) return;
  const boutons = $$('.anneau-num', anneau), n = boutons.length, pas = 360 / n;
  const items = boutons.map((b) => b.closest('.anneau-theme'));
  const centre = $('.anneau-centre', anneau);
  const moisEl = $('[data-anneau-mois]'), titreEl = $('[data-anneau-titre]'), detail = $('[data-anneau-detail]'), label = $('[data-anneau-label]');
  const courant = +anneau.dataset.anneau || 0;
  const FORMES = ['47% 53% 51% 49% / 52% 48% 52% 48%', '58% 42% 38% 62% / 44% 60% 40% 56%', '42% 58% 60% 40% / 55% 45% 55% 45%', '52% 48% 44% 56% / 40% 58% 42% 60%'];
  const rot = { a: -courant * pas };
  const poser = () => anneau.style.setProperty('--rotation', `${rot.a.toFixed(2)}deg`);
  poser();
  let choisi = courant;
  const choisir = (i) => {
    i = ((i % n) + n) % n;
    const change = i !== choisi;
    choisi = i;
    boutons.forEach((b, k) => b.setAttribute('aria-pressed', String(k === i)));
    items.forEach((it, k) => it.classList.toggle('est-courant', k === i));
    const b = boutons[i];
    if (moisEl) moisEl.textContent = b.dataset.mois;
    if (titreEl) titreEl.textContent = b.dataset.titre;
    if (detail) detail.textContent = b.dataset.detail;
    if (label) label.textContent = i === courant ? label.dataset.courant : `En ${b.dataset.mois}`;
    let cible = -i * pas;
    while (cible - rot.a > 180) cible -= 360;
    while (cible - rot.a < -180) cible += 360;
    if (gsap && !etat.calme) gsap.to(rot, { a: cible, duration: 0.9, ease: 'power3.out', overwrite: true, onUpdate: poser });
    else { rot.a = cible; poser(); }
    if (change && gsap && !etat.calme) {
      gsap.to(centre, { borderRadius: FORMES[i % FORMES.length], duration: 1.2, ease: 'sine.inOut' });
      gsap.fromTo('.anneau-info', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
      son.frapper(0.35);
    }
  };
  let glisse = false, actif = null;
  boutons.forEach((b, k) => b.addEventListener('click', (e) => { if (glisse) { e.preventDefault(); return; } choisir(k); }));
  anneau.addEventListener('keydown', (e) => {
    const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (d) { e.preventDefault(); choisir(choisi + d); boutons[choisi].focus({ preventScroll: true }); }
    else if (e.key === 'Home') { e.preventDefault(); choisir(courant); boutons[choisi].focus({ preventScroll: true }); }
  });
  anneau.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    const r = anneau.getBoundingClientRect();
    actif = { id: e.pointerId, cx: r.left + r.width / 2, cy: r.top + r.height / 2, x: e.clientX, ang: Math.atan2(e.clientY - r.top - r.height / 2, e.clientX - r.left - r.width / 2), depart: rot.a, v: 0, t: performance.now(), dernier: rot.a, souris: e.pointerType === 'mouse' };
    glisse = false;
  });
  addEventListener('pointermove', (e) => {
    if (!actif || e.pointerId !== actif.id) return;
    let a;
    if (actif.souris) {
      const ang = Math.atan2(e.clientY - actif.cy, e.clientX - actif.cx);
      let d = ang - actif.ang;
      d = Math.atan2(Math.sin(d), Math.cos(d));
      actif.ang = ang;
      a = (glisse ? rot.a : actif.dernier) + d * 57.2958;
      actif.dernier = a;
    } else a = actif.depart + (e.clientX - actif.x) * 0.55;
    if (!glisse && Math.abs(a - actif.depart) > 5) {
      glisse = true;
      anneau.classList.add('glisse');
      if (gsap) gsap.killTweensOf(rot);
      try { anneau.setPointerCapture(actif.id); } catch { /* rien */ }
    }
    if (glisse) {
      const t = performance.now();
      actif.v = ((a - rot.a) / Math.max(8, t - actif.t)) * 1000;
      actif.t = t;
      rot.a = a;
      poser();
    }
  });
  const lacher = (e) => {
    if (!actif || e.pointerId !== actif.id) return;
    const a = actif;
    actif = null;
    if (!glisse) return;
    anneau.classList.remove('glisse');
    const fin = rot.a + Math.max(-200, Math.min(200, a.v * 0.22));
    choisir(Math.round(-fin / pas));
    setTimeout(() => { glisse = false; }, 0);
  };
  addEventListener('pointerup', lacher);
  addEventListener('pointercancel', lacher);
  /* Une invitation discrète : l'anneau esquisse un quart de tour à l'arrivée, puis revient. */
  if (gsap && !etat.calme && ST) ST.create({ trigger: anneau, start: 'top 80%', once: true, onEnter: () => gsap.fromTo(rot, { a: rot.a + 24 }, { a: rot.a, duration: 1.6, ease: 'elastic.out(1, .6)', delay: 0.8, onUpdate: poser }) });
}
function nuitEnLigne() {
  const s = $('.a-enligne');
  if (!s) return;
  if (!gsap || !ST || etat.calme) { s.style.setProperty('--nuit', '1'); s.style.setProperty('--lampe', '1'); s.classList.add('lampe-allumee'); return; }
  s.style.setProperty('--nuit', '0');
  s.style.setProperty('--lampe', '0');
  ST.create({ trigger: s, start: 'top 85%', end: 'center 50%', scrub: 0.6, onUpdate: (self) => {
    const p = self.progress, l = Math.max(0, Math.min(1, (p - 0.5) / 0.4));
    s.style.setProperty('--nuit', p.toFixed(3));
    s.style.setProperty('--lampe', l.toFixed(3));
    s.classList.toggle('lampe-allumee', l > 0.02);
  } });
}

/* ---------- MBSR : on descend d'un palier par semaine ---------- */
function mbsr() {
  const scene = $('.b-plongee');
  if (!scene) return;
  bulles($('[data-bulles]'));
  /* 1979 s'écrit au trait, puis l'encre remplit les chiffres. */
  const annee = $('.annee-texte');
  if (annee && gsap && ST && !etat.calme) {
    gsap.set(annee, { strokeDasharray: 1100, strokeDashoffset: 1100, fillOpacity: 0 });
    gsap.timeline({ scrollTrigger: { trigger: '.annee', start: 'top 85%', once: true } })
      .to(annee, { strokeDashoffset: 0, duration: 2.2, ease: 'power1.inOut' })
      .to(annee, { fillOpacity: 1, duration: 0.9, ease: 'power2.out' }, '-=.5');
  }
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
  /* Envoi : le formulaire se plie en lettre, la goutte part vers la petite cloche, puis le tampon « reçu ». */
  f.addEventListener('submit', () => {
    requestAnimationFrame(() => {
      if (!msg || msg.hidden || f.classList.contains('est-plie')) return;
      const env = $('[data-enveloppe]', f);
      f.classList.add('est-plie');
      if (!env) return;
      env.hidden = false;
      msg.setAttribute('tabindex', '-1');
      msg.focus({ preventScroll: true });
      if (!etat.calme) env.animate([{ transform: 'perspective(700px) rotateX(-65deg) scale(1.25)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 700, easing: 'cubic-bezier(.2,.8,.2,1)' });
      setTimeout(() => lancerGoutte(env, { surArrivee: () => env.classList.add('tamponne') }), etat.calme ? 0 : 700);
    });
  });
  carte();
  /* Sujet prérempli par l'adresse (?sujet=mbsr) : on passe directement au message. */
  if (new URLSearchParams(location.search).get('sujet') && $('input[name="sujet"]:checked', f)) montrer(1);
}

/* Carte de l'est parisien au pinceau : le bois, les lacs, la Marne, le RER A se tracent ; les lieux tombent un à un.
   Survoler un lieu de la liste fait battre son repère. */
function carte() {
  const svg = $('[data-carte]');
  if (!svg) return;
  $$('.lieux [data-lieu]').forEach((li) => {
    const r = $(`[data-repere="${li.dataset.lieu}"]`, svg);
    if (!r) return;
    const on = () => r.classList.add('est-vise'), off = () => r.classList.remove('est-vise');
    li.addEventListener('pointerenter', on); li.addEventListener('pointerleave', off);
    li.addEventListener('focusin', on); li.addEventListener('focusout', off);
  });
  if (!gsap || !ST || etat.calme) return;
  const traits = $$('[data-carte-trait]', svg), reperes = $$('.carte-repere', svg), noms = $$('.carte-noms text, .carte-gare', svg);
  gsap.set(traits, { strokeDasharray: 1, strokeDashoffset: 1 });
  gsap.set('.carte-bois, .carte-lac', { fillOpacity: 0 });
  gsap.set(reperes, { scale: 0, transformOrigin: '50% 50%' });
  gsap.set(noms, { opacity: 0 });
  gsap.timeline({ scrollTrigger: { trigger: svg, start: 'top 80%', once: true } })
    .to(traits, { strokeDashoffset: 0, duration: 1.4, ease: 'power1.inOut', stagger: 0.28 })
    .to('.carte-bois, .carte-lac', { fillOpacity: 1, duration: 1, ease: 'power1.out' }, 0.9)
    .to(noms, { opacity: 1, duration: 0.6, stagger: 0.05 }, 1.2)
    .to(reperes, { scale: 1, duration: 0.55, ease: 'back.out(2.4)', stagger: 0.14 }, 1.6);
}

/* ---------- Avant de réserver : un panneau récapitule la date, puis « Continuer sur Billetweb » ---------- */
function recapReservation() {
  const d = $('[data-recap]');
  if (!d || !d.showModal) return;
  const lien = $('[data-recap-lien]', d);
  let source = null;
  document.addEventListener('click', (e) => {
    let a = e.target.closest && e.target.closest('.date .date-reserver, [data-prochaine-lien]');
    if (!a || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return;
    /* « Réserver la prochaine » (agenda) : le panneau de la date correspondante. */
    let li = a.closest('.date');
    if (!li) {
      li = $$('[data-agenda] .date').find((l) => !l.classList.contains('est-masquee') && $('.date-reserver', l)?.href === a.href);
      if (!li) return;
    }
    e.preventDefault();
    source = { a, li };
    const meta = ($('.date-meta', li)?.textContent || '').split(' · ');
    const ou = meta.length > 1 ? meta[meta.length - 1] : '';
    $('[data-recap-titre]', d).textContent = $('.date-titre', li)?.textContent || '';
    $('[data-recap-sous]', d).textContent = $('.date-sous', li)?.textContent || '';
    $('[data-recap-quand]', d).textContent = meta.slice(0, -1).join(' · ');
    $('[data-recap-ou]', d).textContent = li.dataset.depart && li.dataset.depart !== ou ? `${ou} · ${li.dataset.depart}` : ou;
    $('[data-recap-prix]', d).textContent = $('.date-prix', li)?.textContent || '';
    $$('[data-apporter]', d).forEach((s) => { s.hidden = s.dataset.apporter !== li.dataset.type; });
    lien.href = a.href;
    lien.setAttribute('aria-label', `${lien.textContent.trim()} : ${$('.date-titre', li)?.textContent || ''} (nouvel onglet)`);
    const r = a.getBoundingClientRect();
    if (!etat.calme) anneaux(r.left + r.width / 2, r.top + r.height / 2, 220, 900, 4);
    setTimeout(() => {
      d.showModal();
      if (!etat.calme) d.animate([{ opacity: 0, transform: 'translateY(18px) scale(.97)' }, { opacity: 1, transform: 'none' }], { duration: 420, easing: 'cubic-bezier(.2,.8,.2,1)' });
    }, etat.calme ? 0 : 140);
  });
  const fermer = () => { d.close(); if (source) source.a.focus({ preventScroll: true }); };
  $$('[data-recap-fermer]', d).forEach((b) => b.addEventListener('click', fermer));
  d.addEventListener('click', (e) => {
    if (e.target !== d) return;
    const r = d.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) fermer();
  });
  /* La billetterie s'ouvre (nouvel onglet) ; ici, le panneau se ferme et la goutte part de la date vers la cloche. */
  lien.addEventListener('click', () => {
    const s = source;
    d.close();
    if (!s) return;
    requestAnimationFrame(() => lancerGoutte(s.a, { surArrivee: () => { s.li.dataset.recu = 'Billetterie ouverte'; s.li.classList.add('est-recue'); } }));
  });
}

/* ---------- Agenda : dix feuilles, de septembre à juin ; celle du mois lu s'éclaire ---------- */
function moisFeuilles() {
  const nav = $('[data-mois-feuilles]');
  if (!nav) return;
  const liens = $$('[data-mois-lien]', nav);
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    const cle = e.target.id.replace('mois-', '');
    liens.forEach((l) => l.closest('.mf').classList.toggle('mf--lu', l.dataset.moisLien === cle));
  }), { rootMargin: '-40% 0px -55% 0px' });
  $$('[data-mois-groupe]').forEach((g) => io.observe(g));
  if (!gsap || etat.calme) return;
  gsap.from($$('.mf svg', nav), { y: -26, rotate: (i) => (i % 2 ? 24 : -24), opacity: 0, duration: 1.1, ease: 'bounce.out', stagger: 0.06, delay: etat.arrivee === 'retour' ? 0.1 : 0.9, clearProps: 'transform,opacity' });
}

/* ---------- Démarrage ---------- */
demarrer({
  preparer() {
    initSon();
    pinceauMouille();
    comptes();
    ensos(() => { const mc = $('[data-mini-cloche]'); if (mc) { mc.classList.remove('sonne'); void mc.offsetWidth; mc.classList.add('sonne'); } son.frapper(0.7); });
    filMiniCloche();
    retours();
    prochaineAccueil();
    agendaVivant();
    filtresAgenda();
    if (page === 'accueil') accueil();
    if (page === 'marches') marches();
    if (page === 'ateliers') ateliers();
    if (page === 'mbsr') mbsr();
    if (page === 'contact') contact();
    if (page === 'agenda') moisFeuilles();
    recapReservation();
    if (page === '404') $$('[data-mini-cloche]').forEach((m) => m.classList.add('sonne'));
    /* Passage ordinateur ↔ tablette sur l'accueil : la mise en page de la cloche change, on recharge proprement. */
    /* Fenêtre rétrécie sous 1000 px : la cloche quitte sa place fixe et revient dans le flux, sans recharger
       la page (l'intro ne se rejoue pas) ; élargie, la mise en page posée (texte à gauche, cloche à droite) reste. */
    if (page === 'accueil') {
      matchMedia('(min-width: 1000px) and (min-height: 560px)').addEventListener('change', (e) => {
        if (e.matches || !html.classList.contains('cloche-fixe')) return;
        html.classList.remove('cloche-fixe', 'cloche-partie');
        const r = $('[data-cloche]'); if (r && gsap) gsap.set(r, { clearProps: 'transform,opacity,scale' });
        if (ST) ST.refresh();
      });
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
    $$('.mot-encre').forEach((m) => { m.classList.remove('encre-attente', 'encre-pose'); m.classList.add('encre-posee'); });
    $$('[data-trace]').forEach((p) => gsap.set(p, { strokeDashoffset: 0 }));
    $$('[data-kanji] .kanji-trait').forEach((t) => gsap.set(t, { strokeDashoffset: 0 }));
  },
  arrivee() { arriverPremierEcran(0.15); },
});

quand('pret', () => { if (etat.calme) $$('.palier').forEach((p) => p.classList.add('est-atteint')); });
