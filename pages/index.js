import Head from "next/head";
import { table, minifyRecords } from "./api/utils/Airtable";
import ProductItem from "../components/ProductItem";

export default function Home(initialProducts) {
  console.log(initialProducts);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {initialProducts.initialProducts.map((prod) => (
        // <p key={prod.id}>
        //   {prod.name}, {prod.weight}, {prod.price}€, {prod.pricePerKg}€,{" "}
        //   {prod.stock}
        // </p>
        <ProductItem
          key={prod.id}
          name={prod.name}
          weight={prod.weight}
          price={prod.price}
          pricePerKg={prod.pricePerKg}
          stock={prod.stock}
          picture={prod.picture}
        />
      ))}
    </>
  );
}

export async function getServerSideProps() {
  try {
    const products = await table.select().firstPage();

    return {
      props: {
        initialProducts: minifyRecords(products),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        err: "Something went bad",
      },
    };
  }
}
