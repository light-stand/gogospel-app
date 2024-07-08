import { createContext, useContext, useState } from "react";
import { User } from "../domain/User";

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};

const initialContext: UserContextType = {
  user: {
    id: "",
    types: ["missionary"],
  },
  setUser: () => {},
};

const UserContext = createContext<UserContextType>(initialContext);

export const useUserContext = () => useContext(UserContext);

export const UserProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [userState, setUserState] = useState<UserContextType>(initialContext);

  const setUser = (user: User) => setUserState((p) => ({ ...p, user }));

  return (
    <UserContext.Provider value={{ ...userState, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
