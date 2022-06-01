/* eslint-disable import/no-anonymous-default-export */
import { table, minifyRecords } from "./utils/Airtable";

export default async function getAllProducts(req, res) {
  try {
    const records = await table.select({}).firstPage();
    const minifiedRecords = minifyRecords(records);
    res.statusCode = 200;
    res.json({ minifiedRecords });
  } catch (error) {
    res.statusCode = 500;
    res.json({ msg: "Something went very wrong :( " });
  }
}

// --------------------------------- Every Page attempt -------------------------------------//

// const base = new Airtable({ apiKey: "keyH3Q5oGVJYOHLMj" }).base(
//   "app5Yy06J0dhcG7Xb"
// );
// import Airtable from "airtable";

// base("Produits Actifs")
//   .select({})
//   .eachPage(
//     function page(records, fetchNextPage) {
//       // This function (`page`) will get called for each page of records.

//       records.forEach(function (record) {
//         console.log("Retrieved", record.get("Code Produit QotQot"));
//       });

//       // To fetch the next page of records, call `fetchNextPage`.
//       // If there are more records, `page` will get called again.
//       // If there are no more records, `done` will get called.
//       fetchNextPage();
//     },
//     function done(err) {
//       if (err) {
//         console.error(err);
//         return;
//       }
//     }
//   );
