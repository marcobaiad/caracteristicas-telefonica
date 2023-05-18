import { NextResponse } from 'next/server'
import { getAllCodesDirectly } from '@/lib/getAllCodesDirectly'

export async function GET() {
  const values = await getAllCodesDirectly()
  return NextResponse.json(values)
}
