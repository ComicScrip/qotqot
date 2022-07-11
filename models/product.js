const db = require("../db");

module.exports.findAllProducts = () => db.product.findMany();

// module.exports.getAllCategories = (category, categoryList) => {
//   const productList = db.product.findMany({
//     where: {
//       category,
//     },
//   });
//   categoryList = [];
//   productList.map((item) => categoryList.push(item.category));
//   console.log("coucou", categoryList);
// };

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
module.exports.findAllProducts = () =>
  db.product.findMany({ include: { customerCartItems: true } });
