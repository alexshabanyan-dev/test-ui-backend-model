# test-ui-backend-model

Тестовый monorepo: **Schema-First** контракт для UI (npm) и backend (Maven/Gradle).

## SSOT (единственный источник правды)

`schema/model.schema.json` — JSON Schema Draft-07.

Модель (упрощённо):

- `RootModel` — корень (`version`, `account`)
- `Account` — `id`, `owner`, `billingAddress?`, `teams?`
- `Person`, `Address`, `Team` — в `definitions`

## Структура

```
schema/model.schema.json     ← правим только здесь
packages/ts/                 ← @example/ui-backend-model (npm)
packages/java/               ← com.example:ui-backend-model (Gradle)
tools/codegen-ts.mjs         ← JSON Schema → TypeScript
```

## Локальная сборка

```bash
# из корня репозитория
npm install
npm run build
```

Первый раз для Java (если нет `gradlew`):

```bash
cd packages/java
gradle wrapper --gradle-version 8.10.2
./gradlew build
cd ../..
```

Отдельно:

```bash
npm run build:ts    # codegen + tsc → packages/ts/dist
npm run build:java  # Gradle + jsonschema2pojo → packages/java/build
```

## Публикация в Nexus

Nexus: [npm-hosted](http://2.27.22.23:8081/#browse/browse:npm-hosted) (UI). Для CLI используй **repository URL**, не browse:

| Артефакт | Координаты | Repository URL |
|----------|------------|----------------|
| npm | `@example/ui-backend-model` | `http://2.27.22.23:8081/repository/npm-hosted/` |
| Maven | `com.example:ui-backend-model` | `http://2.27.22.23:8081/repository/maven-releases/` |

Имя Maven-репозитория проверь в Nexus → **Administration → Repositories** (часто `maven-releases` или `maven-hosted`).

### Один раз: учётные данные

```bash
cp .npmrc.example .npmrc
cp packages/java/gradle.properties.example packages/java/gradle.properties
# заполни user/password или token
```

Либо через env: `config/nexus.env.example`.

### Публикация вручную

```bash
npm install
npm run publish:ts    # → npm-hosted
npm run publish:java  # → maven-releases (нужен gradle.properties или env)
```

Версию `0.1.0` поднимать синхронно в `packages/ts/package.json` и `packages/java` (`-PreleaseVersion=0.1.1` или `releaseVersion=` в gradle.properties).

### Потребители из Nexus

**npm** — в проекте UI `.npmrc`:

```
@example:registry=http://2.27.22.23:8081/repository/npm-hosted/
```

```bash
npm install @example/ui-backend-model@0.1.0
```

**Maven/Gradle** — в `build.gradle.kts`:

```kotlin
repositories {
    maven {
        url = uri("http://2.27.22.23:8081/repository/maven-releases/")
        isAllowInsecureProtocol = true
    }
    mavenCentral()
}
dependencies {
    implementation("com.example:ui-backend-model:0.1.0")
}
```

## Jenkins (идея)

См. `Jenkinsfile.example` — credentials `nexus-npm-token`, `nexus-maven`.

## Потребители

**UI:**

```bash
npm install @example/ui-backend-model@0.1.0
```

```ts
import type { RootModel, Account } from '@example/ui-backend-model'
```

**Backend:**

```gradle
implementation("com.example:ui-backend-model:0.1.0")
```

```java
import com.example.metamodel.RootModel;
import com.example.metamodel.Account;
```

Схема в JAR: `classpath:model.schema.json` (из `src/main/resources`).
