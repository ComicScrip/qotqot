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
      .get("/api/customerCartItem")
      .then((res) => res.data)
      .then((data) => setCartItemsList(data))
      .catch(() => setError("Couldnt get data from cart"));
  }, []);
  return (
    <>
      <div>Ceci est mon panier</div>
      {cartItemsList.map((item) => (
        <Cart
          key={item.id}
          id={item.id}
          codeProduit={item.codeProduit}
          name={item.name}
          weight={item.weight}
          totalPrice={item.totalPrice}
          pricePerKg={item.pricePerKg}
          stock={item.stock}
          picture={item.picture ? item.picture : ""}
          Quantity={item.Quantity}
          typeUVC={item.typeUVC}
          poidsUVC={item.poidsUVC}
          uniteUVC={item.uniteUVC}
        />
      ))}
    </>
  );
}
