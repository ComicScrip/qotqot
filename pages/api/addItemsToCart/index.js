import axios from "axios";
import { getCartItem } from "../utils/airtableCart";

const instance = axios.create({
  baseURL: process.env.AIRTABLE_API,
  headers: {
    Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
  },
});

export default async function setCartQuantity({
  product_id,
  customer_id,
  quantity,
}) {
  const cartItem = await getCartItem({ product_id, customer_id });

  if (cartItem) {
    if (quantity !== 0)
      return instance.patch("/Panier", {
        records: [
          {
            id: cartItem.fields.id,
            fields: {
              product_id: [product_id],
              customer_id: [customer_id],
              quantity,
            },
          },
        ],
      });
    else return instance.delete(`/Panier/${cartItem.fields.id}`);
  } else if (quantity !== 0) {
    return instance.post("/Panier", {
      records: [
        {
          fields: {
            product_id: [product_id],
            customer_id: [customer_id],
            quantity,
          },
        },
      ],
    });
  }
}
