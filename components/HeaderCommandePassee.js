import styles from "../styles/headerCommandePassee.module.css";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/currentUserContext";
import { useRouter } from "next/dist/client/router";

export default function HeaderCommandePassee() {
  const router = useRouter();
  const {
    orderStatut,
    orderNumberState,
    orderAmount,
    displayMenu,
    setDisplayMenu,
    deliveryDate,
    orderDate,
  } = useContext(CurrentUserContext);
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <div className={styles.divTitle}>
          <div className={styles.arrow}>
            <Link href="/commandes">
              <img src="/images/arrow.png" alt="arrow" width={40} height={40} />
            </Link>
          </div>
          <div className={styles.order}>
            <h1 className={styles.title}>
              Commande n° <span>{orderNumberState}</span>
            </h1>
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
            <div className={styles.accountDiv}>
              <button
                onClick={() => router.push("/compte")}
                className={styles.monCompte}
                data-cy="accountBtn"
              >
                Mon compte
              </button>
              <button
                onClick={() => signOut({ callbackUrl: window.location.origin })}
                className={styles.logout}
                data-cy="disconnectBtn"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
        <div className={styles.commandeDetails}>
          {orderStatut === "Livrée" ||
          orderStatut === "En cours" ||
          orderStatut === "Annulée" ? (
            <button
              className={styles.commandePrice}
            >{`${orderAmount}€ HT`}</button>
          ) : (
            ""
          )}
          {orderStatut === "Livrée" ? (
            <button
              className={styles.livraison1}
            >{`Livrée le ${deliveryDate}`}</button>
          ) : orderStatut === "En cours" ? (
            <button className={styles.livraison2}>
              {`Prévue pour le ${deliveryDate}`}
            </button>
          ) : orderStatut === "Annulée" ? (
            <button
              className={styles.livraison3}
            >{`Commande du ${orderDate} annulée`}</button>
          ) : (
            ""
          )}
        </div>
      </header>
    </div>
  );
}
