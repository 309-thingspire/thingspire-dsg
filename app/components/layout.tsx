import ComponentsSidebar from './_sidebar'

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="docs-layout">
      <ComponentsSidebar />
      <main className="docs-content">{children}</main>
    </div>
  )
}
