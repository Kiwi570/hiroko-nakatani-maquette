# Test « vrai visiteur » : Nathalie, 46 ans, Vincennes

Persona : très stressée par son travail, n'a jamais médité, a entendu parler des marches méditatives dans le bois de Vincennes, cherche quelque chose pour ce week-end (nous sommes le mardi 10 novembre 2026) et hésite pour un programme MBSR.

Outil : `_audit/visiteur.mjs`. Les secondes sont celles du journal, chargement initial compris (environ 3 s). Les captures sont rangées dans `_audit/visiteur/<mission>-<taille>/`.

Barème : la mission 1 se fait sans aucun geste ; les autres en 3 gestes au plus et 30 s au plus.

## Résultats

| # | Mission | Format | Résultat | Gestes | Secondes | Capture clé |
|---|---|---|---|---|---|---|
| 1 | comprendre | 390x844 | Réussie en partie (quoi et où : oui ; pour qui : non) | 0 | 8,0 | comprendre-390x844/etape-1.png |
| 1 | comprendre | 1440x900 | Réussie en partie (quoi et où : oui ; pour qui : non) | 0 | 7,9 | comprendre-1440x900/etape-1.png |
| 2 | prix | 390x844 | Réussie (marche à 20 €) | 2 | 5,9 | prix-390x844/etape-2.png |
| 2 | prix | 1440x900 | Réussie, à la limite | 3 | 7,4 | prix-1440x900/etape-3.png |
| 3a | réserver une marche | 390x844 | Réussie (Billetweb ouvert, tampon « Billetterie ouverte ») | 3 | 9,1 | reserver-390x844/etape-3.png |
| 3a | réserver une marche | 1440x900 | Réussie | 3 | 11,2 | reserver-1440x900/etape-3.png |
| 3b | envoyer un message | 390x844 | Réussie (message de confirmation) | 2 pour atteindre le formulaire + 7 de saisie | 16,5 | reserver-message-390x844/etape-9.png |
| 3b | envoyer un message | 1440x900 | Réussie | 2 + 7 de saisie | 17,2 | reserver-message-1440x900/etape-9.png |
| 4 | contact : e-mail | 390x844 | Réussie (e-mail dans le menu) | 1 | 4,3 | contact-email-390x844/etape-1.png |
| 4 | contact : adresse | 390x844 | Réussie de justesse (adresse coupée par la barre du bas au 3e geste) | 3 (4 pour la lire en entier) | 8,2 | contact-390x844/etape-5.png, etape-7.png |
| 4 | contact : e-mail | 1440x900 | Réussie | 1 | 6,5 | contact-1440x900/etape-1.png |
| 4 | contact : adresse | 1440x900 | Réussie, à la limite | 3 | 8,6 | contact-adresse-1440x900/etape-3.png |
| 5 | distinguer | 390x844 | Réussie en partie (la personne d'Hiroko arrive trop tard) | défilement libre | environ 30 | distinguer-390x844/etape-10.png à etape-20.png |
| 5 | distinguer | 1440x900 | Réussie en partie (à 30 s, seul le titre « Qui suis-je ? » est visible) | défilement libre | 30,3 | distinguer-1440x900/etape-31.png |
| 6 | date : en ligne | 390x844 et 1440x900 | Réussie (« Ce soir, 20 h » dès le premier écran) | 0 | 3 | comprendre-*/etape-1.png |
| 6 | date : marche | 390x844 | Réussie (dimanche 15 novembre, 10 h, Parc floral) | 2 | 6,8 | date-390x844/etape-2.png |
| 6 | date : marche | 1440x900 | Réussie | 1 | 7,3 | date-1440x900/etape-1.png |

## Détail par mission

### 1. Comprendre (premier écran seul, après 4 s d'attente)

- **Téléphone** (`comprendre-390x844/etape-0.png`, `etape-1.png`) : le titre « Revenir à l'instant, en marchant, ensemble. » et le paragraphe disent ce que c'est (marches en silence dans le bois de Vincennes, ateliers à Fontenay, méditation en ligne, MBSR) et qui anime (Hiroko Nakatani, instructrice MBSR). Le lieu est clair.
  - Ce qui a gêné :
    - Rien ne dit pour qui c'est. « Débutants bienvenus » et « contre le stress » sont absents du premier écran ; « Aucune expérience nécessaire » n'apparaît qu'à l'écran suivant.
    - Le bol illustré occupe environ 40 % de l'écran, avec un badge « Illustration générée » et une consigne de jeu (« Touchez l'eau pour la frapper… ») avant même le titre.
    - Le surtitre « Paris Est et en ligne », présent sur ordinateur, est absent sur téléphone.
    - Des feuilles animées passent sur le texte.
