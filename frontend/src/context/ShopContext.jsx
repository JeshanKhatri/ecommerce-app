// import { createContext, useEffect, useState} from "react";
// import {products} from "../assets/assets";

// export const ShopContext = createContext();

// const ShopContextProvider = (props) =>{
  
//   const currency ='₹';
//   const delivery_fee = 10;
//   const [search,setSearch] = useState('');
//   const [showSearch, setShowSearch] = useState(false);
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = async (item) => {
//     let cartData = structuredClone(cartItems);
//     if (cartData[itemId]){
//       if (cartData[itemId][size]){
//         cartData[itemId][size] += 1;
//       }
//       else{
//       cartData[itemId][size] = 1;
//     }
//     }
//     else{
//       cartData[itemId][size] = {};
//       cartData[itemId][size] = 1;
//     }
//     setCartItems(cartData);
//   }

  
//   const getCartCount =() => {
//     let totalCount = 0;
//     for (const item in cartItems){
//       for (const size in cartItems[item]){
//         try{
//           if(cartItems[items][item] >0){
//             totalCount += cartItems[item][size];
//           }
//         } catch (error){

//         }
//       }
//     }
//     return totalCount;
//   }

//     const value = {
//       products, currency, delivery_fee,
//       search, setSearch, showSearch, setShowSearch, 
//       cartItems, addToCart,
//       getCartCount
//   }
//   return(
//     <ShopContext.Provider value={value}>
//       {props.children}
//     </ShopContext.Provider>
//   )
// }

// export default ShopContextProvider;



// {/* quantity added this */}
// import { createContext, useState } from "react";
// import { products } from "../assets/assets";

// export const ShopContext = createContext();

// const ShopContextProvider = (props) => {
//   const currency = '₹';
//   const delivery_fee = 10;
//   const [search, setSearch] = useState('');
//   const [showSearch, setShowSearch] = useState(false);
//   const [cartItems, setCartItems] = useState({});

//   const addToCart = (item) => {
//     const { _id: itemId, size } = item;
//     let cartData = structuredClone(cartItems);

//     if (!cartData[itemId]) {
//       cartData[itemId] = {};
//     }

//     if (cartData[itemId][size]) {
//       cartData[itemId][size] += 1;
//     } else {
//       cartData[itemId][size] = 1;
//     }

//     setCartItems(cartData);
//   };

//   const removeFromCart = (itemId, size) => {
//     let cartData = structuredClone(cartItems);

//     if (cartData[itemId] && cartData[itemId][size]) {
//       cartData[itemId][size] -= 1;

//       if (cartData[itemId][size] <= 0) {
//         delete cartData[itemId][size];
//       }

//       if (Object.keys(cartData[itemId]).length === 0) {
//         delete cartData[itemId];
//       }

//       setCartItems(cartData);
//     }
//   };

//   const incrementQuantity = (itemId, size) => {
//     addToCart({ _id: itemId, size });
//   };

//   const decrementQuantity = (itemId, size) => {
//     removeFromCart(itemId, size);
//   };

//   const getCartCount = () => {
//     let totalCount = 0;
//     for (const item in cartItems) {
//       for (const size in cartItems[item]) {
//         try {
//           if (cartItems[item][size] > 0) {
//             totalCount += cartItems[item][size];
//           }
//         } catch (error) {}
//       }
//     }
//     return totalCount;
//   };

//   const updateQuantity = (itemId, size, quantity) => {
//     let cartData = structuredClone(cartItems);

//     cartdata[itemId][size] = quantity;

//     setCartItems(cartData);
//   }

//   const value = {
//     products,currency,
//     delivery_fee,search,
//     setSearch, showSearch, setShowSearch,
//     cartItems, addToCart, removeFromCart,
//     incrementQuantity, decrementQuantity,
//      getCartCount, updateQuantity
//   };

//   return (
//     <ShopContext.Provider value={value}>
//       {props.children}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;


import { createContext, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '₹';
  const delivery_fee = 10;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const addToCart = (item) => {
    const { _id: itemId, size } = item;
    let cartData = structuredClone(cartItems);

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
  };

  const removeFromCart = (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId] && cartData[itemId][size]) {
      cartData[itemId][size] -= 1;

      if (cartData[itemId][size] <= 0) {
        delete cartData[itemId][size];
      }

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }

      setCartItems(cartData);
    }
  };

  const incrementQuantity = (itemId, size) => {
    addToCart({ _id: itemId, size });
  };

  const decrementQuantity = (itemId, size) => {
    removeFromCart(itemId, size);
  };

  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (quantity <= 0) {
      delete cartData[itemId][size];
    } else {
      cartData[itemId][size] = quantity;
    }

    if (Object.keys(cartData[itemId]).length === 0) {
      delete cartData[itemId];
    }

    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        try {
          if (cartItems[item][size] > 0) {
            totalCount += cartItems[item][size];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    updateQuantity,
    getCartCount,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
