import type { Metadata } from 'next'
import {
  colors,
  spacing as spacingTokens,
  radius as radiusTokens,
} from '../../style-tokens'

export const metadata: Metadata = {
  title: 'Design Tokens — Thingspire UI',
  description:
    'Browse every theme color, primitive palette, typography, spacing, and radius variable. Auto-generated from style-tokens.ts.',
}

// ─── Recursive token flattener ───────────────────────────────────────────────
type LeafEntry = {
  path: string[]
  name: string
  value: string | number
}

function flatten(node: unknown, basePath: string[] = []): LeafEntry[] {
  if (node === null || node === undefined) return []
  if (typeof node === 'string' || typeof node === 'number') {
    // Leaf placed at the parent path; the immediate key is the "name"
    return [{ path: basePath.slice(0, -1), name: basePath.at(-1) ?? '', value: node }]
  }
  if (Array.isArray(node) || typeof node !== 'object') return []
  const out: LeafEntry[] = []
  for (const [key, value] of Object.entries(node)) {
    out.push(...flatten(value, [...basePath, key]))
  }
  return out
}

function groupByPath(entries: LeafEntry[]): Map<string, LeafEntry[]> {
  const map = new Map<string, LeafEntry[]>()
  for (const entry of entries) {
    const key = entry.path.join(' / ') || '(root)'
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(entry)
  }
  return map
}

// ─── Build collections ──────────────────────────────────────────────────────
const colorEntries = flatten(colors).filter(
  // Skip the `semantic.component.*` duplicate of `semantic.theme.*`.
  (e) => !(e.path[0] === 'semantic' && e.path[1] === 'component'),
)
const colorGroups = groupByPath(colorEntries)

const spacingEntries = flatten(spacingTokens)
const spacingGroups = groupByPath(spacingEntries)

const radiusEntries = flatten(radiusTokens)
const radiusGroups = groupByPath(radiusEntries)

// Hardcoded typography scale (the deeper tree is redundant — these are the
// surface tokens designers refer to)
const TYPOGRAPHY_GROUPS: Array<{ path: string[]; rows: LeafEntry[] }> = [
  {
    path: ['typography', 'family'],
    rows: [{ path: ['typography', 'family'], name: 'inter', value: 'Pretendard' }],
  },
  {
    path: ['typography', 'weight'],
    rows: [
      'Light',
      'Regular',
      'Medium',
      'Semi Bold',
      'Bold',
      'Extra Bold',
      'Black',
    ].map((label) => ({
      path: ['typography', 'weight'],
      name: label.toLowerCase().replace(/\s+/g, '-'),
      value: label,
    })),
  },
  {
    path: ['typography', 'size'],
    rows: [
      ['display', 96],
      ['h1', 72],
      ['h2', 64],
      ['h3', 48],
      ['h4', 36],
      ['h5', 30],
      ['h6', 24],
      ['body-l', 20],
      ['body-m', 18],
      ['body-s', 16],
      ['caption-l', 14],
      ['caption-m', 12],
      ['caption-s', 10],
    ].map(([name, value]) => ({
      path: ['typography', 'size'],
      name: name as string,
      value: `${value}px`,
    })),
  },
  {
    path: ['typography', 'line-height'],
    rows: [
      ['display', 100],
      ['h1', 80],
      ['h2', 56],
      ['h3', 44],
      ['h4', 36],
      ['h5', 36],
      ['h6', 32],
      ['body-l', 28],
      ['body-m', 26],
      ['body-s', 24],
      ['caption-l', 20],
      ['caption-m', 16],
      ['caption-s', 14],
    ].map(([name, value]) => ({
      path: ['typography', 'line-height'],
      name: name as string,
      value: `${value}px`,
    })),
  },
]

// ─── Build sidebar tree ─────────────────────────────────────────────────────
type SidebarGroup = { id: string; label: string; count: number }
type SidebarCollection = {
  id: string
  label: string
  count: number
  groups: SidebarGroup[]
}

function buildCollection(
  id: string,
  label: string,
  groupMap: Map<string, LeafEntry[]>,
  pathPrefix?: string,
): SidebarCollection {
  const groups: SidebarGroup[] = []
  for (const [groupKey, rows] of groupMap) {
    if (pathPrefix && !groupKey.startsWith(pathPrefix)) continue
    const groupId = `g-${groupKey.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`
    groups.push({
      id: groupId,
      label: groupKey.replace(/^.+? \/ /, ''),
      count: rows.length,
    })
  }
  return {
    id,
    label,
    count: groups.reduce((sum, g) => sum + g.count, 0),
    groups,
  }
}

const COLLECTIONS: SidebarCollection[] = [
  buildCollection('primitive', 'Primitive', colorGroups, 'primitive'),
  buildCollection('theme', 'Theme', colorGroups, 'semantic / theme'),
  {
    id: 'typography',
    label: 'Typography',
    count: TYPOGRAPHY_GROUPS.reduce((s, g) => s + g.rows.length, 0),
    groups: TYPOGRAPHY_GROUPS.map((g) => ({
      id: `g-${g.path.join('-')}`,
      label: g.path.at(-1)!,
      count: g.rows.length,
    })),
  },
  {
    id: 'spacing',
    label: 'Spacing',
    count: spacingEntries.length,
    groups: Array.from(spacingGroups, ([key, rows]) => ({
      id: `g-spacing-${key.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`,
      label: key.split(' / ').slice(-1).join(''),
      count: rows.length,
    })),
  },
  {
    id: 'radius',
    label: 'Radius',
    count: radiusEntries.length,
    groups: Array.from(radiusGroups, ([key, rows]) => ({
      id: `g-radius-${key.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`,
      label: key.split(' / ').slice(-1).join('') || 'radius',
      count: rows.length,
    })),
  },
]

