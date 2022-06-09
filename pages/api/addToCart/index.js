import axios from "axios";

// eslint-disable-next-line no-unused-vars
export default async function addToDB(req, res) {
  const data = req.body;
  // ---->  interroger la table : data est présent
  // ? oui, on incrémente sa valeur "quantité" de 1
  // : sinon, on fait le POST suivant
  await axios
    .get(
      `https://api.airtable.com/v0/app5Yy06J0dhcG7Xb/Panier/${data.records[0].fields.id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
        },
      }
    )
    .then((res) => console.log(res));
  // .then((data) => console.log(data))
  // .catch((error) => console.log(error));

  // await axios
  //   .post("https://api.airtable.com/v0/app5Yy06J0dhcG7Xb/Panier ", data, {
  //     headers: {
  //       Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
  //     },
  //   })
  //   .then((response) => {
  //     res.status(200).send(response.data);
  //   })
  //   .catch((error) => console.log(error));
}
