const db = require("../db");
const { minifyProducts } = require("../Airtable");

const Airtable = require("airtable");
const base = new Airtable({ apiKey: `${process.env.AIR_TABLE_API_KEY}` }).base(
  "app5Yy06J0dhcG7Xb"
);

export async function importProductsFromAT() {
  await db.Product.deleteMany();

  const records = await base("Produits Actifs")
    .select()

    .all();
  const products = minifyProducts(records);
  await db.Product.createMany({
    data: products.map(
      ({
        codeProduit,
        name,
        weight,
        price,
        pricePerKg,
        stock,
        picture,
        makerPicture,
        makerName,
        makerAdress,
        descriptionProduit,
        descriptionProducteur,
        logo,
        category,
        typeUVC,
        poidsUVC,
        uniteUVC,
      }) => ({
        codeProduit,
        name,
        weight,
        price,
        pricePerKg,
        stock,
        picture,
        makerPicture,
        makerName,
        makerAdress,
        descriptionProduit,
        descriptionProducteur,
        logo,
        category,
        typeUVC,
        poidsUVC,
        uniteUVC,
      })
    ),
  });
}
