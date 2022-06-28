import s from "../styles/ProductDetail.module.css";

const Popup = (product) => {
  return (
    <div className={s.popup_box}>
      <div className={s.box}>
        <div className={s.icon_handler}>
          <span className={s.close_icon} onClick={product.handleClose}>
            x
          </span>
        </div>
        <div className={s.detail_wrapper}>
          <h1 className={s.detail_title}>{product.name}</h1>
          <div className={s.top_container}>
            <div className={s.top_left}>
              <img
                className={s.product_pic}
                src={
                  product.picture ? product.picture : "/images/notAvailable.png"
                }
                alt={product.name}
              />
              <div className={s.product_detail}>
                <h3>Conditionnement</h3>
                <p>{product.weight}</p>
                <h3>Prix</h3>
                <p>
                  {product.price}€ ( {product.pricePerKg}€/Kg)
                </p>
                <img
                  className={s.product_logo}
                  src={product.logo ? product.logo : "/images/notAvailable.png"}
                  alt="label producteur"
                />
              </div>
            </div>
            <div className={s.top_right}>
              <p className={s.product_desc}>
                {product.productDesc !== "x" && "X"
                  ? product.productDesc
                  : "Aucune desciption disponible, merci de nous contacter"}
              </p>
            </div>
          </div>
          <div className={s.bot_container}>
            <div className={s.bot_top}>
              <img
                className={s.maker_pic}
                src={
                  product.makerPicture
                    ? product.makerPicture
                    : "/images/notAvailable.png"
                }
                alt={product.makerName}
              />
              <div className={s.bot_top_desc}>
                <h3>{product.makerName}</h3>

                <p>{product.makerAdress}</p>
              </div>
            </div>
            <div className={s.bot_bot}>
              <p>{product.makerDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
