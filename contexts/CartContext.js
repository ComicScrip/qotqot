// import { createContext } from "react/cjs/react.production.min";

// export const CartContext = createContext();
// const initialState = {
//   cart: {
//     cartItems: [],
//   },
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "CART_ADD_ITEM": {
//       const newItem = action.payload;
//       const itemExists = state.cart.carItems.find(
//         (item) => item.name === newItem.name
//       );
//       const cartItems = itemExists
//         ? state.cart.cartItems.map((item) =>
//             item.name === itemExists.name ? newItem : item
//           )
//         : [...state.cart.cartItems, newItem];
//       return { ...state, cart: { ...state.cart, cartItems } };
//     }
//     default:
//       return state;
//   }
// }
