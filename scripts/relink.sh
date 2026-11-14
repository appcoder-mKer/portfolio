#!/usr/bin/env bash
# Re-create the iCloud-safe symlinks after `npm install` (npm replaces the node_modules symlink
# with a real directory, leaving node_modules.nosync stale). Run: npm run relink
set -euo pipefail
cd "$(dirname "$0")/.."
for d in node_modules .next; do
  if [ -d "$d" ] && [ ! -L "$d" ]; then
    rm -rf "$d.nosync"
    mv "$d" "$d.nosync"
    ln -s "$d.nosync" "$d"
    echo "relinked $d -> $d.nosync"
  elif [ ! -e "$d" ]; then
    mkdir -p "$d.nosync"
    ln -s "$d.nosync" "$d"
    echo "created $d -> $d.nosync"
  fi
done
