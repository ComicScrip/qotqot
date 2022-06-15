import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import LoadingSpin from "../../components/LoadingSpin";
import OrderProductItem from "../../components/OrderProductItem";
import Layout from "../../components/Layout";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/currentUserContext";

export default function NewOrder() {
  const { orderNumberState } = useContext(CurrentUserContext);
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");

    axios
      .get("/api/commandePassee")
      .then((res) => res.data)
      .then((data) => setProductList(data))
      .catch(() =>
        setError("Could not get data from the server, please try again")
      )
      .finally(() => setIsLoading(false));
  }, []);

  const renderProducts = (
    <div className="main_container">
      {productList
        .filter((order) => orderNumberState === order.orderNumber)
        .map((prod) => (
          <OrderProductItem
            key={prod.id}
            orderNumber={prod.orderNumber}
            name={prod.name}
            weight={prod.weight}
            quantity={prod.quantity}
            price={prod.price}
            pricePerKg={prod.pricePerKg}
            picture={prod.picture ? prod.picture : ""}
          />
        ))}
      <style jsx>{`
  * {
      background-color: #E5E5E5;
  `}</style>
    </div>
  );

  return (
    <Layout pageTitle="detail-commande">
      <>
        {error && (
          <p className="error">
            Could not get data from the server, please try again
          </p>
        )}
        {isLoading ? <LoadingSpin /> : renderProducts}
      </>
    </Layout>
  );
}
