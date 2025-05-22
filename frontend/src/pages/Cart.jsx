import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const Card = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size,
            quantity: cartItems[itemId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl">
        <Title text1={'CART'} text2={'OPTIONS'} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find(product => product._id === item._id);
          if (!productData) return null;

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img src={productData.image[0]} className="w-16 sm:w-20" alt="" />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>{currency}{productData.price}</p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                  </div>
                </div>
              </div>

              <input
                type="number"
                min={1}
                defaultValue={item.quantity}
                onChange={(e) =>
                  e.target.value === '' || e.target.value === '0'
                    ? null
                    : updateQuantity(item._id, item.size, Number(e.target.value))
                }
                className="border max-w-10 sm:max-w-10 px-1 sm:px-2 py-1"
              />

              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt="Delete"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;


// import React, { useContext, useEffect } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from '../components/Title';
// import { assets } from '../assets/assets';

// const Card = () => {
//   const {products, currency, carItems , updateQuality} = useContext(ShopContext);
//   const [cartData, setCartData] = useState([]);

//   useEffect(()=>{

//     const tempData= [];
//     for(const items in carItems){
//       for (const item in cartItems[item]){
//         if(cartItems[items][item] >0){
//           tempData.push({
//             _id: items,
//             size: item,
//             quantity: cartItems[items][item],
//           })
//         }
//       }
//     }
//     setCartData (tempData);
//   },[cartItems])

//   return (
//     <div className='border-t pt-14'>
//       <div className="text-2xl">
//         <Title text1={'CART'} text2={'OPTIONS'}/>
//       </div>
      
//       <div>
//         { 
//           cartData.map((item, index) => {

//             const productData = products.find(product => product._id === item._id);

//             return (
//               <div className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
//                 <div className="flex items-start gap-6">
//                   <img src={productData.image[0]} className='w-16 sm:w-20' alt="" />
//                   <div>
//                     <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
//                     <div className='flex items-center gap-5 mt-2'>
//                       <p>{currency}{productData.price}</p>
//                       <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50 >{item/size}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <input onChange={(e)=> e.target.value ==='' || e.target.value === '0' ? null : updateQuality(item._id, item.size, Number(e.target.value)) } className='border max-w-10 sm:max-w-10 px-1 sm:px-2 py-1 ' type="number" min={1} defaultValue={item.quantity} />
//                 <img onClick={()=>updateQuality(item._id, item.size, 0)} claseName='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon}/>
//               </div>
//             )
//           })
//         }
//       </div>
      
//     </div>
//   )
// }

// export default Card;
