import { createContext, useContext, useState } from "react";

type AppUser = {
  token: string;
  id: string;
  types: ["missionary" | "ministery"] | [];
};

type AppContextType = {
  user: AppUser;
  setUser: (user: AppUser) => void;
};

const initialContext: AppContextType = {
  user: {
    token: "",
    id: "",
    types: ["missionary"],
  },
  setUser: () => {},
};

const AppContext = createContext<AppContextType>(initialContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [appState, setAppState] = useState<AppContextType>(initialContext);

  const setUser = (user: AppUser) => setAppState((p) => ({ ...p, user }));

  return (
    <AppContext.Provider value={{ ...appState, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
