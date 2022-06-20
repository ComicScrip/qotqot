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
      </div>
      <div className={style.item_quantity}>
        <div className={style.quantity}>{props.Quantity}</div>
        <div className={style.poids}>
          {props.typeUVC} {props.poidsUVC} {props.uniteUVC}
        </div>
      </div>
      <div className={style.price}>
        <div className={style.itemPrice}>{props.totalPrice}€ HT</div>
        <div className={style.itemPricePerKg}>{props.pricePerKg}€ HT /Kg</div>
      </div>
    </div>
  );
}

export default Cart;
