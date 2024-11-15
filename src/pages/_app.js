import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Layout } from "../components/layout";
import { SessionProvider } from "next-auth/react";
import { SearchProvider } from "../context/searchContext";
import UserState from "../context/user/userState";
import { NextUIProvider } from "@nextui-org/react";
import { Inter } from "next/font/google";
import { LogProvider } from "../context/logContext";
import NextNProgress from "nextjs-progressbar";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"],weights: [400, 500, 600, 700] });
function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  const router = useRouter();
  return (
    <>
      <NextNProgress  color="#000" options={{
          showSpinner: false,
        }}/>
      <SessionProvider session={pageProps.session}>
        <LogProvider>
          <UserState>
            <SearchProvider>
              <NextUIProvider navigate={router.push}>
                <ThemeProvider enableSystem={true} attribute="class">
                  <Layout session={pageProps.session}>
                    {getLayout(
                      <main className={inter.className}>
                        <Component {...pageProps} />
                      </main>
                    )}
                  </Layout>
                </ThemeProvider>
              </NextUIProvider>
            </SearchProvider>
          </UserState>
        </LogProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
