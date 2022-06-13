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
      `/cart_items?filterByFormula=AND(%7Bcustomer_id%7D%3D%22${customer_id}%22%2C%7Bproduct_id%7D%3D%22${product_id}%22)`
    )
    .then((res) => res.data?.records?.[0]);
}

async function setCartQuantity({ product_id, customer_id, quantity }) {
  const cartItem = await getCartItem({ product_id, customer_id });

  if (cartItem) {
    if (quantity !== 0)
      return instance.patch("/cart_items", {
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
    else return instance.delete(`/cart_items/${cartItem.fields.id}`);
  } else if (quantity !== 0) {
    return instance.post("/cart_items", {
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

async function addProduct({ name, price }) {
  return instance.post("/products", {
    records: [
      {
        fields: {
          name: name,
          price: price,
        },
      },
    ],
  });
}

async function addCustomer({ email = "test@gmail.com", password = "test" }) {
  return instance.post("/users", {
    records: [
      {
        fields: { email, password },
      },
    ],
  });
}

async function main() {
  const {
    data: {
      records: [product],
    },
  } = await addProduct({ name: "test", price: 22 });

  const {
    data: {
      records: [customer],
    },
  } = await addCustomer({
    name: "test",
    email: "test@gmail.com",
    password: "test",
  });

  await setCartQuantity({
    customer_id: customer.fields.id,
    product_id: product.fields.id,
    quantity: 1,
  });
  await setCartQuantity({
    customer_id: customer.fields.id,
    product_id: product.fields.id,
    quantity: 2,
  });
  await setCartQuantity({
    customer_id: customer.fields.id,
    product_id: product.fields.id,
    quantity: 0,
  });
  await setCartQuantity({
    customer_id: customer.fields.id,
    product_id: product.fields.id,
    quantity: 0,
  });
  await setCartQuantity({
    customer_id: customer.fields.id,
    product_id: product.fields.id,
    quantity: 3,
  });
}

main();
