import { copyFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const src = join(root, 'schema', 'model.schema.json')
const destDir = join(root, 'packages', 'ts', 'schema')
const dest = join(destDir, 'model.schema.json')

mkdirSync(destDir, { recursive: true })
copyFileSync(src, dest)
console.log(`Copied schema → ${dest}`)
