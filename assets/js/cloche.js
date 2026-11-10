/* La cloche qui chante : l'eau du bol rendue en WebGL (sans bibliothèque).
   - frapper(x, y) : une onde part du point touché, s'élargit et s'éteint (élan amorti) ;
   - frotter(vitesse, angle) : faire le tour du bord fait monter l'énergie, des ondes stationnaires apparaissent,
     puis l'énergie retombe d'elle-même ;
   - versEau(nom) : l'eau se transforme en un autre reflet, depuis le centre, avec une onde au front (morphing).
   Textures carrées (images grok/eau-*). Densité de pixels limitée (1,25 sur ordinateur, 1 sur téléphone),
   rendu seulement à l'écran (boucle du socle), rien en mode calme : l'image de repli reste affichée. */
import { boucle, etat } from './socle/index.js?v=2';

const VS = `attribute vec2 p; varying vec2 v; void main(){ v = p * .5 + .5; gl_Position = vec4(p, 0., 1.); }`;
const FS = `precision mediump float;
varying vec2 v;
uniform sampler2D uA, uB;
uniform float uMix, uT, uE, uAng, uRes;
uniform vec4 uRip[6];
void main(){
  vec2 c = v - .5; float r = length(c) * 2.;
  if (r > 1.0) { gl_FragColor = vec4(0.); return; }
  vec2 n = c / max(length(c), 1e-4);
  vec2 d = vec2(0.); float h = 0.;
  for (int i = 0; i < 6; i++) {
    vec4 R = uRip[i];
    if (R.w <= 0.) continue;
    float age = uT - R.z;
    if (age < 0. || age > 5.) continue;
    vec2 q = v - R.xy; float dist = length(q);
    float k = dist - age * .3;
    float env = R.w * exp(-age * .9) * exp(-k * k * 70.);
    float w = sin(k * 64.) * env;
    d += (q / max(dist, 1e-4)) * w * .02; h += w;
  }
  float th = atan(c.y, c.x);
  float st = uE * sin(r * 22. - uT * 7.) * (.55 + .45 * cos(4. * (th - uAng))) * smoothstep(1., .15, r);
  d += n * st * .012; h += st * .8;
  float amb = sin(r * 9. - uT * .8) * .0025 + sin((c.x + c.y) * 7. + uT * .6) * .0015;
  d += n * amb;
  float f = uMix * 1.3; float kk = r - f;
  float bande = exp(-kk * kk * 50.) * step(.002, uMix) * step(uMix, .998);
  d += n * sin(kk * 46.) * bande * .035; h += sin(kk * 46.) * bande * .6;
  vec2 u = clamp(v + d, .001, .999);
  vec4 a = texture2D(uA, u); vec4 b = texture2D(uB, u);
  float m = smoothstep(f + .05, f - .05, r);
  vec3 col = mix(a.rgb, b.rgb, m);
  col += h * .22;
  col *= mix(1., .5, smoothstep(.5, 1., r));
  col += .06 * smoothstep(.97, .9, r) * smoothstep(.8, .95, r);
  float bord = smoothstep(1., 1. - 2.5 / uRes, r);
  gl_FragColor = vec4(col * bord, bord);
}`;

export class Cloche {
  constructor(racine, { surEnergie } = {}) {
    this.racine = racine;
    this.canvas = racine.querySelector('.cloche-canvas');
    this.eau = racine.querySelector('.cloche-eau');
    this.bol = racine.querySelector('.cloche-bol');
    this.ripples = [];
    this.E = 0; this.ang = 0; this.t = 0; this.mix = 0; this.mixCible = 0;
    this.textures = new Map();
    this.prets = new Map(); /* textures déjà chargées, lues sans attente à chaque image */
    this.courant = null; this.suivant = null;
    this.surEnergie = surEnergie;
    this.pret = this.initGL();
  }

