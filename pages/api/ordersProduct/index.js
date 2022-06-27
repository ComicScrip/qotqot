/* eslint-disable no-unused-vars */
import { createOrder, postCartOrder } from "../../../models/cart_model";
import base from "../../../middlewares/common";
import reqCurrentUser from "../../../middlewares/reqCurrentUser";

export async function handlePostCartItems(req, res) {
  createOrder({});
}

export async function handlePatchCartOrder(req, res) {
  postCartOrder({
    id: req.body.id,
  });
}

export default base()
  .use(reqCurrentUser)
  .post(handlePostCartItems)
  .patch(handlePatchCartOrder);
