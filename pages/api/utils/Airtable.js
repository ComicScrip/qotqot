import "dayjs/locale/fr";
const dayjs = require("dayjs");

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const minifyProducts = (records) => {
  return records.map((record) => getMinifiedProduct(record));
};

const getMinifiedProduct = (record) => {
  return {
    id: record.id,
    info: record.fields,
    name: record.fields.Produit,
    weight: record.fields.Conditionnement,
    price: record.fields["Prix d'achat unitaire €HT"].toFixed(2),
    pricePerKg: record.fields["Prix d'achat kg/g/L €HT"].toFixed(2),
    stock: record.fields.Dispo,
    picture: record.fields["Image produits sans fond"]?.[0].url,
  };
};

const minifyOrders = (records) => {
  return records.map((record) => getMinifiedOrder(record));
};

const getMinifiedOrder = (record) => {
  return {
    id: record.id,
    orderNumber: record.fields["Numéro de commande"],
    dateLivraison: dayjs(
      record.fields["Date de Livraison (import)"],
      "DD/MM/YYYY"
    )
      .locale("fr")
      .format("D MMM YYYY"),
    dateLivraison2: dayjs(
      record.fields["Date de Livraison (import)"],
      "DD/MM/YYYY"
    )
      .locale("fr")
      .format("DD/MM/YYYY"),
    statut: record.fields.Status,
    totalAmount: record.fields["Total (HT) Rollup (from Commandes Pro)"],
  };
};

const minifyOrderProducts = (records) => {
  return records.map((record) => getMinifiedOrderProduct(record));
};

const getMinifiedOrderProduct = (record) => {
  return {
    id: record.id,
    orderNumber: record.fields["Numéro de commande"],
    name: record.fields.Produit,
    weight: record.fields["Poids (grammes)"],
    totalAmount: record.fields["Total de commande"],
    quantity: record.fields.Quantite,
    price: record.fields["Tarif Pro (HT)"],
    pricePerKg: record.fields["Tarif Pro (HT) au Kg/L"],
    picture: record.fields["Image produits sans fond"]?.[0].url,
    dateLivraison: record.fields["Date de livraison"],
    statut: record.fields.Status,
  };
};

export {
  minifyProducts,
  getMinifiedProduct,
  minifyOrders,
  getMinifiedOrder,
  minifyOrderProducts,
  getMinifiedOrderProduct,
};
