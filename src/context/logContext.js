import { createContext,useState } from "react";

const LogContext = createContext();

export function LogProvider({ children }) {
  const [isLoged, setIsLoged] = useState(false);

  return <LogContext.Provider value={{isLoged,setIsLoged}}>{children}</LogContext.Provider>;
}

export default LogContext;
