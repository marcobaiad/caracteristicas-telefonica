import { FormatedAreaCodes } from '@/types'
import { BreadCrumps, TableComponent } from '@/components'
import { getCodesDirectlyByProvince } from '@/lib/getCodesDirectlyByProvince'
import Link from 'next/link'

interface Props {
  params: Record<string, string>
}

const getCodesByProvincia = async (Provincia: string) =>
  getCodesDirectlyByProvince(Provincia)

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
            <h2 className="text-lg font-semibold">
              Código de área{' '}
              <Link
                className="text-blue-400 hover:text-xl"
                href={`/codigo-de-area/${Prefijo}`}
              >
                {Prefijo}
              </Link>
            </h2>
          </div>
        </div>
        <p className="mt-10">
          La característica telefónica de <strong> {Provincia}</strong> es el
          <strong> prefijo {Prefijo}</strong>.
        </p>
        <section>
          <h2 className="text-xl font-semibold my-6 bg-gray-200 py-2 px-2 rounded-md">
            Localdiades de {Provincia} con Código de área {Prefijo}
          </h2>
          <p className="mb-6">
            Tal vez te pueda interesar conocer todas las localidades de{' '}
            {Provincia} que tienen
            <strong> característica telefónica {Prefijo}</strong>.
          </p>
          <div className="rounded-md border min-w-fit border-collapse w-fit">
            <TableComponent>
              {codesByProvincia
                .filter(({ Prefijo: Prev }) => Prev === Prefijo)
                .map(({ Localidad, Prefijo }, index) => (
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
        <section>
          <h2 className="text-xl font-semibold my-6 bg-gray-200 py-2 px-2 rounded-md">
            Otros prefijos de las localdiades de {Provincia}
          </h2>
          <p className="mb-6">
            Tal vez te pueda interesar conocer todos los prefijos de las
            localidades de <strong> {Provincia}</strong>.
          </p>
          <div className="rounded-md border min-w-fit border-collapse w-fit">
            <TableComponent>
              {codesByProvincia
                .filter(({ Prefijo: Prev }) => Prev !== Prefijo)
                .map(({ Localidad, Prefijo }, index) => (
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
                      <Link
                        className="text-blue-400 block"
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
