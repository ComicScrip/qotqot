import { minifyOrders } from "../../../Airtable";
import reqCurrentUser from "../../../middlewares/reqCurrentUser";
import base from "../../../middlewares/common";
import axios from "axios";

export async function getAllProducts(req, res) {
  const { id } = req.query;
  await axios
    .get(
      `${process.env.AIRTABLE_API}/Commande%20Pro%202?filterByFormula=%7BNum%C3%A9ro%20de%20Commande%7D%3D%22${id}%22`,
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

export default base().use(reqCurrentUser).get(getAllProducts);
