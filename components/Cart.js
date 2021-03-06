import style from "../styles/product_item.module.css";

function Cart(props) {
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
        <div className={style.item_weight}>{props.quantité}</div>
      </div>
      <div className={style.item_quantity}>
        <div className={style.quantity}>{props.Quantity}</div>
        <div className={style.poids}>
          {(props.poidsUVC * props.Quantity).toFixed(0)}
          {props.uniteUVC}
        </div>
      </div>
      <div className={style.price}>
        <div className={style.itemPrice}>
          {(props.Quantity * props.price).toFixed(2)}€ HT
        </div>
        <div className={style.itemPricePerKg}>
          {props.pricePerKg.toFixed(2)}€ HT /Kg
        </div>
      </div>
    </div>
  );
}

export default Cart;
