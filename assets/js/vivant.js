/* Effets de la v2 (« plus vivant ») partagés par plusieurs pages : compte à rebours de la prochaine séance,
   poussière d'or de la plongée, mot-clé du titre posé à l'encre, reflets de la petite cloche.
   Tous respectent le mode calme (rien ne bouge, tout est posé) et la boucle du socle (à l'écran seulement). */
import { boucle, etat } from './socle/index.js?v=2';

/* « Maintenant » à Paris, en minutes (même calcul que l'agenda généré). */
export function maintenantParis() {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).map((x) => [x.type, x.value]));
  return { jour: `${p.year}-${p.month}-${p.day}`, minutes: Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute) / 60000 };
}
const minutesDe = (jour, heure) => { const [a, m, j] = jour.split('-').map(Number); const [h, mi] = heure.split(':').map(Number); return Date.UTC(a, m - 1, j, h, mi) / 60000; };

/* Début et fin de la prochaine séance d'une ligne d'agenda (un mois en ligne : son prochain mardi). */
export function seanceDeLigne(li, n = maintenantParis().minutes) {
  const mardis = (li.dataset.mardis || '').split(' ').filter(Boolean);
  if (mardis.length && li.dataset.heure) {
    const j = mardis.find((d) => minutesDe(d, li.dataset.heureFin || li.dataset.heure) >= n);
    if (j) return { debut: minutesDe(j, li.dataset.heure), fin: minutesDe(j, li.dataset.heureFin || li.dataset.heure) };
  }
  if (li.dataset.mois) return null;
  return { debut: +li.dataset.debut, fin: +li.dataset.fin };
}

/* ---------- Compte à rebours (à la minute) : les chiffres qui changent roulent ---------- */
export function ecrireCompte(el, n = maintenantParis().minutes) {
  const debut = +el.dataset.compte, fin = +el.dataset.compteFin || debut + 120, d = debut - n;
  if (!debut || (d <= 0 && fin <= n)) { el.hidden = true; return; }
  el.hidden = false;
  if (d <= 0) { if (el.dataset.structure !== 'maintenant') { el.dataset.structure = 'maintenant'; el.innerHTML = '<b>en ce moment</b>'; } return; }
  const v = { j: Math.floor(d / 1440), h: Math.floor((d % 1440) / 60), m: String(d % 60).padStart(2, '0') };
  /* Au-delà de deux semaines, seulement les jours : le compte à la minute n'a de sens que si la séance est proche. */
  const structure = v.j >= 14 ? 'j' : v.j ? 'jhm' : 'hm';
  if (el.dataset.structure !== structure) {
    el.dataset.structure = structure;
    el.innerHTML = structure === 'j' ? 'dans <b data-u="j"></b> jours' : `dans ${v.j ? '<b data-u="j"></b> j ' : ''}<b data-u="h"></b> h <b data-u="m"></b>`;
  }
  el.querySelectorAll('b[data-u]').forEach((b) => {
    const nv = String(v[b.dataset.u]);
    if (b.textContent === nv) return;
    b.textContent = nv;
    if (!etat.calme) { b.classList.remove('tic'); void b.offsetWidth; b.classList.add('tic'); }
  });
}
export function comptes() {
  const maj = () => { const n = maintenantParis().minutes; document.querySelectorAll('[data-compte]').forEach((el) => ecrireCompte(el, n)); };
  maj();
  setInterval(maj, 15000);
}

/* ---------- Mot-clé du titre : posé au pinceau, l'encre bave un instant puis sèche ---------- */
export function motsEncre(h, retard = 0) {
  const mots = h ? [...h.querySelectorAll('.mot-encre')] : [];
  if (!mots.length) return;
  if (etat.calme) { mots.forEach((m) => m.classList.add('encre-posee')); return; }
  mots.forEach((m) => { m.classList.remove('encre-pose', 'encre-posee'); m.classList.add('encre-attente'); });
  setTimeout(() => mots.forEach((m, i) => setTimeout(() => { m.classList.remove('encre-attente'); m.classList.add('encre-pose'); }, i * 260)), retard * 1000);
}

