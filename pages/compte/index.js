import styles from "../../styles/account.module.css";
import Layout from "../../components/Layout";

export default function Account() {
  return (
    <Layout pageTitle="nouvelle-commande">
      <div className={styles.ctnAcc}>
        <form className={styles.formAcc}>
          <div className={styles.pAcc}>
            <h1 className={styles.titleAcc}>Société</h1>
            <div className={styles.fieldsAcc}>
              <label className={styles.labelAcc}>Nom de l'établissement*</label>
              <input></input>
            </div>
            <div className={styles.fieldsAcc}>
              <label className={styles.labelAcc}>Raison sociale*</label>
              <input></input>
            </div>
            <div className={styles.fieldsAcc}>
              <label className={styles.labelAcc}>SIRET*</label>
              <input></input>
            </div>
            <div className={styles.fieldsAcc}>
              <label className={styles.labelAcc}>Numéro de TVA*</label>
              <input></input>
            </div>
          </div>
          <div className={styles.pAcc}>
            <h1 className={styles.titleAcc}>Adresse de facturation</h1>
            <div className={styles.fieldsAcc}>
              <label className={styles.labelAcc}>Numéro et voie*</label>
              <input></input>
            </div>
            <div className={styles.fieldsAcc}>
              <label className={styles.labelAcc}>Code postal*</label>
              <input></input>
            </div>
            <div className={styles.fieldsAcc}>
              <label className={styles.labelAcc}>Ville*</label>
              <input></input>
            </div>
          </div>
          <div className={styles.pAcc}>
            <h1 className={styles.titleAcc}>Adresse de livraison</h1>
            <div className={styles.fieldsAcc}>
              <label className={styles.labelAcc}>Numéro et voie*</label>
              <input></input>
            </div>
            <div className={styles.fieldsAcc}>
              <label className={styles.labelAcc}>Code postal*</label>
              <input></input>
            </div>
            <div className={styles.fieldsAcc}>
              <label className={styles.labelAcc}>Ville*</label>
              <input></input>
            </div>
          </div>
          <div className={styles.pAcc}>
            <h1 className={styles.titleAcc}>Contact</h1>
            <div className={styles.fieldsAcc}>
              <label className={styles.labelAcc}>Nom*</label>
              <input></input>
            </div>
            <div className={styles.fieldsAcc}>
              <label className={styles.labelAcc}>Prénom*</label>
              <input></input>
            </div>
            <div className={styles.fieldsAcc}>
              <label className={styles.labelAcc}>Téléphone*</label>
              <input></input>
            </div>
            <div className={styles.fieldsAcc}>
              <label className={styles.labelAcc}>Email*</label>
              <input></input>
            </div>
          </div>
          <div className={styles.btnAcc}>
            <button>Enregistrer</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
