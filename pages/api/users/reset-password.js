import base from "../../../middlewares/common";
import {
  findUserByEmail,
  hashPassword,
  updateUser,
  verifyPassword,
} from "../../../models/user";

async function handlePost(req, res) {
  const { newPassword, newPasswordConfirmation, resetPasswordToken, email } =
    req.body;
  if (newPassword !== newPasswordConfirmation)
    return res.status(400).send("Les mots de passe ne correspondent pas");
  const user = await findUserByEmail(email);
  if (!user) return res.status(404).send();
  if (
    !(await verifyPassword(resetPasswordToken, user.fields.resetPasswordToken))
  )
    return res.status(401).send("invalid token");
  await updateUser(user, {
    resetPasswordToken: null,
    hashedPassword: await hashPassword(newPassword),
  });
  res.send("Nouveau mot de passe enregistré");
}

export default base().post(handlePost);
