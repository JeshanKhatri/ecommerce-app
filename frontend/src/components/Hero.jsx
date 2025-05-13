import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
      {/* left side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>
             <div className='flex items-center gap-2'>
                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                <p className='font-medium text-sm md:text-base'>Our Product</p>
             </div>
             <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Our Collections</h1>
             <div className='flex items-center gap-2'>
                <p className='font-semibold text-sm md:text-base'>Shop</p>
                <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
             </div>
        </div>
      </div>
      {/* right side */}
      <img className='w-full sm:w-1/2' src={assets.hero_img} alt='' />
    </div>
  )
}

export default Hero;




// import React from 'react';
// import { assets } from '../assets/assets';

// const Hero = () => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 bg-white border border-gray-300 rounded-2xl shadow-md overflow-hidden">
//       {/* Left side - Text */}
//       <div className="flex items-center justify-center px-6 py-12 sm:py-0 bg-[#f9f9f9]">
//         <div className="text-[#333] max-w-md">
//           <div className="flex items-center gap-2 mb-2">
//             <div className="w-8 h-[2px] bg-[#333]" />
//             <p className="text-sm md:text-base font-medium">Our Product</p>
//           </div>
//           <h1 className="prata-regular text-4xl md:text-5xl font-semibold mb-4 leading-snug">
//             Our Equipments 
//           </h1>
//           <div className="flex items-center gap-2">
//             <p className="text-sm md:text-base font-semibold">Shop</p>
//             <div className="w-8 h-[1px] bg-[#333]" />
//           </div>
//         </div>
//       </div>

//       {/* Right side - Image */}
//       <div className="relative w-full h-72 sm:h-auto overflow-hidden">
//         <img
//           src={assets.hero_img}
//           alt="Hero"
//           className="w-full h-full object-cover transition duration-500 ease-in-out hover:scale-105"
//         />
//       </div>
//     </div>
//   );
// };

// export default Hero;
