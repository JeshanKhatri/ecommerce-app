import React from 'react';

const About = () => {
  return (
    <div className="py-12 px-4 sm:px-10 md:px-20 lg:px-32">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">About Us</h2>
        <p className="text-gray-600 text-lg">Empowering fitness through quality equipment</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 text-gray-700 space-y-6 leading-relaxed">
        <p>
          Welcome to our fitness equipment store! We're  helping individuals, personal trainers,
          and gym owners find the perfect tools to support their health and fitness goals. Whether you’re building
          a home gym or upgrading a commercial setup, we’ve got you covered.
        </p>
        <p>
          Our mission is simple: to make high-quality, durable, and affordable fitness equipment accessible to everyone.
          From cardio machines and strength training gear to functional accessories, every product is handpicked with performance in mind.
        </p>
        <p>
          With an easy-to-use online platform, smart filters, and real-time availability, we make the shopping experience
          seamless. Explore, compare, and find exactly what you need — all in one place.
        </p>
      </div>
    </div>
  );
};

export default About;
