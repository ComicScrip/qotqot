import Airtable from "airtable";
const base = new Airtable({ apiKey: process.env.AIR_TABLE_API_KEY }).base(
  process.env.AIR_TABLE_BASE_ID
);

const table = base(process.env.AIR_TABLE_TABLE_NAME);

const minifyRecords = (records) => {
  return records.map((record) => getMinifiedRecord(record));
};

const getMinifiedRecord = (record) => {
  return {
    id: record.id,
    info: record.fields,
    name: record.fields.Produit,
    weight: record.fields.Conditionnement,
    price: record.fields["Prix d'achat unitaire €HT"].toFixed(2),
    pricePerKg: record.fields["Prix d'achat kg/g/L €HT"].toFixed(2),
    stock: record.fields.Dispo,
    picture: record.fields["Photos Producteurs (from FOURNISSEUR)"][0].url,
  };
};

export { table, minifyRecords, getMinifiedRecord };
