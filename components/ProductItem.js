import style from "../styles/product_item.module.css";

function ProductItem(props) {
  console.log(props.picture);
  return (
    <div className={style.item_wrapper}>
      <div className={style.item_picture}> Image</div>
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
            props.stock === "En rupture"
              ? style.out_of_stock
              : style.stock_display_instock
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
