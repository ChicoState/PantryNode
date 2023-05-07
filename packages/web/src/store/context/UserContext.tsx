import { createContext } from "react";
import UserContextType from "../../interface/User/UserContextType";

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
