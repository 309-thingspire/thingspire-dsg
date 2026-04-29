import catalog from '@/components/catalog.json'

export type Category = 'atoms' | 'molecules' | 'organisms'

export interface CatalogEntry {
  slug: string
  folder: string
  label: string
  description: string
}

export interface CatalogEntryWithCategory extends CatalogEntry {
  category: Category
}

const CATEGORY_ORDER: Category[] = ['atoms', 'molecules', 'organisms']

export function getCatalog(): Record<Category, CatalogEntry[]> {
  return catalog as Record<Category, CatalogEntry[]>
}

export function getCategoryOrder(): Category[] {
  return CATEGORY_ORDER
}

export function getAllEntries(): CatalogEntryWithCategory[] {
  const cat = getCatalog()
  return CATEGORY_ORDER.flatMap((category) =>
    cat[category].map((entry) => ({ ...entry, category })),
  )
}

export function findEntryBySlug(slug: string): CatalogEntryWithCategory | undefined {
  return getAllEntries().find((entry) => entry.slug === slug)
}

export function getAllSlugs(): string[] {
  return getAllEntries().map((entry) => entry.slug)
}
