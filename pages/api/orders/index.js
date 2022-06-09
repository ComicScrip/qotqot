import { minifyOrders } from "../utils/Airtable";
import axios from "axios";

export default async function getAllProducts(req, res) {
  axios
    .get(
      `https://api.airtable.com/v0/app5Yy06J0dhcG7Xb/Commandes%20Pro?filterByFormula=${
        req.query.status === "pending"
          ? "%7BStatus%7D%3D%22En%2520cours%22"
          : "OR(%7BStatus%7D%3D%22Livr%C3%A9e%22%2C%7BStatus%7D%3D%22Annul%C3%A9e%22)"
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
