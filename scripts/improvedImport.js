const db = require("../db");
const { minifyProducts } = require("../Airtable");

const Airtable = require("airtable");
const base = new Airtable({ apiKey: `${process.env.AIR_TABLE_API_KEY}` }).base(
  "app5Yy06J0dhcG7Xb"
);

export async function importProductsFromAT() {
  //await db.Product.deleteMany();

  const records = await base("Produits Actifs").select().all();
  const products = minifyProducts(records);
  await Promise.all(
    products.map((item) => {
      return db.product.upsert({
        where: {
          codeProduit: item.codeProduit,
          name: item.name,
          weight: item.weight,
          price: item.price,
          pricePerKg: item.pricePerKg,
          stock: item.stock,
          picture: item.picture,
          makerPicture: item.makerPicture,
          makerName: item.makerName,
          makerAdress: item.makerAdress,
          descriptionProduit: item.descriptionProduit,
          descriptionProducteur: item.descriptionProducteur,
          logo: item.logo,
          category: item.category,
          typeUVC: item.typeUVC,
          poidsUVC: item.poidsUVC,
          uniteUVC: item.uniteUVC,
        },
      });
    })
  );
}