  async initGL() {
    if (etat.calme || !this.canvas) return false;
    const gl = this.canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false });
    if (!gl) return false;
    this.gl = gl;
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
    const pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return false;
    gl.useProgram(pr);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    this.u = Object.fromEntries(['uA', 'uB', 'uMix', 'uT', 'uE', 'uAng', 'uRes', 'uRip'].map((k) => [k, gl.getUniformLocation(pr, k)]));
    gl.uniform1i(this.u.uA, 0); gl.uniform1i(this.u.uB, 1);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    const img = this.eau.querySelector('img');
    const nom = this.racine.closest('[data-eau]')?.dataset.eau || 'grok/eau-bois';
    await this.charger(nom, img && img.complete ? img : null);
    this.courant = nom; this.suivant = nom;
    this.dimensionner();
    new ResizeObserver(() => this.dimensionner()).observe(this.canvas);
    boucle(this.canvas, (dt, t) => this.image(dt, t), { lourde: true });
    /* Les autres reflets sont préparés après l'ouverture, pendant les temps morts : aucun décodage en plein défilement. */
    const autres = [...new Set([...document.querySelectorAll('[data-eau], [data-eau-carte], [data-eau-etape]')].map((el) => el.dataset.eau || el.dataset.eauCarte || el.dataset.eauEtape))];
    const suivante = () => { const n = autres.shift(); if (!n) return; this.charger(n).then(() => (window.requestIdleCallback || setTimeout)(suivante)); };
    window.addEventListener('socle:pret', () => setTimeout(suivante, 400), { once: true });
    if (etat.pret) setTimeout(suivante, 400);
    document.documentElement.classList.add('cloche-gl');
    this.dessiner();
    return true;
  }

  dimensionner() {
    if (!this.gl) return;
    const tactile = matchMedia('(hover: none)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1);
    const w = Math.max(64, Math.round(this.canvas.clientWidth * dpr));
    if (this.canvas.width !== w) { this.canvas.width = w; this.canvas.height = w; this.gl.viewport(0, 0, w, w); }
  }

  /* Texture d'un reflet : l'image -640 ou -1024 du pipeline (carrée), chargée une fois. */
  charger(nom, imgDeja) {
    if (!this.gl) return Promise.resolve(null);
    if (this.textures.has(nom)) return this.textures.get(nom);
    const p = new Promise((ok) => {
      const fin = (img) => {
        const gl = this.gl, tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img); } catch { ok(null); return; }
        this.prets.set(nom, tex);
        ok(tex);
      };
      if (imgDeja) { fin(imgDeja); return; }
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => { if (window.createImageBitmap) createImageBitmap(img).then(fin, () => fin(img)); else fin(img); };
      img.onerror = () => ok(null);
      img.src = `/assets/images/${nom}-640.webp`;
    });
    this.textures.set(nom, p);
    return p;
  }

  async versEau(nom) {
    if (!nom || nom === this.suivant) return;
    this.suivant = nom;
    if (!this.gl) { this.repli(nom); return; }
    const tex = await this.charger(nom);
    if (!tex || this.suivant !== nom) return;
    /* Une transformation à la fois : la précédente se termine d'abord (l'image d'arrivée devient le départ). */
    if (this.mixCible === 1 && this.cible) this.courant = this.cible;
    this.cible = nom; this.mix = 0; this.mixCible = 1;
    this.frapper(0.5, 0.5, 0.5);
  }

  /* Sans WebGL : l'image de repli change en fondu. */
  repli(nom) {
    const img = this.eau.querySelector('img');
    if (!img || etat.calme) return;
    const src = `/assets/images/${nom}-640.webp`;
    img.animate([{ opacity: 1 }, { opacity: 0.2 }, { opacity: 1 }], { duration: 700 });
    setTimeout(() => { img.srcset = `/assets/images/${nom}-640.webp 640w, /assets/images/${nom}-1024.webp 1024w`; img.src = src; }, 300);
  }

  frapper(x = 0.5, y = 0.5, force = 1) {
    this.ripples.push({ x, y: 1 - y, t: this.t, a: force });
    if (this.ripples.length > 6) this.ripples.shift();
  }

  frotter(vitesse, angle) {
    this.E = Math.min(1.4, this.E + vitesse);
    this.ang = angle;
  }

  image(dt, t) {
    this.t += dt;
    this.E *= Math.exp(-dt / 2.2);
    if (this.mixCible === 1) {
      this.mix = Math.min(1, this.mix + dt / 1.5);
      if (this.mix >= 1) { this.courant = this.cible; this.mix = 0; this.mixCible = 0; }
    }
    if (this.bol) this.bol.style.setProperty('--reflet', `${(this.ang * 57.3).toFixed(1)}deg`);
    if (this.surEnergie) this.surEnergie(this.E);
    this.dessiner();
  }

  dessiner() {
    const gl = this.gl;
    if (!gl) return;
    const a = this.prets.get(this.courant);
    const b = this.mixCible ? this.prets.get(this.cible) : a;
    if (!a) return;
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, a);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, b || a);
    gl.uniform1f(this.u.uMix, this.mixCible ? this.mix : 0);
    gl.uniform1f(this.u.uT, this.t);
    gl.uniform1f(this.u.uE, this.E);
    gl.uniform1f(this.u.uAng, this.ang);
    gl.uniform1f(this.u.uRes, this.canvas.width);
    const r = new Float32Array(24);
    this.ripples.forEach((p, i) => { r.set([p.x, p.y, p.t, p.a], i * 4); });
    gl.uniform4fv(this.u.uRip, r);
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

