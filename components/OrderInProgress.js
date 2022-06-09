import styles from "../styles/home.module.css";

export default function OrderInProgress(props) {
  return (
    <div className={styles.commande}>
      <div className={styles.state}>{props.statut}</div>
      <div className={styles.date}>{props.dateLivraison}</div>
    </div>
  );
}
