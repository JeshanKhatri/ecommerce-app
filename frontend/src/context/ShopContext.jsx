// import { createContext, useEffect, useState} from "react";
// import {products} from "../assets/assets";
// import { toast } from 'react-toastify';
// import {useNavigate} from 'react-router-dom';

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






// // {/* quantity added this */}
// // import { createContext, useState } from "react";
// // import { products } from "../assets/assets";

// // export const ShopContext = createContext();

// // const ShopContextProvider = (props) => {
// //   const currency = '₹';
// //   const delivery_fee = 10;
// //   const [search, setSearch] = useState('');
// //   const [showSearch, setShowSearch] = useState(false);
// //   const [cartItems, setCartItems] = useState({});

// //   const addToCart = (item) => {
// //     const { _id: itemId, size } = item;
// //     let cartData = structuredClone(cartItems);

// //     if (!cartData[itemId]) {
// //       cartData[itemId] = {};
// //     }

// //     if (cartData[itemId][size]) {
// //       cartData[itemId][size] += 1;
// //     } else {
// //       cartData[itemId][size] = 1;
// //     }

// //     setCartItems(cartData);
// //   };

// //   const removeFromCart = (itemId, size) => {
// //     let cartData = structuredClone(cartItems);

// //     if (cartData[itemId] && cartData[itemId][size]) {
// //       cartData[itemId][size] -= 1;

// //       if (cartData[itemId][size] <= 0) {
// //         delete cartData[itemId][size];
// //       }

// //       if (Object.keys(cartData[itemId]).length === 0) {
// //         delete cartData[itemId];
// //       }

// //       setCartItems(cartData);
// //     }
// //   };

// //   const incrementQuantity = (itemId, size) => {
// //     addToCart({ _id: itemId, size });
// //   };

// //   const decrementQuantity = (itemId, size) => {
// //     removeFromCart(itemId, size);
// //   };

// //   const getCartCount = () => {
// //     let totalCount = 0;
// //     for (const item in cartItems) {
// //       for (const size in cartItems[item]) {
// //         try {
// //           if (cartItems[item][size] > 0) {
// //             totalCount += cartItems[item][size];
// //           }
// //         } catch (error) {}
// //       }
// //     }
// //     return totalCount;
// //   };

// //   const updateQuantity = (itemId, size, quantity) => {
// //     let cartData = structuredClone(cartItems);

// //     cartdata[itemId][size] = quantity;

// //     setCartItems(cartData);
// //   }

// //   const value = {
// //     products,currency,
// //     delivery_fee,search,
// //     setSearch, showSearch, setShowSearch,
// //     cartItems, addToCart, removeFromCart,
// //     incrementQuantity, decrementQuantity,
// //      getCartCount, updateQuantity
// //   };

// //   return (
// //     <ShopContext.Provider value={value}>
// //       {props.children}
// //     </ShopContext.Provider>
// //   );
// // };

// // export default ShopContextProvider;




























import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios';
import { products } from "../assets/assets";


export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = '₹';
  const delivery_fee = 100;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [productsData, setProducts] = useState([]);
  const navigate = useNavigate();

  const [token, setToken] = useState(''); 
  const [currentUser, setCurrentUser] = useState(null);

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
  

  const getCartAmount = () => {
  let totalAmount = 0;
  for (const itemId in cartItems) {
    const product = productsData.find((product) => product._id === itemId);
    if (!product) continue;

    for (const size in cartItems[itemId]) {
      const quantity = cartItems[itemId][size];
      if (quantity > 0) {
        totalAmount += quantity * product.price;
      }
    }
  }
  return totalAmount;
};

const getProductsData = async () => {
  console.log('Fetching products data from backend...');
  try {
    const response = await axios.get(backendUrl + '/api/product/list')
    console.log('Products fetched:', response.data.products);
    if (response.data.success) {
      setProducts(response.data.products);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) { 
    console.log(error);
    toast.error(error.message);
    
  }
}

  useEffect(() => {
    getProductsData();
  },[]);

  const fetchCurrentUser = async (tkn) => {
    try {
      if (!tkn) return;
      const res = await axios.get((backendUrl || 'http://localhost:4000') + '/api/user/me', {
        headers: { Authorization: `Bearer ${tkn}` }
      });
      if (res.data.success) {
        setCurrentUser(res.data.user);
      }
    } catch (error) {
      console.log('fetchCurrentUser error', error.message);
    }
  }

  useEffect(()=>{
    const stored = localStorage.getItem('token');
    if (!token && stored) {
      setToken(stored);
      fetchCurrentUser(stored);
    }
    if (token) {
      fetchCurrentUser(token);
    }
  },[])

  // Ensure we fetch current user whenever the token changes (e.g., after login)
  useEffect(() => {
    if (token) {
      fetchCurrentUser(token);
    } else {
      setCurrentUser(null);
    }
  }, [token]);

  console.log('Backend URL:', backendUrl);

  const value = {
    products: productsData,
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
    token,
    setToken,
    currentUser,
    setCurrentUser,
    getCartAmount, 
    navigate,
    backendUrl,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export { ShopContextProvider };

