import { NextResponse } from 'next/server'
import { formatCodesData } from '@/utils'

type Keys = 'Prefijo' | 'Provincia' | 'Localidad'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const [search] = searchParams.entries()
  const [key] = search
  try {
    const response = await fetch(process.env.CODES_API_URL as string)
    if (!response.ok) throw new Error('Ocurrió un error')
    const { values }: { values: string[][] } = await response.json()
    values.splice(0, 2)
    const formatedCodesData = formatCodesData(values)
    const filteredData = Array.from(
      new Set(formatedCodesData.map((code) => code?.[key as Keys].trim()))
    ).sort((a, b) => {
      if (key === 'Prefijo') return Number(a) - Number(b)
      return a.localeCompare(b)
    })

    return NextResponse.json(filteredData)
  } catch (error) {
    return NextResponse.json([])
  }
}
