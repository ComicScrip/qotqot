/* eslint-disable import/no-anonymous-default-export */
import { minifyRecords } from "../utils/Airtable";
import axios from "axios";

export default async function getAllProducts(req, res) {
  try {
    axios
      .get("https://api.airtable.com/v0/app5Yy06J0dhcG7Xb/Produits%20Actifs", {
        headers: {
          Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
        },
      })
      .then((response) => {
        res.send(minifyRecords(response.data.records));
        console.log(
          response.data.records[0].fields["Image produits sans fond"][0].url
        );
      });
  } catch (error) {
    res.statusCode = 500;
    res.json({ msg: "Something went very wrong :( " });
  }
}
