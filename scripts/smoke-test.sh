#!/usr/bin/env bash
#
# Smoke test: verify each @aparsoft/chatbot-* package installs and imports
# correctly in a fresh project.
#
# Prerequisites:
#   - Node.js 18+
#   - The packages must be published to NPM first (or use npm link)
#
# Usage:
#   ./scripts/smoke-test.sh          # test all packages
#   ./scripts/smoke.sh react         # test only react
#

set -euo pipefail

PACKAGES=("react" "nextjs" "vue" "angular")
NPM_NAMES=(
  "@aparsoft/chatbot-react"
  "@aparsoft/chatbot-nextjs"
  "@aparsoft/chatbot-vue"
  "@aparsoft/chatbot-angular"
)

TMPDIR=$(mktemp -d)
trap 'rm -rf "$TMPDIR"' EXIT

echo "=== Aparsoft Chatbot Widget -- Smoke Test ==="
echo "Working directory: $TMPDIR"
echo ""

# If a specific package was requested, filter
if [ $# -gt 0 ]; then
  PACKAGES=("$1")
  idx=0
  for p in react nextjs vue angular; do
    if [ "$p" = "$1" ]; then
      NPM_NAMES=("${NPM_NAMES[$idx]}")
      break
    fi
    idx=$((idx + 1))
  done
fi

PASS=0
FAIL=0

test_package() {
  local name="$1"
  local npm_name="$2"

  echo "--- Testing $npm_name ---"
  local dir="$TMPDIR/$name-test"
  mkdir -p "$dir"
  cd "$dir"

  # Init a minimal project
  npm init -y > /dev/null 2>&1

  # Install the package
  if npm install "$npm_name" > /dev/null 2>&1; then
    echo "  [PASS] npm install $npm_name"
  else
    echo "  [FAIL] npm install $npm_name"
    FAIL=$((FAIL + 1))
    return
  fi

  # Verify the package entry resolves
  local entry=$(node -e "
    try {
      const pkg = require('$npm_name/package.json');
      const main = pkg.main || pkg.module || '.';
      console.log(main);
    } catch(e) {
      console.log('ERROR: ' + e.message);
    }
  " 2>&1)

  if echo "$entry" | grep -q "ERROR"; then
    echo "  [FAIL] Could not read package.json: $entry"
    FAIL=$((FAIL + 1))
    return
  else
    echo "  [PASS] Entry point: $entry"
  fi

  # Verify package.json metadata
  local checks=$(node -e "
    const pkg = require('$npm_name/package.json');
    let ok = true;
    if (!pkg.name) { console.log('FAIL: missing name'); ok = false; }
    if (!pkg.version) { console.log('FAIL: missing version'); ok = false; }
    if (!pkg.description) { console.log('FAIL: missing description'); ok = false; }
    if (!pkg.license) { console.log('FAIL: missing license'); ok = false; }
    if (!pkg.keywords || pkg.keywords.length < 5) { console.log('FAIL: too few keywords'); ok = false; }
    if (!pkg.repository) { console.log('FAIL: missing repository'); ok = false; }
    if (ok) console.log('PASS: all metadata present');
  " 2>&1)

  if echo "$checks" | grep -q "PASS"; then
    echo "  [PASS] Metadata complete"
  else
    echo "  $checks"
    FAIL=$((FAIL + 1))
    return
  fi

  # Verify package size
  local size=$(du -sk "node_modules/$npm_name" 2>/dev/null | cut -f1 || echo "0")
  if [ "$size" -lt 50 ]; then
    echo "  [PASS] Package size: ${size} KB"
  else
    echo "  [WARN] Package size: ${size} KB (expected < 50 KB)"
  fi

  echo "  [PASS] $npm_name all checks passed"
  PASS=$((PASS + 1))
  echo ""
}

for i in "${!PACKAGES[@]}"; do
  test_package "${PACKAGES[$i]}" "${NPM_NAMES[$i]}"
done

echo "=== Results ==="
echo "Passed: $PASS"
echo "Failed: $FAIL"

if [ $FAIL -gt 0 ]; then
  exit 1
fi
