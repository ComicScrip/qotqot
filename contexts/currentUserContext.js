import { useSession } from "next-auth/react";
import { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useCallback } from "react";

export const CurrentUserContext = createContext({});

export default function CurrentUserContextProvider({ children }) {
  const { status } = useSession();

  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [orderNumberState, setOrderNumberState] = useState("");
  const [orderStatut, setOrderStatut] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [orderAmount, setOrderAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [displayMenu, setDisplayMenu] = useState(false);

  const currentUserLogged = useMemo(
    () => currentUserProfile,
    [currentUserProfile]
  );

  const totalPrice = cartItems
    .reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0)
    .toFixed(2);

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

  const getCartItems = useCallback(() => {
    return axios
      .get("/api/customerCartItem")
      .then((res) => res.data)
      .then((data) => setCartItems(data))
      .catch(() =>
        console.log("Could not get data from the server, please try again")
      );
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      getProfile();
    } else if (status === "unauthenticated") {
      setCurrentUserProfile(null);
    }
  }, [status, getProfile]);

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUserProfile,
        currentUserLogged,
        setCurrentUserProfile,
        getProfile,
        status,
        orderNumberState,
        setOrderNumberState,
        orderStatut,
        setOrderStatut,
        orderDate,
        setOrderDate,
        orderAmount,
        setOrderAmount,
        isLoading,
        setIsLoading,
        cartItems,
        setCartItems,
        getCartItems,
        modal,
        setModal,
        displayMenu,
        setDisplayMenu,
        totalPrice,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}
