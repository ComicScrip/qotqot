import { createContext } from "react";
import { useSession } from "next-auth/react";

export const CurrentUserContext = createContext({});

export default function CurrentUserContextProvider({ children }) {
  const { data, status } = useSession();
  console.log(data, status);

  return (
    <CurrentUserContext.Provider value={{ name: "gui" }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
