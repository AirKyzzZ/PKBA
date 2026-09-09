# Système d'affiches PKBA

Les visuels du club sont écrits en HTML et CSS, puis rendus en PNG pour Instagram et en PDF pour
l'impression. L'objectif est d'itérer en quelques secondes plutôt qu'en quelques heures sur Canva,
et de garder une identité cohérente d'une affiche à l'autre.

## Créer une affiche

```
flyers/
  _system/              <- ne pas dupliquer, tout part d'ici
    tailwind.config.js  hérite des tokens du site via presets
    flyers.css          @font-face, formats de canevas, composants
    out.css             généré au rendu, ignoré par git
    fonts/              polices auto-hébergées
    assets/             logos partagés PKBA et FFGym
    photos/             photos du club converties depuis les RAW
    render.mjs          le seul script de rendu, Playwright
  mon-affiche/
    brief.md            objectif, contenu, livrables, légende
    instagram.html      visuel réseaux
    print.html          visuel imprimable, optionnel
    assets/             images propres à cette affiche
    exports/            sorties, générées
```

Partir de `flyers/rentree-2026-2027/instagram.html`, qui sert de référence.

Squelette minimal :

```html
<link rel="stylesheet" href="../_system/out.css">
...
<div class="canvas fmt-ig-post">
  <header>...</header>
  <div><!-- photo --></div>
  <section><div class="fit-zone">...</div></section>
</div>
```

Le canevas est une grille `auto 1fr auto`. Tout contenu variable va dans `.fit-zone`, seule zone
dont le débordement est mesuré par le renderer.
## Formats disponibles

| Classe | Dimensions | Usage |
|---|---|---|
| `fmt-ig-post` | 1080 x 1350 | Post Instagram 4:5, celui qui occupe le plus de place dans le fil |
| `fmt-ig-square` | 1080 x 1080 | Post carré |
| `fmt-ig-story` | 1080 x 1920 | Story |
| `fmt-a5` | 148 x 210 mm | Flyer imprimé |
| `fmt-a4` | 210 x 297 mm | Affiche imprimée |

`render.mjs` lit la classe dans le HTML pour connaître les dimensions, il n'y a rien à passer en
argument. Grâce aux unités `cqh`, un même HTML peut sortir dans plusieurs formats.

## Rendre

```
node flyers/_system/render.mjs rentree-2026-2027            # tout
node flyers/_system/render.mjs rentree-2026-2027 instagram  # JPEG seulement
node flyers/_system/render.mjs rentree-2026-2027 print      # PDF seulement
node flyers/_system/render.mjs                              # liste les slugs
```

Tout fichier `instagram*.html` sort en JPEG qualité 88, tout fichier `print*.html` sort en PDF. Pour proposer
deux pistes, nommer `instagram-a.html` et `instagram-b.html`, les deux seront rendues.

## QR codes

`qr.py` genere un QR et verifie qu'il se relit avant de rendre la main.

```
python3 flyers/_system/qr.py "https://exemple.fr" mon-affiche/assets/qr.png
```

Correction Q par defaut, pas H. H produit un code plus dense qu'OpenCV ne sait pas relire, donc
inverifiable automatiquement, alors que Q reste robuste a l'impression. Les URL viennent de
`content/club.ts`, jamais recopiees a la main.

Toujours poser la classe `.qr` sur l'image dans le HTML, et relire le PDF final avec un telephone
avant un gros tirage.

## Direction artistique

Éditorial sportif au stencil. Ce qui fait l'identité, dans l'ordre :

1. **L'échelle.** Un seul élément énorme par affiche, celui qu'on doit retenir. Une date, un chiffre,
   un mot. Tout le reste est nettement plus petit.
2. **Le stencil condensé** pour tous les titres, Montserrat pour le corps et les chiffres.
3. **Les aplats bleus francs** en bandes pleine largeur, séparés du fond crème par un filet noir
   épais. Pas de dégradés, pas d'ombres douces.
4. **Le système de filets.** Filet épais pour séparer les blocs, filet fin pour les lignes de
   tableau. C'est ce qui donne l'air construit plutôt que décoré.
5. **Le grain**, discret, pour éviter l'aplat numérique parfait.

Palette, héritée de `tailwind.config.js` du site : bleu `#006AFF`, bleu profond `#127bcb`, crème `#F4F2E7`, encre
`#0A0A0A`.

Toujours présents : logo PKBA et logo FFGym en haut, adresse et lien de préinscription en bas.

## Pièges connus

**Ne pas écraser le `line-height` pour resserrer un titre.** Utiliser `.trim`, qui applique
`text-box-trim`, et qui supprime l'espace au dessus des capitales sans faire déborder le glyphe.

**Le débordement est détecté automatiquement.** Le renderer mesure `.fit-zone`, corrige un petit
débordement par `zoom` et lève une erreur au delà de 60 px. Il vérifie aussi le plancher de 30 px,
les ratios de contraste WCAG couple par couple, et le poids du fichier.

**Le bleu ne porte jamais de petit texte.** Bleu sur crème donne 4,15:1 et bleu sur encre 4,25:1,
tous deux insuffisants sous 66 px. Encre sur crème donne 17,63:1 et passe partout.

**Un fichier `print*.html` doit déclarer son `@page`.** Le renderer appelle `page.pdf()` avec
`preferCSSPageSize`, et `flyers.css` ne fixe que la taille du `div.canvas`, pas celle de la page
PDF. Sans `<style>@page { size: A4 portrait; margin: 0; }</style>` dans le `head`, le PDF sort au
format Letter avec l'affiche calée en haut à gauche. La valeur doit suivre la classe `fmt-`.

**Le contrôle de contraste ignore l'alpha.** Il lit `getComputedStyle().color` et n'en garde que
les trois premiers nombres, donc `text-cream/80` est mesuré comme du crème plein. Une opacité
basse sur un petit texte passe le contrôle sans être lisible. À vérifier à l'œil.

**Les seuils du contrôle suivent le format, ne pas les remettre en dur.** Ce sont les seuils
WCAG, plancher de lisibilité à 10,7 px vus, texte large à 18 pt, texte large gras à 14 pt,
multipliés par le rapport entre le canevas et la taille à laquelle on le regarde. Un canevas
Instagram de 1080 px vu sur un téléphone de 390 px donne un facteur 2,77, d'où les 30, 66 et
51 px d'origine. Un format en millimètres se regarde à l'échelle 1, donc le plancher y tombe à
11 px, soit 8 pt. C'est pour ça qu'un A5 accepte une vraie typographie de flyer alors qu'une
affiche Instagram non.

**Un QR code réduit par le navigateur devient illisible.** Chrome lisse l'image en la
redimensionnant et mange les modules, et le code cesse d'être décodable bien avant d'avoir l'air
flou à l'œil. Lui mettre la classe `.qr`, qui applique `image-rendering: pixelated`. Le contrôle
automatique ne regarde pas les QR codes : les relire avec un téléphone sur l'export final.

**Les polices sont locales**, dans `fonts/`. Ne pas revenir à Google Fonts par CDN : le rendu
devient dépendant du réseau et non déterministe. Pour ajouter une police, récupérer le woff2 du
sous-ensemble latin et le déclarer dans `flyers.css`.
