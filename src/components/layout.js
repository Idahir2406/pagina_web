import Navbar from "./navbar";
import { Chat } from "components/Chat"
import { useLogContext } from "hooks/useIsLoggedIn";
export const Layout = ({ children, session }) => {
  const { isLogged } = useLogContext();
  return (
    <>
      <Navbar session={session} />
      
      <div
        className="mt-5 w-[92%] mx-auto h-full "
      >
        {children}
      </div>
      {
        isLogged && <Chat />
      }
    </>
  );
};
