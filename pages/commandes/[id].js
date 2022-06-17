import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import LoadingSpin from "../../components/LoadingSpin";
import OrderProductItem from "../../components/OrderProductItem";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/currentUserContext";
import LayoutCommandePassee from "../../components/LayoutCommandePassee";
import style from "../../styles/orderedProductItem.module.css";

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
    <div className={style.homeBody}>
      {productList
        .filter((order) => orderNumberState === order.orderNumber)
        .map((prod) => (
          <div className={style.product} key={prod.id}>
            <OrderProductItem
              key={prod.id}
              date={prod.date}
              name={prod.name}
              weight={prod.weight}
              quantity={prod.quantity}
              price={prod.price}
              pricePerKg={prod.pricePerKg}
              picture={prod.picture ? prod.picture : ""}
              totalAmount={prod.totalAmount}
            />
          </div>
        ))}
    </div>
  );
  return (
    <LayoutCommandePassee pageTitle="detail-commande">
      <>
        {error && (
          <p className="error">
            Could not get data from the server, please try again
          </p>
        )}
        {isLoading ? <LoadingSpin /> : renderProducts}
      </>
    </LayoutCommandePassee>
  );
}

/*
.forEach((prod) => {
  totalAmount += prod.price * prod.quantity;
  setOrderAmount(totalAmount);
})
*/
