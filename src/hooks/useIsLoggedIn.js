import { useState, useEffect, useMemo } from 'react';

const useIsLoggedIn = (session) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedInStatus = () => {
      // Lógica para verificar si el usuario está autenticado utilizando el dato de sesión
      const isLoggedIn = !!session; // Convertir a un valor booleano
      setIsLoggedIn(isLoggedIn);
    };

    checkLoggedInStatus();
  }, [session]);

  return useMemo(() => isLoggedIn, [isLoggedIn]);
};

export default useIsLoggedIn;
