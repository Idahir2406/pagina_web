import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="dark" lang="es">
      <Head>
        <link
          rel="shortcut icon"
          href="https://firebasestorage.googleapis.com/v0/b/christmasstore-c5b20.appspot.com/o/shopping.ico?alt=media&token=d1e5082e-c434-45ad-beb3-b61c5953906a"
        />

      </Head>
      <body className="dark:bg-gray-700 min-h-screen bg-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
