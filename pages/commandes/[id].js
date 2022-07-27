import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import LoadingSpin from "../../components/LoadingSpin";
import OrderProductItem from "../../components/OrderProductItem";
import { useRouter } from "next/router";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/currentUserContext";
import Layout from "../../components/Layout";
import style from "../../styles/orderedProductItem.module.css";

export default function OrderHistory() {
  const {
    setOrderAmount,
    setOrderNumberState,
    setOrderStatut,
    setOrderDate,
    setDeliveryDate,
  } = useContext(CurrentUserContext);
  const [orderProductList, setOrderProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setError("");
    if (id) {
      axios
        .get(`/api/customerCartItem/${id}`)
        .then((res) => res.data)
        .then((data) => setOrderProductList(data))
        .catch(() =>
          setError(
            "Impossible d'obtenir les données du serveur, veuillez réessayer"
          )
        )
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  useEffect(() => {
    axios
      .get(`/api/orders/${id}`)
      .then((res) => res.data)
      .then((data) => data[0])
      .then((data) => {
        setOrderAmount(data.totalAmount);
        setOrderNumberState(data.orderNumber);
        setOrderStatut(data.statut);
        setOrderDate(data.dateCommande);
        setDeliveryDate(data.dateLivraison);
      })
      .catch(() =>
        console.log(
          "Impossible d'obtenir les données du serveur, veuillez réessayer"
        )
      ),
      [];
  });

  const renderProducts = (
    <div className={style.homeBody}>
      {orderProductList.map((prod) => (
        <div className={style.product} key={prod.id}>
          <OrderProductItem
            key={prod.product.id}
            orderNumber={prod.idOrder}
            name={prod.product.name}
            weight={prod.product.weight}
            poidsUVC={prod.product.poidsUVC}
            quantity={prod.quantity}
            price={prod.product.price}
            pricePerKg={prod.product.pricePerKg}
            picture={prod.product.picture ? prod.product.picture : ""}
            dateLivraison={prod.dateLivraison}
            statut={prod.statut}
          />
        </div>
      ))}
    </div>
  );

  return (
    <Layout pageTitle="detail-commande">
      <>
        {error && (
          <p className="error">
            Impossible d'obtenir les données du serveur, veuillez réessayer
          </p>
        )}
        {isLoading ? <LoadingSpin /> : renderProducts}
      </>
    </Layout>
  );
}
