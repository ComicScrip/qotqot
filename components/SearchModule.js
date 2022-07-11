/* eslint-disable react-hooks/exhaustive-deps */
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

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState("");

  const setSearchParams = (newSearch) => {
    const queryString = QueryString.stringify(newSearch);
    router.push(`/nouvelleCommande${queryString ? "?" : ""}${queryString}`);
  };

  // here we get the list of all products, extract the categories from it and push it to a mappable array
  useEffect(() => {
    axios
      .get("/api/getProducts")
      .then((res) => setProductList(res.data))
      .then(productList.map((item) => categoryList.push(item.category)))
      .finally(setCategoryList([...new Set(categoryList)]));
  }, []);
  console.log(categoryList);

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
      <input
        type="text"
        placeholder="Cherchez..."
        className={s.text_input}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <select
        value={category}
        className={s.search_input}
        onChange={(e) => setSearchParams({ category: e.target.value })}
      >
        <option className={s.option} value="Tous">
          Tous
        </option>
        {categoryList.map((o) => (
          <option className={s.option} key={o} value={o}>
            {o}
          </option>
        ))}
      </select>

      <div>
        {searchResult
          .filter((val) => {
            if (val == "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((prod) => {
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
