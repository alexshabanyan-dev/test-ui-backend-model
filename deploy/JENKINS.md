# Jenkins: сборка и публикация в Nexus

Сервер: [http://2.26.86.191:8080/](http://2.26.86.191:8080/)  
Репозиторий: [test-ui-backend-model](https://github.com/alexshabanyan-dev/test-ui-backend-model)  
Nexus: `http://2.26.86.191:8081`

Скрипт в репозитории: `deploy/scripts/jenkins.sh` (`build` | `publish`).

---

## 1. Credentials в Jenkins

**Manage Jenkins → Credentials → System → Global → Add Credentials**

| ID | Тип | Для чего |
|----|-----|----------|
| `nexus-user-pass` | Username with password | Maven (`NEXUS_USERNAME` / `NEXUS_PASSWORD`) |
| ~~`nexus-npm-token`~~ | не нужен | npm auth = тот же `nexus-user-pass` (base64 в скрипте) |

Токен npm: Nexus → профиль пользователя → **User Token** (или npm login один раз локально и взять token).

Права пользователя Nexus: deploy в **npm-hosted** и **maven-releases**.

---

## 2. Job: один проект с параметрами (рекомендуется)

Переименовать или настроить существующий `test-ui-backend-model-build`.

### General

- ✓ **This project is parameterized**
- **Boolean Parameter:** `DO_PUBLISH` — default `false`
- **String Parameter:** `RELEASE_VERSION` — default пусто  
  (если задан, например `0.1.1`, перед publish обновит версии npm и Maven)

### Source Code Management

- Git: `https://github.com/alexshabanyan-dev/test-ui-backend-model.git`
- Branch: `*/main`

### Build Environment

- ✓ **Provide Node & npm bin/ folder to PATH** → ваша NodeJS installation (например `nodejs24.15`)
- ✓ **Use secret text(s) or file(s)**:
  - Username and password → `NEXUS_USERNAME` / `NEXUS_PASSWORD` → `nexus-user-pass`

### Build → Execute shell

```bash
#!/bin/bash
set -euo pipefail

if [[ "${DO_PUBLISH}" == "true" ]]; then
  export RELEASE_VERSION="${RELEASE_VERSION:-}"
  bash deploy/scripts/jenkins.sh publish
else
  bash deploy/scripts/jenkins.sh build
fi
```

### Триггеры

- **Poll SCM** `H/15 * * * *` — только build (`DO_PUBLISH=false` по умолчанию)
- Publish: **Build with Parameters** → `DO_PUBLISH=true`, `RELEASE_VERSION=0.1.2`

---

## 3. Альтернатива: два отдельных job

| Job | Shell | Когда |
|-----|-------|--------|
| `test-ui-backend-model-build` | `bash deploy/scripts/jenkins.sh build` | каждый push / poll |
| `test-ui-backend-model-publish` | `bash deploy/scripts/jenkins.sh publish` | вручную, с credentials |

---

## 4. Версии в Nexus

- Без `RELEASE_VERSION` публикуются версии из `packages/ts/package.json` и Gradle (`0.1.0` по умолчанию).
- Повторный publish той же версии в npm часто даёт **409** — нужен новый `RELEASE_VERSION` или bump в git.
- С параметром: `RELEASE_VERSION=0.1.2` → `npm version` + `-PreleaseVersion=0.1.2` для Maven.

---

## 5. Проверка после publish

**Nexus UI**

- Browse → **npm-hosted** → `@example` → `ui-backend-model`
- Browse → **maven-releases** → `com/example/ui-backend-model`

**Сеть с Jenkins-хоста**

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://2.26.86.191:8081/
```

---

## 6. Частые ошибки

| Ошибка | Решение |
|--------|---------|
| `NEXUS_NPM_TOKEN is required` | credentials + binding в job |
| `401` / `403` | права пользователя Nexus, проверить token |
| npm `403 Forbidden` версия уже есть | новый `RELEASE_VERSION` |
| `make: not found` | `apt install make` на сервере |
| `set: Illegal option -o pipefail` | первая строка shell: `#!/bin/bash` |
