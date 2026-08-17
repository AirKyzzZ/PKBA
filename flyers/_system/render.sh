#!/bin/bash
# Rendu des affiches PKBA. Un seul script pour tous les visuels.
#
#   ./flyers/_system/render.sh <slug> [cible]
#
# cible : instagram | print | all   (defaut: all)
# Les sorties vont dans flyers/<slug>/exports/.
set -euo pipefail

SYSTEM_DIR="$(cd "$(dirname "$0")" && pwd)"
FLYERS_DIR="$(dirname "$SYSTEM_DIR")"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

SLUG="${1:-}"
TARGET="${2:-all}"

if [ -z "$SLUG" ]; then
  echo "usage: $0 <slug> [instagram|print|all]" >&2
  echo "slugs disponibles :" >&2
  find "$FLYERS_DIR" -mindepth 1 -maxdepth 1 -type d -not -name '_*' -exec basename {} \; | sed 's/^/  /' >&2
  exit 1
fi

DIR="$FLYERS_DIR/$SLUG"
[ -d "$DIR" ] || { echo "introuvable: $DIR" >&2; exit 1; }
[ -x "$CHROME" ] || { echo "Chrome introuvable: $CHROME" >&2; exit 1; }
mkdir -p "$DIR/exports"

canvas_size() { # canvas_size <html> -> "LARGEUR HAUTEUR"
  if grep -q 'fmt-ig-post' "$1"; then echo "1080 1350"
  elif grep -q 'fmt-ig-square' "$1"; then echo "1080 1080"
  elif grep -q 'fmt-ig-story' "$1"; then echo "1080 1920"
  else echo "1080 1350"
  fi
}

render_png() {
  local html="$1" out="$2"
  read -r W H <<< "$(canvas_size "$html")"
  "$CHROME" \
    --headless=new --disable-gpu --hide-scrollbars \
    --force-device-scale-factor=1 \
    --window-size="${W},${H}" \
    --virtual-time-budget=4000 \
    --run-all-compositor-stages-before-draw \
    --default-background-color=00000000 \
    --screenshot="$out" \
    "file://${html}" 2>/dev/null
  echo "  PNG  ${W}x${H}  $(basename "$out")"
}

render_pdf() {
  local html="$1" out="$2"
  "$CHROME" \
    --headless=new --disable-gpu --hide-scrollbars \
    --no-pdf-header-footer \
    --virtual-time-budget=4000 \
    --run-all-compositor-stages-before-draw \
    --print-to-pdf="$out" \
    "file://${html}" 2>/dev/null
  echo "  PDF        $(basename "$out")"
}

echo "$SLUG"

if [ "$TARGET" = "instagram" ] || [ "$TARGET" = "all" ]; then
  for f in "$DIR"/instagram*.html; do
    [ -e "$f" ] || continue
    render_png "$f" "$DIR/exports/$(basename "${f%.html}").png"
  done
fi

if [ "$TARGET" = "print" ] || [ "$TARGET" = "all" ]; then
  for f in "$DIR"/print*.html; do
    [ -e "$f" ] || continue
    render_pdf "$f" "$DIR/exports/$(basename "${f%.html}").pdf"
  done
fi

echo "  -> $DIR/exports/"
