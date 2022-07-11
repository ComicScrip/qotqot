import { filterProducts } from "../../../models/product";

async function filterCategory(req, res) {
  const userInput = Object.values(req.query).toLocaleString();
  try {
    res.send(
      await filterProducts({
        category: userInput,
      })
    );
  } catch {
    res.status(500).send("Error");
  }
}

export default filterCategory;
