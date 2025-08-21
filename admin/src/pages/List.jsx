import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { getImageUrl, handleImageError } from '../utils/imageUtils'

const List = ({token}) => {

  const [list, setList ] = useState([])
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState(null) // Track which product is being removed

  const fetchList = async () => {
   try {
    setLoading(true)
    const response = await axios.get(backendUrl + '/api/product/list')
    if(response.data.success){
      setList(response.data.products);
      console.log('Fetched products:', response.data.products);
    } else {
      toast.error(response.data.message)
    }
    
   } catch (error) {
    console.log(error);
    toast.error(error.message)
   } finally {
    setLoading(false)
   }
  }

  const removeProduct = async (id) => {
    try {
      // Add confirmation dialog
      if (!window.confirm('Are you sure you want to remove this product? This action cannot be undone.')) {
        return;
      }

      setRemovingId(id); // Set loading state for this specific product

      console.log('Removing product with ID:', id);
      console.log('Token being sent:', token);
      console.log('Token type:', typeof token);
      console.log('Token length:', token ? token.length : 0);

      if (!token) {
        toast.error('No authentication token found. Please log in again.');
        setRemovingId(null);
        return;
      }

      const response = await axios.post(
        backendUrl + '/api/product/remove', 
        { id }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Remove response:', response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        // Refresh the list after successful removal
        await fetchList();
      } else {
        toast.error(response.data.message || 'Failed to remove product');
      }

    } catch (error) {
      console.error('Remove product error:', error);
      console.error('Error response:', error.response);
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      
      if (error.response?.status === 401) {
        toast.error('Unauthorized. Please check your admin credentials.');
      } else if (error.response?.status === 403) {
        toast.error('Access denied. You do not have permission to remove products.');
      } else if (error.response?.status === 404) {
        toast.error('Product not found.');
      } else if (error.response?.status === 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error(error.response?.data?.message || error.message || 'Failed to remove product');
      }
    } finally {
      setRemovingId(null); // Clear loading state
    }
  };
  
  useEffect(()=>{
    fetchList()
  }, [])

  const sortedList = [...list].sort((a, b) => a.name.localeCompare(b.name));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2">Loading products...</span>
      </div>
    );
  }

  return (
    <>
     <p className='mb-2 text-lg font-bold'>All products list</p>
     <div className="flex flex-col gap-4">
     
      {/*  list table title */}
      <div className='grid grid-cols-[120px_3fr_1fr_1fr_1fr] items-center py-3 px-4 border bg-gray-200 text-sm font-semibold'>
        <b className='text-center'>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
      </div>

      {/*  Product list  */}
       {sortedList.length === 0 ? (
         <div className="text-center py-8 text-gray-500">
           No products found
         </div>
       ) : (
         sortedList.map((item, index)=>(
           <div className='grid grid-cols-[120px_3fr_1fr_1fr_1fr] items-center gap-4 py-3 px-4 border text-sm hover:bg-gray-50' key={item._id || index}>
             <div className="flex items-center justify-center">
               <div className="w-20 h-20 bg-gray-100 rounded-lg border-2 border-gray-200 overflow-hidden flex items-center justify-center">
                 <img 
                   className='w-full h-full object-cover' 
                   src={getImageUrl(item.image, backendUrl)} 
                   alt={item.name || "Product"} 
                   onError={handleImageError}
                   onLoad={() => console.log('Image loaded successfully:', getImageUrl(item.image, backendUrl))}
                 />
               </div>
             </div>
             <p className='font-medium text-gray-800'>{item.name}</p>
             <p className='text-gray-600'>{item.category}</p>
             <p className='text-right text-lg font-bold text-green-600'>{currency}{item.price}</p>
             <div className="flex justify-center">
               <button 
                 onClick={() => removeProduct(item._id)}
                 disabled={removingId === item._id}
                 className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                   removingId === item._id
                     ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                     : 'bg-red-500 hover:bg-red-600 text-white hover:shadow-md active:scale-95'
                 }`}
               >
                 {removingId === item._id ? (
                   <div className="flex items-center gap-2">
                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                     <span>Removing...</span>
                   </div>
                 ) : (
                   'Remove'
                 )}
               </button>
             </div>
           </div>
         ))
       )}
     </div>
    </>
  )
}
 
export default List



