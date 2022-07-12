import axios from "axios";
import LoadingSpin from "../../components/LoadingSpin";
import ProductItem from "../../components/ProductItem";
import Layout from "../../components/Layout";
import ConfirmationModal from "../../components/ConfirmationModal";
import CongratsModal from "../../components/CongratsModal";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import styles from "../../styles/product_item.module.css";
import { CurrentUserContext } from "../../contexts/currentUserContext";
import ProgressBar from "@ramonak/react-progress-bar";

export default function NewOrder() {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);
  const [modalCongrats, setModalCongrats] = useState(false);
  const [modalFranco, setModalFranco] = useState(false);
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

  const handleClose = () => {
    setModal(!modal);
  };

  const handleClose2 = () => {
    setModalCongrats(!modalCongrats);
  };

  const handleClose3 = () => {
    setModalFranco(!modalFranco);
  };

  const confirmPurchase = () => {
    setModalFranco(!modalFranco);
    setModalCongrats(!modalCongrats);
    setModal(false);
  };

  const totalPrice = cartItems
    .reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0)
    .toFixed(2);

  const francoMin = 75 - totalPrice;

  async function handleValidate() {
    if (totalPrice >= 75) {
      setModal(!modal);
      setModalCongrats(!modalCongrats);
    } else {
      setModal(!modal);
      setModalFranco(!modalFranco);
    }
  }

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
          makerPicture={prod.makerPicture}
          makerName={prod.makerName}
          makerAdress={prod.makerAdress}
          productDesc={prod.descriptionProduit}
          makerDesc={prod.descriptionProducteur}
          logo={prod.logo}
          cartItem={prod.customerCartItem}
        />
      ))}
    </div>
  );

  return (
    <>
      <Layout pageTitle="nouvelle-commande">
        <div className={styles.arrow}>
          <Link href="/commandes">
            <img src="/images/arrow.png" alt="arrow" width={20} height={20} />
          </Link>
        </div>
        <div className={styles.headCmd}>
          <div className={styles.priceTotal}>{totalPrice}€ HT</div>
          <Link href="/panier">
            <button className={styles.btnCart}>Panier </button>
          </Link>
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

        <div className="flex justify-center items-center text-center m-auto py-5">
          <button
            type="button"
            className=" bg-[#06968A] w-[90%] sm:w-[50%] cursor-pointer rounded-md p-4 uppercase text-sm h-12 text-center text-white font-bold"
            onClick={() => setModal(!modal)}
          >
            Confirmer la commande
          </button>
        </div>
        <>
          {modal && (
            <ConfirmationModal
              modal={modal}
              handleValidate={handleValidate}
              handleClose={handleClose}
            />
          )}

          {modalCongrats && (
            <CongratsModal
              modalCongrats={modalCongrats}
              showModalFranco={handleValidate}
              handleClose2={handleClose2}
            />
          )}

          {modalFranco && (
            <CongratsModal
              modalFranco={modalFranco}
              handleClose3={handleClose3}
              confirmPurchase={confirmPurchase}
            />
          )}

          {error && (
            <p className="error">
              Could not get data from the server, please try again
            </p>
          )}
        </>
        {isLoading ? <LoadingSpin /> : renderProducts}
      </Layout>
    </>
  );
}
