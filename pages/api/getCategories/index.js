import base from "../../../middlewares/common";
import reqCurrentUser from "../../../middlewares/reqCurrentUser";
import { getAllCategories } from "../../../models/product";

export async function getCategories(req, res) {
  {
    try {
      res.send(await getAllCategories());
    } catch {
      res.status(500).send("fuck me x(");
    }
  }
}

export default base().use(reqCurrentUser).get(getCategories);
