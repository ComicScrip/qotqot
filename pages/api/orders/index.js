import axios from "axios";
export default function handler(req, res) {
  axios
    .get("https://api.airtable.com/v0/app5Yy06J0dhcG7Xb/Commandes%20Pro", {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
    })
    .then((response) => {
      res.send(response.data);
      console.log(response.data);
    });
}
