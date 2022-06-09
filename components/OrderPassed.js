import styles from "../styles/home.module.css";

export default function OrderPassed(props) {
  return (
    <div className={styles.commande}>
      {props.statut === "Annulée" ? (
        <div className={styles.state2}>{props.statut}</div>
      ) : (
        <div className={styles.state1}>{props.statut}</div>
      )}
      <div className={styles.date}>{props.dateLivraison}</div>
    </div>
  );
}