- **Ordinateur** (`comprendre-1440x900/etape-1.png`) : le premier écran est complet et lisible (surtitre « Méditation de pleine conscience · Paris Est et en ligne », titre, deux boutons, prochaine séance). Il manque toujours le « pour qui ».

### 2. Prix

- **Téléphone** : 20 € apparaît au 2e défilement, sur la carte « Marche et méditation » (`prix-390x844/etape-2.png`). C'est rapide.
  - Ce qui a gêné : la section « Maintenant, et le cœur » (calligraphie 今 + 心 = 念, `prix-390x844/etape-1.png`) passe avant l'offre. Le prix « 20 € » n'a pas d'unité (« la marche » ou « la séance »).
- **Ordinateur** : il faut 3 défilements, la limite (`prix-1440x900/etape-3.png`).
  - Au 2e défilement (`etape-2.png`), le bol reste collé sur toute la moitié droite et les cartes sont serrées dans la colonne de gauche, prix encore hors de l'écran.
  - Le réflexe « cliquer Marches » ne montre pas de prix dans le premier écran de la page Marches. Pendant environ 3 s, le titre H1 de cette page est un trou vide (`prix-nav-1440x900/etape-1.png`, puis il apparaît dans `etape-2.png`).

### 3a. Réserver une marche

- **Téléphone** : Réserver (barre du bas) → défiler → Réserver sur la carte « dim. 15 nov. ». Billetweb s'ouvre et la carte reçoit le tampon « Billetterie ouverte » (`reserver-390x844/etape-3.png`). C'est réussi en 3 gestes.
  - Ce qui a gêné :
    - **Piège :** le bouton Réserver mène à l'agenda, dont le bloc en tête « Prochaine séance · Ce soir, 20 h · Méditation du soir en ligne · Réserver la prochaine » propose la méditation en ligne et non la marche. Il le fait même quand on arrive par « Réserver une marche » depuis la page Marches avec le filtre « Marches » actif (`reserver-b-390x844/etape-3.png`). Nathalie risquait de réserver la mauvaise séance.
    - Sous ce bloc, le bandeau d'image est rogné sur téléphone : on ne voit qu'un papier gris vide avec un bout orange et le badge « Illustration générée » (`agenda-image-390x844/etape-2.png`). Les dates sont repoussées sous la ligne de flottaison.
    - En passant par le filtre « Marches », il faut 4 gestes (`agenda-marches-390x844/etape-4.png`).
- **Ordinateur** : Réserver → défiler → Réserver de la marche du 15 novembre, soit 3 gestes et 11,2 s (`reserver-1440x900/etape-3.png`).
  - Même piège « Réserver la prochaine » (`reserver-1440x900/etape-1.png`). Le bandeau de feuilles suivi d'un grand vide pousse la liste sous la ligne de flottaison.
  - Après le clic, la page est remontée d'un demi-écran (y passe de 765 à 318). C'est à vérifier.
- **Information gênante pour Nathalie** : après le 15 novembre, la marche suivante est le 14 mars 2027. Cette pause d'hiver n'est pas expliquée (`agenda-marches-390x844/etape-4.png`).

### 3b. Envoyer un message (formulaire en trois étapes)

