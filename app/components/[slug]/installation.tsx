'use client'

import { useState } from 'react'
import CopyButton from '@/app/_components/copy-button'

type Tab = 'cli' | 'manual'
type Pm = 'npm' | 'pnpm' | 'yarn' | 'bun'

const PM_LABEL: Record<Pm, string> = { npm: 'npm', pnpm: 'pnpm', yarn: 'yarn', bun: 'bun' }

function buildCmd(pm: Pm, slug: string): string {
  switch (pm) {
    case 'npm':
      return `npx @309-thingspire/ui@latest add ${slug}`
    case 'pnpm':
      return `pnpm dlx @309-thingspire/ui@latest add ${slug}`
    case 'yarn':
      return `yarn dlx @309-thingspire/ui@latest add ${slug}`
    case 'bun':
      return `bunx @309-thingspire/ui@latest add ${slug}`
  }
}

export default function Installation({
  slug,
  manualFiles,
}: {
  slug: string
  manualFiles: string[]
}) {
  const [tab, setTab] = useState<Tab>('cli')
  const [pm, setPm] = useState<Pm>('npm')

  return (
    <div className="install" role="region" aria-label="Installation instructions">
      <div className="install__bar" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'cli'}
          className={`pc-tabs__tab${tab === 'cli' ? ' is-active' : ''}`}
          onClick={() => setTab('cli')}
        >
          CLI
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'manual'}
          className={`pc-tabs__tab${tab === 'manual' ? ' is-active' : ''}`}
          onClick={() => setTab('manual')}
        >
          Manual
        </button>
      </div>

      {tab === 'cli' ? (
        <>
          <div className="install__pm-row" role="tablist">
            {(Object.keys(PM_LABEL) as Pm[]).map((p) => (
              <button
                key={p}
                type="button"
                role="tab"
                aria-selected={pm === p}
                className={`install__pm-pill${pm === p ? ' is-active' : ''}`}
                onClick={() => setPm(p)}
              >
                {PM_LABEL[p]}
              </button>
            ))}
          </div>
          <div className="install__cmd">
            <span className="install__cmd-prompt">$</span>
            <code>{buildCmd(pm, slug)}</code>
            <CopyButton text={buildCmd(pm, slug)} className="install__cmd-copy" />
          </div>
        </>
      ) : (
        <div className="install__manual">
          <div className="install__manual-step">
            <div className="install__manual-num">1</div>
            <div className="install__manual-body">
              <p className="install__manual-text">
                Copy the following files from the registry into your project.
              </p>
              <ul className="install__manual-files">
                {manualFiles.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="install__manual-step">
            <div className="install__manual-num">2</div>
            <div className="install__manual-body">
              <p className="install__manual-text">
                Make sure <code>styles/tokens.css</code> is imported in your global stylesheet so
                the design tokens are available.
              </p>
            </div>
          </div>
          <div className="install__manual-step">
            <div className="install__manual-num">3</div>
            <div className="install__manual-body">
              <p className="install__manual-text">
                Or fetch the JSON manifest directly:{' '}
                <code>
                  curl https://thingspire-dsg.vercel.app/api/registry/{slug}
                </code>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
