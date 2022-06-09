import axios from "axios";

export default async function clearFromDB(req, res) {
  // const id = req.body;

  await axios
    .delete(
      `https://api.airtable.com/v0/app5Yy06J0dhcG7Xb/Panier/rec0156LnM67m2GUr`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
        },
      }
    )
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch(() => console.log("rien"));
}
