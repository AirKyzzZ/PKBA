# Forum des associations 2026, parc des expositions

## Objectif

Affiche du stand. Elle n'est pas là pour présenter le club, elle est là pour faire scanner le QR
code : l'objectif du forum est de repartir avec des contacts, pas avec des sourires.

Deux jours de tenue de stand :

- samedi 5 septembre 2026, La Teste-de-Buch
- dimanche 6 septembre 2026, Gujan-Mestras

## Contenu

- Accroche : parkour dès 3 ans, la discipline est le vrai différenciateur face aux autres stands
- Offre : première séance offerte, sans engagement
- QR code vers `https://pkba.vertiflow.fr/inscription`, généré et relu, voir plus bas
- Reprise le lundi 7 septembre 2026
- 4 av. de l'Actipôle, Gujan-Mestras

`print-affiche.html` est l'affiche A4 posée sur le stand : le visiteur est déjà au forum, les dates n'ont
rien à y faire, seuls l'offre et le QR comptent. `instagram.html` est le post d'annonce publié
avant, où les deux dates sont au contraire l'information principale.

## QR code

`assets/qr-inscription.png`, 41 x 41 modules, correction d'erreur H, marge blanche de 4 modules.
Généré avec OpenCV, déjà présent dans l'environnement, puis relu depuis le fichier écrit pour
vérifier qu'il redonne bien l'URL :

```
python3 - <<'PY'
import cv2, numpy as np
URL = "https://pkba.vertiflow.fr/inscription"
p = cv2.QRCodeEncoder_Params(); p.correction_level = cv2.QRCodeEncoder_CORRECT_LEVEL_H
qr = cv2.QRCodeEncoder_create(p).encode(URL)
big = np.kron(np.pad(qr, 4, constant_values=255), np.ones((24, 24), np.uint8))
cv2.imwrite("flyers/forum-2026/assets/qr-inscription.png", big)
assert cv2.QRCodeDetector().detectAndDecode(cv2.imread("flyers/forum-2026/assets/qr-inscription.png"))[0] == URL
PY
```

Le renderer contrôle le contraste du texte mais pas la lisibilité d'un QR code. Le relire avec un
téléphone sur l'export final avant impression, c'est le seul contrôle qui compte.

## Tarifs

Le flyer imprime la **grille tarifaire complète**. Les tarifs ont été validés par le bureau, et
`content/tarifs.ts` est passé de `TARIFS_PROVISIONAL = true` à `false`, ce qui retire du même coup
la mention « susceptibles d'évoluer » sur le site. Les deux disent donc la même chose.

La grille du verso est recopiée telle quelle depuis `content/tarifs.ts`, libellés et durées
compris, et vérifiée ligne par ligne contre la source. Si un tarif bouge, il bouge dans
`content/tarifs.ts` d'abord, puis on relance le rendu, jamais l'inverse.

Une incohérence de vocabulaire subsiste et vient du site, pas du flyer : `tarifs.ts` nomme les
groupes sur sélection « Pré-compét », « Perf Petits » et « Perf Grands », alors que
`content/schedule.ts` et le recto les appellent « Prépa compét » et « Compétition ». À trancher un
jour dans le repo, ça ne gêne pas la lecture du flyer parce que ces groupes sont fermés aux
nouveaux.

## Livrables

- [x] Affiche A4 pour le stand, `print-affiche.html`
- [x] Post Instagram d'annonce, `instagram.html`
- [x] Flyer A5 recto, planning complet de la saison, `print-flyer-recto.html`
- [x] Flyer A5 verso, séance d'essai et QR, `print-flyer-verso.html`

## Rendu

```
node flyers/_system/render.mjs forum-2026
```

## Légende du post d'annonce

> 🔵 On tient un stand au forum des associations, ce week-end, au parc des expositions.
>
> - samedi 5 septembre, La Teste-de-Buch
> - dimanche 6 septembre, Gujan-Mestras
>
> Venez poser vos questions, on aura de quoi faire essayer aux enfants. Le club est ouvert à tous
> dès 3 ans, sans niveau requis, et la première séance est offerte.
>
> Vous pouvez aussi préinscrire votre enfant directement, lien en bio, ça prend deux minutes.
>
> 📍 4 av. de l'Actipôle, Gujan-Mestras
>
> #forumdesassociations #parkour #freerun #bassindarcachon #gujanmestras #latestedebuch #arcachon #ffgym
