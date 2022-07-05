import style from "../styles/product_item.module.css";
import { useState } from "react";
import Popup from "./Popup";
import axios from "axios";

function ProductItem(props) {
  const [isDetailed, setIsDetailed] = useState(false);
  const togglePopup = () => {
    setIsDetailed(!isDetailed);
  };

  const [count, setCount] = useState(0);

  const handleSubtractOneFromCart = () => {
    setCount(count > 0 ? count - 1 : "0");
    axios.post("/api/customerCartItem", {
      quantity: count - 1,
      idProduct: props.id,
    });
    console.log(props.id);
  };

  const handleAddOneToCart = () => {
    setCount(count + 1);
    axios.post("/api/customerCartItem", {
      quantity: count + 1,
      idProduct: props.id,
    });
  };

  return (
    <>
      {isDetailed && Popup ? (
        <Popup
          name={props.name}
          weight={props.weight}
          price={props.price}
          pricePerKg={props.pricePerKg}
          stock={props.stock}
          picture={props.picture ? props.picture : ""}
          makerPicture={props.makerPicture}
          makerName={props.makerName}
          makerAdress={props.makerAdress}
          productDesc={props.productDesc}
          makerDesc={props.makerDesc}
          logo={props.logo}
          setIsDetailed={true}
          handleClose={togglePopup}
        />
      ) : (
        ""
      )}
      <div className={style.item_wrapper}>
        <div className={style.item_picture} onClick={() => togglePopup()}>
          <img
            src={props.picture ? props.picture : "/images/notAvailable.png"}
            alt={props.name}
          />
        </div>
        <div className={style.item_detail} onClick={() => togglePopup()}>
          <div className={style.item_title}>{props.name}</div>
          <div className={style.item_weight}>{props.weight}</div>
        </div>
        <div className={style.price} onClick={() => togglePopup()}>
          <div className={style.itemPrice}>{props.price}€ HT</div>
          <div className={style.itemPricePerKg}>{props.pricePerKg}€ HT /Kg</div>
        </div>
        <div className={style.item_stock}>
          <div
            className={
              props.stock === "En stock"
                ? style.instock
                : props.stock === "Sur demande"
                ? style.low_on_stock
                : style.out_of_stock
            }
          >
            {props.stock}
          </div>

          <div className={style.counter}>
            <button
              className={style.countBtn}
              onClick={handleSubtractOneFromCart}
            >
              -
            </button>
            <div className={style.count_total}>{count}</div>
            <button className={style.countBtn} onClick={handleAddOneToCart}>
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
