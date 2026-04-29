import { NextResponse } from 'next/server'
import { listRegistryItems } from '@/lib/registry'

export const dynamic = 'force-static'

export async function GET() {
  const items = await listRegistryItems()
  return NextResponse.json({ items })
}
