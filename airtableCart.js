require("dotenv").config();
const { default: axios } = require("axios");

const instance = axios.create({
  baseURL: process.env.AIRTABLE_API,
  headers: {
    Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
  },
});

async function getCartItem({ product_id, customer_id }) {
  return instance
    .get(
      `/Panier?filterByFormula=AND(%7BCode_Client%7D%3D%22${customer_id}%22%2C%7BCode_Produit%7D%3D%22${product_id}%22)`
    )
    .then((res) => res.data?.records?.[0]);
}

// async function getCustomerCartItems({ customer_id }) {
//   return instance
//     .get(`/Panier?filterByFormula=%7BCode_Client%7D%3D%22${customer_id}%22`)
//     .then((res) => res.data?.records);
// }

async function setCartQuantity({ product_id, customer_id, Quantity }) {
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
}

// async function main() {
//   console.log(
//     await instance
//       .post("/Panier", {
//         records: [
//           {
//             fields: {
//               Code_Produit: ["recZuWavculxmmAqR"],
//               Code_Client: ["recMbBWB0hKk7OOOG"],
//               quantité: 1,
//             },
//           },
//         ],
//       })
//       .catch((err) => console.log(err.response))
//   );

//   console.log(
//     await getCustomerCartItems({
//       customer_id: "recMbBWB0hKk7OOOG",
//     })
//   );
// }

// main();

export { setCartQuantity };
