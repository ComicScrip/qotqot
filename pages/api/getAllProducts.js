/* eslint-disable import/no-anonymous-default-export */
import Airtable from "airtable";
const base = new Airtable({ apiKey: "keyH3Q5oGVJYOHLMj" }).base(
  "app5Yy06J0dhcG7Xb"
);

const table = base("tblUHOyO8G8P0yOQ6");

const minifyRecords = (records) => {
  return records.map((record) => getminifiedRecord(record));
};

const getminifiedRecord = (record) => {
  return {
    id: record.id,
    name: record.fields.Produit,
  };
};

export default async (req, res) => {
  const records = await table.select({}).firstPage();
  const minifiedRecords = minifyRecords(records);
  res.statusCode = 200;
  res.json({ minifiedRecords });
};
