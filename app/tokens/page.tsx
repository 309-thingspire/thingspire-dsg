import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Design Tokens — Thingspire UI',
  description:
    'Variables collection. Browse every theme color, typography, spacing, and radius token used by the components.',
}

type Row = {
  name: string
  values: Record<string, string | number>
  swatch?: { light: string; dark?: string }
}

type Group = {
  id: string
  label: string
  parent: string
  rows: Row[]
}

type Collection = {
  id: string
  label: string
  count: number
  groups: Group[]
}

// ─── Color tokens (CSS variables) ───────────────────────────────────────────
const COLOR_THEME_ROWS: Row[] = [
  { name: 'background', values: { Light: '0 0% 100%', Dark: '222 84% 5%' }, swatch: { light: 'hsl(0 0% 100%)', dark: 'hsl(222 84% 5%)' } },
  { name: 'foreground', values: { Light: '222 84% 5%', Dark: '210 40% 98%' }, swatch: { light: 'hsl(222 84% 5%)', dark: 'hsl(210 40% 98%)' } },
  { name: 'card', values: { Light: '0 0% 100%', Dark: '222 84% 5%' }, swatch: { light: 'hsl(0 0% 100%)', dark: 'hsl(222 84% 5%)' } },
  { name: 'card-foreground', values: { Light: '222 84% 5%', Dark: '210 40% 98%' }, swatch: { light: 'hsl(222 84% 5%)', dark: 'hsl(210 40% 98%)' } },
  { name: 'popover', values: { Light: '0 0% 100%', Dark: '222 84% 5%' }, swatch: { light: 'hsl(0 0% 100%)', dark: 'hsl(222 84% 5%)' } },
  { name: 'popover-foreground', values: { Light: '222 84% 5%', Dark: '210 40% 98%' }, swatch: { light: 'hsl(222 84% 5%)', dark: 'hsl(210 40% 98%)' } },
  { name: 'primary', values: { Light: '222 47% 11%', Dark: '210 40% 98%' }, swatch: { light: 'hsl(222 47% 11%)', dark: 'hsl(210 40% 98%)' } },
  { name: 'primary-foreground', values: { Light: '210 40% 98%', Dark: '222 47% 11%' }, swatch: { light: 'hsl(210 40% 98%)', dark: 'hsl(222 47% 11%)' } },
  { name: 'secondary', values: { Light: '210 40% 96%', Dark: '217 33% 18%' }, swatch: { light: 'hsl(210 40% 96%)', dark: 'hsl(217 33% 18%)' } },
  { name: 'secondary-foreground', values: { Light: '222 47% 11%', Dark: '210 40% 98%' }, swatch: { light: 'hsl(222 47% 11%)', dark: 'hsl(210 40% 98%)' } },
  { name: 'muted', values: { Light: '210 40% 96%', Dark: '217 33% 18%' }, swatch: { light: 'hsl(210 40% 96%)', dark: 'hsl(217 33% 18%)' } },
  { name: 'muted-foreground', values: { Light: '215 16% 47%', Dark: '215 20% 65%' }, swatch: { light: 'hsl(215 16% 47%)', dark: 'hsl(215 20% 65%)' } },
  { name: 'accent', values: { Light: '210 40% 96%', Dark: '217 33% 18%' }, swatch: { light: 'hsl(210 40% 96%)', dark: 'hsl(217 33% 18%)' } },
  { name: 'accent-foreground', values: { Light: '222 47% 11%', Dark: '210 40% 98%' }, swatch: { light: 'hsl(222 47% 11%)', dark: 'hsl(210 40% 98%)' } },
  { name: 'destructive', values: { Light: '0 84% 60%', Dark: '0 63% 31%' }, swatch: { light: 'hsl(0 84% 60%)', dark: 'hsl(0 63% 31%)' } },
  { name: 'destructive-foreground', values: { Light: '210 40% 98%', Dark: '210 40% 98%' }, swatch: { light: 'hsl(210 40% 98%)', dark: 'hsl(210 40% 98%)' } },
  { name: 'border', values: { Light: '214 32% 91%', Dark: '217 33% 18%' }, swatch: { light: 'hsl(214 32% 91%)', dark: 'hsl(217 33% 18%)' } },
  { name: 'input', values: { Light: '214 32% 91%', Dark: '217 33% 18%' }, swatch: { light: 'hsl(214 32% 91%)', dark: 'hsl(217 33% 18%)' } },
  { name: 'ring', values: { Light: '222 84% 5%', Dark: '213 27% 84%' }, swatch: { light: 'hsl(222 84% 5%)', dark: 'hsl(213 27% 84%)' } },
  { name: 'code-bg', values: { Light: '220 13% 96%', Dark: '222 30% 13%' }, swatch: { light: 'hsl(220 13% 96%)', dark: 'hsl(222 30% 13%)' } },
]

