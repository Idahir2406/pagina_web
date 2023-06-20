import { createContext,useState } from "react";

const QuantityContext = createContext();

export function QuantityProvider({ children }) {

  const [update, setUpdate] = useState(false);

  

  return <QuantityContext.Provider value={{update,setUpdate}}>{children}</QuantityContext.Provider>;
}

export default QuantityContext;
