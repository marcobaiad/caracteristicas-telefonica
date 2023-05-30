'use client'
import { useSelectedLayoutSegment } from 'next/navigation'
import Link from 'next/link'

export function HeaderComponent() {
  const selectedLayout = useSelectedLayoutSegment()

  return (
    <header className="mt-8 flex justify-center">
      <Link
        href="/"
        className="hidden md:block italic font-semibold leading-loose"
      >
        Caracteristica Telefónica
      </Link>

      <nav className="md:ml-auto max-w-max">
        <ul className="flex gap-2 max-w-max mr-5">
          <li
            className={`max-w-max rounded px-2 py-1 ${
              selectedLayout === 'codigo-de-area' || !selectedLayout
                ? 'font-medium bg-gray-200'
                : 'bg-gray-50'
            }`}
          >
            <Link href="/">Por Cod. Área</Link>
          </li>
          <li
            className={`max-w-max rounded px-2 py-1 ${
              selectedLayout === 'provincia'
                ? 'font-medium bg-gray-200'
                : 'bg-gray-50'
            }`}
          >
            <Link href="/provincia">Por Provincia</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