/* Gestes sur la cloche : frotter le bord en tournant (souris, ou glissement horizontal au doigt, le défilement
   vertical reste libre), toucher l'eau pour frapper, Entrée ou Espace sur le bouton pour frapper,
   flèches gauche et droite pour frotter. */
export function gestes(racine, cloche, son) {
  const btn = racine.querySelector('.cloche-frapper');
  let geste = null;
  const pos = (e) => {
    const r = racine.querySelector('.cloche-eau').getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height, cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
  };
  racine.addEventListener('pointerdown', (e) => {
    if (e.button > 0) return;
    const p = pos(e);
    geste = { id: e.pointerId, x0: e.clientX, y0: e.clientY, a: Math.atan2(e.clientY - p.cy, e.clientX - p.cx), t: performance.now(), bouge: false, p };
  });
  racine.addEventListener('pointermove', (e) => {
    if (!geste || e.pointerId !== geste.id) return;
    const dx = e.clientX - geste.x0, dy = e.clientY - geste.y0;
    if (!geste.bouge && Math.hypot(dx, dy) > 6) { geste.bouge = true; racine.classList.add('frotte'); try { racine.setPointerCapture(e.pointerId); } catch {} }
    if (!geste.bouge) return;
    const p = pos(e);
    const a = Math.atan2(e.clientY - p.cy, e.clientX - p.cx);
    let da = a - geste.a; if (da > Math.PI) da -= 2 * Math.PI; if (da < -Math.PI) da += 2 * Math.PI;
    const now = performance.now(), dt = Math.max(8, now - geste.t);
    /* Au doigt, seul le glissement horizontal arrive ici (pan-y) : il compte comme un tour du bord. */
    const v = e.pointerType === 'touch' ? Math.abs(e.movementX || 0) / 220 : Math.abs(da) * (16 / dt) * 0.35;
    cloche.frotter(Math.min(0.25, v), a);
    son && son.frotter(cloche.E);
    geste.a = a; geste.t = now;
  });
  const fin = (e) => {
    if (!geste || e.pointerId !== geste.id) return;
    if (!geste.bouge && e.type === 'pointerup') { const p = pos(e); cloche.frapper(p.x, p.y, 1); son && son.frapper(); racine.dispatchEvent(new CustomEvent('cloche:frappe', { bubbles: true })); }
    racine.classList.remove('frotte');
    geste = null;
  };
  racine.addEventListener('pointerup', fin);
  racine.addEventListener('pointercancel', fin);
  btn && btn.addEventListener('click', (e) => { if (e.detail === 0) { cloche.frapper(0.5, 0.5, 1); son && son.frapper(); } });
  btn && btn.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); cloche.frotter(0.22, cloche.ang + (e.key === 'ArrowLeft' ? -0.6 : 0.6)); son && son.frotter(cloche.E); }
  });
}
