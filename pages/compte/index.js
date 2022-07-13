import React, { useRef, useState, useEffect } from "react";
import styles from "../../styles/account.module.css";
import Layout from "../../components/Layout";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Account() {
  const [companyName, setCompanyName] = useState("");
  const [accountId, setAccountId] = useState("");
  const [corporateName, setCorporateName] = useState("");
  const [siret, setSiret] = useState("");
  const [tva, setTva] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState("");
  const accountInfo = useRef([]);
  console.log("re-render");

  useEffect(() => {
    axios
      .get("/api/account-info/get-account-info")
      .then((response) => {
        console.log("GET working");
        const accountInfo = response.data;
        accountInfo.map((info) => {
          setAccountId(info.id);
          setCompanyName(info.fields["Nom établissement"]);
          setCorporateName(info.fields["Dénomination Sociale"]);
          setSiret(info.fields["N°SIRET"]);
          setTva(info.fields["N° TVA INTRA"]);
          setBillingAddress(info.fields["Adresse (N° et voie) - Facturation"]);
          setPostalCode(info.fields["Code Postal - Facturation"]);
          setCity(info.fields["Ville - Facturation"]);
          setContact(info.fields["Contact pour la livraison"]);
          setPhone(info.fields["Téléphone (Contact Livraison)"]);
          setMail(info.fields["Mail (envoi facture)"]);
        });
      })
      .catch(() => {
        console.log("GET not working");
      });
  }, [accountInfo]);

  const createAccountInfo = (e) => {
    e.preventDefault();
    axios
      .post("/api/account-info/post-account-info", {
        accountId,
        companyName,
        corporateName,
        siret,
        tva,
        billingAddress,
        postalCode,
        city,
        contact,
        phone,
        mail,
      })
      .then(() => {
        toast.success("Informations enregistrées");
      })
      .catch(() => {
        toast.error("Une erreur est survenue");
      });
  };

  return (
    <Layout pageTitle="compte">
      <Toaster position="bottom-center" />
      <div className={styles.ctnAcc}>
        <form
          className={styles.formAcc}
          method="post"
          onSubmit={createAccountInfo}
        >
          <div className={styles.pAcc}>
            <h1 className={styles.titleAcc}>Société</h1>
            <div className={styles.fieldsAcc}>
              <label className={styles.labelAcc}>Nom de l'établissement*</label>
              <input
                data-cy="companyName"
                type="text"
                id="companyName"
                name="companyName"
                className="text-[#7F7F7F]"
                minLength="1"
                maxLength="30"
                value={companyName || ""}
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
                value={corporateName || ""}
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
                value={siret || ""}
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
                value={tva || ""}
                onChange={(e) => setTva(e.target.value)}
              ></input>
            </div>
          </div>
          <div className={styles.pAcc}>
            <h1 className={styles.titleAcc}>Adresse de facturation</h1>
            <div className={styles.fieldsAcc}>
              <label className={styles.labelAcc}>Numéro et voie*</label>
              <input
                type="text"
                id="billingAddress"
                name="billingAddress"
                className="text-[#7F7F7F]"
                minLength="1"
                maxLength="30"
                value={billingAddress || ""}
                onChange={(e) => setBillingAddress(e.target.value)}
              ></input>
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
                value={postalCode || ""}
                onChange={(e) => setPostalCode(e.target.value)}
              ></input>
            </div>
            <div className={styles.fieldsAcc}>
              <label className={styles.labelAcc}>Ville*</label>
              <input
                type="text"
                id="city"
                name="city"
                className="text-[#7F7F7F]"
                minLength="1"
                maxLength="30"
                value={city || ""}
                onChange={(e) => setCity(e.target.value)}
              ></input>
            </div>
          </div>
          <div className={styles.pAcc}>
            <h1 className={styles.titleAcc}>Adresse de livraison</h1>
            <div className={styles.fieldsAcc}>
              <label className={styles.labelAcc && "bg-[#c6c5c5]"}>
                Numéro et voie*
              </label>
              <input disabled className="text-[#444242] bg-[#c6c5c5]"></input>
            </div>
            <div className={styles.fieldsAcc}>
              <label className={styles.labelAcc && "bg-[#c6c5c5]"}>
                Code postal*
              </label>
              <input disabled className="text-[#444242] bg-[#c6c5c5]"></input>
            </div>
            <div className={styles.fieldsAcc}>
              <label className={styles.labelAcc && "bg-[#c6c5c5]"}>
                Ville*
              </label>
              <input disabled className="text-[#444242] bg-[#c6c5c5]"></input>
            </div>
          </div>
          <div className={styles.pAcc}>
            <h1 className={styles.titleAcc}>Contact</h1>
            <div className={styles.fieldsAcc}>
              <label className={styles.labelAcc}>Nom*</label>
              <input
                id="contact"
                name="contact"
                className="text-[#7F7F7F]"
                minLength="1"
                maxLength="30"
                value={contact || ""}
                onChange={(e) => setContact(e.target.value)}
              ></input>
            </div>
            <div className={styles.fieldsAcc}>
              <label className={styles.labelAcc && "bg-[#c6c5c5]"}>
                Prénom*
              </label>
              <input disabled className="text-[#444242] bg-[#c6c5c5]"></input>
            </div>
            <div className={styles.fieldsAcc}>
              <label className={styles.labelAcc}>Téléphone*</label>
              <input
                id="phone"
                name="phone"
                className="text-[#7F7F7F]"
                minLength="1"
                maxLength="30"
                value={phone || ""}
                onChange={(e) => setPhone(e.target.value)}
              ></input>
            </div>
            <div className={styles.fieldsAcc}>
              <label className={styles.labelAcc}>Email*</label>
              <input
                id="mail"
                name="mail"
                className="text-[#7F7F7F]"
                minLength="1"
                maxLength="30"
                value={mail || ""}
                onChange={(e) => setMail(e.target.value)}
              ></input>
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
