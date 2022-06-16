import { useState } from "react";
import styles from "../styles/headerCommandePassee.module.css";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/currentUserContext";

export default function HeaderCommandePassee() {
  const [displayMenu, setDisplayMenu] = useState(false);
  const { orderStatut, orderDate, orderNumberState, orderAmount } =
    useContext(CurrentUserContext);
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  return (
    <header className={styles.header}>
      <div className={styles.divTitle}>
        <div className={styles.arrow}>
          <Link href="/commandes">
            <img src="/images/arrow.png" alt="arrow" width={40} height={40} />
          </Link>
        </div>
        <div className={styles.order}>
          <h1 className={styles.title}>Commande n° {orderNumberState}</h1>
          <p className={styles.date}>
            {today
              .toLocaleDateString("fr-FR", options)
              .charAt(0)
              .toUpperCase() +
              today.toLocaleDateString("fr-FR", options).slice(1)}
          </p>
        </div>
        <button
          className={styles.menu}
          onClick={() => setDisplayMenu(!displayMenu)}
          data-cy="menu"
        >
          ...
        </button>
        {displayMenu && (
          <button
            onClick={() => signOut({ callbackUrl: window.location.origin })}
            className={styles.logout}
            data-cy="disconnectBtn"
          >
            Déconnexion
          </button>
        )}
      </div>
      <div className={styles.commandeDetails}>
        <button className={styles.commandePrice}>{`${orderAmount}€ HT`}</button>
        {orderStatut === "Livrée" ? (
          <button
            className={styles.livraison1}
          >{`Livrée le ${orderDate}`}</button>
        ) : orderStatut === "En-cours" ? (
          <button className={styles.livraison2}>
            {`Prévue pour le ${orderDate}`}
          </button>
        ) : orderStatut === "Annulée" ? (
          <button
            className={styles.livraison3}
          >{`Annulée le ${orderDate}`}</button>
        ) : (
          ""
        )}
      </div>
    </header>
  );
}
