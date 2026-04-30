import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Design Tokens — Thingspire UI',
  description:
    'Color, radius, and spacing tokens that power every component. Light and dark theme variables resolved from CSS custom properties.',
}

const COLOR_TOKENS: Array<{ name: string; cssVar: string; description: string }> = [
  { name: 'Background', cssVar: '--background', description: 'Page surface' },
  { name: 'Foreground', cssVar: '--foreground', description: 'Default text' },
  { name: 'Card', cssVar: '--card', description: 'Card surface' },
  { name: 'Card foreground', cssVar: '--card-foreground', description: 'Text on cards' },
  { name: 'Popover', cssVar: '--popover', description: 'Popover surface' },
  { name: 'Popover foreground', cssVar: '--popover-foreground', description: 'Text on popovers' },
  { name: 'Primary', cssVar: '--primary', description: 'Primary action surface' },
  { name: 'Primary foreground', cssVar: '--primary-foreground', description: 'Text on primary' },
  { name: 'Secondary', cssVar: '--secondary', description: 'Secondary surface' },
  { name: 'Secondary foreground', cssVar: '--secondary-foreground', description: 'Text on secondary' },
  { name: 'Muted', cssVar: '--muted', description: 'Muted surface' },
  { name: 'Muted foreground', cssVar: '--muted-foreground', description: 'Subtle text' },
  { name: 'Accent', cssVar: '--accent', description: 'Highlight surface' },
  { name: 'Accent foreground', cssVar: '--accent-foreground', description: 'Text on accent' },
  { name: 'Destructive', cssVar: '--destructive', description: 'Destructive action' },
  { name: 'Destructive foreground', cssVar: '--destructive-foreground', description: 'Text on destructive' },
  { name: 'Border', cssVar: '--border', description: 'Borders, separators' },
  { name: 'Input', cssVar: '--input', description: 'Input border' },
  { name: 'Ring', cssVar: '--ring', description: 'Focus ring' },
  { name: 'Code background', cssVar: '--code-bg', description: 'Code block surface' },
]

const RADIUS_TOKENS: Array<{ name: string; cssVar: string; px: number }> = [
  { name: 'Small', cssVar: '--radius-sm', px: 4 },
  { name: 'Medium', cssVar: '--radius-md', px: 6 },
  { name: 'Large', cssVar: '--radius-lg', px: 8 },
  { name: 'Base', cssVar: '--radius', px: 8 },
]

const SPACING_TOKENS = [0, 1, 2, 4, 8, 12, 16, 24, 32, 48, 64]

function ColorRow({ token }: { token: (typeof COLOR_TOKENS)[number] }) {
  return (
    <tr>
      <td>
        <span
          aria-hidden
          style={{
            display: 'inline-block',
            width: 28,
            height: 28,
            borderRadius: 6,
            background: `hsl(var(${token.cssVar}))`,
            border: '1px solid hsl(var(--border))',
            verticalAlign: 'middle',
            marginRight: 12,
          }}
        />
        <strong style={{ verticalAlign: 'middle' }}>{token.name}</strong>
      </td>
      <td>
        <code>{token.cssVar}</code>
      </td>
      <td>
        <code>hsl(var({token.cssVar}))</code>
      </td>
      <td>{token.description}</td>
    </tr>
  )
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="code-block">
      <pre><code>{children}</code></pre>
    </div>
  )
}

