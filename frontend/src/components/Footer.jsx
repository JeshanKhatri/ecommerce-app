import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='bg-gray-100 mt-20 pt-10 pb-6 px-4 text-sm text-gray-700'>
      <div className='grid sm:grid-cols-3 gap-10'>
        <div>
          <img src={assets.logo1} className='mb-4 w-32' alt='logo' />
          <p className='max-w-xs'>Providing high-quality gym equipment to power your performance and fitness journey.</p>
        </div>
        <div>
          <h3 className='text-lg font-semibold mb-3'>Company</h3>
          <ul className='space-y-1'>
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h3 className='text-lg font-semibold mb-3'>Get in Touch</h3>
          <ul className='space-y-1'>
            <li>+977 9861041302</li>
            <li>contact@topfitness.com</li>
          </ul>
        </div>
      </div>
      <hr className='my-6' />
      <p className='text-center text-xs'>&copy; 2025 topfitness.com. All Rights Reserved.</p>
    </div>
  );
};

export default Footer;
