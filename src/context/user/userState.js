import { useState, useEffect } from "react";
import UserContext from "./userContext";
import { useSession } from "next-auth/react";

const UserState = ({ children }) => {
  const [Loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const { data: session } = useSession();

  useEffect(() => {
    getUser();
  }, [session]);

  const getUser = async () => {
    if (!session) return;
    try {
      const res = await fetch(
        `/api/user/${session.user.email}`
      );
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
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        getUser,
        deleteUser,
        Loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
