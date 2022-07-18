import { minifyOrders } from "../../../Airtable";
import axios from "axios";
import reqCurrentUser from "../../../middlewares/reqCurrentUser";
import base from "../../../middlewares/common";

export async function getAllProducts(req, res) {
  const user = req.currentUser.fields["Code Client"];
  axios
    .get(
      `${process.env.AIRTABLE_API}/Commandes%20Pro%20Test?filterByFormula=%7BCode%20Client%7D%3D%22${user}%22`,
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

// Commandes%20Pro?filterByFormula=%7BCode%20Client%7D%3D%22${user}%22
