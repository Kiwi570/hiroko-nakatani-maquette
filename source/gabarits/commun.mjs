/* Gabarit commun : head, en-tête, menu, pied de page, barre fixe du téléphone, petite cloche (fil), voile, intro.
   Les conventions data-* sont celles que lisent le socle JavaScript et l'audit (voir le README du socle). */
import { html, brut } from '../../outils/gabarit.mjs';

const navigation = (c) => c.site.navigation.filter((cle) => c.pages[cle] && (c.pages[cle].langues || c.langues).includes(c.l));
const externe = (c) => brut(` target="_blank" rel="noopener" aria-describedby="nouvel-onglet"`);

function tete(c) {
  const p = c.page, cle = p.cle;
  const titre = c.s(`pages.${cle}.titre`), description = c.s(`pages.${cle}.description`);
  const ici = c.abs(c.url(cle));
  const imagePartage = c.abs(`/assets/partage/${p.partage === false ? 'accueil' : cle}-${c.l}.jpg`);
  const structure = c.donnees.structure ? JSON.stringify(c.donnees.structure).replace(/</g, '\\u003c') : '';
  return html`<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${titre}</title>
<meta name="description" content="${description}">
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="${ici}">
<style>${brut(c.critique.css)}</style>
<script>${brut(c.critique.js)}</script>
${cle === 'accueil' ? brut(`<script>(function(){var d=document.documentElement;if(!d.classList.contains('calme')&&matchMedia('(min-width: 1000px) and (min-height: 560px)').matches)d.classList.add('cloche-fixe');})();</script>\n`) : ''}${(c.site.polices || []).map((f) => html`<link rel="preload" href="${f}" as="font" type="font/woff2" crossorigin>\n`)}<link rel="stylesheet" href="${c.asset('css/socle.css')}">
<link rel="stylesheet" href="${c.asset('css/site.css')}">
<link rel="modulepreload" href="${c.asset('js/site.js')}">
<link rel="modulepreload" href="${c.asset('js/socle/index.js')}">
<script src="/assets/vendor/gsap.min.js" defer></script>
<script src="/assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="/assets/vendor/SplitText.min.js" defer></script>
<script type="module" src="${c.asset('js/site.js')}"></script>
<meta name="theme-color" content="${c.site.couleurs.theme || c.site.couleurs.fond}">
<link rel="icon" href="/assets/images/favicon.png" type="image/png">
<link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${c.site.nom}">
<meta property="og:locale" content="fr_FR">
<meta property="og:title" content="${titre}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${ici}">
<meta property="og:image" content="${imagePartage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${c.s(`pages.${p.partage === false ? 'accueil' : cle}.partageAlt`)}">
<meta name="twitter:card" content="summary_large_image">
${structure ? html`<script type="application/ld+json">${brut(structure)}</script>` : ''}
</head>`;
}

function logo(c, clair = false) {
  return html`<img src="/assets/images/${clair ? 'logo-imakokolo-clair' : 'logo-imakokolo'}.png" alt="" width="44" height="45">`;
}

