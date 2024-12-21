import { createContext, useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Spinner } from "@nextui-org/react";
const LogContext = createContext();

export function LogProvider({ children }) {
  const { data: session, status } = useSession();
  const [isLogged, setIsLogged] = useState(!!session);
  const [redirectUrl, setRedirectUrl] = useState(null);
  const handleLogginState = () => {
    if (session) return setIsLogged(true);
  };

  useEffect(() => {
    handleLogginState();
  }, [session]);

  // // Agregar un indicador de carga mientras se verifica la sesión

  // if (status === "loading") {
  //   return (
  //     <div className="flex justify-center items-center h-screen bg-gray-200 dark:bg-slate-800">
  //       <div className="flex flex-col items-center justify-center gap-4">
  //         <Spinner size="lg" color="secondary" />
  //         <p>Cargando...</p>
  //       </div>
  //     </div>
  //   );
  // }

  const logout = () => {
    setIsLogged(false);
  };

  return (
    <LogContext.Provider
      value={{ isLogged, setIsLogged, logout, redirectUrl, setRedirectUrl }}
    >
      {children}
    </LogContext.Provider>
  );
}

export default LogContext;
