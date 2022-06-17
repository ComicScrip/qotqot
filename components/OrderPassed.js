import styles from "../styles/home.module.css";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/currentUserContext";
import Link from "next/link";

export default function OrderPassed(props) {
  const { setOrderNumberState, setOrderStatut, setOrderDate } =
    useContext(CurrentUserContext);

  function handleClick() {
    setOrderNumberState(`${props.orderNumber}`);
    setOrderStatut(`${props.statut}`);
    setOrderDate(`${props.dateLivraison}`);
  }
  return (
    <Link href={`/commandes/` + `${props.orderNumber}`.slice(0, 10)}>
      <div className={styles.commande} onClick={handleClick}>
        {props.statut === "Annulée" ? (
          <div className={styles.state2}>{props.statut}</div>
        ) : (
          <div className={styles.state1}>{props.statut}</div>
        )}
        <div className={styles.date}>{props.dateLivraison}</div>
      </div>
    </Link>
  );
}
