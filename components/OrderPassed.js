import styles from "../styles/home.module.css";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/currentUserContext";
import Link from "next/link";

export default function OrderPassed(props) {
  const { setOrderNumberState, orderNumberState } =
    useContext(CurrentUserContext);

  function handleClick() {
    setOrderNumberState(`${props.orderNumber}`);
    console.log(orderNumberState);
  }
  return (
    <Link href="/detailCommande">
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