- **Téléphone** : Écrire (barre du bas) → « Écrire un message » → sujet « Le programme MBSR » → Suivant → message → Suivant → nom → e-mail → Envoyer. Le message « Maquette : rien n'a été envoyé. Sur le vrai site, le message partira vers imakokolo@netc.fr. » apparaît (`reserver-message-390x844/etape-9.png`). Le parcours est fluide, avec une barre de progression claire.
  - Ce qui a gêné :
    - « Politique de confidentialité : à compléter » est visible du public (`etape-6.png`).
    - La confirmation ne dit pas quand Hiroko répondra.
    - Le titre suivant « Tracez votre ensō » a un « ō » dans une autre police, plus grasse (`etape-4.png`).
- **Ordinateur** : identique, réussi (`reserver-message-1440x900/etape-9.png`). Le bouton « Suivant » colle aux options du sujet (`etape-2.png`).

### 4. Contact (e-mail, adresse d'un lieu)

- **E-mail** : il est visible dès l'ouverture du menu sur téléphone (`contact-email-390x844/etape-1.png`) et en grand sur la page Contact sur ordinateur (`contact-1440x900/etape-1.png`). Aucun numéro de téléphone n'est donné.
- **Adresse** : la section « Où se retrouver » arrive après le formulaire et après le jeu « Tracez votre ensō ».
  - Sur téléphone, au 3e geste, la ligne « 16 rue du Révérend Père Lucien Aubry, » est visible, mais le code postal est caché par la barre Écrire/Réserver (`contact-390x844/etape-5.png`). Il faut un 4e geste pour lire l'adresse complète (`etape-7.png`).
  - Sur ordinateur : 3 gestes (`contact-adresse-1440x900/etape-3.png`).
  - Pour la marche, le Parc floral n'a pas de point de rendez-vous précis : seulement « Entrée du Parc floral, bois de Vincennes (Paris 12e) », sans préciser quelle entrée. La carte est schématique, sans rues ni lien « Itinéraire » (`contact-390x844/etape-9.png`).

### 5. Distinguer (environ 30 s de visite libre de l'accueil)

Ce que Nathalie retient à 30 s :
- de la marche en silence dans le bois, en petit groupe, le dimanche matin ;
- une instructrice MBSR ;
- un univers japonais (念, « maintenant + le cœur ») ;
- une pratique laïque, sans expérience requise.

Ce qui ferait vraiment la différence arrive trop tard :
- « neurobiologiste de formation » ;
- l'association IMA KOKO-LO ;
- un témoignage (« Laure S. »).

Ces éléments arrivent vers 7 000 px sur téléphone (section 6 sur 7, `distinguer-390x844/etape-20.png`) et juste après 30 s sur ordinateur (`distinguer-1440x900/etape-31.png`, texte dans `distinguer-suite-1440x900/etape-3.png`). Il n'y a pas de photo d'Hiroko, seulement une aquarelle de cerisier (`distinguer-390x844/etape-18.png`).

Autres gênes :
- Sur ordinateur, la section épinglée « Deux heures dans le bois, en silence » consomme 4 défilements, de `etape-13.png` à `etape-25.png`.
- Le bol collé à droite serre la biographie dans une colonne étroite. Sa légende devient illisible sur le fond sombre de la section suivante (`distinguer-suite-1440x900/etape-3.png`).
- L'appel final « Venez marcher dans le bois » est illustré par une forêt tropicale, pas par le bois de Vincennes. Le surtitre « DIMANCHE MATIN » est peu lisible (`distinguer-390x844/etape-22.png`) et, sur ordinateur, il est recouvert par le bouton flottant de la cloche (`distinguer-suite-1440x900/etape-6.png`).
- Sur téléphone, les badges « Illustration générée » débordent des vignettes rondes de la frise de la marche (`distinguer-390x844/etape-12.png`).

### 6. Dates

- **Méditation en ligne** : « Ce soir, 20 h · Méditation du soir en ligne » est visible dès le premier écran, sur les deux formats.
- **Prochaine marche** : « Dimanche 15 novembre, 10 h · Parc floral de Paris » se trouve en tête de la page Marches. Il faut 2 gestes sur téléphone (menu → Marches, `date-390x844/etape-2.png`) et 1 geste sur ordinateur (`date-1440x900/etape-1.png`). C'est exactement « ce week-end » pour Nathalie.
  - Ce qui a gêné : sur la page Marches, le titre H1 est encore invisible au moment de la capture (un trou entre le surtitre et le trait vert, `date-390x844/etape-2.png`). La prochaine marche n'apparaît pas sur l'accueil, qui ne met en avant que la séance en ligne.

