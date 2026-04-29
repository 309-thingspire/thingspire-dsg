import type { Metadata } from 'next'
import GlobalNav from './_components/global-nav'
import './globals.css'

export const metadata: Metadata = {
  title: 'Thingspire UI — Design Library',
  description:
    'A copy-paste component library with showcase, registry API, and CLI for Thingspire products.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <GlobalNav />
        {children}
      </body>
    </html>
  )
}
