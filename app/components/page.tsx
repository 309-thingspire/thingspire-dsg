'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { getAllEntries } from '@/lib/components'

const ALL_ENTRIES = getAllEntries()

export default function ComponentsIndexPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ALL_ENTRIES
    return ALL_ENTRIES.filter(
      (entry) =>
        entry.label.toLowerCase().includes(q) ||
        entry.slug.includes(q) ||
        entry.description.toLowerCase().includes(q) ||
        entry.category.includes(q),
    )
  }, [query])

  return (
    <section className="comp-gallery">
      <header className="comp-gallery__header">
        <h1 className="comp-gallery__title">Components</h1>
        <p className="comp-gallery__desc">
          {ALL_ENTRIES.length}개의 컴포넌트를 라이브 프리뷰와 소스 코드로 둘러보세요.
        </p>
        <input
          type="search"
          placeholder="Search components..."
          className="comp-gallery__search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>

      {filtered.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>No matching components.</p>
      ) : (
        <div className="comp-grid">
          {filtered.map((entry) => (
            <Link
              key={entry.slug}
              href={`/components/${entry.slug}`}
              className="comp-card"
            >
              <h3 className="comp-card__title">{entry.label}</h3>
              <p className="comp-card__category">{entry.category}</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
