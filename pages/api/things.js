// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from "../../db";

export default async function handler(req, res) {
  res.status(200).json(await db.thing.findMany());
}
