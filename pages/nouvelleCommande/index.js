import axios from "axios";
import React, { useState, useEffect } from "react";
import LoadingSpin from "../../components/LoadingSpin";
import ProductItem from "../../components/ProductItem";
import Layout from "../../components/Layout";
import { SearchModule } from "../../components/SearchModule";

export default function NewOrder() {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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
    padding: 100px 0 10px 0;
      background-color: #E5E5E5;
      height:100%;
  `}</style>
    </div>
  );

  return (
    <Layout pageTitle="Nouvelle commande">
      <>
        <SearchModule />
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
