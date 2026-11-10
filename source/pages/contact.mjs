/* Contact : bandeau panoramique (banc sous l'arbre), l'e-mail en grand, formulaire en trois temps,
   les lieux sur un plan simplifié. Le message envoyé se replie en goutte et tombe dans la petite cloche. */
import { html } from '../../outils/gabarit.mjs';
import { enso } from '../gabarits/commun.mjs';

export const page = { cle: 'contact', fichier: 'contact', imagePartage: 'grok/contact-banc' };

const LIEUX = [
  { cle: 'salle', x: 300, y: 70 },
  { cle: 'floral', x: 150, y: 150 },
  { cle: 'tropical', x: 330, y: 150 },
  { cle: 'eau', x: 255, y: 185 },
  { cle: 'chateau', x: 140, y: 100 },
];

export default (c) => html`
<section class="c-ouverture" id="debut">
  <div class="c-bandeau" data-iris-centre>
    ${c.media({ nom: 'grok/contact-banc', alt: c.s('pages.contact.partageAlt'), classe: 'c-bandeau-media', priorite: true, sizes: '100vw', cadrage: '58% 60%', attrs: 'data-fx="zoom" data-fx-force="10"' })}
  </div>
  <div class="conteneur c-ouverture-grille">
    <div>
      <p class="surtitre" data-anime="gsap">${c.t('contact.surtitre')}</p>
      <h1 class="titre-pinceau" data-anime="gsap" data-grille="typo">${c.t('contact.titre')}</h1>
    </div>
    <div>
      <p class="intro masque-ecran-bas" data-anime="gsap">${c.t('contact.texte')}</p>
      <p class="c-email" data-anime="gsap"><a href="mailto:${c.site.contact.email}">${c.site.contact.email}</a></p>
      <p class="actions" data-anime="gsap"><a class="bouton" href="#formulaire" data-action-principale>${c.t('contact.action')}</a> <span class="prochaine-courte" data-info-cle>${c.t('contact.info')}</span></p>
    </div>
  </div>
</section>

<section class="c-form conteneur" id="formulaire">
  <svg class="anneaux-deco anneaux-deco--petit" viewBox="0 0 200 200" data-visuel aria-hidden="true" focusable="false"><circle cx="100" cy="100" r="30"/><circle cx="100" cy="100" r="56"/><circle cx="100" cy="100" r="82"/></svg>
  <h2 data-anime="lignes">${c.t('contact.formTitre')}</h2>
  <form class="etapes" data-formulaire data-etapes data-grille="retour" novalidate>
    <ol class="etapes-fil" aria-hidden="true"><li class="est-active">${c.t('contact.etape1')}</li><li>${c.t('contact.etape2')}</li><li>${c.t('contact.etape3')}</li></ol>
    <fieldset class="etape est-active" data-etape-form="0">
      <legend>${c.t('contact.sujet')}</legend>
      <div class="choix">${['marche', 'atelier', 'enligne', 'mbsr', 'demande', 'autre'].map((k, i) => html`<label class="choix-item"><input type="radio" name="sujet" value="${k}"${i === 0 ? ' required' : ''}> <span>${c.t(`contact.sujets.${k}`)}</span></label>`)}</div>
      <p class="etape-actions"><button type="button" class="bouton" data-suivant>${c.t('contact.suivant')}</button></p>
    </fieldset>
    <fieldset class="etape" data-etape-form="1">
      <legend>${c.t('contact.etape2')}</legend>
      <label class="champ"><span>${c.t('contact.message')}</span><textarea name="message" rows="6" required minlength="10"></textarea></label>
      <p class="etape-actions"><button type="button" class="bouton bouton--contour" data-precedent>${c.t('contact.precedent')}</button> <button type="button" class="bouton" data-suivant>${c.t('contact.suivant')}</button></p>
    </fieldset>
    <fieldset class="etape" data-etape-form="2">
      <legend>${c.t('contact.etape3')}</legend>
      <label class="champ"><span>${c.t('contact.nom')}</span><input type="text" name="nom" autocomplete="name" required></label>
      <label class="champ"><span>${c.t('contact.email')}</span><input type="email" name="email" autocomplete="email" required></label>
      <p class="rgpd">${c.t('contact.rgpd')}</p>
      <p class="etape-actions"><button type="button" class="bouton bouton--contour" data-precedent>${c.t('contact.precedent')}</button> <button type="submit" class="bouton">${c.t('contact.envoyer')}</button></p>
    </fieldset>
    <p class="message-envoi" data-message-envoi hidden role="status">${c.t('contact.simule')}</p>
  </form>
</section>

<section class="c-lieux" id="lieux">
  <div class="conteneur c-lieux-grille">
    <div>
      <p class="surtitre" data-anime>${c.t('contact.lieuxSurtitre')}</p>
      <h2 data-anime="lignes">${c.t('contact.lieuxTitre')}</h2>
      <ol class="lieux" data-anime="cascade">
        ${LIEUX.map((l, i) => html`<li><span class="lieu-num" aria-hidden="true">${String(i + 1)}</span><div><strong>${c.donnees.lieux[l.cle].nom}</strong><span>${c.donnees.lieux[l.cle].depart}</span>${c.donnees.lieux[l.cle].note ? html`<span class="lieu-note">${c.donnees.lieux[l.cle].note}</span>` : ''}</div></li>`)}
        <li><span class="lieu-num" aria-hidden="true">✦</span><div><strong>${c.donnees.lieux.enligne.nom}</strong><span>${c.donnees.lieux.enligne.depart}</span></div></li>
      </ol>
    </div>
    <svg class="c-plan" viewBox="0 0 420 260" data-visuel data-fx="trace" role="img" aria-label="${c.s('contact.planAria')}">
      <path data-fx-trait class="plan-bois" d="M60 130 C 80 90 140 80 190 90 C 250 76 320 88 360 120 C 380 150 366 196 330 216 C 280 240 210 246 150 234 C 100 224 56 198 50 162 C 48 150 52 140 60 130 Z"/>
      <path data-fx-trait class="plan-rer" d="M20 52 C 120 46 240 40 410 34"/>
      <path data-fx-trait class="plan-ruisseau" d="M232 128 C 244 150 238 168 256 184 C 276 200 300 196 318 210"/>
      ${LIEUX.map((l, i) => html`<g class="plan-repere" data-repere><circle cx="${l.x}" cy="${l.y}" r="13"/><text x="${l.x}" y="${l.y + 5}" text-anchor="middle">${String(i + 1)}</text></g>`)}
    </svg>
  </div>
</section>

<section class="c-enso conteneur" id="enso">
  <div>
    <h2 data-anime="lignes">${c.t('commun.ensoTitre')}</h2>
    <p data-anime>${c.t('commun.ensoTexte')}</p>
  </div>
  ${enso(c)}
</section>
`;