function entete(c) {
  return html`<header data-entete>
  <div class="entete-rangee">
    <a class="entete-logo" href="${c.url('accueil')}" data-libelle="${c.libelle('accueil')}"${c.page.cle === 'accueil' ? brut(' aria-current="page"') : ''}>
      ${logo(c)}<span class="entete-nom"><span>${c.site.nom}</span><small>${c.site.sousTitre}</small></span>
    </a>
    <nav data-nav aria-label="${c.s('commun.navigation')}">
      <ul>${navigation(c).filter((k) => k !== 'accueil').map((k) => html`<li>${c.lien(k)}</li>`)}</ul>
    </nav>
    <div class="entete-actions">
      <a class="bouton" href="${c.url(c.site.actionEntete.page)}" data-libelle="${c.libelle(c.site.actionEntete.page)}">${c.t('commun.actionEntete')}</a>
      <button type="button" data-menu-bouton aria-controls="menu" aria-expanded="false" data-libelle-ouvrir="${c.s('commun.menu')}" data-libelle-fermer="${c.s('commun.fermer')}"><span data-libelle-bouton>${c.t('commun.menu')}</span></button>
      <a class="menu-sansjs" href="#menu" data-menu-lien>${c.t('commun.menu')}</a>
    </div>
  </div>
</header>
<script>/* Avant le premier affichage : rangées de la navigation (même règle que ajusterNav dans assets/js/socle/entete.js)
   et hauteur réelle de l'en-tête, pour que rien ne saute quand le JavaScript du site prend la main. */
(function () {
  var h = document.documentElement, u = document.querySelector('[data-nav] ul'), e = document.querySelector('[data-entete]');
  if (u) {
    var deborde = function () { return u.scrollWidth > u.clientWidth + 1; }, c = deborde();
    if (c && window.matchMedia('(min-width: 900px)').matches) {
      h.classList.add('nav-deux-rangees'); c = deborde();
      if (c) { h.classList.add('nav-deux-lignes'); var a = u.querySelector('a'); c = !a || u.getBoundingClientRect().height > a.getBoundingClientRect().height * 2.5; }
      if (c) h.classList.remove('nav-deux-rangees', 'nav-deux-lignes');
    }
    if (c) h.classList.add('nav-compacte');
  }
  if (e) h.style.setProperty('--entete-h', Math.round(e.getBoundingClientRect().height) + 'px');
})();</script>
<span id="menu-ferme" aria-hidden="true"></span>
<div id="menu" data-menu role="dialog" aria-modal="true" aria-label="${c.s('commun.menu')}">
  <p class="menu-sansjs-fermer"><a href="#menu-ferme">${c.t('commun.fermer')}</a></p>
  <ul>${navigation(c).map((k, i) => html`<li style="--i:${i}">${c.lien(k, { classe: 'menu-lien' })}</li>`)}</ul>
  <p class="menu-actions"><a class="bouton" href="${c.url('agenda')}" data-libelle="${c.libelle('agenda')}">${c.t('accueil.action')}</a> <a class="bouton bouton--contour" href="mailto:${c.site.contact.email}">${c.site.contact.email}</a></p>
  <p><button type="button" class="lien" data-calme-bascule data-libelle-reduire="${c.s('commun.calmeReduire')}" data-libelle-retablir="${c.s('commun.calmeRetablir')}" data-libelle-systeme="${c.s('commun.calmeSysteme')}"><span data-libelle-bouton>${c.t('commun.calmeReduire')}</span></button></p>
</div>`;
}

function pied(c) {
  return html`<footer class="pied" id="pied" data-masque-barre>
  <div class="conteneur pied-grille">
    <div class="pied-marque">
      ${logo(c, true)}
      <p><strong>${c.site.nom}</strong><br>${c.site.sousTitre}<br>${c.t('commun.association')}</p>
      <p><a href="mailto:${c.site.contact.email}">${c.site.contact.email}</a><br><a href="${c.site.billetterie}"${externe(c)}>${c.t('commun.billetterie')}</a></p>
    </div>
    <nav aria-label="${c.s('commun.sommaire')}">
      <p><strong>${c.t('commun.sommaire')}</strong></p>
      <ul>${navigation(c).map((k) => html`<li>${c.lien(k)}</li>`)}</ul>
    </nav>
    <div>
      <p><strong>${c.t('commun.confort')}</strong></p>
      <ul>
        <li><button type="button" class="lien" data-calme-bascule data-libelle-reduire="${c.s('commun.calmeReduire')}" data-libelle-retablir="${c.s('commun.calmeRetablir')}" data-libelle-systeme="${c.s('commun.calmeSysteme')}"><span data-libelle-bouton>${c.t('commun.calmeReduire')}</span></button></li>
        <li><a href="#haut" data-sans-transition>${c.t('commun.retourHaut')}</a></li>
      </ul>
    </div>
  </div>
  <div class="conteneur pied-bas"><p>${c.t('commun.legal')}</p><p>${c.t('commun.maquette')}</p><p>© 2026 ${c.site.nom}</p></div>
  <span id="nouvel-onglet" hidden>${c.t('commun.nouvelOnglet')}</span>
</footer>`;
}

