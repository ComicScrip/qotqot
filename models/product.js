/* eslint-disable no-undef */
const db = require("../db");

module.exports.findAllProducts = () => db.product.findMany();

module.exports.getAllCategories = async () => {
  const categoryList = await db.product.findMany({
    distinct: ["category"],
  });
  return categoryList.map((item) => item.category);
};

module.exports.filterProducts = (category) => {
  return db.product.findMany({
    where: category,
  });
};
module.exports.filterSearch = (name) => {
  return db.product.findMany({
    where: name,
  });
};
module.exports.findOneProduct = (id) => {
  return db.product.findUnique({
    where: { id },
  });
};
module.exports.findAllProducts = () =>
  db.product.findMany({ include: { customerCartItems: true } });
