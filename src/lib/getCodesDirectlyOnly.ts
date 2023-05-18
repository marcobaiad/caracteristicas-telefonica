import { formatCodesData } from '@/utils'
type Keys = 'Prefijo' | 'Provincia' | 'Localidad'
export const getCodesDirectlyOnly = async (searchBy: Keys) => {
  try {
    const response = await fetch(process.env.CODES_API_URL as string)
    if (!response.ok) throw new Error('Ocurrió un error')
    const { values }: { values: string[][] } = await response.json()
    values.splice(0, 2)
    const formatedCodesData = formatCodesData(values)
    // return formatedCodesData
    const filteredData = Array.from(
      new Set(formatedCodesData.map((code) => code?.[searchBy].trim()))
    ).sort((a, b) => {
      if (searchBy === 'Prefijo') return Number(a) - Number(b)
      return a.localeCompare(b)
    })

    return filteredData

    // if (searchBy === 'Prefijo')
    //   return formatedCodesData.find(({ Prefijo }) => Prefijo === val) || {}

    // if (searchBy === 'Provincia') {
    //   const provRegex = new RegExp(normalizeString(val), 'gi')
    //   const filteredData = formatedCodesData
    //     .filter(({ Provincia }) => {
    //       const normalizedProv = normalizeString(Provincia)
    //       return normalizedProv.match(provRegex)
    //     })
    //     .sort(
    //       (a, b) =>
    //         Number(a.Prefijo) - Number(b.Prefijo) ||
    //         a.Localidad.localeCompare(b.Localidad)
    //     )
    //   return filteredData
  } catch (error) {
    console.log(
      'file: getCodesDirectlyBy.ts:5 ~ getCodesDirectlyBy ~ error:',
      error
    )
    return []
  }
}
