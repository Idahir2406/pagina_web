import { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const LogContext = createContext();

export function LogProvider({ children }) {
  const { data: session, status } = useSession();
  const [isLogged, setIsLogged] = useState(!!session);
  const [redirectUrl, setRedirectUrl] = useState(null);
  useEffect(() => {
    setIsLogged(!!session);
  }, [session]);

  // Agregar un indicador de carga mientras se verifica la sesión
  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  const logout = () => {
    setIsLogged(false);
  }

  return (
    <LogContext.Provider value={{ isLogged, setIsLogged,logout,redirectUrl,setRedirectUrl }}>
      {children}
    </LogContext.Provider>
  );
}

export default LogContext;
