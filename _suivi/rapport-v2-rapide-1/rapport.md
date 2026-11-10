# Rapport d’audit

Projet : `hiroko-nakatani-maquette` · 10/11/2026 20:41:34 · 20 min · 6 page(s) · audit RAPIDE : ne vaut pas pour une livraison ciblé sur /,/marches,/ateliers,/mbsr,/agenda,/contact

## Résumé

- Échecs : **70**
- À regarder : **9**
- Non lancé : **1**
- Contrôles passés : vercel.json (1), .vercelignore (1), robots.txt (1), numéro de version (1), langues (1), grille wouahou (7), mesures (42), films d’ouverture (12), films de transition (12), bords de l’écran (6), intro accélérable et passable (7), menu (1), clavier (6), liens et boutons (6), liens profonds (4), liens vers la page en cours (6), changements de hauteur (6), mode calme (12), bouton du mode calme (2), parcours du projet (1), fluidité (12), défilement selon l’appareil (5), mouvement (12), effets du plan (16), souris immobile (8), vitesse (6), captures (1)

## Grille wouahou

| Point | État | Détail |
|---|---|---|
| 1. L’effet signature se manipule | ✓ présent | accueil |
| 2. L’intro devient la page | ✓ présent | objet d’ouverture sur 6 page(s), versObjet dans l’intro |
| 3. La transition reprend le motif | ✓ présent | transition propre au projet (data-grille="voile") |
| 4. Quelque chose relie les sections et les pages | ✓ présent | sur les 6 page(s) |
| 5. Un titre fait l’événement sur chaque page | ✓ présent | sur les 6 page(s) |
| 6. La scène est un geste du métier | ✓ présent | geste du métier sur / |
| 7. L’action principale a un retour physique | ✓ présent | sur /agenda, /contact, / |

Le script vérifie les marques (`data-grille`, `data-iris-centre`, forme du voile, `versObjet`) ; la force et la justesse de chaque point se jugent sur les captures et les films.

## Échecs

### mention « Illustration générée » absente (20)

