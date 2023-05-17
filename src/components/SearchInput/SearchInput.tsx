'use client'
import { getCodesByService } from '@/services'
import { FormatedAreaCodes } from '@/types'
import { normalizeString, stringToSlug } from '@/utils'
import Link from 'next/link'
import { useState, KeyboardEvent } from 'react'

let timeout: Awaited<ReturnType<typeof setTimeout>>

const searchTypes = {
  codigo: 'Ejemplo 11',
  provincia: 'Ejemplo Buenos Aires',
} as const

type Keys = keyof typeof searchTypes

const getSearchedData = async (val: string) =>
  await getCodesByService({ Search: val })

export function SearchInput() {
  const [codes, setCodes] = useState<(FormatedAreaCodes & { code: string })[]>()
  const [searchType, setSearchType] = useState<Keys>('codigo')
  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement
    if (!value) return
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(async () => {
      const data = await getSearchedData(value)
      setCodes(data)
    }, 1000)

    setCodes(undefined)
  }
  return (
    <div className="my-5">
      <p className="my-5">
        Buscar por
        <span className="font-semibold capitalize">
          <select
            className="capitalize outline-none border rounded-sm bg-gray-200 ml-2"
            onChange={(e) => setSearchType(e.target.value as Keys)}
          >
            {Object.keys(searchTypes).map((key) => (
              <option key={key} className="capitalize">
                {key}
              </option>
            ))}
          </select>
        </span>
      </p>

      <div className="relative">
        <div className="bg-gray-200 border rounded-md p-3 relative">
          <input
            onKeyUp={onKeyUp}
            placeholder={searchTypes[searchType]}
            className="w-full px-2 outline-none"
          />
        </div>
        {codes?.length ? (
          <ul className="w-full bg-slate-50 h-24 border border-t-0 list-none rounded-b-md overflow-scroll overflow-x-hidden absolute">
            {codes?.map(({ code, Prefijo, Provincia }, index) => (
              <li
                key={`${index}-${code}`}
                className="border border-b-gray-300 px-2"
              >
                <Link
                  href={`/${
                    searchType.match(/codigo/gi)
                      ? 'codigo-de-area'
                      : 'provincia'
                  }/${
                    searchType.match(/codigo/gi)
                      ? Prefijo
                      : stringToSlug(normalizeString(Provincia))
                  }`}
                >
                  {code}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}
