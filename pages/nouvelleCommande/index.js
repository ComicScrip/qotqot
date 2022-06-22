import axios from "axios";
import React from "react";
import { useState, useContext } from "react";
import { useEffect } from "react";
import LoadingSpin from "../../components/LoadingSpin";
import ProductItem from "../../components/ProductItem";
import Layout from "../../components/Layout";
import ConfirmationModal from "../../components/ConfirmationModal";
import CongratsModal from "../../components/CongratsModal";
import { CurrentUserContext } from "../../contexts/currentUserContext";

export default function NewOrder() {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { modal, setModal } = useContext(CurrentUserContext);
  const { modalCongrats, setModalCongrats } = useContext(CurrentUserContext);
  const { modalFranco } = useContext(CurrentUserContext);

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

  async function handleValidate() {
    setModal(!modal);
    setModalCongrats(!modalCongrats);
  }

  // const handleClose2 = () => {
  //   setModalC(false);
  // };

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

      {/* <style jsx>{`
  * {
      background-color: #E5E5E5;
  `}</style> */}
    </div>
  );

  return (
    <Layout pageTitle="nouvelle-commande">
      <>
        <div className="flex justify-center items-center text-center m-auto py-5">
          <button
            type="button"
            className=" bg-[#06968A] w-[90%] sm:w-[50%] cursor-pointer rounded-md p-4 uppercase text-sm h-12 text-center text-white font-bold"
            onClick={() => setModal(!modal)}
          >
            Confirmer la commande
          </button>
        </div>
        {modal && (
          <div
            className={
              modal ? "fixed bg-black/50 w-full h-full z-10 " : "bg-white"
            }
          >
            <ConfirmationModal handleValidate={handleValidate} />
          </div>
        )}
        {modalCongrats && (
          <div
            className={
              modalCongrats
                ? "fixed bg-black/50 w-full h-full z-10 "
                : "bg-white"
            }
          >
            <CongratsModal />
          </div>
        )}
        {modalFranco && (
          <div
            className={
              modalFranco ? "fixed bg-black/50 w-full h-full z-10 " : "bg-white"
            }
          >
            <CongratsModal />
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
