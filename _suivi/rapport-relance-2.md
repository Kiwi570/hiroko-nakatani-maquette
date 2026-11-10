# Rapport d’audit

Projet : `hiroko-nakatani-maquette` · 10/11/2026 18:55:19 · 6 min · 7 page(s) · audit standard (étapes : fichiers, mesures, fluidite)

## Résumé

- Échecs : **7**
- À regarder : **2**
- Non lancé : **1**
- Contrôles passés : vercel.json (1), .vercelignore (1), robots.txt (1), numéro de version (1), langues (1), mesures (98), fluidité (12), défilement selon l’appareil (5)

## Échecs

### premier écran : information clé hors de l’écran (1)

- **premier écran : information clé hors de l’écran** — `/` — section#debut > div.duo-texte:nth-of-type(1) > p.prochaine:nth-of-type(5) « PROCHAINE SÉANCE Ce soir, 20 h · Méditation du soi » _(390×844 normal, 320×568 normal, 390×844 calme, 390×844 sansWebgl, 390×844 sansJs, 1366×768 calme, +2)_

### premier écran : bouton principal hors de l’écran (2)

- **premier écran : bouton principal hors de l’écran** — `/ateliers` — section#debut > div.conteneur.a-ouverture-pied:nth-of-type(3) > p.actions:nth-of-type(2) > a.bouton:nth-of-type(1) « Réserver un atelier » _(390×844 normal, 1366×768 normal, 390×844 calme, 390×844 sansWebgl, 390×844 sansJs, 1366×768 sansJs, +2)_
- **premier écran : bouton principal hors de l’écran** — `/mbsr` — div.b-ouverture-grille > div.b-ouverture-texte:nth-of-type(1) > p.actions:nth-of-type(4) > a.bouton.bouton--clair « Être prévenu du prochain cycle » _(844×390 normal, 844×390 calme)_

### contraste sur image (4)

- **contraste sur image** — `/marches` — div.plan-rond:nth-of-type(2) > svg > g.plan-repere:nth-of-type(1) > text — 1.00:1 sur les 10 % de la photo les moins favorables (minimum 4.5:1) _(390×844 normal, 1366×768 normal)_
- **contraste sur image** — `/marches` — div.plan-rond:nth-of-type(2) > svg > g.plan-repere:nth-of-type(2) > text — 1.00:1 sur les 10 % de la photo les moins favorables (minimum 4.5:1) _(390×844 normal, 1366×768 normal)_
- **contraste sur image** — `/marches` — div.plan-rond:nth-of-type(2) > svg > g.plan-repere:nth-of-type(3) > text — 1.00:1 sur les 10 % de la photo les moins favorables (minimum 4.5:1) _(390×844 normal, 1366×768 normal)_
- **contraste sur image** — `/marches` — div.plan-rond:nth-of-type(2) > svg > g.plan-repere:nth-of-type(4) > text — 1.00:1 sur les 10 % de la photo les moins favorables (minimum 4.5:1) _(390×844 normal, 1366×768 normal)_

## À regarder

### « à compléter » visible (1)

- **« à compléter » visible** — `contact.html` — 1 fois hors du pied de page : remplacer par une phrase vraie qui oriente le visiteur (« Tarifs selon la saison, donnés à la réservation ») ou retirer l'élément, et le noter dans la fiche du README (sauf sens propre : « dossier à compléter »)

### fluidité (1)

- **fluidité** — `/` — 4 % d'images de plus de 50 ms _(1366×768 défilement à la molette, processeur ralenti 4 fois)_

## Non lancé

- **mesures:balayage** : page.evaluate: TypeError: Cannot read properties of undefined (reading 'visible')

## Repères

- Numéro de version des fichiers : ?v=1
- Journal v1 : 7 étape(s) notée(s), 63 min de travail pour 129 min de budget, 10 min d’attente de l’utilisateur.
- Audit standard : étapes lourdes sur /, /agenda, /ateliers, /contact, /marches, /mbsr.
- Accessibilité : axe-core 4.12.1 en plus des contrôles intégrés.
- Fluidité /agenda 1366×768 (molette) : 0 % d'images lentes sur 347, tâche la plus longue 0 ms
- Fluidité /ateliers 1366×768 (molette) : 0 % d'images lentes sur 239, tâche la plus longue 0 ms
- Fluidité /contact 1366×768 (molette) : 0 % d'images lentes sur 182, tâche la plus longue 0 ms
- Fluidité /marches 1366×768 (molette) : 0 % d'images lentes sur 234, tâche la plus longue 0 ms
- Fluidité /mbsr 1366×768 (molette) : 0 % d'images lentes sur 243, tâche la plus longue 0 ms
- Fluidité / 390×844 (doigt) : 0 % d'images lentes sur 1422, tâche la plus longue 51 ms
- Fluidité /agenda 390×844 (doigt) : 0 % d'images lentes sur 1338, tâche la plus longue 0 ms
- Fluidité /ateliers 390×844 (doigt) : 0 % d'images lentes sur 1343, tâche la plus longue 0 ms
- Fluidité /contact 390×844 (doigt) : 0 % d'images lentes sur 1345, tâche la plus longue 0 ms
- Fluidité /marches 390×844 (doigt) : 0 % d'images lentes sur 1450, tâche la plus longue 0 ms
- Fluidité /mbsr 390×844 (doigt) : 0 % d'images lentes sur 1332, tâche la plus longue 0 ms

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
