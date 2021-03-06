import React, { useState, useEffect } from "react";
import LoadingSpin from "../../components/LoadingSpin";
import Layout from "../../components/Layout";
import { SearchModule } from "../../components/SearchModule";

export default function NewOrder() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    setIsLoading(false);
  }, []);

  return (
    <Layout pageTitle="Nouvelle commande">
      <>
        {error && (
          <p className="error">
            Impossible d'obtenir les données du serveur, veuillez réessayer
          </p>
        )}
        {isLoading ? <LoadingSpin /> : <SearchModule />}
      </>
    </Layout>
  );
}
