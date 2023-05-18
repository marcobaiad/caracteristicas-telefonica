import { formatCodesData, normalizeString } from '@/utils'
// type Keys = 'Prefijo' | 'Provincia' | 'Localidad'

type Args = {
  [key: string]: string
}

export const getCodesDirectlyBy = async (args: Args) => {
  const { Prefijo, Provincia } = args
  try {
    const response = await fetch(process.env.CODES_API_URL as string)
    if (!response.ok) throw new Error('Ocurrió un error')
    const { values }: { values: string[][] } = await response.json()
    values.splice(0, 2)
    const formatedCodesData = formatCodesData(values)

    if (Prefijo)
      return (
        formatedCodesData.find(
          ({ Prefijo: codePrefijo }) => Prefijo === codePrefijo
        ) || {}
      )

    if (Provincia) {
      const provRegex = new RegExp(normalizeString(Provincia), 'gi')
      const filteredData = formatedCodesData
        .filter(({ Provincia }) => {
          const normalizedProv = normalizeString(Provincia)
          return normalizedProv.match(provRegex)
        })
        .sort(
          (a, b) =>
            Number(a.Prefijo) - Number(b.Prefijo) ||
            a.Localidad.localeCompare(b.Localidad)
        )
      return filteredData
    }
  } catch (error) {
    console.log(
      'file: getCodesDirectlyBy.ts:5 ~ getCodesDirectlyBy ~ error:',
      error
    )
    return []
  }
}