- **mention « Illustration générée » absente** — `/` — button.mini-cloche > span.mini-cloche-bol:nth-of-type(1) > span.mini-cloche-eau > img.est-visible:nth-of-type(2) — eau-bois-640.webp _(390×844 calme)_
- **mention « Illustration générée » absente** — `/` — button.mini-cloche.sonne > span.mini-cloche-bol:nth-of-type(1) > span.mini-cloche-eau > img:nth-of-type(1) — eau-plongee-640.webp _(390×844 normal, 1366×768 normal, 844×390 normal, 390×844 sansWebgl)_
- **mention « Illustration générée » absente** — `/` — button.mini-cloche.sonne > span.mini-cloche-bol:nth-of-type(1) > span.mini-cloche-eau > img.est-visible:nth-of-type(2) — eau-bois-640.webp _(390×844 normal, 1366×768 normal, 844×390 normal, 390×844 sansWebgl)_
- **mention « Illustration générée » absente** — `/agenda` — button.mini-cloche > span.mini-cloche-bol:nth-of-type(1) > span.mini-cloche-eau > img.est-visible:nth-of-type(3) — agenda-feuilles-mobile-640.webp _(390×844 calme)_
- **mention « Illustration générée » absente** — `/agenda` — button.mini-cloche.sonne > span.mini-cloche-bol:nth-of-type(1) > span.mini-cloche-eau > img:nth-of-type(2) — marches-feuilles-640.webp _(390×844 normal, 1366×768 normal, 844×390 normal, 390×844 sansWebgl)_
- **mention « Illustration générée » absente** — `/agenda` — button.mini-cloche.sonne > span.mini-cloche-bol:nth-of-type(1) > span.mini-cloche-eau > img.est-visible:nth-of-type(3) — agenda-feuilles-mobile-640.webp _(390×844 normal, 390×844 sansWebgl)_
- **mention « Illustration générée » absente** — `/agenda` — button.mini-cloche.sonne > span.mini-cloche-bol:nth-of-type(1) > span.mini-cloche-eau > img.est-visible:nth-of-type(3) — agenda-feuilles-1280.webp _(1366×768 normal, 844×390 normal)_
- **mention « Illustration générée » absente** — `/ateliers` — button.mini-cloche.sonne > span.mini-cloche-bol:nth-of-type(1) > span.mini-cloche-eau > img.est-visible:nth-of-type(3) — ateliers-ouverture-mobile-640.webp _(390×844 normal, 390×844 sansWebgl)_
- **mention « Illustration générée » absente** — `/ateliers` — button.mini-cloche > span.mini-cloche-bol:nth-of-type(1) > span.mini-cloche-eau > img.est-visible:nth-of-type(3) — ateliers-ouverture-mobile-640.webp _(390×844 calme)_
- **mention « Illustration générée » absente** — `/ateliers` — button.mini-cloche.sonne > span.mini-cloche-bol:nth-of-type(1) > span.mini-cloche-eau > img.est-visible:nth-of-type(3) — ateliers-ouverture-640.webp _(844×390 normal, 1366×768 normal)_
- **mention « Illustration générée » absente** — `/contact` — button.mini-cloche.sonne > span.mini-cloche-bol:nth-of-type(1) > span.mini-cloche-eau > img.est-visible:nth-of-type(2) — contact-banc-mobile-640.webp _(390×844 normal, 390×844 sansWebgl)_
- **mention « Illustration générée » absente** — `/contact` — button.mini-cloche.sonne > span.mini-cloche-bol:nth-of-type(1) > span.mini-cloche-eau > img.est-visible:nth-of-type(2) — contact-banc-1280.webp _(844×390 normal, 1366×768 normal)_
- **mention « Illustration générée » absente** — `/contact` — button.mini-cloche > span.mini-cloche-bol:nth-of-type(1) > span.mini-cloche-eau > img.est-visible:nth-of-type(2) — contact-banc-mobile-640.webp _(390×844 calme)_
- **mention « Illustration générée » absente** — `/marches` — button.mini-cloche.sonne > span.mini-cloche-bol:nth-of-type(1) > span.mini-cloche-eau > img.est-visible:nth-of-type(2) — marches-ouverture-mobile-640.webp _(390×844 normal, 390×844 sansWebgl)_
- **mention « Illustration générée » absente** — `/marches` — button.mini-cloche.sonne > span.mini-cloche-bol:nth-of-type(1) > span.mini-cloche-eau > img.est-visible:nth-of-type(2) — marches-ouverture-1280.webp _(844×390 normal, 1366×768 normal)_
- **mention « Illustration générée » absente** — `/marches` — button.mini-cloche > span.mini-cloche-bol:nth-of-type(1) > span.mini-cloche-eau > img.est-visible:nth-of-type(2) — marches-ouverture-mobile-640.webp _(390×844 calme)_
- **mention « Illustration générée » absente** — `/mbsr` — button.mini-cloche.sonne > span.mini-cloche-bol:nth-of-type(1) > span.mini-cloche-eau > img:nth-of-type(1) — mbsr-pratique-480.webp _(390×844 normal, 390×844 sansWebgl)_
- **mention « Illustration générée » absente** — `/mbsr` — button.mini-cloche.sonne > span.mini-cloche-bol:nth-of-type(1) > span.mini-cloche-eau > img.est-visible:nth-of-type(2) — mbsr-ouverture-mobile-640.webp _(390×844 normal, 390×844 sansWebgl)_
- **mention « Illustration générée » absente** — `/mbsr` — button.mini-cloche.sonne > span.mini-cloche-bol:nth-of-type(1) > span.mini-cloche-eau > img.est-visible:nth-of-type(2) — mbsr-ouverture-640.webp _(844×390 normal, 1366×768 normal)_
- **mention « Illustration générée » absente** — `/mbsr` — button.mini-cloche > span.mini-cloche-bol:nth-of-type(1) > span.mini-cloche-eau > img.est-visible:nth-of-type(2) — mbsr-ouverture-mobile-640.webp _(390×844 calme)_

