/* eslint-disable no-unused-vars */
import axios from "axios";
import base from "../../../middlewares/common";
import reqCurrentUserId from "../../../middlewares/reqCurrentUserId";

// async function getCustomerCartItems({ req, customer_id }) {
//   axios
//     .get(
//       `https://api.airtable.com/v0/app5Yy06J0dhcG7Xb/Panier?filterByFormula=%7BCode_Client%7D%3D%22${req.currentUserId}%22`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
//         },
//       }
//     )
//     .then((res) => res.data.records);
// }

async function getCustomerCartItems(req, res) {
  return res.send(req.currentUserId);
}

export default base().use(reqCurrentUserId).get(getCustomerCartItems);
