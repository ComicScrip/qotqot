import React from "react";
import Image from "next/image";

const index = () => {
  return (
    <div className="login">
      <div>
        <Image
          src="/../public/assets/Logo-QotQot-Sans-fond-carré_44rzy5xn.png"
          alt="logo_qotqot"
          width={100}
          height={100}
        />
      </div>
      <h1>Espace Professionnel</h1>
      <form action="/send-data-here" method="post">
        <label>Email</label>
        <input
          type="text"
          id="email"
          name="email"
          required
          minLength="8"
          maxLength="50"
        />
        <label>Mot de passe :</label>
        <input type="text" id="name" name="name" required />
      </form>
      <label>
        <input type="checkbox" />
        Se souvenir de moi
      </label>
      <button type="submit">Se connecter</button>
    </div>
  );
};

export default index;
