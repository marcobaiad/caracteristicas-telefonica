import Link from 'next/link'
import { SearchInput } from '@/components'
import { getCodesDirectlyOnly } from '@/lib/getCodesDirectlyOnly'

const getData = async () => getCodesDirectlyOnly('Prefijo')

export default async function Home() {
  const data: string[] = await getData()
  return (
    <main>
      <article>
        <h1 className="text-center mt-10 mb-7 text-2xl font-semibold">
          Listado de todos los códigos de área telefónicos de Argentina
        </h1>
        <p>
          En caracteristicatelefonica.com, encontrarás todos los códigos de área
          de Argentina. Todas las características telefónicas por provincia y
          por prefijo.
        </p>
        <h2 className="my-7 text-lg font-semibold bg-gray-200 py-2 px-2 rounded-md">
          Encontrá aquí tu Código de Área
        </h2>
        <p>
          Usá nuestro buscador para encontrar el código de la localidad a la que
          quieres llamar o un código de área desde el que te llamaron para saber
          de que lugar es.
        </p>
        <SearchInput />
        <h2 className="mt-7 mb-10 text-lg font-semibold bg-gray-200 py-2 px-2 rounded-md">
          Códigos de Área Argentina
        </h2>
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns:
              'repeat(auto-fit, minmax(min(100%, 210px), 1fr))',
          }}
        >
          {data.map((cod, index) => (
            <Link
              key={`${cod}-${index}`}
              href={`codigo-de-area/${cod}`}
              className="text-center rounded-md shadow-lg whitespace-nowrap py-5 px-8 w-ful"
            >
              Código de área {cod}
            </Link>
          ))}
        </div>
      </article>
    </main>
  )
}
