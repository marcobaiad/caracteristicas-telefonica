import { formatCodesData } from '@/utils'

export const getAllCodesDirectly = async () => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_CODES_API_URL as string
    )
    if (!response.ok) throw new Error('Ocurrió un error')
    const { values }: { values: string[][] } = await response.json()
    values.splice(0, 2)
    const formatedCodesData = formatCodesData(values)
    return formatedCodesData
  } catch (error) {
    console.log(
      'file: getAllCodesDirectly.ts:5 ~ getAllCodesDirectly ~ error:',
      error
    )
    return []
  }
}
