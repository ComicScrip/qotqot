import styles from "../styles/home.module.css";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/currentUserContext";
import Link from "next/link";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import moment from "moment";

export default function OrderPassed(props) {
  const time = moment(parseInt(props.dateCommande)).locale("fr").format("ll");
  console.log(time);
  const {
    setOrderNumberState,
    setOrderStatut,
    setOrderDate,
    setOrderAmount,
    setDeliveryDate,
  } = useContext(CurrentUserContext);

  function handleClick() {
    setOrderNumberState(`${props.orderNumber}`);
    setOrderStatut(`${props.statut}`);
    setOrderDate(time);
    // dayjs(setOrderDate(props.dateCommande)).locale("fr").format("DD/MM/YYYY");
    dayjs(setDeliveryDate(props.dateLivraison))
      .locale("fr")
      .format("DD/MM/YYYY");
    setOrderAmount(`${props.totalAmount}`);
  }

  return (
    <Link href={`/commandes/` + encodeURIComponent(`${props.orderNumber}`)}>
      <div className={styles.commande} onClick={handleClick}>
        {props.statut === "Annulée" ? (
          <div className={styles.state2}>{props.statut}</div>
        ) : props.statut === "Livrée" ? (
          <div className={styles.state1}>{props.statut}</div>
        ) : (
          <div className={styles.state}>{props.statut}</div>
        )}
        <div className={styles.date}>{props.dateCommande}</div>
      </div>
    </Link>
  );
}
