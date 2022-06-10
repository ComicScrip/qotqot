import Head from "next/head";
import { useContext } from "react";
import { signIn, useSession } from "next-auth/react";
import { CurrentUserContext } from "../contexts/currentUserContext";

export default function Layout({ children, pageTitle }) {
  const { currentUserLogged } = useContext(CurrentUserContext);
  const { status } = useSession();

  if (currentUserLogged) {
    return (
      <>
        <Head>
          <title>{pageTitle}</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href={`https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap`}
            rel="stylesheet"
          />
        </Head>
        {children}
      </>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center mt-36">
      {status === "loading" || status === "authenticated" ? (
        <p className="text-center bg-[#06968A] text-white h-full text-lg">
          Chargement des données en cours...
        </p>
      ) : (
        <>
          <p className="text-center bg-[#ff8383cb] text-white h-full text-lg ">
            Merci de bien vouloir vous connecter pour accéder à l'appli qotqot.{" "}
          </p>
          <div className="">
            <button
              type="button"
              className="mt-6 text-white uppercase text-sm bg-[#06968A] p-4"
              onClick={() => signIn()}
            >
              Se connecter
            </button>
          </div>
        </>
      )}
    </div>
  );
}
