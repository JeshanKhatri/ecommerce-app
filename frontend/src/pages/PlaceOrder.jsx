import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { getImageUrl } from '../utils/imageUtils'
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";


const PlaceOrder = () => {
  // payment method fixed to eSewa for this flow

  const { navigate, currentUser, getCartAmount, delivery_fee, backendUrl, cartItems, productsData, token } = useContext(ShopContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const parts = (currentUser.name || '').split(' ');
      setFirstName(parts[0] || '');
      setLastName(parts.slice(1).join(' ') || '');
      setEmail(currentUser.email || '');
    }
  }, [currentUser]);


  const [formData, setformData] = useState({
    signature: "",
    tax_amount: "0",
    transaction_uuid: uuidv4(),
    product_service_charge: "0",
    product_code: "EPAYTEST",
    success_url: "http://localhost:5173/paymentsuccess",
    failure_url: "http://localhost:5173/paymentfailure",
    signed_field_names: "total_amount,transaction_uuid,product_code"
  });

  // generate signature function
  const generateSignature = (
    total_amount,
    transaction_uuid,
    product_code,
    secret
  ) => {
    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    const hashedSignature = CryptoJS.enc.Base64.stringify(hash);
    return hashedSignature;
  };

  // useeffect
  useEffect(() => {
    const { total_amount, transaction_uuid, product_code } = formData;
    const hashedSignature = generateSignature(
      total_amount,
      transaction_uuid,
      product_code,
      "8gBm/:&EnhH.1/q"
    );

    setformData({ ...formData, signature: hashedSignature });
  }, [formData.amount]);



  // Check if user is logged in
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const validateForm = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !region.trim() || !city.trim() || !phone.trim()) {
      toast.error('Please fill in all fields');
      return false;
    }
    if (!email.includes('@')) {
      toast.error('Please enter a valid email');
      return false;
    }
    if (phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return false;
    }
    return true;
  };



  const handleEsewaPayment = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!cartItems || Object.keys(cartItems).length === 0) {
      toast.error('Your cart is empty. Please add products before placing an order.');
      return;
    }

    setIsSubmitting(true);

    try {
      const subtotal = getCartAmount();
      const total = subtotal + delivery_fee;

      // Prepare new form data with all required fields
      const newFormData = {
        ...formData,
        total_amount: total,
        amount: subtotal,
        product_delivery_charge: delivery_fee
      };

      // Generate new signature for updated total_amount
      newFormData.signature = generateSignature(
        newFormData.total_amount,
        newFormData.transaction_uuid,
        newFormData.product_code,
        "8gBm/:&EnhH.1/q"
      );

      console.log('Form data prepared for payment:', newFormData);

      // Create form and submit to backend
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = `https://rc-epay.esewa.com.np/api/epay/main/v2/form`;
      form.style.display = 'none';

      // Add all order data
      Object.entries(newFormData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);

      console.log('Submitting payment form with data:', newFormData);
      form.submit();

    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleOrder = (e) => {
    e && e.preventDefault && e.preventDefault();
    // simple fallback: create order client-side or navigate to orders
    navigate('/orders');
  }

  return (
    <div className=' flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/*leftside */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">

        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <form onSubmit={handleEsewaPayment} className="flex flex-col gap-4">
          <div className="flex gap-3">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
              type="text"
              placeholder='first name'
              required
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
              type="text"
              placeholder='last name'
              required
            />
          </div>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type="email"
            placeholder='email address'
            required
          />
          <div className="flex gap-3">
            <input
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
              type="text"
              placeholder='Region'
              required
            />
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
              type="text"
              placeholder='City'
              required
            />
          </div>

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type="tel"
            placeholder='phone number'
            required
          />
        </form>
      </div>

      {/*rightside */}

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className="py-2">
            <img className='h-6' src={assets.esewa_logo} alt="eSewa" />
          </div>

          <div className="w-full text-end mt-8 space-y-3">
            <div className="flex justify-end gap-3">
              <button
                onClick={handleEsewaPayment}
                disabled={isSubmitting}
                className='flex items-center gap-3 bg-[#007f2a] hover:bg-[#006b22] disabled:bg-gray-400 text-white px-6 py-3 text-sm rounded'
              >
                <img src={assets.esewa_logo} alt="eSewa" className="h-5" />
                <span>{isSubmitting ? 'Processing...' : 'Pay with eSewa'}</span>
              </button>
              <button onClick={handleOrder} className='bg-black text-white px-6 py-3 text-sm rounded'>Order</button>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default PlaceOrder

