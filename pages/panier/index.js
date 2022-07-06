/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cart from "../../components/Cart";

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
        <Cart
          key={item.id}
          id={item.id}
          codeProduit={item.codeProduit}
          name={item.name}
          weight={item.weight}
          price={item.price}
          pricePerKg={item.pricePerKg}
          quantité={item.quantité}
          picture={item.picture ? item.picture : ""}
        />
      ))}
    </>
  );
}
