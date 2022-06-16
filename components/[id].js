/* eslint-disable no-unused-vars */
import axios from "axios";

export const getStaticPaths = () => {
  const data = axios.get("api/products").then((res) => res.data?.records[0]);

  const paths = data.map((product) => {
    return {
      params: { id: product.id.toString() },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await axios.get(`api/products/${id}`);
  const data = await res.json();
  console.log(data);
  return {
    props: { product: data },
  };
};

const DetailProduit = ({ product }) => {
  return (
    <div>
      <h1>coucou</h1>
    </div>
  );
};

export default DetailProduit;
