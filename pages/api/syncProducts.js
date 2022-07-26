import { importProductsFromAT } from "../../scripts/improvedImport";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { secret } = req.query;
      if (process.env.API_SECRET_KEY !== secret) return res.status(401).send();
      await importProductsFromAT();
      res.send("import has been done");
    } catch (err) {
      console.error(err.response.data);
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
}
