import { useContext } from "react";
import styles from "../styles/header.module.css";
import { signOut } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { CurrentUserContext } from "../contexts/currentUserContext";

export default function Header() {
  const router = useRouter();

  const { displayMenu, setDisplayMenu } = useContext(CurrentUserContext);
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
        <div>
          <h1 className={styles.title}>Bonjour 👋</h1>
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
    </header>
  );
}
