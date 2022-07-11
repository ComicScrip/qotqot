/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/dist/client/router";

export default function RestPasswordPage({ csrfToken }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const sendResetPasswordEmail = (e) => {
    e.preventDefault();
    axios
      .post("/api/users/reset-password-email", { email })
      .then(() => {
        setResetEmailSent(!resetEmailSent);
      })
      .catch(() => {
        toast.error("Email introuvable");
      });
  };
  const resetPassword = (e) => {
    e.preventDefault();

    if (newPassword !== newPasswordConfirmation)
      return toast.error("Les mots de passe ne correspondent pas");

    axios
      .post("/api/users/reset-password", {
        newPassword,
        newPasswordConfirmation,
        resetPasswordToken: router.query.resetPasswordToken,
        email: router.query.email,
      })
      .then(() => {
        toast.success("Nouveau mot de passe enregistré");
        setTimeout(() => {
          router.push("/");
        }, 3000);
      })
      .catch((err) => {
        if (err.response.status === 400) return;
        toast.error("Ce lien de réinitialisation n'est plus valide");
        setTimeout(() => {
          router.push("/");
        }, 5000);
        setResetEmailSent(false);
      });
  };

  return (
    <>
      <Toaster position="bottom-center" />
      {resetEmailSent ? (
        <div id="email-sent" className="w-full h-full m-auto ">
          <div className="m-auto mt-16 flex flex-col justify-center items-center ">
            <div>
              <Image
                src="/assets/logo-qot-qot.png"
                alt="logo_qotqot"
                width={148}
                height={164}
              />
            </div>
            <p className="m-auto mt-6 ml-7 mr-7 font-bold text-lg text-center text-[#7F7F7F]">
              Un message avec un lien de réinitialisation vous a été envoyé,
              merci de vérifier votre boîte mail
            </p>
          </div>
        </div>
      ) : (
        <>
          {router.query.resetPasswordToken ? (
            <div id="login" className="w-full h-full m-auto ">
              <div className=" m-auto mt-16 flex flex-col justify-center items-center ">
                <div>
                  <Image
                    src="/assets/logo-qot-qot.png"
                    alt="logo_qotqot"
                    width={148}
                    height={164}
                  />
                </div>
                <h1 className="my-8 tracking-2">Mot de passe oublié</h1>
              </div>

              <form
                method="post"
                onSubmit={resetPassword}
                className="flex flex-col px-3 py-4 "
                data-cy="loginForm"
              >
                <input
                  id="csrfToken"
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />
                <div className="text-[#7F7F7F] border-2 border-gray-200 h-14 px-4 flex flex-col rounded-lg">
                  <label className="text-[#7F7F7F]">
                    Renseignez votre mot de passe
                  </label>
                  <input
                    data-cy="newPassword"
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    className="text-[#7F7F7F]"
                    required
                    minLength="8"
                    maxLength="30"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="text-[#7F7F7F] mt-2 border-2 border-gray-200 h-14 px-4 flex flex-col rounded-lg">
                  <label className="text-[#7F7F7F]">
                    Confirmez votre mot de passe
                  </label>
                  <input
                    data-cy="newPasswordConfirmation"
                    type="password"
                    id="newPasswordConfirmation"
                    name="newPasswordConfirmation"
                    className="text-[#7F7F7F]"
                    required
                    minLength="8"
                    maxLength="30"
                    value={newPasswordConfirmation}
                    onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                  />
                </div>
                <div className="flex justify-center flex-col">
                  <button
                    data-cy="resetPasswordBtn"
                    className="text-md mt-2 rounded-md px-22 py-5 uppercase text-sm text-white bg-[#06968A] font-bold"
                    type="submit"
                  >
                    Réinitialiser le mot de passe
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div id="login" className="w-full h-full m-auto ">
              <div className=" m-auto mt-16 flex flex-col justify-center items-center ">
                <div>
                  <Image
                    src="/assets/logo-qot-qot.png"
                    alt="logo_qotqot"
                    width={148}
                    height={164}
                  />
                </div>
                <h1 className="my-8 tracking-2">Réinitialiser mot de passe</h1>
              </div>

              <form
                method="post"
                onSubmit={sendResetPasswordEmail}
                className="flex flex-col px-3 py-4 "
                data-cy="loginForm"
              >
                <input
                  id="csrfToken"
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />
                <div className="text-[#7F7F7F] border-2 border-gray-200 h-14 px-4 flex flex-col rounded-lg">
                  <label className="text-[#7F7F7F]">
                    Renseignez votre email
                  </label>
                  <input
                    data-cy="email"
                    type="text"
                    id="email"
                    name="email"
                    className="text-[#7F7F7F]"
                    required
                    minLength="8"
                    maxLength="50"
                    placeholder="jean.dupont@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex justify-center flex-col">
                  <button
                    data-cy="sendResetLinkBtn"
                    className="text-md mt-2 rounded-md px-22 py-5 uppercase text-sm text-white bg-[#06968A] font-bold"
                    type="submit"
                  >
                    Réinitialiser le mot de passe
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
}
