import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import LoadingSpin from "../../components/LoadingSpin";
import s from "../../styles/ProductDetail.module.css";
import { getMinifiedProduct } from "../api/utils/Airtable";

const DetailProduit = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = router.query;

  const renderProduct = useEffect(() => {
    setError("");
    if (id) {
      axios
        .get(`/api/products/${id}`)
        .then((res) => res.data)
        .then((data) => setProduct(getMinifiedProduct(data)))
        .catch(() =>
          setError("Could not get data from the server, please try again")
        )
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  return (
    <Layout pageTitle={`${product.id}`}>
      {error && (
        <p className="error">
          Could not get data from the server, please try again
        </p>
      )}
      {isLoading ? <LoadingSpin /> : renderProduct}

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
