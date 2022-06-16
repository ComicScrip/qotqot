import styles from "../../styles/account.module.css";
import Layout from "../../components/Layout";

export default function Account() {
  return (
    <Layout pageTitle="nouvelle-commande">
      <>
        <form>
          <div className={styles.company}>
            <h1>Société</h1>
            <label>Nom de l'établissement*</label>
            <input></input>
            <label>Raison sociale*</label>
            <input></input>
            <label>SIRET*</label>
            <input></input>
            <label>Numéro de TVA*</label>
            <input></input>
          </div>
          <div className={styles.adressBilling}>
            <h1>Adresse de facturation</h1>
            <label>Numéro et voie*</label>
            <input></input>
            <label>Code postal*</label>
            <input></input>
            <label>Ville*</label>
            <input></input>
          </div>
          <div className={styles.adressBilling}>
            <h1>Adresse de livraison</h1>
            <label>Numéro et voie*</label>
            <input></input>
            <label>Code postal*</label>
            <input></input>
            <label>Ville*</label>
            <input></input>
          </div>
          <div>
            <h1>Contact</h1>
            <label>Nom*</label>
            <input></input>
            <label>Prénom*</label>
            <input></input>
            <label>Téléphone*</label>
            <input></input>
            <label>Email*</label>
            <input></input>
          </div>
          <button>Enregistrer</button>
        </form>
      </>
    </Layout>
  );
}
