import { normalizeString } from '@/utils'
import { getAllCodesDirectly } from './getAllCodesDirectly'

export const getCodesDirectlyBySearch = async (Search: string) => {
  const data = await getAllCodesDirectly()
  const searchRegex = new RegExp(normalizeString(Search), 'gi')
  const filteredData = data
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
  return filteredData
}
