import React, { useEffect, useState, useContext } from "react";
import Cart from "../../components/Cart";
import Layout from "../../components/Layout";
import LoadingSpin from "../../components/LoadingSpin";
import { CurrentUserContext } from "../../contexts/currentUserContext";
import ProgressBar from "@ramonak/react-progress-bar";
import ConfirmationModal from "../../components/ConfirmationModal";
import CongratsModal from "../../components/CongratsModal";
import Link from "next/link";
import styles from "../../styles/product_item.module.css";
import axios from "axios";
import { useRouter } from "next/router";

export default function Panier() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalCongrats, setModalCongrats] = useState(false);
  const [modalFranco, setModalFranco] = useState(false);
  const { cartItems, getCartItems } = useContext(CurrentUserContext);
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    setError("");
    getCartItems()
      .catch(() => setError("Couldnt get data from cart"))
      .finally(() => setIsLoading(false));
  }, [getCartItems]);

  const handleClose = () => {
    setModal(!modal);
  };

  const handleClose2 = () => {
    setModalCongrats(!modalCongrats);
  };

  const handleClose3 = () => {
    setModalFranco(!modalFranco);
  };

  const totalPrice = cartItems
    .reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0)
    .toFixed(2);

  const francoMin = 75 - totalPrice;

  const confirmPurchase = () => {
    setModalFranco(!modalFranco);
    setModalCongrats(!modalCongrats);
    setModal(false);
    handleCreateOrder();
  };

  const handleCreateOrder = () => {
    axios
      .post("/api/ordersProduct", { date, comment })
      .then(getCartItems)
      .then(router.push("/nouvelleCommande"))
      .catch(() => console.error("panier not working"));
  };

  async function handleConfirm() {
    if (totalPrice >= 75) {
      setModal(!modal);
      setModalCongrats(!modalCongrats);
      handleCreateOrder();
    } else {
      setModal(!modal);
      setModalFranco(!modalFranco);
    }
  }

  const renderProducts = (
    <div className="main_container">
      {cartItems.map((item) => (
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
    </div>
  );

  return (
    <>
      <Layout pageTitle="Panier">
        <div className={styles.arrow}>
          <Link href="/nouvelleCommande">
            <img src="/images/arrow.png" alt="arrow" width={20} height={20} />
          </Link>
        </div>
        <div className={styles.headCmd}>
          <div className={styles.priceTotal}>{totalPrice}€ HT</div>
          <button
            onClick={() => setModal(!modal)}
            className={
              cartItems.length === 0 ? styles.btnCartEmpty : styles.btnCart
            }
          >
            Confirmer la commande
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
          {modal && (
            <ConfirmationModal
              modal={modal}
              handleClose={handleClose}
              setModal={setModal}
              handleConfirm={handleConfirm}
              date={date}
              setDate={setDate}
              comment={comment}
              setComment={setComment}
            />
          )}

          {modalCongrats && (
            <CongratsModal
              confirmPurchase={confirmPurchase}
              modalCongrats={modalCongrats}
              handleClose2={handleClose2}
            />
          )}

          {modalFranco && (
            <CongratsModal
              confirmPurchase={confirmPurchase}
              setModalCongratsm={setModalCongrats}
              setModal={setModal}
              setModalFranco={setModalFranco}
              modalFranco={modalFranco}
              handleClose3={handleClose3}
              handleCreateOrder={handleCreateOrder}
            />
          )}
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
