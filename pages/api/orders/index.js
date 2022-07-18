import { minifyOrders } from "../../../Airtable";
import reqCurrentUser from "../../../middlewares/reqCurrentUser";
import base from "../../../middlewares/common";
import axios from "axios";

export async function getAllProducts(req, res) {
  const url = `https://api.airtable.com/v0/app5Yy06J0dhcG7Xb/Commande%20Produits%20API?filterByFormula=${
    req.query.status == "pending"
      ? "%7BStatus%7D%3D%22En%2520cours%22"
      : "OR(%7BStatus%7D%3D%22Livr%C3%A9e%22%2C%7BStatus%7D%3D%22Annul%C3%A9e%22)"
  }`;
  console.log(url);
  axios
    .get(
      `${process.env.AIRTABLE_API}/Commandes%20Pro?filterByFormula=${
        req.query.status === "pending"
          ? `%7BStatus%7D%3D%22En-cours%22`
          : `OR(%7BStatus%7D%3D%22Livr%C3%A9e%22%2C%7BStatus%7D%3D%22Annul%C3%A9e%22)`
      }`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
        },
      }
    )
    .then((response) => {
      res.send(minifyOrders(response.data.records));
    })
    .catch(() => res.status(500).json({ msg: "Something went very wrong" }));
}

export default base().use(reqCurrentUser).get(getAllProducts);
