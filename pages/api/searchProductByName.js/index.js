import axios from "axios";
import base from "../../../middlewares/common";
import reqCurrentUser from "../../../middlewares/reqCurrentUser";
import { minifyProducts } from "../utils/Airtable";

export async function searchProductByName(req, res) {
  const userInput = Object.values(req.query).toLocaleString();
  console.log(userInput);
  axios
    .get(
      userInput === "Dernière Commande"
        ? "https://api.airtable.com/v0/app5Yy06J0dhcG7Xb/Panier"
        : `https://api.airtable.com/v0/app5Yy06J0dhcG7Xb/Produits%20Actifs?filterByFormula=(%7BCat%C3%A9gorie%7D%3D%22${userInput}%22)`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
        },
      }
    )
    .then((response) => {
      res.send(minifyProducts(response.data.records));
    })
    .catch((error) => {
      res.status(500);
      console.log(error);
    });
}

export default base().use(reqCurrentUser).get(searchProductByName);
