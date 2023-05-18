import { getAllCodesDirectly } from './getAllCodesDirectly'

type Keys = 'Prefijo' | 'Provincia' | 'Localidad'

export const getCodesDirectlyOnly = async (searchBy: Keys) => {
  try {
    const data = await getAllCodesDirectly()
    const filteredData = Array.from(
      new Set(data.map((code) => code?.[searchBy].trim()))
    ).sort((a, b) => {
      if (searchBy === 'Prefijo') return Number(a) - Number(b)
      return a.localeCompare(b)
    })

    return filteredData
  } catch (error) {
    console.log(
      'file: getCodesDirectlyBy.ts:5 ~ getCodesDirectlyBy ~ error:',
      error
    )
    return []
  }
}
