import { NextResponse } from 'next/server'
import { formatCodesData } from '../../../utils/formatCodesData'

export async function GET() {
  try {
    const response = await fetch(process.env.CODES_API_URL as string)
    if (!response.ok) throw new Error('Ocurrió un error')
    const { values }: { values: string[][] } = await response.json()
    values.splice(0, 2)
    const formatedCodesData = formatCodesData(values)
    return NextResponse.json(formatedCodesData)
  } catch (error) {
    return NextResponse.json([])
  }
}
