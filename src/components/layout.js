import Navbar from "./navbar";
// import { Chat } from "components/Chat"
import dynamic from "next/dynamic";
import { useLogContext } from "hooks/useIsLoggedIn";
import { Link as NextLink } from "@nextui-org/react";
import Link from "next/link";

export const Layout = ({ children, session }) => {
  const { isLogged } = useLogContext();
  return (
    <>
      <Navbar session={session} />
      
      <main
        className="my-5 w-[92%] mx-auto min-h-screen "
      >
        {children}
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>
          &copy; 2024 Christmas Store | Desarrollado por{" "}
          <NextLink as={Link} href="https://irvingidahir.vercel.app/" isExternal>
            Irving Idahir
          </NextLink>
          </p>
          
      </footer>
    </>
  );
};
