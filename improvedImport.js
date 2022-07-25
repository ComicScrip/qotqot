/* eslint-disable no-unused-vars */
// const db = require("./db");
const { minifyProducts } = require("./Airtable");

const Airtable = require("airtable");
const base = new Airtable({ apiKey: `keyH3Q5oGVJYOHLMj` }).base(
  "app5Yy06J0dhcG7Xb"
);

(async function main() {
  // await db.Product.deleteMany();

  const productList = base("Produits Actifs")
    .select()
    .eachPage(
      function page(records, fetchNextPage) {
        fetchNextPage();
        console.log(records[0].id);
        console.log(records.length);
        //console.log(minifyProducts(records));
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  //console.log(typeof productList);

  //const products = minifyProducts(productList.records);
  //   await db.Product.createMany({
  //     data: products.map(
  //       ({
  //         codeProduit,
  //         name,
  //         weight,
  //         price,
  //         pricePerKg,
  //         stock,
  //         picture,
  //         makerPicture,
  //         makerName,
  //         makerAdress,
  //         descriptionProduit,
  //         descriptionProducteur,
  //         logo,
  //         category,
  //         typeUVC,
  //         poidsUVC,
  //         uniteUVC,
  //       }) => ({
  //         codeProduit,
  //         name,
  //         weight,
  //         price,
  //         pricePerKg,
  //         stock,
  //         picture,
  //         makerPicture,
  //         makerName,
  //         makerAdress,
  //         descriptionProduit,
  //         descriptionProducteur,
  //         logo,
  //         category,
  //         typeUVC,
  //         poidsUVC,
  //         uniteUVC,
  //       })
  //     ),
  //   });
})();
