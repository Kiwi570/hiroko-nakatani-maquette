/* Accueil, plan « objet unique » : la cloche de méditation reste à l'écran (ordinateur) et change à chaque section.
   Chaque section porte data-eau : l'image que l'eau de la cloche reflète quand la section est lue. */
import { html, brut } from '../../outils/gabarit.mjs';
import { IMA, KOKORO, NEN, TRAITS_IMA, TRAITS_KOKORO, TRAITS_NEN } from '../gabarits/kanji.mjs';
import { prochaines, ligne, libelleProchaine, maintenantParis, seanceProchaine, compte } from '../gabarits/agenda.mjs';
import { ensoPinceau } from '../gabarits/enso-pinceau.mjs';

export const page = { cle: 'accueil', fichier: 'index', imagePartage: 'grok/plongee-bois' };

/* Kanji écrit au pinceau : le glyphe est révélé trait par trait par un masque (lignes médianes, épaisseur du pinceau). */
const kanji = (id, glyphe, traits) => html`<svg class="kanji-svg" viewBox="0 -880 1000 1000" aria-hidden="true" focusable="false">
  <defs><mask id="${id}" maskUnits="userSpaceOnUse" x="-100" y="-200" width="1200" height="1200">${brut(traits.map((d, i) => `<path class="kanji-trait" data-trait="${i}" d="${d}" pathLength="1" fill="none" stroke="#fff" stroke-width="150" stroke-linecap="round" stroke-linejoin="round"/>`).join(''))}</mask></defs>
  <g transform="scale(1,-1)"><path class="kanji-ombre" d="${glyphe}"/><path class="kanji-encre" d="${glyphe}" mask="url(#${id})"/></g>
</svg>`;

