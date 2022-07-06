const db = require("../db");

module.exports.findAllProducts = () => db.product.findMany();

module.exports.findOneProduct = (id) => {
  return db.product.findUnique({
    where: { id },
  });
};
