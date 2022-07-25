const db = require("../db");
const axios = require("axios");
const makeChunks = require("../utils/makeChunks");

const wait = (seconds) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

async function exportOrdersToAirtable() {
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
      "Commentaire Livraison": order.comment,
      "Date Livraison": order.delivery.toString(),
      "Date commande": order.createdAt.toString(),
    }))
  );

  if (items.length === 0) {
    return;
  }

  const chunks = makeChunks(items, 10);

  for (let chunk of chunks) {
    console.log("syncing 10 items...");

    await axios.post(
      "https://api.airtable.com/v0/app5Yy06J0dhcG7Xb/Commande%20Produits%20API",
      {
        records: chunk.map((item) => ({
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
    await wait(1);
  }

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
}

exportOrdersToAirtable();

module.exports = exportOrdersToAirtable;
