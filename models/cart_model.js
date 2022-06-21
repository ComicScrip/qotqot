// module.exports.setCartQuantity = ({ product_id, customer_id, quantity }) => {
//   const cartItem = getCartItem({ product_id, customer_id });

//   console.log(
//     JSON.stringify(
//       {
//         records: [
//           {
//             id: cartItem.fields.id,
//             fields: {
//               Code_Produit: [product_id],
//               Code_Client: [customer_id],
//               quantité: quantity,
//             },
//           },
//         ],
//       },
//       null,
//       2
//     )
//   );

//   if (cartItem) {
//     if (quantity !== 0)
//       return instance.patch("/Panier", {
//         records: [
//           {
//             id: cartItem.fields.id,
//             fields: {
//               Code_Produit: [product_id],
//               Code_Client: [customer_id],
//               quantité: quantity,
//             },
//           },
//         ],
//       });
//     else return instance.delete(`/Panier/${cartItem.fields.id}`);
//   } else if (quantity !== 0) {
//     return instance.post("/Panier", {
//       records: [
//         {
//           fields: {
//             Code_Produit: [product_id],
//             Code_Client: [customer_id],
//             quantité: quantity,
//           },
//         },
//       ],
//     });
//   }
// };
