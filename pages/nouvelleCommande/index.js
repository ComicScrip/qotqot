/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ProductItem from "../../components/ProductItem";
// import s from "../../styles/nouvelleCommande.module.css";

export default function NouvelleCommande() {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");

    axios
      .get("/api/products")
      .then((res) => res.data)
      .then((data) => setProductList(data))
      .catch(() =>
        setError("Could not get data from the server, please try again")
      );
    setIsLoading(false);
  }, []);
  const renderProducts = (
    <div className="main_container">
      {productList.map((prod) => (
        <ProductItem
          key={prod.id}
          name={prod.name}
          weight={prod.weight}
          price={prod.price}
          pricePerKg={prod.pricePerKg}
          stock={prod.stock}
          picture={prod.picture ? prod.picture : ""}
        />
      ))}
      <style jsx>{`
  * {
      background-color: #E5E5E5;
  `}</style>
    </div>
  );
  return (
    <>
      {error && (
        <p className="error">
          Could not get data from the server, please try again
        </p>
      )}
      {isLoading ? (
        <img src="/images/Loading_icon.gif" alt="spin to win" />
      ) : (
        renderProducts
      )}
    </>
  );
}