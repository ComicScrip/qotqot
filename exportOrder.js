const db = require("./db");
const axios = require("axios");

(async function main() {
  const orders = await db.order.findMany({
    include: {
      customerCartItem: {
        include: { product: true },
      },
    },
    where: {
      synchWithAT: false,
    },
  });

  const items = orders.flatMap((order) =>
    order.customerCartItem.map((cartItem) => ({
      "Code Produit QotQot": cartItem.product.codeProduit,
      Quantite: cartItem.quantity,
      Client: cartItem.idClient,
      "Numéro de commande": cartItem.idOrder,
    }))
  );

  if (items.length === 0) {
    return;
  }

  await axios.post(
    "https://api.airtable.com/v0/app5Yy06J0dhcG7Xb/Commande%20Produits%20API",

    {
      records: items.map((item) => ({
        fields: {
          ...item,
        },
      })),
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
      },
    }
  );

  await db.order.updateMany({
    data: {
      synchWithAT: true,
    },
    where: {
      id: {
        in: orders.map((order) => order.id),
      },
    },
  });
})();