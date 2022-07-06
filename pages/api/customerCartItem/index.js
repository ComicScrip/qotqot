/* eslint-disable no-unused-vars */
import axios from "axios";
import base from "../../../middlewares/common";
import reqCurrentUser from "../../../middlewares/reqCurrentUser";
import {
  findAllCartItems,
  setCartQuantity,
  validateCart,
} from "../../../models/cart_model";

export async function getAllCartItems(req, res) {
  try {
    res.send(
      await findAllCartItems({
        idClient: req.currentUser.id,
      })
    );
  } catch {
    res.status(500).send("Error");
  }
}

export async function handlePostCartItems(req, res) {
  try {
    if (req.body.quantity < 0) res.status(422);
    else
      await setCartQuantity({
        idProduct: req.body.idProduct,
        idClient: req.currentUser.id,
        quantity: req.body.quantity,
      });

    res.send("ok");
  } catch (err) {
    res.status(500).send("Error");
    console.log(err);
  }
}

export async function handleCartValidation(req, res) {
  try {
    await validateCart({ cartValidation: true });
  } catch (err) {
    res.status(500).send("Error");
    console.log(err);
  }
}

export default base()
  .use(reqCurrentUser)
  .get(getAllCartItems)
  .post(handlePostCartItems)
  .patch(handleCartValidation);
