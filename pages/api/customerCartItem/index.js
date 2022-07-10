/* eslint-disable no-unused-vars */
import axios from "axios";
import base from "../../../middlewares/common";
import reqCurrentUser from "../../../middlewares/reqCurrentUser";

async function getCustomerCartItems({ req }) {
  console.log(req.currentUser.customer_id);
  axios
    .get(
      `https://api.airtable.com/v0/app5Yy06J0dhcG7Xb/Panier?filterByFormula=%7BCode_Client%7D%3D%22${req.currentUser.customer_id}%22`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
        },
      }
    )
    .then((res) => res.data.records);
}

export default base().use(reqCurrentUser).get(getCustomerCartItems);
