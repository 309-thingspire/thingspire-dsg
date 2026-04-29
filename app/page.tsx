import Link from 'next/link'
import CopyButton from './_components/copy-button'

const INSTALL_CMD = 'npx @thingspire/ui@latest add button'

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <span className="hero__badge">v0.1 — Now in public preview</span>
          <h1>Thingspire UI design library, built for copy & paste.</h1>
          <p>
            컴포넌트 28개를 한곳에 모아둔 쇼케이스, Registry API, npm CLI까지. 필요한 부품만
            골라서 프로젝트에 그대로 떨어뜨리세요.
          </p>
          <div className="hero__actions">
            <Link href="/components" className="btn btn--primary">
              Browse components
            </Link>
            <a
              href="https://github.com/309-thingspire/309-design-library"
              target="_blank"
              rel="noreferrer"
              className="btn btn--outline"
            >
              GitHub
            </a>
          </div>

          <div className="hero__cli">
            <code>$ {INSTALL_CMD}</code>
            <CopyButton text={INSTALL_CMD} className="btn btn--ghost btn--sm" />
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <div className="hero__stat-value">28</div>
              <div className="hero__stat-label">components</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-value">3</div>
              <div className="hero__stat-label">categories</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-value">CSS</div>
              <div className="hero__stat-label">no Tailwind</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-value">MIT</div>
              <div className="hero__stat-label">license</div>
            </div>
          </div>
        </div>
      </section>

      <section className="quickstart">
        <div className="container">
          <h2 className="quickstart__title">Quick start</h2>
          <div className="quickstart__grid">
            <div className="quickstart__card">
              <span className="quickstart__step">1</span>
              <h3 className="quickstart__heading">Initialise</h3>
              <p className="quickstart__body">프로젝트 루트에서 CLI를 초기화하면 design-library.json 설정 파일이 생성됩니다.</p>
              <code style={{ fontSize: 12, color: 'var(--text-muted)' }}>npx @thingspire/ui init</code>
            </div>
            <div className="quickstart__card">
              <span className="quickstart__step">2</span>
              <h3 className="quickstart__heading">Add a component</h3>
              <p className="quickstart__body">필요한 컴포넌트만 골라서 로컬 프로젝트에 직접 복사합니다.</p>
              <code style={{ fontSize: 12, color: 'var(--text-muted)' }}>npx @thingspire/ui add button</code>
            </div>
            <div className="quickstart__card">
              <span className="quickstart__step">3</span>
              <h3 className="quickstart__heading">Customize</h3>
              <p className="quickstart__body">복사된 코드는 본인의 코드입니다. 마음껏 수정해서 사용하세요.</p>
              <code style={{ fontSize: 12, color: 'var(--text-muted)' }}>edit components/button/...</code>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
