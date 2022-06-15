import { minifyOrderProducts } from "../utils/Airtable";
import axios from "axios";
import base from "../../../middlewares/common";
import reqCurrentUser from "../../../middlewares/reqCurrentUser";

export async function getAllProducts(req, res) {
  axios
    .get(
      "https://api.airtable.com/v0/app5Yy06J0dhcG7Xb/Commande%20Produits%20API",
      {
        headers: {
          Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
        },
      }
    )
    .then((response) => {
      res.send(minifyOrderProducts(response.data.records));
    })
    .catch(() => res.status(500).json({ msg: "Something went very wrong" }));
}

export default base().use(reqCurrentUser).get(getAllProducts);
