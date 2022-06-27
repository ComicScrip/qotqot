import styles from "../styles/home.module.css";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/currentUserContext";
import Link from "next/link";
import "dayjs/locale/fr";
const dayjs = require("dayjs");

export default function OrderPassed(props) {
  const { setOrderNumberState, setOrderStatut, setOrderDate, setOrderAmount } =
    useContext(CurrentUserContext);

  function handleClick() {
    setOrderNumberState(`${props.orderNumber}`);
    setOrderStatut(`${props.statut}`);
    dayjs(setOrderDate(`${props.dateLivraison}`))
      .locale("fr")
      .format("DD/MM/YYYY");
    setOrderAmount(`${props.totalAmount}`);
  }

  return (
    <Link href={`/commandes/` + `${props.orderNumber}`}>
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
