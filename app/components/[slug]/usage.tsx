import CodeBlock from '@/app/_components/code-block'
import { findEntryBySlug } from '@/lib/components'

export default function Usage({ slug }: { slug: string }) {
  const entry = findEntryBySlug(slug)
  if (!entry) return null

  const exportName = entry.folder
  const importPath = `@/components/${slug}/${slug}`
  const example = `import { ${exportName} } from '${importPath}'

export function Example() {
  return <${exportName} />
}`

  return <CodeBlock code={example} language="tsx" />
}