export default (c) => {
  const n = maintenantParis();
  const agenda = c.donnees.agenda;
  const suivante = prochaines(agenda, n, 1)[0];
  const liste = prochaines(agenda, n, 8);
  const seance = suivante ? seanceProchaine(suivante, n) : null;
  return html`
<section class="accueil-ouverture duo" id="debut" data-eau="grok/eau-bois">
  <canvas class="saison" data-saison aria-hidden="true" data-audit-ignorer></canvas>
  <div class="duo-texte">
    <p class="surtitre" data-anime="gsap">${c.t('accueil.surtitre')}</p>
    <h1 class="titre-pinceau" data-anime="gsap" data-grille="typo">${c.tb('accueil.titre')}</h1>
    <p class="intro" data-anime="gsap">${c.t('accueil.texte')}</p>
    <p class="pour-qui" data-anime="gsap">${c.t('accueil.pourQui')}</p>
    <p class="actions" data-anime="gsap">
      ${c.lien('agenda', { classe: 'bouton', texte: c.t('accueil.action'), attrs: 'data-action-principale data-survol="magnetique"' })}
      <a class="bouton bouton--contour" href="#pratiques">${c.t('accueil.actionDeux')}</a>
    </p>
    <p class="prochaine" data-info-cle data-anime="gsap"><span>${c.t('accueil.prochaine')}${seance ? html` <span class="compte" data-compte="${seance.debut}" data-compte-fin="${seance.fin}" aria-hidden="true">${compte(seance.debut, seance.fin, n)}</span>` : ''}</span> <a href="${c.url('agenda')}" data-libelle="${c.libelle('agenda')}" data-prochaine>${suivante ? libelleProchaine(suivante, n) : c.s('accueil.prochaineDefaut')}</a></p>
  </div>
  <div class="cloche" data-cloche data-grille="manipuler fil" data-effet="cloche" data-superpose>
    <span class="cloche-coussin" aria-hidden="true"></span>
    <span class="cloche-bol" aria-hidden="true"></span>
    <div class="cloche-eau" data-iris-centre="disque">
      ${c.media({ nom: 'grok/eau-bois', alt: c.s('pages.accueil.partageAlt'), classe: 'cloche-repli', priorite: true, sizes: '(max-width: 999px) 70vw, 36vw' })}
      <canvas class="cloche-canvas" aria-hidden="true"></canvas>
    </div>
    <button class="cloche-frapper" type="button" aria-label="${c.s('accueil.clocheAria')}"></button>
    <p class="cloche-consigne" data-anime="gsap"><span class="si-souris">${c.t('accueil.consigne')}</span><span class="si-tactile">${c.t('accueil.consigneTactile')}</span></p>
  </div>
</section>

<section class="nen duo" id="nen" data-eau="grok/eau-matin">
  <div class="duo-texte">
    <p class="surtitre" data-anime>${c.t('accueil.nenSurtitre')}</p>
    <h2 data-anime="lignes">${c.t('accueil.nenTitre')}</h2>
    <div class="nen-kanji" data-kanji data-effet="kanji-pinceau" data-visuel role="img" aria-label="${c.s('accueil.nenIma')} + ${c.s('accueil.nenKokoro')} = 念">
      <figure class="kanji">${kanji('m-ima', IMA, TRAITS_IMA)}<figcaption aria-hidden="true">${c.t('accueil.nenIma')}</figcaption></figure>
      <span class="kanji-signe" aria-hidden="true">+</span>
      <figure class="kanji">${kanji('m-kokoro', KOKORO, TRAITS_KOKORO)}<figcaption aria-hidden="true">${c.t('accueil.nenKokoro')}</figcaption></figure>
      <span class="kanji-signe" aria-hidden="true">=</span>
      <figure class="kanji kanji--nen">${kanji('m-nen', NEN, TRAITS_NEN)}<figcaption aria-hidden="true">${c.t('accueil.nenKanji')}</figcaption></figure>
    </div>
    <p class="nen-texte" data-anime>${c.t('accueil.nenTexte')}</p>
    <ul class="nen-points" data-anime="cascade">${pointsNen(c)}</ul>
  </div>
</section>

<section class="pratiques duo" id="pratiques" data-eau="grok/eau-bois">
  <div class="duo-texte">
    <p class="surtitre" data-anime>${c.t('accueil.pratiquesSurtitre')}</p>
    <h2 data-anime="lignes">${c.t('accueil.pratiquesTitre')}</h2>
    <ul class="pratiques-grille" data-anime="cascade">
      ${c.donnees.pratiques.map((p) => html`<li class="pratique" data-eau-carte="${p.eau}">
        ${c.lien(p.page, { ancre: p.ancre || '', classe: 'pratique-lien', texte: html`
          ${c.media({ nom: p.image, alt: '', classe: 'pratique-media', sizes: '(max-width: 760px) 92vw, (max-width: 999px) 45vw, 24vw' })}
          <span class="pratique-corps">
            <span class="pratique-titre">${p.titre}</span>
            <span class="pratique-meta">${p.quand}<br>${p.ou}</span>
            <span class="pratique-prix" data-prix>${p.prix}</span>
            <span class="pratique-texte">${p.texte}</span>
            <span class="pratique-voir">${c.t('accueil.pratiquesVoir')} <span aria-hidden="true">→</span></span>
          </span>` })}
      </li>`)}
    </ul>
  </div>
</section>

<section class="marche-scene" id="marche" data-scene data-grille="scene" data-effet="marche-pas" data-eau="grok/pas-depart">
  <div class="marche-cadre duo" data-collant>
    <div class="duo-texte marche-texte">
      <p class="surtitre" data-anime>${c.t('accueil.marcheSurtitre')}</p>
      <h2 data-anime="lignes">${c.t('accueil.marcheTitre')}</h2>
      <p class="marche-consigne" data-anime>${c.t('accueil.marcheTexte')}</p>
      <svg class="marche-chemin" viewBox="0 0 640 120" data-visuel aria-hidden="true" focusable="false">
        <path class="chemin-fond" d="M20 80 C 90 20 150 110 230 70 S 360 20 420 64 S 540 108 620 40"/>
        <path class="chemin-trace" d="M20 80 C 90 20 150 110 230 70 S 360 20 420 64 S 540 108 620 40" pathLength="1"/>
        ${[[20, 80], [130, 64], [230, 70], [330, 40], [470, 82], [620, 40]].map(([x, y], i) => html`<circle class="chemin-arret" data-arret="${i}" cx="${x}" cy="${y}" r="9"/>`)}
        <circle class="chemin-pas" cx="20" cy="80" r="6"/>
      </svg>
      <ol class="marche-etapes">
        ${c.donnees.marche.map((s, i) => html`<li class="etape" data-etape="${i}" data-eau-etape="${s.eau}">
          ${s.image ? c.media({ nom: s.image, alt: '', classe: 'etape-media', sizes: '(max-width: 760px) 30vw, 160px' }) : html`<span class="etape-point" aria-hidden="true"></span>`}
          <div><p class="etape-heure">${s.heure}</p><h3>${s.titre}</h3><p>${s.texte}</p></div>
        </li>`)}
      </ol>
      <p class="marche-lien">${c.lien('marches', { classe: 'bouton bouton--contour', texte: c.t('accueil.marcheAction') })}</p>
    </div>
  </div>
</section>

<section class="dates duo" id="dates" data-eau="grok/eau-soir">
  <div class="duo-texte">
    <p class="surtitre" data-anime>${c.t('accueil.datesSurtitre')}</p>
    <h2 data-anime="lignes">${c.t('accueil.datesTitre')}</h2>
    ${c.media({ nom: 'grok/agenda-feuilles', alt: '', classe: 'dates-bandeau', sizes: '(max-width: 999px) 92vw, 50vw', attrs: 'data-anime="rideau"' })}
    <p data-anime>${c.t('accueil.datesTexte')}</p>
    <ol class="dates-liste" data-prochaines="4" data-grille="retour">${liste.map((e) => ligne(c, e, { n }))}</ol>
    <p class="dates-tout">${c.lien('agenda', { classe: 'bouton bouton--contour', texte: c.t('accueil.datesTout') })}</p>
  </div>
</section>

<section class="qui duo" id="hiroko" data-eau="eau-cerisier">
  <div class="duo-texte qui-grille">
    <div class="qui-cadre" data-effet="enso-qui">
      ${c.media({ nom: 'hiroko-aquarelle', alt: c.s('accueil.quiAlt'), classe: 'qui-media', sizes: '(max-width: 760px) 60vw, 22vw' })}
      <svg class="qui-enso" viewBox="0 0 400 400" aria-hidden="true" focusable="false" data-audit-ignorer>${brut(ensoPinceau('qui'))}</svg>
    </div>
    <div>
      <p class="surtitre" data-anime>${c.t('accueil.quiSurtitre')}</p>
      <h2 data-anime="lignes">${c.t('accueil.quiTitre')}</h2>
      <p data-anime>${c.t('accueil.quiTexte')}</p>
      <p data-anime>${c.t('accueil.quiAsso')}</p>
      <blockquote class="citation" data-anime><p>« ${c.t('accueil.temoignage')} »</p><footer>${c.t('accueil.temoignageAuteur')}</footer></blockquote>
    </div>
  </div>
</section>

<section class="plongee" id="plongee" data-effet="plongee" data-eau="grok/eau-plongee">
  <div class="plongee-cadre">
    ${c.media({ nom: 'grok/plongee-bois', alt: c.s('accueil.plongeeAlt'), classe: 'plongee-media', sizes: '100vw' })}
    <div class="plongee-plans" aria-hidden="true" data-effet="plongee-profondeur" data-superpose>
      <svg class="plan plan--milieu" viewBox="0 0 400 400" focusable="false">${brut(feuillage(3))}</svg>
      <canvas class="plongee-poussiere" data-poussiere data-effet="poussiere-or" data-audit-ignorer></canvas>
      ${['hg', 'hd', 'bd'].map((k, i) => html`<svg class="plan plan--${k}" viewBox="0 0 400 400" focusable="false">${brut(feuillage(i))}</svg>`)}
    </div>
    <div class="plongee-texte conteneur">
      <p class="surtitre" data-plongee-suite>${c.t('accueil.plongeeSurtitre')}</p>
      <h2 class="plongee-titre" data-plongee-titre data-effet="titre-onde">${c.t('accueil.plongeeTitre')}</h2>
      <p data-plongee-suite>${c.t('accueil.plongeeTexte')}</p>
      <p class="actions" data-plongee-suite>
        ${c.lien('agenda', { params: 'type=marche', classe: 'bouton bouton--clair', texte: c.t('accueil.plongeeAction'), attrs: 'data-survol="magnetique"' })}
        ${c.lien('contact', { classe: 'bouton bouton--contour-clair', texte: c.t('accueil.plongeeDeux') })}
      </p>
    </div>
  </div>
</section>
`;
};

/* Branche et feuilles de ginkgo en silhouette (plans du bois découpés), dessinées en SVG. */
function feuillage(n) {
  let graine = 7 + n * 13;
  const r = () => { graine = (graine * 9301 + 49297) % 233280; return graine / 233280; };
  const feuille = (x, y, a, t) => `<path transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${a.toFixed(0)}) scale(${t.toFixed(2)})" d="M0 0 C -14 -10 -26 -34 -18 -46 C -8 -40 8 -40 18 -46 C 26 -34 14 -10 0 0 Z"/>`;
  let d = `<path d="M-20 ${60 + n * 30} C 80 ${90 + n * 20} 170 ${150 + n * 10} 300 ${250 - n * 20}" fill="none" stroke-width="${9 - n * 2}"/>`;
  for (let i = 0; i < 26; i++) {
    const t = r();
    const x = -10 + t * 300, y = 60 + n * 30 + t * (190 - n * 30) + (r() - 0.5) * 60;
    d += feuille(x, y, r() * 360, 0.7 + r() * 0.9);
  }
  return d;
}

function pointsNen(c) {
  return ['0', '1', '2'].map((i) => html`<li>${c.t(`accueil.nenPoints.${i}`)}</li>`);
}
