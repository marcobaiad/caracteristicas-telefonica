import { normalizeString } from '@/utils'
import { getAllCodesDirectly } from './getAllCodesDirectly'
export interface Args {
  Provincia?: string
  Prefijo?: string
}

export const getCodesDirectlyByProvince = async (Provincia: string) => {
  try {
    const data = await getAllCodesDirectly()
    const provRegex = new RegExp(normalizeString(Provincia), 'gi')
    const filteredData = data
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
  } catch (error) {
    console.log(
      'file: getCodesDirectlyBy.ts:5 ~ getCodesDirectlyBy ~ error:',
      error
    )
    return []
  }
}
