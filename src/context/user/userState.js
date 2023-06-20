import React, { useReducer } from "react";
import UserContext from "./userContext";
import UserReducer from "./userReducer";

const UserState = ({ children }) => {
  const initialState = {
    user: {},
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const getUser = async (id) => {
    const res = await fetch(`http://localhost:3000/api/user/${id}`);
    const data = await res.json();
    dispatch({
      type: "GET_USER",
      payload: data,
    })
  };

  return (
    <UserContext.Provider
      value={{
        state,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
