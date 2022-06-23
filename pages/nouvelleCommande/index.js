/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState, useEffect } from "react";
import LoadingSpin from "../../components/LoadingSpin";
import ProductItem from "../../components/ProductItem";
import Layout from "../../components/Layout";
import ConfirmationModal from "../../components/ConfirmationModal";
import CongratsModal from "../../components/CongratsModal";

export default function NewOrder() {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [modal, setModal] = useState(false);
  const [modalCongrats, setModalCongrats] = useState(false);
  const [modalFranco, setModalFranco] = useState(false);

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

  const showModalFranco = () => {
    setModalCongrats(!modalCongrats);
    setModalFranco(!modalFranco);
  };

  const handleClose = () => {
    setModal(!modal);
  };

  const handleClose2 = () => {
    setModalCongrats(!modalCongrats);
  };

  const handleClose3 = () => {
    setModalFranco(!modalFranco);
  };

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
            <ConfirmationModal
              modal={modal}
              handleValidate={handleValidate}
              handleClose={handleClose}
            />
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
            <CongratsModal
              modalCongrats={modalCongrats}
              showModalFranco={showModalFranco}
              handleClose2={handleClose2}
            />
          </div>
        )}
        {modalFranco && (
          <div
            className={
              modalFranco ? "fixed bg-black/50 w-full h-full z-10 " : "bg-white"
            }
          >
            <CongratsModal
              modalFranco={modalFranco}
              handleClose3={handleClose3}
            />
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
