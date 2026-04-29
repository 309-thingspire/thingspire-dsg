import { NextResponse } from 'next/server'
import { getRegistryItem } from '@/lib/registry'
import { getAllSlugs } from '@/lib/components'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const item = await getRegistryItem(slug)
  if (!item) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(item)
}
