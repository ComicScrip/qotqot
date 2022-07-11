import base from "../../../middlewares/common";
import reqCurrentUser from "../../../middlewares/reqCurrentUser";
import { findAllProducts } from "../../../models/product";

export async function getAllProducts(req, res) {
  if (req.query) {
    try {
      res.send(await findAllProducts());
    } catch {
      res.status(500).send("Error");
    }
  }
}
export default base().use(reqCurrentUser).get(getAllProducts);
