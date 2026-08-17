#!/bin/bash
# Render flyers to PDF (print) and PNG (Instagram) via Chrome headless.
# Usage: ./render.sh [option-name]   (default: option-a-cream)

set -e
cd "$(dirname "$0")"

OPT="${1:-option-a-cream}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

mkdir -p exports

# --- PRINT A5 (PDF) ---
PRINT_HTML="$(pwd)/print/${OPT}.html"
PRINT_PDF="$(pwd)/exports/${OPT}-print-A5.pdf"
echo "→ Rendering PRINT  $PRINT_HTML"
"$CHROME" \
  --headless=new \
  --disable-gpu \
  --hide-scrollbars \
  --no-pdf-header-footer \
  --virtual-time-budget=15000 \
  --run-all-compositor-stages-before-draw \
  --print-to-pdf="$PRINT_PDF" \
  "file://${PRINT_HTML}" 2>/dev/null
echo "  ✓ $PRINT_PDF"

# Print PNG preview (148mm × 210mm at ~3.78 px/mm = 559×794)
PRINT_PNG="$(pwd)/exports/${OPT}-print-A5-preview.png"
"$CHROME" \
  --headless=new \
  --disable-gpu \
  --hide-scrollbars \
  --window-size=559,794 \
  --default-background-color=00000000 \
  --virtual-time-budget=15000 \
  --run-all-compositor-stages-before-draw \
  --screenshot="$PRINT_PNG" \
  "file://${PRINT_HTML}" 2>/dev/null
echo "  ✓ $PRINT_PNG"

# --- INSTAGRAM 1080x1080 (PNG) ---
IG_HTML="$(pwd)/instagram/${OPT}.html"
IG_PNG="$(pwd)/exports/${OPT}-instagram-1080.png"
echo "→ Rendering INSTA  $IG_HTML"
"$CHROME" \
  --headless=new \
  --disable-gpu \
  --hide-scrollbars \
  --window-size=1080,1080 \
  --default-background-color=00000000 \
  --virtual-time-budget=15000 \
  --run-all-compositor-stages-before-draw \
  --screenshot="$IG_PNG" \
  "file://${IG_HTML}" 2>/dev/null
echo "  ✓ $IG_PNG"

echo ""
echo "Done. Exports in: $(pwd)/exports"
ls -lh exports/ | tail -n +2
