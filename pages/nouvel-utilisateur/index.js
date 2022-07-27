/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/dist/client/router";
import s from "../../styles/home.module.css";

export default function NewUserPage({ csrfToken }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

  const verifyNewUserEmail = (e) => {
    e.preventDefault();
    axios
      .post("/api/users/new-user-email", { email })
      .then(() => {
        setUser(!user);
      })
      .catch((err) => {
        if (err.response.status === 404)
          return toast.error("Email introuvable");
        if (err.response.status === 401) {
          toast.error("Ce compte existe déjà");
          setTimeout(() => {
            router.push("/");
          }, 3000);
          return;
        }
        return toast.error("erreur");
      });
  };

  const createPassword = (e) => {
    e.preventDefault();
    if (newPassword !== newPasswordConfirmation)
      return toast.error("Les mots de passe ne correspondent pas");
    axios
      .post("/api/users/new-user-password", {
        newPassword,
        newPasswordConfirmation,
        email,
      })
      .then(() => {
        toast.success("Mot de passe enregistré");
        setTimeout(() => {
          router.push("/");
        }, 3000);
      })
      .catch((err) => {
        if (err.response.status === 400) return;
        toast.error("Not authorized");
        setTimeout(() => {
          router.push("/");
        }, 5000);
      });
  };

  return (
    <>
      <Toaster position="bottom-center" />
      {user ? (
        <div className={s.loginBg}>
          <div className="w-full h-full m-auto">
            <div className=" m-auto flex flex-col justify-center items-center ">
              <div>
                <Image
                  src="/assets/logo-qot-qot.png"
                  alt="logo_qotqot"
                  width={148}
                  height={164}
                />
              </div>
              <h1 className="my-8 tracking-2">Créez votre mot de passe</h1>
            </div>

            <form
              method="post"
              onSubmit={createPassword}
              className="flex flex-col px-3 py-4 "
              data-cy="loginForm"
            >
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
              <div className="text-[#7F7F7F] border-2 border-gray-200 mt-2 h-14 px-4 flex flex-col rounded-lg">
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
                  data-cy="loginBtn"
                  className="text-md mt-2 rounded-md px-22 py-5 uppercase text-sm text-white bg-[#06968A] font-bold"
                  type="submit"
                >
                  Créer le mot de passe
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className={s.loginBg}>
          <div className="w-full h-full ">
            <div className=" m-auto flex flex-col justify-center items-center mt-12">
              <div>
                <Image
                  src="/assets/logo-qot-qot.png"
                  alt="logo_qotqot"
                  width={148}
                  height={164}
                />
              </div>
              <h1 className="my-8 tracking-2">Créez votre compte</h1>
            </div>

            <form
              method="post"
              onSubmit={verifyNewUserEmail}
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
                <label className="text-[#7F7F7F]">Renseignez votre email</label>
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
                  data-cy="loginBtn"
                  className="text-md mt-2 rounded-md px-22 py-5 uppercase text-sm text-white bg-[#06968A] font-bold"
                  type="submit"
                >
                  Créer votre compte
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
