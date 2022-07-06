/* eslint-disable no-unused-vars */
import { createOrder } from "../../../models/order_model";
import base from "../../../middlewares/common";
import reqCurrentUser from "../../../middlewares/reqCurrentUser";
import { customerCartItem } from "../../../db";

export async function handleCreateOrder(req, res) {
  await createOrder();
}

export default base().use(reqCurrentUser).post(handleCreateOrder);
