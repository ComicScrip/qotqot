import React, { useEffect, useState, useContext } from "react";
import Cart from "../../components/Cart";
import Layout from "../../components/Layout";
import LoadingSpin from "../../components/LoadingSpin";
import { CurrentUserContext } from "../../contexts/currentUserContext";
import ConfirmationModal from "../../components/ConfirmationModal";
import CongratsModal from "../../components/CongratsModal";
import styles from "../../styles/product_item.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import emptyCartImg from "../../public/images/emptyCart.png";

export default function Panier() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [modalCongrats, setModalCongrats] = useState(false);
  const [modalFranco, setModalFranco] = useState(false);
  const { cartItems, getCartItems, modal, setModal } =
    useContext(CurrentUserContext);
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
    <div className={styles.main_container}>
      {cartItems.map((item) => (
        <div key={item.id}>
          <Cart
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
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Layout pageTitle="Panier">
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
          {isLoading ? (
            <LoadingSpin />
          ) : totalPrice === "0.00" ? (
            <div className="flex justify-center items-center flex-col mt-[30%]">
              <Image
                src={emptyCartImg}
                alt="empty cart"
                width={150}
                height={150}
              />
              <p className="text-[#676767] text-[16px] md:text-[18px]">
                Votre panier est vide... 🙁
              </p>
            </div>
          ) : (
            renderProducts
          )}
        </>
      </Layout>
    </>
  );
}
