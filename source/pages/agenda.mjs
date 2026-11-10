/* Agenda (page de catégorie) : ouverture compacte, rangée de feuilles, prochaine séance en très grand ;
   filtres gardés dans l'adresse, la liste se réorganise sous les yeux ; passé grisé ; tarifs et formules. */
import { html } from '../../outils/gabarit.mjs';
import { prochaines, ligne, libelleProchaine, maintenantParis, statut, moisDe } from '../gabarits/agenda.mjs';

export const page = { cle: 'agenda', fichier: 'agenda', imagePartage: 'grok/agenda-feuilles' };

export default (c) => {
  const n = maintenantParis();
  const agenda = c.donnees.agenda;
  const suivante = prochaines(agenda, n, 1)[0];
  const types = Object.entries(c.donnees.types);
  const avenir = agenda.filter((e) => statut(e, n) !== 'passe');
  const passees = agenda.filter((e) => statut(e, n) === 'passe');
  const parMois = [];
  for (const e of avenir) { const m = moisDe(e); let g = parMois.find((x) => x.m === m); if (!g) parMois.push(g = { m, l: [] }); g.l.push(e); }
  return html`
<section class="g-ouverture" id="debut">
  <div class="conteneur g-ouverture-grille">
    <div>
      <p class="surtitre" data-anime="gsap">${c.t('agenda.surtitre')}</p>
      <h1 class="titre-pinceau" data-anime="gsap" data-grille="typo">${c.t('agenda.titre')}</h1>
      <p class="intro masque-ecran-tres-bas" data-anime="gsap">${c.t('agenda.texte')}</p>
    </div>
    <div class="g-prochaine" data-info-cle data-anime="gsap">
      <p class="g-prochaine-label" data-prochaine-label data-tout="${c.s('agenda.info')}" data-filtre-label="${c.s('agenda.infoFiltre')}">${c.t('agenda.info')}</p>
      <p class="g-prochaine-texte" data-prochaine>${suivante ? libelleProchaine(suivante, n) : ''}</p>
      <p>${suivante ? html`<a class="bouton" href="${suivante.lien}" target="_blank" rel="noopener" data-action-principale data-retour data-prochaine-lien aria-label="${c.s('agenda.action')} (${c.s('commun.nouvelOnglet')})">${c.t('agenda.action')}</a>` : ''}</p>
    </div>
  </div>
  <div class="g-feuilles" data-iris-centre>
    ${c.media({ nom: 'grok/agenda-feuilles', alt: c.s('pages.agenda.partageAlt'), classe: 'g-feuilles-media', priorite: true, sizes: '100vw', cadrage: '50% 38%', attrs: 'data-fx="parallaxe" data-fx-force="8"' })}
  </div>
</section>

<section class="g-liste conteneur" id="dates">
  <svg class="anneaux-deco anneaux-deco--petit" viewBox="0 0 200 200" data-visuel aria-hidden="true" focusable="false"><circle cx="100" cy="100" r="30"/><circle cx="100" cy="100" r="56"/><circle cx="100" cy="100" r="82"/></svg>
  <div class="filtres" role="group" aria-label="${c.s('agenda.filtres')}" data-filtres data-anime>
    <button type="button" class="filtre" data-filtre="tout" aria-pressed="true">${c.t('agenda.tout')}</button>
    ${types.map(([k, t]) => html`<button type="button" class="filtre filtre--${k}" data-filtre="${k}" aria-pressed="false">${t.nom}</button>`)}
  </div>
  <p class="filtres-vide" data-filtres-vide hidden>${c.t('agenda.aucune')}</p>
  <div class="mois-liste" data-agenda data-grille="retour">
    ${parMois.map((g) => html`<div class="mois" data-mois-groupe>
      <h2 class="mois-titre">${g.m}</h2>
      <ol class="dates-liste" data-anime="cascade">${g.l.map((e) => ligne(c, e, { n }))}</ol>
    </div>`)}
  </div>
  <details class="passees" data-anime>
    <summary>${c.t('agenda.passees')} (${String(passees.length)})</summary>
    <ol class="dates-liste dates-liste--passees">${passees.map((e) => ligne(c, e, { n }))}</ol>
  </details>
</section>

<section class="g-tarifs" id="tarifs">
  <div class="conteneur g-tarifs-grille">
    <div>
      <p class="surtitre" data-anime>${c.t('agenda.tarifsSurtitre')}</p>
      <h2 data-anime="lignes">${c.t('agenda.tarifsTitre')}</h2>
      <h3 data-anime>${c.t('agenda.unite')}</h3>
      <ul class="tarifs-unite tarifs-unite--sombre" data-anime="cascade">${c.donnees.tarifs.unite.map((t) => html`<li><span class="tarif-prix" data-prix>${t.prix}</span><span class="tarif-libelle">${t.libelle}</span><span class="tarif-detail">${t.detail}</span></li>`)}</ul>
      <p data-anime>${c.t('agenda.mbsrLigne')}</p>
    </div>
    <div>
      <h3 data-anime>${c.t('agenda.formules')}</h3>
      <ul class="formules" data-anime="cascade">${c.donnees.tarifs.formules.map((f) => html`<li><strong>${f.libelle}</strong><span>${f.detail}</span></li>`)}</ul>
      <p data-anime>${c.t('agenda.formulesPrix')}</p>
      <p data-anime><a class="bouton bouton--contour" href="${c.site.billetterie}" target="_blank" rel="noopener" aria-label="${c.s('agenda.formulesLien')} (${c.s('commun.nouvelOnglet')})">${c.t('agenda.formulesLien')}</a></p>
      ${c.media({ nom: 'grok/marches-feuilles', alt: '', classe: 'g-tarifs-media', sizes: '(max-width: 760px) 92vw, 40vw', attrs: 'data-fx="zoom"' })}
    </div>
  </div>
</section>
`;
};
