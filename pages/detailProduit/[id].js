/* eslint-disable no-unused-vars */
import axios from "axios";
import { sendStatusCode } from "next/dist/server/api-utils";

const DetailProduit = ({ product }) => {
  return (
    <div>
      <h1>coucou</h1>
    </div>
  );
};

export default DetailProduit;

export const getStaticPaths = async () => {
  const res = await fetch(
    "https://api.airtable.com/v0/app5Yy06J0dhcG7Xb/Produits%20Actifs",
    {
      headers: {
        Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
      },
    }
  );
  const data = await res.data[0].record;

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
  const data = await axios.get(
    `https://api.airtable.com/v0/app5Yy06J0dhcG7Xb/Produits%20Actifs/${id}`
  );
  console.log(data);
  return {
    props: { product: data },
  };
};
