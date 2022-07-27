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
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState("");

  const setSearchParams = (newSearch) => {
    const queryString = QueryString.stringify(newSearch, { skipNulls: true });
    router.push(`/nouvelleCommande${queryString ? "?" : ""}${queryString}`);
  };

  useEffect(() => {
    axios.get("/api/getCategories").then((res) => setCategoryList(res.data));
  }, []);

  useEffect(() => {
    setError("");
    const queryString = QueryString.stringify(router.query);

    axios
      .get(`/api/filterCategory/${queryString ? "?" : ""}${queryString}`)
      .then((res) => setSearchResult(res.data))
      .catch(() =>
        setError(
          "Impossible d'obtenir les données du serveur, veuillez réessayer"
        )
      );
  }, [router.query]);
  return (
    <div className={s.searchModuleWrapper}>
      <div className={s.searchFilters}>
        <input
          type="text"
          placeholder="🔎 Nom d'un produit"
          className={s.text_input}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div className={s.listButtons}>
          <button
            className={s.filterButtons}
            value={"Tous"}
            onClick={() => {
              setSearchParams({ category: null });
            }}
          >
            Tous
          </button>
          {categoryList.map((o) => (
            <div key={o}>
              <button
                className={s.filterButtons}
                onClick={(e) => {
                  setSearchParams({ category: e.target.value });
                }}
                value={o}
              >
                {o}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={s.searchResult}>
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
              <div key={prod.id} className={s.prods}>
                <ProductItem
                  key={prod.id}
                  id={prod.id}
                  codeProduit={prod.codeProduit}
                  name={prod.name}
                  weight={prod.weight}
                  price={prod.price}
                  pricePerKg={prod.pricePerKg}
                  stock={prod.stock}
                  picture={prod.picture ? prod.picture : ""}
                  makerPicture={prod.makerPicture}
                  makerName={prod.makerName}
                  makerAdress={prod.makerAdress}
                  productDesc={prod.descriptionProduit}
                  makerDesc={prod.descriptionProducteur}
                  logo={prod.logo}
                  cartItem={prod.customerCartItem}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
