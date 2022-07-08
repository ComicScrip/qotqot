import { filterProducts } from "../../../models/product";

async function filterCategory(req, res) {
  try {
    res.send(
      await filterProducts({
        category: "Épicerie salée",
      })
    );
  } catch {
    res.status(500).send("Error");
  }
}

export default filterCategory;
