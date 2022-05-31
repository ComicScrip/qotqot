import React from "react";
import Image from "next/image";

const login = () => {
  return (
    <div id="login" className="w-full h-full m-auto bg-hero-sm ">
      <div className="m-auto mt-16 flex flex-col justify-center items-center ">
        <div>
          <Image
            src="/../public/assets/Logo-QotQot-Sans-fond-carré_44rzy5xn.png"
            alt="logo_qotqot"
            width={200}
            height={200}
          />
        </div>
        <h1 className="my-8 tracking-2">Espace Professionnel</h1>
      </div>
      <form
        action="/send-data-here"
        method="post"
        className="flex flex-col px-3 py-4 "
      >
        <div className="text-[#7F7F7F] border-2 border-gray-300 h-14 px-4 flex flex-col rounded-lg">
          <label className="text-[#7F7F7F]">Email</label>
          <input
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
        <div className="text-[#7F7F7F] border-2 border-gray-300 my-3 h-14 px-4 flex flex-col rounded-lg">
          <label className="text-[#7F7F7F] ">Mot de passe :</label>
          <input
            type="text"
            id="password"
            name="password"
            className="text-[#7F7F7F]"
            required
            minLength="8"
            maxLength="15"
            placeholder="votre mot de passe"
          />
        </div>
      </form>
      <div className="m-auto py-2 px-3">
        <label className="text-[#7a7a7a]">
          <input type="checkbox" className="mr-3 ml-1 border-gray-200" />
          Se souvenir de moi
        </label>
      </div>
      <div className="flex justify-center">
        <button
          className=" border-2 rounded-md px-32 py-5 uppercase text-sm text-white bg-[#339966] font-medium"
          type="submit"
        >
          Se connecter
        </button>
      </div>
      <div className="flex justify-center px-3">
        <p className=" text-[#339966] underline underline-offset-1 py-2">
          Mot de passe oublié ?
        </p>
      </div>
    </div>
  );
};

export default login;
