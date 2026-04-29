import { notFound } from 'next/navigation'
import Link from 'next/link'
import { findEntryBySlug, getAllSlugs } from '@/lib/components'
import { getRegistryItem, readComponentSource } from '@/lib/registry'
import PreviewCodeTabs from './preview-code-tabs'
import Installation from './installation'
import Usage from './usage'
import ApiReference from './api-reference'
import OnThisPage from './on-this-page'

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = findEntryBySlug(slug)
  if (!entry) return { title: 'Component not found' }
  return {
    title: `${entry.label} — Thingspire UI`,
    description: entry.description,
  }
}

const SECTIONS = [
  { id: 'installation', label: 'Installation' },
  { id: 'usage', label: 'Usage' },
  { id: 'examples', label: 'Examples' },
  { id: 'api-reference', label: 'API Reference' },
]

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = findEntryBySlug(slug)
  if (!entry) notFound()

  const [source, registryItem] = await Promise.all([
    readComponentSource(slug),
    getRegistryItem(slug),
  ])
  const manualFiles = (registryItem?.files ?? []).map((f) => f.path)

  return (
    <div className="comp-detail">
      <article className="comp-detail__main">
        <nav className="comp-detail__breadcrumb" aria-label="Breadcrumb">
          <Link href="/components">Components</Link>
          <span className="comp-detail__breadcrumb-sep">/</span>
          <span style={{ textTransform: 'capitalize' }}>{entry.category}</span>
          <span className="comp-detail__breadcrumb-sep">/</span>
          <span style={{ color: 'hsl(var(--foreground))' }}>{entry.label}</span>
        </nav>

        <h1 className="comp-detail__title">{entry.label}</h1>
        <p className="comp-detail__lead">{entry.description}</p>

        <section id="installation" className="comp-detail__section">
          <h2 className="comp-detail__section-title">Installation</h2>
          <Installation slug={slug} manualFiles={manualFiles} />
        </section>

        <section id="usage" className="comp-detail__section">
          <h2 className="comp-detail__section-title">Usage</h2>
          <Usage slug={slug} />
        </section>

        <section id="examples" className="comp-detail__section">
          <h2 className="comp-detail__section-title">Examples</h2>
          <p className="comp-detail__section-desc">
            Live preview rendered from <code>{entry.folder}.preview.tsx</code>. Switch to the Code
            tab to view the underlying component source.
          </p>
          <PreviewCodeTabs slug={slug} code={source ?? '// source not found'} />
        </section>

        <section id="api-reference" className="comp-detail__section">
          <h2 className="comp-detail__section-title">API Reference</h2>
          <ApiReference slug={slug} />
        </section>
      </article>

      <OnThisPage items={SECTIONS} />
    </div>
  )
}
