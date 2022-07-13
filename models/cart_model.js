const db = require("../db");

module.exports.findAllCartItems = async ({ idClient }) => {
  return await db.customerCartItem.findMany({
    where: {
      idClient,
      idOrder: "",
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
      idProduct_idClient_idOrder: {
        idProduct: idProduct,
        idClient: idClient,
        idOrder: "",
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

module.exports.deleteCartItem = async function ({ idClient, idProduct }) {
  return db.customerCartItem.deleteMany({
    where: {
      idClient,
      idProduct,
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
