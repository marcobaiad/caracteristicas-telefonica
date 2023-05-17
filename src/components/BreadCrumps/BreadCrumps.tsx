'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

function BreadCrumps() {
  const path = usePathname()
  const pathSplitted = path.split('/')
  return (
    <div className="bg-gray-200 rounded-md px-5 mt-7 py-2">
      <span role="button">
        <Link href="/">Inicio</Link>
      </span>
      <span> / </span>
      {pathSplitted.map((section, index) => {
        if (section.match(/codigo/gi)) return null
        return (
          <Fragment key={`${path}-${index}`}>
            <Link href={path.match(/codigo/gi) ? path : section}>
              {section.replaceAll('-', ' ')}
            </Link>
            <span>
              {index && index + 1 !== pathSplitted.length ? ' / ' : ''}
            </span>
          </Fragment>
        )
      })}
    </div>
  )
}
export default BreadCrumps
