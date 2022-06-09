import axios from "axios";

export default async function addToDB(req, res) {
  const data = req.body;

  await axios
    .post("https://api.airtable.com/v0/app5Yy06J0dhcG7Xb/Panier ", data, {
      headers: {
        Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
      },
    })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => console.log(error));
}
