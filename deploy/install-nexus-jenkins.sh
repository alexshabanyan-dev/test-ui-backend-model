#!/usr/bin/env bash
# Native install: Sonatype Nexus 3 + Jenkins (Debian/Ubuntu).
# Run on the server as root: bash install-nexus-jenkins.sh
#
# After install:
#   Nexus:   http://SERVER_IP:8081  (admin password in sonatype-work)
#   Jenkins: http://SERVER_IP:8080  (initial password in /var/lib/jenkins/...)

set -euo pipefail

NEXUS_VERSION="${NEXUS_VERSION:-3.77.2-02}"
JAVA_PKG="${JAVA_PKG:-openjdk-17-jdk}"
NEXUS_HOME="/opt/nexus"
NEXUS_DATA="/opt/sonatype-work"
JENKINS_PORT="${JENKINS_PORT:-8080}"
NEXUS_PORT="${NEXUS_PORT:-8081}"

if [[ "${EUID:-}" -ne 0 ]]; then
  echo "Run as root: sudo bash $0"
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive

echo "==> Packages"
apt-get update -qq
apt-get install -y -qq curl wget tar gnupg2 apt-transport-https ca-certificates "${JAVA_PKG}"

echo "==> Nexus user + directories"
if ! id nexus &>/dev/null; then
  useradd --system --user-group --home-dir "${NEXUS_HOME}" nexus
fi
mkdir -p "${NEXUS_HOME}" "${NEXUS_DATA}"
chown -R nexus:nexus "${NEXUS_HOME}" "${NEXUS_DATA}"

if [[ ! -f "${NEXUS_HOME}/bin/nexus" ]]; then
  echo "==> Download Nexus ${NEXUS_VERSION}"
  tmp="$(mktemp -d)"
  cd "${tmp}"
  wget -q "https://download.sonatype.com/nexus/3/nexus-${NEXUS_VERSION}-unix.tar.gz" -O nexus.tar.gz
  tar -xzf nexus.tar.gz
  # archive extracts to nexus-3.x.y-zz/
  extracted="$(find . -maxdepth 1 -type d -name 'nexus-*' | head -1)"
  rsync -a "${extracted}/" "${NEXUS_HOME}/"
  rm -rf "${tmp}"
  chown -R nexus:nexus "${NEXUS_HOME}"
fi

echo "==> Nexus run as nexus user"
install -o nexus -g nexus -m 0644 /dev/null "${NEXUS_HOME}/bin/nexus.rc" 2>/dev/null || true
echo 'run_as_user="nexus"' >"${NEXUS_HOME}/bin/nexus.rc"
chown nexus:nexus "${NEXUS_HOME}/bin/nexus.rc"

# Optional: limit memory (adjust for your VM)
vmoptions="${NEXUS_HOME}/bin/nexus.vmoptions"
if ! grep -q '^-Xms' "${vmoptions}" 2>/dev/null; then
  cat >>"${vmoptions}" <<'EOF'
-Xms1024m
-Xmx1024m
EOF
fi

echo "==> systemd: nexus"
cat >/etc/systemd/system/nexus.service <<EOF
[Unit]
Description=Sonatype Nexus Repository Manager
After=network.target

[Service]
Type=forking
LimitNOFILE=65536
User=nexus
Group=nexus
Environment="JAVA_HOME=$(dirname "$(dirname "$(readlink -f "$(command -v java)")")")"
Environment="INSTALL4J_ADD_VM_PARAMS=-Djava.io.tmpdir=${NEXUS_DATA}/tmp"
ExecStart=${NEXUS_HOME}/bin/nexus start
ExecStop=${NEXUS_HOME}/bin/nexus stop
Restart=on-abort
TimeoutStartSec=600

[Install]
WantedBy=multi-user.target
EOF

if [[ ! -f /etc/apt/sources.list.d/jenkins.list ]]; then
  echo "==> Jenkins apt repository"
  curl -fsSL https://pkg.jenkins.io/debian/jenkins.io-2023.key | tee /usr/share/keyrings/jenkins-keyring.asc >/dev/null
  echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian binary/" \
    >/etc/apt/sources.list.d/jenkins.list
  apt-get update -qq
fi

echo "==> Jenkins package"
apt-get install -y -qq jenkins

# Jenkins also needs Java 17+
if [[ -d /usr/lib/jvm/java-17-openjdk-amd64 ]]; then
  echo 'JAVA_HOME="/usr/lib/jvm/java-17-openjdk-amd64"' >/etc/default/jenkins
fi

mkdir -p /etc/systemd/system/jenkins.service.d
cat >/etc/systemd/system/jenkins.service.d/override.conf <<EOF
[Service]
Environment="JENKINS_PORT=${JENKINS_PORT}"
EOF

echo "==> Enable services"
systemctl daemon-reload
systemctl enable nexus jenkins
systemctl restart nexus jenkins

echo ""
echo "=============================================="
echo " Done."
echo " Nexus:   http://$(hostname -I | awk '{print $1}'):${NEXUS_PORT}"
echo " Jenkins: http://$(hostname -I | awk '{print $1}'):${JENKINS_PORT}"
echo ""
echo " Nexus admin password (first start, wait ~2 min):"
echo "   cat ${NEXUS_DATA}/nexus3/admin.password"
echo ""
echo " Jenkins initial admin password:"
echo "   cat /var/lib/jenkins/secrets/initialAdminPassword"
echo ""
echo " Firewall (if ufw):"
echo "   ufw allow ${NEXUS_PORT}/tcp"
echo "   ufw allow ${JENKINS_PORT}/tcp"
echo "=============================================="
