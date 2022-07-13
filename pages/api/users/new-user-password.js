import base from "../../../middlewares/common";
import {
  findUserByEmail,
  hashPassword,
  updateUser,
} from "../../../models/user";

async function handlePost(req, res) {
  const { newPassword, newPasswordConfirmation, email } = req.body;
  if (newPassword !== newPasswordConfirmation)
    return res.status(400).send("passwords dont match");
  const user = await findUserByEmail(email);
  if (!user) return res.status(404).send();
  if (user.fields.MDP) return res.status(422).send();
  await updateUser(user, {
    hashedPassword: await hashPassword(newPassword),
  });
  res.send("password has been reset");
}

export default base().post(handlePost);
