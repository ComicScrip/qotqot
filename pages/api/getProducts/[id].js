import { findOneProduct } from "../../../models/product";

async function getProduct(req, res) {
  try {
    res.send(await findOneProduct(req.query.id));
  } catch {
    res.status(500).send("Error");
  }
}

export default getProduct;
