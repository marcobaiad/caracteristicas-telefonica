/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-curly-brace-presence */
'use client'
import Script from 'next/script'

type WindowWithDataLayer = Window & {
  dataLayer: Record<string, any>[]
}

declare const window: WindowWithDataLayer

// window.dataLayer = window.dataLayer || []

export function GTMscript() {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-N4YHRHCP99"
      />
      <Script id="google-tag-manager">
        {`
          window.dataLayer = window.dataLayer || []
          function gtag(){
            window.dataLayer.push(arguments)
          }
          gtag('js', new Date());

          gtag('config', 'G-N4YHRHCP99')
        `}
      </Script>
    </>
  )
}

// export const GTMnoscript = () => (
//   <noscript
//     dangerouslySetInnerHTML={{
//       __html: `
//       <iframe src="https://www.googletagmanager.com/ns.html?id=G-N4YHRHCP99"
//       height="0" width="0" style="display:none;visibility:hidden"></iframe>
//     `,
//     }}
//   />
// )
