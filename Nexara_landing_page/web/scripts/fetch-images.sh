#!/usr/bin/env bash
# Source real stock photography for the Nexara landing page.
# Authentic Indian healthcare/clinic/pharmacy/patient imagery, documentary tone.
# Photos are desaturated + given a faint mint-50 duotone in CSS (.nx-photo) — NOT baked in.
#
# Usage:
#   export UNSPLASH_KEY="YOUR_ACCESS_KEY"   # https://unsplash.com/developers
#   bash scripts/fetch-images.sh
#
# Falls back to Pexels if PEXELS_KEY is set instead.
set -euo pipefail
OUT="public/images"
mkdir -p "$OUT"

QUERIES=(
  "indian doctor patient consultation clinic"
  "indian pharmacy pharmacist medicine"
  "indian hospital reception waiting"
  "elderly indian patient care home"
  "healthcare worker tablet records india"
)

for q in "${QUERIES[@]}"; do
  slug=$(echo "$q" | tr ' ' '-')
  url=""
  if [[ -n "${UNSPLASH_KEY:-}" ]]; then
    url=$(curl -s "https://api.unsplash.com/photos/random?query=${q// /%20}&orientation=landscape&content_filter=high&client_id=$UNSPLASH_KEY" \
      | grep -o '"regular":"[^"]*' | head -1 | cut -d'"' -f4)
  elif [[ -n "${PEXELS_KEY:-}" ]]; then
    url=$(curl -s -H "Authorization: $PEXELS_KEY" \
      "https://api.pexels.com/v1/search?query=${q// /%20}&orientation=landscape&per_page=1" \
      | grep -o '"landscape":"[^"]*' | head -1 | cut -d'"' -f4)
  else
    echo "Set UNSPLASH_KEY or PEXELS_KEY first." >&2
    exit 1
  fi
  [[ -n "$url" ]] && curl -sL "$url" -o "$OUT/${slug}.jpg" && echo "saved $OUT/${slug}.jpg  ← $q"
done
