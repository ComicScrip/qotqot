import axios from "axios";
import base from "../../../middlewares/common";
import reqCurrentUser from "../../../middlewares/reqCurrentUser";

export async function getOneProduct(req, res) {
  const { id } = req.query;

  axios
    .get(
      `https://api.airtable.com/v0/app5Yy06J0dhcG7Xb/Produits%20Actifs/${id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
        },
      }
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch(() => res.status(500).json({ msg: "Something went very wrong" }));
}

export default base().use(reqCurrentUser).get(getOneProduct);