### texte coupé (3)

- **texte coupé** — `/` — section#plongee > div.plongee-cadre > div.plongee-texte.conteneur:nth-of-type(2) > h2.plongee-titre « Venez marcher dans le bois » — coupé par section#plongee > div.plongee-cadre « Illustration générée DIMANCHE MATIN Venez marcher  » _(844×390 normal)_
- **texte coupé** — `/ateliers` — div.anneau:nth-of-type(2) > div.anneau-centre > p.anneau-info > span.anneau-mois:nth-of-type(1) « Novembre » — coupé par section#debut > div.anneau:nth-of-type(2) > div.anneau-centre « Illustration générée Novembre 3 · Respirer, observ » _(844×390 normal, 1366×768 normal, 320×568 sansJs)_
- **texte coupé** — `/ateliers` — div.anneau:nth-of-type(2) > div.anneau-centre > p.anneau-info > span.anneau-titre:nth-of-type(2) « 3 · Respirer, observer » — coupé par section#debut > div.anneau:nth-of-type(2) > div.anneau-centre « Illustration générée Novembre 3 · Respirer, observ » _(844×390 normal)_

### texte sous 12 px (11)

- **texte sous 12 px** — `/agenda` — ol > li.mf.mf--passe:nth-of-type(1) > span > span.mf-nom « sept. » — 11.5 px _(390×844 calme, 390×844 normal, 390×844 sansJs, 320×568 sansJs, 390×844 sansWebgl)_
- **texte sous 12 px** — `/agenda` — ol > li.mf.mf--passe:nth-of-type(2) > span > span.mf-nom « oct. » — 11.5 px _(390×844 calme, 390×844 normal, 390×844 sansJs, 320×568 sansJs, 390×844 sansWebgl)_
- **texte sous 12 px** — `/agenda` — ol > li.mf.mf--courant:nth-of-type(3) > a > span.mf-nom « nov. » — 11.5 px _(390×844 calme, 390×844 normal, 390×844 sansJs, 320×568 sansJs, 390×844 sansWebgl)_
- **texte sous 12 px** — `/agenda` — ol > li.mf:nth-of-type(4) > a > span.mf-nom « déc. » — 11.5 px _(390×844 calme, 390×844 normal, 390×844 sansJs, 320×568 sansJs, 390×844 sansWebgl)_
- **texte sous 12 px** — `/agenda` — ol > li.mf:nth-of-type(5) > a > span.mf-nom « janv. » — 11.5 px _(390×844 calme, 390×844 normal, 390×844 sansJs, 320×568 sansJs, 390×844 sansWebgl)_
- **texte sous 12 px** — `/agenda` — ol > li.mf:nth-of-type(6) > a > span.mf-nom « févr. » — 11.5 px _(390×844 calme, 390×844 normal, 390×844 sansJs, 320×568 sansJs, 390×844 sansWebgl)_
- **texte sous 12 px** — `/agenda` — ol > li.mf:nth-of-type(7) > a > span.mf-nom « mars » — 11.5 px _(390×844 calme, 390×844 normal, 390×844 sansJs, 320×568 sansJs, 390×844 sansWebgl)_
- **texte sous 12 px** — `/agenda` — ol > li.mf:nth-of-type(8) > a > span.mf-nom « avr. » — 11.5 px _(390×844 calme, 390×844 normal, 390×844 sansJs, 320×568 sansJs, 390×844 sansWebgl)_
- **texte sous 12 px** — `/agenda` — ol > li.mf:nth-of-type(9) > a > span.mf-nom « mai » — 11.5 px _(390×844 calme, 390×844 normal, 390×844 sansJs, 320×568 sansJs, 390×844 sansWebgl)_
- **texte sous 12 px** — `/agenda` — ol > li.mf.mf--lu:nth-of-type(10) > a > span.mf-nom « juin » — 11.5 px _(390×844 calme, 390×844 normal, 390×844 sansWebgl)_
- **texte sous 12 px** — `/agenda` — ol > li.mf:nth-of-type(10) > a > span.mf-nom « juin » — 11.5 px _(390×844 sansJs, 320×568 sansJs)_

