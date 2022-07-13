import { useState } from "react";
import styles from "../styles/header.module.css";
import { signOut } from "next-auth/react";
import { useRouter } from "next/dist/client/router";

export default function Header() {
  const router = useRouter();
  const [displayMenu, setDisplayMenu] = useState(false);
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
        <img
          className={styles.arrow}
          src="/images/arrow.png"
          alt="arrow"
          onClick={() => router.push("/")}
        />

        <div>
          <h1 className={styles.title}>Mon compte 👤</h1>
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
              onClick={() => router.push("/")}
              className={styles.monCompte}
              data-cy="accountBtn"
            >
              Accueil
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
    </header>
  );
}
