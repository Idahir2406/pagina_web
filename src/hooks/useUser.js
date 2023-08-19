import { useContext } from "react";
import UserContext from "../context/user/userContext";

export const useUser = () => useContext(UserContext);
