// import { MetadataRoute } from 'next';
import { getCodesOnlyService } from '@/services'
import { normalizeString, stringToSlug } from '@/utils'

const URL = 'https://caracteristicatelefonica.com'

export default async function sitemap() {
  const codes: string[] = await getCodesOnlyService('Prefijo')
  const provinces: string[] = await getCodesOnlyService('Provincia')

  const areaCodes = codes.map((areaCode) => ({
    url: `${URL}/codigo-de-area/${areaCode}`,
    lastModified: new Date().toISOString(),
  }))
  const states = provinces.map((province) => ({
    url: `${URL}/provincia/${stringToSlug(normalizeString(province))}`,
    lastModified: new Date().toISOString(),
  }))

  const routes = ['', '/provincia'].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }))

  return [...routes, ...areaCodes, ...states]
}
