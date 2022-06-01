/* eslint-disable @next/next/no-img-element */
import style from "../styles/product_item.module.css";
//import notAvailable from "../public/images/notAvailable.png";

function ProductItem(props) {
  return (
    <div className={style.item_wrapper}>
      <div className={style.item_picture}>
        {/* <img
          src={props.picture ? props.picture : { notAvailable }}
          alt={props.name}
        /> */}
        <p>{props.picture}</p>
      </div>
      <div className={style.item_detail}>
        <div className={style.item_title}>{props.name}</div>
        <div className={style.item_weight}>{props.weight}</div>
      </div>
      <div className={style.price}>
        <div className={style.itemPrice}>{props.price}€ HT</div>
        <div className={style.itemPricePerKg}>{props.pricePerKg}€ HT /Kg</div>
      </div>
      <div className={style.item_stock}>
        <div
          className={
            props.stock === "En stock"
              ? style.stock_display_instock
              : props.stock === "Nous consulter"
              ? style.low_on_stock
              : style.out_of_stock
          }
        >
          {props.stock}
        </div>

        <div className={style.counter}>
          <div>-</div>
          <div>Qt</div>
          <div>+</div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
