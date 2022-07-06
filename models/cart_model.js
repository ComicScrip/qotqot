const db = require("../db");

module.exports.findAllCartItems = async ({ idClient }) => {
  return await db.customerCartItem.findMany({
    where: {
      idClient,
      idOrder: null,
    },
    include: {
      product: true,
    },
  });
};

module.exports.setCartQuantity = async function ({
  idProduct,
  idClient,
  quantity,
}) {
  return db.customerCartItem.upsert({
    where: {
      idProduct_idClient: {
        idProduct: idProduct,
        idClient: idClient,
      },
    },
    update: {
      quantity: quantity,
    },
    create: {
      idProduct: idProduct,
      idClient: idClient,
      quantity: quantity,
    },
  });
};

module.exports.updateCartItem = async function (id, data) {
  return db.customerCartItem.update({
    data,
    where: {
      id,
    },
  });
};
