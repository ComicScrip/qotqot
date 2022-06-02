import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ProductItem from "../../components/ProductItem";

export default function NouvelleCommande() {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => res.data)
      .then((data) => setProductList(data));
  }, []);

  return (
    <div className="main_container">
      {productList.map((prod) => (
        <ProductItem
          key={prod.id}
          name={prod.name}
          weight={prod.weight}
          price={prod.price}
          pricePerKg={prod.pricePerKg}
          stock={prod.stock}
          picture={prod.picture ? prod.picture : ""}
        />
      ))}
      <style jsx>{`
        * {
            background-color: #E5E5E5;
        `}</style>
    </div>
  );
}
