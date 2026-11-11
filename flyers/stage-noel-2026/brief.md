# Stage de Noël 2026, post, story et carrousel Instagram

## Objectif

Annoncer le stage de parkour des vacances de Noël et remplir les deux semaines. Le post doit
répondre seul aux trois questions d'un parent : quand, pour quel âge, combien. Le carrousel
détaille une question par slide, la story reprend le post en vertical.

## Dates

Vacances de Noël 2026, même format que les stages précédents, du lundi au mercredi sur deux
semaines :

- **Semaine 1** : lundi 21, mardi 22, mercredi 23 décembre
- **Semaine 2** : lundi 28, mardi 29, mercredi 30 décembre

## Contenu

- Deux formules, reprises de `content/stages.ts`, entrée `noel-2026`
  - Formule 1, licenciés et initiés, 10h00 à 16h00, dès 8 ans, 25€ la journée, pique-nique à
    ramener, goûter offert par le club
  - Formule 2, découverte, 16h00 à 17h30, dès 6 ans, 15€ la séance, sans licence
- **Pas de tarif semaine.** Le tarif à 100€ ne vaut que pour une semaine complète de cinq jours,
  les semaines de Noël n'en ont que trois. Il n'apparaît nulle part sur les visuels.
- Libellés : « Formule 1 » et « Formule 2 », jamais « Stage 1 / Stage 2 » (décision de Maxime
  du 10/11).
- « Paiement sur place » vient du formulaire de `/stage`.
- 4 av. de l'Actipôle à Gujan-Mestras
- Inscription sur pkba.vertiflow.fr/stage, QR code vérifié dans `assets/qr-stage.png`

En cas de changement, corriger `content/stages.ts` d'abord, puis les HTML, puis relancer le rendu.

## Traitement visuel

Le fil était saturé du gabarit rentrée (bandeau encre, bande photo, bloc encre) et la Toussaint
avait pris le fond crème. Ici :

- **Pas de bandeau d'entête.** Les logos sont des pastilles posées sur la photo.
- **Une bande bleue pleine largeur porte l'élément énorme, « NOËL »**, en blanc, avec « Stage de
  parkour » aligné sur la même ligne de base. C'est la première fois que le bleu est l'aplat
  principal d'un post.
- **Les dates en calendrier**, grille à filets dont chaque case est une porte de calendrier de
  l'Avent. C'est le clin d'œil de Noël, sans pictogramme, sans rouge ni vert.
- Le bloc crème du bas reste en encre, le bleu ne porte que du texte de grande taille.

Photos, aucune déjà utilisée sur une affiche :

- `IMG_5065.jpg` pour le post et la story : salto arrière sous la charpente, la silhouette
  entière tient dans une bande large et se lit en noir et blanc grâce aux poutres.
- `IMG_5127.jpg` pour la couverture du carrousel : salto contre le mur en parpaings, visage
  visible, très lisible en noir et blanc. Une photo différente du post pour ne pas doubler le
  même visuel dans le fil.

Le carrousel partage un cadre : entête crème avec médaillon et FFGym sur les slides 2 à 4, filet
bleu puis pied encre avec l'index `1 / 4`. La couverture reste lisible seule dans la grille du
profil, rien d'important dans les 34 px rognés de chaque côté.

La story garde les 250 px du haut sans information clé (les logos y débordent à peine) et
laisse les 270 px du bas vides, en aplat encre, pour la barre de réponse. L'adresse est dans le
bloc crème, sous la ligne d'inscription.

Sur le post, la photo est cadrée à `object-[50%_72%]` : à 42 % la tête du sauteur passait sous la
bande bleue.

## Livrables

- [x] `instagram-post.html`, 1080 x 1350
- [x] `instagram-story.html`, 1080 x 1920
- [x] `instagram-carrousel-1.html` à `-4.html`, 1080 x 1350 : couverture, dates, horaires et
      tarifs, inscription
- [x] PNG dans `exports/2026-11-10/`

## Rendu

```
node flyers/_system/render.mjs stage-noel-2026
```

Le renderer sort du JPEG dans `exports/` et contrôle débordement, plancher de 30 px et
contrastes. Tout passe, sans auto-fit. Les PNG datés ont été capturés par le même chemin
Playwright (même auto-fit, même taille), avec un script ponctuel hors dépôt.

Piège rencontré : un titre `.trim` en dernier enfant d'une `.fit-zone` déborde de quelques
pixels par le bas, et l'auto-fit écrase alors tout jusqu'à `zoom 0.6`. Un `pb-[16px]` sur la
`.fit-zone` absorbe le glyphe.

## Légende proposée

