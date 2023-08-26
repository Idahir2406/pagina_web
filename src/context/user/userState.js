import { useState, useEffect } from "react";
import UserContext from "./userContext";
import { useSession } from "next-auth/react";
import { useLogContext } from "../../hooks/useIsLoggedIn";
import useSWR from "swr";

const UserState = ({ children }) => {
  const [Loading, setLoading] = useState(true);
  const { isLogged } = useLogContext();
  const [user, setUser] = useState({
    email: "",
    name: "",
    addresses: [],
    paymentMethods: [],
    orders: [],
    wishList: [],
  });
  const { data: session } = useSession();
  // const { data, error, isLoading } = useSWR(`/api/user/${session?.user?.email}`, fetcher);
  // console.log(data, error, isLoading);
  useEffect(() => {
    getUser();
  }, [isLogged]);

  const getUser = async () => {
    if (!session) return;
    try {
      const res = await fetch(`/api/user/${session.user.email}`);
      const data = await res.json();
      setUser({
        ...user,
        ...data,
      });
    } catch (error) {
      console.log(error);
      return new Error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = () => {
    setUser({
      email: "",
      name: "",
      addresses: [],
      paymentMethods: [],
      orders: [],
      wishList: [],
    });
  };

  const updateUser = (data) => {
    setUser({
      ...user,
      ...data,
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        getUser,
        deleteUser,
        Loading,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
