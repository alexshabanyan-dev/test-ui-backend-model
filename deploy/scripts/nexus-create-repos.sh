#!/usr/bin/env bash
# Creates npm-hosted + maven-releases in Nexus (idempotent-ish).
# Usage:
#   export NEXUS_URL=http://2.26.86.191:8081
#   export NEXUS_USER=admin
#   export NEXUS_PASSWORD='your-password'
#   ./scripts/nexus-create-repos.sh

set -euo pipefail

NEXUS_URL="${NEXUS_URL:-http://127.0.0.1:8081}"
NEXUS_USER="${NEXUS_USER:-admin}"
NEXUS_PASSWORD="${NEXUS_PASSWORD:?Set NEXUS_PASSWORD}"

auth=(-u "${NEXUS_USER}:${NEXUS_PASSWORD}")
api="${NEXUS_URL}/service/rest/v1"

echo "Nexus: ${NEXUS_URL}"

create_repo() {
  local name="$1"
  local body="$2"
  if curl -sf "${auth[@]}" "${api}/repositories/${name}" >/dev/null 2>&1; then
    echo "  repo exists: ${name}"
    return 0
  fi
  curl -sf "${auth[@]}" -X POST "${api}/repositories/${2:-hosted}" \
    -H "Content-Type: application/json" \
    -d "${body}" >/dev/null
  echo "  created: ${name}"
}

# npm hosted
create_repo "npm-hosted" "npm/hosted" "$(cat <<'JSON'
{
  "name": "npm-hosted",
  "online": true,
  "storage": {
    "blobStoreName": "default",
    "strictContentTypeValidation": true,
    "writePolicy": "ALLOW_ONCE"
  }
}
JSON
)"

# maven releases (hosted)
create_repo "maven-releases" "maven/hosted" "$(cat <<'JSON'
{
  "name": "maven-releases",
  "online": true,
  "storage": {
    "blobStoreName": "default",
    "strictContentTypeValidation": true,
    "writePolicy": "ALLOW_ONCE"
  },
  "maven": {
    "versionPolicy": "RELEASE",
    "layoutPolicy": "STRICT"
  }
}
JSON
)"

echo "Done. Browse:"
echo "  ${NEXUS_URL}/#browse/browse:npm-hosted"
echo "  ${NEXUS_URL}/#browse/browse:maven-releases"
