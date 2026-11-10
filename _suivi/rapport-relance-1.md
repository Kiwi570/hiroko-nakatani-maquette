# Rapport d’audit

Projet : `hiroko-nakatani-maquette` · 10/11/2026 18:48:52 · 9 min · 7 page(s) · audit standard (étapes : fichiers, mesures, fluidite, mouvement)

## Résumé

- Échecs : **14**
- À regarder : **6**
- Non lancé : **1**
- Contrôles passés : vercel.json (1), .vercelignore (1), robots.txt (1), numéro de version (1), langues (1), mesures (98), fluidité (12), défilement selon l’appareil (5), mouvement (12), effets du plan (12), souris immobile (7)

## Échecs

### premier écran : information clé hors de l’écran (3)

- **premier écran : information clé hors de l’écran** — `/` — section#debut > div.duo-texte:nth-of-type(1) > p.prochaine:nth-of-type(5) « PROCHAINE SÉANCE Ce soir, 20 h · Méditation du soi » _(844×390 normal, 320×568 normal, 390×844 normal, 390×844 calme, 390×844 sansWebgl, 390×844 sansJs, +4)_
- **premier écran : information clé hors de l’écran** — `/ateliers` — section#debut > div.conteneur.a-ouverture-pied:nth-of-type(3) > p.prochaine:nth-of-type(1) « CE MOIS-CI · NOVEMBRE Thème 3 · « Respirer, observ » _(844×390 normal, 844×390 calme)_
- **premier écran : information clé hors de l’écran** — `/mbsr` — div.b-ouverture-grille > div.b-ouverture-texte:nth-of-type(1) > p.b-chiffres:nth-of-type(3) > span.b-chiffre:nth-of-type(2) « 450 € le programme, soit 45 € la séance » _(390×844 normal, 390×844 calme, 390×844 sansJs, 390×844 sansWebgl)_

### premier écran : bouton principal hors de l’écran (2)

- **premier écran : bouton principal hors de l’écran** — `/ateliers` — section#debut > div.conteneur.a-ouverture-pied:nth-of-type(3) > p.actions:nth-of-type(2) > a.bouton:nth-of-type(1) « Réserver un atelier » _(320×568 normal, 390×844 normal, 844×390 normal, 1366×768 normal, 390×844 calme, 390×844 sansJs, +6)_
- **premier écran : bouton principal hors de l’écran** — `/mbsr` — div.b-ouverture-grille > div.b-ouverture-texte:nth-of-type(1) > p.actions:nth-of-type(4) > a.bouton.bouton--clair « Être prévenu du prochain cycle » _(320×568 normal, 390×844 normal, 844×390 normal, 390×844 calme, 390×844 sansJs, 390×844 sansWebgl, +2)_

### contraste sur image (8)

- **contraste sur image** — `/marches` — div.plan-rond:nth-of-type(2) > svg > g.plan-repere:nth-of-type(1) > text — 1.55:1 sur les 10 % de la photo les moins favorables (minimum 4.5:1) _(390×844 normal)_
- **contraste sur image** — `/marches` — div.plan-rond:nth-of-type(2) > svg > g.plan-repere:nth-of-type(2) > text — 1.63:1 sur les 10 % de la photo les moins favorables (minimum 4.5:1) _(390×844 normal)_
- **contraste sur image** — `/marches` — div.plan-rond:nth-of-type(2) > svg > g.plan-repere:nth-of-type(3) > text — 1.50:1 sur les 10 % de la photo les moins favorables (minimum 4.5:1) _(390×844 normal)_
- **contraste sur image** — `/marches` — div.plan-rond:nth-of-type(2) > svg > g.plan-repere:nth-of-type(4) > text — 1.15:1 sur les 10 % de la photo les moins favorables (minimum 4.5:1) _(390×844 normal)_
- **contraste sur image** — `/marches` — div.plan-rond:nth-of-type(2) > svg > g.plan-repere:nth-of-type(1) > text — 2.15:1 sur les 10 % de la photo les moins favorables (minimum 4.5:1) _(1366×768 normal)_
- **contraste sur image** — `/marches` — div.plan-rond:nth-of-type(2) > svg > g.plan-repere:nth-of-type(2) > text — 1.31:1 sur les 10 % de la photo les moins favorables (minimum 4.5:1) _(1366×768 normal)_
- **contraste sur image** — `/marches` — div.plan-rond:nth-of-type(2) > svg > g.plan-repere:nth-of-type(3) > text — 1.27:1 sur les 10 % de la photo les moins favorables (minimum 4.5:1) _(1366×768 normal)_
- **contraste sur image** — `/marches` — div.plan-rond:nth-of-type(2) > svg > g.plan-repere:nth-of-type(4) > text — 1.13:1 sur les 10 % de la photo les moins favorables (minimum 4.5:1) _(1366×768 normal)_

