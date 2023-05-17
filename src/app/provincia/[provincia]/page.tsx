import { FormatedAreaCodes } from '@/types'
import { getCodesByService } from '@/services'
import { BreadCrumps, TableComponent } from '@/components'

interface Props {
  params: Record<string, string>
}

const getCodesByProvincia = async (prov: string) =>
  getCodesByService({ Provincia: prov })

export async function generateMetadata({ params }: Props) {
  const { provincia } = params
  const codesByProvincia: FormatedAreaCodes[] = await getCodesByProvincia(
    provincia.replaceAll('-', ' ')
  )
  const { Provincia, Prefijo } = codesByProvincia?.[0] || {}
  return {
    title: `Carácteristica de ${Provincia}`,
    description: `El código de área de ${Provincia} es ${Prefijo}. Consultá todos los prefijos de ${Provincia} acá`,
  }
}

export default async function ProvincePage({ params }: Props) {
  const { provincia } = params
  const codesByProvincia: FormatedAreaCodes[] = await getCodesByProvincia(
    provincia.replaceAll('-', ' ')
  )
  const { Provincia, Prefijo } = codesByProvincia?.[0] || {}

  return (
    <main>
      <BreadCrumps />
      <article className="my-10">
        <div className="flex justify-center">
          <div className="border rounded-md bg-gray-200 w-max text-center p-10">
            <h1 className="text-4xl font-semibold mb-3">Prefijo {Provincia}</h1>
            <h2 className="text-lg font-semibold">Código de área {Prefijo}</h2>
          </div>
        </div>
        <section>
          <h2 className="text-xl font-semibold my-8">
            Otros Códigos de área de {Provincia}
          </h2>
          <div className="rounded-md border min-w-fit border-collapse w-fit">
            <TableComponent>
              {codesByProvincia.map(({ Localidad, Prefijo }, index) => (
                <tr key={`${Localidad}-${Prefijo}-${index}`}>
                  <td
                    className="border-collapse border border-slate-300 px-4"
                    title={`Caracteristica telefónica ${Localidad}`}
                  >
                    {Localidad}
                  </td>
                  <td
                    className="border-collapse border border-slate-300 text-center"
                    title={`Código de área ${Prefijo}`}
                  >
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
