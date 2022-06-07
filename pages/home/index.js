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
      .get("/api/orders")
      .then((res) => res.data)
      .then((data) => data.records)
      .then((data) => setOrdersList(data));
  }, []);

  useEffect(() => {
    axios
      .get("/api/ordersPassed")
      .then((res) => res.data)
      .then((data) => data.records)
      .then((data) => setOrdersListPassed(data));
  }, []);

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
              <div className="displayCommande">
                <OrderInProgress
                  key={order.fields.id}
                  DateLivraison={order.fields.DateLivraison}
                />
              </div>
            ))}
            <h2 className={styles.title}>Commandes passées</h2>
            {ordersListPassed.map((order) => (
              <div className="displayCommande">
                <OrderPassed
                  key={order.fields.id}
                  DateLivraison={order.fields.DateLivraison}
                />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}
