# Planning 2026/2027, carrousel Instagram

## Objectif

Répondre à la seule question que se pose un parent : **quel cours pour mon enfant, et à quelle
heure**. Le post épinglé de la rentrée donne la réponse courte, ce carrousel donne la réponse
complète, une diapo par groupe.

Le format carrousel est choisi pour ça : le parent s'arrête sur la diapo qui correspond à l'âge de
son enfant, et Instagram remontre le post à ceux qui n'ont pas fait défiler.

## Séquence

| Diapo | Contenu |
|---|---|
| 1 | Couverture, quel cours pour mon enfant, reprise le 7 septembre |
| 2 | Loisir 3 à 5 ans, mercredi 11h00 |
| 3 | Loisir 6 à 8 ans, mercredi 13h00 |
| 4 | Loisir 8 à 12 ans, mercredi 14h00 |
| 5 | Loisir 9 à 12 ans, lundi 17h00, nouveau créneau |
| 6 | Loisir plus de 12 ans, mercredi 17h30 |
| 7 | Prépa compét et Compétition, sur sélection, appel à la préinscription |

Horaires repris de `content/schedule.ts`, durées de `content/tarifs.ts`. En cas de changement de
planning, corriger là-bas d'abord, puis reporter ici et relancer le rendu.

Une photo différente par diapo, choisie pour correspondre à l'âge du groupe. La couverture évite
volontairement `IMG_4919`, qui est la photo du post épinglé de la rentrée : les deux se retrouvent
côte à côte dans la grille du profil et se liraient comme un doublon.

## Livrables

- [x] Carrousel 7 diapos, 1080 x 1350

## Rendu

```
node flyers/_system/render.mjs planning-2026-2027
```

## Légende proposée

> 🔵 Le planning de la saison 2026/2027, groupe par groupe. Faites défiler jusqu'à l'âge de votre
> enfant.
>
> Les cours loisir sont ouverts à tous, sans niveau requis :
> - 3 à 5 ans, le mercredi à 11h00
> - 6 à 8 ans, le mercredi à 13h00
> - 8 à 12 ans, le mercredi à 14h00
> - 9 à 12 ans, le lundi à 17h00, nouveau créneau
> - plus de 12 ans, le mercredi à 17h30
>
> Prépa compétition et Compétition se font sur sélection, en semaine.
>
> Reprise le lundi 7 septembre. La première séance est offerte, sans engagement, venez essayer.
>
> Préinscription en ligne, lien en bio.
>
> 📍 4 av. de l'Actipôle, Gujan-Mestras
>
> #parkour #freerun #bassindarcachon #gujanmestras #latestedebuch #arcachon #parkourfrance #ffgym