// ─── Render helpers ─────────────────────────────────────────────────────────
function isHexColor(v: unknown): v is string {
  return typeof v === 'string' && /^#[0-9a-fA-F]{6,8}$/.test(v)
}

function GroupTable({
  groupKey,
  rows,
  groupId,
}: {
  groupKey: string
  rows: LeafEntry[]
  groupId: string
}) {
  const sample = rows[0]?.value
  const isColors = isHexColor(sample)
  const valueLabel = isColors ? 'Value' : 'Value'

  // Display path with last segment bold
  const parts = groupKey.split(' / ')
  const last = parts.pop()

  return (
    <div id={groupId} style={{ scrollMarginTop: 80, marginBottom: 40 }}>
      <div
        style={{
          fontSize: 12,
          color: 'hsl(var(--muted-foreground))',
          marginBottom: 10,
          paddingInline: 16,
        }}
      >
        {parts.length ? `${parts.join(' / ')} / ` : ''}
        <strong style={{ color: 'hsl(var(--foreground))' }}>{last}</strong>{' '}
        <span style={{ color: 'hsl(var(--muted-foreground))' }}>· {rows.length}</span>
      </div>
      <table className="vars-table">
        <thead>
          <tr>
            <th style={{ width: '46%' }}>Name</th>
            <th>{valueLabel}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const value = String(row.value)
            const isColor = isHexColor(row.value)
            return (
              <tr key={`${groupId}-${row.name}`}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {isColor ? (
                      <span
                        aria-hidden
                        style={{
                          display: 'inline-block',
                          width: 18,
                          height: 18,
                          borderRadius: 4,
                          background: value,
                          border: '1px solid hsl(var(--border))',
                          flexShrink: 0,
                        }}
                      />
                    ) : (
                      <span
                        aria-hidden
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 18,
                          height: 18,
                          borderRadius: 3,
                          border: '1px solid hsl(var(--border))',
                          fontSize: 10,
                          color: 'hsl(var(--muted-foreground))',
                          flexShrink: 0,
                        }}
                      >
                        T
                      </span>
                    )}
                    <code style={{ fontSize: 13 }}>{row.name}</code>
                  </div>
                </td>
                <td>
                  <code style={{ fontSize: 13 }}>{value}</code>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function TokensPage() {
  // Order: primitive → theme → typography → spacing → radius
  const orderedColorGroups = Array.from(colorGroups).sort(([a], [b]) => {
    const aPrim = a.startsWith('primitive')
    const bPrim = b.startsWith('primitive')
    if (aPrim !== bPrim) return aPrim ? -1 : 1
    return a.localeCompare(b)
  })

  const totalColors = colorEntries.length
  const totalEntries =
    totalColors +
    TYPOGRAPHY_GROUPS.reduce((s, g) => s + g.rows.length, 0) +
    spacingEntries.length +
    radiusEntries.length

  return (
    <div className="vars-page">
      <aside className="vars-sidebar">
        <div className="vars-sidebar__heading">Collections</div>
        <nav>
          {COLLECTIONS.map((col) => (
            <div key={col.id} style={{ marginBottom: 14 }}>
              <a
                href={col.groups[0] ? `#${col.groups[0].id}` : '#'}
                className="vars-sidebar__row vars-sidebar__row--collection"
              >
                <span>{col.label}</span>
                <span className="vars-sidebar__count">{col.count}</span>
              </a>
              {col.groups.map((g) => (
                <a
                  key={g.id}
                  href={`#${g.id}`}
                  className="vars-sidebar__row vars-sidebar__row--group"
                  title={g.label}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {g.label}
                  </span>
                  <span className="vars-sidebar__count">{g.count}</span>
                </a>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <main className="vars-main">
        <header className="vars-main__header">
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em' }}>
            Variables
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: 'hsl(var(--muted-foreground))' }}>
            {totalEntries.toLocaleString()} tokens — generated from{' '}
            <code>style-tokens.ts</code>. Browse by collection on the left.
          </p>
        </header>

        {/* Color groups (primitive + theme) */}
        {orderedColorGroups.map(([groupKey, rows]) => {
          const groupId = `g-${groupKey.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`
          return <GroupTable key={groupId} groupId={groupId} groupKey={groupKey} rows={rows} />
        })}

        {/* Typography */}
        {TYPOGRAPHY_GROUPS.map((group) => {
          const groupId = `g-${group.path.join('-')}`
          return (
            <GroupTable
              key={groupId}
              groupId={groupId}
              groupKey={group.path.join(' / ')}
              rows={group.rows}
            />
          )
        })}

        {/* Spacing */}
        {Array.from(spacingGroups).map(([groupKey, rows]) => {
          const groupId = `g-spacing-${groupKey.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`
          return (
            <GroupTable
              key={groupId}
              groupId={groupId}
              groupKey={`spacing / ${groupKey}`}
              rows={rows.map((r) => ({ ...r, value: typeof r.value === 'number' ? `${r.value}px` : r.value }))}
            />
          )
        })}

        {/* Radius */}
        {Array.from(radiusGroups).map(([groupKey, rows]) => {
          const groupId = `g-radius-${groupKey.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`
          return (
            <GroupTable
              key={groupId}
              groupId={groupId}
              groupKey={`radius / ${groupKey}`}
              rows={rows.map((r) => ({
                ...r,
                value:
                  typeof r.value === 'number'
                    ? r.value === 999
                      ? '999px (full)'
                      : `${r.value}px`
                    : r.value,
              }))}
            />
          )
        })}
      </main>
    </div>
  )
}
