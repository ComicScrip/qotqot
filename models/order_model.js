const db = require("../db");

module.exports.findAllOrders = () => db.orders.findMany();

module.exports.createOrder = async (data) => {
  return await db.order.create({ data });
};
