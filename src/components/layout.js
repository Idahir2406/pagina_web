import Navbar from "./navbar";

export const Layout = ({ children, session }) => {
  return (
    <>
      <Navbar session={session} />
      
      <div
        className="mt-5 w-[92%] mx-auto h-full "
      >
        {children}
      </div>
      {/* <Chat /> */}
    </>
  );
};
