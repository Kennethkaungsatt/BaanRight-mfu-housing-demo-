#!/usr/bin/env bash
# Rebuild slides/demo-slides.pdf from slides/demo-slides.html.
# Uses a locally installed Chrome-family browser in headless mode.
# Usage:  ./slides/generate-pdf.sh
set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
html="$here/demo-slides.html"
pdf="$here/demo-slides.pdf"

browser=""
for candidate in \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "/Applications/Google Chrome 2.app/Contents/MacOS/Google Chrome" \
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser" \
  "/Applications/Chromium.app/Contents/MacOS/Chromium" \
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"
do
  if [ -x "$candidate" ]; then browser="$candidate"; break; fi
done

if [ -z "$browser" ]; then
  echo "No Chrome/Brave/Chromium found. Open demo-slides.html and use File > Print > Save as PDF." >&2
  exit 1
fi

profile="$(mktemp -d)"
trap 'rm -rf "$profile"' EXIT

"$browser" \
  --headless=new --disable-gpu --no-first-run --no-pdf-header-footer \
  --user-data-dir="$profile" \
  --print-to-pdf="$pdf" \
  "file://$html" >/dev/null 2>&1

if [ -s "$pdf" ]; then
  echo "wrote $pdf ($(wc -c < "$pdf" | tr -d ' ') bytes)"
else
  echo "PDF was not produced; print from the browser instead." >&2
  exit 1
fi
