import { minifyProducts } from "../utils/Airtable";
import axios from "axios";

export default async function getAllProducts(req, res) {
  axios
    .get("https://api.airtable.com/v0/app5Yy06J0dhcG7Xb/Produits%20Actifs", {
      headers: {
        Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
      },
    })
    .then((response) => {
      res.send(minifyProducts(response.data.records));
    })
    .catch(() => res.status(500).json({ msg: "Something went very wrong" }));
}
