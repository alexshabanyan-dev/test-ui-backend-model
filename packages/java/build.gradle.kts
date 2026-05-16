plugins {
    java
    `maven-publish`
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
    implementation("com.fasterxml.jackson.core:jackson-databind:2.17.3")
    implementation("com.fasterxml.jackson.datatype:jackson-datatype-jsr310:2.17.3")
}

val schemaFile = file("../../schema/MasterServiceMeta.json")
val quicktypeOutDir = layout.buildDirectory.dir("generated-sources/quicktype")

tasks.register<Exec>("quicktypeGenerate") {
    group = "build"
    description = "Generate Java types from SSOT schema (quicktype, Jackson)"

    val outDir = quicktypeOutDir.get().asFile
    val quicktypeBin =
        file("../ts/node_modules/.bin/quicktype").takeIf { it.exists() }
            ?: error(
                "quicktype not found. Install TS deps first: make deps-ts " +
                    "(or cd packages/ts && npm install)",
            )

    inputs.file(schemaFile)
    outputs.dir(outDir)

    doFirst {
        outDir.deleteRecursively()
        outDir.mkdirs()
    }

    val outFile = outDir.resolve("MasterServiceMeta.java")

    commandLine(
        quicktypeBin.absolutePath,
        "--src-lang",
        "schema",
        "--lang",
        "java",
        "--package",
        "com.example.metamodel",
        "-o",
        outFile.absolutePath,
        schemaFile.absolutePath,
    )
}

tasks.named<JavaCompile>("compileJava") {
    dependsOn("quicktypeGenerate")
}

sourceSets {
    main {
        java {
            srcDir(quicktypeOutDir)
        }
        resources {
            srcDir("../../schema")
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