### zone tactile sous 44 px (18)

- **zone tactile sous 44 px** — `/agenda` — nav.mois-feuilles > ol > li.mf.mf--courant:nth-of-type(3) > a « nov. » — 36 × 78 px _(390×844 calme, 390×844 normal, 390×844 sansJs, 320×568 sansJs, 390×844 sansWebgl)_
- **zone tactile sous 44 px** — `/agenda` — nav.mois-feuilles > ol > li.mf:nth-of-type(4) > a « déc. » — 36 × 78 px _(390×844 calme, 390×844 normal, 390×844 sansJs, 320×568 sansJs, 390×844 sansWebgl)_
- **zone tactile sous 44 px** — `/agenda` — nav.mois-feuilles > ol > li.mf:nth-of-type(5) > a « janv. » — 36 × 78 px _(390×844 calme, 390×844 normal, 390×844 sansJs, 320×568 sansJs, 390×844 sansWebgl)_
- **zone tactile sous 44 px** — `/agenda` — nav.mois-feuilles > ol > li.mf:nth-of-type(6) > a « févr. » — 36 × 78 px _(390×844 calme, 390×844 normal, 390×844 sansJs, 320×568 sansJs, 390×844 sansWebgl)_
- **zone tactile sous 44 px** — `/agenda` — nav.mois-feuilles > ol > li.mf:nth-of-type(7) > a « mars » — 36 × 78 px _(390×844 calme, 390×844 normal, 390×844 sansJs, 320×568 sansJs, 390×844 sansWebgl)_
- **zone tactile sous 44 px** — `/agenda` — nav.mois-feuilles > ol > li.mf:nth-of-type(8) > a « avr. » — 36 × 78 px _(390×844 calme, 390×844 normal, 390×844 sansJs, 320×568 sansJs, 390×844 sansWebgl)_
- **zone tactile sous 44 px** — `/agenda` — nav.mois-feuilles > ol > li.mf:nth-of-type(9) > a « mai » — 36 × 78 px _(390×844 calme, 390×844 normal, 390×844 sansJs, 320×568 sansJs, 390×844 sansWebgl)_
- **zone tactile sous 44 px** — `/agenda` — nav.mois-feuilles > ol > li.mf.mf--lu:nth-of-type(10) > a « juin » — 36 × 78 px _(390×844 calme, 390×844 normal, 390×844 sansWebgl)_
- **zone tactile sous 44 px** — `/agenda` — nav.mois-feuilles > ol > li.mf:nth-of-type(10) > a « juin » — 36 × 78 px _(390×844 sansJs, 320×568 sansJs)_
- **zone tactile sous 44 px** — `/ateliers` — div.anneau:nth-of-type(2) > ol.anneau-themes > li.anneau-theme:nth-of-type(1) > button.anneau-num « 1 » — 40 × 40 px _(390×844 normal, 390×844 calme, 390×844 sansJs, 320×568 sansJs, 390×844 sansWebgl)_
- **zone tactile sous 44 px** — `/ateliers` — div.anneau:nth-of-type(2) > ol.anneau-themes > li.anneau-theme:nth-of-type(2) > button.anneau-num « 2 » — 40 × 40 px _(390×844 normal, 390×844 calme, 390×844 sansJs, 320×568 sansJs, 390×844 sansWebgl)_
- **zone tactile sous 44 px** — `/ateliers` — div.anneau:nth-of-type(2) > ol.anneau-themes > li.anneau-theme:nth-of-type(4) > button.anneau-num « ✦ » — 40 × 40 px _(390×844 normal, 390×844 calme, 390×844 sansJs, 320×568 sansJs, 390×844 sansWebgl)_
- **zone tactile sous 44 px** — `/ateliers` — div.anneau:nth-of-type(2) > ol.anneau-themes > li.anneau-theme:nth-of-type(5) > button.anneau-num « 4 » — 40 × 40 px _(390×844 normal, 390×844 calme, 390×844 sansJs, 320×568 sansJs, 390×844 sansWebgl)_
- **zone tactile sous 44 px** — `/ateliers` — div.anneau:nth-of-type(2) > ol.anneau-themes > li.anneau-theme:nth-of-type(6) > button.anneau-num « 5 » — 40 × 40 px _(390×844 normal, 390×844 calme, 390×844 sansJs, 320×568 sansJs, 390×844 sansWebgl)_
- **zone tactile sous 44 px** — `/ateliers` — div.anneau:nth-of-type(2) > ol.anneau-themes > li.anneau-theme:nth-of-type(7) > button.anneau-num « 6 » — 40 × 40 px _(390×844 normal, 390×844 calme, 390×844 sansJs, 320×568 sansJs, 390×844 sansWebgl)_
- **zone tactile sous 44 px** — `/ateliers` — div.anneau:nth-of-type(2) > ol.anneau-themes > li.anneau-theme:nth-of-type(8) > button.anneau-num « 6,5 » — 40 × 40 px _(390×844 normal, 390×844 calme, 390×844 sansJs, 320×568 sansJs, 390×844 sansWebgl)_
- **zone tactile sous 44 px** — `/ateliers` — div.anneau:nth-of-type(2) > ol.anneau-themes > li.anneau-theme:nth-of-type(9) > button.anneau-num « 7 » — 40 × 40 px _(390×844 normal, 390×844 calme, 390×844 sansJs, 320×568 sansJs, 390×844 sansWebgl)_
- **zone tactile sous 44 px** — `/ateliers` — div.anneau:nth-of-type(2) > ol.anneau-themes > li.anneau-theme:nth-of-type(10) > button.anneau-num « 8 » — 40 × 40 px _(390×844 normal, 390×844 calme, 390×844 sansJs, 320×568 sansJs, 390×844 sansWebgl)_

