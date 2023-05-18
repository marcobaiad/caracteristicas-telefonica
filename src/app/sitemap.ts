import { MetadataRoute } from 'next'
import { getCodesOnlyService } from '@/services'
import { normalizeString, stringToSlug } from '@/utils'
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const codes: string[] = await getCodesOnlyService('Prefijo')
  const provinces: string[] = await getCodesOnlyService('Provincia')

  const areaCodes = codes.map((areaCode) => ({
    url: `${
      process.env.NEXT_PUBLIC_API_URL || process.env.API_URL
    }/codigo-de-area/${areaCode}`,
    lastModified: new Date(),
  }))
  const states = provinces.map((province) => ({
    url: `${
      process.env.NEXT_PUBLIC_API_URL || process.env.API_URL
    }/provincia/${stringToSlug(normalizeString(province))}`,
    lastModified: new Date(),
  }))

  const routes = ['', '/provincia'].map((route) => ({
    url: `${process.env.NEXT_PUBLIC_API_URL || process.env.API_URL}${route}`,
    lastModified: new Date(),
  }))

  return [...routes, ...areaCodes, ...states]
}
