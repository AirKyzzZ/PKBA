# Stage de la Toussaint 2026, post Instagram et flyer A5

## Objectif

Annoncer le stage de parkour des vacances de la Toussaint et remplir les deux semaines. Le post
doit répondre seul aux trois questions d'un parent : quand, pour quel âge, combien.

Suit l'issue #21, qui était bloquée sur les dates. Les dates sont désormais arrêtées.

## Dates

Vacances de la Toussaint zone A (académie de Bordeaux) : du samedi 17 octobre au lundi 2 novembre
2026. Le stage tient entièrement dans cette fenêtre.

- **Vendredi 23 octobre**, une seule journée sur la première semaine
- **Du lundi 26 au vendredi 30 octobre**, cinq journées

Pas de stage du lundi 19 au jeudi 22 octobre : les animateurs sont en formation animateur sur ces
quatre jours. C'est la raison pour laquelle la première semaine se réduit au vendredi.

## Contenu

- Deux formules, reprises de `content/stages.ts`
  - Licenciés et initiés, 10h00 à 16h00, dès 8 ans, 25€ la journée, 100€ la semaine du 26
  - Découverte, 16h00 à 17h30, dès 6 ans, 15€ la séance
- Le tarif semaine ne s'applique qu'à la semaine du 26, la première semaine n'ayant qu'un jour
- 4 av. de l'Actipôle à Gujan-Mestras
- Inscription sur pkba.vertiflow.fr/stage

Les dates et les tarifs viennent de `content/stages.ts`, entrée `toussaint-2026`. En cas de
changement, les corriger là-bas d'abord, puis les reporter ici et relancer le rendu.

## Traitement visuel

Le premier jet portait l'echelle sur les dates seules et on ne comprenait pas qu'il s'agissait
d'un stage pendant les vacances de la Toussaint. Quatre pistes ont ete testees, la direction creme
a ete retenue, puis quatre declinaisons de cette direction. **La declinaison A1 est retenue**, avec l'entete E2,
c'est `instagram.html`. Le flyer A5 est aligne dessus : meme titre, meme pave bleu pour les dates.

Le principe : fond creme, bandeau encre en haut, titre encre en tres gros, bleu franc reserve aux
dates et a l'appel a l'action, bande photo en bas, pied encre. La palette inversee par rapport a
l'encre dominante des posts precedents est ce qui distingue le plus cette affiche dans le fil.

Photo `IMG_4970.jpg`, la course sur barre devant le mur tague PKBA. Lisible en noir et blanc, et
le tag situe le club.

Les trois autres declinaisons sont conservees dans `variantes/`, hors du chemin de rendu pour ne
pas encombrer les exports. Elles restent utilisables pour un post ulterieur :

- `instagram-a2.html`, bande bleue bord a bord portant les tarifs
- `instagram-a3.html`, photo en haut, contenu creme en dessous, pied bleu
- `instagram-a4.html`, calendrier d'octobre a la place du bloc de dates

**L'entete.** Le logo PKBA n'est pas une pastille ronde, c'est un lockup vertical, le mot arque
au dessus d'un medaillon. Le mettre dans un disque le compressait en bouillie illisible et
ecrivait PKBA deux fois, une fois dans le disque et une fois a cote. Le medaillon est desormais
detoure en asset separe, `_system/assets/pkba-medaillon.png`, masque en cercle. C'est lui qu'il
faut utiliser dans une pastille, jamais `pkba-logo.png`, qui ne va que sur une zone large ou son
wordmark arque a la place de respirer. Correctif applique aussi au flyer A5, a la carte de
partage du site et aux variantes archivees.

**Deux pieges rencontres, a retenir.**

`.fit-zone` ne s'etire pas toute seule : sa hauteur vaut celle de son contenu, alors que
`scrollHeight` inclut en plus le debordement de glyphe des titres `.trim`, une douzaine de
pixels. Le controle voit donc un debordement permanent et l'auto-fit descend jusqu'a `zoom 0.6`,
ce qui ecrase toute l'affiche sans rien signaler d'autre qu'une ligne `auto-fit`. Agrandir le
bloc parent ne suffit pas, il faut passer le parent en `flex flex-col` et donner `flex-1` a la
`.fit-zone`.

`.fit-zone` porte `overflow: hidden`, donc une bande pleine largeur tiree par marge negative y
est clippee. Pour qu'un aplat aille bord a bord, sortir le padding `safe` du conteneur et le
poser sur chaque bloc de texte, en le laissant sur l'aplat lui meme. C'est ce que fait
`variantes/instagram-a2.html`.

## Livrables

- [x] Post Instagram 1080 x 1350
- [x] Flyer A5 print pour le local
- [ ] QR code sur le flyer A5, vers `/stage`

Le QR n'est pas posé : aucune bibliothèque de génération n'est disponible dans le projet, et le
`qr-inscription.png` du forum pointe vers `/inscription`, pas vers `/stage`. L'URL est écrite en
gros dans le bandeau bleu en attendant. Si le QR est voulu, générer un PNG vers
`https://pkba.vertiflow.fr/stage/` et le poser dans `assets/`, avec la classe `.qr`.

## Rendu

```
node flyers/_system/render.mjs stage-toussaint-2026
```

## Légende proposée

> 🍂 Stage de parkour pendant les vacances de la Toussaint.
>
> - Vendredi 23 octobre
> - Du lundi 26 au vendredi 30 octobre
>
> Deux formules au choix :
> - Licenciés et initiés, 10h à 16h, dès 8 ans, 25€ la journée ou 100€ la semaine du 26
> - Découverte, 16h à 17h30, dès 6 ans, 15€ la séance, sans licence
>
> Pas de stage du 19 au 22 octobre, les animateurs sont en formation.
>
> Inscription en ligne, lien en bio.
>
> 📍 4 av. de l'Actipôle, Gujan-Mestras
>
> #parkour #freerun #bassindarcachon #gujanmestras #latestedebuch #arcachon #parkourfrance #ffgym
