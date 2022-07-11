/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createOrder } from "../../../models/order_model";
import base from "../../../middlewares/common";
import reqCurrentUser from "../../../middlewares/reqCurrentUser";
import { findAllCartItems, updateCartItem } from "../../../models/cart_model";

export async function handleCreateOrder(req, res) {
  const customerCartItems = await findAllCartItems({
    idClient: req.currentUser.id,
  });
  if (customerCartItems.length === 0) {
    return res.status(422).send("Your cart is empty...");
  }
  const newOrder = await createOrder({});
  await Promise.all(
    customerCartItems.map((item) => {
      return updateCartItem(item.id, {
        idOrder: newOrder.id,
      });
    })
  );
  res.send("ok");
}

export default base().use(reqCurrentUser).post(handleCreateOrder);
