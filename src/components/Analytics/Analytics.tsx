/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-curly-brace-presence */
'use client'
import Script from 'next/script'

type WindowWithDataLayer = Window & {
  dataLayer: Record<string, any>[]
}

declare const window: WindowWithDataLayer

// window.dataLayer = window.dataLayer || []

export const GTMscript = () => (
  <>
    <Script id="window-dataLayer">{`window.dataLayer = window.dataLayer || [];`}</Script>
    <Script id="google-tag-manager" strategy="afterInteractive">
      {`
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', 'G-N4YHRHCP99')
    `}
    </Script>
  </>
)

export const GTMnoscript = () => (
  <noscript
    dangerouslySetInnerHTML={{
      __html: `
      <iframe src="https://www.googletagmanager.com/ns.html?id=G-N4YHRHCP99"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `,
    }}
  />
)
