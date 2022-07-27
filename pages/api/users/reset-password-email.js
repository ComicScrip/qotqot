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

  const Mailbody = `
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
      <br>
      <img
      src="https://scontent-cdg2-1.xx.fbcdn.net/v/t39.30808-6/287962759_444388427686792_1546520322188047938_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=174925&_nc_ohc=RFGrIoW6uUQAX_gePwi&_nc_ht=scontent-cdg2-1.xx&oh=00_AT9QGcWvFkbRtu_zQPjbO2dttNYLB8A9awAgvazpv3NoEA&oe=62E5A63F"
      alt="logo_qotqot"
      width="100px"
      height="100px"
    />
    </div>`;

  await mailer.sendMail({
    from: process.env.MAILER_FROM,
    to: email,
    subject: `QotQot - Réinitialisez votre mot de passe`,
    text: Mailbody,
    html: Mailbody,
  });
  res.send("Reset password email sent");
}

export default base().post(handlePost);
