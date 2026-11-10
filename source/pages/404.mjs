/* Page 404 : la brume, le sentier qui se perd, et la petite cloche à frapper pour retrouver le chemin. */
import { html } from '../../outils/gabarit.mjs';
import { enso } from '../gabarits/commun.mjs';

export const page = { cle: '404', fichier: '404', partage: false };

export default (c) => html`
<section class="introuvable" id="debut">
  ${c.media({ nom: 'grok/404-brume', alt: c.s('pages.404.partageAlt'), classe: 'introuvable-media', priorite: true, sizes: '100vw', attrs: 'data-fx="zoom"' })}
  <div class="conteneur introuvable-texte" data-iris-centre>
    <h1 class="titre-pinceau" data-anime="gsap" data-grille="typo">${c.t('introuvable.titre')}</h1>
    <p data-anime="gsap">${c.t('introuvable.texte')}</p>
    <p class="actions" data-anime="gsap">${c.lien('accueil', { classe: 'bouton', texte: c.t('introuvable.retour'), attrs: 'data-action-principale' })} ${c.lien('agenda', { classe: 'bouton bouton--contour', texte: c.t('introuvable.agenda') })}</p>
    <p class="prochaine" data-info-cle data-anime="gsap">imakokolo@netc.fr</p>
  </div>
  <div class="introuvable-enso conteneur">${enso(c)}</div>
</section>
`;
