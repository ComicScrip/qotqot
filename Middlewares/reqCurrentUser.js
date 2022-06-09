import { findUserByEmail } from "../models/user";
import { getSession } from "next-auth/react";

const reqCurrentUser = async (req, res, next) => {
  const session = await getSession({ req });
  req.currentUser = await findUserByEmail(session?.user?.email);
  if (!req.currentUser) res.status(401).send("Unauthorized");
  else next();
};

export default reqCurrentUser;
