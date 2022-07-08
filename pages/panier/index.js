/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cart from "../../components/Cart";
import Layout from "../../components/Layout";
import LoadingSpin from "../../components/LoadingSpin";
import styles from "../../styles/product_item.module.css";
import Link from "next/link";

export default function Panier() {
  const [cartItemsList, setCartItemsList] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setError("");
    axios
      .get(`/api/customerCartItem`)
      .then((res) => res.data)
      .then((data) => {
        setCartItemsList(data);
      })
      .catch(() => setError("Couldnt get data from cart"))
      .finally(() => setIsLoading(false));
  }, []);

  const handleCreateOrder = (data) => {
    axios.post("/api/ordersProduct");
  };

  const renderProducts = (
    <div className="main_container">
      {cartItemsList.map((item) => (
        <Cart
          key={item.id}
          id={item.id}
          codeProduit={item.product.codeProduit}
          name={item.product.name}
          weight={item.product.weight}
          totalPrice={item.product.totalPrice}
          pricePerKg={item.product.pricePerKg}
          stock={item.product.stock}
          picture={item.product.picture ? item.product.picture : ""}
          Quantity={item.quantity}
          typeUVC={item.product.typeUVC}
          poidsUVC={item.product.poidsUVC}
          uniteUVC={item.product.uniteUVC}
          price={item.product.price}
        />
      ))}
      <style jsx>{`
  * {
    padding: 10px 0;
      background-color: #E5E5E5;
  `}</style>
    </div>
  );

  console.log(cartItemsList);

  return (
    <>
      <Layout pageTitle="Panier">
        <div className={styles.headCmd}>
          <div className={styles.priceTotal}>Prix total</div>
          <button onClick={handleCreateOrder} className={styles.btnCart}>
            Confirmer la commande
          </button>
        </div>
        <>
          {error && (
            <p className="error">
              Could not get data from the server, please try again
            </p>
          )}
          {isLoading ? <LoadingSpin /> : renderProducts}
        </>
      </Layout>
    </>
  );
}
