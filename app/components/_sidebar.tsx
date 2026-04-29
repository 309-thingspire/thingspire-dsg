'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getCatalog, getCategoryOrder } from '@/lib/components'

export default function ComponentsSidebar() {
  const pathname = usePathname()
  const catalog = getCatalog()
  const order = getCategoryOrder()

  return (
    <aside className="docs-sidebar">
      <div className="docs-sidebar__group">
        <h3 className="docs-sidebar__group-title">Getting started</h3>
        <Link
          href="/components"
          className={`docs-sidebar__link${pathname === '/components' ? ' is-active' : ''}`}
        >
          All components
        </Link>
      </div>

      {order.map((category) => (
        <div key={category} className="docs-sidebar__group">
          <h3 className="docs-sidebar__group-title">{category}</h3>
          {catalog[category].map((entry) => {
            const href = `/components/${entry.slug}`
            const active = pathname === href
            return (
              <Link
                key={entry.slug}
                href={href}
                className={`docs-sidebar__link${active ? ' is-active' : ''}`}
              >
                {entry.label}
              </Link>
            )
          })}
        </div>
      ))}
    </aside>
  )
}
