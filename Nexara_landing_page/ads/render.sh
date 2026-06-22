#!/usr/bin/env bash
# Render Nexara ad HTML posters to high-res PNG via headless Google Chrome.
# Usage: render.sh post-01-payer [post-02-... ...]   (no .html extension)
set -euo pipefail
export _ZO_DOCTOR=0

ADS="$(cd "$(dirname "$0")" && pwd)"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
mkdir -p "$ADS/out"

# Read poster dimensions from the file's data-w/data-h, default 1080x1080.
for name in "$@"; do
  html="$ADS/${name}.html"
  [ -f "$html" ] || { echo "MISSING: $html"; exit 1; }
  W=$(grep -oE 'data-w="[0-9]+"' "$html" | grep -oE '[0-9]+' | head -1 || true); W=${W:-1080}
  H=$(grep -oE 'data-h="[0-9]+"' "$html" | grep -oE '[0-9]+' | head -1 || true); H=${H:-1080}
  UDD=$(mktemp -d)
  "$CHROME" --headless=new --no-first-run --no-default-browser-check --disable-extensions \
    --hide-scrollbars --force-device-scale-factor=2 --window-size="${W},${H}" \
    --virtual-time-budget=7000 --user-data-dir="$UDD" \
    --screenshot="$ADS/out/${name}.png" "file://$html" >/dev/null 2>&1 || true
  rm -rf "$UDD"
  if [ -f "$ADS/out/${name}.png" ]; then
    echo "OK  ${name}.png  ($(du -h "$ADS/out/${name}.png" | cut -f1), ${W}x${H}@2x)"
  else
    echo "FAIL ${name}"
  fi
done
