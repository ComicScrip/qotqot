const db = require("../db");

module.exports.findAllOrders = () => db.orders.findMany();

// module.exports.createOrder = async function ({
//   id,
//   createdAt,
//   delivery,
//   comment,
//   synchWithAT,
//   customerCartItem,
// }) {
//   return await db.order.create({
//     id: id,
//     createdAt: createdAt,
//     delivery: delivery,
//     comment: comment,
//     synchWithAT: synchWithAT,
//     customerCartItem: customerCartItem,
//   });
// };

module.exports.createOrder = async (data) => {
  return await db.order.create({ data });
};
