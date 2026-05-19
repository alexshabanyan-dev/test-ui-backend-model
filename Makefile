# Schema-first contract repo: Make orchestrates Node (TS) + Gradle (Java).
# Node/npm only under packages/ts (TS codegen). Java — jsonschema2pojo (Gradle plugin).

ROOT := $(abspath $(dir $(lastword $(MAKEFILE_LIST))))
TS_PKG := $(ROOT)/packages/ts
JAVA_PKG := $(ROOT)/packages/java
.DEFAULT_GOAL := help

.PHONY: help deps-ts codegen build build-ts build-java clean publish publish-ts publish-java pack-ts

# Optional for CI publish: make publish RELEASE_VERSION=0.1.1
RELEASE_VERSION ?=

help:
	@echo "Targets:"
	@echo "  make deps-ts     npm ci in packages/ts (typescript + codegen)"
	@echo "  make codegen     generate TS from schema (requires deps-ts)"
	@echo "  make build       codegen + tsc + gradle build (ts and java in parallel)"
	@echo "  make build-ts    codegen + tsc"
	@echo "  make build-java  ./gradlew build (jsonschema2pojo jackson3 → Java)"
	@echo "  make publish-ts  build-ts + npm publish (packages/ts)"
	@echo "  make publish-java build-java + ./gradlew publish"
	@echo "  make publish     publish-ts and publish-java"
	@echo "  RELEASE_VERSION=0.1.1 make publish  bump npm + maven version before publish"
	@echo "  make pack-ts     build-ts + npm pack"
	@echo "  make clean       remove build outputs"

deps-ts:
	@if [ -f "$(TS_PKG)/package-lock.json" ]; then \
		cd "$(TS_PKG)" && npm ci; \
	else \
		echo "No packages/ts/package-lock.json — run: cd packages/ts && npm install"; \
		cd "$(TS_PKG)" && npm install; \
	fi

codegen: deps-ts
	cd "$(TS_PKG)" && node scripts/codegen.mjs

build-ts: codegen
	cd "$(TS_PKG)" && npm run build

build-java:
	cd "$(JAVA_PKG)" && ./gradlew build

build: codegen
	$(MAKE) --no-print-directory -j2 _build-ts _build-java

_build-ts:
	cd "$(TS_PKG)" && npm run build

# deps-ts already ran in codegen; do not npm ci here (races with _build-ts)
_build-java:
	cd "$(JAVA_PKG)" && ./gradlew build

clean:
	rm -rf "$(TS_PKG)/dist" "$(JAVA_PKG)/build" "$(JAVA_PKG)/.gradle"

pack-ts: build-ts
	cd "$(TS_PKG)" && npm pack

publish-ts: build-ts
ifdef RELEASE_VERSION
	cd "$(TS_PKG)" && npm version "$(RELEASE_VERSION)" --no-git-tag-version --allow-same-version
endif
	cd "$(TS_PKG)" && npm publish --userconfig="$(ROOT)/.npmrc"

publish-java: build-java
	cd "$(JAVA_PKG)" && ./gradlew publish $(if $(RELEASE_VERSION),-PreleaseVersion=$(RELEASE_VERSION),)

publish: publish-ts publish-java
