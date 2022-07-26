import Link from "next/link";
import Layout from "../../components/Layout";
import Order from "../../components/Order";
import styles from "../../styles/home.module.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function Home() {
  const [ordersList, setOrdersList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    axios
      .get("/api/orders")
      .then((res) => res.data)
      .then((data) => data)
      .then((data) => {
        setOrdersList(data);
        console.log(ordersList);
      })
      .catch(() =>
        setError("Could not get data from the server, please try again")
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
              {ordersList
                .filter((statut) => statut.statut === "En cours")
                .map((order) => (
                  <Order
                    key={order.id}
                    statut={order.statut}
                    dateCommande={order.dateCommande}
                    orderNumber={order.orderNumber}
                    totalAmount={order.totalAmount}
                    dateLivraison={order.dateLivraison}
                  />
                ))}
            </div>

            <h2 className={styles.title}>Commandes passées</h2>
            <div className={styles.displayCommande}>
              {ordersList
                .filter(
                  (statut) =>
                    statut.statut === "Livrée" || statut.statut === "Annulée"
                )
                .map((order) => (
                  <Order
                    key={order.id}
                    statut={order.statut}
                    dateCommande={order.dateCommande}
                    orderNumber={order.orderNumber}
                    totalAmount={order.totalAmount}
                    productsIdList={order.productsIdList}
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