### contraste insuffisant (3)

- **contraste insuffisant** — `/agenda` — ol > li.mf.mf--passe:nth-of-type(1) > span > span.mf-nom « sept. » — 3.50:1 (minimum 4.5:1) _(1366×768 normal)_
- **contraste insuffisant** — `/agenda` — ol > li.mf.mf--passe:nth-of-type(2) > span > span.mf-nom « oct. » — 3.50:1 (minimum 4.5:1) _(1366×768 normal)_
- **contraste insuffisant** — `/ateliers` — section#en-ligne > div.conteneur.a-enligne-grille:nth-of-type(2) > div:nth-of-type(1) > p.surtitre:nth-of-type(1) « MÉDITATION DU SOIR EN LIGNE » — 3.65:1 (minimum 4.5:1) _(390×844 normal, 390×844 calme, 844×390 normal, 1366×768 normal, 390×844 sansJs, 320×568 sansJs, +1)_

### premier écran : bouton principal hors de l’écran (1)

- **premier écran : bouton principal hors de l’écran** — `/ateliers` — section#debut > div.conteneur.a-ouverture-pied:nth-of-type(3) > p.actions:nth-of-type(2) > a.bouton:nth-of-type(1) « Réserver un atelier » _(844×390 normal)_

### textes qui se chevauchent (13)

