import React,{useContext, useState} from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import {assets} from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {

  const [method, setMethod] = useState('esewa');

  const {navigate } = useContext(ShopContext);

  return (
    <div className=' flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/*leftside */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">

        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>

        <div className="flex gap-3">
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='first name' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='last name' /> 
        </div>

         <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='email address' />
         <div className="flex gap-3">
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Region' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' /> 
         </div>

          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='phone number' />
      </div>

      {/*rightside */}
      
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          {/*payment method*/}
          <div className="flex gap-3 flex-col lg:flex-row">
           
            <div  onClick={()=>setMethod('esewa')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'esewa' ? 'bg-blue-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.esewa_logo} alt="" />
            </div>
            
             <div onClick={()=>setMethod('khalti')}  className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'khalti' ? 'bg-blue-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.khalti_logo} alt="" />
            </div>
{/* 
             <div onClick={()=>setMethod('cod')}  className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-blue-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>Cash On Delivery</p>
            </div> */}
          </div>

          <div className="w-full text-end mt-8">
            <button onClick={()=>navigate('/orders') } className='bg-black text-white px-16 py-3 text-sm'>Order</button>
          </div>
        </div>

      </div>
      
    </div>
  )
}

export default PlaceOrder

