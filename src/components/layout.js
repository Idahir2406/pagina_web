import Navbar from "./navbar";
import { Chat } from "components/Chat"
export const Layout = ({ children, session }) => {
  return (
    <>
      <Navbar session={session} />
      
      <div
        className="mt-5 w-[92%] mx-auto h-full "
      >
        {children}
      </div>

      <Chat />
    </>
  );
};
