/* eslint-disable no-undef */
import base from "../../../middlewares/common";
import mailer from "../../../mailer";
import {
  findUserByEmail,
  hashPassword,
  updateUser,
} from "../../../models/user";
import crypto from "crypto";

async function handlePost(req, res) {
  const { email } = req.body;
  console.log({ email });
  const user = await findUserByEmail(email);
  if (!user) return res.status(404).send();

  const resetPasswordToken = crypto.randomBytes(50).toString("hex");
  console.log(email, resetPasswordToken);
  await updateUser(user, {
    resetPasswordToken: await hashPassword(resetPasswordToken),
  });

  const mailBody = `Rendez-vous sur ce lien pour changer votre mot de passe : ${process.env.NEXTAUTH_URL}/reset-password?resetPasswordToken=${resetPasswordToken}&email=${email}`;
  await mailer.sendMail({
    from: process.env.MAILER_FROM,
    to: email,
    subject: `Réinitialisez votre mot de passe`,
    text: mailBody,
    html: mailBody,
  });
  res.send("Reset password email sent");
}

export default base().post(handlePost);
