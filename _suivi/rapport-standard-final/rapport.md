# Rapport d’audit

Projet : `hiroko-nakatani-maquette` · 10/11/2026 19:22:04 · 20 min · 7 page(s) · audit standard

## Résumé

- Échecs : **0**
- À regarder : **7**
- Non lancé : **2**
- Contrôles passés : vercel.json (1), .vercelignore (1), robots.txt (1), numéro de version (1), langues (1), grille wouahou (7), mesures (98), films d’ouverture (12), films de transition (12), bords de l’écran (7), intro accélérable et passable (7), menu (1), clavier (7), liens et boutons (7), liens profonds (4), liens vers la page en cours (6), changements de hauteur (5), mode calme (12), bouton du mode calme (2), parcours du projet (1), fluidité (12), défilement selon l’appareil (5), mouvement (12), effets du plan (12), souris immobile (7), vitesse (6), captures (1)

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

Aucun.

## À regarder

### « à compléter » visible (1)

- **« à compléter » visible** — `contact.html` — 1 fois hors du pied de page : remplacer par une phrase vraie qui oriente le visiteur (« Tarifs selon la saison, donnés à la réservation ») ou retirer l'élément, et le noter dans la fiche du README (sauf sens propre : « dossier à compléter »)

### au retour arrière, élément qui réapparaît en s’animant (1)

- **au retour arrière, élément qui réapparaît en s’animant** — `/` — div.cloche > div.cloche-eau > canvas.cloche-canvas _(1366×768 retour arrière, 390×844 retour arrière)_

### retour avant : changement brusque (1)

- **retour avant : changement brusque** — `/marches` — à 64 ms (différence 42 %) (films/retour-avant-390.png) _(390×844 retour avant)_

### rechargement au milieu de la page (2)

- **rechargement au milieu de la page** — `/agenda` — écran différent à la même position après rechargement (15.2 %), voir comparaisons/rechargement-agenda-*.png _(1366×768)_
- **rechargement au milieu de la page** — `/ateliers` — écran différent à la même position après rechargement (11.6 %), voir comparaisons/rechargement-ateliers-*.png _(1366×768)_

### fluidité (1)

- **fluidité** — `/` — 3 % d'images de plus de 50 ms _(1366×768 défilement à la molette, processeur ralenti 4 fois)_

### effet qui ne bouge pas au défilement (1)

