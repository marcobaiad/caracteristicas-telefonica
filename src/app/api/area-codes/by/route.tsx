import { NextResponse } from 'next/server'
import { formatCodesData, normalizeString } from '@/utils'

export async function GET(request: Request) {
  try {
    const response = await fetch(process.env.CODES_API_URL as string)
    if (!response.ok) throw new Error('Ocurrió un error')

    const { values }: { values: string[][] } = await response.json()
    const { searchParams } = new URL(request.url)
    const [search] = searchParams.entries()
    const [key, val] = search
    const formatedCodesData = formatCodesData(values)

    if (key === 'Prefijo')
      return NextResponse.json(
        formatedCodesData.find(({ Prefijo }) => Prefijo === val) || {}
      )
    if (key === 'Provincia') {
      const provRegex = new RegExp(normalizeString(val), 'gi')
      const filteredData = formatedCodesData.filter(({ Provincia }) => {
        const normalizedProv = normalizeString(Provincia)
        return normalizedProv.match(provRegex)
      })
      return NextResponse.json(filteredData)
    }
    if (key === 'Search') {
      const searchRegex = new RegExp(normalizeString(val), 'gi')
      const filteredData = formatedCodesData
        .filter(({ Provincia, Prefijo, Localidad }) => {
          const normalizedProv = normalizeString(Provincia)
          const normalizedLocalidad = normalizeString(Localidad)
          return (
            normalizedProv.match(searchRegex) ||
            Prefijo.match(searchRegex) ||
            normalizedLocalidad.match(searchRegex)
          )
        })
        .map(({ Prefijo, Provincia, Localidad }) => ({
          code: `${Provincia} - ${Localidad} - ${Prefijo}`,
          Provincia,
          Prefijo,
        }))
      return NextResponse.json(filteredData)
    }
  } catch (error) {
    return NextResponse.json([])
  }
}
