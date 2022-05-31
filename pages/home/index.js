import Layout from "../../components/layout";
import styles from "../../styles/home.module.css";

export default function Home() {
  return (
    <>
      <Layout>
        <div className={styles.homeBody}>
          <div className={styles.home}>
            <button className={styles.nouvelleCommandeBtn}>
              NOUVELLE COMMANDE
            </button>
            <h2 className={styles.title}>Commandes à venir</h2>
            <h2 className={styles.title}>Commandes passées</h2>
          </div>
        </div>
      </Layout>
    </>
  );
}
