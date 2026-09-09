# Appel aux avis Google, affiche A5

## Objectif

Une affiche posée au local pour que les familles laissent un avis Google. Le QR ouvre directement
la fenêtre de notation, pas la fiche, donc le parent tombe sur les étoiles sans rien chercher.

Suit l'issue #27.

## Contenu

Affiche volontairement pauvre en texte, elle se lit de loin et en passant. Le message tient dans
les cinq étoiles, le titre et le QR, tout le reste est visuel.

- Cinq étoiles pleines en jaune, c'est ce qui dit avis sans avoir à l'écrire
- Le logo Google en haut à droite, extrait de `react-icons` que le site utilise déjà, plutôt
  qu'un dessin approximatif d'une marque déposée
- Le QR en 68 mm, assez gros pour se scanner de loin
- Un pied bleu avec deux pictos, Instagram et le site, sans phrase

## Le QR

Généré par `flyers/_system/qr.py`, depuis `CLUB.google.reviewUrl` dans `content/club.ts`. Ne pas
le recopier à la main, si l'URL d'avis change c'est `club.ts` qu'on modifie puis on régénère.

```
python3 flyers/_system/qr.py "$(url d'avis)" flyers/avis-google/assets/qr-avis-google.png
```

Niveau de correction Q et non H. H produit une version 5, plus dense, qu'OpenCV ne parvient pas à
relire, donc impossible à vérifier automatiquement. Q reste robuste à l'impression et se vérifie.
Le générateur relit systématiquement ce qu'il vient d'écrire et échoue si le contenu ne correspond
pas.

Vérifié aussi après rendu, en rasterisant le PDF final et en le redécodant, ce que le contrôle du
renderer ne fait pas. Ça ne remplace pas un test au téléphone sur du papier, à faire avant de
lancer un gros tirage.

## Livrables

- [x] A5 print pour le local
- [ ] Version Instagram, si on veut relancer les avis en ligne
- [ ] Petit format type A6 pour le comptoir, à décider

## Rendu

```
node flyers/_system/render.mjs avis-google
```
