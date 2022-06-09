/* eslint-disable react/jsx-key */
import Layout from "../../components/Layout";
import OrderInProgress from "../../components/OrderInProgress";
import OrderPassed from "../../components/OrderPassed";
import styles from "../../styles/home.module.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function Home() {
  const [ordersList, setOrdersList] = useState([]);
  const [ordersListPassed, setOrdersListPassed] = useState([]);

  useEffect(() => {
    axios
      .get("/api/orders?status=pending")
      .then((res) => res.data)
      .then((data) => data)
      .then((data) => setOrdersList(data))
      .catch(() =>
        alert("Could not get data from the server, please try again")
      );
  }, []);

  useEffect(() => {
    axios
      .get("/api/orders?status=passed")
      .then((res) => res.data)
      .then((data) => data)
      .then((data) => setOrdersListPassed(data))
      .catch(() =>
        alert("Could not get data from the server, please try again")
      );
  }, []);
  console.log(ordersList);

  return (
    <>
      <Layout>
        <div className={styles.homeBody}>
          <div className={styles.home}>
            <button className={styles.nouvelleCommandeBtn}>
              NOUVELLE COMMANDE
            </button>
            <h2 className={styles.title}>Commandes à venir</h2>
            {ordersList.map((order) => (
              <div className={styles.displayCommande}>
                <OrderInProgress
                  key={order.id}
                  statut={order.statut}
                  dateLivraison={order.dateLivraison}
                />
              </div>
            ))}

            <h2 className={styles.title}>Commandes passées</h2>
            <div className={styles.displayCommande}>
              {ordersListPassed.map((order) => (
                <OrderPassed
                  key={order.id}
                  statut={order.statut}
                  dateLivraison={order.dateLivraison}
                />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