### Remarque hors mission : MBSR

La page MBSR donne un prix clair : 450 €, soit 45 € la séance. Le prochain cycle est seulement indiqué par « Prochain cycle : dates annoncées ici » (`mbsr-390x844/etape-5.png`). Le surtitre « LE PROGRAMME », en blanc sur l'eau claire, est presque invisible (`mbsr-390x844/etape-7.png`).

## Corrections recommandées

1. **Accueil, premier écran : dire pour qui.** Ajouter sous le titre une ligne du type « Débutants bienvenus, aucune expérience nécessaire, pour retrouver du calme face au stress ». Sur téléphone :
   - réduire la hauteur du bol, à environ 300 px ;
   - remettre le surtitre « Paris Est et en ligne ».
2. **Accueil, bloc « Prochaine séance » : afficher aussi la prochaine marche**, avec son prix : « Dim. 15 nov., 10 h · Parc floral · 20 € ». C'est l'offre principale ; aujourd'hui seule la séance en ligne est mise en avant.
3. **Agenda, bloc « Prochaine séance » : suivre le filtre.** Avec `?type=marche`, il doit afficher la prochaine marche et son bouton.
   - Le bouton « Réserver une marche » de la page Marches doit ouvrir directement la billetterie de la prochaine marche, ou mener à l'ancre de la liste des marches.
   - Supprimer ou réduire le bandeau de feuilles de l'agenda, rogné en papier gris vide sur téléphone, pour que les dates tiennent dans le premier écran.
4. **Prix : écrire « 20 € la marche »** sur les cartes et dans le premier écran de la page Marches. Sur ordinateur, décoller le bol de la moitié droite après le premier écran, pour que les quatre cartes d'offre prennent toute la largeur et que les prix apparaissent en 2 défilements.
5. **Titres H1 des pages intérieures** (Marches, sans doute aussi MBSR) : les afficher tout de suite. Le titre animé laisse un trou vide pendant environ 3 s.
6. **Présenter Hiroko plus tôt et en vrai.** Placer une phrase « instructrice MBSR, neurobiologiste de formation » dès le premier écran ou juste après. Remplacer l'aquarelle de cerisier par une vraie photo d'Hiroko. Sur ordinateur, donner à la biographie toute la largeur.
7. **Sur ordinateur, raccourcir la frise épinglée « Deux heures dans le bois »** : elle consomme 4 défilements, il en faudrait 1 à 1,5.
8. **Page Contact : placer « Où se retrouver » avant le jeu « Tracez votre ensō ».**
   - Ajouter un lien « Itinéraire » par lieu.
   - Préciser l'entrée et le point de rendez-vous du Parc floral.
   - Sur téléphone, laisser une marge sous la dernière ligne pour que la barre Écrire/Réserver ne cache pas le code postal.
9. **Images et contraste.**
   - Remplacer la forêt tropicale de l'appel final par un sous-bois tempéré, fidèle au bois de Vincennes.
   - Renforcer le contraste des surtitres sur photo : « DIMANCHE MATIN » sur l'accueil, « LE PROGRAMME » sur la page MBSR.
   - Écarter le bouton flottant de la cloche du texte.
   - Sur téléphone, réduire les badges « Illustration générée » qui débordent des vignettes rondes.
10. **Avant la mise en ligne.**
    - Remplir « Politique de confidentialité : à compléter », les mentions légales et « Prochain cycle : dates annoncées ici ». Pour le MBSR, donner une date ou une réunion d'information.
    - Indiquer dans la confirmation du formulaire un délai de réponse.
    - Expliquer la pause d'hiver des marches (aucune entre le 15 novembre et le 14 mars).
    - Corriger la police du « ō » de « ensō ».
