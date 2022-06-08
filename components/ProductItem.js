import style from "../styles/product_item.module.css";
import { useState } from "react";
import axios from "axios";

function ProductItem(props) {
  const codeQotQot = props.codeProduit;

  const addToCart = () => {
    console.log(codeQotQot);
    const data = {
      records: [
        {
          fields: {
            Name: codeQotQot,
          },
        },
      ],
    };
    axios.post("/api/addToCart", data);
  };
  const [count, setCount] = useState(0);
  const handleSubtractOneFromCart = () => {
    setCount(count - 1);
  };
  const handleAddOneToCart = () => {
    addToCart();
    setCount(count + 1);
  };

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
          <button
            className={style.countBtn}
            onClick={
              count > 0 && props.stock === "En stock"
                ? handleSubtractOneFromCart
                : null
            }
          >
            -
          </button>
          <div className={style.count_total}>{count}</div>
          <button
            className={style.countBtn}
            onClick={props.stock === "En stock" ? handleAddOneToCart : null}
          >
            +
          </button>
        </div>
      </div>
      <div className={count > 0 ? style.is_selected : ""}></div>
    </div>
  );
}

export default ProductItem;
