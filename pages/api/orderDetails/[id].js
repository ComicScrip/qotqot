import { minifyOrderProducts } from "../../../Airtable";
import axios from "axios";
import base from "../../../middlewares/common";
import reqCurrentUser from "../../../middlewares/reqCurrentUser";

export async function getOneOrder(req, res) {
  const { id } = req.query;
  axios
    .get(
      `${process.env.AIRTABLE_API}/Commande%20Pro%202?filterByFormula=%7BCode%20Client%7D%3D%22${id}%22`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
        },
      }
    )
    .then((response) => {
      res.send(minifyOrderProducts(response.data.records));
    })
    .catch(() => res.status(500).json({ msg: "Something went very wrong" }));
}

export default base().use(reqCurrentUser).get(getOneOrder);