> 🎄 Stage de parkour pendant les vacances de Noël.
>
> - Lundi 21, mardi 22 et mercredi 23 décembre
> - Lundi 28, mardi 29 et mercredi 30 décembre
>
> Deux formules au choix :
> - Licenciés et initiés, 10h à 16h, dès 8 ans, 25€ la journée, pique-nique à ramener et goûter offert
> - Découverte, 16h à 17h30, dès 6 ans, 15€ la séance, sans licence
>
> Un ou plusieurs jours au choix. Inscription en ligne, lien en bio.
>
> 📍 4 av. de l'Actipôle, Gujan-Mestras
>
> #parkour #freerun #stagenoel #vacancesdenoel #bassindarcachon #gujanmestras #latestedebuch #arcachon #parkourfrance #ffgym

## Version 2, 10/11/2026

Un seul format fil : **le carrousel de 3 slides**, pas le post simple. Sur le compte, le carrousel
du planning (24/08) a fait 20 likes contre 9 à 12 pour les posts simples de la même période
(rentrée, coachs, Toussaint), et Instagram remontre un carrousel non lu avec sa slide 2. La
couverture porte seule dates, horaires, âges et prix, donc rien n'est perdu pour qui ne glisse pas.

Deux pistes explorées dans `variantes/` : A « chronophoto de nuit » (fond encre, neige en grain,
silhouettes du salto en séquence) et B « paquet » (aplat bleu tramé, ruban encre, étiquette
cadeau crème avec ombre dure, athlète détouré qui passe devant le ruban et l'étiquette). **B
retenue** : un seul point focal, l'étiquette encre sur crème se lit en vignette, le bleu plein
n'a jamais servi de fond dans le fil.

- `instagram-v2-carrousel-1.html` à `-3.html` : couverture, formules et tarifs, inscription
- `instagram-v2-story.html` : 250 px libres en haut, 270 px d'encre en bas, une bande bleue
  libre sous l'étiquette pour le sticker lien
- Détourages locaux (Vision macOS) dans `assets/cut-*.png` et `assets/sil-*.png`, série du
  salto au mur IMG_5124, IMG_5127, IMG_5073
- PNG et légende dans `exports/2026-11-10-v2/`, pistes dans `exports/2026-11-10-v2/pistes/`

Les masques CSS (`mask-image`) ne marchent pas en `file://` dans Chrome, d'où les silhouettes
pré-colorées en PNG.

### Décisions de Maxime du 10/11, appliquées en v2

- Tarif : **25€ la journée et 100€ la semaine complète de 3 jours**, rien d'autre. Le 15€ de la
  Formule 2 est retiré. Remplace les lignes tarifs de la section Contenu ci-dessus.
- **La Formule 2 n'a plus de prix affiché** : le 25€/100€ correspond à la Formule 1, aucun tarif
  n'a été donné pour le créneau 16h-17h30. À trancher, puis ajouter un chip prix sur la slide 2
  et une ligne sur la couverture, la story et la légende.
- 3 jours à 25€ font 75€, moins que la semaine à 100€. À confirmer avec Maxime.
- Le site (`content/stages.ts`, `noel-2026`, commit a3a3030) affiche la Formule 2 en « Tarif à
  confirmer auprès du club » mais n'a pas de tarif semaine (`weekDiscount: false`, semaine
  complète à 5 jours) : 3 jours y font 75€. Visuels et site divergent sur le 100€.

Touches de Noël ajoutées : nœud crème sur le ruban encre, ficelle qui descend jusqu'à l'œillet de
l'étiquette (couverture et story), œillet renforcé sur l'étiquette, trois petits flocons
géométriques par visuel, hors des zones de texte.

### Itération du 11/11, plus de Noël

Demande de Maxime : plus d'éléments de Noël sur tous les formats, un sapin, sans tomber dans le
clipart. Prix inchangés en attendant sa réponse : 25€/jour, ligne « 100€ la semaine » gardée
telle quelle, Formule 2 toujours sans prix.

- Sapin en pochoir, trois étages encre à 32 % d'opacité derrière le titre, étoile crème à ombre
  dure, une guirlande de lumières crème sur l'étage du haut. Il passe derrière « Noël », « Deux
  formules » et « En ligne », jamais sur un texte du corps.
- Neige qui tombe, petits points crème semés hors des zones de texte, en plus des flocons.
- Neige posée sur le bandeau encre du bas, avec quelques stalactites.
- Nœud crème sur le ruban entre les deux étiquettes de la slide 2.
- Sur la couverture et la story, « Stage de parkour » passe à côté du médaillon pour laisser
  l'étoile au-dessus du titre.
- Nouveau format carré `instagram-v2-carre.html` (1080x1080) : même contenu que la story, sans
  l'adresse, « Inscription en ligne, lien en bio » en pied.
- PNG et légende dans `exports/2026-11-11-v3/`. L'état v2 reste au commit cc5fb99 et dans
  `exports/2026-11-10-v2/`.
