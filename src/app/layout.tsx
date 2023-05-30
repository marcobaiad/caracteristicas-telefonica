import { HeaderComponent } from '@/components'
import './globals.css'
import { Inter } from 'next/font/google'
import { GTMnoscript, GTMscript } from '@/components/Analytics/Analytics'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Códigos de Área y Prefijos telefónicos en Argentina',
  description:
    'Consulta acá la característica telefónica de cada provincia en argentina. Podes buscar por provincia o prefijo telefónico',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} md:px-14 lg:px-44 xl:px-96`}>
        <GTMnoscript />
        <HeaderComponent />
        {children}
      </body>
      <GTMscript />
    </html>
  )
}
