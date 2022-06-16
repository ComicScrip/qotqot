import axios from "axios";
import base from "../../../middlewares/common";
import reqCurrentUser from "../../../middlewares/reqCurrentUser";

// const instance = axios.create({
//   baseURL: process.env.AIRTABLE_API,
//   headers: {
//     Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
//   },
// });

export async function getCustomerCartItems(req, res) {
  axios
    .get(
      "https://api.airtable.com/v0/app5Yy06J0dhcG7Xb/Panier?filterByFormula=%7BCode_Client%7D%3D%22PRO69-0011%22",
      {
        headers: {
          Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
        },
      }
    )
    .then((response) => {
      res.send(response.data?.records);
      console.log(response.data?.records);
    })
    .catch(() => res.status(500).json({ msg: "toujours pas" }));
}
export default base().use(reqCurrentUser).get(getCustomerCartItems);
