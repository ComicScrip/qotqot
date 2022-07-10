/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Panier() {
  const [cartItemsList, setCartItemsList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    axios
      .get("/api/getCartItems")
      .then((res) => res.data)
      .then((data) => setCartItemsList(data))
      .catch(() => setError("Couldnt get data from cart"));
  }, []);
  return (
    <>
      <div>Ceci est mon panier</div>
      {console.log(cartItemsList)}
      {cartItemsList.map((item) => (
        <p key={item.id}>{item.id}</p>
      ))}
    </>
  );
}
