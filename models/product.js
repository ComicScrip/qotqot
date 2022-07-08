const db = require("../db");

module.exports.findAllProducts = () =>
  db.product.findMany({ include: { customerCartItems: true } });