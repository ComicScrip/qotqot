const db = require("../db");

module.exports.findAllOrders = () => db.orders.findMany();

module.exports.createOrder = async ({ idProduct, idClient, quantity }) => {
  return await db.order.create({
    idProduct: idProduct,
    idClient: idClient,
    quantity: quantity,
  });
};
