import exportOrdersToAirtable from "../../scripts/exportOrders";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { secret } = req.query;
      if (process.env.API_SECRET_KEY !== secret) return res.status(401).send();
      await exportOrdersToAirtable();
      res.send("export has been done");
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
}
