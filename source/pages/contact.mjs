/* Contact : bandeau panoramique (banc sous l'arbre), l'e-mail en grand, formulaire en trois temps,
   les lieux sur un plan simplifié. Le message envoyé se replie en goutte et tombe dans la petite cloche. */
import { html } from '../../outils/gabarit.mjs';
import { enso } from '../gabarits/commun.mjs';

export const page = { cle: 'contact', fichier: 'contact', imagePartage: 'grok/contact-banc' };

/* Les cinq lieux sur la carte dessinée de l'est parisien (viewBox 520 × 340) et leur itinéraire. */
const LIEUX = [
  { cle: 'salle', x: 472, y: 78, vers: 'Maison du Citoyen, 16 rue du Révérend Père Lucien Aubry, 94120 Fontenay-sous-Bois' },
  { cle: 'floral', x: 196, y: 150, vers: 'Parc floral de Paris, Route de la Pyramide, 75012 Paris' },
  { cle: 'tropical', x: 394, y: 214, vers: 'Jardin d’agronomie tropicale, 45 bis avenue de la Belle Gabrielle, 75012 Paris' },
  { cle: 'eau', x: 322, y: 192, vers: 'Gare de Fontenay-sous-Bois, 94120 Fontenay-sous-Bois' },
  { cle: 'chateau', x: 168, y: 98, vers: 'Mairie de Vincennes, 53 bis rue de Fontenay, 94300 Vincennes' },
];
const itineraire = (l) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(l.vers)}`;

export default (c) => html`
<section class="c-ouverture" id="debut">
  <div class="conteneur c-ouverture-grille">
    <div>
      <p class="surtitre" data-anime="gsap">${c.t('contact.surtitre')}</p>
      <h1 class="titre-pinceau" data-anime="gsap" data-grille="typo">${c.tb('contact.titre')}</h1>
    </div>
    <div>
      <p class="intro masque-ecran-bas" data-anime="gsap">${c.t('contact.texte')}</p>
      <p class="c-email" data-anime="gsap"><a href="mailto:${c.site.contact.email}">${c.site.contact.email}</a></p>
      <p class="actions" data-anime="gsap"><a class="bouton" href="#formulaire" data-action-principale>${c.t('contact.action')}</a> <span class="prochaine-courte" data-info-cle>${c.t('contact.info')}</span></p>
    </div>
  </div>
  <div class="c-bandeau" data-iris-centre>
    ${c.media({ nom: 'grok/contact-banc', alt: c.s('pages.contact.partageAlt'), classe: 'c-bandeau-media', priorite: true, sizes: '100vw', cadrage: '58% 60%', attrs: 'data-fx="zoom" data-fx-force="10"' })}
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
    <div class="enveloppe" data-enveloppe aria-hidden="true" hidden>
      <svg viewBox="0 0 240 160" focusable="false"><rect class="env-corps" x="6" y="28" width="228" height="126" rx="6"/><path class="env-plis" d="M8 152 L100 92 M232 152 L140 92"/><path class="env-rabat" d="M8 32 L120 108 L232 32 Z"/></svg>
      <span class="tampon">${c.t('contact.recu')}</span>
    </div>
    <p class="message-envoi" data-message-envoi hidden role="status">${c.t('contact.simule')}</p>
  </form>
</section>

<section class="c-lieux" id="lieux">
  <div class="conteneur c-lieux-grille">
    <div>
      <p class="surtitre" data-anime>${c.t('contact.lieuxSurtitre')}</p>
      <h2 data-anime="lignes">${c.t('contact.lieuxTitre')}</h2>
      <ol class="lieux" data-anime="cascade">
        ${LIEUX.map((l, i) => html`<li data-lieu="${String(i + 1)}"><span class="lieu-num" aria-hidden="true">${String(i + 1)}</span><div><strong>${c.donnees.lieux[l.cle].nom}</strong><span>${c.donnees.lieux[l.cle].depart}</span>${c.donnees.lieux[l.cle].note ? html`<span class="lieu-note">${c.donnees.lieux[l.cle].note}</span>` : ''}<a class="lieu-itineraire" href="${itineraire(l)}" target="_blank" rel="noopener" aria-label="${c.s('contact.itineraire')} : ${c.donnees.lieux[l.cle].nom} (${c.s('commun.nouvelOnglet')})">${c.t('contact.itineraire')} <span aria-hidden="true">↗</span></a></div></li>`)}
        <li><span class="lieu-num" aria-hidden="true">✦</span><div><strong>${c.donnees.lieux.enligne.nom}</strong><span>${c.donnees.lieux.enligne.depart}</span></div></li>
      </ol>
    </div>
    <svg class="c-plan c-carte" viewBox="0 0 520 340" data-visuel data-effet="carte-pinceau" data-carte role="img" aria-label="${c.s('contact.planAria')}" data-audit-ignorer>
      <g filter="url(#encre-bords)">
        <path class="carte-bois" data-carte-trait d="M108 168 C 120 120 180 98 238 104 C 300 92 372 112 398 152 C 414 190 396 246 350 270 C 292 298 214 300 158 284 C 110 270 84 232 92 196 C 95 184 100 176 108 168 Z" pathLength="1"/>
        <path class="carte-lac" data-carte-trait d="M128 232 C 136 220 158 222 162 236 C 164 250 146 258 134 252 C 124 248 122 240 128 232 Z" pathLength="1"/>
        <path class="carte-lac" data-carte-trait d="M318 146 C 326 136 346 138 348 150 C 350 162 334 168 324 162 C 316 158 314 152 318 146 Z" pathLength="1"/>
        <path class="carte-marne" data-carte-trait d="M520 192 C 474 212 456 258 424 290 C 392 320 330 332 266 330 C 200 328 140 318 70 338" pathLength="1"/>
        <path class="carte-rer" data-carte-trait d="M0 86 C 60 80 110 74 150 72 C 250 66 360 82 430 118 C 464 140 472 196 452 254" pathLength="1"/>
      </g>
      <g class="carte-noms" aria-hidden="true">
        <text x="226" y="214" class="carte-nom-bois">Bois de Vincennes</text>
        <text x="300" y="322" class="carte-nom-eau">la Marne</text>
        <text x="10" y="74" class="carte-nom-rer">RER A</text>
        <text x="16" y="150">← Paris</text>
        <text x="126" y="58">Vincennes</text>
        <text x="442" y="114">Fontenay</text>
        <text x="464" y="262">Nogent</text>
      </g>
      ${[[150, 72], [430, 118], [452, 254]].map(([x, y]) => html`<rect class="carte-gare" x="${x - 6}" y="${y - 6}" width="12" height="12" rx="3"/>`)}
      ${LIEUX.map((l, i) => html`<g class="plan-repere carte-repere" data-repere="${String(i + 1)}" style="--x:${l.x}px;--y:${l.y}px"><circle cx="${l.x}" cy="${l.y}" r="14"/><text x="${l.x}" y="${l.y + 5}" text-anchor="middle">${String(i + 1)}</text></g>`)}
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