// ─── Typography ─────────────────────────────────────────────────────────────
const TYPOGRAPHY_FAMILY: Row[] = [{ name: 'inter', values: { Desktop: 'Pretendard', Mobile: 'Pretendard' } }]
const TYPOGRAPHY_WEIGHT: Row[] = [
  { name: 'light', values: { Desktop: 'Light', Mobile: 'Light' } },
  { name: 'regular', values: { Desktop: 'Regular', Mobile: 'Regular' } },
  { name: 'medium', values: { Desktop: 'Medium', Mobile: 'Medium' } },
  { name: 'semi-bold', values: { Desktop: 'Semi Bold', Mobile: 'Semi Bold' } },
  { name: 'bold', values: { Desktop: 'Bold', Mobile: 'Bold' } },
  { name: 'extra-bold', values: { Desktop: 'Extra Bold', Mobile: 'Extra Bold' } },
  { name: 'black', values: { Desktop: 'Black', Mobile: 'Black' } },
]
const TYPOGRAPHY_SIZE: Row[] = [
  { name: 'display', values: { Desktop: 96, Mobile: 96 } },
  { name: 'h1', values: { Desktop: 72, Mobile: 72 } },
  { name: 'h2', values: { Desktop: 64, Mobile: 48 } },
  { name: 'h3', values: { Desktop: 48, Mobile: 36 } },
  { name: 'h4', values: { Desktop: 36, Mobile: 30 } },
  { name: 'h5', values: { Desktop: 30, Mobile: 30 } },
  { name: 'h6', values: { Desktop: 24, Mobile: 24 } },
  { name: 'body-l', values: { Desktop: 20, Mobile: 18 } },
  { name: 'body-m', values: { Desktop: 18, Mobile: 18 } },
  { name: 'body-s', values: { Desktop: 16, Mobile: 16 } },
  { name: 'caption-l', values: { Desktop: 14, Mobile: 14 } },
  { name: 'caption-m', values: { Desktop: 12, Mobile: 12 } },
  { name: 'caption-s', values: { Desktop: 10, Mobile: 10 } },
]
const TYPOGRAPHY_LINE_HEIGHT: Row[] = [
  { name: 'display', values: { Desktop: 100, Mobile: 100 } },
  { name: 'h1', values: { Desktop: 80, Mobile: 80 } },
  { name: 'h2', values: { Desktop: 56, Mobile: 56 } },
  { name: 'h3', values: { Desktop: 44, Mobile: 44 } },
  { name: 'h4', values: { Desktop: 36, Mobile: 36 } },
  { name: 'h5', values: { Desktop: 36, Mobile: 36 } },
  { name: 'h6', values: { Desktop: 32, Mobile: 32 } },
  { name: 'body-l', values: { Desktop: 28, Mobile: 26 } },
  { name: 'body-m', values: { Desktop: 26, Mobile: 26 } },
  { name: 'body-s', values: { Desktop: 24, Mobile: 24 } },
  { name: 'caption-l', values: { Desktop: 20, Mobile: 20 } },
  { name: 'caption-m', values: { Desktop: 16, Mobile: 16 } },
  { name: 'caption-s', values: { Desktop: 14, Mobile: 14 } },
]

