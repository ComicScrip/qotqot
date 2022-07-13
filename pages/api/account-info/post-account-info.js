// import { getMinifyAccountInfo } from "../utils/Airtable";
import axios from "axios";
import base from "../../../middlewares/common";
import reqCurrentUser from "../../../middlewares/reqCurrentUser";

export async function GetAccountInfo(req, res) {
  const {
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
  const user = req.currentUser.fields["Code_Client_Test"];
  await axios
    .post(
      `${process.env.AIRTABLE_API}/Coordonn%C3%A9es%20Clients%20Personnalisables`,
      {
        records: [
          {
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
              ["Code Client"]: user,
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
    .then((response) => {
      res.send(response.data.records);
    })
    .catch(() => res.status(500).json({ msg: "Something went very wrong" }));
}

export default base().use(reqCurrentUser).post(GetAccountInfo);

//