export default function TokensPage() {
  return (
    <main className="container" style={{ paddingBlock: 48, maxWidth: 980 }}>
      <header style={{ marginBottom: 40 }}>
        <p
          style={{
            fontSize: 12,
            color: 'hsl(var(--muted-foreground))',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            margin: 0,
          }}
        >
          Reference
        </p>
        <h1
          className="comp-detail__title"
          style={{ marginTop: 8, marginBottom: 12 }}
        >
          Design tokens
        </h1>
        <p className="comp-detail__lead">
          Every component reads from this palette. Light values are declared on
          <code style={{ marginInline: 4 }}>:root</code>; dark mode overrides
          via <code style={{ marginInline: 4 }}>[data-theme=&quot;dark&quot;]</code>.
        </p>
      </header>

      <section
        id="colors"
        className="comp-detail__section"
        style={{ scrollMarginTop: 80 }}
      >
        <h2 className="comp-detail__section-title">Colors</h2>
        <p className="comp-detail__section-desc">
          Stored as bare HSL triples (e.g. <code>222.2 84% 4.9%</code>) so each
          token can be composed with alpha in CSS:{' '}
          <code>background: hsl(var(--accent) / 0.5)</code>.
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table className="props-table">
            <thead>
              <tr>
                <th style={{ minWidth: 220 }}>Token</th>
                <th>CSS variable</th>
                <th>Usage</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              {COLOR_TOKENS.map((token) => (
                <ColorRow key={token.cssVar} token={token} />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        id="radius"
        className="comp-detail__section"
        style={{ scrollMarginTop: 80 }}
      >
        <h2 className="comp-detail__section-title">Radius</h2>
        <p className="comp-detail__section-desc">
          Derived from a base of <code>0.5rem</code>. Use <code>--radius-sm</code>{' '}
          for tight controls (badges, code chips), <code>--radius-md</code> for
          form fields, <code>--radius-lg</code> for cards.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 12,
            marginTop: 16,
          }}
        >
          {RADIUS_TOKENS.map((token) => (
            <div
              key={token.cssVar}
              style={{
                padding: 16,
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius-md)',
                background: 'hsl(var(--card))',
              }}
            >
              <div
                aria-hidden
                style={{
                  width: 56,
                  height: 56,
                  border: '2px solid hsl(var(--foreground))',
                  borderRadius: `var(${token.cssVar})`,
                  marginBottom: 12,
                }}
              />
              <div style={{ fontSize: 13, fontWeight: 600 }}>{token.name}</div>
              <div style={{ fontSize: 12, color: 'hsl(var(--muted-foreground))' }}>
                <code>{token.cssVar}</code> · {token.px}px
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="spacing"
        className="comp-detail__section"
        style={{ scrollMarginTop: 80 }}
      >
        <h2 className="comp-detail__section-title">Spacing</h2>
        <p className="comp-detail__section-desc">
          The library exports a discrete scale (px) used directly in inline
          styles by every component. Common values:
        </p>
        <div style={{ display: 'grid', gap: 8, marginTop: 16 }}>
          {SPACING_TOKENS.map((px) => (
            <div
              key={px}
              style={{
                display: 'grid',
                gridTemplateColumns: '64px 1fr',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <code style={{ fontSize: 13 }}>{px}px</code>
              <div
                aria-hidden
                style={{
                  height: 12,
                  width: px || 1,
                  background: 'hsl(var(--accent))',
                  borderRadius: 2,
                }}
              />
            </div>
          ))}
        </div>
      </section>

      <section
        id="usage"
        className="comp-detail__section"
        style={{ scrollMarginTop: 80 }}
      >
        <h2 className="comp-detail__section-title">Wiring tokens into your project</h2>
        <p className="comp-detail__section-desc">
          The CLI copies <code>styles/tokens.css</code> into your project the
          first time you add a component. Import once at the entry point:
        </p>
        <CodeBlock>{`// app/layout.tsx (Next.js App Router)
import '@/styles/tokens.css'`}</CodeBlock>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24 }}>
          Switching themes
        </h3>
        <p className="comp-detail__section-desc">
          Toggle by setting <code>data-theme</code> on the root element:
        </p>
        <CodeBlock>{`document.documentElement.setAttribute('data-theme', 'dark')`}</CodeBlock>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24 }}>
          Composing with alpha
        </h3>
        <CodeBlock>{`/* Translucent accent overlay */
.surface {
  background: hsl(var(--accent) / 0.12);
}`}</CodeBlock>
      </section>
    </main>
  )
}
