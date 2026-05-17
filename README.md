# test-ui-backend-model

Тестовый monorepo: **Schema-First** контракт для UI (npm) и backend (Maven/Gradle).

## SSOT (единственный источник правды)

`schema/MasterServiceMeta.json` — JSON Schema Draft-07 (модель учёта мастер-сервиса).

Корень схемы: `name`, `header`, `footer`, `datamodel`, `businessComponents`, `routes`, `roles`, `userFlexibleAttribute`, `navigation` + большой блок `definitions`.

## Структура

```
schema/MasterServiceMeta.json  ← правим только здесь (SSOT)
packages/ts/scripts/codegen.mjs
packages/ts/
packages/java/
Makefile
```

Node/npm только в `packages/ts`. Корневого `package.json` нет.

## Локальная сборка (Make)

Первый раз (создаёт `packages/ts/package-lock.json` — закоммить в git):

```bash
cd packages/ts && npm install && cd ../..
```

Дальше:

```bash
make build          # codegen → tsc + gradle (параллельно)
```

Отдельно:

```bash
make deps-ts
make codegen
make build-ts
make build-java
make clean
```

Java **21**. Gradle toolchain может скачать JDK сам; иначе `export JAVA_HOME=$(/usr/libexec/java_home -v 21)` и `make build-java`.

Первый раз для Java (если нет `gradlew`):

```bash
cd packages/java
gradle wrapper --gradle-version 8.10.2
./gradlew build
cd ../..
```

> Схема большая (~2700 строк): первая генерация TS/Java может занять заметное время.

**Java codegen:** [quicktype](https://quicktype.io/) читает **эталон** `schema/MasterServiceMeta.json` напрямую (Jackson по умолчанию).  
Исходники: `packages/java/build/generated-sources/quicktype/`. В JAR для runtime — тот же эталон из `schema/`.  
Перед `./gradlew build` нужен `make deps-ts` (quicktype в `packages/ts/node_modules`).

## Публикация в Nexus

| Артефакт | Координаты | Repository URL |
|----------|------------|----------------|
| npm | `@example/ui-backend-model` | `http://2.26.86.191:8081/repository/npm-hosted/` |
| Maven | `com.example:ui-backend-model` | `http://2.26.86.191:8081/repository/maven-releases/` |

```bash
cp .npmrc.example .npmrc
cp packages/java/gradle.properties.example packages/java/gradle.properties
make publish
```

## Потребители

**UI:**

```ts
import type { MasterServiceMeta, MetaNode } from '@example/ui-backend-model'
import schema from '@example/ui-backend-model/schema.json'
```

**Backend:**

```java
import com.example.metamodel.MasterServiceMeta;

// ObjectMapper + JavaTimeModule для OffsetDateTime.
// После правки эталона (title + type: object в корне) пересобери Java и проверь,
// что нет union-обёртки masterServiceMetaClassValue.
```

Схема в JAR: `classpath:MasterServiceMeta.json` (эталон без изменений).
