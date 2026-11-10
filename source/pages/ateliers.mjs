/* Ateliers et en ligne : ouverture claire et centrée, l'anneau des thèmes de l'année (ensō) avec le thème du mois ;
   la forme du centre respire et se transforme (morphing) ; la page passe à la nuit pour la méditation en ligne. */
import { html } from '../../outils/gabarit.mjs';
import { statut, quand, bornes, maintenantParis } from '../gabarits/agenda.mjs';

export const page = { cle: 'ateliers', fichier: 'ateliers', imagePartage: 'grok/ateliers-ouverture' };

export default (c) => {
  const n = maintenantParis();
  const moisCourant = n.jour.slice(0, 7);
  const themes = c.donnees.themes;
  const iCourant = Math.max(0, themes.findIndex((t) => t.mois === moisCourant));
  const courant = themes[iCourant];
  const ateliers = c.donnees.agenda.filter((e) => e.type === 'atelier');
  const saisons = c.donnees.agenda.filter((e) => e.type === 'saison');
  const atelierMois = ateliers.find((e) => e.date.startsWith(courant.mois));
  const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  const nomMois = (m) => MOIS[+m.slice(5, 7) - 1];
  const salle = c.donnees.lieux.salle, jardin = c.donnees.lieux.jardin;
  return html`
<section class="a-ouverture" id="debut">
  <div class="conteneur a-ouverture-tete">
    <p class="surtitre" data-anime="gsap">${c.t('ateliers.surtitre')}</p>
    <h1 class="titre-pinceau" data-anime="gsap" data-grille="typo">${c.t('ateliers.titre')}</h1>
    <p class="intro masque-ecran-bas" data-anime="gsap">${c.t('ateliers.texte')}</p>
  </div>
  <div class="anneau" data-anneau="${iCourant}" data-effet="anneau-themes" role="img" aria-label="${c.s('ateliers.anneauAria')} : ${courant.num} « ${courant.titre} »">
    <ol class="anneau-themes" aria-hidden="true">
      ${themes.map((t, i) => html`<li class="anneau-theme${i === iCourant ? ' est-courant' : ''}" style="--i:${i};--n:${themes.length}"><span class="anneau-num">${t.num}</span><span class="anneau-nom">${t.titre}</span></li>`)}
    </ol>
    <div class="anneau-centre" data-iris-centre="disque">
      ${c.media({ nom: 'grok/ateliers-ouverture', alt: c.s('pages.ateliers.partageAlt'), classe: 'anneau-media', priorite: true, sizes: '(max-width: 760px) 70vw, 34vw', cadrage: '50% 62%' })}
    </div>
  </div>
  <div class="conteneur a-ouverture-pied">
    <p class="prochaine" data-info-cle data-anime="gsap"><span>${c.t('ateliers.info')} · ${nomMois(courant.mois)}</span> <strong>${courant.num === '✦' ? '' : `Thème ${courant.num} · `}« ${courant.titre} »${atelierMois ? ` · atelier le ${quand(atelierMois).jour} ${quand(atelierMois).num} ${nomMois(atelierMois.date)}` : ''}</strong></p>
    <p class="actions" data-anime="gsap">${c.lien('agenda', { params: 'type=atelier', classe: 'bouton', texte: c.t('ateliers.action'), attrs: 'data-action-principale' })} <a class="bouton bouton--contour" href="#en-ligne">${c.t('ateliers.enligneSurtitre')}</a></p>
  </div>
</section>

<section class="a-cycle conteneur" id="cycle">
  <svg class="anneaux-deco anneaux-deco--petit" viewBox="0 0 200 200" data-visuel aria-hidden="true" focusable="false"><circle cx="100" cy="100" r="30"/><circle cx="100" cy="100" r="56"/><circle cx="100" cy="100" r="82"/></svg>
  <h2 data-anime="lignes">${c.t('ateliers.tableTitre')}</h2>
  <div class="cycle-defile" tabindex="0" role="region" aria-label="${c.s('ateliers.tableTitre')}">
  <table class="cycle" data-anime data-effet="cycle">
    <thead><tr><th scope="col">${c.t('ateliers.tableMois')}</th><th scope="col">${c.t('ateliers.tableTheme')}</th><th scope="col">${c.t('ateliers.tableAtelier')}</th><th scope="col">${c.t('ateliers.tableEnLigne')}</th></tr></thead>
    <tbody>
      ${themes.map((t, i) => {
        const a = ateliers.find((e) => e.date.startsWith(t.mois));
        const etat = t.mois < moisCourant ? 'passe' : t.mois === moisCourant ? 'courant' : 'avenir';
        return html`<tr class="cycle-ligne cycle-ligne--${etat}" data-mois="${t.mois}"><th scope="row">${nomMois(t.mois)}</th><td><span class="cycle-num">${t.num}</span> ${t.titre}</td><td>${a ? `${quand(a).jour} ${quand(a).num}` : c.s('ateliers.tableEnLigneSeul')}</td><td>${c.t('ateliers.tableQuatre')}</td></tr>`;
      })}
    </tbody>
  </table>
  </div>
</section>

<section class="a-atelier" id="atelier">
  <div class="conteneur a-atelier-grille">
    ${c.media({ nom: 'atelier-groupe', alt: c.s('ateliers.atelierSurtitre'), classe: 'a-atelier-media', sizes: '(max-width: 760px) 92vw, 46vw', attrs: 'data-anime="rideau"' })}
    <div>
      <p class="surtitre" data-anime>${c.t('ateliers.atelierSurtitre')}</p>
      <h2 data-anime="lignes">${c.t('ateliers.atelierTitre')}</h2>
      <p data-anime>${c.t('ateliers.atelierTexte')}</p>
      <div class="a-atelier-pratique" data-anime>
        ${c.media({ nom: 'grok/ateliers-tapis', alt: '', classe: 'a-tapis-media', sizes: '120px' })}
        <p>${c.t('ateliers.atelierApporter')}</p>
      </div>
      <p class="a-acces" data-anime><strong>${c.t('ateliers.atelierAcces')}</strong> · ${salle.nom}, ${salle.depart}. ${salle.note}</p>
      <p class="a-prix" data-anime><span data-prix>20 €</span> la séance · <a href="${c.url('agenda')}#tarifs" data-libelle="${c.libelle('agenda')}">formules et cartes</a></p>
    </div>
  </div>
</section>

<section class="a-enligne" id="en-ligne">
  <div class="conteneur a-enligne-grille">
    <div>
      <p class="surtitre" data-anime>${c.t('ateliers.enligneSurtitre')}</p>
      <h2 data-anime="lignes">${c.t('ateliers.enligneTitre')}</h2>
      <p data-anime>${c.t('ateliers.enligneTexte')}</p>
      <blockquote class="citation citation--clair" data-anime><p>« ${c.t('ateliers.enligneCitation')} »</p></blockquote>
      <p class="a-prix" data-anime><span data-prix>20,50 €</span> le mois, quatre mardis</p>
      <p data-anime><a class="bouton bouton--clair" href="https://www.billetweb.fr/meditation-du-soir-en-ligne" target="_blank" rel="noopener" data-retour aria-label="${c.s('ateliers.enligneAction')} (${c.s('commun.nouvelOnglet')})">${c.t('ateliers.enligneAction')}</a></p>
    </div>
    ${c.media({ nom: 'grok/ateliers-soir', alt: '', classe: 'a-enligne-media', sizes: '(max-width: 760px) 92vw, 46vw', attrs: 'data-fx="parallaxe"' })}
  </div>
</section>

<section class="a-saison" id="saison">
  <div class="conteneur a-saison-grille">
    ${c.media({ nom: 'saison-printemps', alt: 'Cerisier en fleurs dans le bois au printemps', classe: 'a-saison-media', sizes: '(max-width: 760px) 92vw, 46vw', attrs: 'data-fx="zoom"' })}
    <div>
      <p class="surtitre" data-anime>${c.t('ateliers.saisonSurtitre')}</p>
      <h2 data-anime="lignes">${c.t('ateliers.saisonTitre')}</h2>
      <p data-anime>${c.t('ateliers.saisonTexte')} ${jardin.nom}, ${jardin.depart}.</p>
      <ul class="saison-dates" data-anime="cascade">
        ${saisons.map((e) => html`<li class="saison-date date--${statut(e, n)}" data-date data-debut="${bornes(e).debut}" data-fin="${bornes(e).fin}" data-jour="${e.date}"><strong>${e.sous}</strong><span>${quand(e).ligne}</span></li>`)}
      </ul>
      <p data-anime><a class="bouton" href="https://www.billetweb.fr/atelier-de-meditation-en-plein-air-jardin-dagronomie-tropicale" target="_blank" rel="noopener" data-retour aria-label="${c.s('ateliers.saisonAction')} (${c.s('commun.nouvelOnglet')})">${c.t('ateliers.saisonAction')}</a></p>
    </div>
  </div>
</section>
`;
};
