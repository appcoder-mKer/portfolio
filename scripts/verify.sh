#!/usr/bin/env bash
# Full toolchain from a clean build state, mirroring CI: typegen → typecheck → lint → test → build.
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf .next next-env.d.ts
echo "== typegen";   npx next typegen
echo "== typecheck"; npx tsc --noEmit
echo "== lint";      npx eslint .
if [ -f vitest.config.ts ]; then echo "== test"; npx vitest run; fi
echo "== build";     npx next build
echo "VERIFY OK"
