import { writeFileSync, mkdirSync, copyFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { compileFromFile } from 'json-schema-to-typescript'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pkgRoot = join(__dirname, '..')
const repoRoot = join(pkgRoot, '../..')
const schemaPath = join(repoRoot, 'schema', 'model.schema.json')
const outDir = join(pkgRoot, 'src', 'generated')
const outFile = join(outDir, 'model.ts')

mkdirSync(outDir, { recursive: true })

const banner =
    '/* eslint-disable */\n/** Auto-generated from schema/model.schema.json — do not edit. */\n\n'

const ts = await compileFromFile(schemaPath, {
    bannerComment: banner,
    additionalProperties: false,
    cwd: join(repoRoot, 'schema'),
})

writeFileSync(outFile, ts, 'utf8')
console.log(`Wrote ${outFile}`)

const schemaDestDir = join(pkgRoot, 'schema')
const schemaDest = join(schemaDestDir, 'model.schema.json')
mkdirSync(schemaDestDir, { recursive: true })
copyFileSync(schemaPath, schemaDest)
console.log(`Copied schema → ${schemaDest}`)
