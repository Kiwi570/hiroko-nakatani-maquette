/* Feuilles, pétales ou flocons de la vraie saison (date de Paris), en canvas 2D, derrière le texte.
   Automne : feuilles de ginkgo et de chêne ; printemps : pétales de cerisier ; été : aigrettes dans la lumière ;
   hiver : quelques flocons. Peu nombreux (16 sur ordinateur, 8 sur téléphone). Une feuille qui tombe dans l'eau
   de la cloche y fait une onde (rappel surEau). Boucle du socle : à l'écran seulement, jamais en mode calme. */
import { boucle, etat } from './socle/index.js?v=2';

export function saisonDuJour(d = new Date()) {
  const m = +new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Paris', month: 'numeric' }).format(d);
  return m >= 3 && m <= 5 ? 'printemps' : m >= 6 && m <= 8 ? 'ete' : m >= 9 && m <= 11 ? 'automne' : 'hiver';
}

const PALETTES = {
  automne: ['#d9a62e', '#e2b84a', '#b8752f', '#9c5b2a', '#c98f3a'],
  printemps: ['#f3c6d3', '#f7d9e2', '#eab1c4', '#fbe7ee'],
  ete: ['#f6efd2', '#efe3b4', '#fff9e6'],
  hiver: ['#ffffff', '#eef3f6'],
};

export function feuilles(canvas, { surEau } = {}) {
  if (!canvas || etat.calme) return;
  const ctx = canvas.getContext('2d');
  const saison = saisonDuJour();
  const couleurs = PALETTES[saison];
  const tactile = matchMedia('(hover: none)').matches;
  const N = saison === 'hiver' ? (tactile ? 4 : 10) : tactile ? 5 : 16;
  let W = 0, H = 0, eau = null, haut = 0;
  const parts = [];
  const nouvelle = (debut) => ({
    x: Math.random() * W, y: debut ? Math.random() * H : -30 - Math.random() * 80,
    v: 18 + Math.random() * 26, a: Math.random() * 6.28, va: (Math.random() - 0.5) * 1.6,
    oscille: 20 + Math.random() * 40, phase: Math.random() * 6.28, t: Math.random() * 10,
    taille: saison === 'ete' ? 3 + Math.random() * 3 : saison === 'hiver' ? 2 + Math.random() * 3 : 8 + Math.random() * 9,
    c: couleurs[Math.floor(Math.random() * couleurs.length)], forme: Math.random() < 0.55 ? 'ginkgo' : 'chene', fond: 0,
  });
  /* Mesures au chargement et au redimensionnement seulement : jamais pendant le défilement. */
  const mesurer = () => {
    const r = canvas.getBoundingClientRect();
    W = canvas.width = Math.round(r.width); H = canvas.height = Math.round(r.height);
    haut = r.top + window.scrollY;
    const e = document.querySelector('.accueil-ouverture .cloche-eau');
    if (e && surEau) {
      const b = e.getBoundingClientRect();
      const fixe = document.documentElement.classList.contains('cloche-fixe');
      eau = { x: b.left + b.width / 2, y: b.top + b.height / 2 + (fixe ? 0 : window.scrollY), r: b.width / 2, fixe };
    }
    if (!parts.length) for (let i = 0; i < N; i++) parts.push(nouvelle(true));
  };
  mesurer();
  new ResizeObserver(mesurer).observe(canvas);
  window.addEventListener('socle:pret', mesurer);

  const dessiner = (p) => {
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.globalAlpha = 0.85 * (1 - p.fond);
    ctx.fillStyle = p.c;
    const s = p.taille;
    if (saison === 'automne' && p.forme === 'ginkgo') {
      ctx.beginPath(); ctx.moveTo(0, s * 0.9); ctx.quadraticCurveTo(-s * 1.1, -s * 0.2, -s * 0.7, -s * 0.8);
      ctx.quadraticCurveTo(0, -s * 0.55, s * 0.7, -s * 0.8); ctx.quadraticCurveTo(s * 1.1, -s * 0.2, 0, s * 0.9); ctx.fill();
    } else if (saison === 'automne') {
      ctx.beginPath(); ctx.ellipse(0, 0, s * 0.45, s, 0, 0, 6.283); ctx.fill();
    } else if (saison === 'printemps') {
      ctx.beginPath(); ctx.moveTo(0, -s * 0.6); ctx.bezierCurveTo(s * 0.7, -s * 0.5, s * 0.5, s * 0.6, 0, s * 0.6); ctx.bezierCurveTo(-s * 0.5, s * 0.6, -s * 0.7, -s * 0.5, 0, -s * 0.6); ctx.fill();
    } else {
      ctx.beginPath(); ctx.arc(0, 0, s, 0, 6.283); ctx.fill();
    }
    ctx.restore();
  };

  boucle(canvas, (dt) => {
    ctx.clearRect(0, 0, W, H);
    for (const p of parts) {
      p.t += dt;
      p.y += p.v * dt;
      p.x += Math.sin(p.t * 0.9 + p.phase) * p.oscille * dt;
      p.a += p.va * dt;
      if (p.fond > 0) p.fond = Math.min(1, p.fond + dt * 1.4);
      /* Une feuille qui passe sur l'eau de la cloche s'y pose : petite onde, puis elle s'efface. */
      if (eau && !p.fond) {
        const vy = eau.fixe ? haut - window.scrollY + p.y : haut + p.y;
        const vx = p.x;
        const dx = vx - eau.x, dy = vy - eau.y;
        if (dx * dx + dy * dy < (eau.r * 0.8) ** 2 && Math.random() < 0.02) { p.fond = 0.01; surEau && surEau((dx / eau.r + 1) / 2, (dy / eau.r + 1) / 2); }
      }
      if (p.y > H + 30 || p.fond >= 1) Object.assign(p, nouvelle(false));
      dessiner(p);
    }
  }, { lourde: true });
}
