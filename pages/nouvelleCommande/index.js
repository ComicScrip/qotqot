import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import LoadingSpin from "../../components/LoadingSpin";
import ProductItem from "../../components/ProductItem";
import Layout from "../../components/Layout";
import ConfirmationModal from "../../components/ConfirmationModal";

export default function NewOrder() {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);

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
    <Layout pageTitle="nouvelle-commande">
      <>
        <div className="flex justify-center items-center text-center m-auto my-3">
          <button
            type="button"
            className=" bg-[#06968A] w-[90%] cursor-pointer rounded-md p-4 uppercase text-sm h-12 text-center text-white font-bold"
            onClick={() => setModal(!modal)}
          >
            Confirmer la commande
          </button>
        </div>

        {modal && (
          <div className="fixed w-full h-screen bg-black/50">
            <ConfirmationModal />
          </div>
        )}
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
