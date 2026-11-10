# Hiroko Nakatani · maquette

Maquette du site de Hiroko Nakatani, instructrice MBSR (méditation de pleine conscience, Paris Est et en ligne), et de l'association IMA KOKO-LO.
Direction « La cloche qui chante » : la cloche de méditation reste à l'écran sur l'accueil (ordinateur) ; on la fait chanter en faisant le tour du bord, on la frappe en touchant l'eau, et son eau reflète chaque pratique.
Version 2 (« plus vivant ») : voir CHANGELOG.md.

Adresse prévue : https://hiroko-nakatani-maquette.vercel.app (à mettre dans le module Wix « Intégrer un site »).

## Pages

Accueil · Marches · Ateliers et en ligne · MBSR · Agenda · Contact · 404.
Pages du site actuel non reprises en v1 : Témoignages (un seul témoignage, repris sur l'accueil et la page Marches) et Blog (20 articles). Disponibles en v2.

## Commandes

```
node outils/generer.mjs          pages générées depuis donnees/ et source/
node _audit/audit.mjs            audit standard (avant chaque livraison)
node _audit/audit.mjs --complet  audit complet (version finale)
```
Les textes sont dans `donnees/textes/fr.json`, l'agenda dans `donnees/agenda.json` (une ligne par date), les tarifs dans `donnees/tarifs.json`, les thèmes de l'année dans `donnees/themes.json`. Les dates passées se grisent seules à l'heure de Paris.

## À fournir par le client (à compléter)

- Mentions légales : éditeur (nom, adresse, SIRET ou numéro RNA de l'association IMA KOKO-LO), directeur de la publication.
- Hébergeur : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis (à vérifier au moment de la mise en ligne).
- Politique de confidentialité (formulaire de contact).
- Assurance responsabilité civile et formation d'instructrice MBSR (organisme, année), si elle souhaite les afficher.
- Un portrait d'Hiroko : le site actuel n'en a pas ; la section « Qui suis-je ? » utilise l'aquarelle de cerisier.
- Les prix des formules annuelles (Complète, Nature, En ligne) et des cartes 5 et 10 séances : absents du site et de Billetweb. Remplacés par « prix sur demande ou sur la billetterie ».
- Les dates, le lieu et la durée exacte du prochain cycle MBSR : remplacés par « dates annoncées ici ».
- Les quatre mardis exacts de la méditation en ligne de janvier à juin 2027 : l'agenda les montre par mois.
- Les dates du parcours « Château de Vincennes » : « Dates à venir ».
- D'autres témoignages, avec l'accord des personnes.

## Incohérences relevées sur le site actuel

- Programme MBSR : 22 h sur la page de réservation Wix, 30 h sur la page MBSR ; 8 semaines mais 450 € = 10 × 45 €. La maquette affiche seulement « huit semaines », « 450 € » et « 45 € la séance ».
- Trois adresses e-mail : imakokolo@netc.fr (ateliers, en ligne), nakatani.hiroko@netc.fr et nakatani.hiroko@net-c.com (MBSR). La maquette n'affiche que imakokolo@netc.fr.
- Atelier n° 8 « Intégrer et poursuivre » : affiché le samedi 12 juin 2027, mais son lien de réservation porte la date du 19 juin. La maquette garde le 12 juin, à confirmer.
- Méditation du soir en ligne : 20 h – 20 h 40 sur l'accueil, 20 h – 20 h 45 sur sa page. La maquette garde 20 h 45.
- Accueil : « effets thérapeutiques médicalement prouvés » sur le stress, l'anxiété et la douleur. Formulation reprise avec prudence (« étudié notamment auprès de personnes vivant avec une maladie chronique ; ne remplace pas un suivi médical ») : aucune promesse de résultat.
- Pied de page « ©2020 ».

## Crédits des images

- Photos et logo du site actuel (hirokoo8.wixsite.com) : logo IMA KOKO-LO, aquarelle de cerisier, entrée du Parc floral, pavillon du Jardin d'agronomie tropicale, cerisier en fleurs, lumière dans le bois, atelier, groupe de marche.
- Illustrations générées avec Grok (dossier `assets/images/grok/`) : elles portent la mention « Illustration générée », **à garder sur le site final**.
- Polices : Shippori Mincho et Albert Sans (SIL Open Font License), hébergées avec le site.
- Son de la cloche : synthétisé dans le navigateur (aucun fichier audio).
- Bol chantant et coussin (v2) : rendus calculés pour la maquette (`assets/images/cloche-bol-*.webp`, `cloche-coussin-*.webp`), ni photo ni image générée.
- Textures (v2) : papier washi, reflets d'eau du voile, bord d'encre sèche, calculés pour la maquette.
- Liens « Itinéraire » de la page Contact : Google Maps (aucune clé, simple lien).

## À la mise en ligne définitive

Retirer : la balise `noindex` (dans `source/gabarits/commun.mjs`) et l'en-tête X-Robots-Tag (dans `vercel.json`), le formulaire simulé (à brancher sur un vrai service d'envoi), la ligne « Maquette de démonstration » du pied de page, les mentions « à compléter », les phrases d'attente ci-dessus une fois les informations fournies.
Garder : la mention « Illustration générée » sur les images créées par IA.
