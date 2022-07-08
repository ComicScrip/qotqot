const db = require("../db");

module.exports.findAllProducts = () => db.product.findMany();
module.exports.filterProducts = (category) => {
  return db.product.findMany({
    where: category,
  });
};
module.exports.findOneProduct = (id) => {
  return db.product.findUnique({
    where: { id },
  });
};
