import Airtable from "airtable";
const base = new Airtable({ apiKey: "keyH3Q5oGVJYOHLMj" }).base(
  "app5Yy06J0dhcG7Xb"
);

const table = base("tblUHOyO8G8P0yOQ6");

const minifyRecords = (records) => {
  return records.map((record) => getMinifiedRecord(record));
};

const getMinifiedRecord = (record) => {
  return {
    id: record.id,
    name: record.fields.Produit,
  };
};

export { table, minifyRecords, getMinifiedRecord };
