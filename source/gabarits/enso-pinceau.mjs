/* Ensō au pinceau (v2) : un cercle d'encre à épaisseur variable, lourd au départ, qui s'amincit et se termine
   en trait sec (kasure : fibres séparées). Le tracé est révélé par un masque qui suit la ligne médiane
   (stroke-dashoffset animé au défilement, comme les kanji). Bords rugueux : filtre de turbulence. */
const lisse = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

export function ensoPinceau(id, { cx = 200, cy = 200, r = 172, debut = -118, balayage = 332, epaisseur = 34, graine = 5 } = {}) {
  let g = graine * 9301 + 49297;
  const alea = () => { g = (g * 9301 + 49297) % 233280; return g / 233280; };
  const K = 160;
  const pt = (t, decalage = 0) => {
    const a = ((debut + balayage * t) * Math.PI) / 180;
    const rr = r + Math.sin(t * 7.3 + graine) * 2.2 + (t - 0.5) * 6 + decalage;
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr];
  };
  const largeur = (t) => epaisseur * (0.5 + 0.5 * lisse(0, 0.06, t)) * (1 - 0.6 * t ** 1.15) * (1 + 0.12 * Math.sin(t * 9 + graine));
  const f = (n) => n.toFixed(1);
  const bande = (t0, t1, o0, o1) => {
    /* Bande entre les décalages o0 et o1 (fractions de la largeur, de -0,5 à 0,5), de t0 à t1. */
    const ext = [], int = [];
    for (let i = 0; i <= K; i++) {
      const t = t0 + ((t1 - t0) * i) / K;
      const w = largeur(t);
      ext.push(pt(t, o1 * w + (alea() - 0.5) * 1.8));
      int.push(pt(t, o0 * w + (alea() - 0.5) * 1.8));
    }
    return 'M' + ext.map(([x, y]) => `${f(x)} ${f(y)}`).join('L') + 'L' + int.reverse().map(([x, y]) => `${f(x)} ${f(y)}`).join('L') + 'Z';
  };
  let d = bande(0, 0.72, -0.5, 0.5);
  /* Encre accumulée au point de départ. */
  const [x0, y0] = pt(0.012);
  const w0 = largeur(0) * 0.62;
  d += `M${f(x0 - w0)} ${f(y0)}a${f(w0)} ${f(w0)} 0 1 0 ${f(2 * w0)} 0a${f(w0)} ${f(w0)} 0 1 0 ${f(-2 * w0)} 0Z`;
  /* Trait sec : fibres séparées, chacune s'arrête plus ou moins tôt. */
  const fibres = 9;
  for (let i = 0; i < fibres; i++) {
    const o = -0.46 + (0.92 * i) / (fibres - 1) + (alea() - 0.5) * 0.05;
    const e = 0.07 + alea() * 0.07;
    const fin = 0.8 + alea() * 0.2 - Math.abs(o) * 0.16;
    const trou = alea() < 0.45 ? 0.8 + alea() * 0.08 : 0;
    if (trou) { d += bande(0.66, trou, o - e / 2, o + e / 2); d += bande(trou + 0.015, fin, o - e / 2, o + e / 2); }
    else d += bande(0.66, fin, o - e / 2, o + e / 2);
  }
  /* Ligne médiane du masque (révélation au pinceau). */
  const milieu = Array.from({ length: 121 }, (_, i) => pt(i / 120)).map(([x, y], i) => `${i ? 'L' : 'M'}${f(x)} ${f(y)}`).join('');
  return `<defs>
  <mask id="masque-${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="400"><path class="enso-trait" d="${milieu}" pathLength="1" fill="none" stroke="#fff" stroke-width="${f(epaisseur * 2.2)}" stroke-linecap="round"/></mask>
</defs>
<g mask="url(#masque-${id})"><path class="enso-encre" d="${d}"/></g>`;
}
