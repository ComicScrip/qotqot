import { filterProducts } from "../../../models/product";

async function filterCategory(req, res) {
  const userFilter = req.query.category;

  try {
    res.send(
      await filterProducts({
        category: userFilter,
      })
    );
  } catch {
    res.status(500).send("Error");
  }
}

export default filterCategory;
