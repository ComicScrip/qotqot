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
  const user = await findUserByEmail(email);
  if (!user) return res.status(404).send();
  const resetPasswordToken = crypto.randomBytes(50).toString("hex");
  await updateUser(user, {
    resetPasswordToken: await hashPassword(resetPasswordToken),
  });

  const mailBody = `Bonjour, vous avez oublié votre mot de passe ? Pas de panique, vous pouvez le changer en cliquant sur ce lien : ${
    process.env.NEXTAUTH_URL ||
    process.env.VERCEL_URL ||
    `http://localhost:3000`
  }/mot-de-passe-oublie?resetPasswordToken=${resetPasswordToken}&email=${email}`;
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
