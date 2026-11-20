#!/usr/bin/env bash
# Add a poster to the site, or replace one that is already there.
#
#   scripts/add_poster.sh <poster.pdf> <slug>
#   e.g. scripts/add_poster.sh ~/Downloads/ribofold.pdf cucai-2025
#
# The slug becomes the link:
#   https://yoyoliuuu.github.io/posters/<slug>/           page showing the poster
#   https://yoyoliuuu.github.io/files/posters/<slug>.pdf  the PDF itself
#
# It copies the PDF to files/posters/<slug>.pdf, renders the two preview images
# next to it, and creates _posters/<slug>.md for you to fill in. Running it again
# with the same slug swaps in a new PDF and leaves the .md alone.
set -euo pipefail

if [ $# -ne 2 ]; then
  echo "usage: $0 <poster.pdf> <slug>" >&2
  exit 1
fi
pdf=$1
slug=$2

if [[ ! $slug =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
  echo "slug must be lowercase letters, digits and hyphens (got: $slug)" >&2
  exit 1
fi
if [ ! -f "$pdf" ]; then
  echo "no such file: $pdf" >&2
  exit 1
fi
if ! command -v pdftoppm >/dev/null || ! command -v pdfinfo >/dev/null; then
  echo "needs pdftoppm and pdfinfo (sudo apt install poppler-utils)" >&2
  exit 1
fi

root=$(cd "$(dirname "$0")/.." && pwd)
out=$root/files/posters
page=$root/_posters/$slug.md
mkdir -p "$out" "$root/_posters"

if [ ! "$pdf" -ef "$out/$slug.pdf" ]; then
  install -m 644 "$pdf" "$out/$slug.pdf"
fi

# full-size preview for the poster page, small one for the list
pdftoppm -jpeg -jpegopt quality=85 -scale-to 2400 -singlefile "$out/$slug.pdf" "$out/$slug"
pdftoppm -jpeg -jpegopt quality=80 -scale-to 800 -singlefile "$out/$slug.pdf" "$out/$slug-thumb"

read -r width height < <(pdfinfo "$out/$slug.pdf" | awk '/^Page size:/ { print $3, $5; exit }')
if awk -v w="$width" -v h="$height" 'BEGIN { exit !(h > w) }'; then
  orientation=portrait
else
  orientation=landscape
fi

if [ -f "$page" ]; then
  echo "replaced files/posters/$slug.pdf (kept _posters/$slug.md)"
else
  cat > "$page" <<EOF
---
title: "TODO: poster title"
venue: "TODO: conference or workshop"
location:               # optional, e.g. "Sydney"
presented: 2026-01-01   # used for the date shown and for ordering
authors: "<strong>Yimeng Liu</strong>"
note:                   # optional, e.g. "* equal contribution"
orientation: $orientation
---
EOF
  echo "created _posters/$slug.md -- fill in the title, venue, date and authors"
fi
echo "link: https://yoyoliuuu.github.io/posters/$slug/"
