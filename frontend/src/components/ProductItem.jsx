import React, {useContext} from 'react'
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { getImageUrl, handleImageError } from '../utils/imageUtils';

const ProductItem = ({id, image, name, price}) => {
  const {currency, backendUrl} = useContext(ShopContext);

  return (
    <Link className='text-gray-700 cursor-pointer hover:scale-105 transition-transform duration-200' to={`/product/${id}`}>
      <div className='overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow'>
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
          <img 
            className='w-full h-full object-cover hover:scale-110 transition-transform duration-300' 
            src={getImageUrl(image, backendUrl)} 
            alt={name || "Product"} 
            onError={handleImageError}
          />
        </div>
      </div>
      <div className="mt-3 space-y-1">
        <p className='font-medium text-gray-800 line-clamp-2'>{name}</p>
        <p className='text-lg font-bold text-green-600'>{currency}{price}</p>
      </div>
    </Link>
  )
}

export default ProductItem;
