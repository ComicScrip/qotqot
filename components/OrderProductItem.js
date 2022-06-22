import style from "../styles/orderedProductItem.module.css";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/currentUserContext";
import "dayjs/locale/fr";
const dayjs = require("dayjs");

function OrderProductItem(props) {
  const { setOrderAmount, setOrderNumberState, setOrderStatut, setOrderDate } =
    useContext(CurrentUserContext);

  const calculateWeight = `${props.weight}` * `${props.quantity}`;

  useEffect(() => {
    setOrderAmount(`${props.totalAmount}`);
    setOrderNumberState(`${props.orderNumber}`);
    setOrderStatut(`${props.statut}`);
    dayjs(setOrderDate(`${props.dateLivraison}`))
      .locale("fr")
      .format("DD/MM/YYYY");
  }, []);

  return (
    <div className={style.item_wrapper}>
      <div className={style.item_picture}>
        <img
          src={props.picture ? props.picture : "/images/notAvailable.png"}
          alt={props.name}
        />
      </div>
      <div className={style.item_detail}>
        <div className={style.item_title}>{props.name}</div>
        <div className={style.item_weight}>{`${props.weight}g`}</div>
      </div>
      <div className={style.quantity}>
        <div className={style.itemQuantity}>{props.quantity}</div>
        <div className={style.totalWeight}>{`${calculateWeight}g`}</div>
      </div>
      <div className={style.price}>
        <div className={style.itemPrice}>{props.price}€ HT</div>
        <div className={style.itemPricePerKg}>{props.pricePerKg}€ HT /Kg</div>
      </div>
    </div>
  );
}

export default OrderProductItem;
