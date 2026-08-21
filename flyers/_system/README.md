# Système d'affiches PKBA

Les visuels du club sont écrits en HTML et CSS, puis rendus en PNG pour Instagram et en PDF pour
l'impression. L'objectif est d'itérer en quelques secondes plutôt qu'en quelques heures sur Canva,
et de garder une identité cohérente d'une affiche à l'autre.

## Créer une affiche

```
flyers/
  _system/            <- ne pas dupliquer, tout part d'ici
    tokens.css        couleurs, polices, épaisseurs de filets
    base.css          reset, formats de canevas, utilitaires
    fonts/            polices auto-hébergées
    assets/           logos partagés PKBA et FFGym
    render.sh         le seul script de rendu
  mon-affiche/
    brief.md          objectif, contenu, livrables, légende
    instagram.html    visuel réseaux
    print.html        visuel imprimable, optionnel
    assets/           images propres à cette affiche
    exports/          sorties, générées
```

Partir de `flyers/rentree-2026-2027/instagram.html`, qui sert de référence.

Squelette minimal :

```html
<link rel="stylesheet" href="../_system/tokens.css">
<link rel="stylesheet" href="../_system/base.css">
...
<div class="canvas fmt-ig-post grain">...</div>
```

## Formats disponibles

| Classe | Dimensions | Usage |
|---|---|---|
| `fmt-ig-post` | 1080 x 1350 | Post Instagram 4:5, celui qui occupe le plus de place dans le fil |
| `fmt-ig-square` | 1080 x 1080 | Post carré |
| `fmt-ig-story` | 1080 x 1920 | Story |
| `fmt-a5` | 148 x 210 mm | Flyer imprimé |
| `fmt-a4` | 210 x 297 mm | Affiche imprimée |

`render.sh` lit la classe dans le HTML pour connaître les dimensions, il n'y a rien à passer en
argument.

## Rendre

```
node flyers/_system/render.mjs rentree-2026-2027            # tout
node flyers/_system/render.mjs rentree-2026-2027 instagram  # JPEG seulement
node flyers/_system/render.mjs rentree-2026-2027 print      # PDF seulement
node flyers/_system/render.mjs                              # liste les slugs
```

Tout fichier `instagram*.html` sort en PNG, tout fichier `print*.html` sort en PDF. Pour proposer
deux pistes, nommer `instagram-a.html` et `instagram-b.html`, les deux seront rendues.

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

Palette, dans `tokens.css` : bleu `#006AFF`, bleu profond `#127bcb`, crème `#F4F2E7`, encre
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

**Les polices sont locales**, dans `fonts/`. Ne pas revenir à Google Fonts par CDN : le rendu
devient dépendant du réseau et non déterministe. Pour ajouter une police, récupérer le woff2 du
sous-ensemble latin et le déclarer dans `tokens.css`.
