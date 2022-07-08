import { filterProducts } from "../../../models/product";

async function filterCategory(req, res) {
  const userInput = Object.values(req.query).toLocaleString();
  console.log(userInput);
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
