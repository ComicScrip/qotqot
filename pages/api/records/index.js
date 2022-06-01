import axios from "axios";

export default function handler(req, res) {
  axios
    .get("https://api.airtable.com/v0/app5Yy06J0dhcG7Xb/Produits%20Actifs", {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
    })
    .then((response) => {
      res.send(response.data);
      console.log(response.data);
    });
}
