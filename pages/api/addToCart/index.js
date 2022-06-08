import axios from "axios";

// eslint-disable-next-line no-unused-vars
export default async function addToCart(req, res) {
  const Name = req.body;

  await axios
    .post("https://api.airtable.com/v0/app5Yy06J0dhcG7Xb/Panier ", Name, {
      headers: {
        Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
      },
    })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => console.log(error));
}
