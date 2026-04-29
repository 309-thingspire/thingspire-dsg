import CodeBlock from '@/app/_components/code-block'
import { findEntryBySlug } from '@/lib/components'

export default function Usage({ slug }: { slug: string }) {
  const entry = findEntryBySlug(slug)
  if (!entry) return null

  const exportName = entry.folder
  const importPath = `@/components/${slug}/${slug}`

  const importExample = `import { ${exportName} } from "${importPath}"`
  const usageExample = `<${exportName} />`

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <CodeBlock code={importExample} language="tsx" />
      <CodeBlock code={usageExample} language="tsx" />
    </div>
  )
}
