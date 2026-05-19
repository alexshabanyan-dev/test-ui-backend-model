plugins {
    java
    `maven-publish`
    id("io.spring.dependency-management") version "1.1.7"
    id("org.jsonschema2pojo") version "1.3.3"
}

dependencyManagement {
    imports {
        mavenBom("org.springframework.boot:spring-boot-dependencies:4.0.6")
    }
}

group = "com.example"
version =
    findProperty("releaseVersion")?.toString()?.takeIf { it.isNotBlank() } ?: "0.1.0"

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(21))
    }
}

repositories {
    mavenCentral()
}

dependencies {
    // Jackson 3 (Spring Boot 4). @JsonProperty — com.fasterxml.jackson.annotation.
    compileOnly("tools.jackson.core:jackson-databind")
    compileOnly("com.fasterxml.jackson.core:jackson-annotations")
}

val schemaDir = file("../../schema")

// Kotlin DSL: setSource() (не `source =` — конфликт с Gradle), enum для стиля/типа
jsonSchema2Pojo {
    setSource(files(schemaDir))
    targetDirectory = layout.buildDirectory.dir("generated-sources/jsonschema2pojo").get().asFile
    targetPackage = "com.example.metamodel"
    setAnnotationStyle("jackson3")
    setSourceType("jsonschema")
    removeOldOutput = true
    includeHashcodeAndEquals = false
    includeToString = false
    setIncludeAdditionalProperties(false)
}

sourceSets {
    main {
        resources {
            srcDir(schemaDir)
            include("MasterServiceMeta.json")
        }
    }
}

tasks.named<Jar>("jar") {
    archiveBaseName.set("ui-backend-model")
    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
}

publishing {
    publications {
        create<MavenPublication>("maven") {
            from(components["java"])
            groupId = project.group.toString()
            artifactId = "ui-backend-model"
            version = project.version.toString()
        }
    }
    repositories {
        maven {
            name = "nexus"
            val repoName =
                findProperty("nexusMavenRepository")?.toString()
                    ?: System.getenv("NEXUS_MAVEN_REPOSITORY")
                    ?: "maven-releases"
            url = uri(
                findProperty("nexusUrl")?.toString()
                    ?: System.getenv("NEXUS_MAVEN_URL")
                    ?: "http://2.26.86.191:8081/repository/$repoName/",
            )
            isAllowInsecureProtocol = url.scheme == "http"
            credentials {
                username =
                    findProperty("nexusUsername")?.toString()
                        ?: System.getenv("NEXUS_USERNAME")
                        ?: ""
                password =
                    findProperty("nexusPassword")?.toString()
                        ?: System.getenv("NEXUS_PASSWORD")
                        ?: ""
            }
        }
    }
}
