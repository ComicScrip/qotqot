import { getSession } from "next-auth/react";
import { findUserByEmail, getSafeAttributes } from "../../models/user";

async function handleGetProfile(req, res) {
  const session = await getSession({ req });
  req.currentUser = await findUserByEmail(session?.user?.email);
  if (!req.currentUser) return res.status(401).send("Unauthorized");

  return res.send(getSafeAttributes(req.currentUser));
}

export default function handler(req, res) {
  if (req.method === "GET") handleGetProfile(req, res);
  else res.status(405).send("method not allowed");
}
