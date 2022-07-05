const db = require("../db");

module.exports.findAllCartItems = () => db.customerCartItem.findMany();

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
// module.exports.setCartQuantity = async function ({
//   idProduct,
//   idClient,
//   quantity,
// }) {
//   const cartItem = await this.findAllCartItems({ idProduct, idClient });

//   if (cartItem) {
//     if (quantity !== 0)
//       return patch("/Panier", {
//         records: [
//           {
//             id: cartItem.id,
//             fields: {
//               Code_Produit: idProduct,
//               Code_Client: idClient,
//               quantité: quantity,
//             },
//           },
//         ],
//       });
//     else return delete `/Panier/${cartItem.fields.id}`;
//   } else if (quantity !== 0) {
//     return post("/Panier", {
//       records: [
//         {
//           fields: {
//             Code_Produit: idProduct,
//             Code_Client: idClient,
//             quantité: quantity,
//           },
//         },
//       ],
//     });
//   }
// };

// module.exports.createOrder = async function () {
//   instance.post("/Commande%20Produits", {
//     records: [
//       {
//         fields: {},
//       },
//     ],
//   });
// };

// const getOrder = async function ({ id }) {
//   return instance
//     .get(`/Commande%20Produits?filterByFormula=id%7D%3D%22${id}`)
//     .then((res) => res.data?.records?.[0]);
// };

// module.exports.getOrder = getOrder;

// module.exports.postCartOrder = async function ({ id }) {
//   const order = await getOrder({ id });
//   console.log(order);

//   instance.patch("/Panier", {
//     records: [
//       {
//         fields: {
//           Commande_Produits: id,
//         },
//       },
//     ],
//   });
// };
