import styles from "../styles/home.module.css";

export default function OrderInProgress(props) {
  return (
    <div className={styles.commande}>
      <div className={styles.state}>En cours</div>
      <div className={styles.date}>{props.DateLivraison}</div>
    </div>
  );
}
