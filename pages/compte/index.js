import React, { useState } from "react";
import styles from "../../styles/account.module.css";
import Layout from "../../components/Layout";
import axios from "axios";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/currentUserContext";
import LoadingSpin from "../../components/LoadingSpin";

export default function Account() {
  const [companyName, setCompanyName] = useState("");
  const [corporateName, setCorporateName] = useState("");
  const [siret, setSiret] = useState("");
  const [tva, setTva] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const { currentUserProfile } = useContext(CurrentUserContext);
  console.log(currentUserProfile);
  console.log("coucou");

  useEffect(() => {
    axios
      .get("/api/account-info/get-account-info")
      .then((response) => {
        console.log("working");
        setUserInfo(response.data);
        userInfo.map((info) => {
          setCompanyName(info.fields["Nom établissement"]);
          setCorporateName(info.fields["Dénomination Sociale"]);
          setSiret(info.fields["N°SIRET"]);
          setTva(info.fields["N° TVA INTRA"]);
        });
      })
      .catch(() => {
        console.log("not working");
      });
  }, [userInfo]);

  const createAccountInfo = (e) => {
    e.preventDefault();
    axios
      .post("/api/account-info/post-account-info", { postalCode })
      .then(() => {
        console.log("POST worked");
      })
      .catch(() => {
        console.log("POST not working");
      });
  };

  return (
    <>
      {companyName === "" ? (
        <LoadingSpin></LoadingSpin>
      ) : (
        <Layout pageTitle="nouvelle-commande">
          <div className={styles.ctnAcc}>
            <form
              className={styles.formAcc}
              method="post"
              onSubmit={createAccountInfo}
            >
              <div className={styles.pAcc}>
                <h1 className={styles.titleAcc}>Société</h1>
                <div className={styles.fieldsAcc}>
                  <label className={styles.labelAcc}>
                    Nom de l'établissement*
                  </label>
                  <input
                    data-cy="companyName"
                    type="text"
                    id="companyName"
                    name="companyName"
                    className="text-[#7F7F7F]"
                    minLength="1"
                    maxLength="30"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  ></input>
                </div>
                <div className={styles.fieldsAcc}>
                  <label className={styles.labelAcc}>Raison sociale*</label>
                  <input
                    type="text"
                    id="corporateName"
                    name="corporateName"
                    className="text-[#7F7F7F]"
                    minLength="1"
                    maxLength="30"
                    value={corporateName}
                    onChange={(e) => setCorporateName(e.target.value)}
                  ></input>
                </div>
                <div className={styles.fieldsAcc}>
                  <label className={styles.labelAcc}>SIRET*</label>
                  <input
                    type="text"
                    id="siret"
                    name="siret"
                    className="text-[#7F7F7F]"
                    minLength="1"
                    maxLength="30"
                    value={siret}
                    onChange={(e) => setSiret(e.target.value)}
                  ></input>
                </div>
                <div className={styles.fieldsAcc}>
                  <label className={styles.labelAcc}>Numéro de TVA*</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    className="text-[#7F7F7F]"
                    minLength="1"
                    maxLength="30"
                    value={tva}
                    onChange={(e) => setTva(e.target.value)}
                  ></input>
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
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    className="text-[#7F7F7F]"
                    minLength="1"
                    maxLength="30"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  ></input>
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
      )}
    </>
  );
}

// export const getServerSideProps = async () => {
//   await axios
//     .get("/account-info")
//     .then(() => {
//       console.log("working");
//     })
//     .catch(() => {
//       console.log("not working");
//     });
//   return { props: {} };
// };
