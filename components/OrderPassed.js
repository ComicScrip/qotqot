import styles from "../styles/home.module.css";

export default function OrderPassed(props) {
  return (
    <div className={styles.commande}>
      <div className={styles.state2}>Livrée</div>
      <div className={styles.date2}>{props.DateLivraison}</div>
    </div>
  );
}
