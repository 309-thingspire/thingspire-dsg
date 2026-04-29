'use client'

import { useState } from 'react'
import CopyButton from '@/app/_components/copy-button'
import { getPreviewComponent } from '@/lib/preview-registry'

type Tab = 'preview' | 'code'

export default function PreviewCodeTabs({
  slug,
  code,
}: {
  slug: string
  code: string
}) {
  const [tab, setTab] = useState<Tab>('preview')
  const Preview = getPreviewComponent(slug)

  return (
    <div className="pc-tabs" role="region" aria-label="Component example">
      <div className="pc-tabs__bar" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'preview'}
          className={`pc-tabs__tab${tab === 'preview' ? ' is-active' : ''}`}
          onClick={() => setTab('preview')}
        >
          Preview
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'code'}
          className={`pc-tabs__tab${tab === 'code' ? ' is-active' : ''}`}
          onClick={() => setTab('code')}
        >
          Code
        </button>
        <span className="pc-tabs__spacer" />
      </div>

      <div
        role="tabpanel"
        className={`pc-tabs__panel pc-tabs__preview${tab === 'preview' ? ' is-active' : ''}`}
      >
        {Preview ? (
          <Preview />
        ) : (
          <p style={{ color: 'hsl(var(--muted-foreground))' }}>
            Preview is not available for this component.
          </p>
        )}
      </div>

      <div
        role="tabpanel"
        className={`pc-tabs__panel pc-tabs__code${tab === 'code' ? ' is-active' : ''}`}
        style={{ position: 'relative' }}
      >
        <pre><code>{code}</code></pre>
        <CopyButton text={code} className="code-block__copy" />
      </div>
    </div>
  )
}
