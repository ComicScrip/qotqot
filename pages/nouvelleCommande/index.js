import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import LoadingSpin from "../../components/LoadingSpin";
import ProductItem from "../../components/ProductItem";
import Layout from "../../components/Layout";
import Link from "next/link";
import styles from "../../styles/product_item.module.css";
import { CurrentUserContext } from "../../contexts/currentUserContext";
import ProgressBar from "@ramonak/react-progress-bar";

export default function NewOrder() {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { cartItems } = useContext(CurrentUserContext);

  useEffect(() => {
    setError("");
    axios
      .get("/api/getProducts")
      .then((res) => res.data)
      .then((data) => setProductList(data))
      .catch(() =>
        setError("Could not get data from the server, please try again")
      )
      .finally(() => setIsLoading(false));
  }, []);

  const totalPrice = cartItems
    .reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0)
    .toFixed(2);

  const francoMin = 75 - totalPrice;

  const renderProducts = (
    <div className="main_container">
      {productList.map((prod) => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          codeProduit={prod.codeProduit}
          name={prod.name}
          weight={prod.weight}
          price={prod.price}
          pricePerKg={prod.pricePerKg}
          stock={prod.stock}
          picture={prod.picture ? prod.picture : ""}
          makerPicture={prod.makerPicture}
          makerName={prod.makerName}
          makerAdress={prod.makerAdress}
          productDesc={prod.descriptionProduit}
          makerDesc={prod.descriptionProducteur}
          logo={prod.logo}
          cartItem={prod.customerCartItem}
        />
      ))}

      <style jsx>{`
  * {
    padding: 10px 0;
      background-color: #E5E5E5;
  `}</style>
    </div>
  );

  return (
    <Layout pageTitle="Nouvelle commande">
      <div className={styles.arrow}>
        <Link href="/commandes">
          <img src="/images/arrow.png" alt="arrow" width={20} height={20} />
        </Link>
      </div>
      <div className={styles.headCmd}>
        <div className={styles.priceTotal}>{totalPrice}€ HT</div>
        <button className={styles.btnCart}>
          <Link href="/panier">Panier </Link>
        </button>
      </div>
      <div className={styles.francoText}>
        Plus que{" "}
        <span className={styles.franco}>
          {francoMin >= 0 ? francoMin.toFixed(2) : 0}€
        </span>{" "}
        pour le franco minimum
      </div>

      <ProgressBar
        completed={totalPrice}
        maxCompleted={75}
        className={styles.wrapper}
        barContainerClassName={styles.container}
        labelClassName={styles.label}
      />
      <>
        {error && (
          <p className="error">
            Could not get data from the server, please try again
          </p>
        )}
        {isLoading ? <LoadingSpin /> : renderProducts}
      </>
    </Layout>
  );
}
