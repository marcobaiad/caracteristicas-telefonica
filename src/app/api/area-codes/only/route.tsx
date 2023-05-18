import { getAllCodesDirectly } from '@/lib/getAllCodesDirectly'
import { NextResponse } from 'next/server'

type Keys = 'Prefijo' | 'Provincia' | 'Localidad'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const [search] = searchParams.entries()
  const [key] = search
  try {
    const values = await getAllCodesDirectly()
    const filteredData = Array.from(
      new Set(values.map((code) => code?.[key as Keys].trim()))
    ).sort((a, b) => {
      if (key === 'Prefijo') return Number(a) - Number(b)
      return a.localeCompare(b)
    })

    return NextResponse.json(filteredData)
  } catch (error) {
    return NextResponse.json([])
  }
}
