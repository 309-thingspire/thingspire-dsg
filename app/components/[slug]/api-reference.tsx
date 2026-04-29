import { getComponentSpec } from '@/lib/registry'

function formatDefault(value: unknown): string {
  if (value === undefined || value === null) return '—'
  if (typeof value === 'string') return value
  return JSON.stringify(value)
}

export default async function ApiReference({ slug }: { slug: string }) {
  const spec = await getComponentSpec(slug)

  if (!spec || !spec.props || spec.props.length === 0) {
    return (
      <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: 13 }}>
        Props 문서 준비 중입니다. (component-spec.json 추가 시 표시됩니다.)
      </p>
    )
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="props-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {spec.props.map((prop) => (
            <tr key={prop.name}>
              <td>
                <code>{prop.name}</code>
                {prop.required && (
                  <span style={{ color: 'hsl(var(--destructive))', marginLeft: 4 }}>*</span>
                )}
              </td>
              <td><code>{prop.type}</code></td>
              <td>{formatDefault(prop.default)}</td>
              <td>{prop.description ?? ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
