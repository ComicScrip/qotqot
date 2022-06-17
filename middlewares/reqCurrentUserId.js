import { findCartByUserId } from "../models/user";
import { getSession } from "next-auth/react";

const reqCurrentUserId = async (req, res, next) => {
  console.log("reqcurrentuser");

  const session = await getSession({ req });
  req.currentUserId = await findCartByUserId(session?.user?.id);
  if (!req.currentUserId) res.status(401).send("Unauthorized");
  else next();
};

export default reqCurrentUserId;
