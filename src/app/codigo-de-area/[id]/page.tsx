import { FormatedAreaCodes } from '@/types'
import { getCodesByService } from '@/services'
import { BreadCrumps, TableComponent } from '@/components'

interface Props {
  params: Record<string, string>
}

const getCodesByPrefijo = async (areaCode: string) =>
  getCodesByService({ Prefijo: areaCode })

const getCodesByProvincia = async (prov: string) =>
  getCodesByService({ Provincia: prov })

export async function generateMetadata({ params }: Props) {
  const { id: areaCode } = params
  const codesByPrefijo: FormatedAreaCodes = await getCodesByPrefijo(areaCode)
  const { Provincia } = codesByPrefijo
  return {
    title: `Código de área ${areaCode}`,
    description: `El prefijo ${areaCode} corresponde a la provincia de ${Provincia}. Consultá otras caracteristicas telefónicas de ${Provincia}`,
  }
}

export default async function CodigoAreaPage({ params }: Props) {
  const { id: areaCode } = params
  const codesByPrefijo: FormatedAreaCodes = await getCodesByPrefijo(areaCode)
  const { Provincia } = codesByPrefijo
  const codesByProvincia: FormatedAreaCodes[] = await getCodesByProvincia(
    Provincia
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
            <h2 className="text-lg font-semibold">Prefijo {Provincia}</h2>
          </div>
        </div>

        <section>
          <h2 className="text-xl font-semibold my-8">
            Otras localidades con Código de área {areaCode}
          </h2>
          <div className="rounded-md border min-w-fit border-collapse w-fit">
            <TableComponent>
              {codesByProvincia
                .filter(({ Prefijo }) => Prefijo === areaCode)
                .map((code, index) => (
                  <tr key={`${Provincia}-${index}-${areaCode}`}>
                    <td className="border-collapse border border-slate-300 px-4">
                      {code.Localidad}
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
          <h2 className="text-xl font-semibold my-8">
            Otros Códigos de área de {Provincia}
          </h2>
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
                      {Prefijo}
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
