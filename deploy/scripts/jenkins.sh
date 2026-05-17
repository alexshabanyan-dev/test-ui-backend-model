#!/usr/bin/env bash
# Jenkins entrypoint: build or publish from repo root.
#
# Build (default):
#   bash deploy/scripts/jenkins.sh build
#
# Publish (credentials from Jenkins Credentials Binding):
#   NEXUS_NPM_TOKEN, NEXUS_USERNAME, NEXUS_PASSWORD
#   optional: RELEASE_VERSION=0.1.1
#   bash deploy/scripts/jenkins.sh publish

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

MODE="${1:-build}"
NEXUS_HOST="${NEXUS_HOST:-2.27.22.23:8081}"

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
    : "${NEXUS_NPM_TOKEN:?Set NEXUS_NPM_TOKEN (Jenkins secret text)}"
    : "${NEXUS_USERNAME:?Set NEXUS_USERNAME}"
    : "${NEXUS_PASSWORD:?Set NEXUS_PASSWORD}"

    cat > "${ROOT}/.npmrc" <<EOF
@example:registry=http://${NEXUS_HOST}/repository/npm-hosted/
//${NEXUS_HOST}/repository/npm-hosted/:_authToken=${NEXUS_NPM_TOKEN}
EOF

    if [[ -n "${RELEASE_VERSION:-}" ]]; then
      echo "=== publish with RELEASE_VERSION=${RELEASE_VERSION} ==="
      make publish RELEASE_VERSION="${RELEASE_VERSION}"
    else
      echo "=== publish (versions from package.json / build.gradle) ==="
      make publish
    fi
    ;;
  *)
    echo "Usage: $0 build|publish" >&2
    exit 1
    ;;
esac
