#!/usr/bin/env bash
# Jenkins: build or publish from repo root.
#
#   bash deploy/scripts/jenkins.sh build
#   bash deploy/scripts/jenkins.sh publish
#
# Publish needs Jenkins bindings: NEXUS_USERNAME, NEXUS_PASSWORD (nexus-user-pass)
# Optional: RELEASE_VERSION=0.1.2

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

MODE="${1:-build}"
NEXUS_HOST="${NEXUS_HOST:-2.26.86.191:8081}"

export NEXUS_MAVEN_URL="${NEXUS_MAVEN_URL:-http://${NEXUS_HOST}/repository/maven-releases/}"
export NEXUS_MAVEN_REPOSITORY="${NEXUS_MAVEN_REPOSITORY:-maven-releases}"
export NPM_CONFIG_REGISTRY="${NPM_CONFIG_REGISTRY:-http://${NEXUS_HOST}/repository/npm-hosted/}"

echo "=== toolchain ==="
node -v
npm -v
java -version 2>&1 || true
make --version

case "$MODE" in
  build)
    make build
    ;;
  publish)
    : "${NEXUS_USERNAME:?Set NEXUS_USERNAME (Jenkins nexus-user-pass)}"
    : "${NEXUS_PASSWORD:?Set NEXUS_PASSWORD (Jenkins nexus-user-pass)}"

    NEXUS_USERNAME="${NEXUS_USERNAME//$'\r'/}"
    NEXUS_PASSWORD="${NEXUS_PASSWORD//$'\r'/}"

    NPM_AUTH="$(printf '%s:%s' "${NEXUS_USERNAME}" "${NEXUS_PASSWORD}" | base64 | tr -d '\n')"

    cat > "${ROOT}/.npmrc" <<EOF
@example:registry=http://${NEXUS_HOST}/repository/npm-hosted/
//${NEXUS_HOST}/repository/npm-hosted/:_auth=${NPM_AUTH}
//${NEXUS_HOST}/repository/npm-hosted/:always-auth=true
EOF

    echo "=== npm auth check ==="
    npm whoami \
      --userconfig="${ROOT}/.npmrc" \
      --registry="http://${NEXUS_HOST}/repository/npm-hosted/" \
      --prefix="${ROOT}/packages/ts"

    cd "${ROOT}"
    if [[ -n "${RELEASE_VERSION:-}" ]]; then
      echo "=== publish RELEASE_VERSION=${RELEASE_VERSION} ==="
      make publish RELEASE_VERSION="${RELEASE_VERSION}"
    else
      echo "=== publish ==="
      make publish
    fi
    ;;
  *)
    echo "Usage: $0 build|publish" >&2
    exit 1
    ;;
esac
