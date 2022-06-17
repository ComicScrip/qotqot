import style from "../styles/product_item.module.css";
import Link from "next/link";
//import Popup from "reactjs-popup";

function ProductItem(props) {
  const id = props.id;
  return (
    <div className={style.item_wrapper}>
      <div className={style.item_picture}>
        <Link href={`/detailProduit/${id}`}>
          <img
            src={props.picture ? props.picture : "/images/notAvailable.png"}
            alt={props.name}
          />
          {/* <Popup
            trigger={
              <img
                src={props.picture ? props.picture : "/images/notAvailable.png"}
                alt={props.name}
              />
            }
            position="right center"
          >
          <div className={style.popup_wrapper}>
            <h2>{props.name}</h2>
            <div className={style.popup_top}>
              <div className={style.popup_l1}>
                <div className={style.popup_picture}>
                  <img
                    src={
                      props.picture ? props.picture : "/images/notAvailable.png"
                    }
                    alt={props.name}
                  />
                </div>
                <p>Conditionnement</p>
                {props.weight}
                <p>Prix</p>
                {props.price}€ ( {props.pricePerKg}€/Kg)
              </div>
              <div className={style.popup_r1}>
                <p>{props.makerDesc} </p>
              </div>
            </div>
          </div>
          </Popup> */}
        </Link>
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
              : props.stock === "Stock faible"
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
