import { FormatedAreaCodes } from '@/types'

export function formatCodesData(codes: string[][]) {
  const header = ['Localidad', 'Provincia', 'Prefijo']
  const formatedCodes = codes
    .reduce((accum = [], val) => {
      const data: FormatedAreaCodes = header.reduce(
        (codeAccum, code: string, index: number) => ({
          ...codeAccum,
          [code]: val[index],
        }),
        {} as FormatedAreaCodes
      )
      accum.push(data as any)
      return accum
    }, [] as FormatedAreaCodes[])
    .sort(
      (a, b) =>
        a?.Provincia?.localeCompare(b?.Provincia) ||
        Number(a.Prefijo) - Number(b.Prefijo) ||
        a?.Localidad!?.localeCompare(b?.Localidad!)
    )
  return formatedCodes
}
