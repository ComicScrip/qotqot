/* eslint-disable no-unused-vars */
import { createOrder } from "../../../models/order_model";
import base from "../../../middlewares/common";
import reqCurrentUser from "../../../middlewares/reqCurrentUser";

export async function handleCreateOrder(req, res) {
  await createOrder({
    idProduct: req.body.idProduct,
    idClient: req.body.idClient,
    quantity: req.body.quantity,
  });
}

export default base().use(reqCurrentUser).post(handleCreateOrder);
