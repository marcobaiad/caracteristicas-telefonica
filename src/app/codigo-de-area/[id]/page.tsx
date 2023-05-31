import { FormatedAreaCodes } from '@/types'
import { BreadCrumps, TableComponent } from '@/components'
import { getCodeDirectlyBy } from '@/lib/getCodeDirectlyBy'
import { getCodesDirectlyByProvince } from '@/lib/getCodesDirectlyByProvince'
import Link from 'next/link'
import { stringToSlug } from '@/utils'

interface Props {
  params: Record<string, string>
}

const getCodesByPrefijo = async (Prefijo: string) =>
  getCodeDirectlyBy({ Prefijo })

const getCodesByProvincia = async (Provincia: string) =>
  getCodesDirectlyByProvince(Provincia)

export async function generateMetadata({ params }: Props) {
  const { id: areaCode } = params
  const codesByPrefijo: FormatedAreaCodes | undefined = await getCodesByPrefijo(
    areaCode
  )
  const { Provincia } = codesByPrefijo || {}
  return {
    title: `Código de área ${areaCode} - Argentina`,
    description: `El prefijo ${areaCode} corresponde a la provincia de ${Provincia}. Consultá otras caracteristicas telefónicas de ${Provincia}`,
  }
}

export default async function CodigoAreaPage({ params }: Props) {
  const { id: areaCode } = params
  const codesByPrefijo: FormatedAreaCodes | undefined = await getCodesByPrefijo(
    areaCode
  )
  const { Provincia } = codesByPrefijo || {}
  const codesByProvincia: FormatedAreaCodes[] = await getCodesByProvincia(
    Provincia!
  )

  return (
    <main>
      <BreadCrumps />
      <article className="my-10">
        <div className="flex justify-center">
          <div className="border rounded-md bg-gray-200 w-max text-center p-10">
            <h1 className="text-4xl font-semibold mb-3">
              Código de área {areaCode}
            </h1>
            <h2 className="text-lg font-semibold">
              Prefijo{' '}
              <Link
                className="text-blue-400 hover:text-xl"
                href={`/provincia/${stringToSlug(Provincia!)}`}
              >
                {Provincia}
              </Link>
            </h2>
          </div>
        </div>
        <p className="mt-10">
          El <strong>prefijo {areaCode}</strong> corresponde a la carácteristica
          telefónica de la provincia de
          <strong> {Provincia}</strong>.
        </p>
        <section>
          <h2 className="text-xl font-semibold my-6 bg-gray-200 py-2 px-2 rounded-md">
            Localidades con Código de área {areaCode}
          </h2>
          <p className="mb-6">
            En la siguiente tabla podrás encontrar todas las localidades con
            prefijo teléfonico {areaCode} de la provincia de {Provincia}.
          </p>
          <div className="rounded-md border min-w-fit border-collapse w-fit">
            <TableComponent>
              {codesByProvincia
                .filter(({ Prefijo }) => Prefijo === areaCode)
                .map((code, index) => (
                  <tr key={`${Provincia}-${index}-${areaCode}`}>
                    <td className="border-collapse border border-slate-300 px-4">
                      {code.Localidad!}
                    </td>
                    <td className="border-collapse border border-slate-300 text-center">
                      {code.Prefijo}
                    </td>
                  </tr>
                ))}
            </TableComponent>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold my-6 bg-gray-200 py-2 px-2 rounded-md">
            Otros Códigos de área de {Provincia}
          </h2>
          <p className="mb-6">
            Tal vez te pueda interesar conocer todas las características
            telefónicas de las localidades de {Provincia}.
          </p>
          <div className="rounded-md border min-w-fit border-collapse w-fit">
            <TableComponent>
              {codesByProvincia
                .filter(({ Prefijo }) => Prefijo !== areaCode)
                .map(({ Localidad, Prefijo }, index) => (
                  <tr key={`${Provincia}-${index}-${areaCode}`}>
                    <td
                      className="border-collapse border border-slate-300 px-4"
                      title={` ${Localidad}`}
                    >
                      {Localidad}
                    </td>
                    <td className="border-collapse border border-slate-300 text-center">
                      <Link
                        className="block text-blue-400"
                        href={`/codigo-de-area/${Prefijo}`}
                      >
                        {Prefijo}
                      </Link>
                    </td>
                  </tr>
                ))}
            </TableComponent>
          </div>
        </section>
      </article>
    </main>
  )
}
