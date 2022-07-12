// import { getMinifyAccountInfo } from "../utils/Airtable";
import axios from "axios";
import base from "../../../middlewares/common";
import reqCurrentUser from "../../../middlewares/reqCurrentUser";
// import { handleGetProfile } from "../profile";

export async function GetAccountInfo(req, res) {
  //   const userId = req.currentUser.id;
  //   console.log(req.currentUser.id);
  const {
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
  } = req.body;
  await axios
    .patch(
      `${process.env.AIRTABLE_API}/Coordonn%C3%A9es%20Clients%20Personnalisables`,
      {
        records: [
          {
            id: accountId,
            fields: {
              ["Nom établissement"]: companyName,
              ["Dénomination Sociale"]: corporateName,
              ["N°SIRET"]: siret,
              ["N° TVA INTRA"]: tva,
              ["Adresse (N° et voie) - Facturation"]: billingAddress,
              ["Code Postal - Facturation"]: postalCode,
              ["Ville - Facturation"]: city,
              ["Contact pour la livraison"]: contact,
              ["Téléphone (Contact Livraison)"]: phone,
              ["Mail (envoi facture)"]: mail,
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
        },
      }
    )
    .catch(() => res.status(500).json({ msg: "Something went very wrong" }));
}

export default base().use(reqCurrentUser).post(GetAccountInfo);

//
