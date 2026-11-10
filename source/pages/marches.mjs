/* Marches : ouverture plein cadre sombre (sentier dans la brume), plan rond des points de départ qui se dessine,
   feuilles de la vraie saison qui tombent ; fond mousse ; déroulé, parcours et dates, tarifs, témoignage. */
import { html } from '../../outils/gabarit.mjs';
import { prochaines, ligne, libelleProchaine, maintenantParis, quand, seanceProchaine, compte } from '../gabarits/agenda.mjs';

export const page = { cle: 'marches', fichier: 'marches', imagePartage: 'grok/marches-ouverture' };

/* Chaque parcours : sa boucle sur le plan rond (dessinée tour à tour, un marcheur la parcourt). */
const PARCOURS = [
  { cle: 'floral', image: 'parcours-floral', n: 1, repere: [168, 188], boucle: 'M168 188 C 134 178 112 150 128 128 C 146 104 190 112 204 138 C 216 162 198 194 168 188 Z' },
  { cle: 'tropical', image: 'parcours-tropical', n: 2, repere: [318, 168], boucle: 'M318 168 C 292 156 286 124 306 112 C 330 98 360 120 354 148 C 350 166 334 174 318 168 Z' },
  { cle: 'eau', image: 'grok/parcours-eau', n: 3, repere: [262, 214], boucle: 'M262 214 C 240 236 246 272 276 280 C 306 288 326 258 314 232 C 304 210 278 200 262 214 Z' },
  { cle: 'chateau', image: 'grok/parcours-chateau', n: 4, repere: [150, 122], boucle: 'M150 122 C 120 122 100 104 110 88 C 122 70 160 72 172 92 C 180 108 168 122 150 122 Z' },
];
const LIENS = {
  floral: 'https://www.billetweb.fr/marche-et-meditation-parc-floral-de-paris',
  tropical: 'https://www.billetweb.fr/marche-et-meditation-bois-de-vincennes-jardin',
  eau: 'https://www.billetweb.fr/marche-et-meditation-bois-de-vincennes-lac',
  chateau: 'https://www.billetweb.fr/marche-et-meditation-bois-de-vincennes-vincennes',
};

