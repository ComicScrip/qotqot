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
    info: record.fields,
    name: record.fields.Produit,
    weight: record.fields.Conditionnement,
    price: record.fields["Prix d'achat unitaire €HT"],
    pricePerKg: record.fields["Prix d'achat kg/g/L €HT"],
    stock: record.fields.Dispo,
    picture: record.fields["Photos Producteurs (from FOURNISSEUR)"][0].url,
  };
};

export { table, minifyRecords, getMinifiedRecord };
