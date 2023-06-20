import "../styles/globals.css";
import { Layout } from "../components/layout";
import { QuantityProvider } from "../context/quantityContext";
import { SessionProvider } from "next-auth/react";
import { SearchProvider } from "../context/searchContext";
import UserState from "../context/user/userState";
function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <UserState>
      <QuantityProvider>
        <SearchProvider>
          <SessionProvider session={pageProps.session}>
            <Layout session={pageProps.session}>
              {getLayout(<Component {...pageProps} />)}
            </Layout>
          </SessionProvider>
        </SearchProvider>
      </QuantityProvider>
    </UserState>
  );
}

export default MyApp;
