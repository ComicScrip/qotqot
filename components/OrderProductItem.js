import style from "../styles/orderedProductItem.module.css";

function OrderProductItem(props) {
  const calculateWeight = parseInt(props.poidsUVC * props.quantity);

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
        <div className={style.item_weight}>{props.weight}</div>
      </div>
      <div className={style.quantity}>
        <div className={style.itemQuantity}>{props.quantity}</div>
        <div className={style.totalWeight}>{`${calculateWeight}g`}</div>
      </div>
      <div className={style.price}>
        <div className={style.itemPrice}>{props.price}€ HT</div>
        <div className={style.itemPricePerKg}>
          {props.pricePerKg.toFixed(2)}€ HT /Kg
        </div>
      </div>
    </div>
  );
}

export default OrderProductItem;
