import { getAllCodesDirectly } from './getAllCodesDirectly'

type Keys = 'Prefijo' | 'Provincia'

interface Args {
  Prefijo?: string
  Provincia?: string
}

export const getCodeDirectlyBy = async (args: Args) => {
  const [key, value] = Object.entries(args)?.[0]
  try {
    const data = await getAllCodesDirectly()
    return data.find((code) => code?.[key as Keys] === value)
  } catch (error) {
    console.log(
      'file: getCodeDirectlyBy.ts:5 ~ getCodeDirectlyBy ~ error:',
      error
    )
  }
}
