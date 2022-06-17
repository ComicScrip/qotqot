/* eslint-disable no-unused-vars */
import axios from "axios";
import s from "../../styles/ProductDetail.module.css";
import { minifyProducts, getMinifiedProduct } from "../api/utils/Airtable";

const DetailProduit = ({ product }) => {
  return (
    <div className={s.detail_wrapper}>
      <h1>{product.name}</h1>
      <div className={s.top_container}>
        <div className={s.top_left}>
          <img
            src={product.picture ? product.picture : "/images/notAvailable.png"}
            alt={product.name}
          />
          <p>Conditionnement</p>
          {product.weight}
          <p>Prix</p>
          {product.price}€ ( {product.pricePerKg}€/Kg)
        </div>
        <div className={s.top_right}>
          <p className={s.product_desc}>{product.descriptionProduit}</p>
        </div>
      </div>
      <div className={s.bot_container}>
        <div className={s.bot_top}>
          <img
            src={
              product.makerPicture
                ? product.makerPicture
                : "/images/notAvailable.png"
            }
            alt={product.makerName}
          />
          <div className={s.bot_top_desc}>
            {product.makerName}
            {product.makerAdress}
          </div>
        </div>
        <div className={s.bot_bot}>
          <p>{product.descriptionProducteur}</p>
        </div>
      </div>
    </div>
  );
};
export default DetailProduit;

export const getStaticPaths = async () => {
  const res = await axios.get(
    "https://api.airtable.com/v0/app5Yy06J0dhcG7Xb/Produits%20Actifs",
    {
      headers: {
        Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
      },
    }
  );
  const data = await res.data?.records;

  const paths = await data.map((product) => {
    return {
      params: { id: product.id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await axios.get(
    `https://api.airtable.com/v0/app5Yy06J0dhcG7Xb/Produits%20Actifs/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
      },
    }
  );
  const data = await getMinifiedProduct(res.data);
  console.log(data);
  return {
    props: { product: data },
  };
};
