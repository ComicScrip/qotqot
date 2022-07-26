import { useContext } from "react";
import styles from "../styles/headerNouvelleCommande.module.css";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { CurrentUserContext } from "../contexts/currentUserContext";
import ProgressBar from "@ramonak/react-progress-bar";
import { useRouter } from "next/router";

export default function HeaderNouvelleCommande() {
  const router = useRouter();
  const { cartItems, displayMenu, setDisplayMenu } =
    useContext(CurrentUserContext);
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  const totalPrice = cartItems
    .reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0)
    .toFixed(2);

  const francoMin = 75 - totalPrice;

  return (
    <header>
      <div
        style={{
          width: "100%",
          position: "fixed",
          "z-index": "1",
          "background-color": "white",
          top: "0",
        }}
      >
        <div className={styles.divTitle}>
          <div className={styles.info}>
            <div className={styles.arrow}>
              <Link href="/commandes">
                <img
                  src="/images/arrow.png"
                  alt="arrow"
                  width={20}
                  height={20}
                />
              </Link>
            </div>
            <div>
              <h1 className={styles.title}>Nouvelle commande 📋</h1>
              <p className={styles.date}>
                {today
                  .toLocaleDateString("fr-FR", options)
                  .charAt(0)
                  .toUpperCase() +
                  today.toLocaleDateString("fr-FR", options).slice(1)}
              </p>
            </div>
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
        <div className={styles.headCmd}>
          <div className={styles.priceTotal}>{totalPrice}€ HT</div>
          <Link href="/panier">
            <button className={styles.btnCart}>Panier </button>
          </Link>
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
      </div>
    </header>
  );
}
