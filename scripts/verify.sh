#!/usr/bin/env bash
# Full toolchain from a clean build state, mirroring CI: typegen → typecheck → lint → test → build.
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf .next/types .next/dev/types next-env.d.ts   # regenerate types from scratch, like CI, without killing a running dev server
echo "== typegen";   npx next typegen
echo "== typecheck"; npx tsc --noEmit
echo "== lint";      npx eslint .
if [ -f vitest.config.ts ]; then echo "== test"; npx vitest run; fi
echo "== build";     npx next build
echo "VERIFY OK"
