'use client'

import { useMemo, useState } from 'react'
import * as Icons from '../icons'

type IconEntry = { name: string; Component: React.ComponentType<React.SVGProps<SVGSVGElement>> }

const ALL_ICONS: IconEntry[] = Object.entries(Icons)
  .filter(
    ([k, v]) =>
      typeof v === 'function' && k.startsWith('Icon') && /^Icon[A-Z0-9]/.test(k),
  )
  .map(([name, Component]) => ({
    name,
    Component: Component as React.ComponentType<React.SVGProps<SVGSVGElement>>,
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

export default function IconLibraryPreview() {
  const [query, setQuery] = useState('')
  const [size, setSize] = useState(20)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ALL_ICONS
    return ALL_ICONS.filter((entry) => entry.name.toLowerCase().includes(q))
  }, [query])

  // Limit how many we render to keep the showcase responsive even at 2,278 icons.
  const VISIBLE_LIMIT = 240
  const visible = filtered.slice(0, VISIBLE_LIMIT)

  return (
    <div style={{ width: '100%', display: 'grid', gap: 16 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          type="search"
          placeholder={`Search ${ALL_ICONS.length} icons...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: '1 1 280px',
            height: 36,
            padding: '0 12px',
            border: '1px solid hsl(var(--border))',
            borderRadius: 6,
            background: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
            fontSize: 13,
          }}
        />
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
          <span style={{ color: 'hsl(var(--muted-foreground))' }}>Size</span>
          <select
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            style={{
              height: 30,
              padding: '0 8px',
              border: '1px solid hsl(var(--border))',
              borderRadius: 6,
              background: 'hsl(var(--background))',
              color: 'hsl(var(--foreground))',
              fontSize: 12,
            }}
          >
            <option value={16}>16</option>
            <option value={20}>20</option>
            <option value={24}>24</option>
            <option value={32}>32</option>
            <option value={48}>48</option>
          </select>
        </label>
        <span style={{ fontSize: 12, color: 'hsl(var(--muted-foreground))' }}>
          {visible.length} / {filtered.length}
          {filtered.length > VISIBLE_LIMIT ? ` (showing first ${VISIBLE_LIMIT})` : ''}
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: 8,
        }}
      >
        {visible.map(({ name, Component }) => (
          <button
            key={name}
            type="button"
            onClick={() => navigator.clipboard?.writeText(name)}
            title={`Copy: ${name}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              padding: '12px 8px',
              border: '1px solid hsl(var(--border))',
              borderRadius: 6,
              background: 'hsl(var(--card))',
              color: 'hsl(var(--foreground))',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <span style={{ fontSize: size, lineHeight: 1 }}>
              <Component />
            </span>
            <span
              style={{
                fontSize: 10,
                color: 'hsl(var(--muted-foreground))',
                wordBreak: 'break-all',
                textAlign: 'center',
                lineHeight: 1.3,
              }}
            >
              {name.replace(/^Icon/, '')}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