- **textes qui se chevauchent** — `/ateliers` — div.anneau:nth-of-type(2) > ol.anneau-themes > li.anneau-theme:nth-of-type(2) > button.anneau-num « 2 » — avec div.anneau:nth-of-type(2) > div.anneau-centre > figure.media.anneau-media > figcaption.mention-ia « Illustration générée » _(844×390 normal)_
- **textes qui se chevauchent** — `/ateliers` — div.anneau:nth-of-type(2) > ol.anneau-themes > li.anneau-theme:nth-of-type(2) > button.anneau-num « 2 » — avec div.anneau:nth-of-type(2) > div.anneau-centre > p.anneau-info > span.anneau-mois:nth-of-type(1) « Novembre » _(844×390 normal)_
- **textes qui se chevauchent** — `/ateliers` — div.anneau:nth-of-type(2) > ol.anneau-themes > li.anneau-theme.est-courant:nth-of-type(3) > button.anneau-num « 3 » — avec div.anneau:nth-of-type(2) > div.anneau-centre > figure.media.anneau-media > figcaption.mention-ia « Illustration générée » _(844×390 normal)_
- **textes qui se chevauchent** — `/ateliers` — div.anneau:nth-of-type(2) > ol.anneau-themes > li.anneau-theme.est-courant:nth-of-type(3) > button.anneau-num « 3 » — avec div.anneau:nth-of-type(2) > div.anneau-centre > p.anneau-info > span.anneau-mois:nth-of-type(1) « Novembre » _(844×390 normal, 320×568 sansJs)_
- **textes qui se chevauchent** — `/ateliers` — div.anneau:nth-of-type(2) > ol.anneau-themes > li.anneau-theme:nth-of-type(4) > button.anneau-num « ✦ » — avec div.anneau:nth-of-type(2) > div.anneau-centre > figure.media.anneau-media > figcaption.mention-ia « Illustration générée » _(844×390 normal)_
- **textes qui se chevauchent** — `/ateliers` — div.anneau:nth-of-type(2) > ol.anneau-themes > li.anneau-theme:nth-of-type(4) > button.anneau-num « ✦ » — avec div.anneau:nth-of-type(2) > div.anneau-centre > p.anneau-info > span.anneau-mois:nth-of-type(1) « Novembre » _(844×390 normal)_
- **textes qui se chevauchent** — `/ateliers` — div.anneau:nth-of-type(2) > ol.anneau-themes > li.anneau-theme:nth-of-type(5) > button.anneau-num « 4 » — avec div.anneau:nth-of-type(2) > div.anneau-centre > p.anneau-info > span.anneau-mois:nth-of-type(1) « Novembre » _(844×390 normal)_
- **textes qui se chevauchent** — `/ateliers` — div.anneau:nth-of-type(2) > ol.anneau-themes > li.anneau-theme:nth-of-type(6) > button.anneau-num « 5 » — avec div.anneau:nth-of-type(2) > div.anneau-centre > p.anneau-info > span.anneau-titre:nth-of-type(2) « 3 · Respirer, observer » _(844×390 normal)_
- **textes qui se chevauchent** — `/ateliers` — div.anneau:nth-of-type(2) > ol.anneau-themes > li.anneau-theme:nth-of-type(7) > button.anneau-num « 6 » — avec div.anneau:nth-of-type(2) > div.anneau-centre > p.anneau-info > span.anneau-titre:nth-of-type(2) « 3 · Respirer, observer » _(844×390 normal, 320×568 sansJs)_
- **textes qui se chevauchent** — `/ateliers` — div.anneau:nth-of-type(2) > div.anneau-centre > figure.media.anneau-media > figcaption.mention-ia « Illustration générée » — avec div.anneau:nth-of-type(2) > div.anneau-centre > p.anneau-info > span.anneau-mois:nth-of-type(1) « Novembre » _(844×390 normal, 320×568 sansJs)_
- **textes qui se chevauchent** — `/ateliers` — div.anneau:nth-of-type(2) > ol.anneau-themes > li.anneau-theme:nth-of-type(4) > button.anneau-num « ✦ » — avec div.anneau:nth-of-type(2) > div.anneau-centre > p.anneau-info > span.anneau-titre:nth-of-type(2) « 3 · Respirer, observer » _(320×568 sansJs)_
- **textes qui se chevauchent** — `/ateliers` — div.anneau:nth-of-type(2) > ol.anneau-themes > li.anneau-theme:nth-of-type(5) > button.anneau-num « 4 » — avec div.anneau:nth-of-type(2) > div.anneau-centre > p.anneau-info > span.anneau-titre:nth-of-type(2) « 3 · Respirer, observer » _(320×568 sansJs)_
- **textes qui se chevauchent** — `/marches` — div.m-ouverture-grille.conteneur > div.plan-rond:nth-of-type(2) > p.plan-legende > span:nth-of-type(3) « 3 · Le long du cours d’eau » — avec div.m-ouverture-grille.conteneur > div.plan-rond:nth-of-type(2) > p.plan-legende > span.est-visible:nth-of-type(4) « 4 · Château de Vincennes » _(1366×768 normal)_

