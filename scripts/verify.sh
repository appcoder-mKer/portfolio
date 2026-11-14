#!/usr/bin/env bash
# Run the full toolchain in a local-disk mirror. iCloud (Desktop) makes node_modules reads block,
# so typecheck/lint/test/build run against /private/tmp/portfolio instead. Nothing is copied back.
set -euo pipefail
SRC="$(cd "$(dirname "$0")/.." && pwd)"
DST=/private/tmp/portfolio
mkdir -p "$DST"
rsync -a --delete \
  --exclude '.git' --exclude 'node_modules*' --exclude '.next*' --exclude '.env.local' \
  --exclude '.claude*' --exclude '.swarm' --exclude '.agents' --exclude '.vercel' \
  "$SRC/" "$DST/"
cd "$DST"
if [ ! -d node_modules ] || ! cmp -s package-lock.json node_modules/.package-lock.json 2>/dev/null; then
  npm ci --no-audit --no-fund
fi
echo "== typecheck"; npx tsc --noEmit
echo "== lint";      npx eslint .
if [ -f vitest.config.ts ]; then echo "== test"; npx vitest run; fi
echo "== build";     npx next build
echo "VERIFY OK"
