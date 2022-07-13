/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createOrder } from "../../../models/order_model";
import base from "../../../middlewares/common";
import reqCurrentUser from "../../../middlewares/reqCurrentUser";
import { findAllCartItems, updateCartItem } from "../../../models/cart_model";
import dayjs from "dayjs";
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

  console.log("date", dayjs(date, "DD-MM-YYYY").format("YYYY-MM-DD"));

  const orderProps = {
    comment,
    delivery: dayjs(date, "DD-MM-YYYY").toDate(),
  };

  console.log(orderProps);

  const newOrder = await createOrder(orderProps);
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
