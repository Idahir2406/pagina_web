import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Layout } from "../components/layout";
import { SessionProvider } from "next-auth/react";
import { SearchProvider } from "../context/searchContext";
import UserState from "../context/user/userState";
import { NextUIProvider } from "@nextui-org/react";
import { Inter } from "next/font/google";
import {LogProvider} from "../context/logContext";
const inter = Inter({ subsets: ["latin"] });
function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <SessionProvider session={pageProps.session}>
      <LogProvider>
        <UserState>
          <SearchProvider>
            <NextUIProvider>
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
  );
}

export default MyApp;
