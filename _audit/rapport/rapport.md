# Rapport d’audit

Projet : `hiroko-nakatani-maquette` · 10/11/2026 19:35:28 · 1 min · 1 page(s) · audit complet ciblé sur / (étapes : fichiers, mesures)

## Résumé

- Échecs : **0**
- À regarder : **1**
- Non lancé : **1**
- Contrôles passés : vercel.json (1), .vercelignore (1), robots.txt (1), numéro de version (1), langues (1), mesures (52)

## Échecs

Aucun.

## À regarder

### « à compléter » visible (1)

- **« à compléter » visible** — `contact.html` — 1 fois hors du pied de page : remplacer par une phrase vraie qui oriente le visiteur (« Tarifs selon la saison, donnés à la réservation ») ou retirer l'élément, et le noter dans la fiche du README (sauf sens propre : « dossier à compléter »)

## Non lancé

- **mesures:balayage** : page.evaluate: TypeError: Cannot read properties of undefined (reading 'visible')

## Repères

- Numéro de version des fichiers : ?v=1
- Journal v1 : 9 étape(s) notée(s), 147 min de travail pour 169 min de budget, 10 min d’attente de l’utilisateur.
- Journal : « audit, regard neuf et corrections » 79 min pour 35 prévues.
- Accessibilité : axe-core 4.12.1 en plus des contrôles intégrés.

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
