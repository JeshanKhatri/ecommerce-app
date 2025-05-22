// import React, { useContext, useEffect, useState,  } from 'react'
// import { ShopContext } from '../context/ShopContext';
// import { useParams } from 'react-router-dom';
// import { assets } from '../assets/assets';
// import RelatedProducts from '../components/RelatedProducts';
// const Product = () => {

//   const {productId} = useParams();
//   const {products, currency, addToCart } = useContext(ShopContext);
//   const[productData, setProductData] = useState(false);
//   const [image, setImage] = useState('');

//   const fetchProductData = async () => {
//    products.map((item)=>{
//     if (item._id === productId){
//     setProductData(item)
//     setImage(item.image[0])
//     return null;
//     }
//    })
//   }
  
//   useEffect(()=> {
//     fetchProductData();

//   },[productId,products])

//   return  productData ?(
//     <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
//       {/* Product Details */}
//       <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

//       {/* Product Image */}
//        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
//         <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
//           {
//             productData.image.map((item,index)=>(
//            <img onClick={()=>setImage(item)}  src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
//             ))
//           }
//         </div>

//         <div className="w-full sm:w-[80%]">
//           <img className='w-full h-auto'  src={image} alt="" />
//         </div>
//        </div>
//        {/* Product Details */}
//        <div className="flex-1">
//         <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
//         <div className="flex items-center gap-1 mt-2">
//           <img src={assets.star_icon} alt="" className="w-3 5" />
//           <img src={assets.star_icon} alt="" className="w-3 5" />
//           <img src={assets.star_icon} alt="" className="w-3 5" />
//           <img src={assets.star_icon} alt="" className="w-3 5" />
//           <img src={assets.star_dull_icon} alt="" className="w-3 5" />
//           <p className="pl-2">(9)</p>
//         </div>
//         <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
//         <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

//         <button onClick={()=> addToCart(productData._id, size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">ADD TO CART</button>
//         <hr  className='mt-8 sm:w-4/5'/>
//         <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
//           <p>Cash on delivery available on this product</p>
//           <p>Return and Exchange Policy within 7 days</p>
//         </div>
//        </div>
//       </div>

//       {/* description and rewiew parts */}
//       <div className="mt-20">
//         <div className="flex">
//           <b className='border px-5 py-3 text-sm'>Description</b>
//           <p className='border px-5 py-3 text-sm'>Review(9)</p>
//         </div>

//         <div className="flex flex-col gap-4 border px-6 py06 text-sm text-gray-500">
//           <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas, voluptatibus doloribus esse Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, molestiae modi assumenda accusantium asperiores officiis rem laboriosam debitis. Modi beatae incidunt suscipit ipsam? Ex maiores quibusdam iusto.</p>
//           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate porro tenetur, blanditiis ex accusantium vel consequatur iusto est praesentium quaerat eaque neque ratione</p>
//         </div>
//       </div>

//       {/* related Product Details */}
//       <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

//     </div>
//   ) : <div className="opacity-0"></div>
// }

// export default Product



import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products,currency,cartItems,
    addToCart,incrementQuantity,
    decrementQuantity} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    const product = products.find(item => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
      setSize(product.size?.[0] || 'default');
    }
  }, [productId, products]);

  const currentQty = cartItems[productId]?.[size] || 0;

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Details */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Image */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(9)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => decrementQuantity(productId, size)}
              className="px-3 py-1 border border-gray-400 rounded"
            >
              -
            </button>
            <span>{currentQty}</span>
            <button
              onClick={() => incrementQuantity(productId, size)}
              className="px-3 py-1 border border-gray-400 rounded"
            >
              +
            </button>
          </div>

          <button
            onClick={() => addToCart({ _id: productId, size })}
            className="bg-black text-white px-8 py-3 mt-4 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>

          <hr className='mt-8 sm:w-4/5' />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>Cash on delivery available on this product</p>
            <p>Return and Exchange Policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description and Review */}
      <div className="mt-20">
        <div className="flex">
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Review(9)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py06 text-sm text-gray-500">
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit...</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
