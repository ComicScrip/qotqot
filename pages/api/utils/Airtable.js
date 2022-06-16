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
    makerPicture:
      record.fields["Photos Producteurs (from FOURNISSEUR)"]?.[0].url,
    makerName: record.fields.PRODUCTEUR,
    makerAdress: record.fields["Localisation (from FOURNISSEUR)"],
    descriptionProduit: record.fields["Descriptif Produit"],
    descriptionProducteur:
      record.fields["Descriptif Producteur (from FOURNISSEUR)"],
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

export { minifyProducts, getMinifiedProduct, minifyOrders, getMinifiedOrder };