### premier écran : information clé hors de l’écran (1)

- **premier écran : information clé hors de l’écran** — `/marches` — section#debut > div.m-ouverture-grille.conteneur > div.m-ouverture-texte:nth-of-type(1) > p.prochaine.prochaine--clair:nth-of-type(4) « PROCHAINE MARCHE Dimanche 15 novembre, 10 h · Parc » _(844×390 normal)_

## À regarder

### « à compléter » visible (1)

- **« à compléter » visible** — `contact.html` — 1 fois hors du pied de page : remplacer par une phrase vraie qui oriente le visiteur (« Tarifs selon la saison, donnés à la réservation ») ou retirer l'élément, et le noter dans la fiche du README (sauf sens propre : « dossier à compléter »)

### au retour arrière, élément qui réapparaît en s’animant (1)

- **au retour arrière, élément qui réapparaît en s’animant** — `/` — div.cloche > div.cloche-eau > canvas.cloche-canvas _(1366×768 retour arrière, 390×844 retour arrière)_

### retour avant : changement brusque (1)

- **retour avant : changement brusque** — `/marches` — à 75 ms (différence 42 %) (films/retour-avant-390.png) _(390×844 retour avant)_

### lien vers une ancre : changement brusque (1)

- **lien vers une ancre : changement brusque** — `/ → /ateliers#en-ligne` — à 524 ms (différence 25 %) (films/ancre-1366.png) _(1366×768 film)_

### rechargement au milieu de la page (1)

- **rechargement au milieu de la page** — `/agenda` — écran différent à la même position après rechargement (13.0 %), voir comparaisons/rechargement-agenda-*.png _(1366×768)_

### fluidité (3)

- **fluidité** — `/` — 9 % d'images de plus de 50 ms _(1366×768 défilement à la molette, processeur ralenti 4 fois)_
- **fluidité** — `/ateliers` — 4 % d'images de plus de 50 ms _(1366×768 défilement à la molette, processeur ralenti 4 fois)_
- **fluidité** — `/mbsr` — 5 % d'images de plus de 50 ms _(1366×768 défilement à la molette, processeur ralenti 4 fois)_

### effet qui ne bouge pas au défilement (1)

