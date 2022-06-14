import React from "react";
import Image from "next/image";
// import axios from "axios";
// import { useRouter } from "next/dist/client/router";

export default function Login({ csrfToken }) {
  //   const { query } = useRouter();
  const resetPassword = {};

  return (
    <>
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
            />
          </div>
          <div className="flex justify-center flex-col">
            <button
              data-cy="loginBtn"
              className="text-md -2 rounded-md px-22 py-5 uppercase text-sm text-white bg-[#06968A] font-bold"
              type="submit"
            >
              Réinitialiser le mot de passe
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
