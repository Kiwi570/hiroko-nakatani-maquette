/* MBSR : ouverture scindée sur l'indigo profond, « 8 semaines » et « 450 € » en grand ; scène de plongée :
   on descend d'un palier par semaine, la lumière s'éteint doucement. */
import { html } from '../../outils/gabarit.mjs';

export const page = { cle: 'mbsr', fichier: 'mbsr', imagePartage: 'grok/mbsr-ouverture' };

export default (c) => html`
<section class="b-ouverture" id="debut">
  <div class="b-ouverture-grille">
    <div class="b-ouverture-texte">
      <p class="surtitre" data-anime="gsap">${c.t('mbsr.surtitre')}</p>
      <h1 class="titre-pinceau" data-anime="gsap" data-grille="typo">${c.tb('mbsr.titre')}</h1>
      <p class="intro masque-ecran-tres-bas" data-anime="gsap">${c.t('mbsr.texte')}</p>
      <p class="b-chiffres" data-anime="gsap"><span class="b-chiffre">${c.t('mbsr.chiffreSemaines')}</span><span class="b-chiffre" data-prix data-info-cle>${c.t('mbsr.chiffrePrix')} <small>${c.t('mbsr.chiffrePrixDetail')}</small></span></p>
      <p class="actions" data-anime="gsap">${c.lien('contact', { params: 'sujet=mbsr', classe: 'bouton bouton--clair', texte: c.t('mbsr.action'), attrs: 'data-action-principale' })}</p>
      <p class="b-info masque-ecran-bas" data-anime="gsap">${c.t('mbsr.info')}</p>
    </div>
    <div class="b-ouverture-cadre" data-iris-centre>
      ${c.media({ nom: 'grok/mbsr-ouverture', alt: c.s('pages.mbsr.partageAlt'), classe: 'b-ouverture-media', priorite: true, sizes: '(max-width: 760px) 100vw, 46vw', cadrage: '60% 55%', attrs: 'data-fx="onde"' })}
    </div>
  </div>
</section>

<section class="b-origine conteneur" id="origine">
  ${c.media({ nom: 'grok/carte-mbsr', alt: '', classe: 'b-origine-media', sizes: '(max-width: 760px) 70vw, 28vw', attrs: 'data-anime="rideau"' })}
  <div>
    <svg class="annee" viewBox="0 0 540 170" aria-hidden="true" focusable="false" data-effet="annee-ecrite" data-audit-ignorer><text class="annee-texte" x="6" y="150">1979</text></svg>
    <p class="surtitre" data-anime>${c.t('mbsr.origineSurtitre')}</p>
    <h2 data-anime="lignes">${c.t('mbsr.origineTitre')}</h2>
    <p data-anime>${c.t('mbsr.origineTexte')}</p>
  </div>
</section>

<section class="b-plongee" id="semaines" data-scene data-effet="plongee-semaines">
  ${c.media({ nom: 'grok/mbsr-profondeur', alt: '', classe: 'b-plongee-media', sizes: '100vw' })}
  <div class="b-profondeurs" aria-hidden="true"><span class="b-rayons"></span><canvas class="b-bulles" data-bulles data-effet="bulles" data-audit-ignorer></canvas></div>
  <div class="b-plongee-cadre" data-collant>
    <div class="conteneur b-plongee-grille">
      <div class="b-plongee-texte">
        <p class="surtitre" data-anime>${c.t('mbsr.semainesSurtitre')}</p>
        <h2 data-anime="lignes">${c.t('mbsr.semainesTitre')}</h2>
        <p class="masque-ecran-tres-bas" data-anime>${c.t('mbsr.semainesTexte')}</p>
        <ul class="b-contenu" data-anime="cascade">${['0', '1', '2', '3', '4'].map((i) => html`<li>${c.t(`mbsr.contenu.${i}`)}</li>`)}</ul>
      </div>
      <ol class="paliers" aria-label="${c.s('mbsr.semainesTitre')}">
        ${[1, 2, 3, 4, 5, 6, 7, 8].map((s) => html`<li class="palier" data-palier="${s}"><span class="palier-num">${String(s)}</span><span class="palier-nom">${c.t('mbsr.semaine')} ${String(s)}</span></li>`)}
      </ol>
    </div>
  </div>
</section>

<section class="b-engagement conteneur" id="engagement">
  <div>
    <p class="surtitre" data-anime>${c.t('mbsr.engagementSurtitre')}</p>
    <h2 data-anime="lignes">${c.t('mbsr.engagementTitre')}</h2>
    <p data-anime>${c.t('mbsr.engagementTexte')}</p>
  </div>
  ${c.media({ nom: 'grok/mbsr-pratique', alt: '', classe: 'b-pratique-media', sizes: '(max-width: 760px) 92vw, 42vw', attrs: 'data-fx="parallaxe"' })}
</section>

<section class="b-tarif" id="tarif">
  <div class="conteneur b-tarif-boite">
    <svg class="anneaux-deco" viewBox="0 0 200 200" data-visuel data-fx="trace" aria-hidden="true" focusable="false"><circle cx="100" cy="100" r="30"/><circle cx="100" cy="100" r="56"/><circle cx="100" cy="100" r="82"/></svg>
    <h2 data-anime="lignes"><span data-prix>${c.t('mbsr.tarifTitre')}</span></h2>
    <p>${c.t('mbsr.tarifTexte')}</p>
    <p>${c.lien('contact', { params: 'sujet=mbsr', classe: 'bouton', texte: c.t('mbsr.prevenir') })}</p>
  </div>
</section>
`;
