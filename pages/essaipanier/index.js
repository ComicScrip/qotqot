import Link from "next/link";
import { useCart } from "react-use-cart";
import Cart from "../../components/Cart";

const Essaipanier = () => {
  const { items, itemTotal } = useCart();
  //   console.log(items[0]);
  return (
    <div>
      <h1>Mon Panier</h1>
      <Link href="/nouvelleCommande">Go Back</Link>
      {items.map((item) => (
        <Cart
          key={item.id}
          name={item.name}
          quantity={item.quantity}
          picture={item.picture}
          weight={item.weight}
          price={itemTotal}
          pricePerKg={item.pricePerKg}
        />
      ))}
    </div>
  );
};
export default Essaipanier;
