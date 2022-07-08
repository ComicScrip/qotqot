/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import axios from "axios";
import ProductItem from "./ProductItem";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import QueryString from "qs";
import s from "../styles/SearchModule.module.css";

export const SearchModule = () => {
  const router = useRouter();
  const { category = "" } = router.query;

  const [categoryList, setCategoryList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [productList, setProductList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState("");

  const setSearchParams = (newSearch) => {
    const queryString = QueryString.stringify(newSearch);
    router.push(`/nouvelleCommande${queryString ? "?" : ""}${queryString}`);
  };

  useEffect(() => {
    axios
      .get("/api/getProducts")
      .then((res) => setProductList(res.data))
      .then(productList.map((item) => categoryList.push(item.category)))
      .then(setCategoryList([...new Set(categoryList)]));
  }, []);

  useEffect(() => {
    setError("");
    const queryString = QueryString.stringify(router.query);

    axios
      .get(`/api/filterCategory/${queryString ? "?" : ""}${queryString}`)
      .then((res) => setSearchResult(res.data))
      .catch(() =>
        setError("Could not get data from the server, please try again")
      );
  }, [router.query]);
  return (
    <>
      <select
        value={category}
        className={s.search_input}
        onChange={(e) => setSearchParams({ category: e.target.value })}
      >
        <option className={s.option} value="Tous">
          Tous
        </option>
        {categoryList.map((o) => {
          console.log(o);
          <option value={o}>{o}</option>;
        })}
        {/* <option className={s.option} value="Dernière Commande">
          Dernière Commande
        </option>
        <option className={s.option} value="Charcuteries et salaisons">
          Charcuteries et salaisons
        </option>
        <option className={s.option} value="Épicerie salée">
          Épicerie salée
        </option>
        <option className={s.option} value="Épicerie sucrée">
          Épicerie sucrée
        </option>
        <option className={s.option} value="Boissons Alcoolisés">
          Boissons Alcoolisés
        </option>
        <option
          className={s.option}
          value="Céréales et produits de boulangerie"
        >
          Céréales et produits de boulangerie
        </option> */}
      </select>

      <div>
        {searchResult.map((prod) => {
          return (
            <ProductItem
              key={prod.id}
              name={prod.name}
              weight={prod.weight}
              price={prod.price}
              pricePerKg={prod.pricePerKg}
              stock={prod.stock}
              picture={prod.picture ? prod.picture : ""}
              makerPicture={prod.makerPicture}
              makerName={prod.makerName}
              makerAdress={prod.makerAdress}
              productDesc={prod.productDesc}
              makerDesc={prod.makerDesc}
              logo={prod.logo}
            />
          );
        })}
      </div>
    </>
  );
};
