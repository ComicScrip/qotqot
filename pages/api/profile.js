import base from "../../middlewares/common";
import reqCurrentUser from "../../middlewares/reqCurrentUser";
import { getSafeAttributes } from "../../models/user";

async function handleGetProfile(req, res) {
  console.log("hellllllllo");
  return res.send(getSafeAttributes(req.currentUser));
}

export default base().use(reqCurrentUser).get(handleGetProfile);
