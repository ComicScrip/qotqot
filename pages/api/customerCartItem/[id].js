/* eslint-disable no-unused-vars */
import base from "../../../middlewares/common";
import reqCurrentUser from "../../../middlewares/reqCurrentUser";
import { findOneCartItem } from "../../../models/cart_model";

export async function getOneCartItem(req, res) {
  try {
    console.log(req.query.id);
    res.send(
      await findOneCartItem({
        idOrder: req.query.id,
      })
    );
  } catch {
    res.status(500).send("Error");
  }
}

export default base().use(reqCurrentUser).get(getOneCartItem);
