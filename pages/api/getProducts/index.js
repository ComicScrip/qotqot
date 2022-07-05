import base from "../../../middlewares/common";
import reqCurrentUser from "../../../middlewares/reqCurrentUser";
import { findAllProducts, findOneProduct } from "../../../models/product";

export async function getAllProducts(req, res) {
  if (req.query) {
    try {
      res.send(await findOneProduct(req.query.id));
      console.log("query");
    } catch {
      res.send(await findAllProducts());
      console.log("hello");
    }
  }
}
export default base().use(reqCurrentUser).get(getAllProducts);
