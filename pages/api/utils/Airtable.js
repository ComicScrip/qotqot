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
    codeProduit: record.fields["Code Produit QotQot"],
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
    dateLivraison: dayjs(
      record.fields["Date de Livraison (import)"],
      "DD/MM/YYYY"
    )
      .locale("fr")
      .format("D MMM YYYY"),
    statut: record.fields.Status,
  };
};

const minifyCartItems = (records) => {
  return records.map((record) => getMinifiedCartItems(record));
};

const getMinifiedCartItems = (record) => {
  return {
    id: record.id,
    Quantity: record.fields["quantité"],
    codeProduit: record.fields["Code Produit QotQot"],
    ProductId: record.fields["Code_Produit"],
    ClientId: record.fields["Code_Client"],
    name: record.fields.Produit,
    weight: record.fields.Conditionnement,
    price: record.fields["Prix d'achat unitaire €HT"].toFixed(2),
    pricePerKg: record.fields["Prix d'achat kg/g/L €HT"].toFixed(2),
    totalPrice: record.fields["Montant HT"].toFixed(2),
    stock: record.fields.Dispo,
    picture: record.fields["Image produits sans fond"]?.[0].url,
    typeUVC: record.fields["UVC - Conditionnement"],
    poidsUVC: record.fields["UVC - Poids/vol"],
    uniteUVC: record.fields["UVC - Unité"],
  };
};

export {
  minifyProducts,
  getMinifiedProduct,
  minifyOrders,
  getMinifiedOrder,
  minifyCartItems,
};