- **effet qui ne bouge pas au défilement** — `/` — span.compte — compte : il ne bouge ni au défilement ni tout seul à cette taille (effet au survol, au clic, ou réservé à l'ordinateur ?) ; il ne compte pas comme effet de section _(1366×768 normal, 390×844 normal)_

## Non lancé

- **Safari (WebKit)** : WebKit ne peut pas s’installer ici : vérification à faire dans Safari sur le Mac (liste dans le rapport)

### À vérifier dans Safari sur le Mac (WebKit indisponible ici)

- Ouverture de chaque page : rien qui clignote, intro complète au premier chargement et au rechargement.
- Changement de page : le voile couvre l’écran, pas de page blanche ; retour arrière sans intro ni voile resté.
- Défilement : fluide (natif), en-tête qui se cache et revient sans clignoter, sections épinglées entières.
- Menu sur iPhone (mode Responsive de Safari) : ouverture, fermeture, page bloquée derrière.
- Polices, images, mention « Illustration générée », formulaires et barre fixe du bas.

## Repères

- Numéro de version des fichiers : ?v=2
- Journal v2 : 3 étape(s) notée(s), 38 min de travail pour 105 min de budget, 2 min d’attente de l’utilisateur.
- Audit rapide : étapes lourdes sur /, /agenda, /ateliers, /contact, /marches, /mbsr.
- Accessibilité : axe-core 4.12.1 en plus des contrôles intégrés.
- Balayage des largeurs : non fait en audit rapide.
- Ouverture / (1366×768) : 2618 ms depuis le premier octet
- Ouverture /agenda (1366×768) : 2501 ms depuis le premier octet
- Ouverture /ateliers (1366×768) : 2489 ms depuis le premier octet
- Ouverture /contact (1366×768) : 2466 ms depuis le premier octet
- Ouverture /marches (1366×768) : 2556 ms depuis le premier octet
- Ouverture /mbsr (1366×768) : 2460 ms depuis le premier octet
- Ouverture / (390×844) : 2540 ms depuis le premier octet
- Ouverture /agenda (390×844) : 2449 ms depuis le premier octet
- Ouverture /ateliers (390×844) : 2484 ms depuis le premier octet
- Ouverture /contact (390×844) : 2469 ms depuis le premier octet
- Ouverture /marches (390×844) : 2522 ms depuis le premier octet
- Ouverture /mbsr (390×844) : 2526 ms depuis le premier octet
- bords de l’écran /marches 1366×768 : réussi à la tentative 2 (avant : cdpSession.send: Protocol error (Page.startScreencast): Not attached to an active page)
- Bords de l’écran : 476 images d’intro, 23 de voile et 211 de menu jugées (panneau immobile couvrant tout l’écran), barre de défilement classique de 15 px.
- Tient dans l'écran / : aucune section épinglée ou plein écran.
- Tient dans l'écran /agenda : aucune section épinglée ou plein écran.
- Tient dans l'écran /ateliers : aucune section épinglée ou plein écran.
- Tient dans l'écran /contact : aucune section épinglée ou plein écran.
- Tient dans l'écran /marches : aucune section épinglée ou plein écran.
- Tient dans l'écran /mbsr : aucune section épinglée ou plein écran.
- Fluidité /agenda 1366×768 (molette) : 0 % d'images lentes sur 331, tâche la plus longue 61 ms
- Fluidité /contact 1366×768 (molette) : 0 % d'images lentes sur 182, tâche la plus longue 0 ms
- Fluidité /marches 1366×768 (molette) : 2 % d'images lentes sur 220, tâche la plus longue 60 ms
- Fluidité / 390×844 (doigt) : 0 % d'images lentes sur 1431, tâche la plus longue 50 ms
- Fluidité /agenda 390×844 (doigt) : 0 % d'images lentes sur 1345, tâche la plus longue 0 ms
- Fluidité /ateliers 390×844 (doigt) : 0 % d'images lentes sur 1344, tâche la plus longue 0 ms
- Fluidité /contact 390×844 (doigt) : 0 % d'images lentes sur 1338, tâche la plus longue 0 ms
- Fluidité /marches 390×844 (doigt) : 0 % d'images lentes sur 1424, tâche la plus longue 0 ms
- Fluidité /mbsr 390×844 (doigt) : 0 % d'images lentes sur 1344, tâche la plus longue 0 ms
- Vitesse / : 0.68 s de calcul au chargement (téléphone ralenti).
- Vitesse /agenda : 0.53 s de calcul au chargement (téléphone ralenti).
- Vitesse /ateliers : 0.42 s de calcul au chargement (téléphone ralenti).
- Vitesse /contact : 0.41 s de calcul au chargement (téléphone ralenti).
- Vitesse /marches : 0.79 s de calcul au chargement (téléphone ralenti).
- Vitesse /mbsr : 0.40 s de calcul au chargement (téléphone ralenti).

## Fichiers

- Captures : `captures/` (téléphone, tablette, ordinateur, écran par écran)
- Films : `films/` (planches contact de l’ouverture, des transitions, des retours, des ancres et des épinglages ; ⚠ = image signalée)
- Comparaisons : `comparaisons/`
- Détail complet : `rapport.json`


## Relancer seulement ce qui a échoué

Après correction, si elle ne touche que ces pages (sinon, relancer l’audit standard en entier) :

```
node _audit/audit.mjs --rapide --pages=/,/agenda,/ateliers,/contact,/marches,/mbsr --seulement=fichiers,mesures
```
