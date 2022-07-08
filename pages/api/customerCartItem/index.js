/* eslint-disable no-unused-vars */
import axios from "axios";
import base from "../../../middlewares/common";
import reqCurrentUser from "../../../middlewares/reqCurrentUser";
import {
  deleteCartItem,
  findAllCartItems,
  setCartQuantity,
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
    if (req.body.quantity === 0) {
      await deleteCartItem({
        idProduct: req.body.idProduct,
        idClient: req.currentUser.id,
      });
    } else {
      await setCartQuantity({
        idProduct: req.body.idProduct,
        idClient: req.currentUser.id,
        quantity: req.body.quantity,
      });
      res.send("ok");
    }
  } catch (err) {
    res.status(500).send("Error");
    console.log(err);
  }
}

export default base()
  .use(reqCurrentUser)
  .get(getAllCartItems)
  .post(handlePostCartItems);
