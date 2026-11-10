/* Boosts demandés à l'aperçu :
   - pinceau mouillé : sur ordinateur (souris), le pointeur laisse une trace d'eau sur le washi, sèche en 1,2 s ;
   - ensō à tracer : le visiteur trace son cercle d'un seul geste (souris ou doigt), « Tracer pour moi » au clavier ;
   - plongée en profondeur : des plans du bois découpés s'écartent pendant la plongée finale (dans site.js). */
import { etat } from './socle/index.js?v=2';

export function pinceauMouille() {
  if (etat.calme || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const c = document.createElement('canvas');
  c.className = 'pinceau-canvas';
  c.setAttribute('aria-hidden', 'true');
  c.setAttribute('data-souris', '');
  document.body.prepend(c);
  const ctx = c.getContext('2d');
  const ECH = 0.5; /* demi-résolution : léger, et le bord reste doux */
  let W = 0, H = 0, points = [], raf = 0, dernier = 0, encre = false;
  const taille = () => { W = c.width = Math.round(innerWidth * ECH); H = c.height = Math.round(innerHeight * ECH); };
  taille();
  addEventListener('resize', taille);
  addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    points.push({ x: e.clientX * ECH, y: e.clientY * ECH, t: performance.now() });
    if (points.length > 90) points.shift();
    dernier = performance.now(); encre = true;
    if (!raf) raf = requestAnimationFrame(image);
  }, { passive: true });
  /* Le défilement déplace le papier : la trace humide reste où elle a été posée à l'écran, puis sèche. */
  function image(t) {
    raf = 0;
    ctx.clearRect(0, 0, W, H);
    const vie = 1200;
    points = points.filter((p) => t - p.t < vie);
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1], b = points[i];
      const age = (t - b.t) / vie;
      const v = Math.min(1, Math.hypot(b.x - a.x, b.y - a.y) / 18);
      ctx.strokeStyle = `rgba(70, 90, 70, ${(0.11 * (1 - age)).toFixed(3)})`;
      ctx.lineWidth = (14 - v * 8) * (1 - age * 0.4);
      ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
    if (points.length) raf = requestAnimationFrame(image);
    else if (encre) { encre = false; ctx.clearRect(0, 0, W, H); }
  }
}

/* Ensō : un seul geste. Le trait s'épaissit quand on ralentit, comme un pinceau ; un cercle presque fermé
   devient un ensō (couleur du logo) et fait sonner la petite cloche. */
export function ensos(surEnso) {
  document.querySelectorAll('[data-enso]').forEach((zone) => {
    const c = zone.querySelector('canvas');
    const msg = zone.querySelector('[data-enso-message]');
    const auto = zone.querySelector('[data-enso-auto]');
    const ctx = c.getContext('2d');
    let pts = [], trace = false;
    const dimensionner = () => { const r = c.getBoundingClientRect(); const d = Math.min(2, devicePixelRatio || 1); c.width = r.width * d; c.height = r.height * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
    dimensionner();
    new ResizeObserver(dimensionner).observe(c);
    const encre = getComputedStyle(zone).getPropertyValue('--encre-enso').trim() || '#1d211f';
    const peindre = (a, b) => {
      const v = Math.hypot(b.x - a.x, b.y - a.y);
      ctx.strokeStyle = encre; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.lineWidth = Math.max(3, 16 - v * 0.7);
      ctx.globalAlpha = 0.9;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    };
    const pos = (e) => { const r = c.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const effacer = () => { ctx.clearRect(0, 0, c.width, c.height); zone.classList.remove('est-enso'); };
    const juger = (auteur = true) => {
      if (pts.length < 12) return;
      const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length, cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
      const rs = pts.map((p) => Math.hypot(p.x - cx, p.y - cy)), rm = rs.reduce((s, r) => s + r, 0) / rs.length;
      const ecart = Math.sqrt(rs.reduce((s, r) => s + (r - rm) ** 2, 0) / rs.length) / rm;
      let tour = 0; for (let i = 1; i < pts.length; i++) { let d = Math.atan2(pts[i].y - cy, pts[i].x - cx) - Math.atan2(pts[i - 1].y - cy, pts[i - 1].x - cx); if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI; tour += d; }
      const rond = ecart < 0.28 && Math.abs(tour) > Math.PI * 1.6;
      if (msg) msg.textContent = rond ? msg.dataset.reussi : msg.dataset.encore;
      zone.classList.toggle('est-enso', rond);
      if (rond && surEnso && auteur) surEnso();
    };
    c.addEventListener('pointerdown', (e) => { effacer(); trace = true; pts = [pos(e)]; try { c.setPointerCapture(e.pointerId); } catch {} });
    c.addEventListener('pointermove', (e) => { if (!trace) return; const p = pos(e); peindre(pts[pts.length - 1], p); pts.push(p); });
    const fin = () => { if (!trace) return; trace = false; juger(); };
    c.addEventListener('pointerup', fin); c.addEventListener('pointercancel', fin);
    /* Au clavier, ou pour voir : le cercle se trace tout seul. */
    const dessinerSeul = (immediat, auteur = false) => {
      effacer();
      const r = c.getBoundingClientRect(), cx = r.width / 2, cy = r.height / 2, R = Math.min(r.width, r.height) * 0.36;
      pts = Array.from({ length: 64 }, (_, i) => { const a = -1.9 + (i / 63) * 5.9; return { x: cx + Math.cos(a) * R * (1 + Math.sin(i * 0.7) * 0.02), y: cy + Math.sin(a) * R }; });
      if (immediat || etat.calme) { for (let i = 1; i < pts.length; i++) peindre(pts[i - 1], pts[i]); juger(auteur); return; }
      let i = 1;
      const pas = () => { for (let k = 0; k < 3 && i < pts.length; k++, i++) peindre(pts[i - 1], pts[i]); if (i < pts.length) requestAnimationFrame(pas); else juger(auteur); };
      requestAnimationFrame(pas);
    };
    auto && auto.addEventListener('click', () => dessinerSeul(false, true));
    /* Démonstration à l'arrivée dans l'écran (une fois) ; état final directement en mode calme. */
    const io = new IntersectionObserver((es) => { if (es.some((x) => x.isIntersecting)) { io.disconnect(); dessinerSeul(false); setTimeout(() => { if (msg && !zone.matches(':hover')) msg.textContent = msg.dataset.invite; }, 900); } }, { threshold: 0.5 });
    io.observe(zone);
  });
}
