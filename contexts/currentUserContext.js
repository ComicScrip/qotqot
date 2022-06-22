import { useSession } from "next-auth/react";
import { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useCallback } from "react";

export const CurrentUserContext = createContext({});

export default function CurrentUserContextProvider({ children }) {
  const { status } = useSession();

  const [currentUserProfile, setCurrentUserProfile] = useState(null);

  const [modal, setModal] = useState(false);
  const [modalCongrats, setModalCongrats] = useState(false);
  const [modalFranco, setModalFranco] = useState(false);

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
        // signOut();
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
    <CurrentUserContext.Provider
      value={{
        currentUserProfile,
        currentUserLogged,
        setCurrentUserProfile,
        getProfile,
        status,
        modal,
        setModal,
        modalCongrats,
        setModalCongrats,
        modalFranco,
        setModalFranco,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}
