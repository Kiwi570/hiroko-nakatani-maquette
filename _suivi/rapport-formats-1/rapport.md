# Rapport d’audit

Projet : `hiroko-nakatani-maquette` · 10/11/2026 19:29:15 · 7 min · 7 page(s) · audit complet (étapes : mesures, ecran)

## Résumé

- Échecs : **5**
- À regarder : **0**
- Non lancé : **1**
- Contrôles passés : mesures (364)

## Échecs

### premier écran : information clé hors de l’écran (3)

- **premier écran : information clé hors de l’écran** — `/` — section#debut > div.duo-texte:nth-of-type(1) > p.prochaine:nth-of-type(5) « PROCHAINE SÉANCE Ce soir, 20 h · Méditation du soi » _(844×390 sansJs, 1000×560 sansJs)_
- **premier écran : information clé hors de l’écran** — `/ateliers` — section#debut > div.conteneur.a-ouverture-pied:nth-of-type(3) > p.prochaine:nth-of-type(1) « CE MOIS-CI · NOVEMBRE Thème 3 · « Respirer, observ » _(1440×900 normal, 1440×900 calme, 1440×900 sansJs, 1728×1000 sansJs, 1440×900 sansWebgl)_
- **premier écran : information clé hors de l’écran** — `/marches` — section#debut > div.m-ouverture-grille.conteneur > div.m-ouverture-texte:nth-of-type(1) > p.prochaine.prochaine--clair:nth-of-type(4) « PROCHAINE MARCHE Dimanche 15 novembre, 10 h · Parc » _(844×390 sansJs, 1000×560 sansJs)_

### premier écran : bouton principal hors de l’écran (2)

- **premier écran : bouton principal hors de l’écran** — `/ateliers` — section#debut > div.conteneur.a-ouverture-pied:nth-of-type(3) > p.actions:nth-of-type(2) > a.bouton:nth-of-type(1) « Réserver un atelier » _(1440×900 normal, 1728×1000 normal, 1280×720 sansJs, 1440×900 calme, 1440×900 sansJs, 1728×1000 sansJs, +4)_
- **premier écran : bouton principal hors de l’écran** — `/mbsr` — div.b-ouverture-grille > div.b-ouverture-texte:nth-of-type(1) > p.actions:nth-of-type(4) > a.bouton.bouton--clair « Être prévenu du prochain cycle » _(1000×560 sansJs)_

## À regarder

Rien.

## Non lancé

- **mesures:balayage** : page.evaluate: TypeError: Cannot read properties of undefined (reading 'visible')

## Repères

- Accessibilité : axe-core 4.12.1 en plus des contrôles intégrés.
- Tient dans l'écran / : aucune section épinglée ou plein écran.
- Tient dans l'écran /agenda : aucune section épinglée ou plein écran.
- Tient dans l'écran /ateliers : aucune section épinglée ou plein écran.
- Tient dans l'écran /contact : aucune section épinglée ou plein écran.
- Tient dans l'écran /marches : aucune section épinglée ou plein écran.
- Tient dans l'écran /mbsr : aucune section épinglée ou plein écran.

## Fichiers

- Captures : `captures/` (téléphone, tablette, ordinateur, écran par écran)
- Films : `films/` (planches contact de l’ouverture, des transitions, des retours, des ancres et des épinglages ; ⚠ = image signalée)
- Comparaisons : `comparaisons/`
- Détail complet : `rapport.json`


## Relancer seulement ce qui a échoué

Après correction, si elle ne touche que ces pages (sinon, relancer l’audit standard en entier) :

```
node _audit/audit.mjs --complet --seulement=fichiers,mesures
```
