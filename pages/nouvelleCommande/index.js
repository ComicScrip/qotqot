import { table, minifyRecords } from "../api/utils/Airtable";
import ProductItem from "../../components/ProductItem";

function NouvelleCommande(initialProducts) {
  console.log(initialProducts);
  return (
    <div className="main_container">
      {initialProducts.initialProducts.map((prod) => (
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
      <style jsx>{`
        * {
            background-color: whitesmoke;
        `}</style>
    </div>
  );
}

export default NouvelleCommande;

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
