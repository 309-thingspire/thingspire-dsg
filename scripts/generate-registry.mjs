#!/usr/bin/env node
/* Generates static registry JSON files in public/r/.
 *
 * Runs as a postbuild step so the deployed site can serve registry content
 * statically (no need to spin up a Node runtime for the API endpoints).
 *
 * Output:
 *   public/r/index.json        — { items: [{ slug, label, category, ... }] }
 *   public/r/<slug>.json       — full registry item with files[]
 *   public/r/tokens.css        — copy of styles/tokens.css
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

const CATALOG_PATH = path.join(ROOT, 'components', 'catalog.json')
const COMPONENTS_DIR = path.join(ROOT, 'components')
const TOKENS_SRC = path.join(ROOT, 'styles', 'tokens.css')
const OUT_DIR = path.join(ROOT, 'public', 'r')

const CATEGORY_ORDER = ['atoms', 'molecules', 'organisms']

const FILE_CANDIDATES = [
  { suffix: '.tsx', type: 'component', outExt: '.tsx' },
  { suffix: '.types.ts', type: 'types', outExt: '.types.ts' },
  { suffix: '.preview.tsx', type: 'preview', outExt: '.preview.tsx' },
  { suffix: '.docs.md', type: 'docs', outExt: '.docs.md' },
]

async function readIfExists(p) {
  try {
    return await fs.readFile(p, 'utf-8')
  } catch {
    return null
  }
}

async function readSpec(folder) {
  const specPath = path.join(COMPONENTS_DIR, folder, 'component-spec.json')
  const raw = await readIfExists(specPath)
  if (!raw) return null
  return raw
}

async function buildItem(entry, category) {
  const dir = path.join(COMPONENTS_DIR, entry.folder)
  const files = []
  for (const candidate of FILE_CANDIDATES) {
    const src = path.join(dir, `${entry.folder}${candidate.suffix}`)
    const content = await readIfExists(src)
    if (content !== null) {
      files.push({
        path: `components/${entry.slug}/${entry.slug}${candidate.outExt}`,
        type: candidate.type,
        content,
      })
    }
  }
  const specRaw = await readSpec(entry.folder)
  if (specRaw !== null) {
    files.push({
      path: `components/${entry.slug}/${entry.slug}.spec.json`,
      type: 'spec',
      content: specRaw,
    })
  }

  // Bundle the full generated icon set when packaging the "icons" entry.
  if (entry.slug === 'icons') {
    const iconsDir = path.join(COMPONENTS_DIR, 'icons')
    let names = []
    try {
      names = await fs.readdir(iconsDir)
    } catch {
      names = []
    }
    for (const name of names.sort()) {
      const isIcon = name.startsWith('icon-') && name.endsWith('.tsx')
      const isMeta = name === 'index.ts' || name === 'types.ts'
      if (!isIcon && !isMeta) continue
      const content = await readIfExists(path.join(iconsDir, name))
      if (content !== null) {
        files.push({
          path: `components/icons/${name}`,
          type: isIcon ? 'component' : 'types',
          content,
        })
      }
    }
  }

  return {
    name: entry.label,
    slug: entry.slug,
    category,
    label: entry.label,
    description: entry.description,
    files,
    dependencies: ['react'],
    registryDependencies: [],
  }
}

async function main() {
  const catalogRaw = await fs.readFile(CATALOG_PATH, 'utf-8')
  const catalog = JSON.parse(catalogRaw)

  await fs.mkdir(OUT_DIR, { recursive: true })

  const indexItems = []
  for (const category of CATEGORY_ORDER) {
    const entries = catalog[category] ?? []
    for (const entry of entries) {
      const item = await buildItem(entry, category)
      const outPath = path.join(OUT_DIR, `${entry.slug}.json`)
      await fs.writeFile(outPath, JSON.stringify(item, null, 2), 'utf-8')
      indexItems.push({
        slug: entry.slug,
        name: entry.label,
        label: entry.label,
        category,
        description: entry.description,
      })
    }
  }

  await fs.writeFile(
    path.join(OUT_DIR, 'index.json'),
    JSON.stringify({ items: indexItems }, null, 2),
    'utf-8',
  )

  // copy tokens.css
  const tokens = await readIfExists(TOKENS_SRC)
  if (tokens !== null) {
    await fs.writeFile(path.join(OUT_DIR, 'tokens.css'), tokens, 'utf-8')
  }

  // Mirror component-local assets/ folders to public/components/<X>/assets/
  // so the existing `<img src="/components/<X>/assets/foo.svg">` references
  // in component code resolve when served by Next.js.
  const PUBLIC_COMPONENTS_DIR = path.join(ROOT, 'public', 'components')
  let mirrored = 0
  for (const dirent of await fs.readdir(COMPONENTS_DIR, { withFileTypes: true })) {
    if (!dirent.isDirectory()) continue
    const folder = dirent.name
    const srcAssets = path.join(COMPONENTS_DIR, folder, 'assets')
    try {
      const stat = await fs.stat(srcAssets)
      if (!stat.isDirectory()) continue
    } catch {
      continue
    }
    const destAssets = path.join(PUBLIC_COMPONENTS_DIR, folder, 'assets')
    await fs.mkdir(destAssets, { recursive: true })
    for (const f of await fs.readdir(srcAssets)) {
      await fs.copyFile(path.join(srcAssets, f), path.join(destAssets, f))
      mirrored++
    }
  }

  console.log(
    `✓ Wrote ${indexItems.length} components to ${path.relative(ROOT, OUT_DIR)}; mirrored ${mirrored} component asset files to public/components/`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
