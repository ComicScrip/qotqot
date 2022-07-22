/* eslint-disable no-undef */
import base from "../../../middlewares/common";
import mailer from "../../../mailer";
const { htmlToText } = require("html-to-text");

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

  const Mailbody = htmlToText(
    `
    <div>
      <p>Bonjour,</p>
      <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
      <p>Veuillez cliquer sur ce lien pour changer de mot de passe :</p>
      <p>${
        process.env.NEXTAUTH_URL ||
        process.env.VERCEL_URL ||
        `http://localhost:3000`
      }/mot-de-passe-oublie?resetPasswordToken=${resetPasswordToken}&email=${email}
      </p>
      <p>
        Si le lien ne fonctionne pas, vous pouvez directement le copier/coller
        dans la barre d’adresse de votre navigateur.
      </p>
      <p>
        Si vous ne voulez pas réinitialiser votre mot de passe, ignorez ce
        message et votre mot de passe restera inchangé.
      </p>
      <p>Merci pour votre fidélité,</p>
      <p>L’équipe QotQot</p>
    </div>`,
    { wordwrap: 130 }
  );

  // const mailBody = `Bonjour, vous avez oublié votre mot de passe ? Pas de panique, vous pouvez le changer en cliquant sur ce lien : ${
  //   process.env.NEXTAUTH_URL ||
  //   process.env.VERCEL_URL ||
  //   `http://localhost:3000`
  // }/mot-de-passe-oublie?resetPasswordToken=${resetPasswordToken}&email=${email}`;

  await mailer.sendMail({
    from: process.env.MAILER_FROM,
    to: email,
    subject: `Réinitialisez votre mot de passe`,
    text: Mailbody,
    html: Mailbody,
  });
  res.send("Reset password email sent");
}

export default base().post(handlePost);
