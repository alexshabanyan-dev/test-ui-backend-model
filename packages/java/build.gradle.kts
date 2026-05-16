plugins {
    java
    `maven-publish`
    id("org.jsonschema2pojo") version "1.2.2"
}

group = "com.example"
version =
    findProperty("releaseVersion")?.toString()?.takeIf { it.isNotBlank() } ?: "0.1.0"

java {
    sourceCompatibility = JavaVersion.VERSION_21
    targetCompatibility = JavaVersion.VERSION_21
}

repositories {
    mavenCentral()
}

dependencies {
    // jsonschema2pojo defaults to Jackson annotations on generated types
    implementation("com.fasterxml.jackson.core:jackson-databind:2.17.3")
}

val schemaFile = file("../../schema/model.schema.json")

jsonSchema2Pojo {
    setSource(files(schemaFile))
    targetPackage = "com.example.metamodel"
    targetVersion = "21"
    generateBuilders = true
    includeJsr303Annotations = false
    useJakartaValidation = false
}

sourceSets {
    main {
        resources {
            srcDir("../../schema")
            include("model.schema.json")
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
                    ?: "http://2.27.22.23:8081/repository/$repoName/",
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
