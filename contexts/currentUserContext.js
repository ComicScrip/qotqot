import { signOut, useSession } from "next-auth/react";
import { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useCallback } from "react";

export const CurrentUserContext = createContext({});

export default function CurrentUserContextProvider({ children }) {
  const { data, status } = useSession();
  console.log(data, status);

  const [currentUserProfile, setCurrentUserProfile] = useState(null);

  const currentUserLogged = useMemo(
    () => currentUserProfile,
    [currentUserProfile]
  );

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

  console.log(currentUserProfile);

  useEffect(() => {
    if (status === "authenticated") {
      getProfile();
    } else if (status === "unauthenticated") {
      setCurrentUserProfile(null);
    }
  }, [status, getProfile]);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUserProfile,
        currentUserLogged,
        setCurrentUserProfile,
        getProfile,
        status,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}
