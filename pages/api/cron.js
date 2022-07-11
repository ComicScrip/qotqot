export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { key } = req.query;
      console.log("key", key);
      res.status(200).send("ok");
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
