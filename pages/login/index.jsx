import React from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
// import { signIn, signOut } from "next-auth/react";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/currentUserContext";

export default function Login({ csrfToken }) {
  const { name } = useContext(CurrentUserContext);
  const { query } = useRouter();
  console.log(name);

  return (
    <>
      <div id="login" className="w-full h-full m-auto ">
        <div className="m-auto mt-16 flex flex-col justify-center items-center ">
          <div>
            <Image
              src="/assets/logoqotqot.png"
              alt="logo_qotqot"
              width={200}
              height={200}
            />
          </div>
          <h1 className="my-8 tracking-2">Espace Professionnel</h1>
        </div>

        <form
          method="post"
          action="/api/auth/callback/credentials"
          className="flex flex-col px-3 py-4 "
        >
          <input
            id="csrfToken"
            name="csrfToken"
            type="hidden"
            defaultValue={csrfToken}
          />
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
          <div className="m-auto py-2 px-3">
            <label className="text-[#7a7a7a]">
              <input type="checkbox" className="mr-3 ml-1 border-gray-200" />
              Se souvenir de moi
            </label>
          </div>
          <div className="flex justify-center">
            <button
              data-cy="loginBtn"
              className=" border-2 rounded-md px-32 py-5 uppercase text-sm text-white bg-[#339966] font-medium"
              type="submit"
            >
              Se connecter
            </button>
            {query.error === "CredentialsSignin" && (
              <p>Identifiants incorrects, veuillez recommencer.</p>
            )}
          </div>
          <div className="flex justify-center px-3">
            <p className=" text-[#339966] underline underline-offset-1 py-2">
              Mot de passe oublié ?
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

const getCsrfTokenAndSetCookies = async ({ res, query }) => {
  // to make it work on Vercel
  let baseUrl = process.env.NEXTAUTH_URL || `https://${process.env.VERCEL_URL}`;
  // capturing the callback url if any, which should include the current domain for security ?
  const callbackUrlIsPresent = typeof query?.callbackUrl === "string";
  const callbackUrlIsValid =
    callbackUrlIsPresent && query?.callbackUrl.startsWith(baseUrl);
  const host = callbackUrlIsValid ? query?.callbackUrl : baseUrl;
  const redirectURL = encodeURIComponent(host);
  // getting both the csrf form token and (next-auth.csrf-token cookie + next-auth.callback-url cookie)
  const csrfUrl = `${baseUrl}/api/auth/csrf?callbackUrl=${redirectURL}`;
  const csrfResponse = await fetch(csrfUrl);
  const { csrfToken } = await csrfResponse.json();
  const { headers } = csrfResponse;
  // placing the cookies
  const [csrfCookie, redirectCookie] = headers.get("set-cookie").split(",");
  res.setHeader("set-cookie", [csrfCookie, redirectCookie]);
  // placing form csrf token
  return csrfToken;
};

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfTokenAndSetCookies(context),
    },
  };
}
