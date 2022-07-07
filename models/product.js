const db = require("../db");

module.exports.findAllProducts = () => db.product.findMany();
module.exports.filterProducts = (keyWord) => {
  return db.product.findMany({
    where: { keyWord },
  });
};
module.exports.findOneProduct = (id) => {
  return db.product.findUnique({
    where: { id },
  });
};