export default (c) => {
  const n = maintenantParis();
  const marches = c.donnees.agenda.filter((e) => e.type === 'marche');
  const suivante = prochaines(marches, n, 1)[0];
  return html`
<section class="m-ouverture" id="debut">
  ${c.media({ nom: 'grok/marches-ouverture', alt: c.s('pages.marches.partageAlt'), classe: 'm-ouverture-media', priorite: true, sizes: '100vw', cadrage: '60% 50%' })}
  <canvas class="saison" data-saison aria-hidden="true" data-audit-ignorer></canvas>
  <div class="m-ouverture-grille conteneur">
    <div class="m-ouverture-texte">
      <p class="surtitre" data-anime="gsap">${c.t('marches.surtitre')}</p>
      <h1 class="titre-pinceau" data-anime="gsap" data-grille="typo">${c.tb('marches.titre')}</h1>
      <p class="intro masque-ecran-tres-bas" data-anime="gsap">${c.t('marches.texte')}</p>
      <p class="actions" data-anime="gsap">${c.lien('agenda', { params: 'type=marche', classe: 'bouton bouton--clair', texte: c.t('marches.action'), attrs: 'data-action-principale' })}</p>
      <p class="prochaine prochaine--clair" data-info-cle data-anime="gsap"><span>${c.t('marches.info')}</span> <strong data-prochaine-type="marche">${suivante ? libelleProchaine(suivante, n).replace(' · Marche et méditation', '') + ' · ' + c.donnees.lieux[suivante.lieu].nom : c.s('marches.parcoursTerminee')}</strong></p>
    </div>
    <div class="plan-rond" data-iris-centre="disque" data-effet="plan-trace" role="img" aria-label="${c.s('marches.carteAria')}">
      <svg viewBox="0 0 400 400" aria-hidden="true" focusable="false" data-audit-ignorer>
        <circle class="plan-fond" cx="200" cy="200" r="196"/>
        <path class="plan-bois" data-trace d="M70 168 C 92 120 150 104 196 112 C 250 98 312 112 350 146 C 372 182 356 240 318 268 C 270 300 214 312 160 300 C 108 290 66 258 58 214 C 54 196 60 182 70 168 Z" pathLength="1"/>
        <path class="plan-eau" data-trace d="M120 236 C 132 222 156 222 162 238 C 166 252 146 262 130 256 C 118 252 114 244 120 236 Z" pathLength="1"/>
        <path class="plan-ruisseau" data-trace d="M228 150 C 244 176 236 198 256 214 C 276 230 300 226 318 242" pathLength="1"/>
        <path class="plan-rer" data-trace d="M30 92 C 120 84 220 76 380 70" pathLength="1"/>
        <circle class="plan-gare" cx="318" cy="72" r="7"/><circle class="plan-gare" cx="104" cy="84" r="7"/>
        ${PARCOURS.map((p) => html`<path class="plan-parcours" data-parcours-trace="${String(p.n)}" d="${p.boucle}" pathLength="1"/>`)}
        <circle class="plan-marcheur" data-marcheur cx="168" cy="188" r="6"/>
        ${PARCOURS.map((p) => html`<g class="plan-repere" data-repere><circle cx="${p.repere[0]}" cy="${p.repere[1]}" r="15"/><text x="${p.repere[0]}" y="${p.repere[1] + 5}" text-anchor="middle">${String(p.n)}</text></g>`)}
      </svg>
      <p class="plan-legende" data-plan-legende aria-hidden="true">${PARCOURS.map((p) => html`<span data-legende="${String(p.n)}">${String(p.n)} · ${c.donnees.lieux[p.cle].nom}</span>`)}</p>
    </div>
  </div>
</section>

<section class="m-deroule conteneur" id="deroule">
  <div class="m-deroule-tete">
    <p class="surtitre" data-anime>${c.t('marches.deroulSurtitre')}</p>
    <h2 data-anime="lignes">${c.t('marches.deroulTitre')}</h2>
    <p data-anime>${c.t('marches.deroulTexte')}</p>
  </div>
  <ol class="frise" data-anime="cascade" data-effet="frise" data-frise-eau>
    ${c.donnees.marche.map((s) => html`<li class="frise-pas">
      ${s.image ? c.media({ nom: s.image, alt: '', classe: 'frise-media', sizes: '(max-width: 760px) 40vw, 14vw' }) : html`<span class="frise-point" aria-hidden="true"></span>`}
      <p class="frise-heure">${s.heure}</p><h3>${s.titre}</h3><p>${s.texte}</p>
    </li>`)}
  </ol>
</section>

<section class="m-parcours" id="parcours">
  <div class="conteneur">
    <p class="surtitre" data-anime>${c.t('marches.parcoursSurtitre')}</p>
    <h2 data-anime="lignes">${c.t('marches.parcoursTitre')}</h2>
    <p class="pause-hiver" data-anime>${c.t('marches.pauseHiver')}</p>
    <ul class="parcours-grille" data-anime="cascade">
      ${PARCOURS.map((p) => {
        const lieu = c.donnees.lieux[p.cle];
        const s = prochaines(marches, n, 1, (e) => e.lieu === p.cle)[0];
        const toutes = marches.filter((e) => e.lieu === p.cle);
        return html`<li class="parcours" id="parcours-${p.cle}">
        ${c.media({ nom: p.image, alt: lieu.nom, classe: 'parcours-media', sizes: '(max-width: 760px) 92vw, 24vw', attrs: 'data-fx="parallaxe" data-fx-force="6"' })}
        <span class="parcours-num" aria-hidden="true">${String(p.n)}</span>
        <h3>${lieu.nom}</h3>
        <p class="parcours-depart"><span>${c.t('marches.parcoursDepart')}</span> ${lieu.depart}</p>
        <p class="parcours-date" data-parcours="${p.cle}"><span>${c.t('marches.parcoursProchaine')}</span> <strong>${s ? quand(s).ligne.replace(' · 10 h – 12 h', '') : (toutes.length ? c.s('marches.parcoursTerminee') : c.s('marches.parcoursAucune'))}</strong>${s ? html` <span class="compte" data-compte="${seanceProchaine(s, n).debut}" data-compte-fin="${seanceProchaine(s, n).fin}" aria-hidden="true">${compte(seanceProchaine(s, n).debut, seanceProchaine(s, n).fin, n)}</span>` : ''}</p>
        ${lieu.note ? html`<p class="parcours-note">${lieu.note}</p>` : ''}
        <p><a class="bouton bouton--petit" href="${LIENS[p.cle]}" target="_blank" rel="noopener" data-retour aria-label="${c.s('marches.parcoursReserver')} : ${lieu.nom} (${c.s('commun.nouvelOnglet')})">${c.t('marches.parcoursReserver')}</a></p>
      </li>`;
      })}
    </ul>
  </div>
</section>

<section class="m-tarifs" id="tarifs">
  ${c.media({ nom: 'grok/marches-feuilles', alt: '', classe: 'm-tarifs-media', sizes: '100vw', attrs: 'data-fx="parallaxe"' })}
  <canvas class="saison" data-saison data-effet="feuilles-tarifs" aria-hidden="true" data-audit-ignorer></canvas>
  <div class="conteneur m-tarifs-texte">
    <p class="surtitre" data-anime>${c.t('marches.tarifsSurtitre')}</p>
    <h2 data-anime="lignes">${c.t('marches.tarifsTitre')}</h2>
    <ul class="tarifs-unite" data-anime="cascade">${c.donnees.tarifs.unite.map((t) => html`<li><span class="tarif-prix" data-prix>${t.prix}</span><span class="tarif-libelle">${t.libelle}</span><span class="tarif-detail">${t.detail}</span></li>`)}</ul>
    <p data-anime>${c.t('marches.tarifsFormules')} <a class="lien-clair" href="${c.site.billetterie}" target="_blank" rel="noopener">${c.t('agenda.formulesLien')}</a></p>
  </div>
</section>

<section class="m-temoin conteneur" id="temoignage">
  ${c.media({ nom: 'marche-groupe', alt: c.s('accueil.temoignageAuteur'), classe: 'm-temoin-media', sizes: '(max-width: 760px) 92vw, 40vw', attrs: 'data-anime="rideau"' })}
  <div>
    <p class="surtitre" data-anime>${c.t('marches.temoignageTitre')}</p>
    <blockquote class="citation citation--grande" data-anime><p>« ${c.t('accueil.temoignage')} »</p><footer>${c.t('accueil.temoignageAuteur')}</footer></blockquote>
    <h2 data-anime="lignes">${c.t('marches.demandeTitre')}</h2>
    <p data-anime>${c.t('marches.demandeTexte')}</p>
    <p data-anime>${c.lien('contact', { params: 'sujet=demande', classe: 'bouton', texte: c.t('marches.demandeAction') })}</p>
  </div>
</section>
`;
};
