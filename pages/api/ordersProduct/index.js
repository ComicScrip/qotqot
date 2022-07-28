/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createOrder } from "../../../models/order_model";
import base from "../../../middlewares/common";
import reqCurrentUser from "../../../middlewares/reqCurrentUser";
import { findAllCartItems, updateCartItem } from "../../../models/cart_model";
import dayjs from "dayjs";
import exportOrdersToAirtable from "../../../scripts/exportOrders";
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

export async function handleCreateOrder(req, res) {
  const { comment, date } = req.body;
  const customerCartItems = await findAllCartItems({
    idClient: req.currentUser.id,
  });
  if (customerCartItems.length === 0) {
    return res.status(422).send("Your cart is empty...");
  }

  const totalPrice = customerCartItems
    .reduce((acc, curr) => acc + curr.quantity * curr.product.price, 0)
    .toFixed(2)
    .toString();

  const orderProps = {
    comment,
    delivery: dayjs(date, "DD-MM-YYYY").toDate(),
    totalPrice,
  };

  const newOrder = await createOrder(orderProps);
  await Promise.all(
    customerCartItems.map((item) => {
      return updateCartItem(item.id, {
        idOrder: newOrder.id,
      });
    })
  );
  res.send("ok");

  await exportOrdersToAirtable();
}

export default base().use(reqCurrentUser).post(handleCreateOrder);
