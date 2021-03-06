const db = require("./db");
const axios = require("axios");
const { minifyProducts } = require("./Airtable");

(async function main() {
  await db.Product.deleteMany();

  const { data: productList } = await axios.get(
    "https://api.airtable.com/v0/app5Yy06J0dhcG7Xb/Produits%20Actifs",
    {
      headers: {
        Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
      },
    }
  );

  const products = minifyProducts(productList.records);

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
})();
