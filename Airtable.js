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
    name: record.fields.Produit,
    weight: record.fields.Conditionnement,
    price: record.fields["Prix d'achat unitaire €HT"],
    pricePerKg: record.fields["Prix d'achat kg/g/L €HT"],
    stock: record.fields.Dispo,
    picture: record.fields["Image produits sans fond"]?.[0].url,
    makerPicture:
      record.fields["Photos Producteurs (from FOURNISSEUR)"]?.[0].url,
    makerName: record.fields.PRODUCTEUR,
    makerAdress: record.fields["Localisation (from FOURNISSEUR)"],
    descriptionProduit: record.fields["Descriptif Produit"],
    descriptionProducteur:
      record.fields["Descriptif Producteur (from FOURNISSEUR)"],
    logo: record.fields["LABEL LOGO (from FOURNISSEUR)"]?.[0].url,
    category: record.fields.Catégorie[0],
    typeUVC: record.fields["UVC - Conditionnement"],
    poidsUVC: record.fields["UVC - Poids/vol"],
    uniteUVC: record.fields["UVC - Unité"],
  };
};

const minifyOrders = (records) => {
  return records.map((record) => getMinifiedOrder(record));
};

const getMinifiedOrder = (record) => {
  return {
    id: record.id,
    orderNumber: record.fields["Numéro de commande"],
    dateLivraison: dayjs(record.fields["Date commande Rollup"][0], "DD/MM/YYYY")
      .locale("fr")
      .format("D MMM YYYY"),
    statut: record.fields.Status,
    totalAmount: record.fields["Total (HT) Rollup (from Commandes Pro)"],
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
    price: record.fields["Prix d'achat unitaire €HT"][0],
    pricePerKg: record.fields["Prix d'achat kg/g/L €HT"][0],
    totalPrice: record.fields["Montant HT"],
    stock: record.fields.Dispo,
    picture: record.fields["Image produits sans fond"]?.[0].url,
    typeUVC: record.fields["UVC - Conditionnement"],
    poidsUVC: record.fields["UVC - Poids/vol"],
    uniteUVC: record.fields["UVC - Unité"],
  };
};

const minifyOrderProducts = (records) => {
  return records.map((record) => getMinifiedOrderProduct(record));
};

const getMinifiedOrderProduct = (record) => {
  return {
    id: record.id,
    orderNumber: record.fields["Numéro de commande"],
    name: record.fields["Numéro de commande"],
    weight: record.fields["Numéro de commande"],
    totalAmount: record.fields["Numéro de commande"],
    quantity: record.fields["Numéro de commande"],
    price: record.fields["Numéro de commande"],
    pricePerKg: record.fields["Numéro de commande"],
    picture: record.fields["Numéro de commande"],
    dateLivraison: record.fields["Numéro de commande"],
    statut: record.fields.Status,
    codeProduits:
      record.fields["Code Produit QotQot (from Commande Produits API)"],
  };
};

module.exports = {
  minifyProducts,
  getMinifiedProduct,
  minifyOrders,
  getMinifiedOrder,
  minifyCartItems,
  minifyOrderProducts,
  getMinifiedOrderProduct,
};