- **effet qui ne bouge pas au défilement** — `/contact` — svg — trace : il ne bouge ni au défilement ni tout seul à cette taille (effet au survol, au clic, ou réservé à l'ordinateur ?) ; il ne compte pas comme effet de section _(1366×768 normal, 390×844 normal)_

## Non lancé

- **mesures:balayage** : page.evaluate: TypeError: Cannot read properties of undefined (reading 'visible')
- **Safari (WebKit)** : WebKit ne peut pas s’installer ici : vérification à faire dans Safari sur le Mac (liste dans le rapport)

### À vérifier dans Safari sur le Mac (WebKit indisponible ici)

- Ouverture de chaque page : rien qui clignote, intro complète au premier chargement et au rechargement.
- Changement de page : le voile couvre l’écran, pas de page blanche ; retour arrière sans intro ni voile resté.
- Défilement : fluide (natif), en-tête qui se cache et revient sans clignoter, sections épinglées entières.
- Menu sur iPhone (mode Responsive de Safari) : ouverture, fermeture, page bloquée derrière.
- Polices, images, mention « Illustration générée », formulaires et barre fixe du bas.

## Repères

- Numéro de version des fichiers : ?v=1
- Journal v1 : 7 étape(s) notée(s), 63 min de travail pour 129 min de budget, 10 min d’attente de l’utilisateur.
- Audit standard : étapes lourdes sur /, /agenda, /ateliers, /contact, /marches, /mbsr.
- Accessibilité : axe-core 4.12.1 en plus des contrôles intégrés.
- Ouverture / (1366×768) : 2556 ms depuis le premier octet
- Ouverture /agenda (1366×768) : 2491 ms depuis le premier octet
- Ouverture /ateliers (1366×768) : 2471 ms depuis le premier octet
- Ouverture /contact (1366×768) : 2431 ms depuis le premier octet
- Ouverture /marches (1366×768) : 2503 ms depuis le premier octet
- Ouverture /mbsr (1366×768) : 2469 ms depuis le premier octet
- Ouverture / (390×844) : 2582 ms depuis le premier octet
- Ouverture /agenda (390×844) : 2537 ms depuis le premier octet
- Ouverture /ateliers (390×844) : 2485 ms depuis le premier octet
- film de l'ouverture /ateliers 390×844 : réussi à la tentative 2 (avant : cdpSession.send: Protocol error (Page.startScreencast): Not attached to an active page)
- Ouverture /contact (390×844) : 2488 ms depuis le premier octet
- Ouverture /marches (390×844) : 2499 ms depuis le premier octet
- Ouverture /mbsr (390×844) : 2460 ms depuis le premier octet
- bords de l’écran /agenda 1366×768 : réussi à la tentative 2 (avant : cdpSession.send: Protocol error (Page.startScreencast): Not attached to an active page)
- bords de l’écran /ateliers 1366×768 : réussi à la tentative 2 (avant : cdpSession.send: Protocol error (Page.startScreencast): Not attached to an active page)
- bords de l’écran /contact 1366×768 : réussi à la tentative 2 (avant : cdpSession.send: Protocol error (Page.startScreencast): Not attached to an active page)
- Bords de l’écran : 511 images d’intro, 21 de voile et 244 de menu jugées (panneau immobile couvrant tout l’écran), barre de défilement classique de 15 px.
- Changements de hauteur /contact : aucun effet ScrollTrigger, rien à recalculer.
- Tient dans l'écran / : aucune section épinglée ou plein écran.
- Tient dans l'écran /agenda : aucune section épinglée ou plein écran.
- Tient dans l'écran /ateliers : aucune section épinglée ou plein écran.
- Tient dans l'écran /contact : aucune section épinglée ou plein écran.
- Tient dans l'écran /marches : aucune section épinglée ou plein écran.
- Tient dans l'écran /mbsr : aucune section épinglée ou plein écran.
- Fluidité /agenda 1366×768 (molette) : 0 % d'images lentes sur 330, tâche la plus longue 0 ms
- Fluidité /ateliers 1366×768 (molette) : 0 % d'images lentes sur 239, tâche la plus longue 0 ms
- Fluidité /contact 1366×768 (molette) : 0 % d'images lentes sur 183, tâche la plus longue 0 ms
- Fluidité /marches 1366×768 (molette) : 0 % d'images lentes sur 227, tâche la plus longue 0 ms
- Fluidité /mbsr 1366×768 (molette) : 0 % d'images lentes sur 289, tâche la plus longue 0 ms
- Fluidité / 390×844 (doigt) : 0 % d'images lentes sur 1423, tâche la plus longue 0 ms
- Fluidité /agenda 390×844 (doigt) : 0 % d'images lentes sur 1340, tâche la plus longue 0 ms
- Fluidité /ateliers 390×844 (doigt) : 0 % d'images lentes sur 1342, tâche la plus longue 0 ms
- Fluidité /contact 390×844 (doigt) : 0 % d'images lentes sur 1345, tâche la plus longue 0 ms
- Fluidité /marches 390×844 (doigt) : 0 % d'images lentes sur 1418, tâche la plus longue 0 ms
- Fluidité /mbsr 390×844 (doigt) : 0 % d'images lentes sur 1337, tâche la plus longue 0 ms
- Vitesse / : 0.68 s de calcul au chargement (téléphone ralenti).
- Vitesse /agenda : 0.42 s de calcul au chargement (téléphone ralenti).
- Vitesse /ateliers : 0.48 s de calcul au chargement (téléphone ralenti).
- Vitesse /contact : 0.41 s de calcul au chargement (téléphone ralenti).
- Vitesse /marches : 0.44 s de calcul au chargement (téléphone ralenti).
- Vitesse /mbsr : 0.36 s de calcul au chargement (téléphone ralenti).

## Fichiers

- Captures : `captures/` (téléphone, tablette, ordinateur, écran par écran)
- Films : `films/` (planches contact de l’ouverture, des transitions, des retours, des ancres et des épinglages ; ⚠ = image signalée)
- Comparaisons : `comparaisons/`
- Détail complet : `rapport.json`


## Relancer seulement ce qui a échoué

Après correction, si elle ne touche que ces pages (sinon, relancer l’audit standard en entier) :

```
node _audit/audit.mjs --seulement=fichiers,mesures
```
