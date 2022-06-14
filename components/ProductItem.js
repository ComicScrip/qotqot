import style from "../styles/product_item.module.css";
import { useState } from "react";
const { default: axios } = require("axios");
//pas de dotenv sur le front

const instance = axios.create({
  baseURL: process.env.AIRTABLE_API,
  headers: {
    Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
  },
});

async function getCartItem({ Code_Produit, Code_Client }) {
  return instance
    .get(
      `/Panier?filterByFormula=AND(%7BCode_Client%7D%3D%22${Code_Client}%22%2C%7BCode_Produit%7D%3D%22${Code_Produit}%22)`
    )
    .then((res) => res.data?.records?.[0]);
}

async function getCustomerCartItems({ Code_Client }) {
  return instance
    .get(`/Panier?filterByFormula=%7BCode_Client%7D%3D%22${Code_Client}%22`)
    .then((res) => res.data?.records);
}

// async function setCartQuantity({ product_id, customer_id, quantity }) {
//   const cartItem = await getCartItem({ product_id, customer_id });

//   if (cartItem) {
//     if (quantity !== 0)
//       return instance.patch("/Panier", {
//         records: [
//           {
//             id: cartItem.fields.id,
//             fields: {
//               product_id: [product_id],
//               customer_id: [customer_id],
//               quantity,
//             },
//           },
//         ],
//       });
//     else return instance.delete(`/Panier/${cartItem.fields.id}`);
//   } else if (quantity !== 0) {
//     return instance.post("/Panier", {
//       records: [
//         {
//           fields: {
//             product_id: [product_id],
//             customer_id: [customer_id],
//             quantity,
//           },
//         },
//       ],
//     });
//   }
// }

function ProductItem(props) {
  // --- props renaming --- //

  const codeQotQot = props.codeProduit;
  const productId = props.id;
  // --- Call to API POST route --- //

  const sendItemToCart = () => {
    console.log(productId);
    console.log(codeQotQot);
    const data = {
      records: [
        {
          fields: {
            CodeQotQot: codeQotQot,
            id: productId,
          },
        },
      ],
    };
    // --- le client active la route/API qui lui contactera le back-end --- //
    axios.post("/api/addToCart", data);
  };

  const removeItemFromCart = () => {
    const id = productId;

    console.log(productId);
    axios.delete("/api/deleteFromCart/", id);
  };
  // --- Counter functions --- //

  const [count, setCount] = useState(0);
  const handleSubtractOneFromCart = () => {
    removeItemFromCart();
    setCount(count - 1);
  };
  const handleAddOneToCart = () => {
    sendItemToCart();
    getCartItem();
    getCustomerCartItems();
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
