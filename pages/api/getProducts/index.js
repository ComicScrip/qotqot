import base from "../../../middlewares/common";
import reqCurrentUser from "../../../middlewares/reqCurrentUser";
import { findAllProducts } from "../../../models/product";

export async function getAllProducts(req, res) {
  {
    try {
      res.send(await findAllProducts());
      console.log("hello");
    } catch (error) {
      res.send("Couldn't find products, please try again");
    }
  }
}
export default base().use(reqCurrentUser).get(getAllProducts);
