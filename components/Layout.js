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
  console.log(status);

  return (
    <div>
      {status === "loading" || status === "authenticated" ? (
        <p className="flex flex-col justify-center items-center bg-[green] text-white h-full text-xl text-center">
          Chargement des données en cours...
        </p>
      ) : (
        <>
          <p className="flex flex-col justify-center items-center bg-[red] text-white h-full text-xl text-center">
            de bien vouloir vous connecter pour accéder à l'appli qotqot.{" "}
          </p>

          <button
            type="button"
            className="mt-6 text-gray-500 bg-[green] p-4"
            onClick={() => signIn()}
          >
            Se connecter
          </button>
        </>
      )}
    </div>
  );
}
