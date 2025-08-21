import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { backendUrl } from '../App.jsx'
import { toast } from 'react-toastify';

const Add = ({ token }) => {
 
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Home Use');
  const [subCategory, setSubCategory] = useState('Cardio Machine');
  const [bestseller, setBestseller] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)
 
      console.log('Token being sent:', token);
      console.log('Token length:', token ? token.length : 0);
      console.log('Token starts with:', token ? token.substring(0, 20) + '...' : 'NO_TOKEN');
      console.log('Backend URL:', backendUrl);
      console.log('Form data entries:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use Bearer prefix
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');

      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Product upload error:', error);
      console.error('Error response:', error.response);
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      toast.error(error.response?.data?.message || error.message || 'Product upload failed');
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>

      <div className="">
        <p className='mb-2 font-medium text-gray-700'>Upload Images</p>

        <div className='flex gap-3 flex-wrap'>
          <label htmlFor="image1" className="cursor-pointer">
            <div className="w-24 h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 hover:bg-gray-50 transition-colors">
              {!image1 ? (
                <img className='w-12 h-12 opacity-50' src={assets.upload_area} alt="Upload" />
              ) : (
                <img 
                  className='w-full h-full object-cover rounded-lg' 
                  src={URL.createObjectURL(image1)} 
                  alt="Preview" 
                />
              )}
            </div>
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden accept="image/*" />
          </label>

          <label htmlFor="image2" className="cursor-pointer">
            <div className="w-24 h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 hover:bg-gray-50 transition-colors">
              {!image2 ? (
                <img className='w-12 h-12 opacity-50' src={assets.upload_area} alt="Upload" />
              ) : (
                <img 
                  className='w-full h-full object-cover rounded-lg' 
                  src={URL.createObjectURL(image2)} 
                  alt="Preview" 
                />
              )}
            </div>
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden accept="image/*" />
          </label>

          <label htmlFor="image3" className="cursor-pointer">
            <div className="w-24 h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 hover:bg-gray-50 transition-colors">
              {!image3 ? (
                <img className='w-12 h-12 opacity-50' src={assets.upload_area} alt="Upload" />
              ) : (
                <img 
                  className='w-full h-full object-cover rounded-lg' 
                  src={URL.createObjectURL(image3)} 
                  alt="Preview" 
                />
              )}
            </div>
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden accept="image/*" />
          </label>

          <label htmlFor="image4" className="cursor-pointer">
            <div className="w-24 h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 hover:bg-gray-50 transition-colors">
              {!image4 ? (
                <img className='w-12 h-12 opacity-50' src={assets.upload_area} alt="Upload" />
              ) : (
                <img 
                  className='w-full h-full object-cover rounded-lg' 
                  src={URL.createObjectURL(image4)} 
                  alt="Preview" 
                />
              )}
            </div>
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden accept="image/*" />
          </label>
        </div>
        
        <p className='text-xs text-gray-500 mt-2'>Click on any box to upload an image. All images will be resized to maintain consistency.</p>
      </div>

      <div className="w-full ">
        <p className='mb-2'>Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
      </div>

      <div className="w-full ">
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Provide Content here' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)} className='w-full max-w-[500px] px-3 py-2'>
            <option value="Home Use">Home Use</option>
            <option value="Commercial Use">Commercial Use</option>
            <option value="Gym Owners">Gym Owners</option>
            <option value="Personal Trainers">Personal Trainers</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub Category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className='w-full max-w-[500px] px-3 py-2'>
            <option value="Cardio Machine">Cardio Machine</option>
            <option value="Strength Machine">Strength Machine</option>
            <option value="Functional Training">Functional Training</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 max-w-[500px]' type="Number" placeholder='25' />
        </div>

      </div>

      <div className='flex  gap-5 mt-2'>
        <input onChange={(e) => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
        <label className='cursor-pointer' htmlFor="bestseller"> Add to Bestseller</label>
      </div>

      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>
  )
}

export default Add
