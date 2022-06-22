/* eslint-disable no-unused-vars */
import axios from "axios";
import Layout from "../../components/Layout";
import s from "../../styles/ProductDetail.module.css";
import { getMinifiedProduct } from "../api/utils/Airtable";

const DetailProduit = ({ product }) => {
  return (
    <Layout pageTitle={`${product.name}`}>
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
                src={product.logo}
                alt="label producteur"
              />
            </div>
          </div>
          <div className={s.top_right}>
            <p className={s.product_desc}>
              {product.descriptionProduit !== "x" && "X"
                ? product.descriptionProduit
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
            <p>{product.descriptionProducteur}</p>
          </div>
        </div>
      </div>
    </Layout>
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
  return {
    props: { product: data },
  };
};
