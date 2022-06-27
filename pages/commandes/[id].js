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
  const { orderNumberState } = useContext(CurrentUserContext);
  const [orderProductList, setOrderProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setError("");
    if (id) {
      axios
        .get(`/api/commandePassee/${id}`)
        .then((res) => res.data)
        .then((data) => setOrderProductList(data))
        .catch(() =>
          setError("Could not get data from the server, please try again")
        )
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const renderProducts = (
    <div className={style.homeBody}>
      {orderProductList
        .filter(
          (order) =>
            orderNumberState === order.orderNumber ||
            window.location.toString().includes(`${order.orderNumber}`)
        )
        .map((prod) => (
          <div className={style.product} key={prod.id}>
            <OrderProductItem
              key={prod.id}
              date={prod.date}
              orderNumber={prod.orderNumber}
              name={prod.name}
              weight={prod.weight}
              quantity={prod.quantity}
              price={prod.price}
              pricePerKg={prod.pricePerKg}
              picture={prod.picture ? prod.picture : ""}
              totalAmount={prod.totalAmount}
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
            Could not get data from the server, please try again
          </p>
        )}
        {isLoading ? <LoadingSpin /> : renderProducts}
      </>
    </Layout>
  );
}
