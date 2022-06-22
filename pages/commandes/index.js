/* eslint-disable react/jsx-key */
import Link from "next/link";
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
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    axios
      .get("/api/orders?status=pending")
      .then((res) => res.data)
      .then((data) => data)
      .then((data) => setOrdersList(data))
      .catch(() =>
        setError("Could not get data from the server, please try again")
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

  return (
    <>
      <Layout pageTitle="commandes">
        {error && (
          <p className="error">
            Could not get data from the server, please try again
          </p>
        )}
        <div className={styles.homeBody}>
          <div className={styles.home}>
            <Link href="/nouvelleCommande">
              <button className={styles.nouvelleCommandeBtn}>
                NOUVELLE COMMANDE
              </button>
            </Link>
            <h2 className={styles.title}>Commandes à venir</h2>
            <div className={styles.displayCommande}>
              {ordersList.map((order) => (
                <OrderInProgress
                  key={order.id}
                  statut={order.statut}
                  dateLivraison={order.dateLivraison}
                  orderNumber={order.orderNumber}
                  totalAmount={order.totalAmount}
                />
              ))}
            </div>

            <h2 className={styles.title}>Commandes passées</h2>
            <div className={styles.displayCommande}>
              {ordersListPassed.map((order) => (
                <OrderPassed
                  key={order.id}
                  statut={order.statut}
                  dateLivraison={order.dateLivraison}
                  orderNumber={order.orderNumber}
                  totalAmount={order.totalAmount}
                />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