// ─── Measurements ───────────────────────────────────────────────────────────
const SPACING_SCALE: Row[] = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64, 96, 128, 160, 224, 256, 400, 1024].map(
  (v) => ({ name: String(v), values: { Value: `${v}px` } }),
)
const RADIUS_SCALE: Row[] = [
  { name: 'xs', values: { Value: '4px' } },
  { name: 'sm', values: { Value: '6px' } },
  { name: 'md', values: { Value: '8px' } },
  { name: 'lg', values: { Value: '10px' } },
  { name: 'xl', values: { Value: '12px' } },
  { name: 'full', values: { Value: '999px' } },
]

const COLLECTIONS: Collection[] = [
  {
    id: 'theme',
    label: 'Theme',
    count: COLOR_THEME_ROWS.length,
    groups: [
      { id: 'theme-colors', label: 'colors', parent: 'theme', rows: COLOR_THEME_ROWS },
    ],
  },
  {
    id: 'typography',
    label: 'Typography',
    count:
      TYPOGRAPHY_FAMILY.length +
      TYPOGRAPHY_WEIGHT.length +
      TYPOGRAPHY_SIZE.length +
      TYPOGRAPHY_LINE_HEIGHT.length,
    groups: [
      { id: 'typography-family', label: 'family', parent: 'typography', rows: TYPOGRAPHY_FAMILY },
      { id: 'typography-weight', label: 'weight', parent: 'typography', rows: TYPOGRAPHY_WEIGHT },
      { id: 'typography-size', label: 'size', parent: 'typography', rows: TYPOGRAPHY_SIZE },
      { id: 'typography-line-height', label: 'line-height', parent: 'typography', rows: TYPOGRAPHY_LINE_HEIGHT },
    ],
  },
  {
    id: 'measurements',
    label: 'Measurements',
    count: SPACING_SCALE.length + RADIUS_SCALE.length,
    groups: [
      { id: 'measurements-spacing', label: 'spacing', parent: 'measurements', rows: SPACING_SCALE },
      { id: 'measurements-radius', label: 'radius', parent: 'measurements', rows: RADIUS_SCALE },
    ],
  },
]

function valueColumns(group: Group): string[] {
  const first = group.rows[0]
  return first ? Object.keys(first.values) : []
}

function GroupTable({ group }: { group: Group }) {
  const cols = valueColumns(group)
  return (
    <div id={group.id} style={{ scrollMarginTop: 80, marginBottom: 48 }}>
      <div
        style={{
          fontSize: 12,
          color: 'hsl(var(--muted-foreground))',
          marginBottom: 12,
          paddingInline: 16,
        }}
      >
        {group.parent} / <strong style={{ color: 'hsl(var(--foreground))' }}>{group.label}</strong>
      </div>
      <table className="vars-table">
        <thead>
          <tr>
            <th style={{ width: '32%' }}>Name</th>
            {cols.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {group.rows.map((row) => (
            <tr key={row.name}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {row.swatch ? (
                    <span
                      aria-hidden
                      style={{
                        display: 'inline-block',
                        width: 18,
                        height: 18,
                        borderRadius: 4,
                        background: row.swatch.light,
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
              {cols.map((c) => (
                <td key={c}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {row.swatch ? (
                      <span
                        aria-hidden
                        style={{
                          display: 'inline-block',
                          width: 12,
                          height: 12,
                          borderRadius: 2,
                          background: c === 'Dark' ? row.swatch.dark : row.swatch.light,
                          border: '1px solid hsl(var(--border))',
                        }}
                      />
                    ) : null}
                    <span style={{ fontSize: 13 }}>{row.values[c]}</span>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function TokensPage() {
  return (
    <div className="vars-page">
      <aside className="vars-sidebar">
        <div className="vars-sidebar__heading">
          <span>Collections</span>
        </div>
        <nav>
          {COLLECTIONS.map((col) => (
            <div key={col.id} style={{ marginBottom: 16 }}>
              <a
                href={`#${col.groups[0].id}`}
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
                >
                  <span>{g.label}</span>
                  <span className="vars-sidebar__count">{g.rows.length}</span>
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
            Browse every theme, typography, and measurement token. Light /
            dark colors map to the same CSS variable, swapped via{' '}
            <code>data-theme=&quot;dark&quot;</code>.
          </p>
        </header>

        {COLLECTIONS.flatMap((c) => c.groups).map((g) => (
          <GroupTable key={g.id} group={g} />
        ))}
      </main>
    </div>
  )
}
