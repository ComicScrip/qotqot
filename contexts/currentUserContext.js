import { signOut, useSession } from "next-auth/react";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useCallback } from "react";

export const CurrentUserContext = createContext({});

export default function CurrentUserContextProvider({ children }) {
  const { data, status } = useSession();
  console.log(data, status);

  // eslint-disable-next-line no-unused-vars
  const [currentUserProfile, setCurrentUserProfile] = useState(null);

  const getProfile = useCallback(() => {
    axios
      .get("/api/profile")
      .then(({ data }) => {
        setCurrentUserProfile(data);
      })
      .catch(() => {
        // when we have a stale cookie, disconnect
        signOut();
      });
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      getProfile();
    } else if (status === "unauthenticated") {
      setCurrentUserProfile(null);
    }
  }, [status, getProfile]);

  return (
    <CurrentUserContext.Provider value={{ name: "gui" }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
