require("dotenv").config();
const { default: axios } = require("axios");

const instance = axios.create({
  baseURL: process.env.AIRTABLE_API,
  headers: {
    Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
  },
});

const getCartItem = async function ({ product_id, customer_id }) {
  return instance
    .get(
      `/Panier?filterByFormula=AND(%7BCode_Client%7D%3D%22${customer_id}%22%2C%7BCode_Produit%7D%3D%22${product_id}%22)`
    )
    .then((res) => res.data?.records?.[0]);
};

module.exports.getCartItem = getCartItem;

module.exports.setCartQuantity = async function ({
  product_id,
  customer_id,
  Quantity,
}) {
  const cartItem = await getCartItem({ product_id, customer_id });

  if (cartItem) {
    if (Quantity !== 0)
      return instance.patch("/Panier", {
        records: [
          {
            id: cartItem.fields.id,
            fields: {
              Code_Produit: [product_id],
              Code_Client: [customer_id],
              quantité: Quantity,
            },
          },
        ],
      });
    else return instance.delete(`/Panier/${cartItem.fields.id}`);
  } else if (Quantity !== 0) {
    return instance.post("/Panier", {
      records: [
        {
          fields: {
            Code_Produit: [product_id],
            Code_Client: [customer_id],
            quantité: Quantity,
          },
        },
      ],
    });
  }
};

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