/* Petite cloche : le fil qui relie les sections et les pages (grille wouahou, point 4).
   Sur téléphone et tablette, elle vit dans la barre du bas ; sur ordinateur, dans la marge gauche. */
function miniCloche(c) {
  return html`<button type="button" class="mini-cloche" data-mini-cloche data-grille="fil" data-effet="mini-cloche" aria-label="${c.s('commun.miniCloche')}">
  <span class="mini-cloche-bol" aria-hidden="true"><span class="mini-cloche-eau"></span></span>
  <span class="mini-cloche-reperes" aria-hidden="true"></span>
</button>
<p class="pastille-son" data-pastille-son hidden aria-live="polite"><span data-son-etat>${c.t('commun.son')}</span> <button type="button" class="lien" data-son-bascule data-libelle-couper="${c.s('commun.couperSon')}" data-libelle-remettre="${c.s('commun.remettreSon')}" data-etat-coupe="${c.s('commun.sonCoupe')}" data-etat-sonne="${c.s('commun.son')}">${c.t('commun.couperSon')}</button></p>`;
}

function barre(c) {
  return html`<div data-barre-fixe>
  <span class="barre-place-cloche" aria-hidden="true"></span>
  <a class="bouton bouton--contour" href="${c.url('contact')}" data-libelle="${c.libelle('contact')}">${c.t('commun.ecrire')}</a>
  <a class="bouton" href="${c.url('agenda')}" data-libelle="${c.libelle('agenda')}">${c.t('commun.actionEntete')}</a>
</div>`;
}

/* Voile en onde : un disque d'eau s'élargit depuis le clic, deux anneaux en avance ; à l'arrivée, la page s'ouvre
   en onde depuis son objet d'ouverture (assets/js/socle/voile.js, forme « onde »). */
const FORMES_VOILE = ['glisse', 'iris', 'vague', 'rideau', 'onde'];
function voile(c) {
  const forme = FORMES_VOILE.includes(c.site.formeVoile) ? c.site.formeVoile : 'glisse';
  return html`<div data-voile data-forme="${forme}" data-grille="voile" aria-hidden="true"><div class="voile-contenu"><img src="/assets/images/logo-imakokolo-clair.png" alt="" width="64" height="66"><span data-voile-libelle>${c.libelle(c.page.cle)}</span></div></div>`;
}

export function page(c, contenu) {
  return html`<!doctype html>
<html lang="${c.l}" data-v="${c.v}" data-page="${c.page.cle}">
${tete(c)}
<body id="haut">
${voile(c)}
<div class="ouverture-panneau" data-ouverture aria-hidden="true">
  <div class="ouverture-logo" data-ouverture-objet>
    <img class="ouverture-enso" src="/assets/images/logo-imakokolo.png" alt="" width="256" height="262">
    <img class="ouverture-kanji" src="/assets/images/logo-imakokolo.png" alt="" width="256" height="262">
  </div>
  <p class="ouverture-nom">${c.site.nom}</p>
  <p class="ouverture-ligne">${c.t('commun.introLigne')}</p>
</div>
<a class="evitement" href="#contenu">${c.t('commun.evitement')}</a>
${entete(c)}
<main id="contenu" tabindex="-1"${c.page.sansAction ? brut(' data-sans-action') : ''}${c.page.sansEffet ? brut(' data-sans-effet') : ''}>
${contenu}
</main>
${pied(c)}
${barre(c)}
${miniCloche(c)}
</body>
</html>`;
}

/* Ensō à tracer (boost) : un seul geste, à la souris ou au doigt ; « Tracer pour moi » au clavier. */
export function enso(c) {
  return html`<div class="enso" data-enso data-effet="enso">
  <canvas class="enso-toile" role="img" aria-label="${c.s('commun.ensoAria')}" data-visuel></canvas>
  <p class="enso-message" data-enso-message data-invite="${c.s('commun.ensoInvite')}" data-reussi="${c.s('commun.ensoReussi')}" data-encore="${c.s('commun.ensoEncore')}" aria-live="polite">${c.t('commun.ensoInvite')}</p>
  <p><button type="button" class="bouton bouton--contour bouton--petit" data-enso-auto>${c.t('commun.ensoAuto')}</button></p>
</div>`;
}

export { externe };
