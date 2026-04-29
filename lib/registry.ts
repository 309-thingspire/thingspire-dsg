import { promises as fs } from 'node:fs'
import path from 'node:path'
import { findEntryBySlug, getAllEntries, type CatalogEntryWithCategory } from './components'

export type FileType = 'component' | 'types' | 'preview' | 'docs' | 'spec'

export interface RegistryFile {
  path: string
  type: FileType
  content: string
}

export interface RegistryItem {
  name: string
  slug: string
  category: string
  label: string
  description: string
  files: RegistryFile[]
  dependencies: string[]
  registryDependencies: string[]
}

const REPO_ROOT = process.cwd()

async function readIfExists(absPath: string): Promise<string | null> {
  try {
    return await fs.readFile(absPath, 'utf-8')
  } catch {
    return null
  }
}

function buildOutputPath(slug: string, ext: string): string {
  return `components/${slug}/${slug}${ext}`
}

export async function readComponentFiles(
  entry: CatalogEntryWithCategory,
): Promise<RegistryFile[]> {
  const dir = path.join(REPO_ROOT, 'components', entry.folder)
  const candidates: Array<{ src: string; type: FileType; outExt: string }> = [
    { src: `${entry.folder}.tsx`, type: 'component', outExt: '.tsx' },
    { src: `${entry.folder}.types.ts`, type: 'types', outExt: '.types.ts' },
    { src: `${entry.folder}.preview.tsx`, type: 'preview', outExt: '.preview.tsx' },
    { src: `${entry.folder}.docs.md`, type: 'docs', outExt: '.docs.md' },
    { src: 'component-spec.json', type: 'spec', outExt: '.spec.json' },
  ]

  const files: RegistryFile[] = []
  for (const { src, type, outExt } of candidates) {
    const content = await readIfExists(path.join(dir, src))
    if (content !== null) {
      files.push({
        path: buildOutputPath(entry.slug, outExt),
        type,
        content,
      })
    }
  }
  return files
}

export async function getRegistryItem(
  slug: string,
): Promise<RegistryItem | null> {
  const entry = findEntryBySlug(slug)
  if (!entry) return null
  const files = await readComponentFiles(entry)
  return {
    name: entry.label,
    slug: entry.slug,
    category: entry.category,
    label: entry.label,
    description: entry.description,
    files,
    dependencies: ['react'],
    registryDependencies: [],
  }
}

export interface ComponentSpecProp {
  name: string
  type: string
  default?: string | number | boolean | null
  description?: string
  required?: boolean
}

export interface ComponentSpec {
  description?: string
  props?: ComponentSpecProp[]
}

export async function getComponentSpec(
  slug: string,
): Promise<ComponentSpec | null> {
  const entry = findEntryBySlug(slug)
  if (!entry) return null
  const specPath = path.join(
    REPO_ROOT,
    'components',
    entry.folder,
    'component-spec.json',
  )
  const raw = await readIfExists(specPath)
  if (!raw) return null
  try {
    return JSON.parse(raw) as ComponentSpec
  } catch {
    return null
  }
}

export async function readComponentSource(slug: string): Promise<string | null> {
  const entry = findEntryBySlug(slug)
  if (!entry) return null
  const file = path.join(
    REPO_ROOT,
    'components',
    entry.folder,
    `${entry.folder}.tsx`,
  )
  return await readIfExists(file)
}

export async function readComponentDocs(slug: string): Promise<string | null> {
  const entry = findEntryBySlug(slug)
  if (!entry) return null
  const file = path.join(
    REPO_ROOT,
    'components',
    entry.folder,
    `${entry.folder}.docs.md`,
  )
  return await readIfExists(file)
}

export async function listRegistryItems(): Promise<
  Array<Pick<RegistryItem, 'slug' | 'name' | 'label' | 'category' | 'description'>>
> {
  return getAllEntries().map((entry) => ({
    slug: entry.slug,
    name: entry.label,
    label: entry.label,
    category: entry.category,
    description: entry.description,
  }))
}
