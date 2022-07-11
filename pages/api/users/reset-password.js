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
    return res.status(400).send("passwords dont match");
  const user = await findUserByEmail(email);
  if (!user) return res.status(404).send();
  if (
    !(await verifyPassword(resetPasswordToken, user.fields.resetPasswordToken))
  )
    return res.status(400).send("invalid token");
  await updateUser(user, {
    resetPasswordToken: null,
    hashedPassword: await hashPassword(newPassword),
  });
  res.send("password has been reset");
}

export default base().post(handlePost);
