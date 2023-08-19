import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className='dark' lang="es">
      <Head/>
      <body className='dark:bg-gray-700 min-h-screen bg-gray-100'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
