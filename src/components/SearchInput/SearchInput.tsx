'use client'
import Link from 'next/link'
import { Search } from '@/types'
import { normalizeString, stringToSlug } from '@/utils'
import { useState, KeyboardEvent, useRef } from 'react'
import styles from './SearchInputStyles.module.css'
import { getCodesDirectlyBySearch } from '@/lib/getCodesDireclyBySearch'

let timeout: Awaited<ReturnType<typeof setTimeout>>

const searchTypes = {
  codigo: 'Ejemplo 11',
  provincia: 'Ejemplo Buenos Aires',
} as const

type Keys = keyof typeof searchTypes

const getSearchedData = async (val: string) =>
  await getCodesDirectlyBySearch(val)

export function SearchInput() {
  const [codes, setCodes] = useState<Search[]>()
  const [searchType, setSearchType] = useState<Keys>('codigo')
  const [loading, setLoading] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement
    console.log({
      code: e.code,
      match: !e.code.match(/Key|Digi|Numpad|Backspace|Delete|Enter/gi),
    })
    const match = e.code.match(/Key|Digi|Numpad|Backspace|Delete|Enter/gi)
    if (!value || !match || (match && e.ctrlKey)) return
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(async () => {
      if (!loading) setLoading(true)
      const data = await getSearchedData(value)
      setLoading(false)
      setCodes(data)
    }, 600)

    setCodes([])
  }

  const clear = () => {
    setCodes([])
    inputRef.current!.value = ''
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
            ref={inputRef}
            onKeyUp={onKeyUp}
            placeholder={searchTypes[searchType]}
            className="w-full px-2 outline-none"
          />
          <div className={styles.spinner} hidden={!loading} />
          <div
            className={`bg-gray-200 rounded-full text-white font-semibold absolute text-center cursor-pointer ${styles.clear}`}
            hidden={!codes?.length}
            onClick={clear}
          >
            x
          </div>
        </div>
        {codes?.length ? (
          <ul className="w-full bg-slate-50 h-24 border border-t-0 list-none rounded-b-md overflow-scroll overflow-x-hidden absolute">
            {codes?.map(({ code, Prefijo, Provincia }, index) => (
              <li
                key={`${index}-${code}`}
                className="border border-b-gray-100 px-2 hover:bg-gray-300 shadow-md py-1"
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