### fluidité (1)

- **fluidité** — `/` — 7 % d'images de plus de 50 ms, tâche la plus longue 363 ms _(1366×768 défilement à la molette, processeur ralenti 4 fois)_

## À regarder

### « à compléter » visible (1)

- **« à compléter » visible** — `contact.html` — 1 fois hors du pied de page : remplacer par une phrase vraie qui oriente le visiteur (« Tarifs selon la saison, donnés à la réservation ») ou retirer l'élément, et le noter dans la fiche du README (sauf sens propre : « dossier à compléter »)

### typographie française (3)

- **typographie française** — `/404` — section#debut > div.introuvable-enso.conteneur:nth-of-type(2) > div.enso.est-enso > p.enso-message:nth-of-type(1) « À vous : un seul geste, sans lever le doigt. » — espace insécable manquante avant ou après « : » _(1366×768 normal)_
- **typographie française** — `/ateliers` — section#debut > div.conteneur.a-ouverture-pied:nth-of-type(3) > p.prochaine:nth-of-type(1) > strong « Thème 3 · « Respirer, observer » · atelier le same » — espace insécable manquante avant ou après « « » » _(1366×768 normal)_
- **typographie française** — `/contact` — section#enso > div.enso.est-enso:nth-of-type(2) > p.enso-message:nth-of-type(1) « À vous : un seul geste, sans lever le doigt. » — espace insécable manquante avant ou après « : » _(1366×768 normal)_

### effet qui ne bouge pas au défilement (2)

- **effet qui ne bouge pas au défilement** — `/ateliers` — section#en-ligne.a-enligne — nuit : il ne bouge ni au défilement ni tout seul à cette taille (effet au survol, au clic, ou réservé à l'ordinateur ?) ; il ne compte pas comme effet de section _(1366×768 normal, 390×844 normal)_
- **effet qui ne bouge pas au défilement** — `/contact` — svg — trace : il ne bouge ni au défilement ni tout seul à cette taille (effet au survol, au clic, ou réservé à l'ordinateur ?) ; il ne compte pas comme effet de section _(1366×768 normal, 390×844 normal)_

## Non lancé

- **mesures:balayage** : page.evaluate: TypeError: Cannot read properties of undefined (reading 'visible')

## Repères

- Numéro de version des fichiers : ?v=1
- Journal v1 : 4 étape(s) notée(s), 46 min de travail pour 70 min de budget, 9 min d’attente de l’utilisateur.
- Audit standard : étapes lourdes sur /, /agenda, /ateliers, /contact, /marches, /mbsr.
- Accessibilité : axe-core 4.12.1 en plus des contrôles intégrés.
- Fluidité /agenda 1366×768 (molette) : 0 % d'images lentes sur 347, tâche la plus longue 0 ms
- Fluidité /ateliers 1366×768 (molette) : 0 % d'images lentes sur 231, tâche la plus longue 0 ms
- Fluidité /contact 1366×768 (molette) : 0 % d'images lentes sur 187, tâche la plus longue 0 ms
- Fluidité /marches 1366×768 (molette) : 0 % d'images lentes sur 241, tâche la plus longue 0 ms
- Fluidité /mbsr 1366×768 (molette) : 0 % d'images lentes sur 290, tâche la plus longue 0 ms
- Fluidité / 390×844 (doigt) : 0 % d'images lentes sur 1427, tâche la plus longue 0 ms
- Fluidité /agenda 390×844 (doigt) : 0 % d'images lentes sur 1340, tâche la plus longue 0 ms
- Fluidité /ateliers 390×844 (doigt) : 0 % d'images lentes sur 1339, tâche la plus longue 0 ms
- Fluidité /contact 390×844 (doigt) : 0 % d'images lentes sur 1345, tâche la plus longue 0 ms
- Fluidité /marches 390×844 (doigt) : 0 % d'images lentes sur 1419, tâche la plus longue 0 ms
- Fluidité /mbsr 390×844 (doigt) : 0 % d'images lentes sur 1344, tâche la plus longue 0 ms

## Fichiers

- Captures : `captures/` (téléphone, tablette, ordinateur, écran par écran)
- Films : `films/` (planches contact de l’ouverture, des transitions, des retours, des ancres et des épinglages ; ⚠ = image signalée)
- Comparaisons : `comparaisons/`
- Détail complet : `rapport.json`


## Relancer seulement ce qui a échoué

Après correction, si elle ne touche que ces pages (sinon, relancer l’audit standard en entier) :

```
node _audit/audit.mjs --seulement=fichiers,mesures,fluidite
```
