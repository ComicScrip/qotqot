const db = require("../db");

module.exports.findAllOrders = () => db.orders.findMany();

module.exports.createOrder = async () => {
  return await db.order.create();
};
