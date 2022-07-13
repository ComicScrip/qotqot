/* eslint-disable no-undef */
import base from "../../../middlewares/common";
import { findUserByEmail } from "../../../models/user";

async function handlePost(req, res) {
  const { email } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return res.status(404).send();
  if (user && !user.fields.MDP) res.status(200).send();
  return res.status(401).send();
}

export default base().post(handlePost);