/* ---------- Poussière d'or (plongée) : quelques grains de lumière qui montent et scintillent ---------- */
export function poussiere(canvas) {
  if (!canvas || etat.calme) return;
  const ctx = canvas.getContext('2d');
  const tactile = matchMedia('(hover: none)').matches;
  const N = tactile ? 24 : 56;
  const dpr = Math.min(1.5, devicePixelRatio || 1);
  let W = 0, H = 0;
  const sprite = document.createElement('canvas');
  sprite.width = sprite.height = 32;
  const s = sprite.getContext('2d');
  const g = s.createRadialGradient(16, 16, 0, 16, 16, 16);
  g.addColorStop(0, 'rgba(255,240,196,1)'); g.addColorStop(0.22, 'rgba(255,214,140,.6)'); g.addColorStop(1, 'rgba(255,200,120,0)');
  s.fillStyle = g; s.fillRect(0, 0, 32, 32);
  const mesurer = () => { const r = canvas.getBoundingClientRect(); W = canvas.width = Math.max(1, Math.round(r.width * dpr)); H = canvas.height = Math.max(1, Math.round(r.height * dpr)); };
  mesurer();
  addEventListener('resize', mesurer);
  const parts = Array.from({ length: N }, () => ({ x: Math.random(), y: Math.random(), v: 0.008 + Math.random() * 0.02, t: Math.random() * 10, taille: 5 + Math.random() * 12, ph: Math.random() * 6.28, f: 0.5 + Math.random() }));
  boucle(canvas, (dt) => {
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    for (const p of parts) {
      p.t += dt;
      p.y -= p.v * dt;
      p.x += Math.sin(p.t * 0.6 + p.ph) * 0.004 * dt;
      if (p.y < -0.05) { p.y = 1.05; p.x = Math.random(); }
      ctx.globalAlpha = 0.25 + 0.75 * Math.max(0, Math.sin(p.t * p.f * 1.3 + p.ph));
      const t = p.taille * dpr;
      ctx.drawImage(sprite, p.x * W - t / 2, p.y * H - t / 2, t, t);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }, { lourde: true });
}

/* ---------- Reflet de la petite cloche : l'image de la section lue, en fondu ---------- */
export function refletMiniCloche(mc, section) {
  const eau = mc && mc.querySelector('.mini-cloche-eau');
  if (!eau || !section) return;
  let src = '';
  if (section.dataset.eau) src = `/assets/images/${section.dataset.eau}-640.webp`;
  else {
    const img = [...section.querySelectorAll('img')].find((i) => !i.closest('.mini-cloche, [data-mini-cloche], .entete'));
    src = img ? img.currentSrc || img.src : '';
  }
  const actuelle = eau.querySelector('.mini-reflet.est-visible');
  if (actuelle && actuelle.dataset.src === src) return;
  if (!src) { if (actuelle) actuelle.classList.remove('est-visible'); return; }
  const im = new Image();
  im.decoding = 'async';
  im.onload = () => {
    const r = document.createElement('span');
    r.className = 'mini-reflet';
    r.dataset.src = src;
    r.style.backgroundImage = `url("${src}")`;
    eau.appendChild(r);
    requestAnimationFrame(() => { r.classList.add('est-visible'); if (actuelle) { actuelle.classList.remove('est-visible'); setTimeout(() => actuelle.remove(), 700); } });
  };
  im.src = src;
}

/* ---------- Bulles (MBSR, plongée des huit semaines) : elles remontent vers la lumière ---------- */
export function bulles(canvas) {
  if (!canvas || etat.calme) return;
  const ctx = canvas.getContext('2d');
  const N = matchMedia('(hover: none)').matches ? 10 : 22;
  const dpr = Math.min(1.5, devicePixelRatio || 1);
  let W = 0, H = 0;
  const mesurer = () => { const r = canvas.getBoundingClientRect(); W = canvas.width = Math.max(1, Math.round(r.width * dpr)); H = canvas.height = Math.max(1, Math.round(r.height * dpr)); };
  mesurer();
  addEventListener('resize', mesurer);
  const nouvelle = (debut) => ({ x: Math.random(), y: debut ? Math.random() : 1.04 + Math.random() * 0.2, r: 2 + Math.random() * 7, v: 0.035 + Math.random() * 0.07, ph: Math.random() * 6.28, t: 0 });
  const parts = Array.from({ length: N }, () => nouvelle(true));
  boucle(canvas, (dt) => {
    ctx.clearRect(0, 0, W, H);
    for (const p of parts) {
      p.t += dt;
      p.y -= p.v * dt * (1 + p.r / 10);
      p.x += Math.sin(p.t * 2 + p.ph) * 0.0022;
      if (p.y < -0.05) Object.assign(p, nouvelle(false));
      const x = p.x * W, y = p.y * H, r = p.r * dpr;
      ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283);
      ctx.strokeStyle = 'rgba(226,242,250,.5)'; ctx.lineWidth = dpr; ctx.stroke();
      ctx.beginPath(); ctx.arc(x - r * 0.35, y - r * 0.35, r * 0.26, 0, 6.283);
      ctx.fillStyle = 'rgba(255,255,255,.65)'; ctx.fill();
    }
  }, { lourde: true });
}

/* Libellé de la prochaine séance d'une ligne d'agenda, à l'heure de Paris (« Dimanche 15 novembre, 10 h · Marche
   et méditation », « Ce soir, 20 h · … »). Sert à tenir à jour la « Prochaine séance » quand la page générée a vieilli. */
const JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
export function libelleLigne(li, n = maintenantParis()) {
  const sc = seanceDeLigne(li, n.minutes);
  if (!sc) return null;
  const d = new Date(sc.debut * 60000);
  const h = d.getUTCHours(), mi = d.getUTCMinutes();
  const heure = `${h} h${mi ? ` ${String(mi).padStart(2, '0')}` : ''}`;
  const titre = (li.querySelector('.date-titre')?.textContent || '').trim();
  const jour = d.toISOString().slice(0, 10);
  const quand = jour === n.jour ? `${h >= 18 ? 'Ce soir' : 'Aujourd’hui'}, ${heure}` : `${JOURS[d.getUTCDay()][0].toUpperCase()}${JOURS[d.getUTCDay()].slice(1)} ${d.getUTCDate()} ${MOIS[d.getUTCMonth()]}, ${heure}`;
  return { texte: `${quand} · ${titre}`, ...sc };
}
/* La prochaine séance parmi des lignes : la plus proche qui n'est pas finie. */
export function prochaineLigne(lignes, n = maintenantParis()) {
  let meilleure = null;
  lignes.forEach((li) => {
    const sc = seanceDeLigne(li, n.minutes);
    if (!sc || sc.fin < n.minutes) return;
    if (!meilleure || sc.debut < meilleure.sc.debut) meilleure = { li, sc };
  });
  return meilleure ? meilleure.li : null;
}
