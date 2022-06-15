import styles from "../styles/home.module.css";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/currentUserContext";
import Link from "next/link";

export default function OrderInProgress(props) {
  const { setOrderNumberState, orderNumberState } =
    useContext(CurrentUserContext);

  function handleClick() {
    setOrderNumberState(`${props.orderNumber}`);
    console.log(orderNumberState);
  }
  return (
    <Link href="/commandePassee">
      <div className={styles.commande} onClick={handleClick}>
        <div className={styles.state}>{props.statut}</div>
        <div className={styles.date}>{props.dateLivraison}</div>
      </div>
    </Link>
  );
}
