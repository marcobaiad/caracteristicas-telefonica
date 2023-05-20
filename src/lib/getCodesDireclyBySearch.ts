import { normalizeString } from '@/utils'
import { getAllCodesDirectly } from './getAllCodesDirectly'
import { Search } from '@/types'

export const getCodesDirectlyBySearch = async (
  Search: string
): Promise<Search[]> => {
  const data = await getAllCodesDirectly()
  const searchRegex = new RegExp(normalizeString(Search), 'gi')
  const filteredData = data
    .filter(({ Provincia, Prefijo, Localidad }) => {
      const normalizedProv = normalizeString(Provincia)
      const normalizedLocalidad = normalizeString(Localidad!)

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
  return filteredData
}
