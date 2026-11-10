/* Son de la cloche (WebAudio, synthétisé : aucun fichier), seulement après un geste du visiteur.
   Partiels d'une cloche de méditation (1, 2,76, 5,4 fois la fondamentale), léger battement, longue extinction.
   Une pastille indique ce qui sonne, avec un bouton Couper (choix mémorisé). */
const CLE = 'hiroko:son';
let ctx = null, maitre = null, frottement = null, coupe = false, minuterie = 0;
try { coupe = localStorage.getItem(CLE) === 'coupe'; } catch {}

function contexte() {
  if (ctx) return ctx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  maitre = ctx.createGain(); maitre.gain.value = 0.22; maitre.connect(ctx.destination);
  return ctx;
}

const pastille = () => document.querySelector('[data-pastille-son]');
function montrer(sonne) {
  const p = pastille();
  if (!p) return;
  const b = p.querySelector('[data-son-bascule]'), e = p.querySelector('[data-son-etat]');
  e.textContent = coupe ? b.dataset.etatCoupe : b.dataset.etatSonne;
  b.textContent = coupe ? b.dataset.libelleRemettre : b.dataset.libelleCouper;
  p.hidden = false;
  clearTimeout(minuterie);
  minuterie = setTimeout(() => { p.hidden = true; }, sonne ? 7000 : 3500);
}

export function frapper(force = 1) {
  if (coupe) { montrer(false); return; }
  const c = contexte();
  if (!c) return;
  if (c.state === 'suspended') c.resume();
  const t = c.currentTime, f0 = 196 * (0.98 + Math.random() * 0.04);
  [[1, 1, 7], [2.76, 0.45, 4.5], [5.4, 0.22, 2.6], [1.004, 0.5, 7.5]].forEach(([r, g, d]) => {
    const o = c.createOscillator(), v = c.createGain();
    o.type = 'sine'; o.frequency.value = f0 * r;
    v.gain.setValueAtTime(0.0001, t);
    v.gain.exponentialRampToValueAtTime(g * force, t + 0.012);
    v.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(v); v.connect(maitre); o.start(t); o.stop(t + d + 0.1);
  });
  montrer(true);
}

/* Frotter le bord : un chant continu dont le volume suit l'énergie de la cloche. */
export function frotter(energie) {
  if (coupe) { montrer(false); return; }
  const c = contexte();
  if (!c) return;
  if (c.state === 'suspended') c.resume();
  if (!frottement) {
    const v = c.createGain(); v.gain.value = 0; v.connect(maitre);
    const osc = [196, 196 * 1.003, 196 * 2.76].map((f, i) => { const o = c.createOscillator(); o.type = 'sine'; o.frequency.value = f; const g = c.createGain(); g.gain.value = i === 2 ? 0.25 : 0.5; o.connect(g); g.connect(v); o.start(); return o; });
    frottement = { v, osc };
  }
  frottement.v.gain.setTargetAtTime(Math.min(0.5, energie * 0.4), c.currentTime, 0.12);
  frottement.v.gain.setTargetAtTime(0, c.currentTime + 0.6, 0.9);
  montrer(true);
}

export function initSon() {
  const p = pastille();
  if (!p) return;
  p.querySelector('[data-son-bascule]').addEventListener('click', () => {
    coupe = !coupe;
    try { localStorage.setItem(CLE, coupe ? 'coupe' : 'oui'); } catch {}
    if (coupe && frottement && ctx) frottement.v.gain.setTargetAtTime(0, ctx.currentTime, 0.05);
    montrer(false);
  });
}

export const son = { frapper, frotter };
